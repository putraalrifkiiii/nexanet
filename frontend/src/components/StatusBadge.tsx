const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Menunggu",
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-400",
  },
  sedang_perjalanan: {
    label: "Diproses",
    bg: "bg-emerald-50",
    text: "text-emerald-500",
    dot: "bg-emerald-400",
  },
  selesai: {
    label: "Selesai",
    bg: "bg-emerald-50",
    text: "text-emerald-500",
    dot: "bg-emerald-400",
  },
};

interface StatusProps {
  status?: string;
  label?: string;
  className?: string;
}

export default function StatusBadge({
  status,
  label,
  className = "",
}: StatusProps) {
  const key = status || label || "";

  const conf = statusConfig[key] || {
    label: label || status || "-",
    bg: "bg-emerald-50",
    text: "text-emerald-500",
    dot: "bg-emerald-400",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${conf.bg} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
      <span className={`font-mono text-[11px] ${conf.text}`}>
        {conf.label}
      </span>
    </div>
  );
}

export { StatusBadge as Status };
