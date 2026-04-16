const SITE_URL = "https://livstreet.no";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Livstreet",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
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

export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Gravplate i eik – Standard",
  description:
    "Personlig gravplate i eik. Lasergravering, valgfritt symbol og 1–2 navn inkludert.",
  brand: { "@type": "Brand", name: "Livstreet" },
  category: "Memorial / Gravplate",
  url: `${SITE_URL}/bestill`,
};
