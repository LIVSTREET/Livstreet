import { Helmet } from "react-helmet-async";

const SITE_URL = "https://livstreet.no";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  noindex?: boolean;
  skipCanonical?: boolean;
  omitOgUrl?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SeoHead({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  skipCanonical = false,
  omitOgUrl = false,
  jsonLd,
}: SeoHeadProps) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_OG_IMAGE;

  const fullTitle = title.includes("Livstreet") ? title : `${title} | Livstreet`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {!skipCanonical && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {!omitOgUrl && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="nb_NO" />
      <meta property="og:site_name" content="Livstreet" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((node, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(node)}
          </script>
        ))}
    </Helmet>
  );
}
