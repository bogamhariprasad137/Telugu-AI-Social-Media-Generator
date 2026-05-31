import { GenerateRequest, GenerateResponse } from "../types";

// Dynamic absolute base URL
const getApiBaseUrl = (): string => {
  const envUrl = (import.meta as any).env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }
  
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
};

const BASE_URL = getApiBaseUrl();

/**
 * Health check to verify availability of our Telugu social AI API
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/api/health`, {
      method: "GET",
      headers: { "Accept": "application/json" }
    });
    return response.ok;
  } catch (error) {
    console.error("API connection health check failed:", error);
    return false;
  }
}

/**
 * Send request to generate news-compliant Telugu social media posts
 */
export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  const endpoint = `${BASE_URL}/api/generate-content`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: request.title,
        content: request.content,
        platform: request.platform
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || `HTTP error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to generate Telugu content in API client:", error);
    throw new Error(error.message || "కనెక్టివిటీ లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్నించండి.");
  }
}
