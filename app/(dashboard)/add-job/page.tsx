"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const STATUSES = [
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const;

const STATUS_COLORS: Record<string, { active: string; inactive: string }> = {
  Saved: {
    active: "bg-slate-500 text-white border-slate-500",
    inactive:
      "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:border-slate-500/40",
  },
  Applied: {
    active: "bg-blue-500 text-white border-blue-500",
    inactive:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:border-blue-500/40",
  },
  Interview: {
    active: "bg-violet-500 text-white border-violet-500",
    inactive:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20 hover:border-violet-500/40",
  },
  Offer: {
    active: "bg-emerald-500 text-white border-emerald-500",
    inactive:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40",
  },
  Rejected: {
    active: "bg-rose-500 text-white border-rose-500",
    inactive:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:border-rose-500/40",
  },
};

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mt-6 mb-3 first:mt-0">
      <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-500 to-indigo-500" />
      <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-slate-500">
        {title}
      </h2>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300";

const labelClass =
  "text-[11px] font-bold tracking-[0.15em] uppercase text-gray-500 dark:text-slate-500 flex items-center gap-1";

export default function AddJobPage() {
  const router = useRouter();
  const toast = useToast();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("Applied");
  const [appliedDate, setAppliedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [resumeUsed, setResumeUsed] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!company.trim()) {
      toast.warning("Company name is required");
      return;
    }
    if (!role.trim()) {
      toast.warning("Job role is required");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: company.trim(),
          role: role.trim(),
          jobUrl: jobUrl.trim(),
          status,
          appliedDate: new Date(appliedDate),
          location: location.trim(),
          salary: salary.trim(),
          resumeUsed: resumeUsed.trim(),
          notes: notes.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error saving job");
      }

      toast.success("Job saved successfully!");
      router.push("/jobs");
    } catch (err: unknown) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Add Job Application
        </h1>
        <p className="text-gray-500 dark:text-slate-500 text-sm mt-1">
          Track a new job you&apos;ve applied to or saved.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-5 md:p-6">
        {/* Required Fields */}
        <SectionHeader title="Basic Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Company <span className="text-rose-400">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>
              Role / Job Title <span className="text-rose-400">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Full Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>

        {/* Status */}
        <SectionHeader title="Application Status" />
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                status === s
                  ? STATUS_COLORS[s].active
                  : STATUS_COLORS[s].inactive
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Details */}
        <SectionHeader title="Details" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Applied Date</label>
              <input
                type="date"
                className={inputClass}
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Location</label>
              <input
                className={inputClass}
                placeholder="e.g. Mumbai / Remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Salary / CTC</label>
              <input
                className={inputClass}
                placeholder="e.g. ₹8 LPA"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Resume Used</label>
              <input
                className={inputClass}
                placeholder="e.g. ResumeCraft - Classic"
                value={resumeUsed}
                onChange={(e) => setResumeUsed(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Job URL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://linkedin.com/jobs/..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <SectionHeader title="Notes" />
        <textarea
          placeholder="Any notes about this application... interview rounds, contacts, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
        />

        {/* Actions */}
        <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-white/[0.04]">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-900/20 hover:scale-[1.02]"
          >
            {saving ? "Saving..." : "✅ Save Job"}
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-100 dark:bg-white/[0.06] hover:bg-gray-200 dark:hover:bg-white/[0.1] border border-gray-200 dark:border-white/[0.06] rounded-xl text-sm font-medium transition-all duration-300 text-gray-700 dark:text-slate-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}