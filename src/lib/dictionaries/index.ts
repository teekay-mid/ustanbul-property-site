import type { Locale } from "@/lib/i18n";
import ar from "./ar";
import en, { type Dictionary } from "./en";
import ru from "./ru";
import tr from "./tr";

const dictionaries: Record<Locale, Dictionary> = { en, tr, ar, ru };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

export type { Dictionary };
