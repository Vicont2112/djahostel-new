"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function HostSection() {
  const { dict } = useLanguage();
  const content = (dict as any).hostBlock;

  if (!content) return null;

  return (
    <section className="bg-[#1a1c18] py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-[#f4d03f]/10">
            <Image
              src="/media/gallery/kitchen.jpg"
              alt="Dja Hostel Kitchen"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="relative rounded-2xl bg-[#242621]/50 p-8 md:p-12 ring-1 ring-[#f4d03f]/10 backdrop-blur-sm">
            {/* Decorative quote mark */}
            <div className="absolute top-0 right-10 -translate-y-1/2 select-none font-serif text-[10rem] leading-none text-[#f4d03f]/5 opacity-20">
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
      </div>
    </section>
  );
}
