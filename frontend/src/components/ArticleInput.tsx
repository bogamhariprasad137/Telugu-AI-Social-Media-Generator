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
  
  const getWordCount = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const isTitleEmpty = showErrorHighlight && !title.trim();
  const isContentEmpty = showErrorHighlight && !content.trim();

  return (
    <div className="space-y-6">
      {/* Article Title Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="article-title-input" className="font-telugu text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            వార్తా శీర్షిక <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Article Title)</span>
            <span className="text-red-500">*</span>
          </label>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
            {title.length} chars
          </span>
        </div>
        <input
          id="article-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ఉదా: కొత్తగా ప్రారంభించిన తెలుగు సాంకేతిక పరిజ్ఞానం... | E.g., The newly launched technology..."
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-4 transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white ${
            isTitleEmpty
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
              : "border-slate-200 dark:border-slate-800 focus:border-saffron-500 focus:ring-saffron-500/15"
          }`}
        />
        {isTitleEmpty && (
          <p className="text-xs text-red-500 font-telugu">కంటెంట్ తయారు చేయడానికి శీర్షిక రాయడం తప్పనిసరి.</p>
        )}
      </div>

      {/* Article Content Field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="article-content-input" className="font-telugu text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            వార్తా వివరాలు <span className="text-xs font-normal text-slate-400 dark:text-slate-500">(Article Content)</span>
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>{getWordCount(content)} words</span>
            <span>|</span>
            <span>{content.length} chars</span>
          </div>
        </div>
        <textarea
          id="article-content-input"
          rows={9}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ఇక్కడ మీ విస్తృతమైన వార్తా వ్యాసాన్ని లేదా కంటెంట్ వివరాలను టైప్ చేయండి లేదా పేస్ట్ చేయండి...&#10;&#10;Type or paste your detailed news article body here..."
          className={`w-full px-4 py-3 rounded-xl border font-sans text-sm focus:outline-none focus:ring-4 transition-all duration-200 bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-y leading-relaxed ${
            isContentEmpty
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
              : "border-slate-200 dark:border-slate-800 focus:border-saffron-500 focus:ring-saffron-500/15"
          }`}
        />
        {isContentEmpty && (
          <p className="text-xs text-red-500 font-telugu">నివేదిక ప్రకారం వార్త యొక్క పూర్తి వివరాలు నమోదు చేయండి.</p>
        )}
      </div>
    </div>
  );
}
