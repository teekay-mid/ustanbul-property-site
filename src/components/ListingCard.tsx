import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { getDistrict } from "@/lib/districts";
import type { Locale } from "@/lib/i18n";
import { formatPrice, text, type Listing } from "@/lib/listings";
import { ListingImage } from "./ListingImage";

export function ListingCard({ listing, locale, t }: { listing: Listing; locale: Locale; t: Dictionary["listing"] }) {
  const district = getDistrict(listing.district);
  const facts = [
    listing.bedrooms !== null && `${listing.bedrooms} ${t.bedrooms.toLowerCase()}`,
    listing.areaM2 !== null && `${listing.areaM2} m²`,
  ].filter(Boolean);
  return (
    <Link
      href={`/${locale}/properties/${listing.slug}`}
      className="group block overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:shadow-md"
    >
      <div className="relative">
        <ListingImage listing={listing} locale={locale} className="aspect-[4/3] transition group-hover:scale-[1.02]" />
        {listing.citizenshipEligible && (
          <span className="absolute start-3 top-3 rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-emerald-800">
            {t.citizenshipEligible}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gold">
          {district?.name[locale]} · {t.categories[listing.category]}
        </p>
        <h3 className="mt-1 font-semibold text-stone-900 group-hover:text-navy">{text(listing.title, locale)}</h3>
        <p className="mt-2 text-lg font-semibold text-navy">{formatPrice(listing, locale, t.priceOnRequest)}</p>
        {facts.length > 0 && <p className="mt-1 text-sm text-stone-600">{facts.join(" · ")}</p>}
      </div>
    </Link>
  );
}
