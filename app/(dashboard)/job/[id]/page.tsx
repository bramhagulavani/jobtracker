"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";

interface Job {
  _id: string;
  company: string;
  role: string;
  jobUrl: string;
  status: "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";
  appliedDate: string;
  location: string;
  salary: string;
  resumeUsed: string;
  notes: string;
}

const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"] as const;

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Edit states
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<typeof STATUSES[number]>("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [resumeUsed, setResumeUsed] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) { router.push("/jobs"); return; }
        const data = await res.json();
        setJob(data);
        // Prefill edit states
        setCompany(data.company || "");
        setRole(data.role || "");
        setJobUrl(data.jobUrl || "");
        setStatus(data.status || "Applied");
        setAppliedDate(data.appliedDate ? new Date(data.appliedDate).toISOString().split("T")[0] : "");
        setLocation(data.location || "");
        setSalary(data.salary || "");
        setResumeUsed(data.resumeUsed || "");
        setNotes(data.notes || "");
      } catch {
        router.push("/jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, router]);

  const handleSave = async () => {
    if (!company.trim() || !role.trim()) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, jobUrl, status, appliedDate: new Date(appliedDate), location, salary, resumeUsed, notes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setJob(updated);
        setEditing(false);
      }
    } catch {
      alert("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/jobs");
    } catch {
      alert("Delete failed. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 dark:text-slate-500 text-sm">Loading job details...</p>
      </div>
    );
  }

  if (!job) return null;

  const inputClass = "w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => router.push("/jobs")}
            className="text-xs text-gray-400 dark:text-slate-600 hover:text-violet-500 transition-colors mb-2 flex items-center gap-1"
          >
            ← Back to Jobs
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {editing ? "Edit Job" : job.role}
          </h1>
          {!editing && <p className="text-gray-500 dark:text-slate-500 text-sm mt-1">{job.company}</p>}
        </div>
        {!editing && <StatusBadge status={job.status} />}
      </div>

      <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
        {editing ? (
          /* Edit Form */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Company *</label>
                <input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Role *</label>
                <input className={inputClass} value={role} onChange={(e) => setRole(e.target.value)} placeholder="Job title" />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s} onClick={() => setStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                      status === s
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md"
                        : "bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Applied Date</label>
                <input type="date" className={inputClass} value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Location</label>
                <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Mumbai / Remote" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Salary</label>
                <input className={inputClass} value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. ₹8 LPA" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Resume Used</label>
                <input className={inputClass} value={resumeUsed} onChange={(e) => setResumeUsed(e.target.value)} placeholder="e.g. ResumeCraft - Classic" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Job URL</label>
              <input type="url" className={inputClass} value={jobUrl} onChange={(e) => setJobUrl(e.target.value)} placeholder="https://..." />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Notes</label>
              <textarea
                className={`${inputClass} resize-none`} rows={3}
                value={notes} onChange={(e) => setNotes(e.target.value)}
                placeholder="Interview rounds, contacts, feedback..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave} disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-semibold text-sm transition-all duration-300"
              >
                {saving ? "Saving..." : "✅ Save Changes"}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-6 py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-4">
            {[
              { label: "Company", value: job.company },
              { label: "Role", value: job.role },
              { label: "Location", value: job.location || "—" },
              { label: "Salary", value: job.salary || "—" },
              { label: "Applied Date", value: job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "—" },
              { label: "Resume Used", value: job.resumeUsed || "—" },
            ].map((field, i) => (
              <div key={i} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">{field.label}</span>
                <span className="text-sm text-gray-900 dark:text-white font-medium">{field.value}</span>
              </div>
            ))}

            {job.jobUrl && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Job URL</span>
                <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-500 hover:text-violet-400 transition-colors break-all">
                  {job.jobUrl}
                </a>
              </div>
            )}

            {job.notes && (
              <div className="flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold uppercase text-gray-500 dark:text-slate-500">Notes</span>
                <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{job.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-gray-100 dark:border-white/[0.06]">
              <button
                onClick={() => setEditing(true)}
                className="flex-1 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-lg font-semibold text-sm transition-all duration-300"
              >
                ✏️ Edit Job
              </button>
              <button
                onClick={handleDelete} disabled={deleting}
                className="px-4 py-2.5 bg-rose-50 dark:bg-rose-600/10 hover:bg-rose-100 dark:hover:bg-rose-600/20 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-semibold transition-all duration-300 disabled:opacity-40"
              >
                {deleting ? "..." : "🗑 Delete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}