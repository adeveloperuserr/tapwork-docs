import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>Welcome to TAPWORK-DOCS</h1>
                <p>This is the main entry point for the TAPWORK-DOCS application.</p>
                <p>Explore the documentation to get started!</p>
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;