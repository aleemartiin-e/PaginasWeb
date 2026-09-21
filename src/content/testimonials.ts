export type Testimonial = {
  id: string;
  author: string;
  role: string;
  quote: string;
  isPlaceholder: true;
};

/**
 * PLACEHOLDER — no son opiniones reales.
 * Sustituir por reseñas reales (Google, Facebook, TripAdvisor) en cuanto
 * se recopilen, idealmente con el permiso de cada cliente.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    author: "Nombre del cliente",
    role: "Reseña de Google",
    quote: "Aquí aparecerá la opinión real de un cliente sobre su visita.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    author: "Nombre del cliente",
    role: "Reseña de Facebook",
    quote: "Aquí aparecerá la opinión real de un cliente sobre su visita.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    author: "Nombre del cliente",
    role: "Reseña de TripAdvisor",
    quote: "Aquí aparecerá la opinión real de un cliente sobre su visita.",
    isPlaceholder: true,
  },
];
