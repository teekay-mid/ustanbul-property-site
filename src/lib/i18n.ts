export const locales = ["en", "tr", "ar", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  ar: "العربية",
  ru: "Русский",
};

// BCP 47 tags used in <html lang>, hreflang and Open Graph.
export const localeTags: Record<Locale, string> = {
  en: "en",
  tr: "tr-TR",
  ar: "ar",
  ru: "ru",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_GB",
  tr: "tr_TR",
  ar: "ar_AR",
  ru: "ru_RU",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
