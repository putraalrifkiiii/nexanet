export interface Pengguna {
  id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  //   email: string;
  //   password: string;
  langganan: Langganan[];
}

export interface Member {
  email: string;
  password: string;
}

export interface PaketWifi {
  id: number;
  nama_paket: string;
  slug: string;
  kecepatan_mbps: number;
  harga: number;
  deskripsi_paket: string;
}

export interface Langganan {
  id: number;
  pengguna: Pengguna;
  paket_wifi: PaketWifi;
  teknisi: Teknisi;
  tanggal_mulai: string;
  tanggal_berakhir: string;
  status_langganan: string;
  biaya_pemasangan: number;
}

export interface Pembayaran {
  id: number;
  pengguna: Pengguna;
  nomor_pembayaran: string;
  langganan: Langganan;
  tanggal_bayar: string;
  total_pembayaran: number;
  metode_pembayaran: string;
  bukti_pembayaran: string;
  status_pembayaran: string;
}

export interface PengaduanGangguan {
  id: number;
  pengguna: Pengguna;
  teknisi: Teknisi;
  kategori_pengaduan: string;
  tanggal_pengaduan: string;
  deskripsi_masalah: string;
  status_penanganan: string;
}

export interface Teknisi {
  id: number;
  nama_teknisi: string;
  no_telepon: string;
  status_ketersediaan: string;
}

export interface Admin {
  id: number;
  nama_admin: string;
  email: string;
  password: string;
  no_telepon: string;
}
