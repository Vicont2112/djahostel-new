import type { AvailabilityResult, IsoDate } from "@/lib/sheets-client";

/** Базова ціна 1–6 ночей з маркетинг-бази; реальні знижки за довгі періоди — у Sheets. */
const NIGHTLY_SHORT_STAY = 350;

const MOCK_ROOMS = [
  { id: "female-4a", name: "Жіночий номер (4 ліжка)",          pricePerNight: NIGHTLY_SHORT_STAY, totalBeds: 4 },
  { id: "female-4b", name: "Жіночий номер (4 ліжка), друга",   pricePerNight: NIGHTLY_SHORT_STAY, totalBeds: 4 },
  { id: "male-8",    name: "Чоловічий номер (8 ліжок)",         pricePerNight: NIGHTLY_SHORT_STAY, totalBeds: 8 },
  { id: "mixed-8",   name: "Змішаний номер (8 ліжок)",          pricePerNight: NIGHTLY_SHORT_STAY, totalBeds: 8 },
] as const;

function hashDates(checkIn: IsoDate, checkOut: IsoDate): number {
  let h = 0;
  const s = checkIn + checkOut;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Детермінований мок: частина кімнат «зайнята» залежно від дат (для демо UI).
 */
export function getMockAvailability(
  checkIn: IsoDate,
  checkOut: IsoDate,
): AvailabilityResult {
  const seed = hashDates(checkIn, checkOut);
  const rooms = MOCK_ROOMS.map((r, i) => {
    const available = (seed + i) % 3 !== 0;
    const availableBeds = available ? Math.max(1, r.totalBeds - ((seed + i) % r.totalBeds)) : 0;
    return {
      id: r.id,
      name: r.name,
      available,
      pricePerNight: r.pricePerNight,
      currency: "UAH",
      totalBeds: r.totalBeds,
      availableBeds,
    };
  });
  return {
    checkIn,
    checkOut,
    rooms,
    source: "mock",
  };
}
