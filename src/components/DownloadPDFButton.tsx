import { GenerateResponse } from "../types";
import { Download } from "lucide-react";

interface DownloadPDFButtonProps {
  response: GenerateResponse | null;
  articleTitle: string;
}

export default function DownloadPDFButton({ response, articleTitle }: DownloadPDFButtonProps) {
  const handleDownload = () => {
    if (!response) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `telugu-social-content-${timestamp}.txt`;

    const txtContent = `========================================================================
తెలుగు AI సోషల్ మీడియా పోస్ట్ జనరేటర్ - ద్విభాషా వార్తా కంటెంట్ రిపోర్ట్
========================================================================
మూల వార్తా శీర్షిక (Source Article):
${articleTitle || "నామకరణం చేయబడని వార్త"}

తేదీ (Generated Date): ${new Date().toLocaleString("en-US")}
------------------------------------------------------------------------

[1] సంక్షిప్త సారాంశం (BRIEF SUMMARY)
--------------------------------------
తెలుగు (Telugu):
${response.summary}

ఇంగ్లీష్ (English):
${response.summary_en || "N/A"}

[2] వాట్సాప్ ఫార్వర్డ్ సందేశం (WHATSAPP SHAREABLE)
-------------------------------------------------
తెలుగు (Telugu):
${response.whatsapp}

ఇంగ్లీష్ (English):
${response.whatsapp_en || "N/A"}

[3] ఫేస్బుక్ పోస్ట్ (FACEBOOK ENGAGING POST)
--------------------------------------------
తెలుగు (Telugu):
${response.facebook}

ఇంగ్లీష్ (English):
${response.facebook_en || "N/A"}

[4] ఇన్‌స్టాగ్రామ్ క్యాప్షన్ (INSTAGRAM VISUAL CAPTION)
----------------------------------------------------
తెలుగు (Telugu):
${response.instagram}

ఇంగ్లీష్ (English):
${response.instagram_en || "N/A"}

[5] ఎక్స్ - ట్విట్టర్ పోస్ట్ (X / TWITTER NEWSTHREAD)
---------------------------------------------------
తెలుగు (Telugu):
${response.twitter}

ఇంగ్లీష్ (English):
${response.twitter_en || "N/A"}

[6] ట్రెండింగ్ హ్యాష్ టాగ్స్ (HASHTAG CLUSTER)
---------------------------------------------
తెలుగు (Telugu):
${response.hashtags}

ఇంగ్లీష్ (English):
${response.hashtags_en || "N/A"}

[7] బ్రేకింగ్ న్యూస్ అలర్ట్ (BREAKING NEWS PUSH NOTIFICATION)
-------------------------------------------------------------
తెలుగు (Telugu):
${response.breaking_news}

ఇంగ్లీష్ (English):
${response.breaking_news_en || "N/A"}

========================================================================
నివేదిక ముగిసింది (End of Report)
========================================================================`;

    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      id="download-all-content-txt-btn"
      onClick={handleDownload}
      disabled={!response}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all duration-300 transform active:scale-95 cursor-pointer ${
        response
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md shadow-slate-900/10 focus:ring-2 focus:ring-slate-500/20"
          : "bg-slate-100 dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed"
      }`}
    >
      <Download className="w-3.5 h-3.5" />
      <span>కంటెంట్ డౌన్‌లోడ్ చేయండి (Download All Content)</span>
    </button>
  );
}
