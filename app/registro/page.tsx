import type { Metadata } from "next";
import Link from "next/link";

import { registerAccountAction } from "./actions";
import { getSafeNextPath } from "@/lib/account/redirects";

export const metadata: Metadata = {
  title: "Registro | Padres TEA Salta",
  description:
    "Crear una cuenta en Padres TEA Salta."
};

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const errorMessages: Record<string, string> = {
  "adult-required": "El registro es solo para personas mayores de edad.",
  "missing-fields": "Completa todos los campos obligatorios.",
  "password-mismatch": "Las contrasenas no coinciden.",
  "privacy-required": "Debes aceptar la politica de privacidad.",
  "signup-failed": "No pudimos crear la cuenta. Revisa los datos ingresados.",
  "weak-password": "La contrasena necesita al menos 8 caracteres."
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : {};
  const next = getSafeNextPath(getParam(params.next) ?? null);
  const error = getParam(params.error);

  return (
    <main className="auth-page auth-page-wide">
      <section className="auth-card auth-card-wide" aria-labelledby="register-title">
        <Link className="admin-back-link" href="/">
          Volver al sitio
        </Link>

        <div>
          <p className="eyebrow">Registro</p>
          <h1 id="register-title">Crear cuenta</h1>
          <p>
            Podes entrar como persona o como organizacion. Si despues queres
            publicar algo o pedir un espacio, capaz te pedimos algun dato mas
            para que todo quede claro.
          </p>
        </div>

        {error ? (
          <p className="form-alert">
            {errorMessages[error] ?? errorMessages["signup-failed"]}
          </p>
        ) : null}

        <form className="admin-form admin-form-wide" action={registerAccountAction}>
          <input name="next" type="hidden" value={next} />

          <div className="admin-form-grid">
            <label className="admin-field-full">
              Nombre
              <input
                autoComplete="name"
                maxLength={120}
                name="display_name"
                placeholder="Tu nombre o el de la organizacion"
                required
                type="text"
              />
            </label>

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
              Tipo de cuenta
              <select defaultValue="user" name="account_type">
                <option value="user">Usuario</option>
                <option value="organization">Organizacion</option>
              </select>
            </label>

            <label>
              Localidad
              <input
                autoComplete="address-level2"
                maxLength={100}
                name="locality"
                placeholder="Salta Capital, Cerrillos, Oran..."
                required
                type="text"
              />
            </label>

            <label>
              Telefono
              <input
                autoComplete="tel"
                maxLength={40}
                name="phone"
                placeholder="Un numero donde podamos escribirte"
                required
                type="tel"
              />
            </label>

            <label>
              Contrasena
              <input
                autoComplete="new-password"
                minLength={8}
                name="password"
                required
                type="password"
              />
            </label>

            <label>
              Repetir contrasena
              <input
                autoComplete="new-password"
                minLength={8}
                name="password_confirm"
                required
                type="password"
              />
            </label>
          </div>

          <div className="auth-checks">
            <label className="admin-checkbox">
              <input name="whatsapp_group_opt_in" type="checkbox" />
              <span>Quiero que me sumen al grupo de WhatsApp de Padres TEA.</span>
            </label>

            <label className="admin-checkbox">
              <input name="adult_confirmed" required type="checkbox" />
              <span>Confirmo que soy mayor de edad.</span>
            </label>

            <label className="admin-checkbox">
              <input name="privacy_terms_accepted" required type="checkbox" />
              <span>
                Lei y acepto la{" "}
                <Link href="/privacidad" target="_blank">
                  politica de privacidad y uso de datos
                </Link>
                .
              </span>
            </label>
          </div>

          <button className="button primary" type="submit">
            Crear cuenta
          </button>
        </form>

        <p className="auth-switch">
          Ya tenes cuenta?{" "}
          <Link href={`/ingresar?next=${encodeURIComponent(next)}`}>
            Ingresar
          </Link>
        </p>
      </section>
    </main>
  );
}
