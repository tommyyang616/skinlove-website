import type { MetadataRoute } from "next";

const BASIS = process.env.NEXT_PUBLIC_APP_URL || "https://skinlove-tattoo-piercing.at";

/**
 * Die KI-Crawler stehen hier einzeln drin, obwohl `*` sie ohnehin erlaubt.
 * Grund: Wird die Sternregel je verschaerft, sind sie weiter ausgenommen —
 * und wer die Datei liest, sieht, dass die Erlaubnis gewollt ist.
 *
 * OAI-SearchBot speist die Suche in ChatGPT, GPTBot das Training,
 * ChatGPT-User holt Seiten, wenn ein Nutzer im Chat danach fragt.
 */
const KI_CRAWLER = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
      ...KI_CRAWLER.map((bot) => ({ userAgent: bot, allow: "/", disallow: ["/admin"] })),
    ],
    sitemap: `${BASIS}/sitemap.xml`,
    host: BASIS,
  };
}
