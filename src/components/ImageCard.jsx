import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

export default function ImageCard({ imageUrl, label = 'Generated Image', prompt }) {
    const handleDownload = () => {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
    };

    return (
        <div className="image-card">
            <div className="image-card-header">
                <span className="image-card-label">{label}</span>
                <button className="icon-btn" onClick={handleDownload} title="Open full size">
                    <ExternalLink size={16} />
                </button>
            </div>
            <div className="image-card-preview">
                <img src={imageUrl} alt={label} />
                <div className="image-card-overlay">
                    <button className="overlay-btn" onClick={handleDownload}>
                        <Download size={18} />
                        View Full Size
                    </button>
                </div>
            </div>
            {prompt && (
                <div className="image-card-prompt">
                    <span className="prompt-label">Prompt used:</span>
                    <p>{prompt}</p>
                </div>
            )}
        </div>
    );
}
