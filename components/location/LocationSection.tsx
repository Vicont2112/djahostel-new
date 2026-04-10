import { address, contacts } from "@/lib/site-content";

const MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${address.mapBbox.replace(/,/g, "%2C")}&layer=mapnik`;

const MAP_EXTERNAL_HREF = `https://www.openstreetmap.org/?mlat=${address.mapLabelLat}&mlon=${address.mapLabelLon}#map=17/${address.mapLabelLat}/${address.mapLabelLon}`;

const GOOGLE_MAPS_SEARCH =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${address.line}, Україна`);

export function LocationSection() {
  return (
    <section
      id="location"
      className="scroll-mt-20 bg-background px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
          Локація
        </p>
        <p className="mt-2 max-w-2xl text-sm text-muted sm:text-base">
          <span className="font-medium text-foreground">{address.line}</span> —
          історичний центр, поруч Поділ. Пішки близько{" "}
          <span className="whitespace-nowrap">{address.walkMinutes} хв</span> від
          м. <span className="font-medium text-foreground">{address.metro}</span>.
        </p>
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a
            href={contacts.telegramUrl}
            className="text-olive underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
          <a
            href={`tel:${contacts.phoneTel}`}
            className="text-olive underline-offset-2 hover:underline"
          >
            {contacts.phoneDisplay}
          </a>
          <a
            href={GOOGLE_MAPS_SEARCH}
            className="text-olive underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Відкрити в Google Maps
          </a>
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-olive-muted/50 shadow-sm ring-1 ring-olive-muted/30">
          <iframe
            title={`Карта — ${address.line}`}
            src={MAP_EMBED_SRC}
            className="aspect-[16/10] min-h-[240px] w-full border-0 sm:min-h-[320px]"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          <a
            href={MAP_EXTERNAL_HREF}
            className="text-olive underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Відкрити на OpenStreetMap
          </a>
        </p>
      </div>
    </section>
  );
}
