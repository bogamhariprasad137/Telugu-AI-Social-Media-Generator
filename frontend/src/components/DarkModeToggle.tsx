import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) {
        return saved === "dark";
      }
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      id="dark-mode-toggle-btn"
      onClick={() => setIsDark(!isDark)}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron-500/20"
      aria-label="Toggle visual theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-500 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-500 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
