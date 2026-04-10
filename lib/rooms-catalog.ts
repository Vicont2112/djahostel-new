/**
 * Статичний каталог кімнат (копірайт, фото).
 * id мають збігатися з рядками в /api/availability (mock або Sheets).
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
    id: "dorm-6",
    name: "Місце в 6-місному номері",
    shortDescription:
      "Світло, високі стелі, зручні ліжка — зручно для тих, хто зупиняється надовго.",
    imageSrc: "/media/rooms/dorm-6.jpg",
    capacityLabel: "до 6 гостей",
  },
  {
    id: "dorm-4",
    name: "Місце в 4-місному номері",
    shortDescription:
      "Трохи менше людей у кімнаті — більше тиші, та сама домашня атмосфера.",
    imageSrc: "/media/rooms/dorm-4.jpg",
    capacityLabel: "до 4 гостей",
  },
  {
    id: "private-twin",
    name: "Двомісний номер (private)",
    shortDescription:
      "Окрема кімната на двох — для пари або друзів, які хочуть приватності.",
    imageSrc: "/media/rooms/private-twin.jpg",
    capacityLabel: "2 гості",
  },
];

export function catalogById(): Map<string, RoomCatalogEntry> {
  return new Map(ROOMS_CATALOG.map((r) => [r.id, r]));
}
