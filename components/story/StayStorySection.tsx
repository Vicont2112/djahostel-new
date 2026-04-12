"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export function StayStorySection() {
  const { dict } = useLanguage();

  return (
    <section className="border-b border-olive-muted/30 bg-[#1a1714] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-serif text-2xl font-medium leading-snug text-[#f0ebe3] sm:text-4xl">
          {dict.stayStory.title}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-[#f0ebe3]/60 sm:text-lg">
          {dict.stayStory.body}
        </p>
      </div>
    </section>
  );
}
