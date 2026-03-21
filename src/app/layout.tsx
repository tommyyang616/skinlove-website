import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skinlove-website.vercel.app"),
  title: "SkinLove Tattoo & Piercing – Marchtrenk",
  description:
    "Dein Studio für Tattoo, Piercing, Permanent Make-up & Microblading in Marchtrenk. Professionell, hygienisch, mit Herz. Inhaberin: Eve Paule.",
  keywords: [
    "Tattoo",
    "Piercing",
    "Microblading",
    "Permanent Make-up",
    "Marchtrenk",
    "Oberösterreich",
    "SkinLove",
    "Eve Paule",
    "Tattoo Studio",
    "Workshop",
  ],
  openGraph: {
    title: "SkinLove Tattoo & Piercing – Marchtrenk",
    description:
      "Dein Studio für Tattoo, Piercing, Permanent Make-up & Microblading in Marchtrenk.",
    url: "https://skinlove-website.vercel.app",
    siteName: "SkinLove Tattoo & Piercing",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SkinLove Tattoo & Piercing Studio",
      },
    ],
    locale: "de_AT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkinLove Tattoo & Piercing – Marchtrenk",
    description:
      "Dein Studio für Tattoo, Piercing, Permanent Make-up & Microblading in Marchtrenk.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${inter.variable} ${outfit.variable}`}
    >
      <body className="font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
