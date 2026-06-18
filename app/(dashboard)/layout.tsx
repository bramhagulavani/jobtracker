import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#fafafa] dark:bg-[#0a0a0f] text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
        <footer className="px-4 md:px-8 py-4 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 dark:text-slate-600">
          <span>
            Built with <span className="text-rose-400">♥</span> by{" "}
            <span className="text-violet-500 font-semibold">
              Bramha Vinayak Gulavani
            </span>
          </span>
          <span>© {new Date().getFullYear()} JobTracker</span>
        </footer>
      </div>
    </div>
  );
}