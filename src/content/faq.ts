import { site } from "@/content/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "¿Necesito reservar mesa?",
    answer:
      "Recomendamos reservar, sobre todo en fin de semana y temporada alta, para asegurarte mesa. Puedes hacerlo desde el formulario de esta web o llamando directamente.",
  },
  {
    question: "¿Cuál es el horario del restaurante?",
    answer: `Abrimos ${site.hours}. El horario puede variar en días señalados; te recomendamos confirmarlo por teléfono si vienes en una fecha especial.`,
  },
  {
    question: "¿Tenéis terraza?",
    answer:
      "Sí, contamos con una zona techada y una terraza exterior en pleno centro de Nerja, ideal para comer o cenar al aire libre.",
  },
  {
    question: "¿Tenéis opciones vegetarianas?",
    answer:
      "Sí, nuestra carta incluye verduras a la brasa, guarniciones caseras y otras opciones sin carne. Consulta con el equipo en sala si tienes alguna alergia o intolerancia.",
  },
  {
    question: "¿Podemos venir en grupo o celebrar un evento?",
    answer:
      "Sí, adaptamos mesas y menús para grupos y celebraciones. Escríbenos con antelación indicando el número de personas y la fecha.",
  },
  {
    question: "¿Admitís animales?",
    answer:
      "Sí, son bienvenidos en la terraza. Consúltanos si tienes alguna necesidad especial al reservar.",
  },
  {
    question: "¿Dónde estáis ubicados?",
    answer: `Estamos en ${site.address}, a pocos minutos a pie del Balcón de Europa.`,
  },
  {
    question: "¿Hacéis comida para llevar?",
    answer:
      "Sí, puedes hacer tu pedido para llevar por teléfono o WhatsApp con la antelación necesaria según el plato.",
  },
];
