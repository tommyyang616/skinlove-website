import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkinLove Tattoo & Piercing | Marchtrenk bei Wels",
  description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule – individuelle Körperkunst mit Herz.",
  openGraph: {
    title: "SkinLove Tattoo & Piercing | Marchtrenk bei Wels",
    description: "Tattoo, Piercing, Permanent Make-up & Lash Lifting in Marchtrenk bei Wels. Inhaberin Eve Paule – individuelle Körperkunst mit Herz.",
    images: ["https://skinlove-website.vercel.app/images/og-image.jpg"],
    url: "https://skinlove-website.vercel.app/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
