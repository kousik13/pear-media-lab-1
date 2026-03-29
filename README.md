# Pear Media AI 🍐

A responsive AI-powered web application that bridges simple user inputs with advanced AI outputs through two distinct creative workflows.

## 🚀 Features

### Workflow A — Creative Studio (Text → Image)
1. **Input**: User types a simple idea
2. **Enhance**: Gemini 1.5 Flash engineers it into a professional 50-word prompt
3. **Approve**: User reviews and edits the enhanced prompt in-place
4. **Generate**: DALL-E 3 produces the final image

### Workflow B — Style Lab (Image → Variation)
1. **Upload**: Drag-and-drop or browse for any image
2. **Analyze**: Gemini Vision extracts subject, lighting, color palette & artistic style
3. **Variation**: DALL-E 3 generates a stylistic variation using the analysis

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (CRA), Vanilla CSS |
| Icons | lucide-react |
| Text Enhancement | Gemini 1.5 Flash |
| Image Analysis | Gemini 1.5 Flash (Vision) |
| Image Generation | OpenAI DALL-E 3 |

## 📁 Project Structure

```
src/
├── App.jsx                  # Root component with tab switching
├── App.css                  # Full design system & animations
├── components/
│   ├── Navbar.jsx           # Navigation with logo and tabs
│   ├── WorkflowText.jsx     # Creative Studio (Text workflow)
│   ├── WorkflowImage.jsx    # Style Lab (Image workflow)
│   └── ImageCard.jsx        # Reusable image result card
└── utils/
    ├── apiHelpers.js        # All API calls (Gemini + OpenAI)
    └── constants.js         # System prompts and config
```

## ⚙️ How to Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/pearmedia-ai-prototype.git
cd pearmedia-ai-prototype
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API keys
Create a `.env` file in the project root:
```env
REACT_APP_GEMINI_KEY=your_gemini_key_here
REACT_APP_OPENAI_KEY=your_openai_key_here
```
- **Gemini key**: https://aistudio.google.com/ (free tier available)
- **OpenAI key**: https://platform.openai.com/ (needed for DALL-E 3)

### 4. Start the dev server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Security Notes

- Never commit your `.env` file — it's already in `.gitignore`
- Always prefix React env vars with `REACT_APP_`
- For production, add keys in your hosting dashboard (Vercel/Netlify)

## 🎨 Design

- Dark mode with indigo/violet gradient accent system
- Glassmorphism cards with blur effects
- Smooth step-by-step workflow indicators
- Responsive layout (mobile-first)
- Drag-and-drop image uploads

## 📦 Deployment (Vercel)

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add `REACT_APP_GEMINI_KEY` and `REACT_APP_OPENAI_KEY` in Environment Variables
4. Deploy!
