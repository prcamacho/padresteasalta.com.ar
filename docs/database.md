# Base de datos inicial

La base esta pensada para Supabase/PostgreSQL y empieza con el minimo necesario para pasar de web estatica a plataforma administrable.

## Tablas principales

- `profiles`: perfil interno de usuarios autenticados, con rol `member`, `editor` o `admin`.
- `contact_inquiries`: consultas de orientacion, propuestas de actividades, altas de directorio y consultas de patrocinio.
- `activities`: agenda de encuentros, charlas y convocatorias.
- `directory_entries`: centros terapeuticos, profesionales, emprendimientos familiares, empresas y recursos utiles.
- `sponsor_slots`: ubicaciones disponibles para espacios patrocinados.
- `sponsor_campaigns`: campanas o anunciantes asociados a un slot.
- `media_assets`: referencias a archivos que pueden vivir en Cloudflare R2 o storage equivalente.
- `audit_events`: eventos administrativos relevantes.
- `schema_migrations`: control local de migraciones aplicadas por `scripts/apply-migrations.mjs`.

La segunda migracion agrega un trigger sobre `auth.users` para crear automaticamente un perfil `member` cuando se registra un usuario.

## Criterio de seguridad

La migracion activa Row Level Security en todas las tablas principales.

- El publico solo puede leer actividades publicadas, fichas publicadas, media publica y sponsors activos.
- Las consultas se pueden insertar solo con consentimiento.
- La gestion completa queda reservada a usuarios con perfil `admin`.
- No se guardan archivos binarios en Postgres; solo referencias y metadatos.

## Aplicar migraciones

El script usa `MIGRATION_DATABASE_URL` si existe. Si no, usa `DIRECT_URL`; como ultimo recurso usa `DATABASE_URL`.

```bash
npm run db:migrate
```

Para Supabase remoto conviene usar `DIRECT_URL` cuando el entorno tiene salida IPv6. Si el entorno solo tiene IPv4, usar una URL del pooler compatible con IPv4 en `MIGRATION_DATABASE_URL`.

## Chequear conexion desde Next

El proyecto usa `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` para leer datos publicos con RLS.

```bash
npm run supabase:check
```

El chequeo consulta `sponsor_slots` con la publishable key. No usa credenciales privadas.

## Crear administrador

Primero crear el usuario en Supabase Auth. Luego promoverlo:

```bash
npm run admin:promote -- email@example.com
```
