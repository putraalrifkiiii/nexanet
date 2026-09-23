import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqItem from "@/components/ui/FaqItem";

const BantuanPage = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="py-24 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-5 sm:px-8">
            <div className="uppercase tracking-widest mb-5 font-mono text-[rgba(255,255,255,0.47)] text-[11px]">
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
              ["WhatsApp", "0812-5678-1234", "Chat langsung dengan CS kami"],
            ].map(([label, val, sub]) => (
              <div
                key={label}
                className="py-8 pr-8 mr-8 last:pr-0 last:mr-0 border-r border-brand-border last:border-none"
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
          <FaqItem title="Pertanyaan Umum" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BantuanPage;
