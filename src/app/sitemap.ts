import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-website-one.vercel.app";
  const services = ["tattoos", "piercings", "permanent-make-up", "lash-brow-lifting", "kinderohrringe", "spezialleistungen"];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/leistungen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    ...services.map((slug) => ({
      url: `${base}/leistungen/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];
}
