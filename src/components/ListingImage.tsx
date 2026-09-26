import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Listing } from "@/lib/listings";

// Shows the first photo, or a neutral placeholder until real photos exist.
export function ListingImage({
  listing,
  locale,
  className = "",
  priority = false,
}: {
  listing: Listing;
  locale: Locale;
  className?: string;
  priority?: boolean;
}) {
  const src = listing.images[0];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy to-[#2d4a73] ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={listing.title[locale]}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-5xl font-semibold text-white/20">
          {listing.rooms}
        </div>
      )}
    </div>
  );
}
