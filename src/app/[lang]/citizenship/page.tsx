import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { listings } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/citizenship">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata(lang, "/citizenship", t.meta.citizenshipTitle, t.meta.citizenshipDescription);
}

export default async function Citizenship({ params }: PageProps<"/[lang]/citizenship">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const eligible = listings.filter((l) => l.citizenshipEligible && l.status !== "sold");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.citizenship.heading,
          step: t.citizenship.steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
        }}
      />
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-navy">{t.citizenship.heading}</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">{t.citizenship.intro}</p>
        <h2 className="mt-10 text-xl font-semibold">{t.citizenship.stepsTitle}</h2>
        <ol className="mt-4 list-decimal space-y-2 ps-6 text-stone-700">
          {t.citizenship.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-6 rounded-lg bg-stone-100 p-4 text-sm text-stone-700">{t.citizenship.note}</p>
      </div>
      <h2 className="mt-12 text-2xl font-semibold text-navy">{t.citizenship.cta}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {eligible.map((l) => (
          <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
        ))}
      </div>
    </div>
  );
}
