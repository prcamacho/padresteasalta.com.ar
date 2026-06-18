import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateActivityAction } from "../actions";
import { ActivityForm } from "@/components/admin/ActivityForm";
import { getAdminActivityById } from "@/lib/admin/activities";
import { requireAdmin } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Editar actividad | Panel admin",
  description: "Editar una actividad en el panel administrador."
};

export const dynamic = "force-dynamic";

type EditActivityPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const errorMessages: Record<string, string> = {
  "invalid-date": "Revisa las fechas ingresadas.",
  "invalid-range": "La fecha de fin no puede ser anterior al inicio.",
  "invalid-url": "El link de inscripcion tiene que empezar con http:// o https://.",
  "missing-required": "Completa titulo y resumen para guardar la actividad.",
  "save-failed": "No pudimos guardar los cambios. Intentalo nuevamente."
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function EditActivityPage({
  params,
  searchParams
}: EditActivityPageProps) {
  const { id } = await params;
  const queryParams = searchParams ? await searchParams : {};
  const { supabase } = await requireAdmin();
  const { activity, errorMessage } = await getAdminActivityById(supabase, id);
  const error = getParam(queryParams.error);

  if (!activity && !errorMessage) {
    notFound();
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link className="admin-back-link" href="/admin/actividades">
            Volver a actividades
          </Link>
          <p className="eyebrow">Actividades</p>
          <h1>Editar actividad</h1>
          <p>
            Dale una mirada tranquila antes de guardar. Si cambias el titulo,
            tambien se acomoda el link interno de la actividad.
          </p>
        </div>
      </header>

      <section className="admin-panel" aria-labelledby="edit-activity-title">
        <div className="admin-panel-header">
          <div>
            <p className="eyebrow">Edicion</p>
            <h2 id="edit-activity-title">
              {activity?.title ?? "No encontramos esta actividad"}
            </h2>
          </div>
        </div>

        {errorMessage ? <p className="form-alert">{errorMessage}</p> : null}

        {error ? (
          <p className="form-alert">
            {errorMessages[error] ?? errorMessages["save-failed"]}
          </p>
        ) : null}

        {activity ? (
          <ActivityForm
            action={updateActivityAction.bind(null, activity.id)}
            activity={activity}
            cancelHref="/admin/actividades"
            submitLabel="Guardar cambios"
          />
        ) : null}
      </section>
    </main>
  );
}
