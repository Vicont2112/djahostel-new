"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { faqContent } from "@/lib/faq-content";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export default function FAQPage() {
  const { locale } = useLanguage();
  const dict = faqContent[locale];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <header className="relative overflow-hidden bg-olive-muted/20 py-16 text-foreground">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-4xl font-medium sm:text-5xl">
              {dict.title}
            </h1>
            <p className="mt-4 text-lg text-muted">
              {dict.subtitle}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4 py-20">
          <div className="space-y-12">
            {dict.items.map((item, i) => (
              <div key={i} className="group">
                <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-olive transition-colors">
                  {item.q}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-2xl border border-olive-muted/30 bg-card p-10 text-center shadow-sm">
            <h2 className="font-serif text-2xl font-medium">
              {locale === "ua" ? "Залишилися питання?" : "More questions?"}
            </h2>
            <p className="mt-3 text-muted">
              {locale === "ua" 
                ? "Напишіть нам у Telegram, ми зазвичай відповідаємо швидко." 
                : "Message us on Telegram, we usually reply within minutes."}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="https://t.me/dja_hostel_chat"
                target="_blank"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition hover:bg-accent-hover"
              >
                Telegram
              </Link>
              <Link
                href="/"
                className="rounded-xl border border-olive-muted/60 px-6 py-3 text-sm font-medium text-muted transition hover:bg-olive-muted/10"
              >
                {locale === "ua" ? "На головну" : "Home"}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
