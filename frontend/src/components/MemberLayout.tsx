import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useLocation, useNavigate } from "react-router";

function MemberLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Langganan Saya", path: "/langganan" },
    { label: "Pembayaran", path: "/pembayaran" },
    { label: "Pengaduan", path: "/pengaduan" },
    { label: "Profil", path: "/profil" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-brand-offwhite">
      <aside className="hidden sticky top-0 h-screen md:flex flex-col shrink-0 bg-brand-blue border-r border-brand-border w-55">
        <div className="px-6 py-4 flex items-center gap-2.5 border-b border-brand-border bg-black">
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="6" className="fill-brand-blue" />
            <path
              d="M5 11h12M11 5v12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-bold text-[14px] font-display text-brand-white">
            NexaNet
          </span>
        </div>
        <nav className="flex-1 py-4 px-3">
          {nav.map(({ label, path }) => {
            const isActive = location.pathname === path;

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`w-full text-left px-3 py-2.5 text-sm font-medium mb-0.5 transition-colors hover:bg-gray-50 hover:text-brand-dark rounded-lg font-body ${isActive ? "bg-brand-offwhite text-brand-dark" : "text-brand-white"}`}
              >
                {label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-brand-border bg-brand-dark">
          <div className="text-xs font-semibold mb-0.5 font-body text-brand-white">
            {user?.nama ?? "Pengguna"}
          </div>
          <div className="font-mono text-brand-white text-[10px]">
            NXN-2025-08741
          </div>
        </div>
      </aside>

      <div className="md:hidden fixed bottom-0 inset-x-0 flex z-50 border-t border-brand-border bg-brand-white">
        {nav.map(({ label, path }) => {
          const isActive = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex-1 flex justify-center gap-1 py-3 font-medium font-body text-[10px] ${isActive ? "text-brand-blue" : "text-brand-muted"} `}
            >
              <span className="text-xs truncate px-1">
                {label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      <main className="flex-1 overflow-auto pb-10 md:pb-0 ">{children}</main>
    </div>
  );
}

export default MemberLayout;
