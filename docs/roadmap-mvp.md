# Roadmap MVP

Este documento ordena el primer alcance de padresteasalta.com.ar para empezar simple, cuidar datos sensibles y dejar la plataforma lista para crecer.

## Estado actual del repositorio

- Repositorio Git conectado a `https://github.com/prcamacho/padresteasalta.com.ar.git`.
- Rama actual: `main`.
- Contenido actual: README, `.gitignore` y documentacion inicial.
- Todavia no hay aplicacion Next.js, dependencias instaladas ni base de datos configurada.

## Principios de producto

- Lenguaje claro, humano y directo.
- Accesibilidad primero: buen contraste, navegacion simple, textos legibles y sin animaciones invasivas.
- Separar con claridad informacion comunitaria, contenido patrocinado y servicios pagos.
- Pedir solo los datos necesarios y explicar para que se usan.
- Disenar el MVP para familias reales que necesitan respuestas rapidas, no para una web institucional decorativa.

## MVP 1: Web publica administrable

Objetivo: publicar informacion confiable y permitir que la organizacion actualice contenido basico sin depender de cambios tecnicos.

Alcance:

- Inicio con accesos por necesidad: orientacion, actividades, directorio, colaborar/donar, contacto.
- Paginas informativas editables: derechos, tramites frecuentes, que hacer ante discriminacion, recursos utiles.
- Listado de actividades/eventos con fecha, lugar, descripcion, organizador y estado.
- Formulario de contacto/orientacion con aviso de privacidad.
- Panel administrador basico para crear y editar contenidos.

Tecnologia sugerida:

- Next.js App Router + TypeScript.
- Supabase para autenticacion admin y base inicial.
- Vercel para despliegue.

## MVP 2: Directorios comunitarios

Objetivo: organizar informacion util para familias y abrir espacio a centros, profesionales y emprendimientos.

Alcance:

- Directorio de centros terapeuticos de Salta.
- Fichas con nombre, zona/localidad, especialidades, contacto, horarios y ultima fecha de actualizacion.
- Estado visible: informacion verificada, pendiente o desactualizada.
- Emprendimientos familiares con costo bajo o gratuito.
- Centros o espacios destacados marcados explicitamente como patrocinados.
- Formulario para sugerir o actualizar una ficha.

Cuidados:

- Evitar rankings clinicos o promesas de calidad.
- Mostrar criterios de publicacion y patrocinio.
- Registrar fecha y origen de cada actualizacion.

## MVP 3: Pagos y colaboracion

Objetivo: habilitar ingresos simples y trazables.

Alcance:

- Donaciones con Mercado Pago.
- Pago de inscripciones a eventos.
- Pago de espacios destacados o publicidad.
- Confirmacion de pago y notificacion a administradores.
- Registro administrativo de operaciones.

Cuidados:

- Separar donacion, compra, inscripcion y patrocinio.
- Incluir condiciones claras antes del pago.
- No lanzar sorteos/rifas sin validacion legal local.

## MVP 4: Registro y comunicaciones

Objetivo: construir una base de contactos con consentimiento y utilidad real.

Alcance:

- Registro de familiares, personas con TEA, empresas, centros y emprendedores.
- Preferencias de contacto y consentimiento explicito.
- Segmentos para convocatorias y actividades.
- Avisos por email y Telegram para administradores.
- Integracion progresiva con WhatsApp Business con opt-in.

Cuidados:

- Tratar datos de salud, discapacidad y menores como sensibles.
- Evitar publicar informacion personal sin autorizacion.
- Preparar politicas de privacidad acordes a Ley 25.326.

## Futuro: Automatizaciones e integraciones

Cuando el MVP sea estable:

- Mostrar publicaciones recientes de Facebook/Instagram.
- Confirmar mensualmente informacion de centros terapeuticos.
- Enviar recordatorios de eventos.
- Reportes de donaciones, inscripciones, contactos y directorios.
- Espacios patrocinados con vencimiento y renovacion.
- Campanas especiales, siempre con revision legal cuando involucren sorteos o rifas.

## Primer incremento tecnico recomendado

Crear una aplicacion Next.js con:

- Pantalla publica inicial con secciones de orientacion, actividades, directorio, colaborar y contacto.
- Componentes accesibles y responsive.
- Estructura preparada para Supabase, aunque la base se conecte en un segundo paso.
- Primer modelo de datos documentado para contenido, eventos, contactos, directorios y pagos.

Antes de instalar dependencias, conviene confirmar:

- Nombre publico exacto de la organizacion.
- Logo o identidad visual disponible.
- Datos de contacto oficiales.
- Quien administrara el panel.
- Si el primer despliegue sera en Vercel u otro proveedor.
