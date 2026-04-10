"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { videoAsset, videoTourCopy } from "@/lib/site-content";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function saveDataEnabled(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };
  return Boolean(nav.connection?.saveData);
}

/**
 * Відео-тур: підвантаження близько до viewport; без автоплею при
 * `prefers-reduced-motion` або Save-Data — явний «Play»; звук окремою кнопкою.
 */
export function VideoTourSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [needsConsent, setNeedsConsent] = useState(false);
  const [nativeControls, setNativeControls] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        setNeedsConsent(prefersReducedMotion() || saveDataEnabled());
        setShouldLoad(true);
        obs.disconnect();
      },
      { rootMargin: "140px 0px", threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const tryAutoplay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    setMuted(true);
    void v.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (!shouldLoad || needsConsent) return;
    tryAutoplay();
  }, [shouldLoad, needsConsent, tryAutoplay]);

  const onConsentPlay = useCallback(() => {
    if (prefersReducedMotion() || saveDataEnabled()) {
      setNativeControls(true);
    }
    setNeedsConsent(false);
    requestAnimationFrame(() => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = true;
      setMuted(true);
      void v.play().catch(() => {});
    });
  }, []);

  const toggleSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <section
      id="video-tour"
      aria-labelledby="video-tour-heading"
      className="scroll-mt-20 border-y border-olive-muted/35 bg-olive-deep px-4 py-16 text-[#f5f0e6] sm:px-6 sm:py-20"
    >
      <div ref={wrapRef} className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-normal uppercase tracking-[0.2em] text-[#e8dcc8]/90">
          {videoTourCopy.eyebrow}
        </p>
        <h2
          id="video-tour-heading"
          className="mt-2 text-center font-serif text-2xl font-medium text-[#faf8f4] sm:text-3xl"
        >
          {videoTourCopy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#dcd5c9] sm:text-base">
          {videoTourCopy.caption}
        </p>

        <div className="relative mx-auto mt-10 max-w-4xl">
          {!shouldLoad && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#2a3228] ring-1 ring-[#faf8f4]/15">
              <Image
                src={videoAsset.poster}
                alt=""
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 896px) 100vw, 896px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 px-4 text-center text-sm text-[#faf8f4]/90">
                Прокрутіть ближче — відео підвантажиться автоматично
              </div>
            </div>
          )}

          {shouldLoad && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-[#faf8f4]/15">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={videoAsset.poster}
                playsInline
                loop
                muted={muted}
                preload="metadata"
                controls={nativeControls}
                aria-label={videoTourCopy.title}
              >
                <source src={videoAsset.src} type="video/mp4" />
              </video>

              {needsConsent && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 p-4 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={() => onConsentPlay()}
                    className="rounded-full bg-[#faf8f4] px-6 py-3 text-sm font-medium text-olive-deep shadow-md transition hover:bg-white"
                  >
                    {videoTourCopy.playLabel}
                  </button>
                  <p className="max-w-xs text-center text-xs text-[#ebe6dc]/90">
                    Увімкнено збереження трафіку або зменшення руху в системі —
                    відео стартує лише після натиску.
                  </p>
                </div>
              )}

              {!needsConsent && !nativeControls && (
                <button
                  type="button"
                  onClick={() => toggleSound()}
                  className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-[#faf8f4] shadow-md ring-1 ring-white/20 transition hover:bg-black/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0e6d4]"
                  aria-pressed={!muted}
                  aria-label={muted ? videoTourCopy.soundOn : videoTourCopy.soundOff}
                  title={muted ? videoTourCopy.soundOn : videoTourCopy.soundOff}
                >
                  {muted ? <VolumeMutedIcon /> : <VolumeOnIcon />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function VolumeMutedIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M17 9l4 4m0-4l-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 5L6 9H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2l5 4V5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9.5a3 3 0 0 1 0 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M17.5 7.5a6 6 0 0 1 0 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
