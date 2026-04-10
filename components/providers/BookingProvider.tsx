"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AvailabilityResult } from "@/lib/sheets-client";

function defaultRange(): { checkIn: string; checkOut: string } {
  const today = new Date();
  const inIso = today.toISOString().slice(0, 10);
  const out = new Date(today);
  out.setDate(out.getDate() + 3);
  const outIso = out.toISOString().slice(0, 10);
  return { checkIn: inIso, checkOut: outIso };
}

type BookingContextValue = {
  checkIn: string;
  checkOut: string;
  setDates: (checkIn: string, checkOut: string) => void;
  availability: AvailabilityResult | null;
  availabilityLoading: boolean;
  availabilityError: string | null;
  refreshAvailability: () => Promise<void>;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [{ checkIn, checkOut }, setRange] = useState(defaultRange);
  const [availability, setAvailability] = useState<AvailabilityResult | null>(
    null,
  );
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );

  const setDates = useCallback((ci: string, co: string) => {
    if (ci >= co) {
      const d = new Date(`${ci}T12:00:00`);
      d.setDate(d.getDate() + 1);
      const next = d.toISOString().slice(0, 10);
      setRange({ checkIn: ci, checkOut: next });
      return;
    }
    setRange({ checkIn: ci, checkOut: co });
  }, []);

  const refreshAvailability = useCallback(async () => {
    setAvailabilityLoading(true);
    setAvailabilityError(null);
    try {
      const res = await fetch(
        `/api/availability?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}`,
      );
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Не вдалося завантажити");
      }
      const data = (await res.json()) as AvailabilityResult;
      setAvailability(data);
    } catch (e) {
      setAvailability(null);
      setAvailabilityError(
        e instanceof Error ? e.message : "Помилка мережі",
      );
    } finally {
      setAvailabilityLoading(false);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    void refreshAvailability();
  }, [refreshAvailability]);

  const value = useMemo(
    () => ({
      checkIn,
      checkOut,
      setDates,
      availability,
      availabilityLoading,
      availabilityError,
      refreshAvailability,
    }),
    [
      checkIn,
      checkOut,
      setDates,
      availability,
      availabilityLoading,
      availabilityError,
      refreshAvailability,
    ],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return ctx;
}
