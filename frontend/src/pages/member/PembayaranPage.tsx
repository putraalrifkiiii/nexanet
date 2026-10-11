import MemberLayout from "@/components/MemberLayout";
import { useCallback, useEffect, useState } from "react";
import {
  fetchPembayaran,
  uploadBuktiPembayaran,
} from "@/api/pembayaranService";
import type { Pembayaran } from "@/types/types";
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
  const [pembayaran, setPembayaran] = useState<Pembayaran[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const loadPembayaran = useCallback(async () => {
    try {
      setError(null);
      setPembayaran(await fetchPembayaran());
    } catch {
      setError("Data pembayaran belum dapat dimuat.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPembayaran();
  }, [loadPembayaran]);

  const tagihanAktif = pembayaran.find(
    (item) => item.status_pembayaran === "Pending",
  );

  const handleFileChange = (file: File | undefined) => {
    setUploadMessage(null);
    setSelectedFile(null);
    setFileName(null);

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setUploadMessage("Bukti pembayaran harus berupa JPG atau PNG.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadMessage("Ukuran bukti pembayaran maksimal 2 MB.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile || !tagihanAktif?.langganan?.id) return;

    try {
      setIsUploading(true);
      setUploadMessage(null);
      await uploadBuktiPembayaran({
        id_langganan: tagihanAktif.langganan.id,
        metode_pembayaran: tagihanAktif.metode_pembayaran || "Belum ditentukan",
        bukti_pembayaran: selectedFile,
      });
      setSelectedFile(null);
      setFileName(null);
      setUploadMessage("Bukti pembayaran berhasil dikirim.");
      await loadPembayaran();
    } catch {
      setUploadMessage("Bukti pembayaran gagal dikirim.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <MemberLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Pembayaran
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Pembayaran
        </h1>

        {isLoading && (
          <p className="mb-8 text-sm font-body text-brand-muted">
            Memuat data pembayaran...
          </p>
        )}
        {error && !isLoading && (
          <p className="mb-8 text-sm font-body text-brand-danger">{error}</p>
        )}
        {!isLoading && !error && tagihanAktif && (
          <div className="mb-8 overflow-hidden border border-brand-border rounded-[14px]">
            <div className="flex items-center justify-between px-6 py-4 bg-brand-offwhite border-b border-brand-border">
              <div>
                <div className="uppercase tracking-widest mb-1 font-mono text-brand-muted text-[10px]">
                  Tagihan Aktif
                </div>
                <div className="font-mono text-brand-dark text-[13px] font-medium">
                  {tagihanAktif.nomor_pembayaran}
                </div>
              </div>
              <Status label={tagihanAktif.status_pembayaran} />
            </div>
            <div className="px-6 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-8 justify-items-center">
                {[
                  [
                    "Paket",
                    tagihanAktif.langganan?.paket_wifi?.nama_paket ?? "-",
                  ],
                  ["Periode", tagihanAktif.tanggal_bayar ?? "-"],
                  [
                    "Jatuh Tempo",
                    tagihanAktif.langganan?.tanggal_berakhir ?? "-",
                  ],
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
                  {formatRupiah(tagihanAktif.total_pembayaran)}
                </span>
              </div>
              <div className="p-5 mb-6 bg-brand-offwhite rounded-xl">
                <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[9px]">
                  Instruksi Transfer
                </div>
                {[
                  ["Metode", tagihanAktif.metode_pembayaran],
                  ["Nominal", formatRupiah(tagihanAktif.total_pembayaran)],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between mb-1.5">
                    <span className="text-xs font-body text-brand-muted">
                      {k}
                    </span>
                    <span className="text-xs font-semibold text-brand-dark font-body">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
              <label className="flex flex-col items-center py-8 hover:border-blue-400 transition-colors cursor-pointer rounded-xl border border-brand-border border-dashed ">
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.png"
                  onChange={(e) => handleFileChange(e.target.files?.[0])}
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
                      JPG atau PNG · Maks 2 MB
                    </span>
                  </>
                )}
              </label>
              {uploadMessage && (
                <p className="mt-3 text-xs font-body text-brand-muted text-center">
                  {uploadMessage}
                </p>
              )}
              {fileName && (
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => void handleUpload()}
                  className="w-full mt-3 py-3 text-sm font-semibold hover:opacity-90 transition-opacity font-body bg-[#059669] text-white rounded-[10px] disabled:opacity-50"
                >
                  {isUploading ? "Mengirim..." : "Kirim Bukti Pembayaran"}
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-hidden bg-brand-white border border-brand-border rounded-[14px] ">
          <div className="px-6 py-4 border-b border-brand-border">
            <div className="uppercase tracking-widest font-mono text-brand-muted text-[10px]">
              Riwayat Pembayaran
            </div>
          </div>
          {!isLoading && pembayaran.length === 0 && (
            <p className="px-6 py-4 text-sm font-body text-brand-muted">
              Belum ada riwayat pembayaran.
            </p>
          )}
          {pembayaran.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-6 py-4 border-b border-brand-border last:border-b-0"
            >
              <div>
                <div className="font-mono text-brand-dark text-[12px]">
                  {p.nomor_pembayaran}
                </div>
                <div className="mt-0.5 font-body text-brand-muted text-[11px]">
                  {p.tanggal_bayar ?? "-"}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-bold text-sm font-display text-brand-dark">
                  {formatRupiah(p.total_pembayaran)}
                </span>
                <Status label={p.status_pembayaran} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default PembayaranPage;
