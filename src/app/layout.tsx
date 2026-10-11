import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at"),
  title: {
    default: "Tattoo- & Piercingstudio Marchtrenk bei Wels & Linz | SkinLove",
    template: "%s | SkinLove",
  },
  description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels \u2013 von Eve Paule. Fine-Line, Cover-Ups, Kinderohrringe. Termin einfach online anfragen.",
  keywords: ["Tattoo", "Piercing", "Permanent Make-up", "Lash Lifting", "Marchtrenk", "Wels", "Linz", "Ober\u00F6sterreich", "Eve Paule", "SkinLove", "Tattoo Studio", "Fine Line Tattoo", "Kinderohrringe", "Gastt\u00E4towierer", "Tattoo Workshop"],
  authors: [{ name: "Eve Paule" }],
  creator: "SkinLove Tattoo & Piercing",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SkinLove – Tattoo- & Piercingstudio zwischen Wels und Linz",
    description: "Tattoo, Piercing, Permanent Make-up, Lash Lifting und Kinderohrringe in Marchtrenk \u2013 rund zehn Minuten von Wels, 20 von Linz. Von Eve Paule.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "SkinLove Tattoo & Piercing" }],
    url: "/",
    type: "website",
    locale: "de_AT",
    siteName: "SkinLove Tattoo & Piercing",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinLove – Tattoo- & Piercingstudio zwischen Wels und Linz",
    description: "Tattoo, Piercing, Permanent Make-up, Lash Lifting und Kinderohrringe in Marchtrenk \u2013 rund zehn Minuten von Wels, 20 von Linz. Von Eve Paule.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#BB3599",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-AT" className={`${inter.variable} ${cormorant.variable} ${outfit.variable}`}>
      <head>
        <meta name="google-site-verification" content="6yq00dU1qxKw-0D8xhAY9LVLDljmd4V2yhkABzoNa8E" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TattooParlor",
              "@id": `${baseUrl}/#studio`,
              name: "SkinLove Tattoo & Piercing",
              alternateName: "SkinLove",
              description: "Tattoo- und Piercingstudio in Marchtrenk zwischen Wels und Linz: Tattoos, Piercings, Permanent Make-up, Lash & Brow Lifting, Kinderohrringe sowie Tattoo- und Piercing-Kurse. Inhaberin Eve Paule.",
              url: baseUrl,
              telephone: "+436607835346",
              email: "eve@skinlove-tattoo-piercing.at",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Linzer Stra\u00DFe 35, 1. OG",
                addressLocality: "Marchtrenk",
                postalCode: "4614",
                addressRegion: "Ober\u00F6sterreich",
                addressCountry: "AT",
              },
              geo: { "@type": "GeoCoordinates", latitude: 48.1916, longitude: 14.1168 },
              // Einzugsgebiet laut /anfahrt - echte Fahrzeiten, keine Wunschliste
              areaServed: [
                ...["Marchtrenk", "Wels", "Linz", "Traun", "Leonding", "H\u00F6rsching", "Pasching", "Gunskirchen"].map((name) => ({ "@type": "City", name })),
                { "@type": "AdministrativeArea", name: "Ober\u00F6sterreich" },
              ],
              image: `${baseUrl}/images/og-image.jpg`,
              priceRange: "\u20AC\u20AC",
              founder: { "@type": "Person", name: "Eve Paule" },
              sameAs: [
                "https://www.instagram.com/skinlove_tattoopiercing/",
                "https://www.facebook.com/skinlovetattoopiercing",
                "https://www.tiktok.com/@eveskinlovetattoo",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Leistungen",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tattoos", url: `${baseUrl}/leistungen/tattoos`, description: "Fine-Line, Black & Grey, Mandala, Watercolor, Cover-Ups" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Piercings", url: `${baseUrl}/leistungen/piercings`, description: "Nase, Ohr, Surface, Bauchnabel, Oral, Lippe, Brustwarze, Intim" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Make-up", url: `${baseUrl}/leistungen/permanent-make-up`, description: "Augenbrauen & Lippen" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lash & Brow Lifting", url: `${baseUrl}/leistungen/lash-brow-lifting`, description: "Inkl. F\u00E4rben & Keratin" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kinderohrringe", url: `${baseUrl}/leistungen/kinderohrringe`, description: "Ohrl\u00F6cher stechen f\u00FCr Kinder mit dem Studex-System, ab 6 Monaten" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spezialleistungen", url: `${baseUrl}/leistungen/spezialleistungen`, description: "Wildfleischbehandlung, Dermal-Anker-Entfernung, Piercing-Korrekturen" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tattoo- und Piercing-Kurse", url: `${baseUrl}/workshops`, description: "T\u00E4towieren und Piercen lernen in kleinen Gruppen" } },
                ],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SiteNavigationElement",
                  name: "Über mich",
                  description: "Lerne Eve Paule kennen – Gründerin & Tattoo-Künstlerin",
                  url: `${baseUrl}/ueber-mich`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Leistungen",
                  description: "Tattoos, Piercings, Permanent Make-up, Lash & Brow Lifting",
                  url: `${baseUrl}/leistungen`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Gasttätowierer",
                  description: "Internationale Guest Artists bei SkinLove",
                  url: `${baseUrl}/gasttatowierer`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Workshops",
                  description: "Tattoo-Kurs & Piercing-Kurs – tätowieren und piercen lernen",
                  url: `${baseUrl}/workshops`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Impressum",
                  description: "Impressum – SkinLove Tattoo & Piercing",
                  url: `${baseUrl}/impressum`,
                },
                {
                  "@type": "SiteNavigationElement",
                  name: "Datenschutz",
                  description: "Datenschutzerklärung – SkinLove Tattoo & Piercing",
                  url: `${baseUrl}/datenschutz`,
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
