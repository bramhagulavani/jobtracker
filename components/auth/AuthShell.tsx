import Link from "next/link";

export const authAppearance = {
  variables: {
    colorPrimary: "#8b5cf6",
    colorBackground: "#0a0a0f",
    colorText: "#f8fafc",
    colorTextSecondary: "#94a3b8",
    colorInputBackground: "rgba(255, 255, 255, 0.04)",
    colorInputText: "#f8fafc",
    colorInputBorder: "rgba(255, 255, 255, 0.08)",
    colorDanger: "#fb7185",
    borderRadius: "1rem",
  },
  layout: {
    socialButtonsPlacement: "top" as const,
    socialButtonsVariant: "iconButton" as const,
  },
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[32rem] w-[32rem] rounded-full bg-violet-600/15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-fuchsia-600/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">
          <Link href="/" className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Job<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Tracker</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">
            Back to home
          </Link>
        </div>

        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <section className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              {eyebrow}
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-black tracking-tight xl:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              {description}
            </p>

            <div className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2">
              {[
                { title: "Clean pipeline", detail: "Track every application from saved to offer in one calm workspace." },
                { title: "Fast decisions", detail: "Spot stalled applications, upcoming interviews, and open opportunities quickly." },
                { title: "Beautiful by default", detail: "A polished dark interface that feels native to the rest of the product." },
                { title: "Sync-safe auth", detail: "Sign-in and sign-up return to the dashboard automatically after Clerk completes." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
                  <div className="text-sm font-semibold text-white">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex justify-center">
            <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6 lg:p-8">
              <div className="mb-6 lg:hidden">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-violet-300">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  {eyebrow}
                </div>
                <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">{description}</p>
              </div>

              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}