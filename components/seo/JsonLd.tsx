"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { address, contacts } from "@/lib/site-content";

export function JsonLd() {
  const { locale } = useLanguage();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "name": "Dja Hostel",
    "url": "https://djahostel.com",
    "image": "https://djahostel.com/media/hero/hero.jpg",
    "description": locale === "ua" 
      ? "Тихий хостел у центрі Києва." 
      : "A quiet place to stay in central Kyiv.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locale === "ua" ? address.lineUA : address.lineEN,
      "addressLocality": locale === "ua" ? "Київ" : "Kyiv",
      "addressCountry": "UA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": address.mapLabelLat,
      "longitude": address.mapLabelLon
    },
    "telephone": contacts.phoneTel,
    "priceRange": "350 UAH - 230 UAH"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
