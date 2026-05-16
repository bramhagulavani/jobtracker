type Status = "Saved" | "Applied" | "Interview" | "Offer" | "Rejected";

const STATUS_CONFIG: Record<Status, { color: string; dot: string }> = {
  Saved:     { color: "bg-slate-500/10 text-slate-500 border-slate-500/20 dark:text-slate-400",   dot: "bg-slate-400" },
  Applied:   { color: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",       dot: "bg-blue-400" },
  Interview: { color: "bg-violet-500/10 text-violet-600 border-violet-500/20 dark:text-violet-400", dot: "bg-violet-400" },
  Offer:     { color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400", dot: "bg-emerald-400" },
  Rejected:  { color: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",       dot: "bg-rose-400" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}