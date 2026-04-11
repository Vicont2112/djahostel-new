"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useBooking } from "@/components/providers/BookingProvider";
import { ROOMS_CATALOG } from "@/lib/rooms-catalog";

type FormState = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
  const { dict, locale } = useLanguage();
  const { checkIn, checkOut, setDates, availability, refreshAvailability } =
    useBooking();
  const [roomId, setRoomId] = useState(ROOMS_CATALOG[0]?.id ?? "");
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const byId = useMemo(
    () => new Map(availability?.rooms.map((r) => [r.id, r]) ?? []),
    [availability],
  );
  const selectedLive = roomId ? byId.get(roomId) : undefined;
  const selectedAvailable = selectedLive?.available ?? false;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setReference(null);
    if (!selectedAvailable) {
      setStatus("error");
      setMessage(locale === "ua" 
        ? "Обраний тип розміщення зайнятий на ці дати. Оберіть інший або змініть дати." 
        : "Selected room type is fully booked for these dates. Please choose another or change dates.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn,
          checkOut,
          roomId,
          guestName: guestName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          note: note.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(data.error ?? (locale === "ua" ? "Не вдалося надіслати заявку" : "Failed to send request"));
      }
      if (!data.ok) {
        throw new Error(data.error ?? (locale === "ua" ? "Відмова сервера" : "Server error"));
      }
      setStatus("success");
      setReference(data.reference ?? null);
      setGuestName("");
      setEmail("");
      setPhone("");
      setNote("");
      await refreshAvailability();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : (locale === "ua" ? "Помилка" : "Error"));
    }
  }

  return (
    <section
      id="book"
      className="scroll-mt-20 border-b border-olive-muted/30 bg-card/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
          {dict.booking.title}
        </p>
        <div className="mt-2 text-sm text-muted sm:text-base">
          {locale === "ua" ? "Тарифи за ніч:" : "Rates per night:"}{" "}
          {dict.priceTiers.map((t, i) => (
            <span key={t.label} className="whitespace-nowrap">
              <span className="font-medium text-foreground">{t.price} {locale === "ua" ? "грн" : "UAH"}</span>{" "}
              <span className="text-muted">({t.label})</span>
              {i < dict.priceTiers.length - 1 ? " · " : ""}
            </span>
          ))}
          . {locale === "ua" ? "Після надсилання" : "After submitting,"}{" "}
          <span className="text-foreground">{locale === "ua" ? "зв'яжемося" : "we will contact"}</span> {locale === "ua" ? "з вами напряму." : "you directly."}
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {dict.booking.privacyNote}
        </p>

        <form
          onSubmit={(e) => void onSubmit(e)}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-olive-muted/50 bg-card p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">{locale === "ua" ? "Заїзд" : "Check-in"}</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setDates(e.target.value, checkOut)}
                className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">{locale === "ua" ? "Виїзд" : "Check-out"}</span>
              <input
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setDates(checkIn, e.target.value)}
                className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{locale === "ua" ? "Тип розміщення" : "Room Type"}</span>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              required
            >
              {ROOMS_CATALOG.map((r) => {
                const live = byId.get(r.id);
                const dictRoom = dict.rooms.find(dr => dr.id === r.id);
                const roomName = dictRoom?.name ?? r.name;
                const label =
                  live != null
                    ? `${roomName} — ${live.available ? (locale === "ua" ? "вільно" : "available") : (locale === "ua" ? "зайнято" : "booked")} (${live.pricePerNight} ${locale === "ua" ? "грн" : "UAH"}/${locale === "ua" ? "ніч" : "night"})`
                    : roomName;
                return (
                  <option key={r.id} value={r.id}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{locale === "ua" ? "Ім’я" : "Name"}</span>
            <input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              required
              autoComplete="name"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              required
              autoComplete="email"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{locale === "ua" ? "Телефон (необов’язково)" : "Phone (optional)"}</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              autoComplete="tel"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">{locale === "ua" ? "Коментар" : "Note"}</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="resize-y rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>

          {status === "success" && (
            <p className="rounded-xl border border-olive-muted/50 bg-olive-muted/25 px-3 py-2 text-sm text-olive-deep">
              {locale === "ua" ? "Заявку прийнято." : "Request received."}
              {reference && (
                <>
                  {" "}
                  {locale === "ua" ? "Референс:" : "Reference:"} <strong>{reference}</strong>
                </>
              )}
            </p>
          )}
          {status === "error" && message && (
            <p className="text-sm text-accent">{message}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-xl bg-accent px-4 py-3 text-base font-medium text-white transition hover:bg-accent-hover disabled:opacity-50"
          >
            {status === "submitting" ? dict.booking.submitting : dict.booking.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
