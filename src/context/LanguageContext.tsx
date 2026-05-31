import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UILanguage = "te" | "en";

interface LanguageContextType {
  uiLang: UILanguage;
  setUiLang: (lang: UILanguage) => void;
  t: (key: string) => string;
}

const translations: Record<UILanguage, Record<string, string>> = {
  te: {
    brandTitle: "తెలుగు AI పోస్ట్ జనరేటర్",
    brandSubTitle: "Telugu AI Social Media Post Generator",
    liveBadge: "న్యూస్రూమ్ లైవ్",
    warningTitle: "సర్వర్ అనుసంధానంలో హెచ్చరిక!",
    warningSub: "లోకల్ సేవలు లభ్యం కాలేదు. క్లౌడ్ ద్వారా అనుసంధానించబడుతోంది.",
    editorDeskTitle: "న్యూస్రూమ్ ఎడిటర్ డెస్క్",
    loadDemoBtn: "📝 డెమో వార్తను లోడ్ చేయి",
    translationAssistantHeader: "ద్విభాషా అనువాద సాధనం (Bilingual Translation Assistant)",
    translationAssistantSubtitle: "మీ డ్రాఫ్ట్ వ్యాసాన్ని ప్రచురించడానికి ముందు తెలుగు, ఇంగ్లీష్ లేదా రెండింటిలోకి మార్చుకోండి (Convert draft).",
    toTeluguBtn: "తెలుగులోకి (te)",
    toTeluguBtnSub: "To Telugu",
    toEnglishBtn: "English (en)",
    toEnglishBtnSub: "To English",
    dualBilingualBtn: "రెండు భాషల్లో",
    dualBilingualBtnSub: "Dual Bilingual",
    titleLabel: "వార్తా శీర్షిక",
    titlePlaceholder: "ఉదా: కొత్తగా ప్రారంభించిన తెలుగు సాంకేతిక పరిజ్ఞానం... | E.g., The newly launched technology...",
    titleError: "కంటెంట్ తయారు చేయడానికి శీర్షిక రాయడం తప్పనిసరి.",
    contentLabel: "వార్తా వివరాలు",
    contentPlaceholder: "ఇక్కడ మీ విస్తృతమైన వార్తా వ్యాసాన్ని లేదా కంటెంట్ వివరాలను టైప్ చేయండి లేదా పేస్ట్ చేయండి...\n\nType or paste your detailed news article body here...",
    contentError: "నివేదిక ప్రకారం వార్త యొక్క పూర్తి వివరాలు నమోదు చేయండి.",
    platformSelectorLabel: "సోషల్ मीडिया ఫ్లాట్‌ఫాం",
    platformSelectorSubLabel: "Target Platform",
    allPlatformsLabel: "అన్నీ",
    allPlatformsSub: "All Platforms",
    generateBtnLabel: "పోస్ట్‌లను సృష్టించండి",
    generateBtnLabelLoading: "కంటెంట్ తయారవుతోంది...",
    generateBtnSubText: "(Generate Posts)",
    generateBtnSubTextLoading: "(Generating...)",
    helpFootnote: "ఈ AI రైటర్ ఇచ్చిన వ్యాసాన్ని విశ్లేషించి వదంతులు లేకుండా నమ్మకమైన తెలుగు మరియు ఇంగ్లీష్ పోస్ట్ లు తయారుచేస్తుంది.",
    readyTitle: "కంటెంట్ సృష్టించడానికి సిద్ధంగా ఉంది",
    readyDesc: "ఎడమ ప్యానెల్లో వార్తా వివరాలను నమోదు చేసి “పోస్ట్‌లను సృష్టించండి” క్లిక్ చేయండి.",
    resultsHeader: "సృష్టించబడిన పోస్ట్‌లు సిద్ధంగా ఉన్నాయి",
    resultsSub: "Telugu & English లో అనుకూలీకరించిన తాజా పోస్ట్‌లను ఎంచుకోండి మరియు ఎగుమతి చేసుకోండి.",
    downloadReport: "రిపోర్టు డౌన్‌లోడ్ (TXT)",
    summaryLabel: "సంక్షిప్త సారాంశం",
    whatsappLabel: "వాట్సాప్ సందేశం",
    facebookLabel: "ఫేస్‌బుక్ కథనం",
    instagramLabel: "ఇన్‌స్టాగ్రామ్ క్యాప్షన్",
    twitterLabel: "ఎక్స్ (ట్విట్టర్) పోస్ట్",
    hashtagsLabel: "ట్రెండింగ్ హ్యాష్‌ట్యాగ్స్",
    breakingLabel: "బ్రేకింగ్ ఫ్లాష్",
    summarySubLabel: "Brief Summary",
    whatsappSubLabel: "WhatsApp Message",
    facebookSubLabel: "Facebook Post",
    instagramSubLabel: "Instagram Caption",
    twitterSubLabel: "X (Twitter) Post",
    hashtagsSubLabel: "Viral Hashtags",
    breakingSubLabel: "Breaking Flash",
    wordsLabel: "పదాలు",
    charsLabel: "అక్షరాలు",
    overLimitLabel: "పరిమితి దాటింది",
    viewsUnavailable: "వివరాలు అందుబాటులో లేవు.",
    requiredFieldsError: "వార్తా శీర్షిక మరియు వ్యాస వివరాలు నమోదు చేయండి.",
    requiredTitleError: "కంటెంట్ తయారు చేయడానికి వార్తా శీర్షిక తప్పనిసరి.",
    requiredContentError: "కంటెంట్ తయారు చేయడానికి వార్తా వివరాలు తప్పనిసరి.",
    successToast: "కంటెంట్ విజయవంతంగా సృష్టించబడింది!",
    sectionRegeneratedToast: "పోస్ట్ విజయవంతంగా పునరుద్ధరించబడింది!",
    sectionCopySuccess: "కంటెంట్ క్లిప్‌బోర్డ్‌కి కాపీ చేయబడింది!",
    copyFail: "కాపీ చేయడం సాధ్యపడలేదు.",
    transComplete: "పూర్తయింది!",
    transCompleteSub: "Completed!",
    transWait: "అనువదిస్తోంది...",
    transWaitSub: "Translating...",
    transErrorText: "అనువాద కార్యకలాపంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    demoHeadline: "హైదరాబాద్‌లో భారీ వర్షాలు - రెడ్ అలర్ట్ జారీ చేసిన వాతావరణ శాఖ",
    demoContent: "బంగాళాఖాతంలో ఏర్పడిన వాయుగుండం ప్రభావంతో హైదరాబాద్ నగరంలో గత అర్ధరాత్రి నుండి భారీ వర్షాలు కురుస్తున్నాయి. నగరంలోని ప్రధాన కూడళ్లు జలమయమయ్యాయి. గ్రేటర్ హైదరాబాద్ మున్సిపల్ కార్పొరేషన్ (GHMC) అధికారులు అప్రమత్తమై సహాయక చర్యలను చేపట్టారు. లోతట్టు ప్రాంతాల ప్రజలు సురక్షిత ప్రాంతాలకి వెళ్లాల్సిందిగా హైకోర్టు మరియు స్థానిక యంత్రాంగం హెచ్చరించింది. రాగల 24 గంటల్లో నగరానికి రెడ్ అలర్ట్ జారీ చేస్తున్నట్లు వాతావరణ పరిశోధనా కేంద్రం సంచాలకులు వెల్లడించారు. అత్యవసరమైతే తప్ప ప్రజలు ఎవరూ ఇళ్ల నుంచి బయటకు రావద్దని నగర పోలీస్ కమిషనర్ కోరారు.",
  },
  en: {
    brandTitle: "Telugu AI Post Generator",
    brandSubTitle: "AI-Powered Bilingual Social Media Post Generator",
    liveBadge: "NEWSROOM LIVE",
    warningTitle: "Server Connection Warn!",
    warningSub: "Local services unavailable or sleeping. Routing requests via API proxy fallback.",
    editorDeskTitle: "Newsroom Editor Desk",
    loadDemoBtn: "📝 Load Demo News Story",
    translationAssistantHeader: "Bilingual Translation Assistant",
    translationAssistantSubtitle: "Convert your draft article into Telugu, English, or combine both side-by-side before publishing.",
    toTeluguBtn: "To Telugu (te)",
    toTeluguBtnSub: "తెలుగులోకి",
    toEnglishBtn: "To English (en)",
    toEnglishBtnSub: "ఇంగ్లీషులోకి",
    dualBilingualBtn: "Dual Bilingual",
    dualBilingualBtnSub: "రెండు భాషల్లో",
    titleLabel: "Article Title / Headline",
    titlePlaceholder: "E.g., The newly launched Indian technology innovations...",
    titleError: "Article headline/title is required to proceed.",
    contentLabel: "Article Content Body",
    contentPlaceholder: "Type or paste your detailed news article content body here...",
    contentError: "Detailed news article description content is required.",
    platformSelectorLabel: "Social Media Platform",
    platformSelectorSubLabel: "Target Platform",
    allPlatformsLabel: "All Platforms",
    allPlatformsSub: "అన్నీ",
    generateBtnLabel: "Generate Social Posts",
    generateBtnLabelLoading: "Generating Content...",
    generateBtnSubText: "(పోస్ట్‌లను సృష్టించండి)",
    generateBtnSubTextLoading: "(కంటెంట్ తయారవుతోంది...)",
    helpFootnote: "This state-of-the-art newsroom writer crafts reliable Telugu & English social media posts directly from source facts with no fake news.",
    readyTitle: "Ready to Generate News Updates",
    readyDesc: "Provide an article headline and body content on the left, then click 'Generate Social Posts' to begin.",
    resultsHeader: "Generated Social Posts are Ready",
    resultsSub: "Select, edit, and export your optimized news packages in Telugu & English.",
    downloadReport: "Download Report (TXT)",
    summaryLabel: "Brief Summary",
    whatsappLabel: "WhatsApp Update",
    facebookLabel: "Facebook Post",
    instagramLabel: "Instagram Caption",
    twitterLabel: "X (Twitter) Post",
    hashtagsLabel: "Trending Hashtags",
    breakingLabel: "Breaking Flash",
    summarySubLabel: "సంక్షిప్త సారాంశం",
    whatsappSubLabel: "వాట్సాప్ సందేశం",
    facebookSubLabel: "ఫేస్‌బుక్ కథనం",
    instagramSubLabel: "ఇన్‌స్టాగ్రామ్ క్యాప్షన్",
    twitterSubLabel: "ఎక్స్ (ట్విట్టర్) పోస్ట్",
    hashtagsSubLabel: "హాష్‌ట్యాగ్స్",
    breakingSubLabel: "బ్రేకింగ్ అలర్ట్",
    wordsLabel: "words",
    charsLabel: "chars",
    overLimitLabel: "Over limit",
    viewsUnavailable: "Details are currently unavailable.",
    requiredFieldsError: "Please enter both the headline and body content.",
    requiredTitleError: "Headline is required.",
    requiredContentError: "Content description is required.",
    successToast: "All social updates generated successfully!",
    sectionRegeneratedToast: "Section regenerated successfully!",
    sectionCopySuccess: "Content copied to clipboard successfully!",
    copyFail: "Copy action failed.",
    transComplete: "Completed!",
    transCompleteSub: "పూర్తయింది!",
    transWait: "Translating...",
    transWaitSub: "అనువదిస్తోంది...",
    transErrorText: "An error occurred during translation. Please try again.",
    demoHeadline: "Heavy Rains in Hyderabad - weather department issues red alert",
    demoContent: "Under the influence of a depression formed in the Bay of Bengal, heavy rainwater has been pouring in Hyderabad city since midnight. Major junctions in the city are heavily waterlogged. GHMC officials have initiated swift rescue & relief operations. Low-lying residents are advised to evacuate immediately. The Met Director warned of heavy downpours extending over the next 24 hours. The police commissioner requested that citizens remain indoors strictly unless an emergency arises.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [uiLang, setUiLangState] = useState<UILanguage>(() => {
    const saved = localStorage.getItem("ui-language");
    return (saved === "en" || saved === "te" ? saved : "te") as UILanguage;
  });

  const setUiLang = (lang: UILanguage) => {
    setUiLangState(lang);
    localStorage.setItem("ui-language", lang);
  };

  const t = (key: string): string => {
    return translations[uiLang][key] || translations["te"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ uiLang, setUiLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
