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
            Este espacio va a concentrar consultas, propuestas, publicaciones y
            funciones habilitadas segun tu tipo de cuenta.
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
            Las funciones futuras se habilitaran segun corresponda a usuarios u
            organizaciones.
          </p>
        </article>

        <article className="admin-card">
          <span>{profile.locality ?? "-"}</span>
          <h2>Localidad</h2>
          <p>Nos ayuda a ordenar convocatorias y recursos por zona.</p>
        </article>

        <article className="admin-card">
          <span>{profile.phone ?? "-"}</span>
          <h2>Telefono</h2>
          <p>Dato de contacto para comunicaciones vinculadas a la cuenta.</p>
        </article>

        <article className="admin-card">
          <span>{profile.whatsapp_group_opt_in ? "Si" : "No"}</span>
          <h2>Grupo WhatsApp</h2>
          <p>Preferencia inicial para comunicaciones comunitarias.</p>
        </article>
      </section>

      <section className="admin-next">
        <div>
          <h2>Funciones proximas</h2>
          <p>
            Desde aca se podran enviar consultas, proponer actividades, cargar
            emprendimientos o centros, contratar espacios patrocinados y revisar
            el historial de operaciones segun el rol de la cuenta.
          </p>
        </div>
      </section>
    </main>
  );
}
