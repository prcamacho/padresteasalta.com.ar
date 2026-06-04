# padresteasalta.com.ar

Plataforma web para una organizacion de pares y familiares de personas con autismo en Salta.

El objetivo es empezar con una web clara y facil de administrar, y crecer hacia una plataforma comunitaria con informacion, asesoramiento, actividades, directorios, donaciones, pagos, comunicaciones y gestion de datos.

## Vision

- Ayudar a familias y personas con TEA frente a dudas, tramites, orientacion y situaciones de discriminacion.
- Publicar actividades sociales, institucionales, particulares y gubernamentales.
- Mantener un directorio de centros terapeuticos, profesionales, empresas y emprendimientos familiares.
- Recibir donaciones y pagos mediante Mercado Pago.
- Ofrecer espacios destacados o patrocinados de forma clara y transparente.
- Construir una base de contactos con consentimiento para convocatorias, eventos y comunicaciones.
- Dar al equipo administrador herramientas simples para actualizar contenido y operar la plataforma.

## Stack recomendado

El repositorio todavia no tiene una aplicacion inicial creada. Para el MVP se recomienda:

- Next.js + TypeScript para la web publica y el panel administrador.
- PostgreSQL/Supabase para base de datos, autenticacion, permisos y Row Level Security.
- Mercado Pago para donaciones, inscripciones, merchandising y espacios pagos.
- Email y Telegram para avisos administrativos.
- Integraciones progresivas con Meta, WhatsApp Business y automatizaciones cuando el MVP este estable.

## Documentacion inicial

- [Roadmap MVP](docs/roadmap-mvp.md)

## Estructura publica inicial

La web esta organizada como portal y secciones separadas:

- `/`: home de entrada con caminos principales.
- `/orientacion`: guias, consultas y futuros flujos de acompanamiento.
- `/actividades`: agenda, convocatorias e inscripciones futuras.
- `/directorio`: centros, emprendimientos, aliados y recursos.
- `/colaborar`: donaciones, pagos, patrocinios y apoyos.
- `/contacto`: canales iniciales y futuro formulario administrable.

El contenido base vive en `src/data/site.ts` para que sea facil reemplazarlo mas adelante por datos de Supabase o por contenido gestionado desde un panel administrador.

## Espacios para aliados

La web ya reserva espacios de patrocinio en home, actividades, directorio y colaboracion. Mientras no haya anunciantes reales, se muestran como llamados sobrios a consultar por espacios para aliados, no como banners vacios.

Todo espacio pago o destacado debe aparecer identificado como patrocinado, aliado o publicidad para no confundirse con recomendaciones comunitarias o informacion verificada.

## Desarrollo local

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:3000`.

Comandos utiles:

```bash
npm run build
npm run lint
npm run smoke
```

Para probar la version de produccion localmente:

```bash
npm run build
npm run smoke:prod
```

## Deploy en Railway

Railway deberia usar:

- Build command: `npm run build`
- Start command: `npm run start`

El script `start` respeta la variable `PORT` de Railway y escucha en `0.0.0.0`.
