/**
 * Адаптер до Apps Script / Web App «шахматки» та бронювання.
 * Замініть env-змінні реальними URL після деплою скрипта.
 */

const SHEETS_WEBAPP_BASE_URL =
  process.env.SHEETS_WEBAPP_BASE_URL ||
  process.env.NEXT_PUBLIC_SHEETS_WEBAPP_BASE_URL ||
  "";

export type IsoDate = string;

export type AvailabilityRoom = {
  id: string;
  name: string;
  available: boolean;
  pricePerNight: number;
  currency: string;
};

export type AvailabilityResult = {
  checkIn: IsoDate;
  checkOut: IsoDate;
  rooms: AvailabilityRoom[];
  source: "apps-script" | "mock";
};

export type BookingPayload = {
  checkIn: IsoDate;
  checkOut: IsoDate;
  roomId: string;
  guestName: string;
  email: string;
  phone?: string;
  note?: string;
};

export class SheetsClientError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "SheetsClientError";
  }
}

/**
 * Маппинг префіксу ліжка → id фронтенду.
 * П-1..П-4 = Персик = female-4a
 * З-1..З-4 = Зелёная = female-4b
 * Б-1..Б-8 = Бордо = male-8
 * С-1..С-8 = Синяя = mixed-8
 */
const BED_PREFIX_TO_ROOM: Record<string, { frontendId: string; name: string }> = {
  "П": { frontendId: "female-4a", name: "Персик" },
  "З": { frontendId: "female-4b", name: "Зелена" },
  "Б": { frontendId: "male-8", name: "Бордо" },
  "С": { frontendId: "mixed-8", name: "Синя" },
};

function getBedPrefix(roomName: string): string {
  // "П-1 (r1)" → "П", "З-3" → "З"
  const m = roomName.match(/^([А-ЯA-Z])/i);
  return m ? m[1].toUpperCase() : roomName;
}

/**
 * Отримання шахматки (на 90 днів).
 * API повертає 24 окремих ліжка — агрегуємо в 4 кімнати.
 */
export async function fetchAvailabilityFromSheets(): Promise<AvailabilityResult> {
  // Fetch individual beds (no groupBy)
  const url = `${SHEETS_WEBAPP_BASE_URL}?action=getAvailability`;
  const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new SheetsClientError(`Availability request failed: ${res.status}`, res.status);
  }
  const data = (await res.json()) as { 
    error?: string; 
    rooms?: Array<{ roomId: string; roomName: string; available: boolean; pricePerNight: number; bookedDates?: string[] }>;
    debug?: { roomsCount: number; bookingsCount: number };
  };
  if (data.error) {
    throw new SheetsClientError(data.error, 400);
  }
  
  // Aggregate 24 beds → 4 rooms
  const roomGroups: Record<string, { 
    frontendId: string; name: string; 
    totalBeds: number; availableBeds: number; 
    price: number; allBookedDates: string[] 
  }> = {};
  
  for (const bed of (data.rooms || [])) {
    const prefix = getBedPrefix(bed.roomName);
    const mapping = BED_PREFIX_TO_ROOM[prefix];
    if (!mapping) continue;
    
    if (!roomGroups[mapping.frontendId]) {
      roomGroups[mapping.frontendId] = {
        frontendId: mapping.frontendId,
        name: mapping.name,
        totalBeds: 0,
        availableBeds: 0,
        price: bed.pricePerNight,
        allBookedDates: [],
      };
    }
    const grp = roomGroups[mapping.frontendId];
    grp.totalBeds++;
    if (bed.available) grp.availableBeds++;
    if (bed.bookedDates) grp.allBookedDates.push(...bed.bookedDates);
  }
  
  const mappedRooms = Object.values(roomGroups).map((grp) => ({
    id: grp.frontendId,
    name: grp.name,
    available: grp.availableBeds > 0,
    pricePerNight: grp.price,
    currency: "UAH",
    totalBeds: grp.totalBeds,
    availableBeds: grp.availableBeds,
  }));

  return { 
    rooms: mappedRooms, 
    source: "apps-script",
    checkIn: "", 
    checkOut: ""
  } as AvailabilityResult;
}

/**
 * Відправка броні.
 */
export async function submitBookingToSheets(
  payload: BookingPayload,
): Promise<{ ok: boolean; reference?: string }> {
  // Зворотнє мапування: "female-4a" -> "Персик"
  const FRONTEND_TO_SHEETS: Record<string, string> = {
    "female-4a": "Персик",
    "female-4b": "Зелена",
    "male-8": "Бордо",
    "mixed-8": "Синя"
  };
  const body = {
    action: "createBooking",
    ...payload,
    roomId: FRONTEND_TO_SHEETS[payload.roomId] || payload.roomId
  };
  
  const res = await fetch(SHEETS_WEBAPP_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    throw new SheetsClientError(`Booking failed: ${res.status}`, res.status);
  }
  const data = (await res.json()) as { error?: string; success: boolean; bookingId?: string };
  if (data.error) {
    throw new SheetsClientError(data.error, 400);
  }
  
  return { ok: data.success, reference: data.bookingId };
}

export function isSheetsConfigured(): boolean {
  return Boolean(SHEETS_WEBAPP_BASE_URL);
}
