export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type RouteCard = {
  title: string;
  description: string;
  href: string;
};

export type InfoCard = {
  title: string;
  description: string;
  note?: string;
};

export type ActivityItem = {
  title: string;
  meta: string;
  description: string;
  status: string;
};

export type ContactChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
};

export const siteNavItems: SiteNavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Orientacion", href: "/orientacion" },
  { label: "Actividades", href: "/actividades" },
  { label: "Directorio", href: "/directorio" },
  { label: "Colaborar", href: "/colaborar" },
  { label: "Contacto", href: "/contacto" }
];

export const homeActions: SiteAction[] = [
  { label: "Pedir orientacion", href: "/contacto", variant: "primary" },
  { label: "Ver actividades", href: "/actividades", variant: "secondary" }
];

export const homeRoutes: RouteCard[] = [
  {
    title: "Orientacion",
    description:
      "Consultas sobre tramites, derechos, escuela, salud, turnos o situaciones de discriminacion.",
    href: "/orientacion"
  },
  {
    title: "Actividades",
    description:
      "Encuentros, charlas, talleres, convocatorias y propuestas relevantes para la comunidad.",
    href: "/actividades"
  },
  {
    title: "Directorio",
    description:
      "Centros terapeuticos, emprendimientos familiares, empresas aliadas y recursos utiles.",
    href: "/directorio"
  },
  {
    title: "Colaborar",
    description:
      "Donaciones, voluntariado, patrocinios, publicidad y apoyo a proyectos familiares.",
    href: "/colaborar"
  }
];

export const trustMarkers = [
  "Lenguaje claro",
  "Datos cuidados",
  "Comunidad local"
];

export const orientationGuides: InfoCard[] = [
  {
    title: "Primeros pasos",
    description:
      "Una guia inicial para ordenar dudas, documentacion, turnos y necesidades urgentes.",
    note: "Pensado para familias que no saben por donde empezar."
  },
  {
    title: "Tramites y derechos",
    description:
      "Informacion practica sobre certificados, cobertura, apoyos, reclamos y organismos.",
    note: "Debe crecer con enlaces oficiales y material revisado."
  },
  {
    title: "Escuela e inclusion",
    description:
      "Orientacion sobre acompanamiento escolar, ajustes razonables y dialogo con instituciones.",
    note: "Sin reemplazar asesoramiento legal o profesional."
  },
  {
    title: "Discriminacion",
    description:
      "Pasos sugeridos para registrar situaciones, pedir ayuda y encontrar canales adecuados.",
    note: "El panel futuro puede priorizar estos casos."
  }
];

export const activities: ActivityItem[] = [
  {
    title: "Encuentro de familias",
    meta: "Proxima fecha a confirmar",
    description:
      "Un espacio de acompanamiento entre pares para compartir dudas, experiencias y recursos.",
    status: "Comunitario"
  },
  {
    title: "Charla sobre tramites y derechos",
    meta: "Modalidad presencial o virtual",
    description:
      "Orientacion practica para familias que necesitan ordenar documentacion, turnos o reclamos.",
    status: "Orientacion"
  },
  {
    title: "Convocatorias y actividades externas",
    meta: "Organizaciones, particulares y gobierno",
    description:
      "Agenda abierta para difundir propuestas relevantes para personas con TEA y sus familias.",
    status: "Agenda"
  }
];

export const directoryCategories: InfoCard[] = [
  {
    title: "Centros terapeuticos",
    description:
      "Fichas con localidad, especialidades, contactos, horarios y fecha de ultima actualizacion.",
    note: "Los espacios destacados se mostraran como patrocinados."
  },
  {
    title: "Emprendimientos familiares",
    description:
      "Espacio de bajo costo o gratuito para proyectos impulsados por familias de la comunidad.",
    note: "Pensado para visibilidad, redes y colaboracion."
  },
  {
    title: "Empresas y aliados",
    description:
      "Organizaciones que colaboran, patrocinan espacios o participan en campanas especificas.",
    note: "Con criterios claros de publicacion."
  },
  {
    title: "Recursos utiles",
    description:
      "Organismos, enlaces oficiales, materiales descargables y referencias de apoyo.",
    note: "Cada recurso deberia indicar fuente y fecha."
  }
];

export const collaborationOptions: InfoCard[] = [
  {
    title: "Donaciones",
    description:
      "Base preparada para integrar Mercado Pago y registrar operaciones de forma ordenada.",
    note: "Puede empezar con donacion unica y luego sumar recurrencia."
  },
  {
    title: "Eventos y talleres",
    description:
      "Inscripciones, cupos, confirmaciones y pagos para actividades presenciales o virtuales.",
    note: "El admin necesitara reportes simples."
  },
  {
    title: "Espacios patrocinados",
    description:
      "Banners, fichas destacadas y apoyos visibles con vencimiento y renovacion.",
    note: "Siempre identificados como patrocinados."
  },
  {
    title: "Emprendimientos familiares",
    description:
      "Opciones gratis o de bajo costo para que la comunidad pueda mostrar sus proyectos.",
    note: "Con moderacion previa para cuidar calidad y seguridad."
  }
];

export const platformModules: InfoCard[] = [
  {
    title: "Panel administrador",
    description:
      "Gestionar contenidos, actividades, directorios, consultas, pagos, reportes y usuarios."
  },
  {
    title: "Base de datos",
    description:
      "Supabase/PostgreSQL para permisos, auditoria, contactos, fichas, eventos y operaciones."
  },
  {
    title: "Multimedia",
    description:
      "Cloudflare R2 para imagenes, flyers, documentos publicos y archivos cargados desde el panel."
  },
  {
    title: "Comunicaciones",
    description:
      "Email, Telegram, Meta y WhatsApp Business con consentimiento y plantillas aprobadas."
  }
];

export const contactChannels: ContactChannel[] = [
  {
    title: "Consulta de orientacion",
    description:
      "Para familias o personas con TEA que necesitan ordenar una duda o pedir acompanamiento.",
    action: "Escribir por email",
    href: "mailto:contacto@padresteasalta.com.ar"
  },
  {
    title: "Proponer una actividad",
    description:
      "Para organizaciones, profesionales, particulares o areas de gobierno que quieran difundir una propuesta.",
    action: "Enviar propuesta",
    href: "mailto:actividades@padresteasalta.com.ar"
  },
  {
    title: "Sumar un directorio",
    description:
      "Para centros, emprendimientos familiares, empresas o recursos utiles que deban ser revisados.",
    action: "Solicitar revision",
    href: "mailto:directorio@padresteasalta.com.ar"
  }
];
