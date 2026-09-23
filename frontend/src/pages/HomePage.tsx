import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeatureSection from "@/components/sections/FeatureSection";
import { PaketCard } from "@/components/paket-wifi";
import { useState, useEffect } from "react";
import { mapPaketToUI, type PaketUI } from "@/constants/paketMapper";
import { fetchPaketWifi } from "@/api/paketApi";
import FaqItem from "@/components/ui/FaqItem";

const HomePage = () => {
  const [pkgs, setPkgs] = useState<PaketUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaketWifi() {
      try {
        const dataApi = await fetchPaketWifi();
        setPkgs(mapPaketToUI(dataApi));
      } catch {
        setError("Paket internet belum dapat dimuat bro.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPaketWifi();
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <div className="bg-brand-offwhite h-fit ">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[11px]">
            Paket Internet
          </div>
          <div className="flex flex-col sm:flex-row  justify-between mb-10 items-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight font-display text-brand-dark">
              Pilih Kecepatanmu.
            </h1>
            <h1 className="text-sm font-body text-brand-blue hover:underline cursor-pointer mt-2">
              Bandingkan semua paket →
            </h1>
          </div>

          {isLoading && (
            <p className="text-sm font-body text-brand-muted">
              Memuat paket internet...
            </p>
          )}
          {error && !isLoading && (
            <p className="text-sm font-body text-brand-danger">{error}</p>
          )}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
              {pkgs.map((pkg) => (
                <PaketCard key={pkg.id} pkg={pkg} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
        <FaqItem title="FAQ" subtitle="Pertanyaan Umum." />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
