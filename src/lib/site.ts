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
  email: process.env.NEXT_PUBLIC_EMAIL ?? "info@example.com", // TODO
  address: {
    street: "TODO street address",
    locality: "Istanbul",
    region: "Istanbul",
    postalCode: "34000",
    country: "TR",
  },
  geo: { latitude: 41.0082, longitude: 28.9784 }, // TODO: office coordinates
  openingHours: ["Mo-Sa 09:00-19:00"], // TODO
  sameAs: [
    "https://www.instagram.com/ustanbulproperty/",
    "https://ustanbulproperty.sahibinden.com/",
  ],
};

export function absoluteUrl(path: string) {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(message?: string) {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${text}`;
}
