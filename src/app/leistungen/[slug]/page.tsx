import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceData, slugs } from "../data";
import ServicePageClient from "./ServicePageClient";

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
    openGraph: {
      title: service.metaTitle,
      description: service.description,
      url: `/leistungen/${slug}`,
      type: "website",
    },
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageClient service={service} slug={slug} />
    </>
  );
}
