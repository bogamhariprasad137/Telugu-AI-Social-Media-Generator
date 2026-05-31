import DarkModeToggle from "./DarkModeToggle";
import { Radio, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const { uiLang, setUiLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Side: Brand Logo and Typography */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 bg-saffron-500 text-white rounded-xl shadow-lg shadow-saffron-500/20 ring-4 ring-saffron-500/10 shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
            </span>
          </div>
          <div>
            <h1 className={`${uiLang === 'te' ? 'font-telugu' : 'font-sans'} text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight`}>
              {t("brandTitle")}
            </h1>
            <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              {t("brandSubTitle")}
            </p>
          </div>
        </div>

        {/* Right Side: Global actions, Theme & Language Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-2 mr-1">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200/40 dark:border-red-900/40">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
              {t("liveBadge")}
            </span>
          </div>

          {/* 🌐 Global Website Language Changing Toggler */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-xl text-[11px] font-bold">
            <div className="p-1 px-1.5 text-slate-400 dark:text-slate-500 hidden sm:block">
              <Languages className="w-3.5 h-3.5" />
            </div>
            <button
              id="header-lang-btn-te"
              onClick={() => setUiLang("te")}
              className={`px-2.5 py-1 rounded-lg transition-all duration-150 cursor-pointer ${
                uiLang === "te"
                  ? "bg-white dark:bg-slate-800 text-saffron-600 dark:text-saffron-400 shadow-sm font-telugu"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-telugu"
              }`}
              title="తెలుగు వెబ్సైట్ కంటెంట్"
            >
              తెలుగు
            </button>
            <button
              id="header-lang-btn-en"
              onClick={() => setUiLang("en")}
              className={`px-2.5 py-1 rounded-lg transition-all duration-150 cursor-pointer ${
                uiLang === "en"
                  ? "bg-white dark:bg-slate-800 text-saffron-600 dark:text-saffron-400 shadow-sm font-sans"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-sans"
              }`}
              title="English UI Content"
            >
              English
            </button>
          </div>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
