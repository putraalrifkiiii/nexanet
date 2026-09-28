import type { PaketWifi } from "@/types/types";
import axios from "axios";

/**
 * Mengambil daftar seluruh paket WiFi dari endpoint backend.
 * @returns Promise yang berisi array data PaketWifi
 */
export async function fetchPaketWifi(): Promise<PaketWifi[]> {
  try {
    const API_URL = "http://127.0.0.1:8000/api/paket-wifi";

    const response = await axios(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = response.data;

    return result.data || result;
  } catch (error) {
    console.error("Error saat fetching paket WiFi:", error);
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
