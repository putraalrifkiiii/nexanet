import { useNavigate } from "react-router-dom";
import MemberLayout from "@/components/MemberLayout";
import { useAuth } from "@/context/AuthContext";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <MemberLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-brand-muted text-[10px] uppercase tracking-widest mb-2">
              Senin, 7 September 2025
            </div>
            <h1 className="font-display text-brand-dark text-2xl font-black">
              Selamat datang, {user?.nama ?? "Pengguna"}.
            </h1>
          </div>
          <Status label="Aktif" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            ["Paket Aktif", "NexaNet Home", "20 Mbps"],
            ["Tagihan Aktif", "Rp220.000", "Jatuh tempo 10 Okt"],
            ["Status Bayar", "Menunggu", "Oktober 2025"],
            ["Aktif Hingga", "31 Okt 2025", "30 hari lagi"],
          ].map(([label, value, sub]) => (
            <div
              key={label as string}
              className="bg-brand-white border border-brand-border rounded-xl p-4"
            >
              <div className="font-mono text-brand-muted text-[9px] uppercase tracking-widest mb-2">
                {label}
              </div>
              <div className="font-display text-brand-dark font-black text-sm mb-0.5">
                {value}
              </div>
              <div className="font-body text-brand-muted text-xs">{sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-brand-white border border-brand-border rounded-[14px] p-6 mb-6">
          <div className="font-mono text-brand-muted text-[10px] uppercase tracking-widest mb-5">
            Aksi Cepat
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(
              [
                ["Bayar Tagihan", "pembayaran"],
                ["Lihat Langganan", "langganan-saya"],
                ["Laporkan Masalah", "pengaduan"],
                ["Edit Profil", "profil"],
              ] as [string, string][]
            ).map(([label, path]) => (
              <button
                key={path}
                onClick={() => navigate(`/${path}`)}
                className="font-body border border-brand-border rounded-[10px] py-3 px-4 text-xs font-medium text-gray-700 hover:border-blue-400 hover:text-blue-700 transition-colors text-left"
              >
                {label} →
              </button>
            ))}
          </div>
        </div>

        <div className="bg-brand-white border border-brand-border rounded-[14px] p-6">
          <div className="font-mono text-brand-muted text-[10px] uppercase tracking-widest mb-5">
            Informasi Koneksi
          </div>
          {[
            ["No. Pelanggan", "NXN-2025-08741", true],
            ["Tanggal Mulai", "1 Oktober 2025", false],
            ["Alamat Pasang", "Jl. Merdeka No. 10, Jakarta", false],
            ["Nama Teknisi", "Agus Suprianto", false],
          ].map(([k, v, mono]) => (
            <div
              key={k as string}
              className="flex justify-between items-center py-3.5 border-b border-brand-border"
            >
              <span className="font-body text-brand-muted text-xs">
                {k as string}
              </span>
              <span
                className={`${mono ? "font-mono" : "font-body"} text-brand-dark text-xs font-semibold`}
              >
                {v as string}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default DashboardPage;
