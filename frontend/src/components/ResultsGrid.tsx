import { GenerateResponse } from "../types";
import ContentCard from "./ContentCard";
import DownloadPDFButton from "./DownloadPDFButton";
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
  
  const sections = [
    {
      id: "summary",
      label: "వార్తా సారాంశం",
      subLabel: "Brief Summary",
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      content: response.summary,
    },
    {
      id: "whatsapp",
      label: "వాట్సాప్ మెసేజ్",
      subLabel: "WhatsApp Message",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      content: response.whatsapp,
      charLimit: 300,
    },
    {
      id: "facebook",
      label: "ఫేస్‌బుక్ పోస్ట్",
      subLabel: "Facebook Post",
      icon: <Facebook className="w-5 h-5 text-blue-600" />,
      content: response.facebook,
    },
    {
      id: "instagram",
      label: "ఇన్‌స్టాగ్రామ్ పోస్ట్",
      subLabel: "Instagram Caption",
      icon: <Instagram className="w-5 h-5 text-pink-500" />,
      content: response.instagram,
    },
    {
      id: "twitter",
      label: "ఎక్స్ (ట్విట్టర్)",
      subLabel: "X (Twitter) Post",
      icon: <Twitter className="w-5 h-5 text-slate-800 dark:text-slate-100" />,
      content: response.twitter,
      charLimit: 240,
    },
    {
      id: "hashtags",
      label: "హ్యాష్ ట్యాగ్స్",
      subLabel: "Viral Hashtags",
      icon: <Hash className="w-5 h-5 text-amber-500" />,
      content: response.hashtags,
    },
    {
      id: "breaking_news",
      label: "బ్రేకింగ్ న్యూస్ అలర్ట్",
      subLabel: "Breaking Flash",
      icon: <Flame className="w-5 h-5 text-red-500" />,
      content: response.breaking_news,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Results Control Panel */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-colors duration-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white font-telugu">
            సృష్టించబడిన పోస్ట్‌లు సిద్ధంగా ఉన్నాయి
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">
            Select, edit, and export your optimized news packages.
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
            charLimit={sec.charLimit}
            onCopy={() => onCopySection(sec.content, sec.label)}
            onRegenerate={() => onRegenerateSection(sec.id)}
            isRegenerating={regeneratingId === sec.id}
          />
        ))}
      </div>
    </div>
  );
}
