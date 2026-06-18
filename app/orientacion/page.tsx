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
        title="Si no sabes por donde empezar, escribinos"
        description="A veces uno no necesita un discurso enorme. Necesita que alguien escuche, ayude a ordenar y diga: empecemos por aca."
        actions={[
          { label: "Pedir orientacion", href: "/contacto", variant: "primary" },
          { label: "Ver recursos", href: "/directorio", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Temas"
          title="Preguntas que aparecen todo el tiempo"
          description="Las familias suelen llegar con dudas parecidas. Las dejamos juntas para que sea mas facil ubicarse."
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
          <h2>Lo que nos contas se trata con cuidado</h2>
          <p>
            Muchas veces aparecen temas de salud, escuela, discapacidad o
            situaciones injustas. No hace falta contar de mas: con lo necesario
            alcanza para empezar.
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
            <p>Cuando llega una consulta</p>
            <ul>
              <li>Leemos el mensaje con calma.</li>
              <li>Tratamos de entender que urge y que puede esperar.</li>
              <li>Respondemos o buscamos quien pueda orientar mejor.</li>
              <li>Guardamos lo justo para no perder el hilo.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Estamos cerca</p>
          <h2>No hace falta tener todo resuelto para escribir</h2>
          <p>
            Mandanos lo que puedas. Despues vemos juntos como ordenar el tema.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Ir a contacto
        </Link>
      </section>
    </SiteFrame>
  );
}
