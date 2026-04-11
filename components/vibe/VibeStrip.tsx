"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Image from "next/image";

/** Локальні фото з `public/media/gallery` (скопійовано з djahostel-site). */
const STRIP_IMAGES = [
  "/media/gallery/1.jpg",
  "/media/gallery/2.jpg",
  "/media/gallery/kitchen.jpg",
  "/media/gallery/3.jpg",
  "/media/gallery/4.jpg",
  "/media/gallery/5.jpg",
  "/media/gallery/6.jpg",
  "/media/gallery/7.jpg",
  "/media/gallery/8.jpg",
] as const;

/**
 * Горизонтальна стрічка атмосфери: лише візуал, без підписів.
 */
export function VibeStrip() {
  const { dict } = useLanguage();

  return (
    <section
      id="atmosphere"
      aria-label="Атмосфера хостелу"
      className="border-y border-olive-muted/40 bg-card/60 py-10 sm:py-14"
    >
      <p className="mx-auto mb-6 max-w-3xl px-4 text-center text-sm leading-relaxed text-muted sm:px-6">
        {dict.vibeStrip.caption}
      </p>
      <div className="vibe-scroll flex gap-4 overflow-x-auto px-4 pb-1 pt-1 sm:gap-5 sm:px-6">
        {STRIP_IMAGES.map((src) => (
          <figure
            key={src}
            className="relative aspect-[4/5] w-[min(72vw,280px)] shrink-0 overflow-hidden rounded-2xl bg-accent-muted/30 shadow-sm ring-1 ring-olive-muted/40 sm:w-64 md:w-72"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 72vw, 288px"
              loading="lazy"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
