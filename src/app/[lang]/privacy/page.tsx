import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return { ...pageMetadata(lang, "/privacy", t.meta.privacyTitle, t.privacy.text), robots: { index: false } };
}

export default async function Privacy({ params }: PageProps<"/[lang]/privacy">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">{t.privacy.heading}</h1>
      <p className="mt-4 leading-relaxed text-stone-700">{t.privacy.text}</p>
    </div>
  );
}
