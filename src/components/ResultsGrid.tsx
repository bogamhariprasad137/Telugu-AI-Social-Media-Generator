import { GenerateResponse } from "../types";
import ContentCard from "./ContentCard";
import DownloadPDFButton from "./DownloadPDFButton";
import { useLanguage } from "../context/LanguageContext";
import {
  FileText,
  MessageSquare,
  Facebook,
  Instagram,
  Twitter,
  Hash,
  Flame,
} from "lucide-react";

interface ResultsGridProps {
  response: GenerateResponse;
  articleTitle: string;
  onCopySection: (text: string, label: string) => void;
  onRegenerateSection: (id: string) => void;
  regeneratingId: string | null;
}

export default function ResultsGrid({
  response,
  articleTitle,
  onCopySection,
  onRegenerateSection,
  regeneratingId,
}: ResultsGridProps) {
  const { uiLang, t } = useLanguage();
  
  const sections = [
    {
      id: "summary",
      label: t("summaryLabel"),
      subLabel: t("summarySubLabel"),
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      content: response.summary,
      contentEn: response.summary_en,
    },
    {
      id: "whatsapp",
      label: t("whatsappLabel"),
      subLabel: t("whatsappSubLabel"),
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      content: response.whatsapp,
      contentEn: response.whatsapp_en,
      charLimit: 300,
    },
    {
      id: "facebook",
      label: t("facebookLabel"),
      subLabel: t("facebookSubLabel"),
      icon: <Facebook className="w-5 h-5 text-blue-600" />,
      content: response.facebook,
      contentEn: response.facebook_en,
    },
    {
      id: "instagram",
      label: t("instagramLabel"),
      subLabel: t("instagramSubLabel"),
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
      content: response.instagram,
      contentEn: response.instagram_en,
    },
    {
      id: "twitter",
      label: t("twitterLabel"),
      subLabel: t("twitterSubLabel"),
      icon: <Twitter className="w-5 h-5 text-slate-800 dark:text-slate-100" />,
      content: response.twitter,
      contentEn: response.twitter_en,
      charLimit: 240,
    },
    {
      id: "hashtags",
      label: t("hashtagsLabel"),
      subLabel: t("hashtagsSubLabel"),
      icon: <Hash className="w-5 h-5 text-amber-500" />,
      content: response.hashtags,
      contentEn: response.hashtags_en,
    },
    {
      id: "breaking_news",
      label: t("breakingLabel"),
      subLabel: t("breakingSubLabel"),
      icon: <Flame className="w-5 h-5 text-red-500" />,
      content: response.breaking_news,
      contentEn: response.breaking_news_en,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Results Control Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors duration-200">
        <div>
          <h2 className={`text-base font-bold text-slate-900 dark:text-white ${uiLang === "te" ? "font-telugu" : "font-sans"}`}>
            {t("resultsHeader")}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            {t("resultsSub")}
          </p>
        </div>
        <DownloadPDFButton response={response} articleTitle={articleTitle} />
      </div>

      {/* Grid displaying cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((sec) => (
          <ContentCard
            key={sec.id}
            label={sec.label}
            subLabel={sec.subLabel}
            icon={sec.icon}
            content={sec.content}
            contentEn={sec.contentEn}
            charLimit={sec.charLimit}
            onCopy={(copiedText) => onCopySection(copiedText, sec.label)}
            onRegenerate={() => onRegenerateSection(sec.id)}
            isRegenerating={regeneratingId === sec.id}
          />
        ))}
      </div>
    </div>
  );
}
