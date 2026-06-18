import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublicActivities, getSponsorSlots } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Actividades | Padres TEA Salta",
  description:
    "Agenda de actividades, encuentros y convocatorias para la comunidad TEA en Salta."
};

export const revalidate = 300;

export default async function ActividadesPage() {
  const [sponsorSlots, publicActivities] = await Promise.all([
    getSponsorSlots(),
    getPublicActivities()
  ]);

  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Actividades"
        title="Charlas, encuentros y movidas de la comunidad"
        description="Aca vas a encontrar lo que estamos organizando o compartiendo para familias y personas con TEA."
        actions={[
          { label: "Proponer actividad", href: "/contacto", variant: "primary" },
          { label: "Colaborar", href: "/colaborar", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Agenda"
          title="Lo que hay para agendar"
          description="Si hay fecha, lugar o link de inscripcion, lo dejamos aca para que sea facil encontrarlo."
        />

        <div className="campaign-banner">
          <Image
            src="/images/asociacion/abril-autismo.gif"
            alt="Campana En abril Argentina habla de autismo"
            width={605}
            height={224}
            sizes="(min-width: 820px) 420px, 100vw"
            unoptimized
          />
          <div>
            <p className="eyebrow">Concientizacion</p>
            <h3>Tambien salimos a hacer visible el autismo</h3>
            <p>
              Las campanas sirven para abrir conversaciones, mostrar presencia y
              recordar que hablar de autismo tambien cambia miradas.
            </p>
          </div>
        </div>

        <div className="activity-list">
          {publicActivities.map((activity) => (
            <article className="activity-card" key={activity.title}>
              <div>
                <span>{activity.status}</span>
                <h3>{activity.title}</h3>
                <p className="meta">{activity.meta}</p>
              </div>
              <div>
                <p>{activity.description}</p>
                {activity.registrationUrl ? (
                  <a
                    className="text-link"
                    href={activity.registrationUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Inscribirme
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <AdSlot slot={sponsorSlots.activities} />
      </section>

      <section className="section band">
        <SectionHeader
          eyebrow="Para participar"
          title="Que nadie llegue sin saber como es"
          description="Tratamos de dejar claro si hay cupo, si hace falta inscribirse, donde es y que se va a hacer."
        />

        <div className="card-grid">
          {[
            "Inscripcion con cupos",
            "Pagos con Mercado Pago",
            "Actividades propias y externas",
            "Confirmaciones y recordatorios",
            "Registro de asistentes",
            "Memoria de actividades realizadas"
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
          <h2>Si tenes algo bueno para compartir, mandalo</h2>
          <p>
            Puede ser una charla, un taller, una convocatoria o una idea que
            ayude a otras familias.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Enviar actividad
        </Link>
      </section>
    </SiteFrame>
  );
}
