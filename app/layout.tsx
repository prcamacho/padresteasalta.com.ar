import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Padres TEA Salta",
  description:
    "Espacio comunitario de orientacion, actividades y recursos para familias y personas con TEA en Salta.",
  metadataBase: new URL("https://padresteasalta.com.ar"),
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "500x500",
        type: "image/png"
      }
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "500x500",
        type: "image/png"
      }
    ]
  },
  openGraph: {
    title: "Padres TEA Salta",
    description:
      "Orientacion, actividades y recursos para familias y personas con TEA en Salta.",
    url: "/",
    siteName: "Padres TEA Salta",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/social/padres-tea-salta-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Familias reunidas en una actividad comunitaria de Padres TEA Salta"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Padres TEA Salta",
    description:
      "Orientacion, actividades y recursos para familias y personas con TEA en Salta.",
    images: ["/images/social/padres-tea-salta-preview.jpg"]
  }
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
