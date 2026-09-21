import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Indica tu nombre completo."),
  email: z.email("Introduce un email válido."),
  phone: z.string().trim().optional(),
  partySize: z.enum(["1-2", "3-4", "5-8", "9+"]),
  message: z.string().trim().min(5, "Indica la fecha y hora en la que te gustaría venir."),
  // Honeypot: debe llegar vacío. Si tiene contenido, es un bot.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
