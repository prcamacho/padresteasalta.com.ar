import Link from "next/link";

import { siteNavItems } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="Ir al inicio">
          <span className="brand-mark" aria-hidden="true">
            TEA
          </span>
          <span>
            <strong>Padres TEA Salta</strong>
            <small>Red de apoyo comunitario</small>
          </span>
        </Link>

        <nav className="main-nav" aria-label="Navegacion principal">
          {siteNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
