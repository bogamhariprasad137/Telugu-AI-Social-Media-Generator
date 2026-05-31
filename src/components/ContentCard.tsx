import { useState, ReactNode, useEffect } from "react";
import { Copy, Check, RotateCw, AlertTriangle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ContentCardProps {
  key?: string;
  label: string;
  subLabel?: string;
  icon: ReactNode;
  content: string;        // Telugu content
  contentEn?: string;     // English content
  charLimit?: number;
  onCopy: (text: string) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export default function ContentCard({
  label,
  subLabel,
  icon,
  content,
  contentEn = "",
  charLimit,
  onCopy,
  onRegenerate,
  isRegenerating,
}: ContentCardProps) {
  const { uiLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"te" | "en">(uiLang);
  const [copied, setCopied] = useState(false);

  // Sync tab with global UI Language selection automatically
  useEffect(() => {
    if (contentEn) {
      setActiveTab(uiLang);
    } else {
      setActiveTab("te");
    }
  }, [uiLang, contentEn]);

  const activeContent = activeTab === "te" ? content : (contentEn || content);

  const handleCopy = () => {
    onCopy(activeContent);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2050);
  };

  const charCount = activeContent.length;
  const wordCount = activeContent.trim() ? activeContent.trim().split(/\s+/).length : 0;
  const isOverLimit = charLimit ? charCount > charLimit : false;

  return (
    <div className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-saffron-500/50 flex flex-col justify-between">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 group-hover:text-saffron-500 transition-colors duration-200 shrink-0">
              {icon}
            </div>
            <div>
              <h3 className={`font-semibold text-sm lg:text-base text-slate-900 dark:text-white leading-tight ${uiLang === 'te' ? 'font-telugu' : 'font-sans'}`}>
                {label}
              </h3>
              {subLabel && (
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wider font-semibold">
                  {subLabel}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons (Copy | Regenerate) */}
          <div className="flex items-center space-x-1.5">
            {/* Copy button */}
            <button
              id={`content-card-copy-btn-${label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={handleCopy}
              disabled={!activeContent}
              className={`p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron-500/20 cursor-pointer ${
                copied
                  ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
              title="Copy Content"
            >
              {copied ? <Check className="w-4 h-4 scale-110" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Regenerate single card */}
            <button
              id={`content-card-re-btn-${label.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={onRegenerate}
              disabled={isRegenerating || !content}
              className={`p-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-saffron-500/20 cursor-pointer transition-all duration-200 ${
                isRegenerating
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-600 dark:text-amber-400"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              }`}
              title="Regenerate Section"
            >
              <RotateCw className={`w-4 h-4 ${isRegenerating ? "animate-spin text-saffron-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Language Tabs Row */}
        {contentEn && (
          <div className="flex bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200/40 dark:border-slate-800/80 mt-3 max-w-[170px]">
            <button
              onClick={() => setActiveTab("te")}
              className={`flex-1 text-center py-1 text-[11px] font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                activeTab === "te"
                  ? "bg-white dark:bg-slate-800 text-saffron-600 dark:text-saffron-400 shadow-sm font-telugu"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 font-telugu"
              }`}
            >
              తెలుగు (te)
            </button>
            <button
              onClick={() => setActiveTab("en")}
              className={`flex-1 text-center py-1 text-[11px] font-semibold rounded-md transition-all duration-150 cursor-pointer ${
                activeTab === "en"
                  ? "bg-white dark:bg-slate-800 text-saffron-600 dark:text-saffron-400 shadow-sm font-sans"
                  : "text-slate-500 hover:text-slate-850 dark:hover:text-slate-300 font-sans"
              }`}
            >
              English
            </button>
          </div>
        )}

        {/* Content Box */}
        <div className="mt-4 pb-4">
          <p className={`${activeTab === "te" ? "font-telugu" : "font-sans"} text-sm lg:text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 font-normal whitespace-pre-wrap select-all selection:bg-saffron-500/25 selection:text-slate-950 dark:selection:text-white`}>
            {activeContent || t("viewsUnavailable")}
          </p>
        </div>
      </div>

      {/* Card Footer: Metadata indicators */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 mt-2">
        <div className="flex items-center space-x-2">
          <span>{wordCount} {t("wordsLabel")}</span>
          <span>•</span>
          <span className={isOverLimit ? "text-red-500 font-bold" : ""}>
            {charCount} {charLimit ? `/ ${charLimit}` : ""} {t("charsLabel")}
          </span>
        </div>

        {isOverLimit && (
          <div className="flex items-center text-red-500 gap-1 font-semibold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{t("overLimitLabel")}</span>
          </div>
        )}
      </div>
    </div>
  );
}
