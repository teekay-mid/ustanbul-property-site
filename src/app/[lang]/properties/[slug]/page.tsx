import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { ListingImage } from "@/components/ListingImage";
import { TrackPageEvent } from "@/components/TrackPageEvent";
import { getDictionary } from "@/lib/dictionaries";
import { getDistrict } from "@/lib/districts";
import { localeTags, type Locale } from "@/lib/i18n";
import { formatPrice, getListing, listings, similarListings } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/properties/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const listing = getListing(slug);
  if (!listing) return {};
  const meta = pageMetadata(lang, `/properties/${slug}`, listing.title[lang], listing.description[lang]);
  // Sample listings must never be indexed.
  return listing.sample ? { ...meta, robots: { index: false, follow: true } } : meta;
}

export default async function ListingPage({ params }: PageProps<"/[lang]/properties/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const listing = getListing(slug);
  if (!listing) notFound();
  const t = getDictionary(lang);
  const district = getDistrict(listing.district);
  const url = absoluteUrl(`/${lang}/properties/${slug}`);
  const similar = similarListings(listing);

  const facts = [
    [t.listing.rooms, listing.rooms],
    [t.listing.area, `${listing.areaM2} m²`],
    [t.listing.floor, listing.floor],
    [t.listing.built, listing.yearBuilt?.toString()],
    [t.listing.district, district?.name[lang]],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: listing.title[lang],
      description: listing.description[lang],
      url,
      inLanguage: localeTags[lang],
      datePosted: listing.updatedAt,
      image: listing.images.map((i) => absoluteUrl(i)),
      offers: {
        "@type": "Offer",
        price: listing.price,
        priceCurrency: listing.currency,
        businessFunction: listing.status === "for_rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        availability: listing.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        seller: { "@id": absoluteUrl("/#organization") },
      },
      about: {
        "@type": listing.type,
        numberOfRooms: listing.bedrooms,
        numberOfBedrooms: listing.bedrooms,
        numberOfBathroomsTotal: listing.bathrooms,
        floorSize: { "@type": "QuantitativeValue", value: listing.areaM2, unitCode: "MTK" },
        yearBuilt: listing.yearBuilt,
        address: {
          "@type": "PostalAddress",
          addressLocality: district?.name.en,
          addressRegion: "Istanbul",
          addressCountry: "TR",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl(`/${lang}`) },
        { "@type": "ListItem", position: 2, name: t.nav.properties, item: absoluteUrl(`/${lang}/properties`) },
        { "@type": "ListItem", position: 3, name: listing.title[lang], item: url },
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={structuredData} />
      {listing.sample && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-900">{t.listing.sampleNote}</p>
      )}
      <nav className="text-sm text-stone-500">
        <Link href={`/${lang}/properties`} className="hover:underline">{t.nav.properties}</Link>
        {district && (
          <>
            {" / "}
            <Link href={`/${lang}/districts/${district.slug}`} className="hover:underline">{district.name[lang]}</Link>
          </>
        )}
      </nav>
      {listing.status === "sold" && (
        <p className="mt-4 rounded-lg bg-stone-100 px-4 py-3 text-sm">{t.listing.soldNote}</p>
      )}
      <div className="mt-4 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <ListingImage listing={listing} locale={lang} className="aspect-[16/10] rounded-xl" priority />
          <h1 className="mt-6 text-3xl font-semibold text-navy">{listing.title[lang]}</h1>
          <p className="mt-4 leading-relaxed text-stone-700">{listing.description[lang]}</p>
          <h2 className="mt-8 text-lg font-semibold">{t.listing.features}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {listing.features.map((f) => (
              <li key={f.en} className="rounded-full bg-stone-100 px-3 py-1 text-sm">{f[lang]}</li>
            ))}
          </ul>
        </div>
        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-6">
          <p className="text-xs font-medium uppercase tracking-wide text-gold">{t.listing[listing.status]}</p>
          <p className="mt-1 text-3xl font-semibold text-navy">{formatPrice(listing, lang)}</p>
          {listing.citizenshipEligible && (
            <p className="mt-2 inline-block rounded bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
              {t.listing.citizenshipEligible}
            </p>
          )}
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-stone-500">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={whatsappLink(`${t.listing.enquiryMessage} ${url}`)}
            target="_blank"
            rel="noopener"
            data-track="whatsapp_click"
            data-track-location="listing"
            data-track-listing={listing.slug}
            className="mt-6 block rounded-lg bg-[#25D366] px-4 py-3 text-center font-medium text-white"
          >
            {t.listing.enquire}
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            data-track="phone_click"
            data-track-listing={listing.slug}
            className="mt-2 block rounded-lg border border-stone-300 px-4 py-3 text-center font-medium"
          >
            {t.listing.call}
          </a>
        </aside>
      </div>
      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-navy">{t.listing.similar}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => (
              <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
            ))}
          </div>
        </section>
      )}
      <TrackPageEvent event="listing_view" params={{ listing: listing.slug }} />
    </div>
  );
}

