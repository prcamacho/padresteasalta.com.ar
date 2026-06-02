const navItems = [
  { label: "Orientacion", href: "#orientacion" },
  { label: "Actividades", href: "#actividades" },
  { label: "Directorio", href: "#directorio" },
  { label: "Colaborar", href: "#colaborar" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Ir al inicio">
        <span className="brand-mark" aria-hidden="true">
          TEA
        </span>
        <span>
          <strong>Padres TEA Salta</strong>
          <small>Red de apoyo comunitario</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Navegacion principal">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
