"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { address, contacts } from "@/lib/site-content";

export function TrustSection() {
  const { dict, locale } = useLanguage();

  return (
    <>
      {/* Reviews — standalone, clean */}
      <section
        id="trust"
        className="scroll-mt-20 border-b border-olive-muted/30 bg-card/35 px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-olive-muted/50 bg-olive-muted/20 px-4 py-1.5 text-sm text-muted">
              Booking.com: <strong className="text-foreground">{dict.trustFacts.bookingRating}</strong>
            </span>
          </div>

          <ul className="mt-10 space-y-8">
            {dict.trustQuotes.map((q) => (
              <li key={q.text}>
                <blockquote className="text-center font-serif text-lg leading-relaxed text-foreground sm:text-xl">
                  «{q.text}»
                </blockquote>
                <p className="mt-2 text-center text-xs text-muted">
                  — {q.attribution}
                </p>
              </li>
            ))}
          </ul>
          {(dict.trust as any).googleReviewsLink && (
            <div className="mt-10 text-center">
              <a
                href="https://maps.app.goo.gl/YourRealLinkHere" // Replace with actual if known, or leave as placeholder
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium uppercase tracking-wider text-[#f4d03f]/70 transition hover:text-[#f4d03f]"
              >
                {(dict.trust as any).googleReviewsLink} →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Honest block + Price — two clean columns */}
      <section className="border-b border-olive-muted/30 bg-background px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-4xl gap-12 lg:grid-cols-2">
          {/* Honest */}
          <div>
            <h2 className="font-serif text-xl font-medium text-foreground">
              {dict.honestBlock.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              {dict.honestBlock.body}
            </p>
          </div>

          {/* Price */}
          <div>
            <h2 className="font-serif text-xl font-medium text-foreground">
              {dict.trust.pricesTitle}
            </h2>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {dict.priceTiers.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-olive-muted/30 last:border-0"
                  >
                    <td className="py-3 pr-4 text-muted">{row.label}</td>
                    <td className="py-3 text-right font-medium text-foreground">
                      {row.price} {locale === "ua" ? "грн" : "UAH"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted">
              {dict.trust.priceNote}
            </p>
          </div>
        </div>
      </section>

      {/* Contact — minimal */}
      <section className="border-b border-olive-muted/30 bg-card/35 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-xl font-medium text-foreground">
            {dict.trust.contactTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{dict.trust.replyHint}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={contacts.telegramUrl}
              className="rounded-xl border border-olive-muted/50 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-olive-deep/60"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <a
              href={`tel:${contacts.phoneTel}`}
              className="rounded-xl border border-olive-muted/50 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-olive-deep/60"
            >
              {contacts.phoneDisplay}
            </a>
            <a
              href={contacts.bookingUrl}
              className="rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-white transition hover:bg-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking.com
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">
            {locale === "ua" ? address.lineUA : address.lineEN} · ~{address.walkMinutes}{" "}
            {locale === "ua" ? "хв від м." : "min from"}{" "}
            {locale === "ua" ? address.metroUA : address.metroEN}
          </p>
        </div>
      </section>
    </>
  );
}
