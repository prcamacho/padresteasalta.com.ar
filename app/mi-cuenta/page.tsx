import type { Metadata } from "next";
import Link from "next/link";

import { publicLogoutAction } from "../ingresar/actions";
import { accountTypeLabels, requireAccount } from "@/lib/account/profile";

export const metadata: Metadata = {
  title: "Mi cuenta | Padres TEA Salta",
  description: "Espacio privado de usuarios registrados."
};

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { profile, user } = await requireAccount("/mi-cuenta");

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link className="admin-back-link" href="/">
            Volver al sitio
          </Link>
          <p className="eyebrow">Mi cuenta</p>
          <h1>{profile.display_name ?? user.email}</h1>
          <p>
            Aca quedan tus datos y, con el tiempo, las cosas que vayas haciendo
            dentro de Padres TEA Salta.
          </p>
        </div>

        <form action={publicLogoutAction}>
          <button className="button secondary" type="submit">
            Cerrar sesion
          </button>
        </form>
      </header>

      <section className="admin-grid" aria-label="Datos de cuenta">
        <article className="admin-card">
          <span>{accountTypeLabels[profile.account_type]}</span>
          <h2>Tipo de cuenta</h2>
          <p>
            No es lo mismo una familia que una organizacion. Por eso este dato
            nos ayuda a mostrarte lo que corresponde.
          </p>
        </article>

        <article className="admin-card">
          <span>{profile.locality ?? "-"}</span>
          <h2>Localidad</h2>
          <p>Nos sirve para acercar avisos y recursos de tu zona.</p>
        </article>

        <article className="admin-card">
          <span>{profile.phone ?? "-"}</span>
          <h2>Telefono</h2>
          <p>Lo usamos solo para temas vinculados a tu cuenta o consultas.</p>
        </article>

        <article className="admin-card">
          <span>{profile.whatsapp_group_opt_in ? "Si" : "No"}</span>
          <h2>Grupo WhatsApp</h2>
          <p>Tu preferencia para recibir novedades por WhatsApp.</p>
        </article>
      </section>

      <section className="admin-next">
        <div>
          <h2>Tu rincon dentro del sitio</h2>
          <p>
            Aca vamos a ir dejando tus consultas, actividades, publicaciones y
            movimientos vinculados a la asociacion.
          </p>
        </div>
      </section>
    </main>
  );
}
