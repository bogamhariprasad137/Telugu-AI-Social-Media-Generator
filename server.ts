import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load local environmental variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the Google GenAI SDK on the server side
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// GET /api/health
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Telugu AI Node Server is running safely" });
});

/**
 * Helper to extract sections between markers
 */
function parseSection(text: string, marker: string, nextMarkers: string[]): string {
  const startIdx = text.indexOf(marker);
  if (startIdx === -1) return "";

  const startPos = startIdx + marker.length;
  let endPos = text.length;

  for (const nextMarker of nextMarkers) {
    const pos = text.indexOf(nextMarker, startPos);
    if (pos !== -1 && pos < endPos) {
      endPos = pos;
    }
  }

  return text.substring(startPos, endPos).trim();
}

// POST /api/generate-content
app.post("/api/generate-content", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Article title cannot be empty" });
  }
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Article content cannot be empty" });
  }

  const prompt = `You are an expert Telugu and English bilingual social media content writer for a professional news media company.

ARTICLE TITLE: ${title}
ARTICLE CONTENT: ${content}

Generate highly professional social media content in BOTH Telugu (తెలుగు) and English. Follow these STRICT rules:
- Write Telugu sections in natural, professional Telugu (తెలుగు)
- Write English sections in concise, engaging English suited for professional journalism
- NEVER invent or alter any facts, names, numbers, dates, or locations
- Keep all proper nouns, names, and numbers exactly as they appear
- Maintain a professional news tone — no slang
- Each section must be clearly marked with the exact bracketed headers below

Generate ALL of the following sections side by side in order:

[SUMMARY]
Write a 2-3 line Telugu summary that is reader-friendly and captures the key facts of the article.

[SUMMARY_EN]
Write a 2-3 line English summary that is professional and captures the key facts.

[WHATSAPP]
Write a concise, shareable WhatsApp message in Telugu. Format with nice bold points/emojis. Include key facts. Keep it under 300 characters.

[WHATSAPP_EN]
Write a concise, shareable WhatsApp message in English. Format with nice layout/emojis. Keep it under 300 characters.

[FACEBOOK]
Write an engaging Facebook post in Telugu for a regional news audience. 3-5 sentences. Include a call to action like "మీ అభిప్రాయం చెప్పండి".

[FACEBOOK_EN]
Write an engaging Facebook post in English for a general audience. 3-5 sentences. Include an engaging question or call to action.

[INSTAGRAM]
Write a short, attention-grabbing Instagram caption in Telugu. 1-2 lines max. Punchy and visual.

[INSTAGRAM_EN]
Write a short, attention-grabbing Instagram caption in English. 1-2 lines. Visual and engaging.

[TWITTER]
Write a concise X (Twitter) post in Telugu. Must be under 240 characters. Newsworthy and direct.

[TWITTER_EN]
Write a concise X (Twitter) post in English. Must be under 240 characters. Direct and newsworthy.

[HASHTAGS]
Generate 8-12 regional hashtags. Mix of Telugu hashtags (like #తెలుగువార్తలు) and general news tags. Comma-separated.

[HASHTAGS_EN]
Generate 8-12 English hashtags (like #HyderabadNews #BreakingNews #TeluguMedia). Comma-separated.

[BREAKING]
Write an urgent breaking-news style Telugu caption. Short, impactful, starts with 🔴 or ⚡.

[BREAKING_EN]
Write an urgent breaking-news style English caption. Short, impactful, starts with 🔴 or ⚡.

IMPORTANT: Use exactly these section headers: [SUMMARY], [SUMMARY_EN], [WHATSAPP], [WHATSAPP_EN], [FACEBOOK], [FACEBOOK_EN], [INSTAGRAM], [INSTAGRAM_EN], [TWITTER], [TWITTER_EN], [HASHTAGS], [HASHTAGS_EN], [BREAKING], [BREAKING_EN]`;

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in the workspace environmental secrets panel.");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";

    const headers = [
      "[SUMMARY]",
      "[SUMMARY_EN]",
      "[WHATSAPP]",
      "[WHATSAPP_EN]",
      "[FACEBOOK]",
      "[FACEBOOK_EN]",
      "[INSTAGRAM]",
      "[INSTAGRAM_EN]",
      "[TWITTER]",
      "[TWITTER_EN]",
      "[HASHTAGS]",
      "[HASHTAGS_EN]",
      "[BREAKING]",
      "[BREAKING_EN]",
    ];

    const summary = parseSection(responseText, "[SUMMARY]", headers.slice(1));
    const summary_en = parseSection(responseText, "[SUMMARY_EN]", headers.slice(2));
    const whatsapp = parseSection(responseText, "[WHATSAPP]", headers.slice(3));
    const whatsapp_en = parseSection(responseText, "[WHATSAPP_EN]", headers.slice(4));
    const facebook = parseSection(responseText, "[FACEBOOK]", headers.slice(5));
    const facebook_en = parseSection(responseText, "[FACEBOOK_EN]", headers.slice(6));
    const instagram = parseSection(responseText, "[INSTAGRAM]", headers.slice(7));
    const instagram_en = parseSection(responseText, "[INSTAGRAM_EN]", headers.slice(8));
    const twitter = parseSection(responseText, "[TWITTER]", headers.slice(9));
    const twitter_en = parseSection(responseText, "[TWITTER_EN]", headers.slice(10));
    const hashtags = parseSection(responseText, "[HASHTAGS]", headers.slice(11));
    const hashtags_en = parseSection(responseText, "[HASHTAGS_EN]", headers.slice(12));
    const breaking = parseSection(responseText, "[BREAKING]", headers.slice(13));
    const breaking_en = parseSection(responseText, "[BREAKING_EN]", []);

    res.status(200).json({
      summary: summary || "సంక్షిప్త సారాంశం సిద్ధం చేయడంలో అంతరాయం కలిగింది.",
      summary_en: summary_en || "Brief summary could not be generated.",
      whatsapp: whatsapp || `వాట్సాప్ అప్‌డేట్: ${title}`,
      whatsapp_en: whatsapp_en || `WhatsApp Update: ${title}`,
      facebook: facebook || `ఫేస్‌బుక్ కథనం: ${title}`,
      facebook_en: facebook_en || `Facebook Post: ${title}`,
      instagram: instagram || `ఇన్‌స్టాగ్రామ్ క్యాప్షన్ సిద్ధం కాలేదు.`,
      instagram_en: instagram_en || `Instagram caption is unavailable.`,
      twitter: twitter || `ఎక్స్ అప్‌డేట్: ${title}`,
      twitter_en: twitter_en || `X Update: ${title}`,
      hashtags: hashtags || "#TeluguNews, #BreakingNews, #Telugu",
      hashtags_en: hashtags_en || "#TeluguNews, #BreakingNews, #TeluguMedia",
      breaking_news: breaking || `🔴 ${title}`,
      breaking_news_en: breaking_en || `🔴 BREAKING: ${title}`,
    });
  } catch (error: any) {
    console.error("Express backend failed to query Gemini:", error);
    res.status(500).json({
      detail: `కంటెంట్ సృష్టి నిలిచిపోయింది: ${error.message || "Gemini API call failed"}`,
    });
  }
});

// POST /api/translate
app.post("/api/translate", async (req, res) => {
  const { text, targetLang } = req.body; // targetLang: 'te' | 'en' | 'both'
  
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text to translate cannot be empty" });
  }

  const prompt = `You are an expert bilingual Telugu and English news translator.
Input text to translate:
"""
${text}
"""

Translate the input text cleanly and professionally. Follow these guidelines:
- Maintain absolute accuracy for names, numbers, dates, locations, and statistics.
- If targetLang is "te", translate to natural, journalistic, professional Telugu (తెలుగు).
- If targetLang is "en", translate to clear, professional, newsroom-standard English.
- If targetLang is "both", perform translation into BOTH languages and output them strictly formatted as below:

[TELUGU]
<translated Telugu text>

[ENGLISH]
<translated English text>

Ensure you produce a high fidelity translation. Do not include translator notes or general conversing.`;

  try {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in the workspace environmental secrets panel.");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const responseText = response.text || "";

    if (targetLang === "both") {
      const telugu = parseSection(responseText, "[TELUGU]", ["[ENGLISH]"]) || responseText;
      const english = parseSection(responseText, "[ENGLISH]", []) || responseText;
      return res.status(200).json({ telugu, english });
    }

    res.status(200).json({ translated: responseText.trim() });
  } catch (error: any) {
    console.error("Translation API failed:", error);
    res.status(500).json({ error: `Translation failed: ${error.message}` });
  }
});

// Configure Vite middleware in development vs static rendering in production
async function setupViteMiddleware() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server successfully running on port ${PORT}`);
  });
}

setupViteMiddleware();
