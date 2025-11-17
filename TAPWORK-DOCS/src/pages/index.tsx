import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout
      title="TAPWORK Documentation"
      description="Documentation for TAPWORK Application"
    >
      <header className={styles.heroBanner}>
        <div className="container">
          <h1 className="hero__title">TAPWORK</h1>
          <p className="hero__subtitle">
            Professional attendance control system with biometric scanning and barcode technology
          </p>
          <p className={styles.heroDescription}>
            Quick registration, automated notifications, and real-time reports. 
            Modern architecture with REST API, Docker containers, and Kubernetes deployment.
          </p>

          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/intro">
              View Documentation
            </Link>
          </div>
        </div>
      </header>
    </Layout>
  );
}