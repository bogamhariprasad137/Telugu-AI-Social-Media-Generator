import { useEffect, useState } from "react";
import { Loader2, Quote } from "lucide-react";

export default function LoadingAnimation() {
  const teluguFacts = [
    "తెలుగు భాషను ప్రఖ్యాత పండితుడు జె.ఎ.సి. బ్రౌన్ 'ఇటాలియన్ ఆఫ్ ది ఈస్ట్' అని అభివర్ణించారు.",
    "శ్రీకృష్ణదేవరాయలు తన ఆముక్తమాల్యదలో 'దేశభాషలందు తెలుగు లెస్స' (దేశ భాషలలో తెలుగు శ్రేష్ఠమైనది) అని కొనియాడారు.",
    "తెలుగు భాషలో ప్రతి పదం అచ్చుతో ముగుస్తుంది, అందుకే దీనిని 'అజంత భాష' అని పిలుస్తారు.",
    "భారతదేశంలో హిందీ, బెంగాలీ తర్వాత అత్యధికంగా మాట్లాడే స్థానిక భాషలలో తెలుగు మూడవ స్థానంలో నిలిచింది.",
    "క్రీ.పూ. 400 నాటి శాలివాహన గాథాసప్తశతిలోనే తొలి తెలుగు పదాల వాడకం ఆధారాలు లభించాయి."
  ];

  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % teluguFacts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 w-full animate-pulse-custom">
      {/* 1. Animated News Ticker Bar */}
      <div className="relative w-full overflow-hidden h-7 bg-red-600 text-white font-telugu text-xs font-bold rounded-xl flex items-center shadow-md shadow-red-600/15">
        <div className="absolute left-0 z-10 px-3 bg-red-800 text-[10px] font-extrabold h-full flex items-center tracking-wider shrink-0 uppercase border-r border-red-500">
          BREAKING ALERTS
        </div>
        <div className="animate-marquee whitespace-nowrap pl-[150px] flex items-center gap-16 py-1">
          <span>⚡ AI ఈ వార్తా కథనాన్ని విశ్లేషిస్తోంది...</span>
          <span>⚡ సోషల్ మీడియా పోస్టులను ఆప్టిమైజ్ చేస్తోంది...</span>
          <span>⚡ వాట్సాప్ మరియు ఫేస్‌బుక్ వెర్షన్స్ సిద్ధమవుతున్నాయి...</span>
          <span>⚡ తెలుగు వ్యాకరణ పరిచయాలను సరిచూస్తోంది...</span>
        </div>
      </div>

      {/* 2. Primary Loader Callout */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60 text-center gap-3">
        <Loader2 className="w-8 h-8 text-saffron-500 animate-spin" />
        <div className="space-y-1">
          <p className="font-telugu text-base font-bold text-slate-800 dark:text-slate-250">
            AI తెలుగు కంటెంట్ తయారవుతోంది...
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-sans">
            AI is analyzing the article to generate newsroom posts.
          </p>
        </div>

        {/* Dynamic Fact / Trivia Callout */}
        <div className="mt-2 max-w-md bg-white dark:bg-slate-950 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-sm relative text-left">
          <div className="absolute -top-2.5 left-4 px-1.5 py-0.5 bg-saffron-50 dark:bg-saffron-950/40 text-[9px] font-bold text-saffron-600 dark:text-saffron-400 rounded-md border border-saffron-200/40 dark:border-saffron-900/40 flex items-center gap-1">
            <Quote className="w-2.5 h-2.5" />
            <span>తెలుగు భాషా విశేషాలు</span>
          </div>
          <p className="font-telugu text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1.5">
            {teluguFacts[factIndex]}
          </p>
        </div>
      </div>

      {/* 3. Three skeleton cards showing shimmer loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3].map((id) => (
          <div key={id} className="border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-5 bg-white dark:bg-slate-900 space-y-4 shadow-sm relative overflow-hidden">
            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 dark:via-slate-800/20 to-transparent -translate-x-full animate-shimmer" />
            
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800" />
              <div className="space-y-1.5 w-1/3">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-2/3" />
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-[90%]" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-[45%]" />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-[25%]" />
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded w-[15%]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
