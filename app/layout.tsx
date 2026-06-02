import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Padres TEA Salta",
  description:
    "Plataforma comunitaria de orientacion, actividades y recursos para familias y personas con TEA en Salta.",
  metadataBase: new URL("https://padresteasalta.com.ar")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
