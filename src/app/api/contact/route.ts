import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos del formulario inválidos.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  if (parsed.data.company_website) {
    // Honeypot relleno: tratamos como spam sin exponer el motivo al bot.
    return NextResponse.json({ success: true });
  }

  // PLACEHOLDER: aquí se debe integrar el envío real (email transaccional,
  // CRM, WhatsApp Business, etc.). De momento se registra en el log del servidor.
  const { name, email, phone, partySize, message } = parsed.data;
  console.log("[reservas] Nueva solicitud de reserva:", { name, email, phone, partySize, message });

  return NextResponse.json({ success: true });
}
