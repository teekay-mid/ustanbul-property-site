import { CategoryNav } from "@/components/CategoryNav";
import { ListingCard } from "@/components/ListingCard";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { listings } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/properties">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata(lang, "/properties", t.meta.propertiesTitle, t.meta.propertiesDescription);
}

export default async function Properties({ params }: PageProps<"/[lang]/properties">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">{t.meta.propertiesTitle}</h1>
      <div className="mt-6">
        <CategoryNav locale={lang} t={t.listing} />
      </div>
      <p className="mt-6 text-sm text-stone-600">
        {listings.length} {t.listing.count}
      </p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
        ))}
      </div>
    </div>
  );
}
