import type { PaketWifi } from "@/types/types";

// Interface gabungan untuk kebutuhan tampilan kartu UI
export interface PaketUI extends PaketWifi {
  fitur: string[];
  top?: boolean;
}

export function mapPaketToUI(dataApi: PaketWifi[]): PaketUI[] {
  return dataApi.map((pkg) => {
    // Generate fitur berdasarkan kecepatan atau slug dari database
    const fiturDefault = [
      `${pkg.kecepatan_mbps} Mbps unduh & unggah`,
      "Kuota tidak terbatas",
      "Dukungan teknis 24/7",
    ];

    if (pkg.kecepatan_mbps >= 30) {
      fiturDefault.push("Router WiFi 6 termasuk");
    } else {
      fiturDefault.push("Router WiFi 5 termasuk");
    }

    return {
      ...pkg,
      fitur: fiturDefault,
      top: pkg.slug === "home" || pkg.kecepatan_mbps === 20, // Contoh penanda paket populer
    };
  });
}
