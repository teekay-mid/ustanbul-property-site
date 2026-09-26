import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const links = [
    { href: `/${locale}/properties`, label: t.properties },
    { href: `/${locale}/citizenship`, label: t.citizenship },
    { href: `/${locale}/about`, label: t.about },
    { href: `/${locale}/contact`, label: t.contact },
  ];
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href={`/${locale}`} className="text-xl font-semibold tracking-tight text-navy">
          {site.name}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-stone-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-navy">
              {l.label}
            </Link>
          ))}
          <span className="flex gap-2 border-s border-stone-200 ps-4 text-xs">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                className={l === locale ? "font-semibold text-navy" : "text-stone-500 hover:text-navy"}
              >
                {localeNames[l]}
              </Link>
            ))}
          </span>
        </nav>
      </div>
    </header>
  );
}
