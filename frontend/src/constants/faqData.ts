export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: "Cara cek status pembayaran?",
    a: "Login ke akun Anda dan buka menu Pembayaran untuk melihat status tagihan dan riwayat lengkap.",
  },
  {
    q: "Bagaimana cara upgrade paket?",
    a: "Hubungi CS kami di (021) 1500-6392 atau melalui WhatsApp. Upgrade berlaku mulai bulan berikutnya.",
  },
  {
    q: "Berapa lama verifikasi bukti transfer?",
    a: "Verifikasi dilakukan dalam 1×24 jam di hari kerja. Anda akan mendapat notifikasi via email.",
  },
  {
    q: "Teknisi tidak kunjung datang?",
    a: "Hubungi CS segera atau buat laporan pengaduan di dashboard. Kami prioritaskan eskalasi ini.",
  },
  {
    q: "Cara reset password akun?",
    a: "Klik 'Lupa password' di halaman login. Instruksi reset akan dikirimkan ke email terdaftar Anda.",
  },
];
