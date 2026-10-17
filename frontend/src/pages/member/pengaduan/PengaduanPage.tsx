import { useCallback, useEffect, useState } from "react";
import MemberLayout from "@/components/MemberLayout";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "@/api/apiService";
import { useAuth } from "@/context/AuthContext";
import { createPengaduan, fetchPengaduan } from "@/api/pengaduanService";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

type Ticket = {
  id: number;
  no: string;
  kategori: string;
  tanggal: string;
  status: string;
};

const kategoriOptions = [
  { label: "Internet Mati", value: "mati_total" },
  { label: "Internet Lambat", value: "koneksi_lambat" },
  { label: "Gangguan Koneksi", value: "kabel_putus" },
  { label: "Masalah Router", value: "perangkat_rusak" },
  { label: "Lainnya", value: "lainnya" },
];

const getKategoriLabel = (value: string) =>
  kategoriOptions.find((kategori) => kategori.value === value)?.label ?? value;


const PengaduanPage = () => {
  const [form, setForm] = useState({ kategori: "", deskripsi: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const loadTickets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchPengaduan();

      setTickets(
        data
          .filter((item) => !user?.email || item.pengguna?.email === user.email)
          .map((item) => ({
            id: item.id,
            no: item.kode_pengaduan,
            kategori: getKategoriLabel(item.kategori_pengaduan),
            tanggal: item.tanggal_pengaduan,
            status: item.status_penanganan,
          })),
      );
    } catch (requestError) {
      if (isAxiosError(requestError) && requestError.response?.status === 404) {
        setTickets([]);
        return;
      }

      setError(
        isAxiosError(requestError)
          ? (requestError.response?.data?.message ??
              "Gagal mengambil riwayat pengaduan")
          : "Gagal mengambil riwayat pengaduan",
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadTickets();
  }, [loadTickets]);

  return (
    <MemberLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Pengaduan
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Laporkan Masalah
        </h1>

        <div className="p-6 mb-8 bg-brand-white border border-brand-border rounded-[14px]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!form.kategori || !form.deskripsi) {
                setError("Kategori dan deskripsi harus diisi.");
                return;
              }

              try {
                if (!user?.email) {
                  setError("Data email pengguna tidak ditemukan.");
                  return;
                }

                setLoading(true);
                setError("");
                await createPengaduan({
                  email: user.email,
                  kategori_pengaduan: form.kategori,
                  deskripsi_masalah: form.deskripsi,
                  foto_kendala: file,
                });

                setSent(true);
                setForm({ kategori: "", deskripsi: "" });
                setFile(null);
                await loadTickets();
                setTimeout(() => setSent(false), 2500);
              } catch (requestError) {
                setError(
                  isAxiosError(requestError)
                    ? (requestError.response?.data?.message ??
                        "Gagal mengirim pengaduan")
                    : "Gagal mengirim pengaduan",
                );
              } finally {
                setLoading(false);
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
                  {kategoriOptions.map((kategori) => (
                    <option key={kategori.value} value={kategori.value}>
                      {kategori.label}
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
                <label className="flex items-center justify-between px-4 py-3 hover:border-blue-400 transition-colors border border-brand-border rounded-[10px] cursor-pointer bg-white">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] ?? null;
                      setFile(selected);
                    }}
                  />
                  <div className="flex items-center gap-2 overflow-hidden">
                    {file ? (
                      <span className="text-xs font-medium text-blue-600 truncate">
                        📎 {file.name}
                      </span>
                    ) : (
                      <span className="text-xs font-body text-brand-muted">
                        + Tambah foto atau screenshot
                      </span>
                    )}
                  </div>
                  {file && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFile(null);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 ml-2  shrink-0 font-medium"
                    >
                      Hapus
                    </button>
                  )}
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 text-sm font-semibold hover:opacity-90 transition-all font-body text-brand-white rounded-[10px] ${sent ? "bg-[#059669]" : "bg-brand-dark"}`}
              >
                {sent ? "Pengaduan Terkirim" : "Kirim Pengaduan"}
              </button>
            </div>
          </form>
          {error && (
            <div className="mt-4 text-sm text-red-600 font-body">{error}</div>
          )}
        </div>

        <div className="uppercase tracking-widest pb-4 font-mono text-brand-muted text-[10px] border-b border-brand-border ">
          Riwayat Pengaduan
        </div>
        {loading && tickets.length === 0 && (
          <div className="py-5 text-sm text-brand-muted font-body">
            Memuat riwayat pengaduan...
          </div>
        )}
        {!loading && tickets.length === 0 && (
          <div className="py-5 text-sm text-brand-muted font-body">
            Belum ada riwayat pengaduan.
          </div>
        )}
        {tickets.map((t) => (
          <button
            key={t.id}
            onClick={() =>
              navigate("/pengaduan-detail", { state: { id: t.id } })
            }
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
