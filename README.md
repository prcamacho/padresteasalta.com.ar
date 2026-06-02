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
```
