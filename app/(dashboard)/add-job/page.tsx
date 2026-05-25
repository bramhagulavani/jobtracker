"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["Saved", "Applied", "Interview", "Offer", "Rejected"] as const;

const FormInput = ({
  label, placeholder, value, onChange, type = "text", required = false,
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; required?: boolean;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-slate-500 flex items-center gap-1">
      {label} {required && <span className="text-rose-400">*</span>}
    </label>
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
    />
  </div>
);

export default function AddJobPage() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<typeof STATUSES[number]>("Applied");
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [resumeUsed, setResumeUsed] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!company.trim()) { setError("Company name is required"); return; }
    if (!role.trim()) { setError("Job role is required"); return; }

    setSaving(true);
    setError("");
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

      router.push("/jobs");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Add Job Application
        </h1>
        <p className="text-gray-500 dark:text-slate-500 text-sm mt-1">
          Track a new job you've applied to or saved.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-6 md:p-8 space-y-5">

        {/* Required Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput label="Company" placeholder="e.g. Google" value={company} onChange={setCompany} required />
          <FormInput label="Role / Job Title" placeholder="e.g. Full Stack Developer" value={role} onChange={setRole} required />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-slate-500">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 ${
                  status === s
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md"
                    : "bg-gray-50 dark:bg-white/[0.03] border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-slate-400 hover:border-violet-500/30"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-slate-500">
              Applied Date
            </label>
            <input
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300"
            />
          </div>
          <FormInput label="Location" placeholder="e.g. Mumbai / Remote" value={location} onChange={setLocation} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormInput label="Salary / CTC" placeholder="e.g. ₹8 LPA" value={salary} onChange={setSalary} />
          <FormInput label="Resume Used" placeholder="e.g. ResumeCraft - Classic" value={resumeUsed} onChange={setResumeUsed} />
        </div>

        <FormInput label="Job URL" placeholder="https://linkedin.com/jobs/..." value={jobUrl} onChange={setJobUrl} type="url" />

        {/* Notes */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 dark:text-slate-500">
            Notes
          </label>
          <textarea
            placeholder="Any notes about this application... interview rounds, contacts, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-300 resize-none"
          />
        </div>

        {error && <p className="text-rose-500 dark:text-rose-400 text-sm font-medium">{error}</p>}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-900/20"
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