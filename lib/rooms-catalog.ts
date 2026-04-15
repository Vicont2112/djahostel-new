/**
 * Статичний каталог кімнат (копірайт, фото).
 * id мають збігатися з рядками в /api/availability (mock або Sheets).
 * Типологія — з маркетинг-бази Dja Hostel (4 кімнати, 24 ліжка).
 */
export type RoomCatalogEntry = {
  id: string;
  name: string;
  shortDescription: string;
  /** Шлях у public/ */
  imageSrc: string;
  capacityLabel: string;
};

export const ROOMS_CATALOG: RoomCatalogEntry[] = [
  {
    id: "female-4a",
    name: "Жіночий номер (4 ліжка)",
    shortDescription:
      "Окремий жіночий простір, двоярусні ліжка, ортопедичні матраци, розетки біля більшості місць.",
    imageSrc: "/media/rooms/women1-1.jpg",
    capacityLabel: "4 місця",
  },
  {
    id: "female-4b",
    name: "Жіночий номер (4 ліжка), друга кімната",
    shortDescription:
      "Такий самий затишний жіночий номер — у будинку дві чотири місні кімнати для жінок.",
    imageSrc: "/media/rooms/women2-1.jpg",
    capacityLabel: "4 місця",
  },
  {
    id: "male-8",
    name: "Чоловічий номер (8 ліжок)",
    shortDescription:
      "Чоловічий dorm на вісім місць — для тих, хто цінує окремий простір без змішаного заселення.",
    imageSrc: "/media/rooms/men4-1.jpg",
    capacityLabel: "8 місць",
  },
  {
    id: "mixed-8",
    name: "Змішаний номер (8 ліжок)",
    shortDescription:
      "Загальний змішаний номер: PlayStation і книги — в спільній зоні, тут переважно сон і відпочинок.",
    imageSrc: "/media/rooms/men3-1.jpg",
    capacityLabel: "8 місць",
  },
];
