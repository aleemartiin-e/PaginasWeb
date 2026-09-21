/**
 * Fuente única de verdad para los datos de marca/contacto/legales.
 * Todo lo marcado como PLACEHOLDER debe sustituirse por el dato real
 * antes de publicar la web en producción.
 */
export const site = {
  name: "Bruno's Grill Nerja",
  legalName: "Bruno's Grill Nerja S.L.", // PLACEHOLDER: razón social real
  tagline: "Grill & Cocktail Bar en el corazón de Nerja",
  description:
    "Carnes y pescados a la brasa, hamburguesas gourmet y cócteles de autor en pleno centro de Nerja. Terraza, ambiente familiar y producto fresco cada día.",
  url: "https://www.brunosgrillnerja.com", // PLACEHOLDER: dominio real
  email: "info@brunosgrillnerja.com", // PLACEHOLDER
  phone: "+34 600 000 000", // PLACEHOLDER
  whatsapp: "+34 600 000 000", // PLACEHOLDER
  address: "Nerja, Málaga, España", // PLACEHOLDER: dirección exacta
  cif: "B00000000", // PLACEHOLDER
  priceRange: "€€",
  cuisine: "Grill, cocina mediterránea, cócteles",
  hours: "Todos los días, 13:00–00:00", // PLACEHOLDER: horario real
  social: {
    facebook: "https://www.facebook.com/BrunosGrillNerja", // PLACEHOLDER: URL real de Facebook
    instagram: "https://instagram.com/brunosgrillnerja", // PLACEHOLDER: URL real de Instagram
  },
} as const;

export const nav = [
  { label: "La carta", href: "#carta" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Galería", href: "#galeria" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Reservas", href: "#reservas" },
] as const;
