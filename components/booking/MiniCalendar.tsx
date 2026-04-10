"use client";

import { useCallback, useMemo } from "react";

export type MiniCalendarProps = {
  /** Керовані дати (разом з onDatesChange). */
  checkIn: string;
  checkOut: string;
  onDatesChange: (checkIn: string, checkOut: string) => void;
  onCheckAvailability?: () => void | Promise<void>;
};

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function MiniCalendar({
  checkIn,
  checkOut,
  onDatesChange,
  onCheckAvailability,
}: MiniCalendarProps) {
  const min = todayIso();

  const valid = useMemo(
    () => Boolean(checkIn && checkOut && checkIn < checkOut && checkIn >= min),
    [checkIn, checkOut, min],
  );

  const setIn = useCallback(
    (v: string) => onDatesChange(v, checkOut),
    [checkOut, onDatesChange],
  );
  const setOut = useCallback(
    (v: string) => onDatesChange(checkIn, v),
    [checkIn, onDatesChange],
  );

  const onBook = useCallback(() => {
    if (!valid) return;
    void onCheckAvailability?.();
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
  }, [onCheckAvailability, valid]);

  return (
    <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-white/18 bg-[#fdfbf6]/14 p-5 shadow-sm backdrop-blur-md sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-[#f5f1ea]/95">
          <span className="font-normal text-[#ebe6dc]/90">Заїзд</span>
          <input
            type="date"
            min={min}
            value={checkIn}
            onChange={(e) => setIn(e.target.value)}
            className="rounded-xl border border-[#e5ddd0]/50 bg-[#fffcf8]/95 px-3 py-2.5 text-foreground outline-none ring-olive-muted focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-[#f5f1ea]/95">
          <span className="font-normal text-[#ebe6dc]/90">Виїзд</span>
          <input
            type="date"
            min={checkIn || min}
            value={checkOut}
            onChange={(e) => setOut(e.target.value)}
            className="rounded-xl border border-[#e5ddd0]/50 bg-[#fffcf8]/95 px-3 py-2.5 text-foreground outline-none ring-olive-muted focus:ring-2"
          />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <button
          type="button"
          onClick={onBook}
          disabled={!valid}
          className="flex-1 rounded-xl bg-accent/95 px-5 py-3.5 text-center text-base font-medium text-white shadow-sm transition hover:bg-accent-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
        >
          Забронювати
        </button>
        <button
          type="button"
          disabled={!valid}
          onClick={() => valid && void onCheckAvailability?.()}
          className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-normal text-[#faf8f4] transition hover:bg-white/14 disabled:opacity-45"
        >
          Перевірити наявність
        </button>
      </div>
    </div>
  );
}
