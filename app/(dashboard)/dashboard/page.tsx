"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";

interface Job {
  _id: string;
  company: string;
  role: string;
  status: "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  location: string;
}

const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"] as const;

const STATUS_ICONS: Record<string, string> = {
  Saved: "🔖",
  Applied: "📤",
  Interview: "🎯",
  Offer: "🎉",
  Rejected: "❌",
};

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const countByStatus = (status: string) =>
    jobs.filter((j) => j.status === status).length;

  const recentJobs = jobs.slice(0, 5);

  const interviewRate =
    jobs.length > 0
      ? Math.round((countByStatus("Interview") / jobs.length) * 100)
      : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-slate-500 text-sm mt-1">
            Your job search at a glance
          </p>
        </div>
        <button
          onClick={() => router.push("/add-job")}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:scale-[1.02]"
        >
          <span className="text-lg leading-none">+</span>
          Add Job
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 dark:text-slate-500 text-sm">Loading your data...</p>
        </div>
      ) : jobs.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">💼</div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No jobs tracked yet</h3>
          <p className="text-gray-500 dark:text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
            Start tracking your job applications and never lose track of an opportunity again.
          </p>
          <button
            onClick={() => router.push("/add-job")}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-xl shadow-violet-900/30 hover:scale-[1.03]"
          >
            <span className="text-lg leading-none">+</span>
            Add Your First Job
          </button>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Applications", value: jobs.length, icon: "📋", color: "text-violet-500" },
              { label: "Interviews", value: countByStatus("Interview"), icon: "🎯", color: "text-indigo-500" },
              { label: "Offers", value: countByStatus("Offer"), icon: "🎉", color: "text-emerald-500" },
              { label: "Interview Rate", value: `${interviewRate}%`, icon: "📈", color: "text-amber-500" },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{stat.icon}</span>
                  <span className={`text-xl font-extrabold ${stat.color}`}>{stat.value}</span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-slate-500 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Pipeline */}
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5 mb-5">
            <h2 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase mb-3">
              <span>📊</span> Application Pipeline
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {STATUSES.map((status) => (
                <div key={status} className="flex flex-col items-center gap-1.5 p-2.5 bg-gray-50 dark:bg-white/[0.02] rounded-lg border border-gray-100 dark:border-white/[0.04]">
                  <span className="text-lg">{STATUS_ICONS[status]}</span>
                  <span className="text-lg font-extrabold text-gray-900 dark:text-white">{countByStatus(status)}</span>
                  <StatusBadge status={status} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2 uppercase">
                <span>🕐</span> Recent Applications
              </h2>
              <button
                onClick={() => router.push("/jobs")}
                className="text-xs text-violet-500 hover:text-violet-400 font-semibold transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="space-y-2.5">
              {recentJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => router.push(`/job/${job._id}`)}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.04] rounded-lg hover:border-violet-500/30 cursor-pointer transition-all duration-300 group"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-xs text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                      {job.role}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-slate-500 mt-0.5 truncate">
                      {job.company} {job.location ? `· ${job.location}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <StatusBadge status={job.status} />
                    <p className="text-[11px] text-gray-400 dark:text-slate-600 hidden sm:block">
                      {new Date(job.appliedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}