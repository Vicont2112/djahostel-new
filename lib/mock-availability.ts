import type { AvailabilityResult, IsoDate } from "@/lib/sheets-client";

const MOCK_ROOMS = [
  {
    id: "dorm-6",
    name: "Спальне місце в 6-місному номері",
    pricePerNight: 450,
  },
  {
    id: "dorm-4",
    name: "Місце в 4-місному номері",
    pricePerNight: 520,
  },
  {
    id: "private-twin",
    name: "Двомісний номер (private)",
    pricePerNight: 1200,
  },
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
  const rooms = MOCK_ROOMS.map((r, i) => ({
    id: r.id,
    name: r.name,
    available: (seed + i) % 3 !== 0,
    pricePerNight: r.pricePerNight,
    currency: "UAH",
  }));
  return {
    checkIn,
    checkOut,
    rooms,
    source: "mock",
  };
}
