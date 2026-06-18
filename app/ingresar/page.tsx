import type { Metadata } from "next";
import Link from "next/link";

import { publicLoginAction } from "./actions";
import { getSafeNextPath } from "@/lib/account/redirects";

export const metadata: Metadata = {
  title: "Ingresar | Padres TEA Salta",
  description: "Ingreso para usuarios registrados de Padres TEA Salta."
};

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const errorMessages: Record<string, string> = {
  "invalid-credentials": "Email o contrasena incorrectos.",
  "missing-config": "Faltan variables publicas de Supabase.",
  "missing-fields": "Completa email y contrasena.",
  profile: "No pudimos encontrar tu perfil. Intenta ingresar nuevamente."
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const next = getSafeNextPath(getParam(params.next) ?? null);
  const error = getParam(params.error);
  const registered = getParam(params.registered) === "1";

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="admin-back-link" href="/">
          Volver al sitio
        </Link>

        <div>
          <p className="eyebrow">Cuenta</p>
          <h1 id="login-title">Ingresar</h1>
          <p>
            Accede para usar las funciones disponibles ahora y las que se
            habiliten segun tu tipo de cuenta.
          </p>
        </div>

        {registered ? (
          <p className="form-success">
            Cuenta creada. Ya podes ingresar con tu email y contrasena.
          </p>
        ) : null}

        {error ? (
          <p className="form-alert">
            {errorMessages[error] ?? errorMessages["invalid-credentials"]}
          </p>
        ) : null}

        <form className="admin-form" action={publicLoginAction}>
          <input name="next" type="hidden" value={next} />

          <label>
            Email
            <input
              autoComplete="email"
              name="email"
              placeholder="tu@email.com"
              required
              type="email"
            />
          </label>

          <label>
            Contrasena
            <input
              autoComplete="current-password"
              name="password"
              required
              type="password"
            />
          </label>

          <button className="button primary" type="submit">
            Ingresar
          </button>
        </form>

        <p className="auth-switch">
          Todavia no tenes cuenta?{" "}
          <Link href={`/registro?next=${encodeURIComponent(next)}`}>
            Registrarme
          </Link>
        </p>
      </section>
    </main>
  );
}
