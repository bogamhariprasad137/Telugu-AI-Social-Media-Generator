import { useEffect, useState } from "react";
import Header from "./components/Header";
import ArticleInput from "./components/ArticleInput";
import PlatformSelector from "./components/PlatformSelector";
import GenerateButton from "./components/GenerateButton";
import ResultsGrid from "./components/ResultsGrid";
import LoadingAnimation from "./components/LoadingAnimation";
import { useGenerate } from "./hooks/useGenerate";
import { checkHealth } from "./api/client";
import { AlertCircle, WifiOff, FileEdit, HelpCircle, CheckCircle2 } from "lucide-react";

export default function App() {
  const {
    title,
    setTitle,
    content,
    setContent,
    platform,
    setPlatform,
    response,
    isLoading,
    regeneratingSection,
    error,
    setError,
    toastMessage,
    handleGenerate,
    handleRegenerate,
    copyToClipboard,
  } = useGenerate();

  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);
  const [showErrorHighlight, setShowErrorHighlight] = useState<boolean>(false);

  // Connection alert monitor on loading
  useEffect(() => {
    async function verifyHealth() {
      const healthy = await checkHealth();
      setIsBackendHealthy(healthy);
    }
    verifyHealth();
  }, []);

  const triggerSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setShowErrorHighlight(true);
      setError("వార్తా శీర్షిక మరియు వ్యాస వివరాలు నమోదు చేయండి.");
    } else {
      setShowErrorHighlight(false);
      handleGenerate();
    }
  };

  const loadDemoNews = () => {
    setTitle("హైదరాబాద్‌లో భారీ వర్షాలు - రెడ్ అలర్ట్ జారీ చేసిన వాతావరణ శాఖ");
    setContent(
      "బంగాళాఖాతంలో ఏర్పడిన వాయుగుండం ప్రభావంతో హైదరాబాద్ నగరంలో గత అర్ధరాత్రి నుండి భారీ వర్షాలు కురుస్తున్నాయి. నగరంలోని ప్రధాన కూడళ్లు జలమయమయ్యాయి. గ్రేటర్ హైదరాబాద్ మున్సిపల్ కార్పొరేషన్ (GHMC) అధికారులు అప్రమత్తమై సహాయక చర్యలను చేపట్టారు. లోతట్టు ప్రాంతాల ప్రజలు సురక్షిత ప్రాంతాలకి వెళ్లాల్సిందిగా హైకోర్టు మరియు స్థానిక యంత్రాంగం హెచ్చరించింది. రాగల 24 గంటల్లో నగరానికి రెడ్ అలర్ట్ జారీ చేస్తున్నట్లు వాతావరణ పరిశోధనా కేంద్రం సంచాలకులు వెల్లడించారు. అత్యవసరమైతే తప్ప ప్రజలు ఎవరూ ఇళ్ల నుంచి బయటకు రావద్దని నగర పోలీస్ కమిషనర్ కోరారు."
    );
    setShowErrorHighlight(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative flex flex-col pb-12">
      {/* 1. Header Integration */}
      <Header />

      {/* Main Container Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2. Urgent Service Warnings */}
        {isBackendHealthy === false && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-300 text-sm flex items-start gap-3">
            <WifiOff className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold font-telugu text-amber-800 dark:text-amber-200">సర్వర్ అనుసంధానంలో హెచ్చరిక!</p>
              <p className="font-sans text-xs mt-0.5">
                The local FastAPI service might be sleeping or unreachable. Using relative routing proxies or cloud connection instead.
              </p>
            </div>
          </div>
        )}

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Newsroom Editors (Title, Body, Platform, Submit Handles) */}
          <section className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/65 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
              <div className="flex items-center space-x-2">
                <FileEdit className="w-5 h-5 text-saffron-500" />
                <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white font-telugu">
                  న్యూస్రూమ్ ఎడిటర్ డెస్క్
                </h2>
              </div>
              <button
                id="load-demo-data-btn"
                onClick={loadDemoNews}
                className="text-xs text-saffron-500 hover:text-saffron-600 font-bold hover:underline cursor-pointer flex items-center gap-1 font-telugu"
              >
                📝 డెమో వార్తను లోడ్ చేయి
              </button>
            </div>

            {/* Error alerts inside form */}
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-telugu leading-relaxed">{error}</span>
              </div>
            )}

            {/* Inputs & platform selections */}
            <ArticleInput
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              showErrorHighlight={showErrorHighlight}
            />

            <PlatformSelector selectedPlatform={platform} onChange={setPlatform} />

            <div className="pt-2">
              <GenerateButton onClick={triggerSubmit} isLoading={isLoading} />
            </div>

            {/* Instruction footnote */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-[11px] text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800">
              <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
              <div className="space-y-0.5 leading-relaxed font-telugu text-[10px]">
                <span>ఈ AI రైటర్ ఇచ్చిన వ్యాసాన్ని విశ్లేషించి వదంతులు లేకుండా నమ్మకమైన తెలుగు సోషల్ పోస్ట్ లు తయారుచేస్తుంది.</span>
              </div>
            </div>

          </section>

          {/* Right Panel: Active Generated Results Content */}
          <section className="lg:col-span-7 space-y-6 min-h-[400px]">
            {isLoading ? (
              <LoadingAnimation />
            ) : response ? (
              <ResultsGrid
                response={response}
                articleTitle={title}
                onCopySection={copyToClipboard}
                onRegenerateSection={handleRegenerate}
                regeneratingId={regeneratingSection}
              />
            ) : (
              <div className="h-full min-h-[480px] bg-white dark:bg-slate-900/40 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-3xl flex flex-col items-center justify-center p-8 text-center transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-saffron-50 dark:bg-saffron-950/20 border border-saffron-100 dark:border-saffron-900/40 text-saffron-500 flex items-center justify-center mb-4 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 animate-pulse text-saffron-550" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 font-telugu leading-snug">
                  కంటెంట్ సృష్టించడానికి సిద్ధంగా ఉంది
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 max-w-sm mt-1 mb-2 font-telugu">
                  ఎడమ ప్యానెల్లో వార్తా వివరాలను నమోదు చేసి “పోస్ట్‌లను సృష్టించండి” క్లిక్ చేయండి.
                </p>
                <div className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800">
                  Powered by Google Gemini 3.5 Flash
                </div>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* 3. Absolute Floating Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xl border border-slate-800 dark:border-slate-100 flex items-center space-x-2.5 max-w-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-450 dark:text-emerald-600 shrink-0" />
          <span className="font-telugu text-[13px] font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
