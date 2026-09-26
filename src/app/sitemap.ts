import type { MetadataRoute } from "next";
import { districts } from "@/lib/districts";
import { locales, localeTags } from "@/lib/i18n";
import { listings } from "@/lib/listings";
import { absoluteUrl } from "@/lib/site";

function entry(path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [localeTags[l], absoluteUrl(`/${l}${path}`)]),
  );
  languages["x-default"] = absoluteUrl(`/en${path}`);
  return locales.map((l) => ({
    url: absoluteUrl(`/${l}${path}`),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("", 1),
    ...entry("/properties", 0.9),
    ...entry("/citizenship", 0.8),
    ...entry("/about", 0.5),
    ...entry("/contact", 0.6),
    ...districts.flatMap((d) => entry(`/districts/${d.slug}`, 0.8)),
    ...listings
      .filter((l) => !l.sample)
      .flatMap((l) => entry(`/properties/${l.slug}`, 0.7, l.updatedAt)),
  ];
}
