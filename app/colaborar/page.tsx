import type { Metadata } from "next";
import Link from "next/link";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { collaborationOptions } from "@/data/site";

export const metadata: Metadata = {
  title: "Colaborar | Padres TEA Salta",
  description:
    "Opciones de colaboracion, donaciones, patrocinios y apoyo comunitario."
};

export default function ColaborarPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Colaborar"
        title="Formas de sostener y ampliar el trabajo comunitario"
        description="Esta seccion prepara el terreno para donaciones, eventos pagos, patrocinios, publicidad clara y apoyo a emprendimientos familiares."
        actions={[
          { label: "Consultar colaboracion", href: "/contacto", variant: "primary" },
          { label: "Ver directorio", href: "/directorio", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Opciones"
          title="Ingresos posibles, con reglas claras"
          description="La plataforma puede sumar ingresos sin perder confianza si separa bien donacion, pago, patrocinio y publicidad."
        />

        <div className="card-grid">
          {collaborationOptions.map((option) => (
            <article className="info-card" key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.description}</p>
              {option.note ? <small>{option.note}</small> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section band">
        <SectionHeader
          eyebrow="Pagos"
          title="Mercado Pago deberia integrarse por casos de uso"
          description="No todos los pagos son iguales. Es mejor registrar el motivo y las condiciones desde el inicio."
        />

        <div className="process-list">
          {[
            "Donacion: aporte voluntario, unico o recurrente.",
            "Evento: inscripcion, cupo, comprobante y asistencia.",
            "Patrocinio: periodo contratado, ubicacion visible y vencimiento.",
            "Merchandising: producto, stock, envio o retiro."
          ].map((step) => (
            <p key={step}>{step}</p>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Legal y confianza</p>
          <h2>Sorteos y campanas necesitan revision antes de publicarse</h2>
          <p>
            Si mas adelante se hacen rifas, sorteos o campanas similares, es
            mejor validarlo antes con normativa local y condiciones publicas.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Hablar con la organizacion
        </Link>
      </section>
    </SiteFrame>
  );
}
