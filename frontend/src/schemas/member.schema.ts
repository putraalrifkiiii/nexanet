import { z } from "zod";

export const memberSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),

  password: z.string().min(8, "Password minimal 8 karakter"),
});

export type Member = z.infer<typeof memberSchema>;
