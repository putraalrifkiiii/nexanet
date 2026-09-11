import { z } from "zod";

export const pembayaranSchema = z.object({
  id_langganan: z.number().int().positive(),

  total_pembayaran: z.number().positive(),

  metode_pembayaran: z.string().min(1),

  bukti_pembayaran: z.string().min(1),
});

export type PembayaranForm = z.infer<typeof pembayaranSchema>;
