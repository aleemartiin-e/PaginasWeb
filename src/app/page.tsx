import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Menu } from "@/components/sections/menu";
import { Info } from "@/components/sections/info";
import { Differentiation } from "@/components/sections/differentiation";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { OrganizationJsonLd, FaqJsonLd } from "@/components/shared/json-ld";

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <FaqJsonLd />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Menu />
        <Info />
        <Differentiation />
        <Gallery />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
