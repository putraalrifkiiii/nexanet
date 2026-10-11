import MemberLayout from "@/components/MemberLayout";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { formatRupiah } from "@/utils/formatters";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

const LanggananPage = () => {
  const { user, dashboard, getCurrentUser, langganan, getLangganan } =
    useAuth();
  useEffect(() => {
    getLangganan();
  });

  return (
    <MemberLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Langganan
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Langganan Saya
        </h1>

        <div className="p-8 mb-6 bg-brand-dark rounded-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="uppercase tracking-widest mb-2 font-mono text-[rgba(255,255,255,0.50)] text-[10px]">
                Aktif sekarang
              </div>
              <div className="text-3xl font-black font-display text-brand-white">
                {langganan?.[0]?.paket_wifi?.nama_paket ?? "Belum Berlangganan"}
              </div>
              <div className="text-sm font-body text-[rgba(255,255,255,0.50)]">
                {langganan?.[0]?.paket_wifi?.kecepatan_mbps ?? 0} Mbps
              </div>
            </div>
            <Status label="Aktif" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              [
                "Harga Bulanan",
                formatRupiah(langganan?.[0]?.paket_wifi?.harga ?? 0),
              ],
              [
                "Biaya Pasang",
                formatRupiah(langganan?.[0]?.biaya_pemasangan ?? 0),
              ],
              ["Mulai", langganan?.[0]?.tanggal_mulai ?? "-"],
              ["Berakhir", langganan?.[0]?.tanggal_berakhir ?? "-"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="uppercase tracking-widest mb-1 font-mono text-[rgba(255,255,255,0.50)] text-[9px]">
                  {k}
                </div>
                <div className="text-sm font-semibold font-body text-[rgba(255,255,255,0.85)]">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <button className="px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity font-body bg-brand-blue text-brand-white rounded-[10px] cursor-pointer">
              Upgrade Paket
            </button>
            <button className="px-5 py-2.5 text-xs font-medium hover:bg-white/30 transition-colors font-body border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.5)] rounded-[10px] cursor-pointer">
              Perpanjang
            </button>
          </div>
        </div>

        <div className="p-6 rounded-[14px] bg-brand-white border border-brand-border">
          <div className="uppercase tracking-[3px] mb-5 font-mono text-brand-muted text-[12px]">
            Riwayat
          </div>
          {langganan.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 last:border-0 border-b border-brand-border"
            >
              <div>
                <div className="text-sm font-medium font-body text-brand-dark">
                  {item.paket_wifi?.nama_paket ?? "-"}
                </div>

                <div className="mt-0.5 font-mono text-brand-muted text-[10px]">
                  {item.tanggal_mulai ?? "-"} – {item.tanggal_berakhir ?? "-"}
                </div>
              </div>

              <Status label="Selesai" />
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default LanggananPage;
