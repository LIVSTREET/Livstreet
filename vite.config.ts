import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync, mkdirSync } from "fs";
import { componentTagger } from "lovable-tagger";

const SITE_URL = "https://livstreet.no";

// Keep in sync with src/seo/metadata.ts SITEMAP_ROUTES.
// Single source of truth for sitemap generation at build time.
const SITEMAP_ENTRIES: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/komponer", changefreq: "weekly", priority: "0.9" },
  { path: "/bestill", changefreq: "weekly", priority: "0.9" },
  { path: "/informasjon", changefreq: "monthly", priority: "0.7" },
  { path: "/informasjon/montering-vedlikehold", changefreq: "monthly", priority: "0.7" },
  { path: "/informasjon/miljovennlig", changefreq: "monthly", priority: "0.7" },
  { path: "/informasjon/symboler", changefreq: "monthly", priority: "0.7" },
  { path: "/informasjon/hva-skjer-etterpa", changefreq: "monthly", priority: "0.7" },
  { path: "/om-oss", changefreq: "monthly", priority: "0.7" },
  { path: "/kontakt", changefreq: "monthly", priority: "0.7" },
  { path: "/bilder", changefreq: "monthly", priority: "0.6" },
  { path: "/kvalitet-vedlikehold", changefreq: "monthly", priority: "0.6" },
  { path: "/personvern", changefreq: "yearly", priority: "0.3" },
  { path: "/kjopsvilkar", changefreq: "yearly", priority: "0.3" },
];

function buildSitemapXml(): string {
  const urls = SITEMAP_ENTRIES.map(
    (e) =>
      `  <url>\n    <loc>${SITE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

// Plugin: regenerate public/sitemap.xml in dev and emit to dist on build.
function sitemapPlugin(): Plugin {
  const xml = buildSitemapXml();
  return {
    name: "livstreet-sitemap",
    buildStart() {
      try {
        mkdirSync(path.resolve(__dirname, "public"), { recursive: true });
        writeFileSync(path.resolve(__dirname, "public/sitemap.xml"), xml);
      } catch {
        /* non-fatal */
      }
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: xml,
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
