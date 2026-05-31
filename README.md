# Telugu AI Social Media Post Generator (తెలుగు AI పోస్ట్ జనరేటర్)

An expert, production-grade social media content generator designed for Telugu News and Media publications. This tool automatically translates detailed news articles or press releases into platform-specific, localized, and contextually rich Telugu social posts.

---

## 🌟 Features

- **Multi-Platform Adaptation**: Creates highly targeted, unique posts for:
  - 🟢 **WhatsApp**: Concise, group-forwardable updates (<300 chars)
  - 🔵 **Facebook**: Engaging storytelling formats with active CTAs
  - 📸 **Instagram**: Visual, attention-grabbing hooks
  - 🐦 **X (Twitter)**: Direct, newsworthy tweets (<240 chars)
  - 🔴 **Breaking News**: Bold, alert-style banners starting with 🔴 or ⚡
- **Brief Summarizer**: A 2-3 line digestible Telugu summary for rapid briefings.
- **Hashtag Clustered Matrix**: Mixing Telugu, English, and contextually relevant location tags.
- **Single Section Regeneration**: Need a better tweet? Recalculate individual channels without losing other posts.
- **Downloadable Reports**: Instantly pack and export files as a formatted report (`.txt`) with a single click.
- **Dual Visual Theme**: Modern editorial look supporting system-synced light and dark modes.

---

## 🛠️ Tech Stack

**Frontend/Preview Stack**:
- React 18+ & Vite
- Tailwind CSS v3
- Lucid Icons
- Express.js (dev middleware-ready API proxying)

**Independent Python Stack** (under `/backend`):
- FastAPI & Python 3.10+
- Pydantic v2 schemas
- Google Generative AI (`google-generativeai`)

---

## 📂 Project Structure

```text
telugu-ai-social/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Procfile
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── .env.example
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── types/
│       │   └── index.ts
│       ├── api/
│       │   └── client.ts
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── ArticleInput.tsx
│       │   ├── PlatformSelector.tsx
│       │   ├── GenerateButton.tsx
│       │   ├── ContentCard.tsx
│       │   ├── ResultsGrid.tsx
│       │   ├── LoadingAnimation.tsx
│       │   ├── DarkModeToggle.tsx
│       │   └── DownloadPDFButton.tsx
│       └── hooks/
│           └── useGenerate.ts
└── README.md
```

---

## 🚀 Setup & Local Development

### 1. Prerequisites
- Google Gemini API Key (visit [Google AI Studio](https://aistudio.google.com/))
- Node.js (v18+)
- Python (v3.10+)

---

### 2. Standalone Backend Setup (Python)

```bash
# Navigate to the backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env and configure secrets
cp .env.example .env
# Edit .env and enter code key: GEMINI_API_KEY="your_api_key"

# Run Uvicorn development server
uvicorn main:app --reload --port 8000
```

The API will now be active at `http://localhost:8000`. You can inspect interactive documentation at `http://localhost:8000/docs`.

---

### 3. Standalone Frontend Setup (React)

```bash
# Navigate to the frontend directory
cd frontend

# Install packages
npm install

# Setup env variables
cp .env.example .env
# Set VITE_API_URL=http://localhost:8000

# Start Vite server
npm run dev
```

Inspect the application by opening `http://localhost:5173`.

---

## ☁️ Production Deployment

### Backend Deployment (Render)
1. Register on [Render](https://render.com) and link your GitHub repository.
2. Click **New Web Service** and select your linked repository.
3. Configure settings:
   - **Root Directory**: `backend`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Go to **Environment** settings and add:
   - `GEMINI_API_KEY` = `<your_api_key>`

### Frontend Deployment (Vercel)
1. Link your repository in [Vercel](https://vercel.com).
2. Configure settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add **Environment Variables**:
   - `VITE_API_URL` = `<your_render_backend_url>`

---

## 🌐 API Endpoints

### 1. Health Status
- **Method**: `GET`
- **Path**: `/health` (or `/api/health` on Full-stack dev setup)
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "Telugu AI API is running"
  }
  ```

### 2. Post Generation
- **Method**: `POST`
- **Path**: `/generate-content` (or `/api/generate-content`)
- **Request Body**:
  ```json
  {
    "title": "అమరావతి రోడ్ల పునర్నిర్మాణం",
    "content": "రాజధాని ప్రాంత అభివృద్ధిలో భాగంగా రహదారుల నిర్మాణం వేగవంతం చేయాలని సర్కార్ నిర్ణయించింది.",
    "platform": "all"
  }
  ```
- **Response**:
  ```json
  {
    "summary": "అమరావతి రాజధాని అభివృద్ధి పనులను ప్రభుత్వం ముమ్మరం చేస్తోంది...",
    "whatsapp": "ఉమ్మడి రాజధాని రోడ్ల పునరుద్ధరణ నిర్ణయం...",
    "facebook": "మీరు అమరావతి అభివృద్దిని స్వాగతిస్తున్నారా? మీ అభిప్రాయాన్ని తెలపండి...",
    "instagram": "అమరావతి అభివృద్ధి పరుగులు! 🔴 #Amaravathi",
    "twitter": "అమరావతి రహదారుల కనెక్టివిటీకి సరికొత్త పటిష్టత.",
    "hashtags": "#Amaravathi, #APDevelopment, #TeluguNews",
    "breaking_news": "🔴 అమరావతి రోడ్ల పునర్నిర్మాణం పనులు వేగవంతం!"
  }
  ```

---

## 📜 License
This project is licensed under Apache-2.0. Built with Google Gemini AI.
