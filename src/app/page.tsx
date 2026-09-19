import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Differentiation } from "@/components/sections/differentiation";
import { Portfolio } from "@/components/sections/portfolio";
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
        <Problem />
        <Solution />
        <Services />
        <Process />
        <Differentiation />
        <Portfolio />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
