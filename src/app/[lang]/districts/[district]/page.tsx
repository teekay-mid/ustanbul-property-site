import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/CategoryNav";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { fill, getDictionary } from "@/lib/dictionaries";
import { districts, getDistrict } from "@/lib/districts";
import type { Locale } from "@/lib/i18n";
import { listings } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return districts.map((d) => ({ district: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/districts/[district]">) {
  const { lang, district: slug } = (await params) as { lang: Locale; district: string };
  const district = getDistrict(slug);
  if (!district) return {};
  const t = getDictionary(lang);
  const title = fill(t.district.title, { district: district.name[lang] });
  return pageMetadata(lang, `/districts/${slug}`, title, district.summary?.[lang] ?? `${title}. ${t.meta.propertiesDescription}`);
}

export default async function DistrictPage({ params }: PageProps<"/[lang]/districts/[district]">) {
  const { lang, district: slug } = (await params) as { lang: Locale; district: string };
  const district = getDistrict(slug);
  if (!district) notFound();
  const t = getDictionary(lang);
  const name = district.name[lang];
  const inDistrict = listings.filter((l) => l.district === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl(`/${lang}`) },
            { "@type": "ListItem", position: 2, name: t.nav.properties, item: absoluteUrl(`/${lang}/properties`) },
            { "@type": "ListItem", position: 3, name, item: absoluteUrl(`/${lang}/districts/${slug}`) },
          ],
        }}
      />
      <h1 className="text-3xl font-semibold text-navy">{fill(t.district.title, { district: name })}</h1>
      <div className="mt-6">
        <CategoryNav locale={lang} t={t.listing} activeDistrict={slug} />
      </div>
      {district.summary && (
        <section className="mt-8 max-w-3xl">
          <h2 className="text-lg font-semibold">{t.district.guide}</h2>
          <p className="mt-2 leading-relaxed text-stone-700">{district.summary[lang]}</p>
        </section>
      )}
      <h2 className="mt-12 text-2xl font-semibold text-navy">{fill(t.district.listingsIn, { district: name })}</h2>
      {inDistrict.length ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {inDistrict.map((l) => (
            <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-stone-600">{t.listing.none}</p>
      )}
    </div>
  );
}
