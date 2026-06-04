import type { Metadata } from "next";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contactChannels } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto | Padres TEA Salta",
  description:
    "Canales de contacto para orientacion, actividades y directorio comunitario."
};

export default function ContactoPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Contacto"
        title="Un primer canal para escuchar, orientar y ordenar consultas"
        description="Por ahora usamos enlaces de email. El siguiente paso sera reemplazarlos por formularios conectados al panel administrador."
      />

      <section className="section">
        <SectionHeader
          eyebrow="Canales"
          title="Elegir el motivo ayuda a responder mejor"
          description="Separar las consultas desde el inicio facilita futuras notificaciones, prioridades y reportes internos."
        />

        <div className="card-grid">
          {contactChannels.map((channel) => (
            <article className="info-card" key={channel.title}>
              <h3>{channel.title}</h3>
              <p>{channel.description}</p>
              <a className="text-link" href={channel.href}>
                {channel.action}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-band">
        <div>
          <p className="eyebrow">Privacidad</p>
          <h2>El formulario futuro debe pedir lo minimo necesario</h2>
          <p>
            Algunas consultas pueden incluir datos sensibles. Antes de guardar
            informacion personal conviene sumar aviso de privacidad,
            consentimiento y permisos por rol.
          </p>
        </div>

        <div className="support-panel">
          <p>Campos iniciales sugeridos</p>
          <ul>
            <li>Nombre y forma de contacto.</li>
            <li>Motivo de la consulta.</li>
            <li>Localidad o zona, si ayuda a orientar.</li>
            <li>Consentimiento para recibir respuesta.</li>
          </ul>
        </div>
      </section>
    </SiteFrame>
  );
}
