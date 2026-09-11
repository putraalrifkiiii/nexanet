export interface HeroStatItem {
  value: string;
  label: string;
  sub: string;
}

export const HERO_STATS: HeroStatItem[] = [
  {
    value: "99.9%",
    label: "Uptime jaringan",
    sub: "12 bulan terakhir",
  },
  {
    value: "<5ms",
    label: "Latency rata-rata",
    sub: "Fiber ke rumah Anda",
  },
  {
    value: "50.000+",
    label: "Pelanggan aktif",
    sub: "Di seluruh Indonesia",
  },
  {
    value: "50+",
    label: "Kota terjangkau",
    sub: "Dan terus berkembang",
  },
];
