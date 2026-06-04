import Link from "next/link";

import type { SiteAction } from "@/data/site";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: SiteAction[];
};

export function PageIntro({
  eyebrow,
  title,
  description,
  actions = []
}: PageIntroProps) {
  return (
    <section className="page-intro">
      <div className="page-intro-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>

        {actions.length > 0 ? (
          <div className="intro-actions" aria-label="Acciones de la pagina">
            {actions.map((action) => (
              <Link
                key={action.href}
                className={`button ${action.variant ?? "secondary"}`}
                href={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
