import React from "react";
import type { AuthShellProps } from "@/types/auth";
import LogoBrand from "./ui/LogoBrand";

function AuthShell({ title, sub, children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 bg-brand-dark">
        <LogoBrand to="/" textColor="text-brand-white" />
        <div>
          <div className="uppercase tracking-widest mb-6 font-mono text-[rgba(255,255,255,0.40)] text-[11px] ">
            Jaringan Fiber Optik
          </div>
          <div className="text-4xl font-black leading-tight mb-4 font-display text-brand-white">
            Terhubung dengan
            <br />
            kecepatan penuh.
          </div>
          <p className="text-sm leading-relaxed font-body text-[rgba(255,255,255,0.35)]">
            Kelola langganan, pantau pembayaran, dan laporkan masalah dari satu
            dashboard.
          </p>
        </div>
        <div className="pt-6 border-t border-[rgba(255,255,255,0.07)]">
          <div className="font-mono text-[rgba(255,255,255,0.15)] text-[11px]">
            99.9% uptime · &lt;5ms latency · 50+ kota
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-black mb-2 font-display text-brand-dark">
            {title}
          </h1>
          <p className="text-sm mb-10 font-body text-brand-muted">{sub}</p>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthShell;
