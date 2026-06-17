import type { Metadata } from "next";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { directoryCategories } from "@/data/site";
import { getSponsorSlots } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Directorio | Padres TEA Salta",
  description:
    "Directorio comunitario de centros, emprendimientos, aliados y recursos utiles en Salta."
};

export const revalidate = 300;

export default async function DirectorioPage() {
  const sponsorSlots = await getSponsorSlots();

  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Directorio"
        title="Recursos locales con informacion clara y actualizable"
        description="El directorio se prepara para crecer con fichas administrables, busqueda, filtros y espacios patrocinados identificados."
        actions={[
          { label: "Sumar una ficha", href: "/contacto", variant: "primary" },
          { label: "Ver colaboracion", href: "/colaborar", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Categorias"
          title="Una estructura para ordenar recursos"
          description="Cada categoria puede convertirse mas adelante en una tabla propia con filtros, moderacion y fecha de actualizacion."
        />

        <div className="card-grid">
          {directoryCategories.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.note ? <small>{item.note}</small> : null}
            </article>
          ))}
        </div>

        <AdSlot slot={sponsorSlots.directory} />
      </section>

      <section className="section split-band">
        <div>
          <p className="eyebrow">Transparencia</p>
          <h2>Destacado no debe confundirse con recomendacion clinica</h2>
          <p>
            Los centros o empresas que paguen por mayor visibilidad deben
            aparecer marcados como patrocinados. La plataforma puede ordenar y
            verificar datos, pero no deberia prometer resultados terapeuticos.
          </p>
        </div>

        <div className="support-panel">
          <p>Datos sugeridos por ficha</p>
          <ul>
            <li>Nombre, localidad y zona de atencion.</li>
            <li>Especialidades y canales de contacto.</li>
            <li>Fecha de ultima actualizacion.</li>
            <li>Estado: verificado, pendiente o desactualizado.</li>
          </ul>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Actualizacion</p>
          <h2>La informacion deberia confirmarse periodicamente</h2>
          <p>
            Cuando exista la base de datos, se puede automatizar la revision
            mensual de fichas por email o WhatsApp Business con opt-in.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Solicitar revision
        </Link>
      </section>
    </SiteFrame>
  );
}
