# CLAUDE.md

Guía de este repositorio para trabajar con Claude Code (o cualquier desarrollador nuevo).

## Qué es esto

`agency-landing-starter` es la base reutilizable de landing pages de la agencia. **No es la landing de un cliente concreto** — es una librería de secciones + un sistema de configuración por cliente (tema + contenido), pensada para lanzar una landing nueva cambiando solo dos archivos JSON, sin tocar componentes.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Lenguaje | TypeScript (strict) |
| Estilos | Tailwind CSS v4 (config CSS-first, sin `tailwind.config.js`) |
| Fuentes | `next/font/google` (Geist por defecto) |
| Lint | ESLint (`eslint-config-next`) |

## Arquitectura: una landing, N clientes

```
agency-landing-starter/
├── clients/
│   ├── _template/          ← plantilla de referencia, no borrar
│   │   ├── theme.json      ← colores, tipografía, logo, radio de bordes
│   │   └── content.json    ← textos, enlaces, secciones activas y su orden
│   └── <cliente>/          ← una carpeta por cliente real
├── src/
│   ├── app/
│   │   ├── layout.tsx      ← inyecta el theme como variables CSS + metadata SEO
│   │   ├── page.tsx        ← compone las secciones según content.sections
│   │   └── globals.css     ← mapea las variables de theme a tokens de Tailwind
│   ├── components/
│   │   ├── ui/             ← primitivas genéricas (Button, Container, SectionHeading)
│   │   └── sections/       ← bloques de landing reutilizables entre TODOS los clientes
│   └── lib/
│       ├── types.ts        ← contrato TypeScript de theme.json y content.json
│       └── getClientConfig.ts ← resuelve CLIENT_ID → lee /clients/<id>/*.json
```

### Flujo de datos

1. `CLIENT_ID` (env var) determina qué carpeta de `/clients` se usa. Por defecto: `_template`.
2. `getClientConfig()` (server-only) lee `theme.json` y `content.json` de esa carpeta en build/runtime de servidor.
3. `layout.tsx` vuelca `theme.colors`/`fonts`/`radius` como variables CSS inline en `<html>`. Los componentes usan clases Tailwind arbitrarias tipo `bg-[var(--color-primary)]` — así el mismo componente cambia de aspecto solo con el JSON.
4. `page.tsx` recorre `content.sections` (array ordenado, ej. `["hero","benefits","pricing",...]`) y renderiza cada sección con un registro de componentes. Si un cliente no necesita una sección, se quita de ese array — no se borra código.

### Regla de oro

**Los componentes de `components/sections/` son compartidos por todos los clientes.** Si cambias uno, cambia para todas las landings ya desplegadas. Antes de modificar un componente existente, valora si lo que necesitas es en realidad una variante nueva (prop opcional) o un componente nuevo, para no romper clientes en producción.

## Añadir un cliente nuevo

1. `cp -r clients/_template clients/<slug-cliente>`
2. Editar `clients/<slug-cliente>/theme.json`: colores de marca, `logo`, `favicon`.
3. Editar `clients/<slug-cliente>/content.json`: todos los textos reales, y el array `sections` con las secciones que aplican y en qué orden.
4. Añadir imágenes en `public/images/<slug-cliente>/` y referenciarlas desde `content.json`/`theme.json`.
5. Probar en local: `CLIENT_ID=<slug-cliente> npm run dev`.

No se toca ningún archivo de `src/` para dar de alta un cliente.

## Añadir una sección nueva reutilizable

1. Crear el componente en `src/components/sections/NombreSeccion.tsx`, recibiendo como prop la porción de `ClientContent` que necesita.
2. Añadir su tipo a `ClientContent` en `src/lib/types.ts` (opcional con `?` si no todos los clientes la usan).
3. Registrar la sección en el mapa `sectionRenderers` de `src/app/page.tsx`.
4. Documentar el nuevo campo en `clients/_template/content.json` con contenido de ejemplo.

## Despliegue por cliente

Este starter usa **una landing = un deploy** (no multi-tenant por dominio). Cada cliente se despliega como su propio proyecto (Vercel, Netlify, Hostinger, etc.) desde el mismo repositorio, fijando la variable de entorno `CLIENT_ID` en esa plataforma:

```
CLIENT_ID=<slug-cliente>
```

Al hacer `npm run build`, la landing se genera estática para ese cliente. Cambiar de cliente = cambiar la env var y volver a desplegar, no duplicar el repo.

## Limitaciones conocidas

- **Fuentes**: `next/font/google` requiere imports estáticos, por lo que no se puede cargar una Google Font distinta por cliente sin tocar código. Por defecto todos los clientes usan Geist. Si un cliente necesita otra tipografía, añadir su import en `layout.tsx` y referenciarla en `theme.fonts`.
- **Un solo idioma por deploy**: no hay i18n integrado. Si un cliente necesita ES/EN, es una ampliación futura (`next-intl` o rutas `/en`).
- **Sin CMS**: el contenido vive en JSON versionado en git. Es intencional (rapidez, cero dependencias externas), pero significa que actualizar texto de un cliente requiere un commit + redeploy.

## Comandos

```bash
npm run dev      # desarrollo, cliente _template
npm run build    # build de producción
npm run start    # sirve el build
npm run lint     # ESLint
```
