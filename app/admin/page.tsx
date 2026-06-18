import type { Metadata } from "next";
import Link from "next/link";

import { logoutAction } from "./login/actions";
import { requireAdmin } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Panel admin | Padres TEA Salta",
  description: "Panel de gestion de Padres TEA Salta."
};

export const dynamic = "force-dynamic";

const dashboardCards = [
  {
    key: "contact_inquiries",
    label: "Consultas",
    helper: "Mensajes que llegan por orientacion, actividades, directorio o sponsors."
  },
  {
    key: "activities",
    label: "Actividades",
    helper: "Charlas, encuentros y convocatorias para revisar o publicar.",
    href: "/admin/actividades"
  },
  {
    key: "directory_entries",
    label: "Directorio",
    helper: "Centros, recursos, aliados y emprendimientos familiares."
  },
  {
    key: "sponsor_campaigns",
    label: "Sponsors",
    helper: "Campanas o espacios patrocinados."
  }
] as const;

async function getCount(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  table: (typeof dashboardCards)[number]["key"]
) {
  const { count } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true });

  return count ?? 0;
}

export default async function AdminPage() {
  const { supabase, user, profile } = await requireAdmin();
  const counts = await Promise.all(
    dashboardCards.map((card) => getCount(supabase, card.key))
  );

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel administrador</p>
          <h1>Resumen del dia a dia</h1>
          <p>
            Sesion iniciada como {profile.display_name ?? user.email}. Desde
            aca se ve lo que hay que mirar.
          </p>
        </div>

        <form action={logoutAction}>
          <button className="button secondary" type="submit">
            Cerrar sesion
          </button>
        </form>
      </header>

      <section className="admin-grid" aria-label="Indicadores del panel">
        {dashboardCards.map((card, index) => {
          const cardContent = (
            <>
              <span>{counts[index]}</span>
              <h2>{card.label}</h2>
              <p>{card.helper}</p>
            </>
          );

          if ("href" in card) {
            return (
              <Link
                className="admin-card admin-card-link"
                href={card.href}
                key={card.key}
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <article className="admin-card" key={card.key}>
              {cardContent}
            </article>
          );
        })}
      </section>

      <section className="admin-next">
        <div>
          <h2>Para tener presente</h2>
          <p>
            Si la agenda esta al dia, las familias encuentran mas rapido lo que
            esta pasando.
          </p>
        </div>
      </section>
    </main>
  );
}
