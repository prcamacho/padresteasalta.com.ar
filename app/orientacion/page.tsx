import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { orientationGuides } from "@/data/site";

export const metadata: Metadata = {
  title: "Orientacion | Padres TEA Salta",
  description:
    "Orientacion comunitaria para familias y personas con TEA en Salta."
};

export default function OrientacionPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Orientacion"
        title="Un punto de partida para ordenar dudas y pedir acompanamiento"
        description="Esta seccion esta pensada para familias y personas con TEA que necesitan respuestas claras, pasos posibles y canales de ayuda."
        actions={[
          { label: "Pedir orientacion", href: "/contacto", variant: "primary" },
          { label: "Ver recursos", href: "/directorio", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Temas"
          title="Guias iniciales"
          description="Cada bloque puede crecer luego como pagina editable desde el panel administrador."
        />

        <div className="card-grid">
          {orientationGuides.map((guide) => (
            <article className="info-card" key={guide.title}>
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              {guide.note ? <small>{guide.note}</small> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section split-band">
        <div>
          <p className="eyebrow">Cuidado</p>
          <h2>La plataforma debe acompanar sin exponer datos sensibles</h2>
          <p>
            Las consultas pueden involucrar salud, discapacidad, escuela,
            menores de edad o conflictos. Por eso el formulario futuro deberia
            pedir solo lo necesario, mostrar aviso de privacidad y ordenar la
            atencion por prioridad.
          </p>
        </div>

        <div className="support-visual-stack">
          <div className="association-cutout">
            <Image
              src="/images/asociacion/familia-padres-tea.png"
              alt="Persona adulta caminando de la mano con una nina usando remeras de la campana Hablemos de Autismo"
              width={433}
              height={577}
              sizes="(min-width: 820px) 360px, 70vw"
            />
          </div>

          <div className="support-panel">
            <p>Futuro flujo de atencion</p>
            <ul>
              <li>Consulta recibida con consentimiento.</li>
              <li>Aviso al equipo por email o Telegram.</li>
              <li>Estado interno: nueva, en revision, respondida.</li>
              <li>Historial cuidado y visible solo para roles autorizados.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Siguiente paso</p>
          <h2>Convertir la orientacion en un canal administrable</h2>
          <p>
            El proximo incremento natural es crear el formulario real, guardar
            la consulta y notificar a administradores.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Ir a contacto
        </Link>
      </section>
    </SiteFrame>
  );
}
