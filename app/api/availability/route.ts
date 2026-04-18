import { NextResponse } from "next/server";
import { getMockAvailability } from "@/lib/mock-availability";
import {
  fetchAvailabilityFromSheets,
  isSheetsConfigured,
} from "@/lib/sheets-client";
import { getSupabaseAvailability } from "@/lib/supabase";

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
    // Priority 1: Supabase (Level 2 Architecture)
    const supabaseData = await getSupabaseAvailability(checkIn, checkOut);
    
    if (supabaseData && supabaseData.length > 0) {
      return NextResponse.json({
        checkIn,
        checkOut,
        rooms: supabaseData.map(r => ({
          id: r.roomId,
          name: r.roomName,
          available: r.beds.some(b => b.isAvailable),
          availableBeds: r.beds.filter(b => b.isAvailable).length,
          totalBeds: r.beds.length,
          pricePerNight: 600, // Shared logic or fetch from room
          currency: "UAH",
          beds: r.beds // Pass through total bed details for FloorPlan
        })),
        source: "supabase"
      });
    }

    // Priority 2: Google Sheets
    if (isSheetsConfigured()) {
      const data = await fetchAvailabilityFromSheets(checkIn, checkOut);
      return NextResponse.json(data);
    }
  } catch (e) {
    console.error("[availability] Supabase/Sheets error:", e);
  }

  // Fallback: Mock
  return NextResponse.json(getMockAvailability(checkIn, checkOut));
}
