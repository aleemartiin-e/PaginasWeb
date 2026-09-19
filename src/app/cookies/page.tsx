import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: `Política de cookies de ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        <strong>PLACEHOLDER.</strong> Este texto debe sustituirse por la política
        de cookies real antes de publicar la web en producción, detallando qué
        cookies propias y de terceros se utilizan (analíticas, técnicas,
        publicitarias), su finalidad y cómo aceptarlas o rechazarlas.
      </p>
      <p>
        Si en el futuro se incorpora un gestor de consentimiento (CMP), debe
        documentarse aquí y reflejarse en el banner de cookies correspondiente.
      </p>
    </LegalPage>
  );
}
