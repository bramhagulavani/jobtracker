"use client";

import { UserButton } from "@clerk/nextjs";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-gray-200 dark:border-white/[0.06] flex items-center justify-between px-4 md:px-8 bg-white/60 dark:bg-[#0a0a0f]/60 backdrop-blur-xl transition-colors duration-300">
      <div className="hidden md:block text-gray-500 dark:text-slate-500 text-sm font-medium">
        Track your job applications
      </div>
      <div className="md:hidden w-10" />
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.12] border border-gray-200 dark:border-white/[0.08] transition-all duration-300 text-base"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <Link
          href="/add-job"
          className="flex items-center gap-1.5 px-3 md:px-5 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-violet-900/20 hover:scale-[1.02]"
        >
          <span className="text-base leading-none">+</span>
          <span className="hidden sm:inline">Add Job</span>
        </Link>
        <UserButton />
      </div>
    </header>
  );
}