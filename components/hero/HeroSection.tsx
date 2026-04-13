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

  const freeCount = availability?.rooms.filter((r) => r.available).length ?? 0;

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
          {dict.hero.warmIntro && (
            <p className="mt-6 max-w-lg font-serif text-lg italic leading-relaxed text-[#f4d03f]/80 sm:text-xl">
              {dict.hero.warmIntro}
            </p>
          )}
        </div>

        <MiniCalendar
          checkIn={checkIn}
          checkOut={checkOut}
          onDatesChange={setDates}
          onCheckAvailability={() => refreshAvailability()}
        />

        <div className="min-h-[2.75rem] text-sm leading-relaxed text-[#e8e3da]/90">
          {loading && <p>{locale === "ua" ? "Глядаємо вільні місця…" : "Checking availability…"}</p>}
          {error && <p className="text-[#f5d4c8]">{error}</p>}
          {!loading && !error && availability && (
            <p>
              {freeCount > 0 ? (
                <>
                  {locale === "ua" ? "На обрані дати є варіанти: " : "Options available for these dates: "}
                  <span className="font-medium text-[#faf8f4]">
                    {freeCount} {locale === "ua" ? "з" : "of"} {availability.rooms.length}
                  </span>
                  {availability.source === "mock" && (
                    <span className="text-[#dcd5c9]/80"> ({locale === "ua" ? "демо" : "demo"})</span>
                  )}
                </>
              ) : (
                <>{locale === "ua" ? "На ці дати в демо немає вільних місць — спробуйте інші дати." : "No availability for these dates in demo — try other dates."}</>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
