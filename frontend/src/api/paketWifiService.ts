import type { PaketWifi } from "@/types/types";
import apiClient, { isAxiosError } from "@/api/apiService";

/**
 * Mengambil daftar seluruh paket WiFi dari endpoint backend.
 * @returns Promise yang berisi array data PaketWifi
 */
export async function fetchPaketWifi(): Promise<PaketWifi[]> {
  try {
    const response = await apiClient.get("/paket-wifi");

    const result = response.data.data;

    return result.data || result;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Error saat fetching paket WiFi:",
        (error.response?.data as { message?: string } | undefined)?.message ??
          "Unknown error",
      );
    } else {
      console.error("Error tidak dikenal:", error);
    }

    throw error;
  }
}

export async function fetchPaketWifiBySlug(slug: string): Promise<PaketWifi> {
  const paketWifi = await fetchPaketWifi();
  const paket = paketWifi.find((item) => item.slug === slug);

  if (!paket) {
    throw new Error("Paket WiFi tidak ditemukan");
  }

  return paket;
}
