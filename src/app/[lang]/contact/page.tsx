import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  return pageMetadata(lang, "/contact", t.meta.contactTitle, t.meta.contactDescription);
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const mapQuery = encodeURIComponent(`${site.geo.latitude},${site.geo.longitude}`);
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-semibold text-navy">{t.contact.heading}</h1>
        <p className="mt-4 text-stone-700">{t.contact.text}</p>
        <div className="mt-6 space-y-2">
          <a href={whatsappLink()} target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="contact" className="block font-medium text-navy">
            WhatsApp
          </a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} data-track="phone_click" className="block">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} data-track="email_click" className="block">
            {site.email}
          </a>
        </div>
        <h2 className="mt-8 font-semibold">{t.contact.office}</h2>
        <p className="text-stone-700">
          {site.address.street}, {site.address.locality}
        </p>
        <iframe
          title={t.contact.office}
          src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
          loading="lazy"
          className="mt-4 h-64 w-full rounded-xl border-0"
        />
      </div>
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <ContactForm t={t.contact} whatsapp={site.whatsapp} />
      </div>
    </div>
  );
}
