export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Analizamos",
    description:
      "Estudiamos tu negocio, tu competencia y tu público objetivo antes de proponer nada.",
  },
  {
    number: "02",
    title: "Diseñamos",
    description:
      "Creamos una propuesta visual y de contenido alineada con tus objetivos comerciales.",
  },
  {
    number: "03",
    title: "Construimos",
    description:
      "Desarrollamos la web con tecnología moderna, rápida y fácil de mantener.",
  },
  {
    number: "04",
    title: "Optimizamos",
    description:
      "Ajustamos SEO, rendimiento y experiencia de usuario antes del lanzamiento.",
  },
  {
    number: "05",
    title: "Lanzamos",
    description:
      "Publicamos la web y comprobamos que todo funciona correctamente en producción.",
  },
  {
    number: "06",
    title: "Mejoramos",
    description:
      "Analizamos datos reales de uso y proponemos mejoras continuas basadas en resultados.",
  },
];
