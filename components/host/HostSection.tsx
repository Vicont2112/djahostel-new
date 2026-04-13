"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function HostSection() {
  const { dict } = useLanguage();
  const content = (dict as any).hostBlock;

  if (!content) return null;

  return (
    <section className="bg-[#1a1c18] py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="relative rounded-2xl bg-[#242621]/50 p-8 md:p-16 ring-1 ring-[#f4d03f]/10 backdrop-blur-sm">
          {/* Decorative quote mark */}
          <div className="absolute top-0 right-10 -translate-y-1/2 select-none font-serif text-[12rem] leading-none text-[#f4d03f]/5 opacity-20">
            &rdquo;
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="font-serif text-3xl font-medium tracking-tight text-[#faf8f4] md:text-4xl">
              {content.title}
            </h2>
            
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-[#ebe6dc]/90 md:text-xl md:leading-loose">
                {content.body}
              </p>
            </div>

            <div className="pt-4">
              <p className="font-serif text-xl italic text-[#f4d03f]/80">
                {content.signature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
