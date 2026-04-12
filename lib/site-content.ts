/**
 * Канонічний контент сайту (UA / EN).
 */

export const DICTIONARY = {
  ua: {
    siteMeta: {
      title: "Dja Hostel Київ — тихий хостел у центрі | 9.2★ Booking.com",
      description:
        "Тихий хостел у центрі Києва, ~12 хв від м. Золоті Ворота. Спокійно після 22:00, власник поруч. 350 грн/ніч, від місяця 230 грн. 60%+ гостей залишаються надовго.",
    },
    hero: {
      eyebrow: "Київ · вул. Січових Стрільців, 14",
      title: "Dja Hostel — тихе місце в центрі для сну, роботи й безпеки",
      subtitle:
        "Хостел для тих, хто працює, навчається й живе — не для вечірок. Високі стелі, затишок після 22:00, господар на місці. Залишайтесь на тижні й місяці — як вдома.",
    },
    stayStory: {
      title: "Приїхали на кілька ночей. Залишились на місяці.",
      body: "Не тому, що ми просили. А тому, що коли нормально спиш, відчуваєш себе в безпеці й живеш у стабільному ритмі — від'їжджати немає сенсу.",
    },
    forWhom: {
      yesTitle: "Вам тут сподобається, якщо:",
      yesList: [
        "Ви в Києві для роботи, навчання або переїзду",
        "Ви цінуєте сон і спокій",
        "Ви готуєте самі й вам потрібна повноцінна кухня",
        "Ви ставитесь до спільного простору як до власної квартири",
        "Вам нормально жити поруч з тими самими людьми тижнями й місяцями",
      ],
      noTitle: "Мабуть, не для вас, якщо:",
      noList: [
        "Шукаєте party-хостел або бар на першому поверсі",
        "Часто повертаєтесь пізно, голосно або з компанією",
        "Палите в приміщенні",
        "Алкоголь у кімнаті — ваш спосіб відпочинку",
        "Вам не подобається, коли просять поважати тишу",
      ],
    },
    nav: {
      trust: "Довіра",
      rooms: "Кімнати",
      vibe: "Атмосфера",
      video: "Відео",
      location: "Локація",
    },
    trust: {
      title: "Довіра й прозорість",
      subtitle: "Тексти й цифри збігаються з офіційним описом для платформ.",
      reviewsTitle: "Відгуки",
      pricesTitle: "Ціни за ніч (грн)",
      priceNote: "Довші періоди дешевші за ніч; точну суму підтвердимо в листуванні.",
      contactTitle: "Зв'язок і бронювання",
      replyHint: "У Telegram зазвичай відповідаємо протягом ~15 хвилин.",
    },
    trustFacts: {
      bookingRating: "9.2★",
      longStayShare: "понад 60%",
      beds: 24,
      quietHours: "22:00–07:00",
      ratingLabel: "на Booking.com",
      stayLabel: "живуть місяцями",
      bedsLabel: "місця",
      quietLabel: "тиша",
    },
    roomsSection: {
      title: "Чотири кімнати. Один стандарт.",
      subtitle: "Ціни та наявність для дат:",
      changeDates: "Змінити дати можна вгорі в блоці бронювання.",
      loading: "Оновлюємо доступність…",
      from: "від",
      perNight: "/ ніч",
      available: "вільно",
      booked: "Зайнято на ці дати",
      bookBtn: "Забронювати",
    },
    honestBlock: {
      title: "Чесно про простір",
      body:
        "Один душ і один туалет (окремо). Зазвичай ~18–20 гостей — черга рухається природно. Якщо потрівен luxury 5★ або вечірки — це не сюди. Якщо важливі чесність, тиша й турбота — ласкаво просимо.",
    },
    vibeStrip: {
      caption: "Кухня, диванна зона, кімнати — без постановки, як у будинку на Січових Стрільців.",
    },
    valueBullets: [
      "Ортопедичні матраци, теплі ковдри, чиста білизна",
      "Господар Victor живе тут і справді допомагає",
      "Повністю обладнана кухня, пральна машина (платно), Wi‑Fi, гаряча вода",
      "Локери з замком, тихий двір і вікна на вулицю",
    ],
    priceTiers: [
      { label: "1–6 ночей", price: 350 },
      { label: "7–29 ночей", price: 280 },
      { label: "30+ ночей", price: 230 },
    ],
    trustQuotes: [
      {
        text: "Ідеальний хостел у Києві. Хороший господар, чисто, свіжа постіль. Гаряча вода завжди.",
        attribution: "відгук гостя, Booking.com",
      },
      {
        text: "Дуже затишно, ніби вдома. Ціна за місяць — одна з найкращих у місті при такій якості.",
        attribution: "відгук гостя",
      },
      {
        text: "Перший раз у хостелі. Спочатку нервувала. Але всі привітні, особливо власник.",
        attribution: "відгук гостя, Booking.com",
      },
    ],
    booking: {
      title: "Бронювання",
      privacyNote: "Надсилаючи форму, ви погоджуєтесь, що дані будуть використані лише для броні.",
      submit: "Надіслати заявку",
      submitting: "Надсилаємо…",
    },
    rooms: [
      {
        id: "female-4a",
        name: "Персик — жіноча кімната",
        desc: "Тихий жіночий простір. Арочні двері, стелі 4 метри, природне світло. Розписана стіна з квітучою сакурою. Ортопедичні матраци, свіжа білизна, індивідуальні локери.",
        capacity: "4 місця",
      },
      {
        id: "female-4b",
        name: "Зелёная — жіноча кімната",
        desc: "Друга затишна жіноча кімната. Вікна на двір, тихо вночі. Ті самі стандарти: ортопедичні матраци, свіжа білизна, локери.",
        capacity: "4 місця",
      },
      {
        id: "male-8",
        name: "Бордо — чоловіча кімната",
        desc: "Простора, з авторським живописом на стінах. Вісім місць для тих, хто цінує окремий простір. Ортопедичні матраци, свіжа білизна, індивідуальні локери.",
        capacity: "8 місць",
      },
      {
        id: "mixed-8",
        name: "Синяя — змішана кімната",
        desc: "Світла кімната з кондиціонером. Ті самі стандарти: ортопедичні матраци, свіжа білизна, індивідуальні локери.",
        capacity: "8 місць",
      },
    ],
  },
  en: {
    siteMeta: {
      title: "Dja Hostel Kyiv — Quiet Place to Stay in Central Kyiv",
      description:
        "A quiet place to stay in central Kyiv — calm, clean, and set up for real life. Owner on-site 24/7. 9.2 on Booking.com.",
    },
    hero: {
      eyebrow: "Kyiv · Historic Centre",
      title: "Sleep · Work · Feel Safe",
      subtitle:
        "You made it. Take a breath. Drop your bag, make some tea, and slow down. This place is for people who value sleep, order, and normal neighbours.",
    },
    nav: {
      trust: "Trust",
      rooms: "Rooms",
      vibe: "Vibe",
      video: "Video",
      location: "Location",
    },
    trust: {
      title: "Trust & Transparency",
      subtitle: "Texts and numbers match our official platform descriptions.",
      reviewsTitle: "Reviews",
      pricesTitle: "Price per night (UAH)",
      priceNote: "Longer stays are cheaper per night; final price confirmed in chat.",
      contactTitle: "Get in touch",
      replyHint: "Usually replies in Telegram within ~15 minutes.",
    },
    trustFacts: {
      bookingRating: "9.2★",
      longStayShare: "over 60%",
      beds: 24,
      quietHours: "22:00–07:00",
      ratingLabel: "on Booking.com",
      stayLabel: "long-term stay",
      bedsLabel: "beds",
      quietLabel: "quiet hours",
    },
    roomsSection: {
      title: "Rooms",
      subtitle: "Prices and availability for:",
      changeDates: "You can change dates in the booking block above.",
      loading: "Updating availability…",
      from: "from",
      perNight: "/ night",
      available: "Beds available",
      booked: "Full for these dates",
      bookBtn: "Book Now",
    },
    honestBlock: {
      title: "Honest about the space",
      body:
        "One shared shower and one toilet. Usually ~18–20 guests — it works fine in practice. If you need a party place, this is not it. If you value peace and respect, you're home.",
    },
    vibeStrip: {
      caption: "Kitchen, common area, rooms — real life at Sichovykh Striltsiv street.",
    },
    valueBullets: [
      "Orthopedic mattresses, fresh linen, individual lockers",
      "Owner Victor lives on-site and actually helps",
      "Fully equipped kitchen, laundry (fee), Wi‑Fi, hot water",
      "Lockers with locks, quiet courtyard, and street-facing windows",
    ],
    priceTiers: [
      { label: "1–6 nights", price: 350 },
      { label: "7–29 nights", price: 280 },
      { label: "30+ nights", price: 230 },
    ],
    trustQuotes: [
      {
        text: "The ideal hostel in Kyiv. Great owner, very clean, fresh linen. Hot water always available.",
        attribution: "review, Booking.com",
      },
      {
        text: "Very cozy, feels like home. Monthly price is one of the best in the city for this quality.",
        attribution: "guest review",
      },
    ],
    booking: {
      title: "Booking",
      privacyNote: "By submitting, you agree that your data is used for booking purposes only.",
      submit: "Book Now",
      submitting: "Sending…",
    },
    stayStory: {
      title: "They came for a few nights. Stayed for months.",
      body: "Not because we asked them to. But because once you sleep well, feel safe, and live in a steady rhythm — leaving doesn't make much sense.",
    },
    forWhom: {
      yesTitle: "You'll feel at home if:",
      yesList: [
        "You're in Kyiv to work, study or relocate",
        "You value sleep",
        "You cook for yourself and need a proper kitchen",
        "You treat shared spaces like your own flat",
        "You're fine living next to the same people for weeks or months",
      ],
      noTitle: "Probably not for you if:",
      noList: [
        "You're looking for a party hostel or a bar downstairs",
        "You often come home late, loud or with company",
        "You smoke indoors or think the corridor is 'basically outside'",
        "Alcohol in the room is your way to relax",
        "You don't like being asked to respect quiet hours",
      ],
    },
    rooms: [
      {
        id: "female-4a",
        name: "Persyk — Women's Room",
        desc: "Quiet, women-only. Arched doors, high 4m ceilings, natural light. Hand-painted cherry blossom wall. Orthopedic mattresses, fresh linen, individual lockers.",
        capacity: "4 beds",
      },
      {
        id: "female-4b",
        name: "Zelёnaya — Women's Room",
        desc: "Courtyard-facing windows, quiet at night. Same standards: orthopedic mattresses, fresh linen, lockers.",
        capacity: "4 beds",
      },
      {
        id: "male-8",
        name: "Bordo — Men's Room",
        desc: "Spacious, with original art on the walls. Same comfort: orthopedic mattresses, fresh linen, individual lockers.",
        capacity: "8 beds",
      },
      {
        id: "mixed-8",
        name: "Sinyaya — Mixed Room",
        desc: "Bright room with AC. Same standards: orthopedic mattresses, fresh linen, individual lockers.",
        capacity: "8 beds",
      },
    ],
  },
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
  lineUA: "вул. Січових Стрільців, 14, Київ",
  lineEN: "14 Sichovykh Striltsiv St, Kyiv",
  metroUA: "Золоті Ворота",
  metroEN: "Zoloti Vorota",
  walkMinutes: 12,
  mapBbox: "30.508,50.464,30.524,50.476" as const,
  mapLabelLat: 50.4702,
  mapLabelLon: 30.5158,
} as const;

export type Locale = keyof typeof DICTIONARY;
export const DEFAULT_LOCALE: Locale = "ua";

export const videoAsset = {
  src: "/video/korridor-raw.mp4",
  poster: "/images/video-poster.jpg",
} as const;

export const videoTourCopy = {
  eyebrow: "Live View",
  title: "A single take of common spaces",
  caption: "No wide lenses or aggressive color-correction. Just a regular morning coffee run.",
  playLabel: "Play",
  soundOn: "Sound On",
  soundOff: "Sound Off"
} as const;

export const chatChips = [
  "Які є кімнати?", 
  "Де ви знаходитесь?", 
  "Скільки коштує проживання?"
];

