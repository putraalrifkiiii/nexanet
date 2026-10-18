import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "@/api/apiService";
import { fetchPengaduanDetail } from "@/api/pengaduanService";
import MemberLayout from "@/components/MemberLayout";
import type { PengaduanGangguan } from "@/types/types";

const kategoriLabels: Record<string, string> = {
  mati_total: "Internet Mati",
  koneksi_lambat: "Internet Lambat",
  kabel_putus: "Gangguan Koneksi",
  perangkat_rusak: "Masalah Router",
  lainnya: "Lainnya",
};

import StatusBadge from "@/components/StatusBadge";

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
}

const DetailPengaduanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const ticketId = (location.state as { id?: number } | null)?.id;

  const [ticket, setTicket] = useState<PengaduanGangguan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDetail = useCallback(async () => {
    if (!ticketId) {
      setError("ID pengaduan tidak ditemukan.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await fetchPengaduanDetail(ticketId);
      setTicket(data);
    } catch (err) {
      setError(
        isAxiosError(err)
          ? (err.response?.data?.message ?? "Gagal memuat detail pengaduan")
          : "Gagal memuat detail pengaduan",
      );
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void loadDetail();
  }, [loadDetail]);

  const kategoriText = ticket
    ? kategoriLabels[ticket.kategori_pengaduan] || ticket.kategori_pengaduan
    : "-";

  const namaTeknisi = ticket?.teknisi?.nama_teknisi || "Belum ditugaskan";

  // Timeline progression calculation
  const isPending = ticket?.status_penanganan === "pending";
  const isDiproses =
    ticket?.status_penanganan === "sedang_perjalanan" ||
    ticket?.status_penanganan === "selesai";
  const isSelesai = ticket?.status_penanganan === "selesai";

  const timelineSteps = [
    {
      waktu: formatDate(ticket?.tanggal_pengaduan),
      label: "Pengaduan diterima",
      sub: "Tim kami sudah menerima laporan Anda.",
      done: true,
    },
    {
      waktu: ticket?.teknisi ? formatDate(ticket.tanggal_pengaduan) : "-",
      label: "Teknisi ditugaskan",
      sub: ticket?.teknisi
        ? `${ticket.teknisi.nama_teknisi} akan menangani masalah ini.`
        : "Menunggu teknisi ditugaskan.",
      done: !isPending || !!ticket?.teknisi,
    },
    {
      waktu: isDiproses ? formatDate(ticket?.tanggal_pengaduan) : "-",
      label: "Sedang diproses",
      sub: isDiproses
        ? "Teknisi sedang melakukan investigasi/penanganan di lokasi."
        : "Menunggu penanganan lebih lanjut.",
      done: isDiproses,
    },
    ...(isSelesai
      ? [
          {
            waktu: formatDate(ticket?.tanggal_pengaduan),
            label: "Pengaduan selesai",
            sub: "Masalah koneksi telah berhasil diselesaikan.",
            done: true,
          },
        ]
      : []),
  ];

  return (
    <MemberLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/pengaduan")}
          className="flex items-center gap-2 mb-10 hover:text-gray-700 transition-colors font-mono text-brand-muted text-xs cursor-pointer"
        >
          ← Semua pengaduan
        </button>

        {loading ? (
          <div className="py-12 text-center text-sm font-mono text-brand-muted">
            Memuat detail pengaduan...
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-[14px] text-red-600 text-sm font-body">
            <p className="font-semibold mb-2">Terjadi Kesalahan</p>
            <p>{error}</p>
            <button
              onClick={() => navigate("/pengaduan")}
              className="mt-4 px-4 py-2 bg-brand-dark text-brand-white text-xs rounded-lg cursor-pointer hover:opacity-90"
            >
              Kembali ke Daftar Pengaduan
            </button>
          </div>
        ) : ticket ? (
          <>
            {/* Header: Kode Tiket, Judul Kategori, dan Status */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="mb-2 font-mono text-brand-muted text-[10px] tracking-wider uppercase">
                  {ticket.kode_pengaduan}
                </div>
                <h1 className="text-2xl font-black font-display text-brand-dark">
                  {kategoriText}
                </h1>
              </div>
              <StatusBadge status={ticket.status_penanganan} />
            </div>

            {/* Card Detail: Grid Informasi & Deskripsi */}
            <div className="p-6 mb-8 border border-brand-border rounded-[14px] bg-brand-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
                <div>
                  <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                    Kategori
                  </div>
                  <div className="text-sm font-semibold font-body text-brand-dark">
                    {kategoriText}
                  </div>
                </div>

                <div>
                  <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                    Dilaporkan
                  </div>
                  <div className="text-sm font-semibold font-body text-brand-dark">
                    {formatDate(ticket.tanggal_pengaduan)}
                  </div>
                </div>

                <div>
                  <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                    Teknisi
                  </div>
                  <div className="text-sm font-semibold font-body text-brand-dark">
                    {namaTeknisi}
                  </div>
                </div>

                <div>
                  <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[9px]">
                    Estimasi Selesai
                  </div>
                  <div className="text-sm font-semibold font-body text-brand-dark">
                    {ticket.status_penanganan === "selesai" ? "Selesai" : "1 - 2 Hari Kerja"}
                  </div>
                </div>
              </div>

              {/* Box Deskripsi Masalah */}
              <div className="p-4 bg-brand-offwhite rounded-[10px]">
                <div className="uppercase tracking-widest mb-2 font-mono text-brand-muted text-[9px]">
                  Deskripsi
                </div>
                <p className="text-sm leading-relaxed font-body text-brand-dark">
                  {ticket.deskripsi_masalah}
                </p>

                {ticket.foto_kendala && (
                  <div className="mt-4 pt-3 border-t border-brand-border/60">
                    <div className="uppercase tracking-widest mb-2 font-mono text-brand-muted text-[9px]">
                      Foto Kendala
                    </div>
                    <img
                      src={ticket.foto_kendala}
                      alt="Foto Kendala"
                      className="max-h-48 rounded-lg border border-brand-border object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Timeline Penanganan */}
            <div>
              <div className="uppercase tracking-widest pb-4 mb-6 font-mono text-brand-muted text-[10px] border-b border-brand-border">
                Timeline Penanganan
              </div>

              {timelineSteps.map((t, i) => (
                <div key={i} className="flex gap-4 mb-6">
                  <div className="flex flex-col items-center">
                    <div
                      style={{ borderRadius: "50%" }}
                      className={`mt-1 w-2.5 h-2.5 shrink-0 ${
                        t.done ? "bg-brand-blue" : "bg-[#D1D5DB]"
                      }`}
                    />
                    {i < timelineSteps.length - 1 && (
                      <div className="w-px bg-brand-border flex-1 mt-2" />
                    )}
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
          </>
        ) : null}
      </div>
    </MemberLayout>
  );
};

export default DetailPengaduanPage;
