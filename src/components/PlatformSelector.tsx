import { Platform } from "../types";
import { MessageSquare, Facebook, Instagram, Twitter, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onChange: (platform: Platform) => void;
}

export default function PlatformSelector({
  selectedPlatform,
  onChange,
}: PlatformSelectorProps) {
  const { uiLang, t } = useLanguage();
  
  const platformsList = [
    {
      id: "all" as Platform,
      label: t("allPlatformsLabel"),
      subLabel: t("allPlatformsSub"),
      color: "border-orange-200 hover:border-orange-300 dark:border-orange-950 dark:hover:border-orange-900 bg-orange-50/40 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400",
      activeColor: "bg-saffron-500 text-white border-saffron-500 shadow-lg shadow-saffron-500/15",
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: "whatsapp" as Platform,
      label: "WhatsApp",
      subLabel: uiLang === "te" ? "వాట్సాప్" : "Instant broadcast",
      color: "border-emerald-200 hover:border-emerald-300 dark:border-emerald-950 dark:hover:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400",
      activeColor: "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/15",
      icon: <MessageSquare className="w-4 h-4 text-emerald-500 group-hover:text-current active:text-current" />
    },
    {
      id: "facebook" as Platform,
      label: "Facebook",
      subLabel: uiLang === "te" ? "ఫేస్‌బుక్" : "Social Network",
      color: "border-blue-200 hover:border-blue-300 dark:border-blue-950 dark:hover:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400",
      activeColor: "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/15",
      icon: <Facebook className="w-4 h-4 text-blue-500" />
    },
    {
      id: "instagram" as Platform,
      label: "Instagram",
      subLabel: uiLang === "te" ? "ఇన్‌స్టాగ్రామ్" : "Visual Media",
      color: "border-pink-200 hover:border-pink-300 dark:border-pink-950 dark:hover:border-pink-900 bg-pink-50/40 dark:bg-pink-950/20 text-pink-700 dark:text-pink-400",
      activeColor: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white border-pink-500 shadow-lg shadow-purple-500/15",
      icon: <Instagram className="w-4 h-4 text-pink-500" />
    },
    {
      id: "twitter" as Platform,
      label: "X (Twitter)",
      subLabel: uiLang === "te" ? "ట్విట్టర్" : "Microblogging",
      color: "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300",
      activeColor: "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 border-slate-900 dark:border-slate-100 shadow-lg shadow-slate-950/15",
      icon: <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
    },
  ];

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <span className="text-sm lg:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <span className={uiLang === "te" ? "font-telugu" : "font-sans"}>{t("platformSelectorLabel")}</span>
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500">({t("platformSelectorSubLabel")})</span>
        </span>
      </div>
      
      {/* Pills Container */}
      <div className="flex flex-wrap gap-2.5">
        {platformsList.map((pf) => {
          const isSelected = selectedPlatform === pf.id;
          return (
            <button
              id={`platform-selector-btn-${pf.id}`}
              key={pf.id}
              onClick={() => onChange(pf.id)}
              className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/20 ${
                isSelected ? pf.activeColor : pf.color
              }`}
            >
              <span className={isSelected ? "text-white" : ""}>{pf.icon}</span>
              <div className="flex flex-col items-start leading-none">
                <span className={uiLang === 'te' && pf.id === 'all' ? 'font-telugu' : 'font-sans'}>{pf.label}</span>
                <span className={`text-[9px] font-normal leading-none mt-0.5 ${
                  isSelected ? "text-white/80" : "text-slate-400 dark:text-slate-500"
                } ${uiLang === 'te' && (pf.id !== 'all') ? 'font-telugu' : 'font-sans'}`}>
                  {pf.subLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
