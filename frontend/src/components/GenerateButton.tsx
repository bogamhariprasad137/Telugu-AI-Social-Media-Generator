import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export default function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <button
      id="submit-generate-content-btn"
      onClick={onClick}
      disabled={isLoading}
      className={`w-full relative overflow-hidden group py-3.5 px-6 rounded-2xl font-bold text-white shadow-xl flex items-center justify-center gap-2.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-saffron-500/20 active:scale-[0.98] cursor-pointer ${
        isLoading
          ? "bg-slate-400 dark:bg-slate-800 cursor-not-allowed shadow-none"
          : "bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700 shadow-saffron-500/20 hover:shadow-saffron-500/35 hover:-translate-y-0.5"
      }`}
    >
      {/* Visual background gloss on hover */}
      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />

      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin text-white" />
          <span className="font-telugu text-sm lg:text-base tracking-wide">
            కంటెంట్ తయారవుతోంది... <span className="font-sans text-xs opacity-75">(Generating...)</span>
          </span>
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-telugu text-sm lg:text-base tracking-wide">
            పోస్ట్‌లను సృష్టించండి <span className="font-sans text-xs font-normal opacity-80">(Generate Posts)</span>
          </span>
        </>
      )}
    </button>
  );
}
