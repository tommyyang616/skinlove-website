import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://skinlove-website.vercel.app"),
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TattooParlor",
              name: "SkinLove Tattoo & Piercing",
              alternateName: "SkinLove",
              description: "Professionelles Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule.",
              url: "https://skinlove-website.vercel.app",
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
                { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" },
                { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "17:00" },
              ],
              image: "https://skinlove-website.vercel.app/images/og-image.jpg",
              priceRange: "€€",
              founder: { "@type": "Person", name: "Eve Paule" },
              sameAs: [
                "https://www.instagram.com/skinlove_tattoopiercing/",
                "https://www.facebook.com/skinlovetattoopiercing",
              ],
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.6", bestRating: "5", ratingCount: "14" },
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
      <body>{children}</body>
    </html>
  );
}
