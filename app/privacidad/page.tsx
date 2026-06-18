import type { Metadata } from "next";

import { SiteFrame } from "@/components/layout/SiteFrame";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Privacidad | Padres TEA Salta",
  description:
    "Politica inicial de privacidad y uso de datos de Padres TEA Salta."
};

export default function PrivacyPage() {
  return (
    <SiteFrame>
      <PageIntro
        eyebrow="Privacidad"
        title="Uso responsable de datos en la plataforma"
        description="Esta politica inicial ordena como tratamos los datos de usuarios, organizaciones y consultas dentro de un proyecto comunitario que puede crecer."
      />

      <section className="section">
        <SectionHeader
          eyebrow="Criterios"
          title="Principios para cuidar la informacion"
          description="La plataforma debe pedir solo los datos necesarios, explicar para que se usan y permitir que la organizacion administre la informacion con responsabilidad."
        />

        <div className="privacy-content">
          <article>
            <h3>Datos que podemos solicitar</h3>
            <p>
              En el registro inicial pedimos nombre, email, tipo de cuenta,
              localidad y telefono. Tambien registramos si la persona desea ser
              agregada al grupo de WhatsApp, si confirma ser mayor de edad y si
              acepta esta politica.
            </p>
          </article>

          <article>
            <h3>Para que usamos los datos</h3>
            <p>
              Los datos se usan para identificar cuentas, responder consultas,
              organizar actividades, contactar a usuarios cuando sea necesario y
              habilitar funciones acordes al tipo de cuenta.
            </p>
          </article>

          <article>
            <h3>Organizaciones</h3>
            <p>
              Las organizaciones pueden registrarse libremente. Mas adelante, si
              solicitan funciones como espacios publicitarios, directorio,
              patrocinios o publicaciones verificadas, se les podra pedir
              documentacion respaldatoria.
            </p>
          </article>

          <article>
            <h3>Menores de edad</h3>
            <p>
              En esta etapa solo deben registrarse personas mayores de edad. Si
              una consulta involucra a ninas, ninos o adolescentes, debe ser
              realizada por una persona adulta responsable.
            </p>
          </article>

          <article>
            <h3>Datos sensibles</h3>
            <p>
              No pedimos diagnosticos ni documentacion clinica en el registro.
              Si en el futuro se reciben datos sensibles para orientar una
              situacion concreta, deberan tratarse con mayor cuidado, acceso
              limitado y finalidad clara.
            </p>
          </article>

          <article>
            <h3>WhatsApp y comunicaciones</h3>
            <p>
              La incorporacion al grupo de WhatsApp es opcional. Las
              comunicaciones futuras por email, Telegram o WhatsApp deberian
              respetar la finalidad informada y permitir revisar preferencias.
            </p>
          </article>

          <article>
            <h3>Acceso y administracion</h3>
            <p>
              El acceso a datos de usuarios queda reservado a cuentas
              administradoras autorizadas. La plataforma debe mantener permisos
              separados entre usuarios, organizaciones y administradores.
            </p>
          </article>

          <article>
            <h3>Marco legal</h3>
            <p>
              Este texto es una base operativa y deberia ser revisado
              legalmente a medida que la plataforma incorpore pagos, sorteos,
              datos sensibles, comunicaciones automatizadas o documentacion
              respaldatoria.
            </p>
          </article>
        </div>
      </section>
    </SiteFrame>
  );
}
