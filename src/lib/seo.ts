import type { Metadata } from "next";
import { locales, localeTags, ogLocales, type Locale } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";

// Builds canonical and hreflang alternates for a path that exists in every
// language, e.g. pageMetadata("en", "/properties", ...).
export function alternates(locale: Locale, path: string) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = absoluteUrl(`/${l}${suffix}`);
  languages["x-default"] = absoluteUrl(`/en${suffix}`);
  return { canonical: absoluteUrl(`/${locale}${suffix}`), languages };
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const alt = alternates(locale, path);
  return {
    title,
    description,
    alternates: alt,
    openGraph: {
      title,
      description,
      url: alt.canonical,
      siteName: site.name,
      locale: ogLocales[locale],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
