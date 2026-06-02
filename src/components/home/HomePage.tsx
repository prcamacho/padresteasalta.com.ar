import Image from "next/image";

import {
  activities,
  directoryItems,
  platformAreas,
  primaryActions,
  quickRoutes
} from "@/data/home";
import { SectionHeader } from "./SectionHeader";
import { SiteHeader } from "./SiteHeader";

export function HomePage() {
  return (
    <>
      <SiteHeader />

      <main id="inicio">
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
              Un espacio comunitario para orientacion, actividades, directorios
              utiles y formas simples de colaborar.
            </p>
            <div className="hero-actions" aria-label="Acciones principales">
              {primaryActions.map((action, index) => (
                <a
                  key={action.href}
                  className={index === 0 ? "button primary" : "button secondary"}
                  href={action.href}
                >
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Prioridades del sitio">
          <p>Informacion clara</p>
          <p>Datos cuidados</p>
          <p>Comunidad local</p>
        </section>

        <section id="orientacion" className="section">
          <SectionHeader
            eyebrow="Por donde empezar"
            title="Accesos pensados por necesidad"
            description="La navegacion se organiza alrededor de situaciones reales: pedir ayuda, encontrar servicios, participar o colaborar."
          />

          <div className="route-grid">
            {quickRoutes.map((route) => (
              <a className="route-card" href={route.href} key={route.title}>
                <span aria-hidden="true">+</span>
                <h3>{route.title}</h3>
                <p>{route.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section id="actividades" className="section band">
          <SectionHeader
            eyebrow="Agenda"
            title="Actividades y convocatorias"
            description="Una agenda preparada para encuentros propios, propuestas de particulares, organizaciones y actividades gubernamentales."
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
        </section>

        <section id="directorio" className="section two-column">
          <div>
            <p className="eyebrow">Directorio</p>
            <h2>Informacion util, actualizada y transparente</h2>
            <p>
              El directorio puede crecer por etapas: centros terapeuticos,
              profesionales, emprendimientos familiares, empresas y aliados.
              Cada ficha deberia mostrar fecha de actualizacion y origen de la
              informacion.
            </p>
          </div>

          <div className="directory-stack">
            {directoryItems.map((item) => (
              <article className="directory-item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="colaborar" className="section split-band">
          <div>
            <p className="eyebrow">Colaborar</p>
            <h2>Una base simple para donaciones, pagos y espacios patrocinados</h2>
            <p>
              La web empieza con informacion y contacto, pero queda preparada
              para integrar Mercado Pago, inscripciones a eventos,
              merchandising, publicidad y apoyos destacados con reglas claras.
            </p>
          </div>

          <div className="support-panel" aria-label="Opciones de colaboracion">
            <p>Futuras opciones</p>
            <ul>
              <li>Donaciones unicas o recurrentes</li>
              <li>Inscripcion a eventos y talleres</li>
              <li>Espacios patrocinados identificados</li>
              <li>Apoyo a emprendimientos familiares</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <SectionHeader
            eyebrow="Preparado para crecer"
            title="La plataforma puede sumar modulos sin perder orden"
            description="El home ya anticipa las areas que luego se conectaran con base de datos, permisos, pagos, notificaciones y reportes."
          />

          <div className="platform-grid">
            {platformAreas.map((area) => (
              <article className="platform-card" key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contacto</p>
            <h2 id="contact-title">Un primer canal para escuchar y orientar</h2>
            <p>
              En el proximo paso este bloque puede convertirse en un formulario
              conectado al panel administrador, con aviso de privacidad y
              notificaciones por email o Telegram.
            </p>
          </div>

          <a className="button primary" href="mailto:contacto@padresteasalta.com.ar">
            Escribir a la organizacion
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <p>Padres TEA Salta</p>
        <p>Plataforma comunitaria en construccion.</p>
      </footer>
    </>
  );
}
