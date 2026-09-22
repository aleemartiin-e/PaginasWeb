import { clinic } from "@/content/idea-centro-dental";

const DAY_MAP: Record<string, string> = {
  Lunes: "Monday",
  Martes: "Tuesday",
  Miércoles: "Wednesday",
  Jueves: "Thursday",
  Viernes: "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday",
};

export function DentistJsonLd() {
  const openingHoursSpecification = clinic.hours
    .filter((entry) => entry.ranges.length > 0)
    .flatMap((entry) =>
      entry.ranges.map((range) => {
        const [opens, closes] = range.split("–").map((s) => s.trim());
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: DAY_MAP[entry.day],
          opens,
          closes,
        };
      })
    );

  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    description: clinic.description.join(" "),
    telephone: clinic.phone,
    email: clinic.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address.line,
      postalCode: clinic.address.postalCode,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      addressCountry: "ES",
    },
    openingHoursSpecification,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.testimonial.rating,
      reviewCount: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
