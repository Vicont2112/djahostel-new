"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { address, contacts } from "@/lib/site-content";

export function JsonLd() {
  const { locale } = useLanguage();

  const hostelSchema = {
    "@context": "https://schema.org",
    "@type": "Hostel",
    "name": "Dja Hostel",
    "url": "https://djahostel.com",
    "image": "https://djahostel.com/media/rooms/women1-1.jpg",
    "description": locale === "ua" 
      ? "Тихий хостел у центрі Києва для сну та роботи. Власник поруч. 9.2 на Booking.com." 
      : "A quiet place to stay in central Kyiv for sleep and work. Owner on-site. 9.2 on Booking.com.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locale === "ua" ? address.lineUA : address.lineEN,
      "addressLocality": locale === "ua" ? "Київ" : "Kyiv",
      "addressCountry": "UA",
      "postalCode": "04053"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.4564641,
      "longitude": 30.5026416
    },
    "telephone": contacts.phoneTel,
    "email": contacts.email,
    "priceRange": "230-350 UAH",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "9.2",
      "bestRating": "10",
      "ratingCount": "100"
    },
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Laundry", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "Lockers", "value": true}
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": locale === "ua" ? "Чи можу я залишитися на кілька ночей, а потім продовжити?" : "Can I stay for a few nights and then extend?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === "ua" 
            ? "Так. Багато гостей починають з 1-3 ночей і залишаються на тижні або місяці." 
            : "Yes. Many guests start with 1-3 nights and extend to weeks or months."
        }
      },
      {
        "@type": "Question",
        "name": locale === "ua" ? "Чи є у вас правила тиші?" : "Do you have quiet hours?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": locale === "ua" 
            ? "Так, ми цінуємо спокій. Після 22:00 у нас повна тиша." 
            : "Yes, we value peace. After 22:00 we have a strict quiet house rule."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hostelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
