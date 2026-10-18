import apiClient from "@/api/apiService";
import type { PengaduanGangguan, CreatePengaduanData } from "@/types/types";

export async function fetchPengaduan(): Promise<PengaduanGangguan[]> {
  const response = await apiClient.get<{ data?: PengaduanGangguan[] }>("/pengaduan");
  return response.data.data ?? [];
}

export async function createPengaduan(
  data: CreatePengaduanData | FormData,
): Promise<PengaduanGangguan> {
  let payload: FormData;

  if (data instanceof FormData) {
    payload = data;
  } else {
    payload = new FormData();
    payload.append("email", data.email);
    payload.append("kategori_pengaduan", data.kategori_pengaduan);
    payload.append("deskripsi_masalah", data.deskripsi_masalah);
    if (data.foto_kendala) {
      payload.append("foto_kendala", data.foto_kendala);
    }
  }

  const response = await apiClient.post<{ data: PengaduanGangguan }>(
    "/pengaduan",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data.data;
}

export async function fetchPengaduanDetail(
  id: number | string,
): Promise<PengaduanGangguan> {
  const response = await apiClient.get<{ data: PengaduanGangguan }>(
    `/pengaduan/${id}`,
  );
  return response.data.data;
}
