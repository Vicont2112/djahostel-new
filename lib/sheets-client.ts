/**
 * Адаптер до Apps Script / Web App «шахматки» та бронювання.
 * Замініть env-змінні реальними URL після деплою скрипта.
 */

const SHEETS_WEBAPP_BASE_URL =
  process.env.SHEETS_WEBAPP_BASE_URL ?? "";
const SHEETS_WEBAPP_SECRET =
  process.env.SHEETS_WEBAPP_SECRET ?? "";

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

async function fetchWebApp(
  init?: RequestInit,
): Promise<Response> {
  if (!SHEETS_WEBAPP_BASE_URL) {
    throw new SheetsClientError(
      "SHEETS_WEBAPP_BASE_URL is not configured",
      503,
    );
  }
  const headers = new Headers(init?.headers);
  if (SHEETS_WEBAPP_SECRET) {
    headers.set("X-Webhook-Secret", SHEETS_WEBAPP_SECRET);
  }
  return fetch(SHEETS_WEBAPP_BASE_URL, { ...init, headers });
}

/**
 * Отримання шахматки (на 90 днів).
 */
export async function fetchAvailabilityFromSheets(): Promise<AvailabilityResult> {
  const url = `${SHEETS_WEBAPP_BASE_URL}?action=getAvailability&groupBy=type`;
  const res = await fetch(url, { method: "GET", next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new SheetsClientError(`Availability request failed: ${res.status}`, res.status);
  }
  
  const data = (await res.json()) as any;
  if (data.error) {
    throw new SheetsClientError(data.error, 400);
  }
  
  // Мапимо поля з Apps Script (roomId, roomName) на наші (id, name)
  const mappedRooms = (data.rooms || []).map((r: any) => ({
    id: r.roomId,
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
  };
  
  const res = await fetch(SHEETS_WEBAPP_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    throw new SheetsClientError(`Booking failed: ${res.status}`, res.status);
  }
  
  const data = (await res.json()) as any;
  if (data.error) {
    throw new SheetsClientError(data.error, 400);
  }
  
  return { ok: data.success, reference: data.bookingId };
}

export function isSheetsConfigured(): boolean {
  return Boolean(SHEETS_WEBAPP_BASE_URL);
}
