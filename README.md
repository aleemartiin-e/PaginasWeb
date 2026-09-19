# agency-landing-starter

Starter reutilizable de **Next.js 16 + TypeScript + Tailwind CSS v4** para construir landing pages de clientes de agencia sin repetir código. Un mismo conjunto de secciones/componentes se reutiliza para todos los clientes; lo único que cambia por cliente es un par de archivos JSON (tema visual + contenido).

## Cómo funciona

- `src/components/sections/` — las secciones reutilizables de la landing (Hero, Beneficios, Servicios, Testimonios, Precios, FAQ, CTA, Footer, Header).
- `clients/<id>/theme.json` — colores, tipografía, logo y radio de bordes de un cliente.
- `clients/<id>/content.json` — todos los textos, enlaces y qué secciones mostrar (y en qué orden).
- `src/lib/getClientConfig.ts` — lee la variable de entorno `CLIENT_ID` y carga el `theme.json`/`content.json` de ese cliente.

El cliente `_template` es la plantilla de referencia con contenido de ejemplo.

## Desarrollo

```bash
npm install
npm run dev
```

Por defecto se sirve el cliente `_template`. Para previsualizar otro cliente:

```bash
CLIENT_ID=nombre-cliente npm run dev
```

## Añadir un cliente nuevo

1. Copia `clients/_template` a `clients/<nombre-cliente>`.
2. Edita `theme.json` (colores, logo, tipografía) y `content.json` (textos reales del cliente).
3. Añade las imágenes del cliente en `public/images/<nombre-cliente>/`.
4. Despliega con `CLIENT_ID=<nombre-cliente>` como variable de entorno (ver `CLAUDE.md`).

No hace falta tocar ningún componente para dar de alta un cliente nuevo — solo los dos JSON.

## Build de producción

```bash
CLIENT_ID=<nombre-cliente> npm run build
npm run start
```

## Documentación completa

Ver [`CLAUDE.md`](./CLAUDE.md) para la arquitectura, convenciones y guía de despliegue por cliente.
