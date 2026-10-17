export interface Pengguna {
  id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
  //   password: string;
  langganan: Langganan[];
}

export interface RegisterData {
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface DashboardData {
  pengguna: Pengguna;
  langganan: Langganan | null;
  pembayaran: Pembayaran | null;
  teknisi: Teknisi | null;
}

export interface LanggananData {
  id: number;
  tanggal_mulai: string | null;
  tanggal_berakhir: string | null;
  status_langganan: string;
  biaya_pemasangan: number | null;
  paket_wifi: PaketWifi | null;
  teknisi: TeknisiLangganan | null;
  pembayaran: PembayaranLangganan | null;
}

export interface PembayaranLangganan {
  id_pembayaran: number;
  nomor_pembayaran: string;
  jumlah_pembayaran: number;
  metode_pembayaran: string;
  bukti_pembayaran: string | null;
  status_pembayaran: string;
  tanggal_pembayaran: string | null;
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
  biaya_pemasangan: number;
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
  tanggal_bayar: string | null;
  metode_pembayaran: string;
  bukti_pembayaran: string | null;
  status_pembayaran: string;
  total_pembayaran: number;
}

export interface PengaduanGangguan {
  id: number;
  kode_pengaduan: string;
  pengguna: Pengguna;
  teknisi?: Teknisi | null;
  kategori_pengaduan: string;
  tanggal_pengaduan: string;
  deskripsi_masalah: string;
  foto_kendala?: string | null;
  status_penanganan: string;
}

export interface CreatePengaduanData {
  email: string;
  kategori_pengaduan: string;
  deskripsi_masalah: string;
  foto_kendala?: File | null;
}


export interface TeknisiLangganan {
  id_teknisi: number;
  nama_teknisi: string;
  no_telepon: string;
  status_ketersediaan: string;
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

export interface UpdateProfile {
  nama: string;
  alamat: string;
  no_telepon: string;
  email: string;
}
