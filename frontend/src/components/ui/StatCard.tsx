import { HERO_STATS } from "@/constants/heroStats";

export default function StatCard() {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md">
      {HERO_STATS.map((stat, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-brand-border/5 pb-4 last:border-none last:pb-0"
        >
          <div>
            <div className="text-xs mb-0.5 text-[rgba(255,255,255,0.35)] font-body">
              {stat.label}
            </div>
            <div className="font-mono text-[rgba(255,255,255,0.2)] text-[10px]">
              {stat.sub}
            </div>
          </div>
          <div className="text-2xl font-black text-white font-display">
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
