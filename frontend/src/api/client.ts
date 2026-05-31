import { GenerateRequest, GenerateResponse } from "../types";

// Determine absolute base URL
const getApiBaseUrl = (): string => {
  const envUrl = (import.meta as any).env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }
  
  // If we are running in AI Studio sandbox, fallback to relative API proxy path
  if (typeof window !== "undefined") {
    if (window.location.host.includes("asia-southeast1.run.app") || window.location.host.includes("localhost")) {
      return window.location.origin;
    }
  }
  return "http://localhost:8000";
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
    if (!response.ok) {
      const retryResponse = await fetch(`${BASE_URL}/health`, { method: "GET" });
      return retryResponse.ok;
    }
    return true;
  } catch (error) {
    console.error("API connection health check failed:", error);
    return false;
  }
}

/**
 * Send request to generate news-compliant Telugu social media posts
 */
export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  let endpoint = `${BASE_URL}/api/generate-content`;
  if (BASE_URL.endsWith(":8000")) {
    endpoint = `${BASE_URL}/generate-content`;
  }

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
      if (endpoint.includes("/api/")) {
        const fallbackEndpoint = `${BASE_URL}/generate-content`;
        const retryRes = await fetch(fallbackEndpoint, {
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
        if (retryRes.ok) {
          return await retryRes.json();
        }
      }

      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.detail || `HTTP error ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to generate Telugu content in API client:", error);
    throw new Error(error.message || "కనెక్టివిటీ లోపం సంభవించింది. దయచేసి మళ్లీ ప్రయత్নন্দండి.");
  }
}
