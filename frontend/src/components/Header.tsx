import DarkModeToggle from "./DarkModeToggle";
import { Radio } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-900/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left Side: Brand Logo and Typography */}
        <div className="flex items-center space-x-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 bg-saffron-500 text-white rounded-xl shadow-lg shadow-saffron-500/20 ring-4 ring-saffron-500/10">
            <Radio className="w-6 h-6 animate-pulse" />
            <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
            </span>
          </div>
          <div>
            <h1 className="font-telugu text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              తెలుగు AI పోస్ట్ జనరేటర్
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 tracking-wide">
              Telugu AI Social Media Post Generator
            </p>
          </div>
        </div>

        {/* Right Side: Environment actions and Dark Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 mr-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200/40 dark:border-red-900/40">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
              NEWSROOM LIVE
            </span>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
