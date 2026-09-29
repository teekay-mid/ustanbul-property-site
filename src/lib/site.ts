// Business details used across the site and in structured data.
// Values marked TODO must be confirmed with the client before launch.
export const site = {
  name: "Ustanbul Property",
  // Set NEXT_PUBLIC_SITE_URL once the custom domain is added in Vercel.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+90 537 780 90 23",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "905377809023", // digits only, with country code
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@propertyustanbul.com",
  address: {
    street: "Göktürk Merkez Mah., Neo Vista Sitesi, İstanbul Cad. No:16",
    locality: "Eyüpsultan",
    region: "İstanbul",
    postalCode: "34077",
    country: "TR",
  },
  geo: { latitude: 41.1817, longitude: 28.8874 }, // approximate (Göktürk); confirm exact office pin
  openingHours: ["Mo-Sa 09:00-19:00"], // TODO
  legalName: "Ustanbul Property Gayrimenkul Danışmanlığı Limited Şirketi",
  sameAs: [
    "https://www.instagram.com/ustanbulproperty/",
    "https://www.facebook.com/share/15qpoD3q9L/",
    "https://www.youtube.com/@ustanbulproperty",
  ],
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}
