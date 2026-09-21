import { galleryItems } from "@/content/gallery";
import { site } from "@/content/site";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { GalleryCard } from "@/components/cards/gallery-card";

export function Gallery() {
  return (
    <section id="galeria" className="border-t border-border bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Galería"
          title="Un adelanto de lo que te espera"
          description={`Mientras completamos la galería con fotografía propia, puedes ver más imágenes reales en nuestro ${site.social.instagram ? "Instagram" : "Facebook"}.`}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <GalleryCard key={item.id} item={item} delay={index * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
