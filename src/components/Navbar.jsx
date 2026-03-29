import React from 'react';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
    return (
        <header className="navbar">
            <div className="navbar-brand">
                <div className="navbar-logo">
                    <Sparkles size={22} />
                </div>
                <span className="navbar-title">Pear<span className="brand-accent">Media</span></span>
            </div>

            <nav className="navbar-tabs">
                <button
                    className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                    onClick={() => setActiveTab('text')}
                >
                    <Sparkles size={16} />
                    Creative Studio
                </button>
                <button
                    className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                    onClick={() => setActiveTab('image')}
                >
                    <ImageIcon size={16} />
                    Style Lab
                </button>
            </nav>

            <div className="navbar-badge">AI Powered</div>
        </header>
    );
}
