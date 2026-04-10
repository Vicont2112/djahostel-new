/**
 * Канонічний контент сайту.
 * Джерело правди в базі хостела:
 * `DjaHostel2026/ops/20_Marketing/Platforms/Dja_Hostel_Описи_платформ.md` (оновлено 2026-03-31).
 * Легасі нотатки / SEO: `ProjectsRepo/djahostel-site/Curs_Dja_Site/` (HANDOFF, PLAN).
 */

export const SITE_CONTENT_FILE = "Dja_Hostel_Описи_платформ.md";

export const SITE_CONTENT_SOURCE =
  "Vaults/DjaHostel2026/ops/20_Marketing/Platforms/Dja_Hostel_Описи_платформ.md";

export const siteMeta = {
  title: "Dja Hostel Київ — тихий хостел у центрі | 9.2★ Booking.com",
  description:
    "Тихий хостел у центрі Києва, ~12 хв від м. Золоті Ворота. Спокійно після 22:00, власник поруч. 350 грн/ніч, від місяця 230 грн. 60%+ гостей залишаються надовго.",
} as const;

export const heroCopy = {
  eyebrow: "Київ · вул. Січових Стрільців, 14",
  title: "Dja Hostel — тихе місце в центрі для сну, роботи й безпеки",
  subtitle:
    "Хостел для тих, хто працює, навчається й живе — не для вечірок. Високі стелі, затишок після 22:00, господар на місці. Залишайтесь на тижні й місяці — як вдома.",
} as const;

export const contacts = {
  telegramUser: "dja_hostel_chat",
  telegramUrl: "https://t.me/dja_hostel_chat",
  phoneDisplay: "+380 50 066 10 12",
  phoneTel: "+380500661012",
  email: "hello@djahostel.com",
  instagramUser: "dja_hostel",
  instagramUrl: "https://www.instagram.com/dja_hostel/",
  bookingUrl: "https://www.booking.com/Share-2X2k0Q",
} as const;

export const address = {
  line: "вул. Січових Стрільців, 14, Київ",
  metro: "Золоті Ворота",
  walkMinutes: 12,
  /** Центр кварталу для OSM embed (bbox у форматі minLon,minLat,maxLon,maxLat). */
  mapBbox: "30.508,50.464,30.524,50.476" as const,
  mapLabelLat: 50.4702,
  mapLabelLon: 30.5158,
} as const;

/** Тарифи за ніч (грн), з маркетинг-бази. */
export const priceTiers = [
  { label: "1–6 ночей", price: 350 },
  { label: "7–29 ночей", price: 280 },
  { label: "30+ ночей", price: 230 },
] as const;

export const trustFacts = {
  bookingRating: "9.2★",
  longStayShare: "понад 60%",
  beds: 24,
  quietHours: "22:00–07:00",
} as const;

export const trustQuotes = [
  {
    text: "Ідеальний хостел у Києві. Хороший господар, чисто, свіжа постіль. Гаряча вода завжди.",
    attribution: "відгук гостя, Booking.com",
  },
  {
    text: "Дуже затишно, ніби вдома. Ціна за місяць — одна з найкращих у місті при такій якості.",
    attribution: "відгук гостя",
  },
] as const;

export const honestBlock = {
  title: "Чесно про простір",
  body:
    "Один душ і один туалет (окремо). Зазвичай ~18–20 гостей — черга рухається природно. Якщо потрібен luxury 5★ або вечірки — це не сюди. Якщо важливі чесність, тиша й турбота — ласкаво просимо.",
} as const;

/** Підпис до горизонтальної стрічки фото. */
export const vibeStripCaption =
  "Кухня, диванна зона, кімнати — без постановки, як у будинку на Січових Стрільців.";

export const valueBullets = [
  "Ортопедичні матраци, теплі ковдри, чиста білизна",
  "Господар Victor живе тут і справді допомагає",
  "Повністю обладнана кухня, пральна машина (платно за прання), Wi‑Fi, гаряча вода",
  "Локери з замком, тихий двір і вікна на вулицю",
] as const;

export const bookingPrivacyNote =
  "Надсилаючи форму, ви погоджуєтесь, що ім'я, email, телефон і дати використаємо лише для відповіді щодо бронювання та не передаємо їх для стороннього маркетингу.";

export const externalCta = {
  replyHint: "У Telegram зазвичай відповідаємо протягом ~15 хвилин.",
} as const;

export const chatChips = [
  "Є місця на ці дати?",
  "Ціни за тиждень і за місяць",
  "Як дійти від м. Золоті Ворота?",
  "Тиша після 22:00?",
  "Один душ — як це на практиці?",
] as const;
