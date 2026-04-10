/**
 * Карта — заглушка bbox по центру Києва; замініть координати на точний пін DJA.
 */
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=30.48%2C50.42%2C30.56%2C50.48&layer=mapnik";

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
          Центр Києва — зручно гуляти містом і повертатися «додому» в тихий
          дворик. Точну адресу й маршрут від метро додайте сюди текстом або
          оновіть bbox у компоненті{" "}
          <code className="rounded bg-olive-muted/40 px-1 text-xs">
            LocationSection
          </code>
          .
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-olive-muted/50 shadow-sm ring-1 ring-olive-muted/30">
          <iframe
            title="Карта — Київ, центр"
            src={MAP_EMBED_SRC}
            className="aspect-[16/10] min-h-[240px] w-full border-0 sm:min-h-[320px]"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          <a
            href="https://www.openstreetmap.org/?mlat=50.45&mlon=30.52#map=14/50.45/30.52"
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
