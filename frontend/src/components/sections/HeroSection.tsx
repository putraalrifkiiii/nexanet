import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import { HERO_BADGE } from "@/constants/badgeData";

const HeroSection = () => {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-3 ">
              <Badge {...HERO_BADGE} />

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 tracking-tight font-display text-white leading-[1.04]">
                Internet
                <br />
                <span className="text-brand-blue">tanpa</span>
                <br />
                kompromi.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed max-w-md mb-10 font-body text-[rgba(255,255,255,0.45)]">
                Fiber optik berkecepatan tinggi dengan uptime 99,9%. Untuk
                streaming, gaming, bekerja dari rumah — tanpa terganggu.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
                <Button
                  to="/paket-wifi"
                  variant="primary"
                  size="lg"
                  className="lg:py-8"
                >
                  Lihat Paket Internet
                </Button>

                <Button
                  to="/daftar"
                  variant="outline"
                  size="lg"
                  className="lg:h-fit"
                >
                  Berlangganan Sekarang
                </Button>
              </div>
            </div>

            {/* Metrics panel */}
            <div className="lg:col-span-2">
              <StatCard />
            </div>
          </div>
          <div className="text-center text-white"></div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
