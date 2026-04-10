import { NextResponse } from "next/server";
import { getMockAvailability } from "@/lib/mock-availability";
import {
  fetchAvailabilityFromSheets,
  isSheetsConfigured,
  SheetsClientError,
} from "@/lib/sheets-client";

export const dynamic = "force-dynamic";

function parseDateParam(value: string | null): string | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return value;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkIn = parseDateParam(searchParams.get("checkIn"));
  const checkOut = parseDateParam(searchParams.get("checkOut"));

  if (!checkIn || !checkOut) {
    return NextResponse.json(
      { error: "checkIn and checkOut required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  if (checkIn >= checkOut) {
    return NextResponse.json(
      { error: "checkOut must be after checkIn" },
      { status: 400 },
    );
  }

  try {
    if (isSheetsConfigured()) {
      const data = await fetchAvailabilityFromSheets(checkIn, checkOut);
      return NextResponse.json(data);
    }
  } catch (e) {
    if (e instanceof SheetsClientError && e.status === 503) {
      // fall through to mock
    } else {
      console.error("[availability]", e);
      return NextResponse.json(
        { error: "Availability service error" },
        { status: 502 },
      );
    }
  }

  return NextResponse.json(getMockAvailability(checkIn, checkOut));
}
