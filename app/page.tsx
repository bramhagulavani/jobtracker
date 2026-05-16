
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">

      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/[0.07] blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.05] blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-600/[0.06] blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-5 md:px-12 lg:px-20 py-5 border-b border-white/[0.06]">
        <div className="text-2xl font-extrabold tracking-tight">
          Job<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Tracker</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/sign-in" className="px-5 py-2.5 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-300">
            Sign In
          </Link>
          <Link href="/sign-up" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:scale-[1.02]">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-5 py-24 md:py-36">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-500/[0.08] border border-violet-500/20 rounded-full text-violet-400 text-xs font-semibold mb-8 tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          Job Application Tracker
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-4xl">
          Never Lose Track of a
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Job Application
          </span>
        </h1>

        <p className="mt-8 text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl">
          Track every application, monitor your pipeline, and land your dream job faster with our smart job tracker.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <Link href="/sign-up" className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-semibold text-sm transition-all duration-300 shadow-xl shadow-violet-900/30 hover:scale-[1.03]">
            Start Tracking Free →
          </Link>
          <Link href="/sign-in" className="px-8 py-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-2xl font-semibold text-sm transition-all duration-300">
            Sign In
          </Link>
        </div>
        <p className="mt-5 text-slate-600 text-xs">Free forever · No credit card required</p>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-white/[0.06] py-12">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-20">
          {[
            { number: "5,000+", label: "Jobs Tracked" },
            { number: "1,200+", label: "Happy Users" },
            { number: "3x", label: "Faster Job Search" },
            { number: "4.8★", label: "User Rating" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{stat.number}</div>
              <div className="text-slate-500 text-xs font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-5 md:px-12 lg:px-20 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Everything You{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Need</span>
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">Built for developers and professionals who want to stay organized during their job search.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "📋", title: "Track Applications", desc: "Add every job you apply to with company, role, date, and job URL.", border: "hover:border-violet-500/30", glow: "group-hover:bg-violet-500/10" },
              { icon: "📊", title: "Status Pipeline", desc: "Move applications through Saved → Applied → Interview → Offer → Rejected.", border: "hover:border-indigo-500/30", glow: "group-hover:bg-indigo-500/10" },
              { icon: "📈", title: "Analytics Dashboard", desc: "See your application stats, success rate, and pipeline at a glance.", border: "hover:border-purple-500/30", glow: "group-hover:bg-purple-500/10" },
              { icon: "📝", title: "Notes & Details", desc: "Add salary, location, resume used, and personal notes for each job.", border: "hover:border-fuchsia-500/30", glow: "group-hover:bg-fuchsia-500/10" },
              { icon: "🔗", title: "Linked to ResumeCraft", desc: "Track which resume you used for each application.", border: "hover:border-emerald-500/30", glow: "group-hover:bg-emerald-500/10" },
              { icon: "🌙", title: "Dark & Light Mode", desc: "Beautiful dark and light themes that save your preference.", border: "hover:border-amber-500/30", glow: "group-hover:bg-amber-500/10" },
            ].map((feature, i) => (
              <div key={i} className={`group relative bg-white/[0.02] border border-white/[0.06] ${feature.border} rounded-2xl p-7 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden`}>
                <div className={`absolute inset-0 ${feature.glow} transition-colors duration-500 rounded-2xl`} />
                <div className="relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/[0.04] text-2xl mb-5 border border-white/[0.05]">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-5 py-24 text-center">
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-purple-600/10 blur-[80px] rounded-full" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Ready to Organize Your
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Job Search?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">Join thousands of job seekers who use JobTracker to stay organized and land their dream jobs.</p>
            <Link href="/sign-up" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-2xl shadow-violet-900/30 hover:scale-[1.03]">
              Get Started for Free →
            </Link>
            <p className="mt-5 text-slate-600 text-xs">Free forever · No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-5 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-xs">
        <div className="font-medium">© {new Date().getFullYear()} JobTracker. All rights reserved.</div>
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <span className="text-violet-400">♥</span>
          <span>by Bramha Vinayak Gulavani</span>
        </div>
      </footer>

    </div>
  );
}