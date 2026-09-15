import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const BantuanPage = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
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

  return (
    <div>
      <Navbar />

      <div className="bg-white min-h-screen">
        <div className="py-24 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="uppercase tracking-widest mb-5 font-mono text-[rgba(255,255,255,0.15)] text-[11px]">
              Bantuan
            </div>
            <h1 className="text-5xl sm:text-6xl font-black font-display text-brand-white">
              Ada yang bisa
              <br />
              kami bantu?
            </h1>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 mb-16 border-y border-brand-border">
            {[
              ["Telepon", "(021) 1500-6392", "Senin–Minggu, 08.00–22.00 WIB"],
              ["Email", "cs@nexanet.id", "Balas dalam 1×24 jam kerja"],
              ["WhatsApp", "0812-NEXA-1234", "Chat langsung dengan CS kami"],
            ].map(([label, val, sub]) => (
              <div
                key={label}
                className="py-8 pr-8 mr-8 last:border-0 last:pr-0 last:mr-0 border-r border-brand-border last:border-none"
              >
                <div className="uppercase tracking-widest mb-2 font-mono text-brand-muted text-[10px]">
                  {label}
                </div>
                <div className="font-bold text-lg mb-1 font-display text-brand-dark">
                  {val}
                </div>
                <div className="text-xs font-body text-brand-muted">{sub}</div>
              </div>
            ))}
          </div>
          <div className="uppercase tracking-widest mb-8 font-mono text-brand-muted text-[10px]">
            Pertanyaan Umum
          </div>
          <div className="border-t border-brand-border">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-brand-border">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-8"
                >
                  <span className="font-semibold text-sm font-display text-brand-dark">
                    {f.q}
                  </span>
                  <span className="font-mono text-brand-muted text-[20px] shrink-0">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && (
                  <div className="text-sm leading-relaxed pb-5 font-body text-brand-muted ">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BantuanPage;
