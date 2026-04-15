"use client";

import Image from "next/image";
import { MiniCalendar } from "@/components/booking/MiniCalendar";
import { useBooking } from "@/components/providers/BookingProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";

const HERO_IMAGE = "/media/hero/hero.jpg";

export function HeroSection() {
  const { dict, locale } = useLanguage();
  const {
    checkIn,
    checkOut,
    setDates,
    availability,
    availabilityLoading: loading,
    availabilityError: error,
    refreshAvailability,
  } = useBooking();

  const freeRooms = availability?.rooms.filter((r) => r.available).length ?? 0;
  const freeBeds = availability?.rooms.reduce((sum, r) => sum + (r.availableBeds ?? 0), 0) ?? 0;
  const totalBeds = availability?.rooms.reduce((sum, r) => sum + (r.totalBeds ?? 0), 0) || 24;

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover ken-burns-slow"
          sizes="100vw"
        />
        <div className="hero-veil absolute inset-0" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-14 pt-8 sm:gap-12 sm:px-8 sm:pb-20 sm:pt-12 md:gap-14 md:pb-24">
        <div className="max-w-xl md:max-w-2xl">
          <p className="mb-3 text-xs font-normal uppercase tracking-[0.2em] text-[#f0ebe3]/90 sm:text-sm">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[1.65rem] font-medium leading-snug text-[#faf8f4] sm:text-4xl md:text-[2.65rem] md:leading-tight">
            {dict.hero.title}
          </h1>
          <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-[#ebe6dc]/95 sm:text-lg">
            {dict.hero.subtitle}
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#faf8f4]/90 backdrop-blur-sm">
              {dict.trustFacts.bookingRating} {dict.trustFacts.ratingLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#faf8f4]/90 backdrop-blur-sm">
              {dict.trustFacts.longStayShare} {dict.trustFacts.stayLabel}
            </span>
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-[#faf8f4]/90 backdrop-blur-sm">
              {dict.trustFacts.quietHours} {dict.trustFacts.quietLabel}
            </span>
          </div>
        </div>

        <MiniCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          onDatesChange={setDates}
          onCheckAvailability={() => refreshAvailability()}
        />

        <div className="flex min-h-[2.75rem] flex-col gap-3 text-sm leading-relaxed text-[#e8e3da]/90">
          {loading && (
            <p>{locale === "ua" ? "Глядаємо вільні місця…" : "Checking availability…"}</p>
          )}
          {error && <p className="text-[#f5d4c8]">{error}</p>}
          {!loading && !error && availability && (
            <>
              <p>
                {freeRooms > 0 ? (
                  <>
                    {locale === "ua" ? "Вільно на обрані дати: " : "Available for these dates: "}
                    <span className="font-medium text-[#faf8f4]">
                      {availability.source === "mock"
                        ? `${freeRooms} ${locale === "ua" ? "з 4 кімнат" : "of 4 rooms"}`
                        : `${freeBeds} ${locale === "ua" ? `з ${totalBeds} місць` : `of ${totalBeds} beds`}`}
                    </span>
                    {availability.source === "mock" && (
                      <span className="text-[#dcd5c9]/80">
                        {" "}({locale === "ua" ? "демо" : "demo"})
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    {locale === "ua"
                      ? "На ці дати немає вільних місць — спробуйте інші дати."
                      : "No availability for these dates — try other dates."}
                  </>
                )}
              </p>

              {freeRooms > 0 && (
                <a
                  href="#book"
                  className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-accent/95 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover"
                >
                  {locale === "ua" ? "Обрати кімнату та забронювати" : "Choose a room & book"}
                  <span aria-hidden>→</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
