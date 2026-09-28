import { formatRupiah } from "@/utils/formatters";
import { fetchPaketWifiBySlug } from "@/api/paketApi";
import { mapPaketToUI, type PaketUI } from "@/constants/paketMapper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaketDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<PaketUI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaketDetail() {
      if (!slug) {
        setError("Paket WiFi tidak ditemukan.");
        setIsLoading(false);
        return;
      }

      try {
        const dataApi = await fetchPaketWifiBySlug(slug);
        setPkg(mapPaketToUI([dataApi])[0]);
      } catch {
        setError("Paket WiFi tidak dapat dimuat.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPaketDetail();
  }, [slug]);

  if (isLoading) {
    return <p className="p-8 text-sm font-body text-brand-muted">Memuat detail paket...</p>;
  }

  if (error || !pkg) {
    return <p className="p-8 text-sm font-body text-brand-danger">{error ?? "Paket WiFi tidak ditemukan."}</p>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
        <button
          onClick={() => navigate("/paket-wifi")}
          className="flex items-center gap-2 mb-12 hover:text-gray-700 transition-colors font-mono text-brand-muted text-xs"
        >
          ← Semua paket
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted *:text-[11px]">
                NexaNet {pkg.nama_paket}
              </div>
              <div className="text-8xl font-black leading-none mb-1 font-display text-brand-dark">
                {pkg.kecepatan_mbps}
              </div>
              <div className="text-lg mb-6 font-body text-brand-muted">
                Mbps
              </div>
              <p className="text-sm leading-relaxed max-w-md font-body text-brand-muted">
                {pkg.deskripsi_paket}
              </p>
            </div>
            <div className="py-8 flex gap-12 border-y border-brand-border">
              <div>
                <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[10px]">
                  Harga/bulan
                </div>
                <div className="text-2xl font-black font-display text-brand-dark">
                  {formatRupiah(pkg.harga)}
                </div>
              </div>
              <div>
                <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[10px]">
                  Biaya Pasang
                </div>
                <div
                  style={{
                    color: pkg.biaya_pemasangan === 0 ? "#059669" : undefined,
                  }}
                  className="text-2xl font-black font-display"
                >
                  {pkg.biaya_pemasangan === 0
                    ? "Gratis"
                    : formatRupiah(pkg.biaya_pemasangan)}
                </div>
              </div>
            </div>
            <div>
              <div className="uppercase tracking-widest mb-6 font-mono text-brand-muted text-[10px]">
                Yang Termasuk
              </div>
              {pkg.fitur.map((f) => (
                <div
                  key={f}
                  className="flex items-center justify-between py-4 border-b border-brand-border"
                >
                  <span className="text-sm font-body text-brand-dark">{f}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#ECFDF5" />
                    <path
                      d="M5 8l2.5 2.5 4-4"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <div className="p-6 rounded-xl bg-brand-offwhite ">
              <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[10px]">
                Syarat & Ketentuan
              </div>
              <ul className="text-xs leading-loose space-y-1 font-body text-brand-muted">
                <li>· Kontrak berlangganan bulanan, tanpa jangka minimum</li>
                <li>· Tagihan diterbitkan setiap awal bulan</li>
                <li>· Biaya pemasangan dibayarkan saat aktivasi</li>
                <li>
                  · Router adalah aset NexaNet, dikembalikan bila berhenti
                  berlangganan
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="p-6 border border-brand-border rounded-2xl sticky top-22">
              <div className="uppercase tracking-widest mb-5 font-mono text-brand-muted text-[10px]">
                Ringkasan
              </div>
              <div className="space-y-2 mb-5">
                {[
                  ["Paket bulanan", formatRupiah(pkg.harga)],
                  [
                    "Biaya pasang",
                    pkg.biaya_pemasangan === 0
                      ? "Gratis"
                      : formatRupiah(pkg.biaya_pemasangan),
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-xs font-body text-brand-muted">
                      {k}
                    </span>
                    <span className="text-xs font-medium font-mono text-brand-dark">
                      {v}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 mt-1 border-t border-brand-border">
                  <span className="text-xs font-semibold font-body text-brand-dark">
                    Total awal
                  </span>
                  <span className="font-black text-base font-display text-brand-dark">
                    {formatRupiah(pkg.harga + pkg.biaya_pemasangan)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 font-semibold text-sm hover:opacity-90 transition-opacity rounded-xl text-brand-white bg-brand-blue font-display"
              >
                Berlangganan Sekarang
              </button>
              <p className="text-center mt-3 font-mono text-brand-muted text-[10px]">
                Tanpa kontrak jangka panjang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaketDetail;
