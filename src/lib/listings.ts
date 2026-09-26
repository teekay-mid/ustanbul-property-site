import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type Listing = {
  slug: string;
  // Sample listings exist only to show the layout. Replace them with the
  // client's real listings (from their sahibinden store) before launch.
  sample?: boolean;
  status: "for_sale" | "for_rent" | "sold";
  type: "Apartment" | "House" | "SingleFamilyResidence";
  district: string;
  title: Localized;
  description: Localized;
  price: number;
  currency: "USD" | "EUR" | "TRY";
  rooms: string; // Turkish convention, e.g. "3+1"
  bedrooms: number;
  bathrooms: number;
  areaM2: number;
  floor?: string;
  yearBuilt?: number;
  citizenshipEligible?: boolean;
  featured?: boolean;
  images: string[];
  features: Localized[];
  updatedAt: string;
};

const seaView: Localized = { en: "Sea view", tr: "Deniz manzarası", ar: "إطلالة بحرية", ru: "Вид на море" };
const parking: Localized = { en: "Indoor parking", tr: "Kapalı otopark", ar: "موقف سيارات داخلي", ru: "Подземный паркинг" };
const security: Localized = { en: "24/7 security", tr: "7/24 güvenlik", ar: "أمن على مدار الساعة", ru: "Круглосуточная охрана" };
const pool: Localized = { en: "Swimming pool", tr: "Yüzme havuzu", ar: "مسبح", ru: "Бассейн" };
const metro: Localized = { en: "Near metro", tr: "Metroya yakın", ar: "قريب من المترو", ru: "Рядом с метро" };
const garden: Localized = { en: "Private garden", tr: "Özel bahçe", ar: "حديقة خاصة", ru: "Собственный сад" };

export const listings: Listing[] = [
  {
    slug: "3-bedroom-bosphorus-view-apartment-besiktas",
    sample: true,
    status: "for_sale",
    type: "Apartment",
    district: "besiktas",
    title: {
      en: "3-bedroom Bosphorus view apartment in Beşiktaş",
      tr: "Beşiktaş'ta Boğaz manzaralı 3+1 daire",
      ar: "شقة 3 غرف بإطلالة على البوسفور في بشكتاش",
      ru: "Квартира 3+1 с видом на Босфор в Бешикташе",
    },
    description: {
      en: "Renovated apartment on a quiet street a few minutes' walk from the Beşiktaş ferry pier, with a wide balcony facing the Bosphorus.",
      tr: "Beşiktaş iskelesine birkaç dakika yürüme mesafesinde, sakin bir sokakta, Boğaz'a bakan geniş balkonlu yenilenmiş daire.",
      ar: "شقة مجددة في شارع هادئ على بعد دقائق سيراً من رصيف عبّارات بشكتاش، مع شرفة واسعة تطل على البوسفور.",
      ru: "Квартира после ремонта на тихой улице в нескольких минутах от пристани Бешикташ, с широким балконом на Босфор.",
    },
    price: 650000,
    currency: "USD",
    rooms: "3+1",
    bedrooms: 3,
    bathrooms: 2,
    areaM2: 145,
    floor: "4",
    yearBuilt: 2008,
    citizenshipEligible: true,
    featured: true,
    images: [],
    features: [seaView, metro, parking],
    updatedAt: "2026-09-26",
  },
  {
    slug: "2-bedroom-residence-apartment-sisli",
    sample: true,
    status: "for_sale",
    type: "Apartment",
    district: "sisli",
    title: {
      en: "2-bedroom residence apartment in Şişli",
      tr: "Şişli'de rezidansta 2+1 daire",
      ar: "شقة غرفتين في مجمع سكني في شيشلي",
      ru: "Квартира 2+1 в резиденции в Шишли",
    },
    description: {
      en: "Modern apartment in a managed residence with gym, concierge and direct access to the M2 metro line.",
      tr: "Spor salonu, resepsiyon ve M2 metro hattına doğrudan erişimi olan yönetimli bir rezidansta modern daire.",
      ar: "شقة حديثة في مجمع سكني مُدار مع صالة رياضية وخدمة استقبال ووصول مباشر إلى خط المترو M2.",
      ru: "Современная квартира в резиденции с управляющей компанией, спортзалом, консьержем и выходом к метро M2.",
    },
    price: 420000,
    currency: "USD",
    rooms: "2+1",
    bedrooms: 2,
    bathrooms: 2,
    areaM2: 110,
    floor: "12",
    yearBuilt: 2019,
    citizenshipEligible: true,
    featured: true,
    images: [],
    features: [metro, security, pool],
    updatedAt: "2026-09-26",
  },
  {
    slug: "4-bedroom-villa-with-garden-sariyer",
    sample: true,
    status: "for_sale",
    type: "SingleFamilyResidence",
    district: "sariyer",
    title: {
      en: "4-bedroom villa with garden in Sarıyer",
      tr: "Sarıyer'de bahçeli 4+1 villa",
      ar: "فيلا 4 غرف مع حديقة في صاري ير",
      ru: "Вилла 4+1 с садом в Сарыере",
    },
    description: {
      en: "Detached family villa in a secure compound near the Belgrad Forest, with a private garden, pool and covered parking.",
      tr: "Belgrad Ormanı yakınında güvenlikli bir sitede, özel bahçeli, havuzlu ve kapalı otoparklı müstakil aile villası.",
      ar: "فيلا عائلية مستقلة في مجمع آمن بالقرب من غابة بلغراد، مع حديقة خاصة ومسبح وموقف مغطى.",
      ru: "Отдельная семейная вилла в охраняемом комплексе у Белградского леса, с садом, бассейном и крытой парковкой.",
    },
    price: 1250000,
    currency: "USD",
    rooms: "4+1",
    bedrooms: 4,
    bathrooms: 3,
    areaM2: 320,
    yearBuilt: 2015,
    citizenshipEligible: true,
    featured: true,
    images: [],
    features: [garden, pool, security, parking],
    updatedAt: "2026-09-26",
  },
  {
    slug: "1-bedroom-investment-apartment-beylikduzu",
    sample: true,
    status: "for_sale",
    type: "Apartment",
    district: "beylikduzu",
    title: {
      en: "1-bedroom investment apartment in Beylikdüzü",
      tr: "Beylikdüzü'nde yatırımlık 1+1 daire",
      ar: "شقة غرفة واحدة للاستثمار في بيليك دوزو",
      ru: "Инвестиционная квартира 1+1 в Бейликдюзю",
    },
    description: {
      en: "New-build apartment in a compound with pool and security, close to the Metrobus and the coast. Suitable for rental income.",
      tr: "Metrobüs'e ve sahile yakın, havuzlu ve güvenlikli bir sitede yeni daire. Kira getirisi için uygun.",
      ar: "شقة حديثة البناء في مجمع مع مسبح وأمن، قريبة من المتروبوس والساحل. مناسبة للدخل الإيجاري.",
      ru: "Квартира в новом комплексе с бассейном и охраной, рядом с Метробусом и побережьем. Подходит для сдачи в аренду.",
    },
    price: 135000,
    currency: "USD",
    rooms: "1+1",
    bedrooms: 1,
    bathrooms: 1,
    areaM2: 65,
    floor: "7",
    yearBuilt: 2024,
    images: [],
    features: [pool, security],
    updatedAt: "2026-09-26",
  },
];

export function getListing(slug: string) {
  return listings.find((l) => l.slug === slug);
}

export function similarListings(listing: Listing, count = 3) {
  return listings
    .filter((l) => l.slug !== listing.slug && l.status !== "sold")
    .sort(
      (a, b) =>
        Number(b.district === listing.district) -
          Number(a.district === listing.district) ||
        Math.abs(a.price - listing.price) - Math.abs(b.price - listing.price),
    )
    .slice(0, count);
}

export function formatPrice(listing: Listing, locale: Locale) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: listing.currency,
    maximumFractionDigits: 0,
  }).format(listing.price);
}
