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
          <h1 className="hero__title">TAPWORK Documentation</h1>
          <p className="hero__subtitle">
            Explore all documentation resources for TAPWORK.
          </p>

          <div className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="container">
        <h2>Sections</h2>
        <ul>
          <li><Link to="/docs/intro">Introduction</Link></li>
          <li><Link to="/docs/getting-started">Getting Started</Link></li>
          <li><Link to="/docs/guides/usage">Usage Guide</Link></li>
          <li><Link to="/docs/guides/api">API Reference</Link></li>
        </ul>
      </main>
    </Layout>
  );
}
