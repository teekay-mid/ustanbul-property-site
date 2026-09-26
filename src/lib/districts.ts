import type { Locale } from "@/lib/i18n";

type Localized = Record<Locale, string>;

export type District = {
  slug: string;
  name: Localized;
  side: "european" | "asian";
  summary: Localized;
};

// District guides are a core SEO asset. Expand each summary into a full
// guide (transport, schools, prices, lifestyle) as content is written.
export const districts: District[] = [
  {
    slug: "besiktas",
    name: { en: "Beşiktaş", tr: "Beşiktaş", ar: "بشكتاش", ru: "Бешикташ" },
    side: "european",
    summary: {
      en: "A lively Bosphorus-side district with historic neighbourhoods, universities, waterfront cafés and excellent transport.",
      tr: "Tarihi mahalleleri, üniversiteleri, sahil kafeleri ve güçlü ulaşımıyla canlı bir Boğaz semti.",
      ar: "حي نابض بالحياة على ضفاف البوسفور يضم أحياء تاريخية وجامعات ومقاهي على الواجهة البحرية ومواصلات ممتازة.",
      ru: "Оживлённый район на Босфоре с историческими кварталами, университетами, кафе на набережной и отличным транспортом.",
    },
  },
  {
    slug: "sisli",
    name: { en: "Şişli", tr: "Şişli", ar: "شيشلي", ru: "Шишли" },
    side: "european",
    summary: {
      en: "Istanbul's business heart, home to Nişantaşı's boutiques, modern residences and the metro line to Levent and Maslak.",
      tr: "Nişantaşı butikleri, modern rezidansları ve Levent–Maslak metrosuyla İstanbul'un iş merkezi.",
      ar: "قلب إسطنبول التجاري، يضم متاجر نيشانتاشي والمجمعات السكنية الحديثة وخط المترو إلى ليفنت ومسلك.",
      ru: "Деловой центр Стамбула: бутики Нишанташи, современные резиденции и метро до Левента и Маслака.",
    },
  },
  {
    slug: "kadikoy",
    name: { en: "Kadıköy", tr: "Kadıköy", ar: "قاضي كوي", ru: "Кадыкёй" },
    side: "asian",
    summary: {
      en: "The Asian side's cultural centre, with a seafront promenade, markets, a strong rental market and ferries to the European side.",
      tr: "Sahil yürüyüş yolu, çarşıları, güçlü kira piyasası ve Avrupa yakasına vapurlarıyla Anadolu yakasının kültür merkezi.",
      ar: "المركز الثقافي للجانب الآسيوي، مع كورنيش بحري وأسواق وسوق إيجارات قوي وعبّارات إلى الجانب الأوروبي.",
      ru: "Культурный центр азиатской стороны: набережная, рынки, сильный арендный рынок и паромы на европейскую сторону.",
    },
  },
  {
    slug: "sariyer",
    name: { en: "Sarıyer", tr: "Sarıyer", ar: "صاري ير", ru: "Сарыер" },
    side: "european",
    summary: {
      en: "Green, upmarket and close to the Black Sea, with Bosphorus villas, forest walks and quick access to Maslak's offices.",
      tr: "Boğaz villaları, orman yürüyüşleri ve Maslak'a yakınlığıyla yeşil, seçkin ve Karadeniz'e yakın bir semt.",
      ar: "حي راقٍ وأخضر قريب من البحر الأسود، يضم فللاً على البوسفور ومسارات في الغابات ووصولاً سريعاً إلى مكاتب مسلك.",
      ru: "Зелёный престижный район у Чёрного моря: виллы на Босфоре, лесные прогулки и быстрый доступ к офисам Маслака.",
    },
  },
  {
    slug: "basaksehir",
    name: { en: "Başakşehir", tr: "Başakşehir", ar: "باشاك شهير", ru: "Башакшехир" },
    side: "european",
    summary: {
      en: "A fast-growing family district with new-build compounds, parks, the city hospital and strong demand from investors.",
      tr: "Yeni site projeleri, parkları, şehir hastanesi ve yatırımcı talebiyle hızla büyüyen bir aile semti.",
      ar: "حي عائلي سريع النمو يضم مجمعات حديثة البناء وحدائق ومستشفى المدينة وطلباً قوياً من المستثمرين.",
      ru: "Быстрорастущий семейный район с новыми жилыми комплексами, парками, городской больницей и высоким спросом инвесторов.",
    },
  },
  {
    slug: "beylikduzu",
    name: { en: "Beylikdüzü", tr: "Beylikdüzü", ar: "بيليك دوزو", ru: "Бейликдюзю" },
    side: "european",
    summary: {
      en: "Affordable seaside living with modern apartments, marinas, the Metrobus line and popular entry-level investment prices.",
      tr: "Modern daireleri, marinaları, Metrobüs hattı ve uygun giriş fiyatlarıyla ekonomik sahil yaşamı.",
      ar: "حياة ساحلية بأسعار معقولة مع شقق حديثة ومراسٍ وخط المتروبوس وأسعار مناسبة للاستثمار الأول.",
      ru: "Доступная жизнь у моря: современные квартиры, марины, линия Метробуса и невысокий порог входа для инвесторов.",
    },
  },
];

export function getDistrict(slug: string) {
  return districts.find((d) => d.slug === slug);
}
