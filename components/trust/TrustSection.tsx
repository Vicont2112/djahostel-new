import {
  address,
  contacts,
  externalCta,
  honestBlock,
  priceTiers,
  SITE_CONTENT_FILE,
  SITE_CONTENT_SOURCE,
  trustFacts,
  trustQuotes,
  valueBullets,
} from "@/lib/site-content";

export function TrustSection() {
  return (
    <section
      id="trust"
      className="scroll-mt-20 border-b border-olive-muted/30 bg-card/35 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
          Довіра й прозорість
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          Тексти й цифри збігаються з офіційним описом для платформ (
          <span
            className="font-mono text-xs text-muted"
            title={SITE_CONTENT_SOURCE}
          >
            {SITE_CONTENT_FILE}
          </span>
          ).
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {valueBullets.map((line) => (
            <li
              key={line}
              className="rounded-2xl border border-olive-muted/40 bg-background/80 px-4 py-3 text-sm leading-relaxed text-foreground"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-muted">
          <span className="rounded-full border border-olive-muted/50 bg-olive-muted/20 px-3 py-1">
            Booking.com: {trustFacts.bookingRating}
          </span>
          <span className="rounded-full border border-olive-muted/50 bg-olive-muted/20 px-3 py-1">
            {trustFacts.longStayShare} гостей — довгі зупинки
          </span>
          <span className="rounded-full border border-olive-muted/50 bg-olive-muted/20 px-3 py-1">
            Тиша: {trustFacts.quietHours}
          </span>
          <span className="rounded-full border border-olive-muted/50 bg-olive-muted/20 px-3 py-1">
            {trustFacts.beds} ліжка в домі
          </span>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-lg font-medium text-foreground">
              Відгуки
            </h2>
            <ul className="mt-4 space-y-6">
              {trustQuotes.map((q) => (
                <li key={q.text}>
                  <blockquote className="border-l-2 border-olive-deep/50 pl-4 text-sm leading-relaxed text-foreground">
                    «{q.text}»
                  </blockquote>
                  <p className="mt-1 pl-4 text-xs text-muted">{q.attribution}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-lg font-medium text-foreground">
              Ціни за ніч (грн)
            </h2>
            <p className="mt-2 text-sm text-muted">
              Довші періоди дешевші за ніч; точну суму підтвердимо в листуванні.
            </p>
            <table className="mt-4 w-full max-w-md text-sm">
              <tbody>
                {priceTiers.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-olive-muted/30 last:border-0"
                  >
                    <td className="py-2 pr-4 text-muted">{row.label}</td>
                    <td className="py-2 text-right font-medium text-foreground">
                      {row.price} грн
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-olive-muted/45 bg-background/90 p-6 sm:p-8">
          <h2 className="font-serif text-lg font-medium text-foreground">
            {honestBlock.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {honestBlock.body}
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-lg font-medium text-foreground">
            {"Зв'язок і бронювання"}
          </h2>
          <p className="mt-2 text-sm text-muted">{externalCta.replyHint}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={contacts.telegramUrl}
              className="rounded-xl border border-olive-muted/50 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-olive-deep/60 hover:bg-olive-muted/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram @{contacts.telegramUser}
            </a>
            <a
              href={`tel:${contacts.phoneTel}`}
              className="rounded-xl border border-olive-muted/50 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-olive-deep/60 hover:bg-olive-muted/20"
            >
              {contacts.phoneDisplay}
            </a>
            <a
              href={`mailto:${contacts.email}`}
              className="rounded-xl border border-olive-muted/50 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-olive-deep/60 hover:bg-olive-muted/20"
            >
              {contacts.email}
            </a>
            <a
              href={contacts.instagramUrl}
              className="rounded-xl border border-olive-muted/50 bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:border-olive-deep/60 hover:bg-olive-muted/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @{contacts.instagramUser}
            </a>
            <a
              href={contacts.bookingUrl}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Booking.com
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">
            {address.line} · ~{address.walkMinutes} хв пішки від м. {address.metro}
          </p>
        </div>
      </div>
    </section>
  );
}
