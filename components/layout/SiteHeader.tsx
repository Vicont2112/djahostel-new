import Link from "next/link";

const NAV = [
  { href: "#rooms", label: "Комнаты" },
  { href: "#atmosphere", label: "Атмосфера" },
  { href: "#location", label: "Локація" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-olive-muted/40 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6 sm:py-4">
        <Link
          href="/#top"
          className="font-serif text-lg tracking-tight text-foreground transition hover:text-olive"
        >
          DJA Hostel
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-muted sm:gap-x-8"
          aria-label="Головна навігація"
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
