import type { Metadata } from "next";
import Link from "next/link";

import { logoutAction } from "./login/actions";
import { requireAdmin } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Panel admin | Padres TEA Salta",
  description: "Panel administrador de la plataforma."
};

export const dynamic = "force-dynamic";

const dashboardCards = [
  {
    key: "contact_inquiries",
    label: "Consultas",
    helper: "Entrantes por orientacion, directorio, actividades o sponsors."
  },
  {
    key: "activities",
    label: "Actividades",
    helper: "Agenda administrable de encuentros y convocatorias.",
    href: "/admin/actividades"
  },
  {
    key: "directory_entries",
    label: "Directorio",
    helper: "Centros, recursos, empresas y emprendimientos."
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
          <h1>Resumen operativo</h1>
          <p>
            Sesion iniciada como {profile.display_name ?? user.email}. Este es
            el punto de partida para sumar CRUDs reales.
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
          <h2>Proximo incremento recomendado</h2>
          <p>
            Crear el CRUD de actividades: es el modulo mas visible, de bajo
            riesgo y valida el flujo completo de admin a web publica.
          </p>
        </div>
      </section>
    </main>
  );
}
