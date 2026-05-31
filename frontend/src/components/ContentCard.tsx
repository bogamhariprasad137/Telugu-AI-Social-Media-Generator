import { useState, ReactNode } from "react";
import { Copy, Check, RotateCw, AlertTriangle } from "lucide-react";

interface ContentCardProps {
  key?: string;
  label: string;
  subLabel?: string;
  icon: ReactNode;
  content: string;
  charLimit?: number;
  onCopy: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export default function ContentCard({
  label,
  subLabel,
  icon,
  content,
  charLimit,
  onCopy,
  onRegenerate,
  isRegenerating,
}: ContentCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const charCount = content.length;
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const isOverLimit = charLimit ? charCount > charLimit : false;

  return (
    <div className="relative group bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:border-saffron-500/50 flex flex-col justify-between">
      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 group-hover:text-saffron-500 transition-colors duration-200">
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm lg:text-base text-slate-900 dark:text-white leading-tight">
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
              disabled={!content}
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

        {/* Content Box */}
        <div className="mt-4 pb-4">
          <p className="font-telugu text-sm lg:text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 font-normal whitespace-pre-wrap select-all selection:bg-saffron-500/25 selection:text-slate-950 dark:selection:text-white">
            {content || "వివరాలు అందుబాటులో లేవు."}
          </p>
        </div>
      </div>

      {/* Card Footer: Metadata indicators */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 dark:text-slate-500 mt-2">
        <div className="flex items-center space-x-2">
          <span>{wordCount} words</span>
          <span>•</span>
          <span className={isOverLimit ? "text-red-500 font-bold" : ""}>
            {charCount} {charLimit ? `/ ${charLimit}` : ""} chars
          </span>
        </div>

        {isOverLimit && (
          <div className="flex items-center text-red-500 gap-1 font-semibold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Over limit</span>
          </div>
        )}
      </div>
    </div>
  );
}
