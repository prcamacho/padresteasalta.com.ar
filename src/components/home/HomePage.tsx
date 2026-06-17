import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  activities,
  directoryCategories,
  homeActions,
  homeRoutes,
  platformModules,
  trustMarkers
} from "@/data/site";
import { getSponsorSlots } from "@/lib/supabase/public-data";

export async function HomePage() {
  const sponsorSlots = await getSponsorSlots();

  return (
    <SiteFrame>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/community-support.png"
          alt="Familias reunidas en un espacio comunitario de apoyo"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Salta, Argentina</p>
          <h1 id="hero-title">
            Acompanamiento claro para familias y personas con TEA
          </h1>
          <p>
            Una plataforma comunitaria para orientacion, actividades,
            directorios utiles y formas simples de colaborar.
          </p>
          <div className="hero-actions" aria-label="Acciones principales">
            {homeActions.map((action) => (
              <Link
                key={action.href}
                className={`button ${action.variant ?? "secondary"}`}
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Prioridades del sitio">
        {trustMarkers.map((marker) => (
          <p key={marker}>{marker}</p>
        ))}
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Portal"
          title="Cada area tiene su propio lugar"
          description="La home resume los caminos principales y dirige a paginas preparadas para crecer con contenido, datos y operaciones reales."
        />

        <div className="route-grid">
          {homeRoutes.map((route) => (
            <Link className="route-card" href={route.href} key={route.title}>
              <span aria-hidden="true">+</span>
              <h3>{route.title}</h3>
              <p>{route.description}</p>
            </Link>
          ))}
        </div>

        <AdSlot slot={sponsorSlots.home} />
      </section>

      <section className="section band">
        <SectionHeader
          eyebrow="Agenda"
          title="Actividades destacadas"
          description="La agenda completa vive en su propia seccion, pero la home puede mostrar lo mas importante o urgente."
        />

        <div className="activity-list">
          {activities.slice(0, 2).map((activity) => (
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

        <Link className="text-link" href="/actividades">
          Ver agenda completa
        </Link>
      </section>

      <section className="section two-column">
        <div>
          <p className="eyebrow">Directorio</p>
          <h2>Informacion local con criterio de actualizacion</h2>
          <p>
            Centros, emprendimientos, aliados y recursos pueden crecer como
            fichas administrables, con fecha de revision y patrocinio visible
            cuando corresponda.
          </p>
        </div>

        <div className="directory-stack">
          {directoryCategories.slice(0, 3).map((item) => (
            <article className="directory-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.note ? <small>{item.note}</small> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader
          eyebrow="Arquitectura"
          title="Una base pensada para sumar modulos"
          description="El sitio arranca simple, pero queda orientado a panel administrador, base de datos, multimedia, pagos y comunicaciones."
        />

        <div className="platform-grid">
          {platformModules.map((area) => (
            <article className="platform-card" key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
