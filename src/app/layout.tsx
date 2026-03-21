import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkinLove – Tattoo, Piercing & Lash Lifting | Marchtrenk",
  description: "Professionelles Tattoo, Piercing und Lash Lifting bei Eve Paule in Marchtrenk, OÖ. Terminbuchung via WhatsApp.",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
