import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/ListingCard";
import { ListingImage } from "@/components/ListingImage";
import { TrackPageEvent } from "@/components/TrackPageEvent";
import { getDictionary } from "@/lib/dictionaries";
import { getDistrict } from "@/lib/districts";
import { localeTags, type Locale } from "@/lib/i18n";
import { formatPrice, getListing, listings, similarListings, text } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl, site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

const schemaType = { apartment: "Apartment", villa: "SingleFamilyResidence", luxury: "Apartment", commercial: "Place" } as const;

export async function generateMetadata({ params }: PageProps<"/[lang]/properties/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const listing = getListing(slug);
  if (!listing) return {};
  const description = text(listing.description, lang).slice(0, 155).replace(/\s+\S*$/, "") + "…";
  const meta = pageMetadata(lang, `/properties/${slug}`, text(listing.title, lang), description);
  return { ...meta, openGraph: { ...meta.openGraph, images: listing.images.slice(0, 1) } };
}

export default async function ListingPage({ params }: PageProps<"/[lang]/properties/[slug]">) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const listing = getListing(slug);
  if (!listing) notFound();
  const t = getDictionary(lang);
  const district = getDistrict(listing.district);
  const url = absoluteUrl(`/${lang}/properties/${slug}`);
  const title = text(listing.title, lang);
  const similar = similarListings(listing);

  const facts = [
    [t.listing.bedrooms, listing.bedrooms?.toString()],
    [t.listing.bathrooms, listing.bathrooms?.toString()],
    [t.listing.area, listing.areaM2 ? `${listing.areaM2} m²` : undefined],
    [t.listing.district, district?.name[lang]],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      name: title,
      description: text(listing.description, lang),
      url,
      inLanguage: localeTags[lang],
      image: listing.images,
      offers: {
        "@type": "Offer",
        ...(listing.price !== null && { price: listing.price, priceCurrency: listing.currency }),
        businessFunction:
          listing.status === "for_rent" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        availability: listing.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        seller: { "@id": absoluteUrl("/#organization") },
      },
      about: {
        "@type": schemaType[listing.category],
        ...(listing.bedrooms !== null && { numberOfRooms: listing.bedrooms, numberOfBedrooms: listing.bedrooms }),
        ...(listing.bathrooms !== null && { numberOfBathroomsTotal: listing.bathrooms }),
        ...(listing.areaM2 !== null && {
          floorSize: { "@type": "QuantitativeValue", value: listing.areaM2, unitCode: "MTK" },
        }),
        address: {
          "@type": "PostalAddress",
          streetAddress: listing.address ?? undefined,
          addressLocality: listing.districtName,
          addressRegion: "İstanbul",
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
        { "@type": "ListItem", position: 3, name: title, item: url },
      ],
    },
  ];

  const gallery = listing.images.slice(1, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={structuredData} />
      <nav className="text-sm text-stone-500">
        <Link href={`/${lang}/properties`} className="hover:underline">{t.nav.properties}</Link>
        {" / "}
        <Link href={`/${lang}/buy/${listing.category}`} className="hover:underline">{t.listing.categories[listing.category]}</Link>
        {district && (
          <>
            {" / "}
            <Link href={`/${lang}/districts/${district.slug}`} className="hover:underline">{district.name[lang]}</Link>
          </>
        )}
      </nav>
      {listing.status === "sold" && <p className="mt-4 rounded-lg bg-stone-100 px-4 py-3 text-sm">{t.listing.soldNote}</p>}

      <div className="mt-4 grid gap-2 sm:grid-cols-4 sm:grid-rows-2">
        <ListingImage
          listing={listing}
          locale={lang}
          priority
          sizes="(min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] rounded-xl sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-96"
        />
        {gallery.map((_, i) => (
          <ListingImage
            key={i}
            listing={listing}
            locale={lang}
            index={i + 1}
            sizes="(min-width: 640px) 25vw, 50vw"
            className="hidden aspect-[4/3] rounded-xl sm:block"
          />
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold text-navy">{title}</h1>
          {listing.address && <p className="mt-2 text-stone-500">{listing.address}</p>}
          {lang !== "en" && !listing.description[lang] && t.listing.englishOnly && (
            <p className="mt-4 text-sm italic text-stone-500">{t.listing.englishOnly}</p>
          )}
          <p className="mt-4 whitespace-pre-line leading-relaxed text-stone-700" lang={listing.description[lang] ? undefined : "en"}>
            {text(listing.description, lang)}
          </p>
          {listing.features.length > 0 && (
            <>
              <h2 className="mt-8 text-lg font-semibold">{t.listing.features}</h2>
              <ul className="mt-3 flex flex-wrap gap-2" lang="en">
                {listing.features.map((f) => (
                  <li key={f} className="rounded-full bg-stone-100 px-3 py-1 text-sm">{f}</li>
                ))}
              </ul>
            </>
          )}
          {listing.images.length > 5 && (
            <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {listing.images.slice(5).map((_, i) => (
                <ListingImage key={i} listing={listing} locale={lang} index={i + 5} sizes="33vw" className="aspect-[4/3] rounded-lg" />
              ))}
            </div>
          )}
        </div>
        <aside className="h-fit rounded-xl border border-stone-200 bg-white p-6 lg:sticky lg:top-6">
          <p className="text-xs font-medium uppercase tracking-wide text-gold">{t.listing[listing.status]}</p>
          <p className="mt-1 text-3xl font-semibold text-navy">{formatPrice(listing, lang, t.listing.priceOnRequest)}</p>
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
