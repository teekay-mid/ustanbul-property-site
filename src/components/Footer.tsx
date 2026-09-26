import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./ConsentBanner";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-stone-600 sm:grid-cols-3">
        <div>
          <p className="font-semibold text-navy">{site.name}</p>
          <p className="mt-2">
            {site.address.street}, {site.address.locality}
          </p>
          <p>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} data-track="phone_click">
              {site.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${site.email}`} data-track="email_click">
              {site.email}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Link href={`/${locale}/properties`}>{t.nav.properties}</Link>
          <Link href={`/${locale}/citizenship`}>{t.nav.citizenship}</Link>
          <Link href={`/${locale}/about`}>{t.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{t.nav.contact}</Link>
        </div>
        <div className="flex flex-col items-start gap-1">
          {site.sameAs.map((url) => (
            <a key={url} href={url} rel="noopener" target="_blank">
              {new URL(url).hostname.replace("www.", "")}
            </a>
          ))}
          <Link href={`/${locale}/privacy`}>{t.footer.privacy}</Link>
          <CookieSettingsButton label={t.footer.cookies} />
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} {site.name}. {t.footer.rights}
      </p>
    </footer>
  );
}
