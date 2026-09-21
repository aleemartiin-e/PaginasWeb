import { menuCategories } from "@/content/menu";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { MenuCard } from "@/components/cards/menu-card";

export function Menu() {
  return (
    <section id="carta" className="border-t border-border bg-background py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="La carta"
          title="Lo que no te puedes perder"
          align="center"
          description="Un adelanto de nuestra carta: brasa, producto fresco y coctelería, pensados para compartir."
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((item, index) => (
            <MenuCard key={item.id} item={item} delay={index * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
