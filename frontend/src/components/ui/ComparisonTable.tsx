import { useEffect, useState } from "react";
import { fetchPaketWifi } from "@/api/paketApi";
import { mapPaketToUI, type PaketUI } from "@/constants/paketMapper";

const idr = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

function ComparisonTable() {
  const [pkgs, setPkgs] = useState<PaketUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaketWifi() {
      try {
        const dataApi = await fetchPaketWifi();
        setPkgs(mapPaketToUI(dataApi));
      } catch {
        setError("Paket internet belum dapat dimuat.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadPaketWifi();
  }, []);

  if (isLoading) {
    return (
      <p className="text-sm font-body text-brand-muted">
        Memuat perbandingan paket...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm font-body text-brand-danger">{error}</p>;
  }

  const rows = [
    ["Kecepatan", ...pkgs.map((pkg) => `${pkg.kecepatan_mbps} Mbps`)],
    ["Harga/bulan", ...pkgs.map((pkg) => idr(pkg.harga))],
    [
      "Biaya pasang",
      ...pkgs.map((pkg) =>
        pkg.biaya_pemasangan === 0 ? "Gratis" : idr(pkg.biaya_pemasangan),
      ),
    ],
    ["Tanpa batas kuota", ...pkgs.map(() => "Ya")],
    ["Support 24/7", ...pkgs.map(() => "Ya")],
    [
      "Router WiFi 6",
      ...pkgs.map((pkg) =>
        pkg.fitur.includes("Router WiFi 6 termasuk") ? "Ya" : "—",
      ),
    ],
    ["IP Statis", ...pkgs.map(() => "—")],
  ];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-2 sm:pb-24">
      <div className="uppercase tracking-widest pb-4 font-mono text-brand-muted text-[11px] border-b border-brand-border ">
        Perbandingan Detail
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="py-4 pr-8 font-normal text-xs font-body text-brand-muted text-left">
                Fitur
              </th>
              {pkgs.map((pkg) => (
                <th
                  key={pkg.id}
                  className={`py-4 px-4 font-bold text-sm text-center font-display ${pkg.top ? "text-brand-blue" : "text-brand-dark"}`}
                >
                  {pkg.kecepatan_mbps} Mbps
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-brand-border">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`py-3.5 ${j === 0 ? "pr-8 text-left font-body text-brand-muted" : "px-4 text-center font-mono text-brand-dark"} ${cell === "—" ? "text-gray-300" : ""} text-xs`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonTable;
