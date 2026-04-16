import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync, mkdirSync } from "fs";
import { componentTagger } from "lovable-tagger";
import { buildSitemapXml } from "./src/seo/sitemap";

// Plugin: regenerate public/sitemap.xml in dev and emit to dist on build.
// All URLs come from src/seo/metadata.ts ROUTE_META (single source of truth).
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
