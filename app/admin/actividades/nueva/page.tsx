import type { Metadata } from "next";
import Link from "next/link";

import { createActivityAction } from "../actions";
import { ActivityForm } from "@/components/admin/ActivityForm";
import { requireAdmin } from "@/lib/supabase/auth-server";

export const metadata: Metadata = {
  title: "Nueva actividad | Panel admin",
  description: "Crear una actividad en el panel administrador."
};

export const dynamic = "force-dynamic";

type NewActivityPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const errorMessages: Record<string, string> = {
  "invalid-date": "Revisa las fechas ingresadas.",
  "invalid-range": "La fecha de fin no puede ser anterior al inicio.",
  "invalid-url": "El link de inscripcion debe empezar con http:// o https://.",
  "missing-required": "Completa titulo y resumen para guardar la actividad.",
  "save-failed": "No pudimos guardar la actividad. Intentalo nuevamente."
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function NewActivityPage({
  searchParams
}: NewActivityPageProps) {
  await requireAdmin();
  const params = searchParams ? await searchParams : {};
  const error = getParam(params.error);

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <Link className="admin-back-link" href="/admin/actividades">
            Volver a actividades
          </Link>
          <p className="eyebrow">Actividades</p>
          <h1>Nueva actividad</h1>
          <p>
            Si falta revisar algun dato, dejala como borrador. Cuando este
            lista, publicala.
          </p>
        </div>
      </header>

      <section className="admin-panel" aria-labelledby="new-activity-title">
        <div className="admin-panel-header">
          <div>
            <p className="eyebrow">Carga</p>
            <h2 id="new-activity-title">Datos de la actividad</h2>
          </div>
        </div>

        {error ? (
          <p className="form-alert">
            {errorMessages[error] ?? errorMessages["save-failed"]}
          </p>
        ) : null}

        <ActivityForm
          action={createActivityAction}
          submitLabel="Guardar actividad"
        />
      </section>
    </main>
  );
}
