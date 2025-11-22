# Deployment Architecture

This document describes how TAPWORK is deployed across different environments, from local development to production Kubernetes clusters.

---

## Deployment Overview

TAPWORK supports multiple deployment strategies to accommodate different scales and requirements:

- **Local Development**: Docker Compose for single-machine setup
- **Staging/Testing**: Docker Compose on virtual machines
- **Production**: Kubernetes cluster with high availability
- **Cloud-Native**: Managed Kubernetes services (EKS, GKE, AKS)

---

## Docker Compose Deployment

### Architecture Diagram

```mermaid
flowchart TB
    %% Styling for dark/light mode
    classDef containerStyle fill:#0288d1,stroke:#01579b,stroke-width:3px,color:#fff
    classDef volumeStyle fill:#388e3c,stroke:#1b5e20,stroke-width:3px,color:#fff
    classDef networkStyle fill:#f57c00,stroke:#e65100,stroke-width:3px,color:#fff

    subgraph Host["Host Machine"]
        subgraph Network["tapwork-network"]
            API[API Container<br/>Port 8000]
            DB[(PostgreSQL Container<br/>Port 5432)]
            SMTP[Mailhog Container<br/>Port 1025/8025]
            Scanner[Scanner App<br/>Port 3000]
        end
        
        subgraph Volumes["Persistent Volumes"]
            DBVol[Database Volume]
            LogVol[Logs Volume]
        end
    end

    Users[Users] -->|HTTP:3000| Scanner
    Scanner -->|HTTP:8000| API
    API -->|SQL| DB
    API -->|SMTP| SMTP
    DB -.->|Persist| DBVol
    API -.->|Logs| LogVol

    class API,Scanner,SMTP containerStyle
    class DB containerStyle
    class DBVol,LogVol volumeStyle
    class Network networkStyle
```

### Docker Compose Configuration

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: tapwork-db
    environment:
      POSTGRES_DB: tapwork
      POSTGRES_USER: tapwork_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U tapwork_user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - tapwork-network

  # FastAPI Backend
  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: tapwork-api
    environment:
      DATABASE_URL: postgresql://tapwork_user:${DB_PASSWORD}@postgres:5432/tapwork
      JWT_SECRET: ${JWT_SECRET}
      SMTP_HOST: mailhog
      SMTP_PORT: 1025
    ports:
      - "8000:8000"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./backend:/app
      - api_logs:/app/logs
    networks:
      - tapwork-network
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload

  # Mailhog (Email Testing)
  mailhog:
    image: mailhog/mailhog:latest
    container_name: tapwork-smtp
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI
    networks:
      - tapwork-network

  # Scanner Web App
  scanner:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: tapwork-scanner
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:8000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - tapwork-network
    command: npm start

volumes:
  postgres_data:
  api_logs:

networks:
  tapwork-network:
    driver: bridge
```

### Container Details

#### API Container
**Base Image**: `python:3.11-slim`
**Exposed Ports**: 8000
**Environment Variables**:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT signing
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port

**Health Check**:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1
```

#### PostgreSQL Container
**Base Image**: `postgres:15-alpine`
**Exposed Ports**: 5432
**Persistent Volume**: `/var/lib/postgresql/data`
**Initialization**: Runs migration scripts on first start

#### Mailhog Container
**Base Image**: `mailhog/mailhog:latest`
**Exposed Ports**: 
- 1025 (SMTP)
- 8025 (Web UI for viewing emails)
**Purpose**: Development email testing

#### Scanner Container
**Base Image**: `node:18-alpine`
**Exposed Ports**: 3000
**Build Process**: 
- Install dependencies
- Start development server
- Hot reload enabled

### Local Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/tapwork.git
cd tapwork

# Create environment file
cp .env.example .env

# Edit .env with your values
# DB_PASSWORD=secure_password
# JWT_SECRET=your_jwt_secret

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Run database migrations
docker-compose exec api alembic upgrade head

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## Kubernetes Deployment

### Architecture Diagram

```mermaid
flowchart TB
    %% Styling for dark/light mode
    classDef ingressStyle fill:#0288d1,stroke:#01579b,stroke-width:3px,color:#fff
    classDef serviceStyle fill:#f57c00,stroke:#e65100,stroke-width:3px,color:#fff
    classDef podStyle fill:#7b1fa2,stroke:#4a148c,stroke-width:3px,color:#fff
    classDef storageStyle fill:#388e3c,stroke:#1b5e20,stroke-width:3px,color:#fff
    classDef optionalStyle fill:#c2185b,stroke:#880e4f,stroke-width:3px,stroke-dasharray:5 5,color:#fff

    subgraph K8s["Kubernetes Cluster"]
        Ingress[Ingress Controller<br/>NGINX]
        
        subgraph Services["Services"]
            APISvc[API Service]
            DBSvc[DB Service]
            SMTPSvc[SMTP Service]
            ScanSvc[Scanner Service]
        end
        
        subgraph Deployments["Deployments/Pods"]
            API1[API Pod 1]
            API2[API Pod 2]
            API3[API Pod n]
            SMTP[SMTP Pod]
            Scan[Scanner Pod]
            BIO[Biometric Pod]
        end
        
        subgraph StatefulSet["StatefulSet"]
            DB[PostgreSQL Pod]
        end
        
        subgraph Storage["Persistent Storage"]
            PVC[(PersistentVolumeClaim)]
            PV[(PersistentVolume)]
        end
    end
    
    Users[Users] -->|HTTPS| Ingress
    Ingress -->|Route| APISvc
    Ingress -->|Route| ScanSvc
    APISvc -->|Load Balance| API1
    APISvc -->|Load Balance| API2
    APISvc -->|Load Balance| API3
    API1 -->|SQL| DBSvc
    API2 -->|SQL| DBSvc
    API3 -->|SQL| DBSvc
    DBSvc --> DB
    API1 -->|Email| SMTPSvc
    SMTPSvc --> SMTP
    API1 -.->|Optional| BIO
    API2 -.->|Optional| BIO
    DB -->|Store| PVC
    PVC -->|Mount| PV

    class Ingress ingressStyle
    class APISvc,DBSvc,SMTPSvc,ScanSvc serviceStyle
    class API1,API2,API3,SMTP,Scan,DB podStyle
    class PVC,PV storageStyle
    class BIO optionalStyle
```

### Kubernetes Resources

#### Namespace
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: tapwork
  labels:
    name: tapwork
```

#### ConfigMap
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: tapwork-config
  namespace: tapwork
data:
  DATABASE_HOST: postgres-service
  DATABASE_PORT: "5432"
  DATABASE_NAME: tapwork
  SMTP_HOST: smtp-service
  SMTP_PORT: "1025"
  API_HOST: "0.0.0.0"
  API_PORT: "8000"
```

#### Secrets
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: tapwork-secrets
  namespace: tapwork
type: Opaque
data:
  # Base64 encoded values
  db-password: <base64_encoded_password>
  jwt-secret: <base64_encoded_secret>
  smtp-password: <base64_encoded_password>
```

#### API Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tapwork-api
  namespace: tapwork
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tapwork-api
  template:
    metadata:
      labels:
        app: tapwork-api
    spec:
      containers:
      - name: api
        image: tapwork/api:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          value: "postgresql://$(DB_USER):$(DB_PASSWORD)@postgres-service:5432/tapwork"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: tapwork-secrets
              key: db-password
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: tapwork-secrets
              key: jwt-secret
        envFrom:
        - configMapRef:
            name: tapwork-config
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 5
          periodSeconds: 5
```

#### PostgreSQL StatefulSet
```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: tapwork
spec:
  serviceName: postgres-service
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_DB
          value: tapwork
        - name: POSTGRES_USER
          value: tapwork_user
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: tapwork-secrets
              key: db-password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
```

#### Service Definitions
```yaml
---
apiVersion: v1
kind: Service
metadata:
  name: tapwork-api-service
  namespace: tapwork
spec:
  selector:
    app: tapwork-api
  ports:
  - protocol: TCP
    port: 8000
    targetPort: 8000
  type: ClusterIP

---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: tapwork
spec:
  selector:
    app: postgres
  ports:
  - protocol: TCP
    port: 5432
    targetPort: 5432
  type: ClusterIP
  clusterIP: None  # Headless service for StatefulSet

---
apiVersion: v1
kind: Service
metadata:
  name: smtp-service
  namespace: tapwork
spec:
  selector:
    app: smtp
  ports:
  - name: smtp
    protocol: TCP
    port: 1025
    targetPort: 1025
  - name: ui
    protocol: TCP
    port: 8025
    targetPort: 8025
  type: ClusterIP
```

#### Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: tapwork-ingress
  namespace: tapwork
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.tapwork.com
    - scanner.tapwork.com
    secretName: tapwork-tls
  rules:
  - host: api.tapwork.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tapwork-api-service
            port:
              number: 8000
  - host: scanner.tapwork.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: scanner-service
            port:
              number: 3000
```

#### HorizontalPodAutoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: tapwork-api-hpa
  namespace: tapwork
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: tapwork-api
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## Deployment Workflow

### Production Deployment Process

```mermaid
flowchart LR
    %% Styling for dark/light mode
    classDef devStyle fill:#0288d1,stroke:#01579b,stroke-width:3px,color:#fff
    classDef buildStyle fill:#f57c00,stroke:#e65100,stroke-width:3px,color:#fff
    classDef testStyle fill:#7b1fa2,stroke:#4a148c,stroke-width:3px,color:#fff
    classDef deployStyle fill:#388e3c,stroke:#1b5e20,stroke-width:3px,color:#fff

    Dev[Code Commit] --> Build[Build Docker Images]
    Build --> Test[Run Tests]
    Test --> Push[Push to Registry]
    Push --> Deploy[Deploy to K8s]
    Deploy --> Verify[Health Checks]
    Verify --> Monitor[Monitor]

    class Dev devStyle
    class Build,Push buildStyle
    class Test testStyle
    class Deploy,Verify,Monitor deployStyle
```

### Deployment Steps

1. **Build Docker Images**
   ```bash
   docker build -t tapwork/api:v1.0.0 ./backend
   docker build -t tapwork/scanner:v1.0.0 ./frontend
   ```

2. **Run Tests**
   ```bash
   docker run tapwork/api:v1.0.0 pytest
   ```

3. **Push to Registry**
   ```bash
   docker push tapwork/api:v1.0.0
   docker push tapwork/scanner:v1.0.0
   ```

4. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/postgres-statefulset.yaml
   kubectl apply -f k8s/api-deployment.yaml
   kubectl apply -f k8s/services.yaml
   kubectl apply -f k8s/ingress.yaml
   ```

5. **Verify Deployment**
   ```bash
   kubectl get pods -n tapwork
   kubectl logs -f deployment/tapwork-api -n tapwork
   kubectl get ingress -n tapwork
   ```

---

## Environment Configuration

### Development
- Single instance of each service
- Hot reload enabled
- Debug logging
- Mailhog for email testing
- No TLS required

### Staging
- 2 replicas of API
- Real SMTP server
- Production-like data (anonymized)
- TLS enabled
- Performance testing

### Production
- 3+ replicas of API (auto-scaling)
- Managed database (RDS, Cloud SQL)
- Production SMTP (SendGrid, SES)
- Full monitoring and alerting
- Automated backups
- TLS required
- Rate limiting enabled

---

## Monitoring and Logging

### Prometheus Metrics
```yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: tapwork-api-metrics
  namespace: tapwork
spec:
  selector:
    matchLabels:
      app: tapwork-api
  endpoints:
  - port: metrics
    interval: 30s
```

### Logging Stack
- **Fluentd**: Log collection
- **Elasticsearch**: Log storage
- **Kibana**: Log visualization

### Alerts
- Pod restart alerts
- High error rate alerts
- Resource usage alerts
- Database connection alerts

---

## Backup Strategy

### Database Backups
```bash
# Daily automated backup
kubectl exec postgres-0 -n tapwork -- \
  pg_dump -U tapwork_user tapwork > backup-$(date +%Y%m%d).sql

# Upload to cloud storage
aws s3 cp backup-$(date +%Y%m%d).sql s3://tapwork-backups/
```

### Configuration Backups
- Git repository for all K8s manifests
- Secrets stored in secure vault
- Regular export of ConfigMaps

---

:::tip Deployment Best Practices
Always test deployments in staging before production. Use blue-green deployments or canary releases for zero-downtime updates. Maintain comprehensive rollback procedures.
:::