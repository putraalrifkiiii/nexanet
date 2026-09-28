import MemberLayout from "@/components/MemberLayout";
import { useState } from "react";
import { formatRupiah } from "@/utils/formatters";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

const PembayaranPage = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const hist = [
    {
      no: "PAY-2025-0041",
      periode: "Oktober 2025",
      total: 220000,
      status: "Menunggu Pembayaran",
    },
    {
      no: "PAY-2025-0032",
      periode: "September 2025",
      total: 150000,
      status: "Berhasil",
    },
    {
      no: "PAY-2025-0024",
      periode: "Agustus 2025",
      total: 150000,
      status: "Berhasil",
    },
  ];

  return (
    <MemberLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Pembayaran
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Pembayaran
        </h1>

        <div className="mb-8 overflow-hidden border border-brand-border rounded-[14px]">
          <div className="flex items-center justify-between px-6 py-4 bg-brand-offwhite border-b border-brand-border">
            <div>
              <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[10px]">
                Tagihan Aktif
              </div>
              <div className="font-mono text-brand-dark text-[13px] font-medium">
                PAY-2025-0041
              </div>
            </div>
            <Status label="Menunggu Pembayaran" />
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8">
              {[
                ["Paket", "NexaNet Home"],
                ["Periode", "Oktober 2025"],
                ["Jatuh Tempo", "10 Okt 2025"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                    {k}
                  </div>
                  <div className="text-sm font-semibold font-body text-brand-dark ">
                    {v}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-5 mb-8 border-t border-brand-border">
              <span className="text-sm font-body text-brand-muted">
                Total Pembayaran
              </span>
              <span className="text-3xl font-black font-display text-brand-dark">
                Rp220.000
              </span>
            </div>
            <div className="p-5 mb-6 bg-brand-offwhite rounded-xl">
              <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[9px]">
                Instruksi Transfer
              </div>
              {[
                ["Bank", "BCA"],
                ["No. Rekening", "1234-5678-90"],
                ["Atas Nama", "PT NexaNet Indonesia"],
                ["Nominal", "Rp220.000"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between mb-1.5">
                  <span className="text-xs font-body text-brand-muted">
                    {k}
                  </span>
                  <span
                    className={`
                      text-xs font-semibold text-brand-dark ${k === "No. Rekening" ? "font-mono" : "font-body"}
                    `}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <label className="flex flex-col items-center py-8 hover:border-blue-400 transition-colors cursor-pointer rounded-xl border border-brand-border border-dashed ">
              <input
                type="file"
                className="hidden"
                accept=".jpg,.png,.pdf"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="mb-3"
              >
                <path
                  d="M10 12.5V3.75M10 3.75L6.875 6.875M10 3.75l3.125 3.125"
                  className="stroke-brand-muted"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.75 13.75v2.5h12.5v-2.5"
                  className="stroke-brand-muted"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {fileName ? (
                <span className="text-xs font-medium font-body text-[#059669]">
                  {fileName}
                </span>
              ) : (
                <>
                  <span className="text-xs font-semibold mb-1 font-body text-brand-dark">
                    Upload Bukti Pembayaran
                  </span>
                  <span className="text-[10px] font-body text-brand-muted">
                    JPG, PNG, atau PDF · Maks 5 MB
                  </span>
                </>
              )}
            </label>
            {fileName && (
              <button className="w-full mt-3 py-3 text-sm font-semibold hover:opacity-90 transition-opacity font-body bg-[#059669] text-white rounded-[10px] ">
                Kirim Bukti Pembayaran
              </button>
            )}
          </div>
        </div>

        <div className="overflow-hidden bg-brand-white border border-brand-border rounded-[14px] ">
          <div className="px-6 py-4 border-b border-brand-border">
            <div className="uppercase tracking-widest font-mono text-brand-muted text-[10px]">
              Riwayat Pembayaran
            </div>
          </div>
          {hist.map((p, i) => (
            <div
              key={p.no}
              className="flex items-center justify-between px-6 py-4 border-b border-brand-border last:border-b-0"
            >
              <div>
                <div className="font-mono text-brand-dark text-[12px]">
                  {p.no}
                </div>
                <div className="mt-0.5 font-body text-brand-muted text-[11px]">
                  {p.periode}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-sm font-display text-brand-dark">
                  {formatRupiah(p.total)}
                </span>
                <Status label={p.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default PembayaranPage;
