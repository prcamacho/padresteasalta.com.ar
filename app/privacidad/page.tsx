import type { Metadata } from "next";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Privacidad | Padres TEA Salta",
  description:
    "Privacidad y uso responsable de datos en Padres TEA Salta."
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Privacidad"
        title="Tus datos no son un tramite mas"
        description="Pedimos datos para poder responder y organizarnos, no para juntar informacion porque si."
      />

      <section className="section">
        <SectionHeader
          eyebrow="Criterios"
          title="Lo dejamos escrito para que no haya dudas"
          description="Si alguien nos confia una consulta o se registra, esa informacion se trata con cuidado."
        />

        <div className="privacy-content">
          <article>
            <h3>Que datos pedimos</h3>
            <p>
              Al crear una cuenta pedimos nombre, email, tipo de cuenta,
              localidad y telefono. Tambien guardamos si la persona quiere ser
              agregada al grupo de WhatsApp, si confirmo ser mayor de edad y si
              acepto esta politica.
            </p>
          </article>

          <article>
            <h3>Para que los usamos</h3>
            <p>
              Los usamos para identificar cuentas, responder consultas,
              organizar actividades y comunicarnos cuando hace falta.
            </p>
          </article>

          <article>
            <h3>Organizaciones</h3>
            <p>
              Las organizaciones pueden registrarse libremente. Si piden
              publicidad, patrocinio, directorio o publicaciones verificadas,
              podemos pedir algun respaldo.
            </p>
          </article>

          <article>
            <h3>Menores de edad</h3>
            <p>
              El registro es para personas mayores de edad. Si el tema tiene que
              ver con una nina, un nino o un adolescente, escribe una persona
              adulta responsable.
            </p>
          </article>

          <article>
            <h3>Datos sensibles</h3>
            <p>
              No pedimos diagnosticos ni papeles clinicos para registrarse. Si
              una consulta trae datos delicados, los usamos solo para orientar
              esa situacion.
            </p>
          </article>

          <article>
            <h3>WhatsApp y comunicaciones</h3>
            <p>
              Entrar al grupo de WhatsApp es opcional. Los avisos por email,
              Telegram o WhatsApp se usan para temas de la comunidad o para
              responder consultas.
            </p>
          </article>

          <article>
            <h3>Acceso interno</h3>
            <p>
              Los datos no quedan abiertos para cualquiera. Solo acceden las
              personas autorizadas para responder o administrar el sitio.
            </p>
          </article>

          <article>
            <h3>Marco legal</h3>
            <p>
              Si sumamos pagos, sorteos o pedidos de documentacion, este texto
              se revisa para que siga siendo claro y correcto.
            </p>
          </article>
        </div>
      </section>
    </SiteFrame>
  );
}
