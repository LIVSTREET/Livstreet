import { PRICING } from "@/lib/constants";

const SITE_URL = "https://livstreet.no";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Livstreet",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  email: "post@livstreet.no",
  telephone: "+47 45 25 12 80",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oslo",
    addressCountry: "NO",
  },
  description:
    "Livstreet lager bærekraftige gravplater i eik – et naturlig alternativ til stein.",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Livstreet",
  url: SITE_URL,
  inLanguage: "nb-NO",
};

// Product JSON-LD with offers — price must mirror what's shown on /bestill.
export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Gravplate i eik – Standard",
  description:
    "Personlig gravplate i eik. Lasergravering, valgfritt symbol og 1–2 navn inkludert.",
  brand: { "@type": "Brand", name: "Livstreet" },
  category: "Memorial",
  url: `${SITE_URL}/bestill`,
  image: `${SITE_URL}/og-image.jpg`,
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/bestill`,
    priceCurrency: "NOK",
    price: String(PRICING.BASE_PRICE),
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: "Livstreet" },
  },
};

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

interface ArticleMetaInput {
  title: string;
  description: string;
  path: string;
  image: string; // absolute or path-relative
  datePublished: string; // ISO date
  dateModified?: string;
}

export function buildArticleJsonLd(input: ArticleMetaInput) {
  const url = `${SITE_URL}${input.path}`;
  const image = input.image.startsWith("http")
    ? input.image
    : `${SITE_URL}${input.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Livstreet" },
    publisher: {
      "@type": "Organization",
      name: "Livstreet",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
    },
  };
}
