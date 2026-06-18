import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  directoryCategories,
  homeActions,
  homeRoutes,
  platformModules,
  trustMarkers
} from "@/data/site";
import { getPublicActivities, getSponsorSlots } from "@/lib/supabase/public-data";

export async function HomePage() {
  const [sponsorSlots, publicActivities] = await Promise.all([
    getSponsorSlots(),
    getPublicActivities({ limit: 2 })
  ]);

  return (
    <SiteFrame>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/asociacion/comunidad-color.jpg"
          alt="Familias reunidas en una actividad comunitaria de concientizacion sobre autismo"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Salta, Argentina</p>
          <h1 id="hero-title">
            Familias acompanando a familias
          </h1>
          <p>
            Somos Padres TEA Salta. Armamos este espacio para tener a mano
            orientacion, actividades, contactos utiles y formas de ayudarnos.
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
          eyebrow="Por donde arrancar"
          title="Si llegaste con una duda, empeza por aca"
          description="Ordenamos lo mas buscado para que no tengas que andar saltando de un lado a otro."
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
          description="Lo que esta pasando o se viene pronto dentro de la comunidad."
        />

        <div className="activity-list">
          {publicActivities.map((activity) => (
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
          <h2>Datos utiles para no empezar de cero</h2>
          <p>
            Cuando una familia pregunta si tenemos algun contacto, queremos que
            haya un lugar claro donde buscar.
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
          eyebrow="Nuestro modo"
          title="Lo importante es que nada se pierda"
          description="Una consulta, una fecha, un telefono o una foto pueden servirle a alguien. Mejor tenerlos ordenados."
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
