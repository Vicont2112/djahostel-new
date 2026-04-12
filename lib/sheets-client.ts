/**
 * Адаптер до Apps Script / Web App «шахматки» та бронювання.
 * Замініть env-змінні реальними URL після деплою скрипта.
 */

const SHEETS_WEBAPP_BASE_URL =
  process.env.SHEETS_WEBAPP_BASE_URL ?? "";

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

// Мапа для перекладу кімнат між Google Sheets та Frontend
const FRONTEND_TO_SHEETS: Record<string, string> = {
  "female-4a": "Персик",
  "female-4b": "Зелёная",
  "male-8": "Бордо",
  "mixed-8": "Синяя"
};

const SHEETS_TO_FRONTEND: Record<string, string> = {
  "Персик": "female-4a",
  "Зелёная": "female-4b",
  "Бордо": "male-8",
  "Синяя": "mixed-8"
};

/**
 * Отримання шахматки (на 90 днів).
 */
export async function fetchAvailabilityFromSheets(): Promise<AvailabilityResult> {
  const url = `${SHEETS_WEBAPP_BASE_URL}?action=getAvailability&groupBy=type`;
  const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new SheetsClientError(`Availability request failed: ${res.status}`, res.status);
  }
  // @typescript-eslint/no-explicit-any
  const data = (await res.json()) as { error?: string; rooms?: Array<{ roomId: string; roomName: string; available: boolean; pricePerNight: number; currency?: string; bookedDates?: string[] }> };
  if (data.error) {
    throw new SheetsClientError(data.error, 400);
  }
  
  // Мапимо поля з Apps Script (roomId="Персик") на наші (id="female-4a")
  const mappedRooms = (data.rooms || []).map((r) => ({
    id: SHEETS_TO_FRONTEND[r.roomId] || r.roomId,
    name: r.roomName,
    available: r.available,
    pricePerNight: r.pricePerNight,
    currency: r.currency || "UAH",
    bookedDates: r.bookedDates || []
  }));

  return { 
    rooms: mappedRooms, 
    source: "apps-script",
    // Додаємо плейсхолдери для дат, якщо вони потрібні інтерфейсу
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
  const body = {
    action: "createBooking",
    ...payload,
    // Зворотнє мапування: "female-4a" -> "Персик"
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
