import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI App
app = FastAPI(
    title="Telugu AI Social Media Post Generator API",
    description="FastAPI Backend for generating news-compliant Telugu social media content.",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    # Fallback to system env if needed, or print warning
    print("Warning: GEMINI_API_KEY is not set in environmental variables.")
else:
    genai.configure(api_key=GEMINI_API_KEY)

# Pydantic Schemas
class GenerateRequest(BaseModel):
    title: str = Field(..., min_length=1, description="Title of the news article")
    content: str = Field(..., min_length=1, description="Full body content of the news article")
    platform: str = Field(default="all", description="Target platform: whatsapp, facebook, instagram, twitter, or all")

class GenerateResponse(BaseModel):
    summary: str = Field(..., description="2-3 line Telugu news summary")
    whatsapp: str = Field(..., description="WhatsApp shareable Telugu message")
    facebook: str = Field(..., description="Engaging Facebook post in Telugu with CTA")
    instagram: str = Field(..., description="Punchy, visual Instagram caption in Telugu")
    twitter: str = Field(..., description="X (Twitter) post in Telugu matching character limits")
    hashtags: str = Field(..., description="Comma-separated trending hashtags")
    breaking_news: str = Field(..., description="Urgent breaking-news style caption starting with symbol")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Telugu AI API is running"}

def parse_extracted_section(text: str, marker: str, next_markers: list) -> str:
    """Helper to extract text between marker and the next closest marker."""
    start_idx = text.find(marker)
    if start_idx == -1:
        return ""
    
    # Start after the header marker
    start_pos = start_idx + len(marker)
    
    # Find the nearest next marker
    end_pos = len(text)
    for next_marker in next_markers:
        pos = text.find(next_marker, start_pos)
        if pos != -1 and pos < end_pos:
            end_pos = pos
            
    extracted = text[start_pos:end_pos].strip()
    return extracted

@app.post("/generate-content", response_model=GenerateResponse)
def generate_content(request: GenerateRequest):
    # Validation
    if not request.title.strip():
        raise HTTPException(status_code=400, detail="Article title cannot be empty")
    if not request.content.strip():
        raise HTTPException(status_code=400, detail="Article content cannot be empty")

    # Build the strict Prompt
    prompt = f"""You are an expert Telugu language content writer for a professional news media company.

ARTICLE TITLE: {request.title}
ARTICLE CONTENT: {request.content}

Generate social media content in Telugu language. Follow these STRICT rules:
- Write in natural, professional Telugu (తెలుగు)
- NEVER invent or alter any facts, names, numbers, dates, or locations
- Keep all proper nouns, names, and numbers exactly as they appear
- Maintain a professional news tone — no slang
- Each section must be clearly marked with the exact headers below

Generate ALL of the following sections:

[SUMMARY]
Write a 2-3 line Telugu summary that is reader-friendly and captures the key facts of the article.

[WHATSAPP]
Write a concise, shareable WhatsApp message in Telugu. Include key facts. Keep it under 300 characters. Suitable for forwarding in news groups.

[FACEBOOK]
Write an engaging Facebook post in Telugu for a news audience. 3-5 sentences. Include a call to action like "మీ అభిప్రాయం చెప్పండి" or similar.

[INSTAGRAM]
Write a short, attention-grabbing Instagram caption in Telugu. 1-2 lines max. Punchy and visual.

[TWITTER]
Write a concise X (Twitter) post in Telugu. Must be under 240 characters. Newsworthy and direct.

[HASHTAGS]
Generate 8-12 hashtags. Mix of: Telugu hashtags (like #తెలుగువార్తలు), English news hashtags (like #BreakingNews #Telugu), topic-specific hashtags, and location hashtags if relevant. Comma-separated.

[BREAKING]
Write an urgent breaking-news style Telugu caption. Short, impactful, starts with 🔴 or ⚡. Suitable for push notifications.

IMPORTANT: Use exactly these section headers: [SUMMARY], [WHATSAPP], [FACEBOOK], [INSTAGRAM], [TWITTER], [HASHTAGS], [BREAKING]
"""

    try:
        # We use the recommended gemini-1.5-flash as specified by user requirements in backend/main.py
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Define headers
        headers = [
            "[SUMMARY]",
            "[WHATSAPP]",
            "[FACEBOOK]",
            "[INSTAGRAM]",
            "[TWITTER]",
            "[HASHTAGS]",
            "[BREAKING]"
        ]
        
        # Parse sections
        summary = parse_extracted_section(response_text, "[SUMMARY]", headers[1:])
        whatsapp = parse_extracted_section(response_text, "[WHATSAPP]", [h for h in headers if h != "[WHATSAPP]" and headers.index(h) > 1])
        facebook = parse_extracted_section(response_text, "[FACEBOOK]", [h for h in headers if h != "[FACEBOOK]" and headers.index(h) > 2])
        instagram = parse_extracted_section(response_text, "[INSTAGRAM]", [h for h in headers if h != "[INSTAGRAM]" and headers.index(h) > 3])
        twitter = parse_extracted_section(response_text, "[TWITTER]", [h for h in headers if h != "[TWITTER]" and headers.index(h) > 4])
        hashtags = parse_extracted_section(response_text, "[HASHTAGS]", [h for h in headers if h != "[HASHTAGS]" and headers.index(h) > 5])
        breaking = parse_extracted_section(response_text, "[BREAKING]", [])
        
        # Fallback handling in case parsing fails slightly
        if not summary and response_text:
            # If standard markers failed, do a simple line-based split or use the text
            summary = "వార్తలను సులభంగా అర్థం చేసుకునేందుకు సంక్షిప్త సారాంశం అందుబాటులో లేకపోవచ్చు."
            
        return GenerateResponse(
            summary=summary or "సారాంశం సిద్ధం కాలేదు.",
            whatsapp=whatsapp or "వాట్సాప్ సందేశం సిద్ధం కాలేదు.",
            facebook=facebook or "ఫేస్బుక్ పోస్ట్ సిద్ధం కాలేదు.",
            instagram=instagram or "ఇన్‌స్టాగ్రామ్ క్యాప్షన్ సిద్ధం కాలేదు.",
            twitter=twitter or "ట్విట్టర్ పోస్ట్ సిద్ధం కాలేదు.",
            hashtags=hashtags or "#TeluguNews, #BreakingNews, #Telugu",
            breaking_news=breaking or f"🔴 {request.title}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating Telugu content: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
