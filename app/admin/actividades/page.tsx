import type { Metadata } from "next";
import Link from "next/link";

import {
  formatAdminActivityLocation,
  formatAdminActivityModality,
  formatAdminActivitySchedule,
  formatAdminShortDate,
  getAdminActivities,
  getAdminActivityStatus
} from "@/lib/admin/activities";
import { requireAdmin } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Actividades | Panel admin",
  description: "Listado de actividades administrables."
};

export const dynamic = "force-dynamic";

export default async function AdminActivitiesPage() {
  const { supabase } = await requireAdmin();
  const { activities, errorMessage } = await getAdminActivities(supabase);
  const publishedCount = activities.filter(
    (activity) => activity.status === "published"
  ).length;
  const draftCount = activities.filter(
    (activity) => activity.status === "draft"
  ).length;
  const featuredCount = activities.filter(
    (activity) => activity.is_featured
  ).length;

  const stats = [
    { label: "Total", value: activities.length },
    { label: "Publicadas", value: publishedCount },
    { label: "Borradores", value: draftCount },
    { label: "Destacadas", value: featuredCount }
  ];

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link className="admin-back-link" href="/admin">
            Volver al panel
          </Link>
          <p className="eyebrow">Actividades</p>
          <h1>Agenda administrable</h1>
          <p>
            Listado operativo de encuentros, charlas y convocatorias guardadas
            en Supabase.
          </p>
        </div>

        <div className="admin-header-actions">
          <span className="button secondary admin-disabled-action">
            Crear actividad
          </span>
        </div>
      </header>

      <section className="admin-grid" aria-label="Resumen de actividades">
        {stats.map((stat) => (
          <article className="admin-card" key={stat.label}>
            <span>{stat.value}</span>
            <h2>{stat.label}</h2>
          </article>
        ))}
      </section>

      {errorMessage ? <p className="form-alert">{errorMessage}</p> : null}

      <section className="admin-panel" aria-labelledby="admin-activities-title">
        <div className="admin-panel-header">
          <div>
            <p className="eyebrow">Listado</p>
            <h2 id="admin-activities-title">Actividades cargadas</h2>
          </div>
          <span>{activities.length} registros</span>
        </div>

        {activities.length > 0 ? (
          <div className="admin-list">
            {activities.map((activity) => {
              const status = getAdminActivityStatus(activity);

              return (
                <article className="admin-list-item" key={activity.id}>
                  <div className="admin-list-main">
                    <div className="admin-title-row">
                      <h3>{activity.title}</h3>
                      <span
                        className={`admin-pill admin-pill-${status.tone}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <p>{activity.summary}</p>

                    <dl className="admin-meta-list">
                      <div>
                        <dt>Fecha</dt>
                        <dd>{formatAdminActivitySchedule(activity)}</dd>
                      </div>
                      <div>
                        <dt>Lugar</dt>
                        <dd>{formatAdminActivityLocation(activity)}</dd>
                      </div>
                      <div>
                        <dt>Modalidad</dt>
                        <dd>{formatAdminActivityModality(activity)}</dd>
                      </div>
                      <div>
                        <dt>Actualizada</dt>
                        <dd>{formatAdminShortDate(activity.updated_at)}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="admin-list-side">
                    <span className="admin-pill admin-pill-muted">
                      {activity.is_featured ? "Destacada" : "Normal"}
                    </span>
                    <span className="admin-slug">/{activity.slug}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="admin-empty">
            <h3>No hay actividades cargadas todavia</h3>
            <p>
              El listado ya esta conectado. El siguiente paso es sumar alta y
              edicion desde este mismo modulo.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
