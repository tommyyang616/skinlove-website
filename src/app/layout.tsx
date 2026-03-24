import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";

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
    default: "SkinLove Tattoo & Piercing | Marchtrenk bei Wels",
    template: "%s | SkinLove",
  },
  description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule – individuelle Körperkunst mit Herz.",
  keywords: ["Tattoo", "Piercing", "Permanent Make-up", "Lash Lifting", "Marchtrenk", "Wels", "Linz", "Oberösterreich", "Eve Paule", "SkinLove", "Tattoo Studio", "Fine Line Tattoo", "Kinderohrringe"],
  authors: [{ name: "Eve Paule" }],
  creator: "SkinLove Tattoo & Piercing",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SkinLove Tattoo & Piercing | Marchtrenk bei Wels",
    description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule – individuelle Körperkunst mit Herz.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "SkinLove Tattoo & Piercing" }],
    url: "/",
    type: "website",
    locale: "de_AT",
    siteName: "SkinLove Tattoo & Piercing",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinLove Tattoo & Piercing | Marchtrenk bei Wels",
    description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: { icon: "/favicon.ico" },
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
              name: "SkinLove Tattoo & Piercing",
              alternateName: "SkinLove",
              description: "Professionelles Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule.",
              url: process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at",
              telephone: "+436607835346",
              email: "eve@skinlove-tattoo-piercing.at",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Linzer Straße 35, 1. OG",
                addressLocality: "Marchtrenk",
                postalCode: "4614",
                addressRegion: "Oberösterreich",
                addressCountry: "AT",
              },
              geo: { "@type": "GeoCoordinates", latitude: 48.1916, longitude: 14.1168 },
              openingHoursSpecification: [
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
              ],
              image: `${process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at"}/images/og-image.jpg`,
              priceRange: "€€",
              founder: { "@type": "Person", name: "Eve Paule" },
              sameAs: [
                "https://www.instagram.com/skinlove_tattoopiercing/",
                "https://www.facebook.com/skinlovetattoopiercing",
                "https://www.tiktok.com/@skinlove_tattoopiercing",
              ],
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", bestRating: "5", ratingCount: "143" },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Leistungen",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tattoos", description: "Fine-Line, Black & Grey, Mandala, Watercolor, Cover-Ups" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Piercings", description: "Nase, Ohr, Surface, Bauchnabel, Oral, Lippe, Brustwarze, Intim" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Permanent Make-up", description: "Augenbrauen & Lippen" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lash & Brow Lifting", description: "Inkl. Färben & Keratin" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
