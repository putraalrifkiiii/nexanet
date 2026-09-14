import type { PaketWifi } from "@/types/types";

/**
 * Mengambil daftar seluruh paket WiFi dari endpoint backend.
 * @returns Promise yang berisi array data PaketWifi
 */
export async function fetchPaketWifi(): Promise<PaketWifi[]> {
  try {
    const API_URL = "https://nexanet-backend.onrender.com/api/paket-wifi";

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }

    const result = await response.json();

    return result.data || result;
  } catch (error) {
    console.error("Error saat fetching paket WiFi:", error);
    throw error;
  }
}
