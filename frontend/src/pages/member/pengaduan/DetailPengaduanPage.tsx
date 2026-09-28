import MemberLayout from "@/components/MemberLayout";
import { useNavigate } from "react-router-dom";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

const DetailPengaduanPage = () => {
  const navigate = useNavigate();
  return (
    <MemberLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/pengaduan")}
          className="flex items-center gap-2 mb-10 hover:text-gray-700 transition-colors font-mono text-brand-muted text-xs "
        >
          ← Semua pengaduan
        </button>
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="mb-2 font-mono text-brand-muted text-[10px]">
              TKT-2025-0018
            </div>
            <h1 className="text-2xl font-black font-display text-brand-dark">
              Internet Lambat
            </h1>
          </div>
          <Status label="Diproses" />
        </div>
        <div className="p-6 mb-6 border border-brand-border rounded-[14px]">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {[
              ["Kategori", "Internet Lambat"],
              ["Dilaporkan", "5 Sep 2025, 20:14"],
              ["Teknisi", "Agus Suprianto"],
              ["Estimasi Selesai", "7 Sep 2025"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                  {k}
                </div>
                <div className="text-sm font-semibold font-body text-brand-dark">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-brand-offwhite rounded-[10px]">
            <div className="uppercase tracking-widest mb-2 font-mono text-brand-muted text-[9px]">
              Deskripsi
            </div>
            <p className="text-sm leading-relaxed font-body text-brand-dark">
              Internet sangat lambat sejak kemarin malam, tidak bisa streaming
              video HD maupun video call. Speed test hanya menunjukkan 2 Mbps
              dari yang seharusnya 20 Mbps.
            </p>
          </div>
        </div>
        <div>
          <div className="uppercase tracking-widest pb-4 mb-6 font-mono text-brand-muted text-[10px] border-b border-brand-border">
            Timeline Penanganan
          </div>
          {[
            {
              waktu: "5 Sep 2025 · 20:14",
              label: "Pengaduan diterima",
              sub: "Tim kami sudah menerima laporan Anda.",
              done: true,
            },
            {
              waktu: "6 Sep 2025 · 09:00",
              label: "Teknisi ditugaskan",
              sub: "Agus Suprianto akan menangani masalah ini.",
              done: true,
            },
            {
              waktu: "6 Sep 2025 · 14:30",
              label: "Sedang diproses",
              sub: "Teknisi sedang investigasi di lokasi Anda.",
              done: false,
            },
          ].map((t, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="flex flex-col items-center">
                <div
                  style={{
                    borderRadius: "50%",
                  }}
                  className={`mt-1 w-2.5 h-2.5 shrink-0 ${t.done ? "bg-brand-blue" : "bg-[#D1D5DB]"} `}
                />
                {i < 2 && <div className="w-px bg-brand-border flex-1 mt-2" />}
              </div>
              <div className="pb-4">
                <div className="font-mono text-brand-muted text-[10px] mb-0.5">
                  {t.waktu}
                </div>
                <div className="text-sm font-semibold font-body text-brand-dark">
                  {t.label}
                </div>
                <div className="text-xs mt-0.5 font-body text-brand-muted">
                  {t.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default DetailPengaduanPage;
