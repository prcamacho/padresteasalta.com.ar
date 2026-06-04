import Link from "next/link";

import { siteNavItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">Padres TEA Salta</p>
        <p>Plataforma comunitaria en construccion.</p>
      </div>

      <p className="footer-credit">
        Tecnologia de{" "}
        <a
          href="https://www.instagram.com/utana_dev/"
          target="_blank"
          rel="noreferrer"
        >
          Utana
        </a>
      </p>

      <nav aria-label="Navegacion secundaria">
        {siteNavItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
