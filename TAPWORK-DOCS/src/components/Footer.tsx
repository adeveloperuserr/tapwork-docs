import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} TAPWORK-DOCS. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/docs/intro">Introduction</a></li>
                    <li><a href="/docs/getting-started">Getting Started</a></li>
                    <li><a href="/docs/guides/usage">Usage Guide</a></li>
                    <li><a href="/docs/guides/api">API Reference</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;