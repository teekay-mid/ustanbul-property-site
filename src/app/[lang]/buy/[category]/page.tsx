import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/CategoryNav";
import { ListingCard } from "@/components/ListingCard";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { categories, listingsByCategory, type Category } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/buy/[category]">) {
  const { lang, category } = (await params) as { lang: Locale; category: Category };
  const t = getDictionary(lang);
  const title = t.listing.categoryTitles[category];
  return {
    ...pageMetadata(lang, `/buy/${category}`, title, `${title}. ${t.meta.propertiesDescription}`),
    // Keep empty categories out of search results until they have listings.
    robots: listingsByCategory(category).length ? undefined : { index: false },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/buy/[category]">) {
  const { lang, category } = (await params) as { lang: Locale; category: Category };
  if (!categories.includes(category)) notFound();
  const t = getDictionary(lang);
  const items = listingsByCategory(category);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">{t.listing.categoryTitles[category]}</h1>
      <div className="mt-6">
        <CategoryNav locale={lang} t={t.listing} active={category} />
      </div>
      <p className="mt-6 text-sm text-stone-600">
        {items.length} {t.listing.count}
      </p>
      {items.length ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((l) => (
            <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-stone-600">{t.listing.none}</p>
      )}
    </div>
  );
}
