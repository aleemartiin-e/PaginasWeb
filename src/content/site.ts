/**
 * Fuente única de verdad para los datos de marca/contacto/legales.
 * Todo lo marcado como PLACEHOLDER debe sustituirse por el dato real
 * antes de publicar la web en producción.
 */
export const site = {
  name: "DelaCruz Agency",
  legalName: "DelaCruz Agency S.L.", // PLACEHOLDER: razón social
  tagline: "Llevamos tu negocio al mundo digital",
  description:
    "Agencia digital especializada en diseño web, e-commerce, SEO e inteligencia artificial para pymes y profesionales que quieren conseguir más clientes por internet.",
  url: "https://www.delacruzagency.com", // PLACEHOLDER: dominio real
  email: "hola@delacruzagency.com", // PLACEHOLDER
  phone: "+34 600 000 000", // PLACEHOLDER
  address: "Málaga, España", // PLACEHOLDER
  cif: "B00000000", // PLACEHOLDER
  social: {
    instagram: "https://instagram.com/delacruz.agency", // PLACEHOLDER
    linkedin: "https://linkedin.com/company/delacruz-agency", // PLACEHOLDER
  },
} as const;

export const nav = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
] as const;
