# DelaCruz Agency — Web de agencia digital

Web oficial de la agencia **DelaCruz Agency**, construida como base
reutilizable para futuras webs de clientes. Next.js 16 (App Router) +
TypeScript + Tailwind CSS v4 + Framer Motion.

## Requisitos

- Node.js 20+
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint |

## Estructura

```
src/
  app/            Rutas (App Router), layout raíz, SEO (sitemap, robots, OG image)
  components/
    ui/           Primitivos (Button, Badge, Input, Accordion...)
    layout/       Navbar, Footer
    sections/     Bloques de la Home (Hero, Servicios, FAQ, CTA final...)
    cards/        Tarjetas reutilizables (servicio, portfolio, testimonio)
    shared/       Container, SectionHeading, AnimatedReveal, JSON-LD...
  content/        Textos y datos (site.ts, services.ts, faq.ts...) — única fuente de verdad
  lib/            Utilidades (cn, validaciones zod)
```

Para crear la web de un cliente nuevo a partir de esta base: duplicar el
proyecto, sustituir `src/content/*.ts` y la paleta en `src/app/globals.css`.

## PLACEHOLDERS pendientes antes de publicar

Todos marcados con el comentario `// PLACEHOLDER` en el código:

- `src/content/site.ts`: nombre definitivo, razón social, CIF, dominio, email, teléfono, dirección, redes sociales.
- `src/app/privacidad`, `/cookies`, `/aviso-legal`: textos legales reales (RGPD/LSSI-CE).
- `src/content/portfolio.ts` y `src/content/testimonials.ts`: proyectos y testimonios reales.
- `src/app/api/contact/route.ts`: integrar envío real (email transaccional, CRM, Slack...). Ahora mismo solo registra el lead en el log del servidor.

## Despliegue (Vercel)

1. Sube el repositorio a GitHub.
2. Importa el proyecto en [vercel.com/new](https://vercel.com/new).
3. Vercel detecta Next.js automáticamente — no requiere configuración adicional.
4. Antes de publicar en producción: sustituir los placeholders anteriores y configurar el dominio definitivo en `site.url` (`src/content/site.ts`).
