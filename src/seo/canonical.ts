// Canonical URL helper.
// Strips tracking/campaign params (utm_*, fbclid, gclid, mc_*, _ga, ref, source, etc.)
// AND single-letter/short campaign markers we've seen indexed for livstreet.no
// (e.g. ?SD, ?MD, ?ND, ?NA, ?MA, ?SA from social/newsletter shares).
//
// Rule: any query param whose KEY is in TRACKING_KEYS, OR matches the short
// campaign-marker pattern (1-3 uppercase letters, no value), is removed.

const TRACKING_KEYS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "yclid",
  "dclid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "ref",
  "source",
  "src",
]);

// Matches keys like "SD", "MD", "ND", "NA", "MA", "SA" — short uppercase
// campaign markers used in social shares of livstreet.no.
const SHORT_CAMPAIGN_KEY = /^[A-Z]{1,3}$/;

export function stripTrackingParams(search: string): string {
  if (!search || search === "?") return "";
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const toDelete: string[] = [];
  params.forEach((_value, key) => {
    if (TRACKING_KEYS.has(key.toLowerCase())) {
      toDelete.push(key);
      return;
    }
    if (SHORT_CAMPAIGN_KEY.test(key)) {
      toDelete.push(key);
    }
  });
  toDelete.forEach((k) => params.delete(k));
  const out = params.toString();
  return out ? `?${out}` : "";
}

/**
 * Build the canonical path (path + cleaned query, no hash, no host).
 * Always preserves the leading slash. Does not touch trailing slash policy.
 */
export function buildCanonicalPath(path: string, search = ""): string {
  const cleanSearch = stripTrackingParams(search);
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${safePath}${cleanSearch}`;
}
