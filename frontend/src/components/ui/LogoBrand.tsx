// src/components/ui/LogoBrand.jsx
import { Link } from "react-router-dom";

interface LogoBrandProps {
  to?: string;
  textColor?: string;
}

export default function LogoBrand({
  to = "/",
  textColor = "text-brand-blue",
}: LogoBrandProps) {
  const content = (
    <div className="flex items-center gap-2.5 group w-fit">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect width="22" height="22" rx="6" className="fill-brand-blue" />
        <path
          d="M5 11h12M11 5v12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-bold text-[15px] font-display tracking-tight ${textColor}`}
      >
        NexaNet
      </span>
    </div>
  );

  if (!to) {
    return content;
  }

  // Jika ada 'to', bungkus dengan Link router
  return <Link to={to}>{content}</Link>;
}
