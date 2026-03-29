# Pear Media AI 

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
git clone https://github.com/kousik13/pear-media-lab-1.git
cd pear-media-lab
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure API keys
Create a `.env` file in the project root:
```env
REACT_APP_OPENAI_KEY=your_openai_key_here
```
- **OpenAI key**: https://platform.openai.com/ (needed for DALL-E 3)

### 4. Start the dev server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.


## 🎨 Design

- Dark mode with indigo/violet gradient accent system
- Glassmorphism cards with blur effects
- Smooth step-by-step workflow indicators
- Responsive layout (mobile-first)
- Drag-and-drop image uploads

## 📦 Deployment (Vercel)
website link :- https://pear-media-lab-1.vercel.app/

## 🎨 Screen Shots

1. <img width="1440" height="770" alt="Screenshot 2026-03-29 at 2 22 00 PM" src="https://github.com/user-attachments/assets/df70f7e5-e929-455c-9f49-31fc99494553" />

2. <img width="1440" height="774" alt="Screenshot 2026-03-29 at 2 22 13 PM" src="https://github.com/user-attachments/assets/570cd189-62ad-448c-b995-324459286ca3" />

3. <img width="1439" height="771" alt="Screenshot 2026-03-29 at 2 22 48 PM" src="https://github.com/user-attachments/assets/3eb4bdf2-23e3-40a3-93e5-39f272cb0d1a" />

4. <img width="1437" height="770" alt="Screenshot 2026-03-29 at 2 23 04 PM" src="https://github.com/user-attachments/assets/970d48aa-4d88-4999-86bb-ab6f8af48773" />

5. <img width="1440" height="775" alt="Screenshot 2026-03-29 at 2 23 45 PM" src="https://github.com/user-attachments/assets/bb40e103-3f0f-4218-a42b-d507be46d2eb" />

6<img width="1440" height="772" alt="Screenshot 2026-03-29 at 2 24 08 PM" src="https://github.com/user-attachments/assets/1f559f6e-5f2b-425f-812b-b8cea7575914" />


7. <img width="1440" height="772" alt="Screenshot 2026-03-29 at 2 24 36 PM" src="https://github.com/user-attachments/assets/0f463ab8-6eec-404b-b594-558857e5ae05" />

