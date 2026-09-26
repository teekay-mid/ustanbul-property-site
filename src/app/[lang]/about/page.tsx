import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata(lang, "/about", t.meta.aboutTitle, t.meta.aboutDescription);
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-navy">{t.about.heading}</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">{t.about.text}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {t.home.why.map((w) => (
          <div key={w.title}>
            <h2 className="font-semibold">{w.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{w.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
