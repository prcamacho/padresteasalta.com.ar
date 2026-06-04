import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { activities, sponsorSlots } from "@/data/site";

export const metadata: Metadata = {
  title: "Actividades | Padres TEA Salta",
  description:
    "Agenda de actividades, encuentros y convocatorias para la comunidad TEA en Salta."
};

export default function ActividadesPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Actividades"
        title="Agenda comunitaria para encuentros, charlas y convocatorias"
        description="Esta pagina separa la agenda de la home para que luego pueda tener filtros, inscripciones, cupos, pagos y actividades externas."
        actions={[
          { label: "Proponer actividad", href: "/contacto", variant: "primary" },
          { label: "Colaborar", href: "/colaborar", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Agenda"
          title="Actividades iniciales"
          description="Por ahora son entradas base. Luego pueden venir desde una base de datos y administrarse desde el panel."
        />

        <div className="activity-list">
          {activities.map((activity) => (
            <article className="activity-card" key={activity.title}>
              <div>
                <span>{activity.status}</span>
                <h3>{activity.title}</h3>
                <p className="meta">{activity.meta}</p>
              </div>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>

        <AdSlot slot={sponsorSlots.activities} />
      </section>

      <section className="section band">
        <SectionHeader
          eyebrow="Escalable"
          title="Lo que deberia soportar esta seccion"
          description="La agenda no deberia quedarse como texto manual: tiene que poder operar eventos reales."
        />

        <div className="card-grid">
          {[
            "Inscripcion con cupos",
            "Pagos con Mercado Pago",
            "Actividades propias y externas",
            "Confirmaciones y recordatorios",
            "Reportes para administradores",
            "Historial de actividades pasadas"
          ].map((item) => (
            <article className="compact-card" key={item}>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Participacion</p>
          <h2>La comunidad tambien puede acercar propuestas</h2>
          <p>
            Organizaciones, profesionales, particulares o areas de gobierno
            podran enviar actividades para revision antes de publicarlas.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Enviar propuesta
        </Link>
      </section>
    </SiteFrame>
  );
}
