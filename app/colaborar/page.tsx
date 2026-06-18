import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AdSlot } from "@/components/ads/AdSlot";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { collaborationOptions } from "@/data/site";
import { getSponsorSlots } from "@/lib/supabase/public-data";

export const metadata: Metadata = {
  title: "Colaborar | Padres TEA Salta",
  description:
    "Opciones de colaboracion, donaciones, patrocinios y apoyo comunitario."
};

export const revalidate = 300;

export default async function ColaborarPage() {
  const sponsorSlots = await getSponsorSlots();

  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Colaborar"
        title="Si queres ayudar, hay varias formas"
        description="A veces es una donacion, otras es compartir una actividad, prestar un espacio, ofrecer un servicio o simplemente abrir una puerta."
        actions={[
          { label: "Quiero colaborar", href: "/contacto", variant: "primary" },
          { label: "Ver directorio", href: "/directorio", variant: "secondary" }
        ]}
      />

      <section className="section">
        <SectionHeader
          eyebrow="Opciones"
          title="Cada ayuda tiene que quedar clara"
          description="Para cuidar la confianza, dejamos claro que se aporta, para que sirve y como se muestra."
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

        <AdSlot slot={sponsorSlots.support} />
      </section>

      <section className="section band">
        <SectionHeader
          eyebrow="Pagos"
          title="No todo aporte es lo mismo"
          description="Una donacion, una inscripcion y un patrocinio se manejan distinto. Mejor dejarlo claro desde el principio."
        />

        <div className="merch-layout">
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

          <div className="merch-visual">
            <Image
              src="/images/asociacion/camiseta-hablemos-autismo.png"
              alt="Camiseta de la campana Hablemos de Autismo"
              width={422}
              height={431}
              sizes="(min-width: 820px) 320px, 70vw"
            />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Legal y confianza</p>
          <h2>Si hacemos sorteos, que sea todo claro</h2>
          <p>
            Si llega el momento de hacer rifas, sorteos o campanas especiales,
            queremos reglas simples, visibles y sin letra chica.
          </p>
        </div>
        <Link className="button primary" href="/contacto">
          Escribir para colaborar
        </Link>
      </section>
    </SiteFrame>
  );
}
