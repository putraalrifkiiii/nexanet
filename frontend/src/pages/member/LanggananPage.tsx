import MemberLayout from "@/components/MemberLayout";

function Status({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      <span className="font-mono text-emerald-500 text-[11px]">{label}</span>
    </div>
  );
}

const LanggananPage = () => {
  return (
    <MemberLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="uppercase tracking-widest mb-3 font-mono text-brand-muted text-[10px]">
          Langganan
        </div>
        <h1 className="text-2xl font-black mb-10 font-display text-brand-dark">
          Langganan Saya
        </h1>

        <div className="p-8 mb-6 bg-brand-dark rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="uppercase tracking-widest mb-2 font-mono text-[rgba(255,255,255,0.25)] text-[10px]">
                Aktif sekarang
              </div>
              <div className="text-3xl font-black font-display text-brand-white">
                NexaNet Home
              </div>
              <div className="text-sm font-body text-[rgba(255,255,255,0.35)]">
                20 Mbps
              </div>
            </div>
            <div
              style={{ background: "rgba(52,211,153,0.12)", borderRadius: 100 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rgba[(52,211,153,0.12)] rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[#34d399] text-[11px]">
                Aktif
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              ["Harga Bulanan", "Rp220.000"],
              ["Biaya Pasang", "Rp250.000"],
              ["Mulai", "1 Okt 2025"],
              ["Berakhir", "31 Okt 2025"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="uppercase tracking-widest mb-1 font-mono text-[rgba(255,255,255,0.2)] text-[9px]">
                  {k}
                </div>
                <div className="text-sm font-semibold font-body text-[rgba(255,255,255,0.75)]">
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <button className="px-5 py-2.5 text-xs font-semibold hover:opacity-90 transition-opacity font-body bg-brand-blue text-brand-white rounded-[10px]">
              Upgrade Paket
            </button>
            <button className="px-5 py-2.5 text-xs font-medium hover:bg-white/5 transition-colors font-body border border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.5)] rounded-[10px]">
              Perpanjang
            </button>
          </div>
        </div>

        <div className="p-6 rounded-[14px] bg-brand-white border border-brand-border">
          <div className="uppercase tracking-widest mb-5 font-mono text-brand-muted text-[10px]">
            Riwayat
          </div>
          {[
            ["NexaNet Starter · 10 Mbps", "1 Agt – 31 Agt 2025", "Selesai"],
            ["NexaNet Starter · 10 Mbps", "1 Jul – 31 Jul 2025", "Selesai"],
          ].map(([paket, periode, status]) => (
            <div
              key={periode as string}
              className="flex items-center justify-between py-4 last:border-0 border-b border-brand-border"
            >
              <div>
                <div className="text-sm font-medium font-body text-brand-dark">
                  {paket}
                </div>
                <div className="mt-0.5 font-mono text-brand-muted text-[10px]">
                  {periode}
                </div>
              </div>

              <Status label={status} />
            </div>
          ))}
        </div>
      </div>
    </MemberLayout>
  );
};

export default LanggananPage;
