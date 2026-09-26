# Ustanbul Property website

Next.js site for Ustanbul Property, an Istanbul real estate agency. English, Turkish, Arabic (right-to-left) and Russian, built for SEO and deployed on Vercel.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy on Vercel

1. Import this GitHub repository at https://vercel.com/new (framework: Next.js, no settings to change).
2. Add the environment variables below under Project Settings → Environment Variables.
3. Add the custom domain later under Settings → Domains, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

Preview deployments are blocked from search engines by `robots.txt`; only production is indexable.

## Environment variables

| Name | What it is |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, e.g. `https://ustanbulproperty.com`. Defaults to the Vercel production URL. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (`GTM-XXXXXXX`). Analytics is off until this is set. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console HTML-tag verification token (or verify by DNS instead). |
| `NEXT_PUBLIC_BING_VERIFICATION` | Bing Webmaster Tools token. |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster token. |
| `NEXT_PUBLIC_PHONE` | Office phone, e.g. `+90 212 000 00 00`. |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number, digits only with country code, e.g. `905xxxxxxxxx`. |
| `NEXT_PUBLIC_EMAIL` | Contact email. |

## Analytics

Tags are managed in Google Tag Manager, not in code. Google Consent Mode v2 defaults everything to denied until the visitor accepts the cookie banner.

In GTM, add a **Google tag** with the GA4 measurement ID, plus GA4 event tags for these dataLayer events the site sends:

| Event | When | Parameters |
|---|---|---|
| `whatsapp_click` | Any WhatsApp link or button | `location`, `listing` |
| `phone_click` | Any phone link | `listing` |
| `email_click` | Any email link | |
| `generate_lead` | Contact form submitted | `method` |
| `listing_view` | A listing page is opened | `listing` |

Mark `generate_lead`, `whatsapp_click` and `phone_click` as key events in GA4. Microsoft Clarity can be added as a GTM tag too.

## Content to replace before launch

- `src/lib/site.ts`: address, phone, WhatsApp, email, office coordinates, opening hours (marked `TODO`).
- `src/lib/listings.ts`: the four listings are samples (`sample: true`, shown with a banner and `noindex`). Replace with the real listings from the sahibinden store and add photos under `public/`.
- `src/lib/districts.ts`: expand each district summary into a full area guide.
- Privacy policy text (KVKK and GDPR) from the client or their lawyer.
- Turkish, Arabic and Russian copy should be reviewed by a native speaker.

## SEO already in place

- Language subfolders (`/en`, `/tr`, `/ar`, `/ru`) with `hreflang` and `x-default` on every page and in the sitemap
- Visitors to `/` are redirected to their browser language
- Unique titles, descriptions, canonical URLs and Open Graph tags per page and language
- JSON-LD: `RealEstateAgent` sitewide, `RealEstateListing` with `Offer` on listings, `BreadcrumbList`, and `HowTo` on the citizenship guide
- `sitemap.xml` and `robots.txt` generated automatically
- Static pages for speed; sold listings stay live with similar listings shown
