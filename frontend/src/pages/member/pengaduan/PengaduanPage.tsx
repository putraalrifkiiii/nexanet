import { useState } from "react";
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

const PengaduanPage = () => {
  const [form, setForm] = useState({ kategori: "", deskripsi: "" });
  const [sent, setSent] = useState(false);
  const tickets = [
    {
      no: "TKT-2025-0018",
      kategori: "Internet Lambat",
      tanggal: "5 Sep 2025",
      status: "Diproses",
    },
    {
      no: "TKT-2025-0009",
      kategori: "Gangguan Koneksi",
      tanggal: "12 Agt 2025",
      status: "Selesai",
    },
  ];

  const navigate = useNavigate();

  return (
    <MemberLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Pengaduan
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Laporkan Masalah
        </h1>

        <div className="p-6 mb-8 bg-brand-white border border-brand-border rounded-[14px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (form.kategori && form.deskripsi) {
                setSent(true);
                setTimeout(() => setSent(false), 2500);
                setForm({ kategori: "", deskripsi: "" });
              }
            }}
          >
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold mb-2 font-body text-brand-dark">
                  Kategori
                </label>
                <select
                  value={form.kategori}
                  onChange={(e) =>
                    setForm({ ...form, kategori: e.target.value })
                  }
                  className={`w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-body border border-brand-border rounded-[10px] ${form.kategori ? "text-brand-dark" : "text-brand-muted"} `}
                >
                  <option value="">Pilih kategori masalah</option>
                  {[
                    "Internet Mati",
                    "Internet Lambat",
                    "Gangguan Koneksi",
                    "Masalah Router",
                    "Lainnya",
                  ].map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 font-body text-brand-dark ">
                  Deskripsi
                </label>
                <textarea
                  rows={4}
                  value={form.deskripsi}
                  onChange={(e) =>
                    setForm({ ...form, deskripsi: e.target.value })
                  }
                  placeholder="Jelaskan masalah yang dialami secara detail..."
                  className="w-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300 font-body border border-brand-border rounded-[10px] text-brand-dark resize-none "
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2 font-body text-brand-dark">
                  Lampiran (Opsional)
                </label>
                <label className="flex items-center gap-3 px-4 py-3 hover:border-blue-400 transition-colors border border-brand-border rounded-[10px] cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" />
                  <span className="text-xs font-body text-brand-muted">
                    + Tambah foto atau screenshot
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-3.5 text-sm font-semibold hover:opacity-90 transition-all font-body text-brand-white rounded-[10px] ${sent ? "bg-[#059669]" : "bg-brand-dark"}`}
              >
                {sent ? "Pengaduan Terkirim" : "Kirim Pengaduan"}
              </button>
            </div>
          </form>
        </div>

        <div className="uppercase tracking-widest pb-4 font-mono text-brand-muted text-[10px] border-b border-brand-border ">
          Riwayat Pengaduan
        </div>
        {tickets.map((t) => (
          <button
            key={t.no}
            onClick={() => navigate("/pengaduan-detail")}
            className="flex items-center justify-between py-5 text-left hover:bg-gray-50 transition-colors px-1 group border-b border-brand-border w-full "
          >
            <div>
              <div className="mb-1 font-mono text-brand-muted text-[10px]">
                {t.no}
              </div>
              <div className="text-sm font-semibold font-body text-brand-dark">
                {t.kategori}
              </div>
              <div className="mt-0.5 font-mono text-brand-muted text-[10px] ">
                {t.tanggal}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Status label={t.status} />
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="text-gray-300 group-hover:text-gray-500 transition-colors"
              >
                <path
                  d="M5 2.5l4.5 4.5-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </MemberLayout>
  );
};

export default PengaduanPage;
