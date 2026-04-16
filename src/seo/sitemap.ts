// Single source of truth for the public sitemap.
// All URLs come from ROUTE_META — to add a new page to the sitemap,
// add an entry to src/seo/metadata.ts (no manual list to maintain here).
import { ROUTE_META } from "./metadata";

const SITE_URL = "https://livstreet.no";

function changefreqForPath(path: string): string {
  if (path === "/") return "weekly";
  if (path === "/komponer" || path === "/bestill") return "weekly";
  if (path === "/personvern" || path === "/kjopsvilkar") return "yearly";
  return "monthly";
}

function priorityForPath(path: string): string {
  if (path === "/") return "1.0";
  if (path === "/komponer" || path === "/bestill") return "0.9";
  if (path === "/personvern" || path === "/kjopsvilkar") return "0.3";
  if (path === "/bilder" || path === "/kvalitet-vedlikehold") return "0.6";
  return "0.7";
}

export function buildSitemapXml(): string {
  const paths = Object.keys(ROUTE_META).sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  const urls = paths.map((p) => {
    const loc = `${SITE_URL}${p}`;
    return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreqForPath(p)}</changefreq>
    <priority>${priorityForPath(p)}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;
}
