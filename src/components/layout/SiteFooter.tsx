import Image from "next/image";
import Link from "next/link";

import { siteNavItems } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-identity">
        <span className="footer-logo-wrap" aria-hidden="true">
          <Image
            src="/images/asociacion/logo-padres-tea-salta.png"
            alt=""
            width={92}
            height={92}
          />
        </span>
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
        <Link href="/privacidad">Privacidad</Link>
      </nav>
    </footer>
  );
}
