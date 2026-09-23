(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Vélez Topografía",
    legalName: "Álvaro Manén Ranea — Ingeniero Técnico en Topografía",
    tagline: "PER GEOMETRIAM VERITAS",
    taglineEs: "A través de la geometría, la verdad.",
    phone: "+34 691 35 25 26",
    phoneHref: "tel:+34691352526",
    whatsappHref: "https://wa.me/34691352526?text=" + encodeURIComponent("Hola, necesito información sobre un trabajo topográfico."),
    email: "info@veleztopografia.com",
    address: "C/ Banana, 27, 29700 Vélez-Málaga (Málaga)",
    colegiado: "Colegiado nº 7866 · COITT",
    areaServed: ["Vélez-Málaga", "Torre del Mar", "Algarrobo", "Nerja", "Rincón de la Victoria", "Málaga capital", "Axarquía", "Provincia de Málaga"],

    stats: [
      { value: "7866", label: "Nº de colegiado COITT", suffix: "" },
      { value: "±5", label: "mm de precisión con GNSS RTK", suffix: "mm" },
      { value: "100", label: "% de la provincia de Málaga cubierta", suffix: "%" },
      { value: "24", label: "h de respuesta media a cada consulta", suffix: "h" }
    ],

    services: [
      {
        num: "01",
        title: "Levantamientos topográficos",
        desc: "Planimetría y altimetría de parcelas, solares y fincas con estación total y GNSS de doble frecuencia. Base fiable para proyectos de arquitectura, ingeniería y compraventa de terrenos.",
        tags: ["Estación total", "GNSS RTK", "Nube de puntos"]
      },
      {
        num: "02",
        title: "Certificados y coordinación catastral",
        desc: "Informes de validación gráfica alternativa (IVGA), coordinación Catastro-Registro y deslindes de parcela. Documentación técnica lista para trámite administrativo.",
        tags: ["IVGA", "Catastro", "Deslindes"]
      },
      {
        num: "03",
        title: "Replanteos y control de obra",
        desc: "Replanteo de ejes, cimentación y rasantes; control topográfico del movimiento de tierras durante la ejecución de obra civil y edificación.",
        tags: ["Replanteo", "Control de obra", "Movimiento de tierras"]
      },
      {
        num: "04",
        title: "Cartografía y GIS",
        desc: "Planos digitales, modelos digitales del terreno (MDT), perfiles longitudinales y transversales, y gestión de datos geoespaciales para proyectos técnicos.",
        tags: ["MDT", "Perfiles", "CAD"]
      },
      {
        num: "05",
        title: "Vuelos con dron y fotogrametría",
        desc: "Ortofotos, nubes de puntos densas y cubicación de volúmenes mediante fotogrametría aérea. Inspección de grandes superficies en una sola jornada de campo.",
        tags: ["Ortofoto", "Fotogrametría", "Cubicaciones"]
      }
    ],

    process: [
      { num: "01", title: "Contacto y diagnóstico", desc: "Nos cuentas qué necesitas: ubicación, tipo de parcela, plazos y para qué trámite es el trabajo." },
      { num: "02", title: "Trabajo de campo", desc: "Medición in situ con estación total, GNSS o dron, según la superficie y precisión requerida." },
      { num: "03", title: "Procesado en gabinete", desc: "Cálculo de coordenadas, dibujo en CAD y control de calidad de cada dato antes de cerrar el plano." },
      { num: "04", title: "Entrega", desc: "Planos, informes y documentación técnica lista para tu proyecto, tu arquitecto o la administración." }
    ],

    faqs: [
      {
        q: "¿Cuánto tarda un levantamiento topográfico?",
        a: "Depende de la superficie y el terreno, pero la mayoría de parcelas urbanas se miden en campo en una sola jornada. El plano final, con el gabinete ya procesado, suele entregarse entre 3 y 7 días laborables."
      },
      {
        q: "¿Trabajáis fuera de Vélez-Málaga?",
        a: "Sí. Cubrimos toda la provincia de Málaga: Axarquía, Costa del Sol y Málaga capital. Para trabajos más alejados, consulta disponibilidad y desplazamiento sin compromiso."
      },
      {
        q: "¿Necesito estar presente durante la medición?",
        a: "No es imprescindible, pero sí recomendable si hay dudas sobre linderos o accesos. Si no puedes acudir, coordinamos la visita con quien tenga las llaves o el acceso a la parcela."
      },
      {
        q: "¿Entregáis los planos en formato digital?",
        a: "Sí, en DWG/DXF para tu técnico y en PDF para trámite o consulta. También podemos entregar la nube de puntos completa cuando el trabajo se realiza con dron o escáner."
      },
      {
        q: "¿Hacéis certificados para el Catastro?",
        a: "Sí. Elaboramos informes de validación gráfica alternativa (IVGA) y coordinamos la actualización catastral de tu parcela con la documentación técnica necesaria."
      }
    ],

    contactReasons: [
      "Levantamiento topográfico",
      "Certificado catastral",
      "Replanteo / control de obra",
      "Cartografía y GIS",
      "Vuelo con dron",
      "Otro / no lo sé todavía"
    ]
  };
})();
