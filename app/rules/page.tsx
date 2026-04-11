"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { rulesContent } from "@/lib/rules-content";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Footer } from "@/components/layout/Footer";

export default function RulesPage() {
  const { locale } = useLanguage();
  const dict = rulesContent[locale];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1">
        <header className="relative overflow-hidden bg-olive-deep py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-4xl font-medium sm:text-5xl">
              {dict.title}
            </h1>
            <p className="mt-4 text-lg text-white/80">
              {dict.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              {dict.principles.map((p) => (
                <div key={p.label} className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{p.icon}</span>
                  <span className="text-sm font-medium text-accent-muted">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-2xl border-2 border-olive bg-olive-muted/10 p-8 text-center sm:p-10">
            {dict.intro.map((text, i) => (
              <p key={i} className={i > 0 ? "mt-4 text-lg italic" : "text-xl font-medium"}>
                {text}
              </p>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {dict.rhythm.map((item) => (
              <div key={item.label} className="rounded-xl bg-card p-6 text-center ring-1 ring-olive-muted/30 shadow-sm">
                <span className="block font-serif text-2xl font-bold text-olive">
                  {item.time}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-wider text-muted">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-muted">
            {dict.rhythmNote}
          </p>

          {dict.sections.map((section) => (
            <section key={section.title} className="mt-16">
              <h2 className="flex items-center gap-3 border-b-2 border-olive pb-2 font-serif text-2xl font-medium text-olive">
                <span>{section.icon}</span>
                {section.title}
              </h2>
              <div className="mt-8 space-y-6">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className={`flex gap-4 rounded-xl bg-card p-6 ring-1 ring-olive-muted/20 shadow-sm border-l-4 ${
                      item.type === "do" ? "border-olive" : "border-accent"
                    }`}
                  >
                    <span className={`text-xl ${item.type === "do" ? "text-olive" : "text-accent"}`}>
                      {item.type === "do" ? "✓" : "✗"}
                    </span>
                    <div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-16 rounded-2xl bg-accent p-8 text-white sm:p-12">
            <h2 className="font-serif text-2xl font-medium">{dict.forbidden.title}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dict.forbidden.items.map((item) => (
                <div key={item.title} className="rounded-xl bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-olive hover:underline"
            >
              {locale === "ua" ? "← Повернутися на головну" : "← Back to home"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
