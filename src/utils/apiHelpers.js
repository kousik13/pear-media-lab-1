import { ENHANCE_SYSTEM_PROMPT, ANALYZE_SYSTEM_PROMPT, OPENAI_API_BASE } from './constants';

// ─── OpenAI GPT-4o-mini: Enhance a simple text prompt ────────────────────────
export const getEnhancedPrompt = async (userInput) => {
    const openaiKey = process.env.REACT_APP_OPENAI_KEY;
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
        throw new Error('Add your REACT_APP_OPENAI_KEY to the .env file.');
    }

    try {
        const res = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${openaiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: ENHANCE_SYSTEM_PROMPT },
                    { role: 'user', content: userInput },
                ],
                max_tokens: 200,
                temperature: 0.9,
            }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `OpenAI HTTP ${res.status}`);
        }
        const data = await res.json();
        return data.choices[0].message.content.trim();
    } catch (err) {
        console.error('Enhancement failed:', err.message);
        throw new Error(`Enhancement failed: ${err.message}`);
    }
};

// ─── DALL-E 3: Generate image from a prompt ───────────────────────────────────
export const generateImageFromPrompt = async (prompt) => {
    const openaiKey = process.env.REACT_APP_OPENAI_KEY;
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
        throw new Error('Add your REACT_APP_OPENAI_KEY to the .env file.');
    }

    const res = await fetch(`${OPENAI_API_BASE}/images/generations`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `DALL-E HTTP ${res.status}`);
    }

    const data = await res.json();
    return data.data[0].url;
};

// ─── GPT-4o Vision: Analyze uploaded image ───────────────────────────────────
export const analyzeImageWithVision = async (base64Image, mimeType = 'image/jpeg') => {
    const openaiKey = process.env.REACT_APP_OPENAI_KEY;
    if (!openaiKey || openaiKey === 'your_openai_api_key_here') {
        throw new Error('Add your REACT_APP_OPENAI_KEY to the .env file.');
    }

    const res = await fetch(`${OPENAI_API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${openaiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: ANALYZE_SYSTEM_PROMPT },
                        {
                            type: 'image_url',
                            image_url: { url: `data:${mimeType};base64,${base64Image}`, detail: 'low' },
                        },
                    ],
                },
            ],
            max_tokens: 600,
            temperature: 0.2,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `GPT-4o Vision HTTP ${res.status}`);
    }

    const data = await res.json();
    const raw = data.choices[0].message.content.trim();

    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch {
        return { mainSubject: raw, colorPalette: [], artisticStyle: 'Unknown', variationPrompt: raw };
    }
};
