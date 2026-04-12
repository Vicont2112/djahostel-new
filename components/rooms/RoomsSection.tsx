"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { useBooking } from "@/components/providers/BookingProvider";
import { ROOMS_CATALOG } from "@/lib/rooms-catalog";
import Image from "next/image";
import Link from "next/link";

export function RoomsSection() {
  const { dict, locale } = useLanguage();
  const { availability, availabilityLoading, checkIn, checkOut } = useBooking();

  const byId = new Map(availability?.rooms.map((r) => [r.id, r]) ?? []);

  return (
    <section
      id="rooms"
      className="scroll-mt-20 border-b border-olive-muted/30 bg-background px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
          {dict.roomsSection.title}
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          {dict.roomsSection.subtitle}{" "}
          <span className="whitespace-nowrap font-medium text-olive-deep">
            {checkIn}
          </span>{" "}
          —{" "}
          <span className="whitespace-nowrap font-medium text-olive-deep">
            {checkOut}
          </span>
          . {dict.roomsSection.changeDates}
        </p>

        {availabilityLoading && (
          <p className="mt-8 text-sm text-muted">{dict.roomsSection.loading}</p>
        )}

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS_CATALOG.map((room) => {
            const live = byId.get(room.id);
            const available = live?.available ?? false;
            const price = live?.pricePerNight;
            const currency = locale === "ua" ? "грн" : "UAH";
            const dictRoom = dict.rooms.find((r) => r.id === room.id);

            return (
              <article
                key={room.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-olive-muted/50 bg-card shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={room.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs text-muted">
                    {dictRoom?.capacity ?? room.capacityLabel}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h2 className="font-serif text-lg font-medium text-foreground">
                    {dictRoom?.name ?? room.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted">
                    {dictRoom?.desc ?? room.shortDescription}
                  </p>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-olive-muted/30 pt-4">
                    <div>
                      {price != null && (
                        <p className="text-sm text-muted">
                          {dict.roomsSection.from}{" "}
                          <span className="text-lg font-medium text-foreground">
                            {price} {currency}
                          </span>
                          <span className="text-muted"> {dict.roomsSection.perNight}</span>
                        </p>
                      )}
                      <p
                        className={
                          available
                            ? "mt-1 text-xs font-medium text-olive"
                            : "mt-1 text-xs font-medium text-accent"
                        }
                      >
                        {available
                          ? `${(live as Record<string, unknown>)?.availableBeds ?? "?"} ${locale === "ua" ? "з" : "of"} ${(live as Record<string, unknown>)?.totalBeds ?? "?"} ${dict.roomsSection.available}`
                          : dict.roomsSection.booked}
                      </p>
                    </div>
                    <Link
                      href="#book"
                      className="rounded-xl bg-accent/95 px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
                    >
                      {dict.roomsSection.bookBtn}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
