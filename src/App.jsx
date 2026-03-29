import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import WorkflowText from './components/WorkflowText';
import WorkflowImage from './components/WorkflowImage';

function App() {
    const [activeTab, setActiveTab] = useState('text');

    return (
        <div className="app">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="main-content">
                <div className="hero">
                    {activeTab === 'text' ? (
                        <>
                            <h1 className="hero-title">
                                Turn ideas into <span className="gradient-text">visual art</span>
                            </h1>
                            <p className="hero-sub">
                                Type a simple concept. Our AI engineers a professional prompt, you approve it, we generate your image.
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="hero-title">
                                Reverse-engineer <span className="gradient-text">any style</span>
                            </h1>
                            <p className="hero-sub">
                                Upload an image. AI deconstructs its lighting, palette and style — then creates a stunning variation.
                            </p>
                        </>
                    )}
                </div>

                <div className="tab-content">
                    {activeTab === 'text' ? <WorkflowText /> : <WorkflowImage />}
                </div>
            </main>

            <footer className="footer">
                <p>Pear Media AI · Built with GPT-4o-mini, GPT-4o Vision + DALL-E 3</p>
            </footer>
        </div>
    );
}

export default App;
