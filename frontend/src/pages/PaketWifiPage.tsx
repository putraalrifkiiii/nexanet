import React from "react";
import PaketCard from "@/components/ui/PaketCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fetchPaketWifi } from "@/api/paketApi";
import { mapPaketToUI, type PaketUI } from "@/constants/paketMapper";

const PaketWifiPage = () => {
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
    <>
      <Navbar />
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24">
          <div className="uppercase tracking-widest mb-4 font-mono text-brand-muted text-[11px]">
            Paket Internet
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight font-display text-brand-dark">
            Pilih yang sesuai
            <br />
            kebutuhan Anda.
          </h1>
          <p className="text-sm leading-relaxed max-w-md mb-16 font-body text-brand-muted">
            Semua paket sudah termasuk fiber optik langsung ke rumah, tanpa
            batas kuota, dan dukungan teknis 24/7.
          </p>

          {isLoading && (
            <p className="text-sm font-body text-brand-muted">
              Memuat paket internet...
            </p>
          )}
          {error && !isLoading && (
            <p className="text-sm font-body text-brand-danger">{error}</p>
          )}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-15">
              {pkgs.map((pkg) => (
                <PaketCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaketWifiPage;
