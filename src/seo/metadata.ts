// Single source of truth for per-route SEO metadata.
// Keep titles < 60 chars, descriptions < 160 chars.

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
}

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    path: "/",
    title: "Gravplate i eik – bærekraftig minneplate | Livstreet",
    description:
      "Vakre, håndlagde gravplater i eik. Et naturlig og bærekraftig alternativ til stein. Design din egen og få en personlig minneplate.",
  },
  "/komponer": {
    path: "/komponer",
    title: "Design din egen gravplate – konfigurator",
    description:
      "Komponer en personlig gravplate i eik. Velg navn, datoer, symboler og ramme – se resultatet med en gang.",
  },
  "/bestill": {
    path: "/bestill",
    title: "Bestill gravplate i eik – pris og levering",
    description:
      "Bestill din personlige gravplate i eik. Standard størrelse, lasergravering og valgfritt symbol inkludert.",
  },
  "/informasjon": {
    path: "/informasjon",
    title: "Informasjon og artikler om gravplater i tre",
    description:
      "Les om montering, vedlikehold, bærekraft, symboler og prosessen bak en gravplate i eik fra Livstreet.",
  },
  "/informasjon/montering-vedlikehold": {
    path: "/informasjon/montering-vedlikehold",
    title: "Montering og vedlikehold av gravplate i tre",
    description:
      "Slik monterer og vedlikeholder du en gravplate i eik. Enkle steg for et varig og verdig minne.",
  },
  "/informasjon/miljovennlig": {
    path: "/informasjon/miljovennlig",
    title: "Miljøvennlige gravplater – tre vs stein",
    description:
      "Hvorfor en gravplate i tre er et bærekraftig valg sammenlignet med tradisjonell gravstein.",
  },
  "/informasjon/symboler": {
    path: "/informasjon/symboler",
    title: "Symboler på gravminner – betydning og tradisjon",
    description:
      "Lær om betydningen av ulike symboler på gravplater – fra livets tre til kristne symboler.",
  },
  "/informasjon/hva-skjer-etterpa": {
    path: "/informasjon/hva-skjer-etterpa",
    title: "Etter bestilling – prosessen steg for steg",
    description:
      "En trygg prosess: slik foregår design, godkjenning, produksjon og levering av din gravplate.",
  },
  "/om-oss": {
    path: "/om-oss",
    title: "Om Livstreet – håndverk med omtanke",
    description:
      "Livstreet lager bærekraftige gravplater i eik med håndverk, omtanke og naturlige materialer.",
  },
  "/kontakt": {
    path: "/kontakt",
    title: "Kontakt Livstreet – vi svarer raskt",
    description:
      "Ta kontakt med Livstreet. Vi svarer vanligvis innen 24 timer på e-post eller telefon.",
  },
  "/bilder": {
    path: "/bilder",
    title: "Bilder av gravplater i eik – galleri",
    description:
      "Se bilder av våre gravplater i eik i naturlige omgivelser. Inspirasjon til ditt eget minne.",
  },
  "/personvern": {
    path: "/personvern",
    title: "Personvernerklæring",
    description:
      "Slik behandler Livstreet personopplysninger i tråd med GDPR og norsk lov.",
  },
  "/kjopsvilkar": {
    path: "/kjopsvilkar",
    title: "Salgs- og kjøpsvilkår",
    description:
      "Salgsbetingelser for kjøp hos Livstreet, i samsvar med norsk forbrukerlovgivning.",
  },
  "/kvalitet-vedlikehold": {
    path: "/kvalitet-vedlikehold",
    title: "Kvalitet og vedlikehold av gravplate i eik",
    description:
      "Hva du kan forvente av kvalitet og vedlikehold på en gravplate i eik fra Livstreet.",
  },
};

// Routes that should be in the public sitemap.
export const SITEMAP_ROUTES = Object.keys(ROUTE_META);
