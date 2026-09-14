export interface FooterLink {
  label: string;
  links: [string, string][];
}

export const FOOTER_DATA: FooterLink[] = [
  {
    label: "Layanan",
    links: [
      ["Paket WiFi", "/paket-wifi"],
      ["Berlangganan", "/langganan"],
      ["Pengaduan", "/pengaduan"],
    ],
  },
  {
    label: "Perusahaan",
    links: [
      ["Tentang Kami", "/tentang-kami"],
      ["Bantuan", "/bantuan"],
    ],
  },
  {
    label: "Kontak",
    links: [
      ["(021) 1500-6392", "https://wa.me/6281234567890"],
      ["cs@nexanet.id", ""],
      ["Jakarta, Indonesia", ""],
    ],
  },
];
