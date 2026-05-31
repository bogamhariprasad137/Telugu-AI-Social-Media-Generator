import { useState } from "react";
import { Languages, RotateCw, Check, AlertCircle, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ArticleInputProps {
  title: string;
  setTitle: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  showErrorHighlight: boolean;
}

export default function ArticleInput({
  title,
  setTitle,
  content,
  setContent,
  showErrorHighlight,
}: ArticleInputProps) {
  const { uiLang, t } = useLanguage();
  const [translating, setTranslating] = useState<"te" | "en" | "both" | null>(null);
  const [transError, setTransError] = useState<string | null>(null);
  const [transSuccess, setTransSuccess] = useState<boolean>(false);

  const getWordCount = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const isTitleEmpty = showErrorHighlight && !title.trim();
  const isContentEmpty = showErrorHighlight && !content.trim();

  // Translation handler using /api/translate
  const handleTranslate = async (targetLang: "te" | "en" | "both") => {
    if (!title.trim() && !content.trim()) {
      setTransError(t("transErrorText"));
      return;
    }

    setTranslating(targetLang);
    setTransError(null);
    setTransSuccess(false);

    try {
      if (targetLang === "both") {
        // Create side-by-side bilingual format!
        let finalTitle = title;
        let finalContent = content;

        if (title.trim()) {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: title, targetLang: "both" }),
          });
          const data = await res.json();
          if (res.ok && data.telugu && data.english) {
            finalTitle = `${data.telugu} | ${data.english}`;
          } else {
            // Fallback to sequential translate
            const teRes = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: title, targetLang: "te" }),
            });
            const teData = await teRes.json();
            const enRes = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: title, targetLang: "en" }),
            });
            const enData = await enRes.json();
            if (teRes.ok && enRes.ok) {
              finalTitle = `${teData.translated} | ${enData.translated}`;
            }
          }
        }

        if (content.trim()) {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: content, targetLang: "both" }),
          });
          const data = await res.json();
          if (res.ok && data.telugu && data.english) {
            finalContent = `తెలుగు (Telugu):\n${data.telugu}\n\nEnglish:\n${data.english}`;
          } else {
            // Fallback sequential
            const teRes = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: content, targetLang: "te" }),
            });
            const teData = await teRes.json();
            const enRes = await fetch("/api/translate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: content, targetLang: "en" }),
            });
            const enData = await enRes.json();
            if (teRes.ok && enRes.ok) {
              finalContent = `తెలుగు (Telugu):\n${teData.translated}\n\nEnglish:\n${enData.translated}`;
            }
          }
        }

        setTitle(finalTitle);
        setContent(finalContent);
      } else {
        // Direct conversion to single target language
        if (title.trim()) {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: title, targetLang }),
          });
          if (res.ok) {
            const data = await res.json();
            setTitle(data.translated);
          }
        }

        if (content.trim()) {
          const res = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: content, targetLang }),
          });
          if (res.ok) {
            const data = await res.json();
            setContent(data.translated);
          }
        }
      }

      setTransSuccess(true);
      setTimeout(() => setTransSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setTransError(t("transErrorText"));
    } finally {
      setTranslating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 🌟 SMART BILINGUAL TRANSLATION ASSISTANT */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-saffron-555" />
            <h4 className={`text-xs font-bold text-slate-700 dark:text-slate-300 ${uiLang === "te" ? "font-telugu" : "font-sans"}`}>
              {t("translationAssistantHeader")}
            </h4>
          </div>
          {translating && (
            <span className="flex items-center gap-1 text-[10px] text-saffron-500 font-bold font-mono animate-pulse shrink-0">
              <RotateCw className="w-3 h-3 animate-spin" /> {t("transWaitSub")}
            </span>
          )}
          {transSuccess && (
            <span className={`flex items-center gap-1 text-[10px] text-emerald-500 font-bold shrink-0 ${uiLang === 'te' ? 'font-telugu' : 'font-sans'}`}>
              <Check className="w-3 h-3" /> {t("transComplete")}
            </span>
          )}
        </div>

        <p className="text-[10px] text-slate-500 leading-normal font-sans">
          {t("translationAssistantSubtitle")}
        </p>

        {transError && (
          <div className="text-[11px] text-red-500 flex items-center gap-1.5 font-telugu bg-red-50 dark:bg-red-950/20 p-2 rounded-lg">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{transError}</span>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          {/* Translate into Telugu */}
          <button
            id="translate-to-te-btn"
            type="button"
            onClick={() => handleTranslate("te")}
            disabled={!!translating}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-saffron-500/20 disabled:opacity-50 transition cursor-pointer"
          >
            <span className="text-[11px] font-bold text-saffron-600 dark:text-saffron-400 font-telugu">{t("toTeluguBtn")}</span>
            <span className="text-[9px] text-slate-400">{t("toTeluguBtnSub")}</span>
          </button>

          {/* Translate into English */}
          <button
            id="translate-to-en-btn"
            type="button"
            onClick={() => handleTranslate("en")}
            disabled={!!translating}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-saffron-500/20 disabled:opacity-50 transition cursor-pointer"
          >
            <span className="text-[11px] font-bold text-saffron-600 dark:text-saffron-400 font-sans">{t("toEnglishBtn")}</span>
            <span className="text-[9px] text-slate-400">{t("toEnglishBtnSub")}</span>
          </button>

          {/* Both (Side by Side) */}
          <button
            id="translate-to-both-btn"
            type="button"
            onClick={() => handleTranslate("both")}
            disabled={!!translating}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-905 dark:to-slate-850 border border-amber-200/60 dark:border-slate-800 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-saffron-500/20 disabled:opacity-50 transition cursor-pointer text-center"
          >
            <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 font-telugu flex items-center justify-center gap-1 w-full flex-wrap">
              {t("dualBilingualBtn")} <Sparkles className="w-3 h-3 shrink-0" />
            </span>
            <span className="text-[9px] text-slate-500 font-sans">{t("dualBilingualBtnSub")}</span>
          </button>
        </div>
      </div>

      {/* Article Title Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="article-title-input" className="text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className={uiLang === 'te' ? 'font-telugu' : 'font-sans'}>{t("titleLabel")}</span>
            <span className="text-red-500">*</span>
          </label>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            {title.length} {t("charsLabel")}
          </span>
        </div>
        <input
          id="article-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("titlePlaceholder")}
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-4 transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white ${
            isTitleEmpty
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
              : "border-slate-200 dark:border-slate-800 focus:border-saffron-500 focus:ring-saffron-500/15"
          }`}
        />
        {isTitleEmpty && (
          <p className="text-xs text-red-500 font-telugu">{t("titleError")}</p>
        )}
      </div>

      {/* Article Content Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="article-content-input" className="text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <span className={uiLang === 'te' ? 'font-telugu' : 'font-sans'}>{t("contentLabel")}</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>{getWordCount(content)} {t("wordsLabel")}</span>
            <span>|</span>
            <span>{content.length} {t("charsLabel")}</span>
          </div>
        </div>
        <textarea
          id="article-content-input"
          rows={9}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={t("contentPlaceholder")}
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-4 transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-y leading-relaxed ${
            isContentEmpty
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
              : "border-slate-200 dark:border-slate-800 focus:border-saffron-500 focus:ring-saffron-500/15"
          }`}
        />
        {isContentEmpty && (
          <p className="text-xs text-red-500 font-telugu">{t("contentError")}</p>
        )}
      </div>
    </div>
  );
}
