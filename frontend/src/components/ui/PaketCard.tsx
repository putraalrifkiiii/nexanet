import { useEffect, useState } from "react";
import { fetchPaketWifi } from "@/api/paketApi";
import { mapPaketToUI, type PaketUI } from "@/constants/paketMapper";

const C = {
  dark: "#07111f",
  blue: "#1456f0",
  white: "#ffffff",
  muted: "#9ca3af",
  border: "#e5e7eb",
};

const F = {
  display: "Plus Jakarta Sans, sans-serif",
  body: "DM Sans, sans-serif",
  mono: "DM Mono, monospace",
};

const idr = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const PaketCard = () => {
  const [pkgs, setPkgs] = useState<PaketUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaketWifi() {
      try {
        const dataApi = await fetchPaketWifi();
        setPkgs(mapPaketToUI(dataApi));
      } catch {
        setError("Paket internet belum dapat dimuat.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPaketWifi();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[11px]">
          Paket Internet
        </div>
        <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight font-display text-brand-dark">
          Pilih yang sesuai
          <br />
          kebutuhan Anda.
        </h1>
        <p className="text-sm leading-relaxed max-w-md mb-16 font-body text-brand-muted">
          Semua paket sudah termasuk fiber optik langsung ke rumah, tanpa batas
          kuota, dan dukungan teknis 24/7.
        </p>

        {isLoading && (
          <p className="text-sm font-body text-brand-muted">
            Memuat paket internet...
          </p>
        )}
        {error && !isLoading && (
          <p className="text-sm font-body text-brand-danger">{error}</p>
        )}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {pkgs.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  borderRadius: 16,
                  background: pkg.top ? C.dark : C.white,
                  border: pkg.top ? "none" : `1px solid ${C.border}`,
                }}
                className="p-6 flex flex-col"
              >
                {pkg.top && (
                  <div className="uppercase tracking-widest px-2.5 py-1 self-start mb-6 font-mono text-[9px] text-brand-blue bg-[rgba(20,86,240,0.15)] rounded-full">
                    Paling Diminati
                  </div>
                )}
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 10,
                    color: pkg.top ? "rgba(255,255,255,0.25)" : C.muted,
                  }}
                  className="uppercase tracking-widest mb-3 font-mono text-[10px]"
                >
                  NexaNet {pkg.nama_paket}
                </div>
                <div
                  style={{
                    fontFamily: F.display,
                    color: pkg.top ? C.white : C.dark,
                  }}
                  className="text-6xl font-black leading-none mb-1 font-display "
                >
                  {pkg.kecepatan_mbps}
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    color: pkg.top ? "rgba(255,255,255,0.3)" : C.muted,
                  }}
                  className="text-sm mb-4 font-body "
                >
                  Mbps
                </div>
                <div
                  style={{
                    fontFamily: F.display,
                    color: pkg.top ? "rgba(255,255,255,0.9)" : C.dark,
                  }}
                  className="text-2xl font-black mb-0.5 font-display"
                >
                  {idr(pkg.harga)}
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    color: pkg.top ? "rgba(255,255,255,0.25)" : C.muted,
                  }}
                  className="text-xs mb-1 font-body"
                >
                  per bulan
                </div>
                <div
                  style={{
                    fontFamily: F.body,
                    color: pkg.top ? "rgba(255,255,255,0.3)" : C.muted,
                  }}
                  className="text-xs mb-4 font-body "
                >
                  Biaya pasang:{" "}
                  <span
                    style={{
                      color: pkg.top ? "rgba(255,255,255,0.6)" : C.dark,
                      fontWeight: 600,
                    }}
                  >
                    Hubungi kami
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: F.body,
                    color: pkg.top ? "rgba(255,255,255,0.35)" : C.muted,
                  }}
                  className="text-xs leading-relaxed mb-6 flex-1 font-body "
                >
                  {pkg.deskripsi_paket}
                </p>
                <div
                  style={{
                    borderTop: `1px solid ${pkg.top ? "rgba(255,255,255,0.07)" : C.border}`,
                  }}
                  className="pt-5 mb-6 space-y-2.5 "
                >
                  {pkg.fitur.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="shrink-0 mt-0.5"
                        fill="none"
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="7"
                          fill={pkg.top ? "rgba(20,86,240,0.25)" : "#F3F4F6"}
                        />
                        <path
                          d="M4.5 7l2 2 3-3"
                          stroke={pkg.top ? "#60a5fa" : "#6B7280"}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        style={{
                          fontFamily: F.body,
                          color: pkg.top ? "rgba(255,255,255,0.5)" : C.muted,
                        }}
                        className="text-xs leading-relaxed font-body "
                      >
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  style={{
                    fontFamily: F.display,
                    background: pkg.top ? C.blue : C.dark,
                    color: C.white,
                    borderRadius: 10,
                  }}
                  className="w-full py-3 text-sm font-semibold hover:opacity-85 transition-opacity font-display text-brand-white rounded-[10px]"
                >
                  Pilih Paket Ini
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Comparison table */}
      </div>
    </div>
  );
};

export default PaketCard;
