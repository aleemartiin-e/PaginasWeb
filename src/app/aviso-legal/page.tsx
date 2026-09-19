import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: `Aviso legal de ${site.name}.`,
  robots: { index: false, follow: true },
};

export default function LegalNoticePage() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        <strong>PLACEHOLDER.</strong> Este texto debe sustituirse por el aviso
        legal real conforme a la LSSI-CE antes de publicar la web en producción.
      </p>
      <p>
        Debe incluir: denominación social ({site.legalName}), PLACEHOLDER de
        CIF/NIF, domicilio social, datos de inscripción registral (si aplica) y
        datos de contacto ({site.email}).
      </p>
    </LegalPage>
  );
}
