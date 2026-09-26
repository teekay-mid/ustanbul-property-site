import Link from "next/link";
import { ListingCard } from "@/components/ListingCard";
import { getDictionary } from "@/lib/dictionaries";
import { districts } from "@/lib/districts";
import type { Locale } from "@/lib/i18n";
import { listings } from "@/lib/listings";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return { ...pageMetadata(lang, "/", t.meta.homeTitle, t.meta.homeDescription), title: { absolute: t.meta.homeTitle } };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const featured = listings.filter((l) => l.featured && l.status !== "sold").slice(0, 3);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl">{t.home.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">{t.home.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${lang}/properties`} className="rounded-lg bg-gold px-5 py-3 font-medium text-white hover:brightness-110">
              {t.home.browse}
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener"
              data-track="whatsapp_click"
              data-track-location="hero"
              className="rounded-lg border border-white/40 px-5 py-3 font-medium hover:bg-white/10"
            >
              {t.home.talk}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-semibold text-navy">{t.home.featured}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.slug} listing={l} locale={lang} t={t.listing} />
          ))}
        </div>
        <Link href={`/${lang}/properties`} className="mt-6 inline-block font-medium text-navy underline">
          {t.listing.viewAll}
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-semibold text-navy">{t.home.districtsTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((d) => (
            <Link
              key={d.slug}
              href={`/${lang}/districts/${d.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-5 hover:shadow-md"
            >
              <h3 className="font-semibold text-navy">{d.name[lang]}</h3>
              <p className="mt-2 text-sm text-stone-600">{d.summary[lang]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-16">
        <h2 className="text-2xl font-semibold text-navy">{t.home.whyTitle}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {t.home.why.map((w) => (
            <div key={w.title}>
              <h3 className="font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{w.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
