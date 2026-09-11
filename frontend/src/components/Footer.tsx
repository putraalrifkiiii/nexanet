import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-brand-dark">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 pb-12 border-b border-brand-border-dark">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
                  <rect
                    width="22"
                    height="22"
                    rx="6"
                    className="fill-brand-blue"
                  />
                  <path
                    d="M5 11h12M11 5v12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="font-bold text-[15px] font-display text-brand-white">
                  NexaNet
                </span>
              </div>
              <p className="text-sm leading-relaxed font-body text-[rgba(255,255,255,0.35)] ">
                Fiber optik untuk seluruh Indonesia. Terpercaya sejak 2015.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {[
                {
                  label: "Layanan",
                  links: [
                    ["Paket WiFi", "/paket-wifi"],
                    ["Berlangganan", "/langganan"],
                    ["Pengaduan", "/pengaduan"],
                  ],
                },
                {
                  label: "Perusahaan",
                  links: [
                    ["Tentang Kami", "/tentang-kami"],
                    ["Bantuan", "/bantuan"],
                  ],
                },
                {
                  label: "Kontak",
                  links: [
                    ["(021) 1500-6392", ""],
                    ["cs@nexanet.id", ""],
                    ["Jakarta, Indonesia", ""],
                  ],
                },
              ].map((col) => (
                <div key={col.label}>
                  <div className="uppercase tracking-widest mb-4 font-mono text-[rgba(255,255,255,0.2)] text-xs">
                    {col.label}
                  </div>
                  <div className="space-y-2.5">
                    {col.links.map(([text, path]) =>
                      path ? (
                        <Link
                          key={text}
                          to={path}
                          className="block text-sm hover:text-white transition-colors text-left font-body text-[rgba(255,255,255,0.4)]"
                        >
                          {text}
                        </Link>
                      ) : (
                        <div
                          key={text}
                          className="text-sm text-[rgba(255,255,255,0.35)] font-body"
                        >
                          {text}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="font-mono text-[rgba(255,255,255,0.2)] text-xs">
              © 2026 PT NexaNet Indonesia. Semua hak dilindungi.
            </p>
            <p className="font-mono text-[rgba(255,255,255,0.15)] text-xs">
              Uptime 99.9% · Jakarta · Surabaya · Bandung · +47 kota
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
