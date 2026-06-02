export type HomeAction = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  href: string;
};

export type ActivityItem = {
  title: string;
  meta: string;
  description: string;
  status: string;
};

export type DirectoryItem = {
  title: string;
  description: string;
  note: string;
};

export type PlatformArea = {
  title: string;
  description: string;
};

export const primaryActions: HomeAction[] = [
  { label: "Pedir orientacion", href: "#contacto" },
  { label: "Ver actividades", href: "#actividades" }
];

export const quickRoutes: FeatureItem[] = [
  {
    title: "Necesito orientacion",
    description:
      "Un canal simple para consultas sobre tramites, derechos, escuela, salud o situaciones de discriminacion.",
    href: "#contacto"
  },
  {
    title: "Quiero encontrar servicios",
    description:
      "Directorio inicial para centros terapeuticos, profesionales, empresas y recursos utiles de Salta.",
    href: "#directorio"
  },
  {
    title: "Quiero participar",
    description:
      "Actividades, encuentros, charlas y convocatorias de la organizacion o de la comunidad.",
    href: "#actividades"
  },
  {
    title: "Quiero colaborar",
    description:
      "Donaciones, voluntariado, espacios patrocinados y apoyo a emprendimientos familiares.",
    href: "#colaborar"
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

export const directoryItems: DirectoryItem[] = [
  {
    title: "Centros terapeuticos",
    description:
      "Fichas con localidad, especialidades, contactos, horarios y fecha de ultima actualizacion.",
    note: "Los destacados pagos se mostraran como patrocinados."
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
  }
];

export const platformAreas: PlatformArea[] = [
  {
    title: "Panel administrador",
    description:
      "Contenido, actividades, directorios, consultas, pagos y reportes desde un solo lugar."
  },
  {
    title: "Pagos y donaciones",
    description:
      "Mercado Pago para donaciones, eventos, merchandising, publicidad y espacios destacados."
  },
  {
    title: "Comunicaciones",
    description:
      "Avisos a administradores por email o Telegram, y contactos segmentados con consentimiento."
  },
  {
    title: "Automatizaciones",
    description:
      "Confirmaciones periodicas de datos, integracion con Meta y WhatsApp Business cuando corresponda."
  }
];
