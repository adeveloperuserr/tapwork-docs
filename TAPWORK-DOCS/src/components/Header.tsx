import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <h1>TAPWORK Documentation</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/getting-started">Getting Started</a></li>
                    <li><a href="/guides">Guides</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;