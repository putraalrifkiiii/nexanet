import { z } from "zod";

export const pengaduanSchema = z.object({
  kategori_pengaduan: z.string().min(1, "Kategori pengaduan wajib diisi"),

  deskripsi_masalah: z.string().min(10, "Deskripsi minimal 10 karakter"),

  id_teknisi: z.number().int().positive().optional(),
});

export type PengaduanForm = z.infer<typeof pengaduanSchema>;
