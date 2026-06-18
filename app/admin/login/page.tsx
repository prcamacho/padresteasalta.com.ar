import type { Metadata } from "next";
import Link from "next/link";

import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Admin | Padres TEA Salta",
  description: "Ingreso al panel administrador."
};

const errorMessages: Record<string, string> = {
  "invalid-credentials": "Email o contrasena incorrectos.",
  "invalid-session": "No se pudo validar la sesion.",
  "missing-config": "Faltan variables publicas de Supabase.",
  "missing-fields": "Completa email y contrasena.",
  "not-authorized": "Tu usuario existe, pero no tiene permisos de administrador."
};

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams
}: AdminLoginPageProps) {
  const params = await searchParams;
  const error = params?.error ? errorMessages[params.error] : null;

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card" aria-labelledby="admin-login-title">
        <Link className="admin-back-link" href="/">
          Volver al sitio
        </Link>

        <div>
          <p className="eyebrow">Panel administrador</p>
          <h1 id="admin-login-title">Ingresar</h1>
          <p>
            Este acceso es para quienes ayudan a mantener el sitio al dia:
            actividades, contactos, consultas y espacios de apoyo.
          </p>
        </div>

        {error ? <p className="form-alert">{error}</p> : null}

        <form className="admin-form" action={loginAction}>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@ejemplo.com"
            />
          </label>

          <label>
            Contrasena
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          <button className="button primary" type="submit">
            Entrar al panel
          </button>
        </form>
      </section>
    </main>
  );
}
