import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Título muito curto."),
  slug: z
    .string()
    .min(2, "Slug muito curto.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens."),
  tagline: z.string().min(2, "Tagline muito curta."),
  description: z.string().min(10, "Descrição muito curta."),
  longDescription: z.string().min(1).optional(),
  stack: z.array(z.string().min(1)).default([]),
  githubUrl: z.string().url("URL do GitHub inválida.").optional(),
  demoUrl: z.string().url("URL do demo inválida.").optional(),
  coverImage: z.string().url("URL da imagem inválida.").optional(),
  order: z.number().int().default(0),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  featured: z.boolean().default(false),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
