import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { text, type Listing } from "@/lib/listings";

export function ListingImage({
  listing,
  locale,
  index = 0,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  listing: Listing;
  locale: Locale;
  index?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const src = listing.images[index];
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-navy to-[#2d4a73] ${className}`}>
      {src && (
        <Image
          src={src}
          alt={`${text(listing.title, locale)}${index ? ` (${index + 1})` : ""}`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      )}
    </div>
  );
}
