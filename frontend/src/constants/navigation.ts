export interface NavItem {
  path: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: "/", label: "Beranda" },
  { path: "/paket-wifi", label: "Paket WiFi" },
  { path: "/tentang-kami", label: "Tentang Kami" },
  { path: "/bantuan", label: "Bantuan" },
];
