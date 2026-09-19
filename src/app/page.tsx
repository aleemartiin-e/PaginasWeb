import { getClientConfig } from "@/lib/getClientConfig";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Benefits } from "@/components/sections/Benefits";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const { theme, content } = getClientConfig();

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: () => <Hero key="hero" hero={content.hero} />,
    benefits: () => content.benefits && <Benefits key="benefits" benefits={content.benefits} />,
    services: () => content.services && <Services key="services" services={content.services} />,
    testimonials: () =>
      content.testimonials && <Testimonials key="testimonials" testimonials={content.testimonials} />,
    pricing: () => content.pricing && <Pricing key="pricing" pricing={content.pricing} />,
    faq: () => content.faq && <Faq key="faq" faq={content.faq} />,
    cta: () => <Cta key="cta" cta={content.cta} />,
  };

  return (
    <>
      <Header theme={theme} content={content} />
      <main className="flex-1">
        {content.sections.filter((s) => s !== "footer").map((section) => sectionRenderers[section]?.())}
      </main>
      <Footer footer={content.footer} />
    </>
  );
}
