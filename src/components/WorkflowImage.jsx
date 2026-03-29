import React, { useState, useRef } from 'react';
import { Upload, ScanSearch, Palette, Shapes, Lightbulb, RotateCcw, ImageIcon, Loader, X } from 'lucide-react';
import { analyzeImageWithVision, generateImageFromPrompt } from '../utils/apiHelpers';
import ImageCard from './ImageCard';

export default function WorkflowImage() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedBase64, setUploadedBase64] = useState('');
    const [uploadedMime, setUploadedMime] = useState('image/jpeg');
    const [analysis, setAnalysis] = useState(null);
    const [variationUrl, setVariationUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStage, setLoadingStage] = useState('');
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const fileInputRef = useRef(null);

    const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // result is data:mime;base64,XXXXX — strip the prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleFile = async (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, WEBP).');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError('Image too large. Please use an image under 10MB.');
            return;
        }
        setError('');
        setAnalysis(null);
        setVariationUrl('');
        setUploadedFile(file);
        setUploadedMime(file.type);

        const base64 = await readFileAsBase64(file);
        setUploadedBase64(base64);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleAnalyze = async () => {
        if (!uploadedBase64) return;
        setIsLoading(true);
        setError('');
        setLoadingStage('🔍 Analyzing image with Gemini Vision...');
        try {
            const result = await analyzeImageWithVision(uploadedBase64, uploadedMime);
            setAnalysis(result);
            setLoadingStage('');
        } catch (err) {
            setError(err.message);
            setLoadingStage('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGenerateVariation = async () => {
        if (!analysis?.variationPrompt) return;
        setIsLoading(true);
        setError('');
        setLoadingStage('🎨 Generating stylistic variation with DALL-E 3...');
        try {
            const url = await generateImageFromPrompt(analysis.variationPrompt);
            setVariationUrl(url);
            setLoadingStage('');
        } catch (err) {
            setError(err.message);
            setLoadingStage('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setUploadedFile(null);
        setUploadedBase64('');
        setAnalysis(null);
        setVariationUrl('');
        setError('');
        setLoadingStage('');
    };

    const previewUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;

    return (
        <div className="workflow-container">
            <div className="workflow-card">
                {/* Upload Zone */}
                <div className="card-section">
                    <div className="section-header">
                        <div className="section-icon pink"><ScanSearch size={18} /></div>
                        <div>
                            <h2>Style Lab</h2>
                            <p className="section-sub">Upload an image — AI will dissect its style and generate a variation</p>
                        </div>
                    </div>

                    {!uploadedFile ? (
                        <div
                            className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                        >
                            <Upload size={32} className="drop-icon" />
                            <p className="drop-title">Drop your image here</p>
                            <p className="drop-sub">or click to browse — JPG, PNG, WEBP up to 10MB</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </div>
                    ) : (
                        <div className="upload-preview">
                            <img src={previewUrl} alt="Uploaded" className="preview-img" />
                            <div className="preview-meta">
                                <span>{uploadedFile.name}</span>
                                <span>{(uploadedFile.size / 1024).toFixed(1)} KB</span>
                            </div>
                            <button className="remove-btn" onClick={handleReset}><X size={14} /> Remove</button>
                        </div>
                    )}

                    {uploadedFile && !analysis && (
                        <button
                            className="btn btn-primary"
                            onClick={handleAnalyze}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader size={16} className="spin" /> Analyzing...</>
                            ) : (
                                <><ScanSearch size={16} /> Analyze Image</>
                            )}
                        </button>
                    )}
                </div>

                {/* Analysis Results */}
                {analysis && (
                    <div className="card-section separator">
                        <div className="section-header">
                            <div className="section-icon teal"><Palette size={18} /></div>
                            <div>
                                <h2>Visual Analysis</h2>
                                <p className="section-sub">What the AI discovered about your image</p>
                            </div>
                        </div>

                        <div className="analysis-grid">
                            <div className="analysis-item">
                                <div className="analysis-item-label"><Shapes size={14} /> Main Subject</div>
                                <p>{analysis.mainSubject}</p>
                            </div>
                            <div className="analysis-item">
                                <div className="analysis-item-label"><Lightbulb size={14} /> Lighting & Mood</div>
                                <p>{analysis.lighting} — {analysis.mood}</p>
                            </div>
                            <div className="analysis-item">
                                <div className="analysis-item-label"><Palette size={14} /> Artistic Style</div>
                                <p className="style-tag">{analysis.artisticStyle}</p>
                            </div>
                            {analysis.colorPalette?.length > 0 && (
                                <div className="analysis-item full-width">
                                    <div className="analysis-item-label"><Palette size={14} /> Color Palette</div>
                                    <div className="color-palette">
                                        {analysis.colorPalette.map((color, i) => (
                                            <div key={i} className="color-chip"
                                                style={{ background: color.startsWith('#') ? color : undefined }}>
                                                {color}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="analysis-item full-width">
                                <div className="analysis-item-label"><ImageIcon size={14} /> Variation Prompt</div>
                                <p className="variation-prompt-text">{analysis.variationPrompt}</p>
                            </div>
                        </div>

                        <button
                            className="btn btn-secondary"
                            onClick={handleGenerateVariation}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <><Loader size={16} className="spin" /> Generating...</>
                            ) : (
                                <><ImageIcon size={16} /> Generate Variation</>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Status / Error */}
            {loadingStage && (
                <div className="status-bar">
                    <Loader size={14} className="spin" />
                    {loadingStage}
                </div>
            )}
            {error && <div className="error-bar">⚠️ {error}</div>}

            {/* Side by side results */}
            {variationUrl && (
                <div className="result-section">
                    <div className="comparison-grid">
                        <div className="comparison-original">
                            <span className="comparison-label">Original</span>
                            <img src={previewUrl} alt="Original" className="comparison-img" />
                        </div>
                        <div className="comparison-arrow">→</div>
                        <ImageCard imageUrl={variationUrl} label="AI Variation" prompt={analysis?.variationPrompt} />
                    </div>
                    <button className="btn btn-ghost" onClick={handleReset}>
                        <RotateCcw size={16} /> Try Another Image
                    </button>
                </div>
            )}
        </div>
    );
}
