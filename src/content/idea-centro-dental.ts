/**
 * Fuente única de verdad para la página de Idea Centro Dental (Algarrobo).
 * Datos extraídos de la ficha del negocio; sustituir por datos verificados
 * directamente con la clínica antes de publicar en producción.
 */
export const clinic = {
  name: "Idea Centro Dental",
  tagline: "Cuidando tu sonrisa en Algarrobo desde 2015",
  description: [
    "Trabajando en tu sonrisa desde 2015. Nos encantan las sonrisas naturales y poco artificiales, y buscamos resaltar la personalidad de cada paciente.",
    "Nos esforzamos cada día en cuidar la sonrisa de nuestros pacientes y en que pierdan la aprensión a acudir al dentista, charlando con ellos y dando consejos para que en su día a día puedan mejorar su salud dental.",
  ],
  address: {
    line: "Avda. de Andalucía, Urb. Pueblo Nuevo, Edif. Montevideo, Local 7",
    postalCode: "29750",
    city: "Algarrobo",
    region: "Málaga",
    country: "España",
    full: "Avda. de Andalucía, Urb. Pueblo Nuevo, Edif. Montevideo, Local 7, 29750 Algarrobo (Málaga)",
    mapsQuery: "Idea Centro Dental, Avda de Andalucía, Urb Pueblo Nuevo Edif Montevideo Local 7, 29750 Algarrobo, Málaga",
  },
  phone: "+34 697 71 44 88",
  phoneHref: "+34697714488",
  whatsappHref: "34697714488",
  email: "info@ideacentrodental.com",
  photo: "/idea-centro-dental/equipo.png",
  hours: [
    { day: "Lunes", ranges: ["10:00 – 14:00", "15:00 – 18:30"] },
    { day: "Martes", ranges: ["10:00 – 14:00", "15:00 – 18:30"] },
    { day: "Miércoles", ranges: ["10:00 – 14:00", "15:00 – 18:30"] },
    { day: "Jueves", ranges: ["10:00 – 14:00", "15:00 – 18:30"] },
    { day: "Viernes", ranges: ["10:00 – 14:00"] },
    { day: "Sábado", ranges: [] },
    { day: "Domingo", ranges: [] },
  ],
  highlights: [
    { label: "Desde 2015", detail: "cuidando sonrisas en Algarrobo" },
    { label: "5.0 en Google", detail: "valorado por nuestros pacientes" },
    { label: "Trato cercano", detail: "sin miedo a ir al dentista" },
    { label: "Precios ajustados", detail: "presupuesto claro desde el inicio" },
  ],
  testimonial: {
    author: "José Miguel Valverde",
    source: "Reseña de Google",
    rating: 5,
    quote:
      "El mejor centro dental en el que he estado, muy delicado y profesional, parece mentira que haya dentistas así. Además, el trato con el paciente es muy cercano y agradable, así se pierde el miedo a ir al dentista. Y los precios muy ajustados. Se nota que está formado por un gran equipo profesional.",
  },
  googleReviewsUrl: "https://www.google.com/search?q=Idea+Centro+Dental+Algarrobo+opiniones",
} as const;

export const dentalNav = [
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Horario", href: "#horario" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Ubicación", href: "#ubicacion" },
] as const;
