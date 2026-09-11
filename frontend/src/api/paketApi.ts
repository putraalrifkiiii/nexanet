import type { PaketWifi } from "@/types/types";

/**
 * Mengambil daftar seluruh paket WiFi dari endpoint backend.
 * @returns Promise yang berisi array data PaketWifi
 */
export async function fetchPaketWifi(): Promise<PaketWifi[]> {
  try {
    const API_URL = "http://localhost:8000/api/paket-wifi";

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Tambahkan header lain jika backend butuh token (misal: Authorization)
      },
    });

    if (!response.ok) {
      throw new Error(`Gagal mengambil data: ${response.statusText}`);
    }

    const result = await response.json();

    // Sesuaikan dengan struktur JSON yang dikirim oleh backend kamu.
    // Contoh: jika backend membungkus datanya di dalam key { success: true, data: [...] }
    return result.data || result;
  } catch (error) {
    console.error("Error saat fetching paket WiFi:", error);
    // Kembalikan array kosong atau lempar error tergantung kebutuhan penanganan error di UI
    throw error;
  }
}
