import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { districts } from "@/lib/districts";
import type { Locale } from "@/lib/i18n";
import { categories, type Category } from "@/lib/listings";

const chip = "rounded-full border px-3 py-1.5";
const on = `${chip} border-navy bg-navy text-white`;
const off = `${chip} border-stone-300 hover:border-navy`;

// Category and district links act as filters: each one is a crawlable page.
export function CategoryNav({
  locale,
  t,
  active,
  activeDistrict,
}: {
  locale: Locale;
  t: Dictionary["listing"];
  active?: Category;
  activeDistrict?: string;
}) {
  const all = !active && !activeDistrict;
  return (
    <div className="space-y-3 text-sm">
      <nav aria-label={t.filter} className="flex flex-wrap gap-2">
        <Link href={`/${locale}/properties`} className={all ? on : off}>{t.viewAll}</Link>
        {categories.map((c) => (
          <Link key={c} href={`/${locale}/buy/${c}`} className={c === active ? on : off}>
            {t.categories[c]}
          </Link>
        ))}
      </nav>
      <nav aria-label={t.district} className="flex flex-wrap gap-2">
        {districts.map((d) => (
          <Link key={d.slug} href={`/${locale}/districts/${d.slug}`} className={d.slug === activeDistrict ? on : off}>
            {d.name[locale]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
