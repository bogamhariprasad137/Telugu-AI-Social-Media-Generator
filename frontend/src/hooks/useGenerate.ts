import { useState } from "react";
import { Platform, GenerateResponse } from "../types";
import { generateContent } from "../api/client";

export function useGenerate() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>("all");
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regeneratingSection, setRegeneratingSection] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleGenerate = async () => {
    setError(null);
    if (!title.trim() && !content.trim()) {
      setError("వార్తా శీర్షిక మరియు వార్త వివరాలు రెండూ తప్పనిసరి.");
      return;
    }
    if (!title.trim()) {
      setError("కంటెంట్ తయారు చేయడానికి వార్తా శీర్షిక (Title) అవసరం.");
      return;
    }
    if (!content.trim()) {
      setError("కంటెంట్ తయారు చేయడానికి వార్తా వివరాలు (Content) అవసరం.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateContent({ title, content, platform });
      setResponse(data);
      triggerToast("కంటెంట్ విజయవంతంగా సృష్టించబడింది!");
    } catch (err: any) {
      setError(err.message || "కంటెంట్ సృష్టించడంలో సమస్య వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async (sectionId: string) => {
    if (!title.trim() || !content.trim()) {
      triggerToast("ఖచ్చితమైన రీజెనరేషన్ కొరకు శీర్షిక మరియు వివరాలు ముఖ్యం.");
      return;
    }

    setRegeneratingSection(sectionId);
    try {
      // Call standard generator to recreate but update only that section field
      const freshData = await generateContent({ title, content, platform });
      
      if (response) {
        setResponse((prev: any) => {
          if (!prev) return freshData;
          return {
            ...prev,
            [sectionId]: freshData[sectionId as keyof GenerateResponse] || prev[sectionId as keyof GenerateResponse],
          };
        });
        triggerToast("పోస్ట్ విజయవంతంగా పునరుద్ధరించబడింది!");
      } else {
        setResponse(freshData);
      }
    } catch (err: any) {
      triggerToast("పునఃసృష్టి చేయడం ఫెయిల్ అయింది. దయచేసి మళ్లీ ప్రయత్నించండి.");
    } finally {
      setRegeneratingSection(null);
    }
  };

  const copyToClipboard = async (text: string, platformLabel: string) => {
    if (!navigator.clipboard) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        triggerToast(`${platformLabel} కంటెంట్ కాపీ చేయబడింది!`);
      } catch (err) {
        triggerToast("కాపీ చేయడం సాధ్యపడలేదు.");
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      triggerToast(`${platformLabel} కంటెంట్ క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!`);
    } catch (err) {
      triggerToast("కాపీ చేయడం సాధ్యం కాలేదు.");
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    platform,
    setPlatform,
    response,
    setResponse,
    isLoading,
    regeneratingSection,
    error,
    setError,
    toastMessage,
    triggerToast,
    handleGenerate,
    handleRegenerate,
    copyToClipboard,
  };
}
