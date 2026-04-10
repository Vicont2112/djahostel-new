"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { useBooking } from "@/components/providers/BookingProvider";
import { ROOMS_CATALOG } from "@/lib/rooms-catalog";
import { bookingPrivacyNote, priceTiers } from "@/lib/site-content";

type FormState = "idle" | "submitting" | "success" | "error";

export function BookingForm() {
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
      setMessage("Обраний тип розміщення зайнятий на ці дати. Оберіть інший або змініть дати.");
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
        throw new Error(data.error ?? "Не вдалося надіслати заявку");
      }
      if (!data.ok) {
        throw new Error(data.error ?? "Відмова сервера");
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
      setMessage(err instanceof Error ? err.message : "Помилка");
    }
  }

  return (
    <section
      id="book"
      className="scroll-mt-20 border-b border-olive-muted/30 bg-card/40 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-xl">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
          Бронювання
        </p>
        <p className="mt-2 text-sm text-muted sm:text-base">
          Тарифи за ніч:{" "}
          {priceTiers.map((t, i) => (
            <span key={t.label} className="whitespace-nowrap">
              <span className="font-medium text-foreground">{t.price} грн</span>{" "}
              <span className="text-muted">({t.label})</span>
              {i < priceTiers.length - 1 ? " · " : ""}
            </span>
          ))}
          . Після надсилання{" "}
          <span className="text-foreground">{"зв'яжемося"}</span> з вами
          напряму. Заявка потрапить у HostelDesk/таблицю, коли налаштовано{" "}
          <code className="mx-1 rounded bg-olive-muted/40 px-1 text-xs">
            SHEETS_WEBAPP_BASE_URL
          </code>
          ; у демо референс генерується без запису.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          {bookingPrivacyNote}
        </p>

        <form
          onSubmit={(e) => void onSubmit(e)}
          className="mt-8 flex flex-col gap-5 rounded-2xl border border-olive-muted/50 bg-card p-6 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Заїзд</span>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setDates(e.target.value, checkOut)}
                className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted">Виїзд</span>
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
            <span className="text-muted">Тип розміщення</span>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              required
            >
              {ROOMS_CATALOG.map((r) => {
                const live = byId.get(r.id);
                const label =
                  live != null
                    ? `${r.name} — ${live.available ? "вільно" : "зайнято"} (${live.pricePerNight} ${live.currency}/ніч)`
                    : r.name;
                return (
                  <option key={r.id} value={r.id}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Ім’я</span>
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
            <span className="text-muted">Телефон (необов’язково)</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
              autoComplete="tel"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="text-muted">Коментар</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="resize-y rounded-xl border border-olive-muted/60 bg-background px-3 py-2 text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>

          {status === "success" && (
            <p className="rounded-xl border border-olive-muted/50 bg-olive-muted/25 px-3 py-2 text-sm text-olive-deep">
              Заявку прийнято.
              {reference && (
                <>
                  {" "}
                  Референс: <strong>{reference}</strong>
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
            {status === "submitting" ? "Надсилаємо…" : "Надіслати заявку"}
          </button>
        </form>
      </div>
    </section>
  );
}
