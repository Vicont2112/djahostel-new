export const rulesContent = {
  ua: {
    title: "Як ми тут живемо",
    subtitle: "Це не збірник правил. Просто так у нас влаштоване життя — щоб усі добре спали, готували на чистій кухні й почувалися як удома.",
    principles: [
      { icon: "☮", label: "Повага одне до одного" },
      { icon: "🧹", label: "Прибирай за собою" },
      { icon: "🌿", label: "Спокійна атмосфера" }
    ],
    intro: [
      "Це місце тримається на довірі та здоровому глузді.",
      "Тут немає менеджера, який стежить за кожним кроком. Просто люди живуть разом і ставляться з повагою до простору та одне до одного.",
      "Якщо тобі близький такий формат — тобі тут буде комфортно."
    ],
    rhythm: [
      { time: "14:00", label: "Заселення" },
      { time: "12:00", label: "Виїзд" },
      { time: "22:00–07:00", label: "Тихий час" }
    ],
    rhythmNote: "У цей час люди відпочивають, тому будь ласка зберігайте тишу в кімнатах і спільних зонах.",
    sections: [
      {
        title: "Кухня",
        icon: "🍳",
        items: [
          { type: "do", title: "Готуєш — прибираєш", desc: "Помий посуд одразу. Витри плиту й стіл. Не залишай «на потім» — це вже чиясь проблема." },
          { type: "do", title: "Підписуй продукти", desc: "Ім’я + дата на всьому. Що без підпису — може піти у смітник." },
          { type: "do", title: "Тиха кухня після 22:00", desc: "Без грюкання посудом, без музики. Люди відпочивають." },
          { type: "dont", title: "Чуже не чіпай", desc: "Завжди питай. Навіть якщо «здається, що ніхто не їсть»." }
        ]
      },
      {
        title: "Душ",
        icon: "🚿",
        items: [
          { type: "do", title: "До 15 хвилин", desc: "Гаряча вода — спільний ресурс. Якщо хтось чекає, будь швидким." },
          { type: "do", title: "Залишай чисто", desc: "Вода на підлозі? Витри. Волосся? Прибери за собою. Наступна людина — не твоя прибиральниця." },
          { type: "do", title: "Забирай своє", desc: "Шампунь, рушник — повертай у кімнату або локер після кожного використання." },
          { type: "do", title: "Провітри", desc: "Залиш двері відкритими на 5 хвилин після душу — щоб зменшити вологість." }
        ]
      }
    ],
    forbidden: {
      title: "🚫 ЗАБОРОНЕНО",
      items: [
        { icon: "🚭", title: "Куріння", desc: "Куріння та вейпи заборонені. Так ми живемо." },
        { icon: "🍷", title: "Алкоголь", desc: "У кімнатах і спільних зонах — ні алкоголю, ні перебування в такому стані. Нуль толерантності." },
        { icon: "💊", title: "Наркотики", desc: "Негайне виселення + поліція. Без другого шансу." },
        { icon: "🔪", title: "Зброя", desc: "Будь-яка. Без винятків." }
      ]
    }
  },
  en: {
    title: "How We Live Here",
    subtitle: "This isn't a rulebook. It's simply how life works here so everyone can sleep well, cook in a clean kitchen, and feel at home.",
    principles: [
      { icon: "☮", label: "Respect each other" },
      { icon: "🧹", label: "Clean up after yourself" },
      { icon: "🌿", label: "Keep the atmosphere calm" }
    ],
    intro: [
      "This place runs on trust and common sense.",
      "There's no manager watching your every move. Just people sharing a home and treating the space — and each other — with respect.",
      "If that sounds like your kind of place, you'll feel comfortable here."
    ],
    rhythm: [
      { time: "14:00", label: "Check-in" },
      { time: "12:00", label: "Check-out" },
      { time: "22:00–07:00", label: "Quiet hours" }
    ],
    rhythmNote: "During these hours people are resting, so please keep noise low in rooms and common areas.",
    sections: [
      {
        title: "Kitchen",
        icon: "🍳",
        items: [
          { type: "do", title: "Cook it — clean it", desc: "Wash your dishes right after. Wipe the stove and table. Don’t leave it ‘for later’ — that’s someone else’s mess." },
          { type: "do", title: "Label your food", desc: "Name + date on everything. Unlabelled food may be thrown away." },
          { type: "do", title: "Quiet kitchen after 22:00", desc: "No clanging pots. No music. People are winding down for the night." },
          { type: "dont", title: "Don’t take what isn’t yours", desc: "Always ask first — even if it \"looks like nobody’s eating it.\"" }
        ]
      },
      {
        title: "Shower",
        icon: "🚿",
        items: [
          { type: "do", title: "15 minutes max", desc: "Hot water is shared. If someone’s waiting, keep it short." },
          { type: "do", title: "Leave it clean", desc: "Water on the floor? Wipe it. Hair? Clean it up. The next person isn't your cleaner." },
          { type: "do", title: "Take your things back", desc: "Shampoo, towel — bring everything back to your room or locker after each use." },
          { type: "do", title: "Ventilate", desc: "Leave the door open for 5 minutes after your shower to reduce moisture." }
        ]
      }
    ],
    forbidden: {
      title: "🚫 NOT ALLOWED",
      items: [
        { icon: "🚭", title: "No smoking", desc: "No smoking or vaping. Includes e-cigarettes. That's how we live." },
        { icon: "🍷", title: "Alcohol", desc: "No alcohol or being under the influence in rooms or common areas. Zero tolerance." },
        { icon: "💊", title: "Drugs", desc: "Immediate eviction and possible police involvement. No second chances." },
        { icon: "🔪", title: "Weapons", desc: "Any kind. No exceptions." }
      ]
    }
  }
};
