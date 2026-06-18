"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/components/ui/Toast";

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

const STATUSES = [
  "All",
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const;

export default function JobsPage() {
  const router = useRouter();
  const toast = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/jobs");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch {
        setJobs([]);
        toast.error("Failed to load jobs. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }

    setDeletingId(id);
    setConfirmDeleteId(null);
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
        toast.success("Job deleted successfully!");
      } else {
        toast.error("Failed to delete. Please try again.");
      }
    } catch {
      toast.error("Delete failed. Please try again.");
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
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
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-600 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                filter === s
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md shadow-violet-900/20"
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
          <p className="text-gray-500 dark:text-slate-500 text-sm">
            Loading jobs...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-5">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            {jobs.length === 0
              ? "No jobs tracked yet"
              : "No jobs match your filter"}
          </h3>
          <p className="text-gray-500 dark:text-slate-500 text-sm mb-6 leading-relaxed">
            {jobs.length === 0
              ? "Add your first job application to get started."
              : "Try changing the filter or search term."}
          </p>
          {jobs.length === 0 && (
            <button
              onClick={() => router.push("/add-job")}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-violet-900/25 hover:scale-[1.02]"
            >
              + Add Your First Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {filtered.map((job) => (
            <div
              key={job._id}
              className="group bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-violet-900/10 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                    {job.role}
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-slate-500 font-medium mt-0.5 truncate">
                    {job.company}
                  </p>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-[11px] text-gray-400 dark:text-slate-600">
                {job.location && <span>📍 {job.location}</span>}
                {job.salary && <span>💰 {job.salary}</span>}
                <span>
                  📅 {new Date(job.appliedDate).toLocaleDateString()}
                </span>
              </div>

              {job.jobUrl && (
                <a
                  href={job.jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-[11px] text-violet-500 hover:text-violet-400 transition-colors mb-4"
                >
                  🔗 View Job Posting
                </a>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-white/[0.04]">
                <button
                  onClick={() => router.push(`/job/${job._id}`)}
                  className="flex-1 py-2 bg-indigo-50 dark:bg-violet-600/10 hover:bg-indigo-100 dark:hover:bg-violet-600/20 border border-indigo-200 dark:border-violet-500/20 text-indigo-600 dark:text-violet-400 rounded-xl text-xs font-semibold transition-all duration-300"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  disabled={deletingId === job._id}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border disabled:opacity-40 disabled:cursor-not-allowed ${
                    confirmDeleteId === job._id
                      ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600"
                      : "bg-rose-50 dark:bg-rose-600/10 hover:bg-rose-100 dark:hover:bg-rose-600/20 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {deletingId === job._id
                    ? "..."
                    : confirmDeleteId === job._id
                      ? "Confirm?"
                      : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}