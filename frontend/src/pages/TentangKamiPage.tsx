import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HERO_STATS } from "@/constants/heroStats";

const TentangKamiPage = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="py-24 bg-brand-dark">
          <div className="max-w-5xl mx-auto px-5 sm:px-8  ">
            <div className="uppercase tracking-widest mb-5 font-mono text-[rgba(255,255,255,0.43)] text-[11px]">
              Tentang NexaNet
            </div>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight max-w-xl font-display text-brand-white">
              Menghubungkan
              <br />
              Indonesia sejak 2015.
            </h1>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-2xl font-black mb-5 font-display text-brand-dark">
                Misi kami
              </h2>
              <p className="text-sm leading-relaxed font-body text-brand-muted">
                NexaNet percaya bahwa akses internet berkualitas adalah hak
                setiap orang, bukan kemewahan. Kami membangun infrastruktur
                fiber optik dari nol, kota per kota, untuk memastikan koneksi
                yang stabil dan terjangkau tersedia di seluruh penjuru
                Indonesia.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=450&fit=crop&auto=format"
              alt="Tim NexaNet bekerja"
              className="w-full rounded-xl object-cover h-64 bg-gray-100 border shadow-lg"
            />
          </div>
          <div className="border-t border-brand-border">
            {HERO_STATS.map((stat, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-8 border-b border-brand-border last:border-none"
              >
                <div>
                  <div className="font-semibold text-sm font-body text-brand-dark">
                    {stat.label}
                  </div>
                  <div className="text-xs mt-0.5 font-body text-brand-muted">
                    {stat.sub}
                  </div>
                </div>
                <div className="text-4xl font-black font-display text-brand-dark">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TentangKamiPage;
