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
  path: string,
  init?: RequestInit,
): Promise<Response> {
  if (!SHEETS_WEBAPP_BASE_URL) {
    throw new SheetsClientError(
      "SHEETS_WEBAPP_BASE_URL is not configured",
      503,
    );
  }
  const url = new URL(path, SHEETS_WEBAPP_BASE_URL.replace(/\/$/, "") + "/");
  const headers = new Headers(init?.headers);
  if (SHEETS_WEBAPP_SECRET) {
    headers.set("X-Webhook-Secret", SHEETS_WEBAPP_SECRET);
  }
  return fetch(url, { ...init, headers });
}

/**
 * Реальна реалізація: GET або POST згідно з вашим doGet/doPost у Apps Script.
 * Плейсхолдер — кинуть помилку, доки не задано SHEETS_WEBAPP_BASE_URL.
 */
export async function fetchAvailabilityFromSheets(
  checkIn: IsoDate,
  checkOut: IsoDate,
): Promise<AvailabilityResult> {
  const res = await fetchWebApp(
    `availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
    { method: "GET", next: { revalidate: 60 } },
  );
  if (!res.ok) {
    throw new SheetsClientError(
      `Availability request failed: ${res.status}`,
      res.status,
    );
  }
  const data = (await res.json()) as AvailabilityResult;
  return { ...data, source: "apps-script" };
}

/**
 * Відправка броні — формат тіла підлаштуйте під існуючий endpoint.
 */
export async function submitBookingToSheets(
  payload: BookingPayload,
): Promise<{ ok: boolean; reference?: string }> {
  const res = await fetchWebApp("booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new SheetsClientError(`Booking failed: ${res.status}`, res.status);
  }
  return res.json() as Promise<{ ok: boolean; reference?: string }>;
}

export function isSheetsConfigured(): boolean {
  return Boolean(SHEETS_WEBAPP_BASE_URL);
}
