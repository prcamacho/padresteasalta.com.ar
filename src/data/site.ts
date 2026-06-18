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
  registrationUrl?: string | null;
  source?: "database" | "fallback";
};

export type ContactChannel = {
  title: string;
  description: string;
  action: string;
  href: string;
};

export type SponsorSlot = {
  id: string;
  placement: "home" | "activities" | "directory" | "support" | "footer";
  label: string;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
};

export const siteNavItems: SiteNavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Orientacion", href: "/orientacion" },
  { label: "Actividades", href: "/actividades" },
  { label: "Directorio", href: "/directorio" },
  { label: "Colaborar", href: "/colaborar" },
  { label: "Contacto", href: "/contacto" },
  { label: "Ingresar", href: "/ingresar" }
];

export const homeActions: SiteAction[] = [
  { label: "Necesito una mano", href: "/contacto", variant: "primary" },
  { label: "Ver actividades", href: "/actividades", variant: "secondary" }
];

export const homeRoutes: RouteCard[] = [
  {
    title: "Orientacion",
    description:
      "Si estas perdido con tramites, escuela, salud o derechos, arrancamos por ahi.",
    href: "/orientacion"
  },
  {
    title: "Actividades",
    description:
      "Charlas, encuentros y movidas para aprender, compartir y no quedarse solo.",
    href: "/actividades"
  },
  {
    title: "Directorio",
    description:
      "Contactos y recursos de Salta para tener a mano cuando hacen falta.",
    href: "/directorio"
  },
  {
    title: "Colaborar",
    description:
      "Si queres dar una mano, aca te contamos por donde se puede empezar.",
    href: "/colaborar"
  }
];

export const trustMarkers = [
  "Hablar sin vueltas",
  "Cuidar lo que nos cuentan",
  "Estar cerca"
];

export const orientationGuides: InfoCard[] = [
  {
    title: "Primeros pasos",
    description:
      "Cuando hay mil cosas dando vueltas y no sabes que hacer primero.",
    note: "Respirar, ordenar y empezar por una cosa. De a poco."
  },
  {
    title: "Tramites y derechos",
    description:
      "Certificados, coberturas, turnos, reclamos y esas vueltas que cansan.",
    note: "Anotar fechas, nombres y guardar comprobantes ayuda mucho."
  },
  {
    title: "Escuela e inclusion",
    description:
      "Para hablar con la escuela, pedir apoyos y buscar acuerdos posibles.",
    note: "Cada chico, chica y familia tiene su propio camino."
  },
  {
    title: "Discriminacion",
    description:
      "Si algo no estuvo bien, primero conviene dejar escrito que paso.",
    note: "No es exagerar: es cuidarse y tener memoria de lo ocurrido."
  }
];

export const activities: ActivityItem[] = [
  {
    title: "Encuentro de familias",
    meta: "Proxima fecha a confirmar",
    description:
      "Un rato para hablar con otras familias, compartir dudas y sentirse acompanado.",
    status: "Comunitario"
  },
  {
    title: "Charla sobre tramites y derechos",
    meta: "Modalidad presencial o virtual",
    description:
      "Para ordenar papeles, preguntas y pasos posibles sin volverse loco.",
    status: "Orientacion"
  },
  {
    title: "Convocatorias y actividades externas",
    meta: "Organizaciones, particulares y gobierno",
    description:
      "Tambien compartimos propuestas de otros espacios cuando creemos que pueden servir.",
    status: "Agenda"
  }
];

export const directoryCategories: InfoCard[] = [
  {
    title: "Centros terapeuticos",
    description:
      "Datos basicos para consultar con menos vueltas: donde, que hacen y como ubicarlos.",
    note: "Si algo aparece destacado, lo vas a ver marcado como patrocinado."
  },
  {
    title: "Emprendimientos familiares",
    description:
      "Proyectos de familias que tambien necesitan vidriera y empuje.",
    note: "Compartir, recomendar o comprar tambien ayuda."
  },
  {
    title: "Empresas y aliados",
    description:
      "Comercios, profesionales e instituciones que quieren acompanar de verdad.",
    note: "Lo mostramos claro para que nadie confunda apoyo con recomendacion."
  },
  {
    title: "Recursos utiles",
    description:
      "Telefonos, enlaces y datos que esta bueno tener guardados.",
    note: "Si ves algo viejo o incorrecto, avisarnos suma un monton."
  }
];

export const collaborationOptions: InfoCard[] = [
  {
    title: "Donaciones",
    description:
      "Aportes para bancar encuentros, materiales, traslados y movidas comunitarias.",
    note: "Ninguna ayuda es chica cuando se suma con otras."
  },
  {
    title: "Eventos y talleres",
    description:
      "Charlas y talleres con cupos, inscripcion y avisos claros.",
    note: "Cuando algo esta bien organizado, todos respiramos mejor."
  },
  {
    title: "Espacios patrocinados",
    description:
      "Lugares visibles para aliados que quieren apoyar el trabajo de la asociacion.",
    note: "Siempre identificados como patrocinados."
  },
  {
    title: "Emprendimientos familiares",
    description:
      "Un empujon para que proyectos familiares lleguen un poco mas lejos.",
    note: "Miramos cada publicacion antes de compartirla."
  }
];

export const platformModules: InfoCard[] = [
  {
    title: "Informacion al dia",
    description:
      "Que las fechas, contactos y datos importantes no queden perdidos."
  },
  {
    title: "Consultas ordenadas",
    description:
      "Que cada mensaje tenga seguimiento y no quede en el aire."
  },
  {
    title: "Materiales cuidados",
    description:
      "Flyers, fotos y documentos a mano, sin andar revolviendo chats."
  },
  {
    title: "Avisos a tiempo",
    description:
      "Si hay una novedad importante, que llegue cuando tiene que llegar."
  }
];

export const contactChannels: ContactChannel[] = [
  {
    title: "Consulta de orientacion",
    description:
      "Para contar que esta pasando y pedir ayuda para ordenar el tema.",
    action: "Escribir por email",
    href: "mailto:contacto@padresteasalta.com.ar"
  },
  {
    title: "Proponer una actividad",
    description:
      "Si tenes una charla, taller o encuentro que puede servir, mandalo.",
    action: "Enviar actividad",
    href: "mailto:actividades@padresteasalta.com.ar"
  },
  {
    title: "Sumar un directorio",
    description:
      "Para pasar un centro, emprendimiento, comercio aliado o dato util.",
    action: "Enviar datos",
    href: "mailto:directorio@padresteasalta.com.ar"
  }
];

export const sponsorSlots: Record<SponsorSlot["placement"], SponsorSlot> = {
  home: {
    id: "home-main-ally",
    placement: "home",
    label: "Espacio para aliados",
    title: "Tu apoyo ayuda a sostener este espacio",
    description:
      "Este lugar puede ser para empresas, profesionales o instituciones que quieran estar cerca.",
    actionLabel: "Consultar este espacio",
    href: "/contacto"
  },
  activities: {
    id: "activities-event-ally",
    placement: "activities",
    label: "Actividad acompanada por",
    title: "Aliados presentes en encuentros y charlas",
    description:
      "Si una actividad tiene apoyo de un sponsor, lo mostramos sin vueltas.",
    actionLabel: "Acompanar una actividad",
    href: "/contacto"
  },
  directory: {
    id: "directory-featured-slot",
    placement: "directory",
    label: "Destacado patrocinado",
    title: "Espacio destacado para centros, empresas o recursos utiles",
    description:
      "Los destacados ayudan a sostener el sitio y aparecen claramente marcados.",
    actionLabel: "Consultar destacado",
    href: "/contacto"
  },
  support: {
    id: "support-general-slot",
    placement: "support",
    label: "Espacio para sumarse",
    title: "Acompanar este espacio tambien es colaborar",
    description:
      "Hay lugar para comercios, profesionales e instituciones que quieran sumar bien.",
    actionLabel: "Hablar sobre patrocinio",
    href: "/contacto"
  },
  footer: {
    id: "footer-ally-slot",
    placement: "footer",
    label: "Aliados",
    title: "Un lugar para quienes acompanan",
    description:
      "Un lugar simple para agradecer a quienes acompanen el proyecto.",
    actionLabel: "Consultar",
    href: "/contacto"
  }
};
