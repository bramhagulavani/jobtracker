"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "All Jobs", href: "/jobs", icon: "💼" },
    { name: "Add Job", href: "/add-job", icon: "➕" },
  ];

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="text-2xl font-extrabold mb-10 tracking-tight">
        Job<span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">Tracker</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-700 dark:text-white border border-violet-500/20 shadow-sm"
                  : "text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white border border-transparent"
              }`}>
                <span className="text-base">{item.icon}</span>
                {item.name}
                {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200 dark:border-white/[0.06]" />

      {/* Quick Stats placeholder */}
      <div className="text-[10px] text-gray-400 dark:text-slate-600 font-semibold uppercase tracking-widest mb-2">
        Quick Links
      </div>
      <a
        href="https://github.com/bramhagulavani/ResumeCraft"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white transition-all duration-300"
      >
        <span>📄</span> ResumeCraft
      </a>

      {/* Footer */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/[0.06]">
        <div className="text-[10px] text-gray-400 dark:text-slate-600 font-medium">
          © {new Date().getFullYear()} JobTracker
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-white/80 dark:bg-[#0a0a0f]/80 border-r border-gray-200 dark:border-white/[0.06] flex-col p-6 backdrop-blur-xl transition-colors duration-300 flex-shrink-0">
        <NavContent />
      </aside>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-white/[0.08] rounded-xl shadow-lg"
        aria-label="Open menu"
      >
        <span className="text-lg">☰</span>
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <aside className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white dark:bg-[#0a0a0f] border-r border-gray-200 dark:border-white/[0.06] flex flex-col p-6 z-50 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.06] text-gray-500"
        >
          ✕
        </button>
        <NavContent />
      </aside>
    </>
  );
}