import { NextResponse } from "next/server";
import { z } from "zod";
import {
  isSheetsConfigured,
  SheetsClientError,
  submitBookingToSheets,
} from "@/lib/sheets-client";

export const dynamic = "force-dynamic";

const bookingSchema = z
  .object({
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    roomId: z.string().min(1).max(64),
    guestName: z.string().min(1).max(120),
    email: z.string().email().max(254),
    phone: z.string().max(40).optional(),
    note: z.string().max(2000).optional(),
  })
  .refine((d) => d.checkIn < d.checkOut, {
    message: "checkOut must be after checkIn",
    path: ["checkOut"],
  });

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Некоректні або неповні дані форми" },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  try {
    if (isSheetsConfigured()) {
      const result = await submitBookingToSheets(payload);
      return NextResponse.json(result);
    }
  } catch (e) {
    console.error("[booking]", e);
    const status =
      e instanceof SheetsClientError ? (e.status ?? 502) : 502;
    return NextResponse.json(
      {
        ok: false,
        error:
          e instanceof Error ? e.message : "Помилка з’єднання з бронюванням",
      },
      { status: status >= 400 && status < 600 ? status : 502 },
    );
  }

  const reference = `DEMO-${Date.now()}`;
  return NextResponse.json({ ok: true, reference });
}
