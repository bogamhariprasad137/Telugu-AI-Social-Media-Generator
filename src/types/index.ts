export type Platform = "all" | "whatsapp" | "facebook" | "instagram" | "twitter";

export interface GenerateRequest {
  title: string;
  content: string;
  platform: Platform;
}

export interface GenerateResponse {
  summary: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  twitter: string;
  hashtags: string;
  breaking_news: string;
  summary_en: string;
  whatsapp_en: string;
  facebook_en: string;
  instagram_en: string;
  twitter_en: string;
  hashtags_en: string;
  breaking_news_en: string;
}

export interface ContentSection {
  id: string;
  label: string;
  icon: string;
  content: string;
  platform: Platform | "summary" | "hashtags" | "breaking";
  charLimit?: number;
}
