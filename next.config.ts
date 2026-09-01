import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Bilder laufen seit dem 01.09.2026 an Vercels Optimierer vorbei — die
     * Begründung samt Messwerten steht in `src/lib/bild-loader.ts`. Kurz: Das
     * Bildkontingent des Kontos war aufgebraucht, `/_next/image` antwortete mit
     * `402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED`, und auf der Startseite
     * fehlten die Bilder der Gasttätowierer.
     */
    loader: "custom",
    loaderFile: "./src/lib/bild-loader.ts",
    /*
     * `formats` ist damit wirkungslos — es steuert Vercels Umrechnung, und die
     * findet nicht mehr statt. Bewusst entfernt statt stehen gelassen: Eine
     * Einstellung, die nichts mehr tut, liest der Nächste als Zusage.
     *
     * `remotePatterns` bleibt dagegen stehen. Mit eigenem Loader prüft Next die
     * Adressen zwar nicht mehr, aber es ist die Liste der Hosts, von denen
     * Bilder überhaupt stammen dürfen — und sie gilt wieder ab dem Tag, an dem
     * `loaderFile` oben verschwindet.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "myhellocash.com",
        pathname: "/img/**",
      },
    ],
  },
  async redirects() {
    return [
      // Old URLs still indexed by Google → redirect to new structure
      { source: "/preise", destination: "/#pricing", permanent: true },
      { source: "/galerie", destination: "/#gallery", permanent: true },
      { source: "/kontakt", destination: "/#contact", permanent: true },
      { source: "/bewertungen", destination: "/#reviews", permanent: true },
      // Old HelloCash service pages
      { source: "/tattoo", destination: "/leistungen/tattoos", permanent: true },
      { source: "/piercing", destination: "/leistungen/piercings", permanent: true },
      { source: "/permanent-makeup", destination: "/leistungen/permanent-make-up", permanent: true },
      { source: "/lash-lifting", destination: "/leistungen/lash-brow-lifting", permanent: true },
    ];
  },
};

export default nextConfig;
