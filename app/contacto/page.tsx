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
        title="Escribinos y contanos que necesitas"
        description="Puede ser una duda, una actividad, un dato para sumar o una propuesta. Si no sabes bien en que categoria entra, escribi igual."
      />

      <section className="section">
        <SectionHeader
          eyebrow="Canales"
          title="Elegir el motivo nos ayuda a ubicarnos"
          description="No hace falta escribir perfecto. Con una idea clara del tema, ya podemos empezar."
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
          <h2>Contanos solo lo que haga falta</h2>
          <p>
            Hay temas sensibles. Esta bien cuidar los detalles y compartir solo
            lo necesario para que podamos darte una mano.
          </p>
        </div>

        <div className="support-panel">
          <p>Con esto suele alcanzar</p>
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
