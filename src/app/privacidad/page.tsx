import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: `Política de privacidad de ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        <strong>PLACEHOLDER.</strong> Este texto debe sustituirse por la política
        de privacidad real, redactada conforme al RGPD y la LOPDGDD, antes de
        publicar la web en producción.
      </p>
      <p>
        Debe incluir, como mínimo: responsable del tratamiento ({site.legalName},
        PLACEHOLDER de CIF/NIF y dirección), finalidad del tratamiento de datos,
        legitimación, plazo de conservación, derechos de acceso/rectificación/
        supresión/oposición y forma de ejercerlos, y si se ceden datos a terceros.
      </p>
    </LegalPage>
  );
}
