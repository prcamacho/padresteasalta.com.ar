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
        title="Contactos utiles de Salta, todos en un mismo lugar"
        description="La idea es simple: que cuando alguien necesite consultar, no tenga que empezar preguntando desde cero."
        actions={[
          { label: "Sumar una ficha", href: "/contacto", variant: "primary" },
          { label: "Ver colaboracion", href: "/colaborar", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Categorias"
          title="Para buscar sin marearse"
          description="Separamos los datos por tipo, asi es mas facil encontrar lo que uno necesita."
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
          <h2>Si algo esta patrocinado, lo decimos</h2>
          <p>
            Un destacado es un espacio pago, no una recomendacion clinica. La
            confianza se cuida diciendo las cosas de frente.
          </p>
        </div>

        <div className="support-panel">
          <p>Datos que nos gustaria tener claros</p>
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
          <h2>Si ves un dato viejo, avisanos</h2>
          <p>
            Los telefonos cambian, los horarios tambien. Avisar cuando algo no
            esta bien ayuda a la siguiente familia que entre.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Solicitar revision
        </Link>
      </section>
    </SiteFrame>
  );
}
