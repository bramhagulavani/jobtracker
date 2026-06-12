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
  salary: string;
  jobUrl: string;
}

const STATUSES = ["All", "Saved", "Applied", "Interview", "Offer", "Rejected"] as const;

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = jobs.filter((j) => {
    const matchesFilter = filter === "All" || j.status === filter;
    const matchesSearch =
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            All Jobs
          </h1>
          <p className="text-gray-500 dark:text-slate-500 text-sm mt-1">
            {jobs.length} total application{jobs.length !== 1 ? "s" : ""}
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

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
        />
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                filter === s
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md"
                  : "bg-white dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-slate-400 hover:border-violet-500/30 hover:text-violet-600 dark:hover:text-violet-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
          <p className="text-gray-500 dark:text-slate-500 text-sm">Loading jobs...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            {jobs.length === 0 ? "No jobs tracked yet" : "No jobs match your filter"}
          </h3>
          <p className="text-gray-500 dark:text-slate-500 text-sm mb-6">
            {jobs.length === 0
              ? "Add your first job application to get started."
              : "Try changing the filter or search term."}
          </p>
          {jobs.length === 0 && (
            <button
              onClick={() => router.push("/add-job")}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-sm font-semibold"
            >
              + Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (
            <div
              key={job._id}
              className="group bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-violet-500/30 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h2 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                      {job.role}
                    </h2>
                    <StatusBadge status={job.status} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-gray-400 dark:text-slate-600">
                    {job.location && <span>📍 {job.location}</span>}
                    {job.salary && <span>💰 {job.salary}</span>}
                    <span>📅 {new Date(job.appliedDate).toLocaleDateString()}</span>
                    {job.jobUrl && (
                      <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-violet-500 hover:text-violet-400 transition-colors"
                      >
                        🔗 View Job
                      </a>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/job/${job._id}`)}
                    className="px-2.5 py-1 bg-indigo-50 dark:bg-violet-600/10 hover:bg-indigo-100 dark:hover:bg-violet-600/20 border border-indigo-200 dark:border-violet-500/20 text-indigo-600 dark:text-violet-400 rounded-md text-xs font-semibold transition-all duration-300"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    disabled={deletingId === job._id}
                    className="px-2.5 py-1 bg-rose-50 dark:bg-rose-600/10 hover:bg-rose-100 dark:hover:bg-rose-600/20 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-md text-xs font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {deletingId === job._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}