"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function SiteHeader() {
  const { locale, setLocale } = useLanguage();

  const NAV = [
    { href: "/#trust", label: locale === "ua" ? "Довіра" : "Trust" },
    { href: "/#rooms", label: locale === "ua" ? "Кімнати" : "Rooms" },
    { href: "/rules", label: locale === "ua" ? "Правила" : "Rules" },
    { href: "/faq", label: locale === "ua" ? "Питання" : "FAQ" },
    { href: "/#location", label: locale === "ua" ? "Локація" : "Location" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-olive-muted/40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 sm:py-4">
        <div className="flex items-center gap-6">
          <Link
            href="/#top"
            className="font-serif text-lg tracking-tight text-foreground transition hover:text-olive"
          >
            DJA Hostel
          </Link>
          <div className="flex gap-2 text-xs font-semibold uppercase tracking-widest">
            <button
              onClick={() => setLocale("ua")}
              className={`transition ${locale === "ua" ? "text-olive-deep" : "text-muted/50 hover:text-muted"}`}
            >
              UA
            </button>
            <span className="text-muted/20">|</span>
            <button
              onClick={() => setLocale("en")}
              className={`transition ${locale === "en" ? "text-olive-deep" : "text-muted/50 hover:text-muted"}`}
            >
              EN
            </button>
          </div>
        </div>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-muted sm:gap-x-8"
          aria-label={locale === "ua" ? "Головна навігація" : "Main navigation"}
        >
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-olive-deep hover:underline hover:underline-offset-4"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
