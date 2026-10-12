import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceData, slugs } from "../data";
import ServicePageClient from "./ServicePageClient";
import { teilenMeta } from "@/lib/teilen-meta";

export function generateStaticParams() {
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.description,
    alternates: { canonical: `/leistungen/${slug}` },
    ...teilenMeta(service.metaTitle, service.description, `/leistungen/${slug}`),
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // Leistung mit Verweis auf das Studio (@id aus layout.tsx) und dem
  // Einzugsgebiet - so ordnet Google die Seite Wels und Linz zu.
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.h1,
    serviceType: service.title,
    description: service.description,
    url: `${base}/leistungen/${slug}`,
    provider: { "@id": `${base}/#studio` },
    areaServed: ["Marchtrenk", "Wels", "Linz", "Oberösterreich"],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: base },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: `${base}/leistungen` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${base}/leistungen/${slug}` },
    ],
  };

  // Die uebrigen Leistungen, damit jede Seite auf die anderen zeigt.
  // Google crawlt entlang von Links — vorher fuehrte von hier nur ein Weg
  // zurueck zur Startseite, und die schwachen Seiten wurden nie besucht.
  const weitere = slugs
    .filter((s) => s !== slug)
    .map((s) => ({ slug: s, titel: serviceData[s].title }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePageClient service={service} slug={slug} weitere={weitere} />
    </>
  );
}
