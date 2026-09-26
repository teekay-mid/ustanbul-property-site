import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClickTracker } from "@/components/ClickTracker";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Footer } from "@/components/Footer";
import { GoogleTagManagerBody, GoogleTagManagerHead } from "@/components/GoogleTagManager";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getDictionary } from "@/lib/dictionaries";
import { dir, isLocale, localeTags, locales } from "@/lib/i18n";
import { absoluteUrl, site } from "@/lib/site";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  // Search Console and Yandex verification tokens, set in Vercel env vars.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  const organization = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl(`/${lang}`),
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    openingHours: site.openingHours,
    areaServed: { "@type": "City", name: "Istanbul" },
    knowsLanguage: locales.map((l) => localeTags[l]),
    sameAs: site.sameAs,
  };

  return (
    <html lang={localeTags[lang]} dir={dir(lang)}>
      <head>
        <GoogleTagManagerHead />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <GoogleTagManagerBody />
        <JsonLd data={organization} />
        <Header locale={lang} t={t.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} t={t} />
        <WhatsAppButton label={t.home.talk} />
        <ConsentBanner t={t.consent} privacyHref={`/${lang}/privacy`} />
        <ClickTracker />
      </body>
    </html>
  );
}
