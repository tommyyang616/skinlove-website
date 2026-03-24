import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
      { source: "/ueber-mich", destination: "/#about", permanent: true },
      { source: "/bewertungen", destination: "/#reviews", permanent: true },
      // Old HelloCash service pages
      { source: "/tattoo", destination: "/leistungen/tattoos", permanent: true },
      { source: "/piercing", destination: "/leistungen/piercings", permanent: true },
      { source: "/permanent-makeup", destination: "/leistungen/permanent-make-up", permanent: true },
      { source: "/lash-lifting", destination: "/leistungen/lash-brow-lifting", permanent: true },
      { source: "/workshops", destination: "/#workshop", permanent: true },
    ];
  },
};

export default nextConfig;
