"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function ForWhomSection() {
  const { dict } = useLanguage();

  return (
    <section className="scroll-mt-20 border-b border-olive-muted/30 bg-background px-4 py-16 sm:px-6 sm:py-20 text-center sm:text-left">
      <div className="mx-auto max-w-4xl">
        {(dict.forWhom as any).introSharing && (
          <p className="mb-12 font-serif text-xl italic leading-relaxed text-foreground md:text-2xl">
            {(dict.forWhom as any).introSharing}
          </p>
        )}
        <div className="grid gap-10 sm:grid-cols-2">
          {/* YES column */}
          <div>
            <h3 className="mb-6 border-b-[3px] border-olive-deep pb-2 font-serif text-lg font-medium text-foreground">
              {dict.forWhom.yesTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {dict.forWhom.yesList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                >
                  <span className="mt-0.5 text-olive-deep">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NO column */}
          <div>
            <h3 className="mb-6 border-b-[3px] border-accent pb-2 font-serif text-lg font-medium text-foreground">
              {dict.forWhom.noTitle}
            </h3>
            <ul className="flex flex-col gap-3">
              {dict.forWhom.noList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-0.5 text-accent">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
