import { type PaketUI } from "@/constants/paketMapper";

const idr = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

interface PaketCard1Props {
  pkg: PaketUI;
}

const PaketCard = ({ pkg }: PaketCard1Props) => {
  return (
    <div
      className={`p-6 flex flex-col rounded-2xl ${pkg.top ? "bg-brand-dark border-none" : "bg-brand-white border border-brand-border"}`}
    >
      {pkg.top && (
        <div className="uppercase tracking-widest px-2.5 py-1 self-start mb-6 font-mono text-[9px] text-brand-blue bg-[rgba(20,86,240,0.15)] rounded-full">
          Paling Diminati
        </div>
      )}
      <div
        className={`uppercase tracking-widest mb-3 font-mono text-[10px] ${pkg.top ? "text-[rgba(255,255,255,0.25)]" : "text-brand-muted"}`}
      >
        NexaNet {pkg.nama_paket}
      </div>
      <div
        className={`text-6xl font-black leading-none mb-1 font-display ${pkg.top ? "text-brand-white" : "text-brand-dark"}`}
      >
        {pkg.kecepatan_mbps}
      </div>
      <div
        className={`text-sm mb-4 font-body ${pkg.top ? "text-[rgba(255,255,255,0.3)]" : "text-brand-muted"}`}
      >
        Mbps
      </div>
      <div
        className={`text-2xl font-black mb-0.5 font-display ${pkg.top ? "text-[rgba(255,255,255,0.9)]" : "text-brand-dark"}`}
      >
        {idr(pkg.harga)}
      </div>
      <div
        className={`text-xs mb-1 font-body ${pkg.top ? "text-[rgba(255,255,255,0.25)]" : "text-brand-muted"}`}
      >
        per bulan
      </div>
      <div
        className={`text-xs mb-4 font-body bg-green-600 text-brand-white py-1 px-2 self-start rounded-xl`}
      >
        Biaya pasang:{" "}
        {pkg.biaya_pemasangan === 0 ? "Gratis" : idr(pkg.biaya_pemasangan)}
      </div>
      <p
        className={`text-xs leading-relaxed mb-6 flex-1 font-body ${pkg.top ? "text-[rgba(255,255,255,0.35)]" : "text-brand-muted"}`}
      >
        {pkg.deskripsi_paket}
      </p>
      <div
        className={`pt-5 mb-6 space-y-2.5  ${pkg.top ? "border-t border-brand-white" : "border-t border-brand-border"}`}
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
              className={`text-xs leading-relaxed font-body ${pkg.top ? "text-[rgba(255,255,255,0.5)]" : "text-brand-muted"}`}
            >
              {f}
            </span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`w-full py-3 text-sm font-semibold cursor-pointer hover:opacity-85 transition-opacity font-display text-brand-white rounded-[10px] ${pkg.top ? "bg-brand-blue" : "bg-brand-dark"}`}
      >
        Pilih Paket Ini
      </button>
    </div>
  );
};

export default PaketCard;
