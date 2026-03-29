import React, { useState } from 'react';
import { Wand2, CheckCircle, ImageIcon, RotateCcw, ChevronRight, Loader } from 'lucide-react';
import { getEnhancedPrompt, generateImageFromPrompt } from '../utils/apiHelpers';
import { PLACEHOLDER_PROMPTS } from '../utils/constants';
import ImageCard from './ImageCard';

const STEPS = ['Input', 'Enhance', 'Approve', 'Generate'];

export default function WorkflowText() {
    const [currentStep, setCurrentStep] = useState(0);
    const [userPrompt, setUserPrompt] = useState('');
    const [enhancedPrompt, setEnhancedPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    const randomPlaceholder = PLACEHOLDER_PROMPTS[Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length)];

    const handleEnhance = async () => {
        if (!userPrompt.trim()) return;
        setIsLoading(true);
        setError('');
        setStatusMessage('✨ Enhancing your prompt with AI...');
        try {
            const enhanced = await getEnhancedPrompt(userPrompt.trim());
            setEnhancedPrompt(enhanced);
            setCurrentStep(2);
            setStatusMessage('');
        } catch (err) {
            setError(err.message);
            setStatusMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateImage = async () => {
        if (!enhancedPrompt.trim()) return;
        setIsLoading(true);
        setError('');
        setStatusMessage('🎨 Generating your image with DALL-E 3...');
        try {
            const url = await generateImageFromPrompt(enhancedPrompt.trim());
            setImageUrl(url);
            setCurrentStep(3);
            setStatusMessage('');
        } catch (err) {
            setError(err.message);
            setStatusMessage('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setCurrentStep(0);
        setUserPrompt('');
        setEnhancedPrompt('');
        setImageUrl('');
        setStatusMessage('');
        setError('');
    };

    return (
        <div className="workflow-container">
            {/* Step Indicator */}
            <div className="step-indicator">
                {STEPS.map((step, idx) => (
                    <React.Fragment key={step}>
                        <div className={`step-dot ${idx <= currentStep ? 'active' : ''} ${idx < currentStep ? 'done' : ''}`}>
                            {idx < currentStep ? <CheckCircle size={14} /> : idx + 1}
                            <span className="step-label">{step}</span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`step-line ${idx < currentStep ? 'active' : ''}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Step 0 & 1: Input */}
            <div className="workflow-card">
                <div className="card-section">
                    <div className="section-header">
                        <div className="section-icon indigo"><Wand2 size={18} /></div>
                        <div>
                            <h2>Creative Studio</h2>
                            <p className="section-sub">Describe your vision — AI will engineer it into a masterpiece</p>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">Your Idea</label>
                        <textarea
                            className="text-input"
                            rows={3}
                            placeholder={`e.g. "${randomPlaceholder}"`}
                            value={userPrompt}
                            onChange={(e) => { setUserPrompt(e.target.value); setCurrentStep(0); }}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleEnhance}
                        disabled={isLoading || !userPrompt.trim()}
                    >
                        {isLoading && currentStep <= 1 ? (
                            <><Loader size={16} className="spin" /> Enhancing...</>
                        ) : (
                            <><Wand2 size={16} /> Enhance Prompt <ChevronRight size={14} /></>
                        )}
                    </button>
                </div>

                {/* Step 2: Approve */}
                {enhancedPrompt && (
                    <div className="card-section separator">
                        <div className="section-header">
                            <div className="section-icon violet"><CheckCircle size={18} /></div>
                            <div>
                                <h2>Review & Approve</h2>
                                <p className="section-sub">Edit the enhanced prompt before generating your image</p>
                            </div>
                        </div>

                        <div className="enhanced-badge">✨ AI Enhanced</div>
                        <textarea
                            className="text-input enhanced"
                            rows={5}
                            value={enhancedPrompt}
                            onChange={(e) => setEnhancedPrompt(e.target.value)}
                            disabled={isLoading}
                        />

                        <button
                            className="btn btn-secondary"
                            onClick={handleGenerateImage}
                            disabled={isLoading || !enhancedPrompt.trim()}
                        >
                            {isLoading && currentStep === 2 ? (
                                <><Loader size={16} className="spin" /> Generating...</>
                            ) : (
                                <><ImageIcon size={16} /> Generate Image <ChevronRight size={14} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Status / Error */}
            {statusMessage && (
                <div className="status-bar">
                    <Loader size={14} className="spin" />
                    {statusMessage}
                </div>
            )}
            {error && (
                <div className="error-bar">
                    ⚠️ {error}
                </div>
            )}

            {/* Step 3: Result */}
            {imageUrl && (
                <div className="result-section">
                    <ImageCard imageUrl={imageUrl} label="Generated Image" prompt={enhancedPrompt} />
                    <button className="btn btn-ghost" onClick={handleReset}>
                        <RotateCcw size={16} /> Start Over
                    </button>
                </div>
            )}
        </div>
    );
}
