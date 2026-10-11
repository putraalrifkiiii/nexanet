import apiClient, { isAxiosError } from "@/api/apiService";

import type { Langganan, PaketWifi, Pembayaran } from "@/types/types";

export interface UploadPembayaranData {
  id_langganan: number;
  metode_pembayaran: string;
  bukti_pembayaran: File;
}

type ApiPembayaran = Partial<Pembayaran> & {
  langganan?: Partial<Langganan> & {
    id_langganan?: number;
    paket_wifi?: Partial<PaketWifi> & { id_paket?: number };
  };
};

function normalizePembayaran(item: ApiPembayaran): Pembayaran {
  const langganan = item.langganan;
  const paketWifi = langganan?.paket_wifi;

  return {
    ...item,
    langganan: {
      ...langganan,
      id: langganan?.id ?? langganan?.id_langganan,
      paket_wifi: {
        ...paketWifi,
        id: paketWifi?.id ?? paketWifi?.id_paket,
      },
    },
  } as Pembayaran;
}

export async function fetchPembayaran(): Promise<Pembayaran[]> {
  try {
    const response = await apiClient.get("/pembayaran");
    const result = response.data.data;

    const items = Array.isArray(result) ? result : (result.data ?? []);
    return (items as ApiPembayaran[]).map(normalizePembayaran);
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) return [];

      console.error(
        "Error saat mengambil pembayaran:",
        error.response?.data?.message ?? "Unknown error",
      );
    }

    throw error;
  }
}

export async function uploadBuktiPembayaran(
  data: UploadPembayaranData,
): Promise<Pembayaran> {
  const formData = new FormData();
  formData.append("id_langganan", String(data.id_langganan));
  formData.append("metode_pembayaran", data.metode_pembayaran);
  formData.append("bukti_pembayaran", data.bukti_pembayaran);

  const response = await apiClient.post("/pembayaran", formData);
  return normalizePembayaran(response.data.data);
}
