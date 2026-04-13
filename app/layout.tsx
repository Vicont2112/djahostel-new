import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";

const GA_ID = "G-MPM30EPXQ8";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://djahostel.com"),
  title: "Dja Hostel Київ — тихий хостел у центрі | 9.2★ Booking.com",
  description: "Тихий хостел у центрі Києва, ~12 хв від м. Золоті Ворота. Спокійно після 22:00, власник поруч. Залишайтесь на тижні й місяці — як вдома.",
  keywords: ["hostel Kyiv", "quiet hostel Kyiv", "long stay hostel Kyiv", "хостел Київ", "тихий хостел Київ"],
  alternates: {
    canonical: "/",
    languages: {
      "uk-UA": "/",
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Dja Hostel — Quiet Hostel in Central Kyiv",
    description: "A calm, clean place set up for real life. 9.2 on Booking.com. Many guests stay for months.",
    url: "https://djahostel.com",
    siteName: "Dja Hostel",
    images: [
      {
        url: "/media/rooms/women1-1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dja Hostel — Quiet Hostel in Central Kyiv",
    description: "Calm, clean, set up for real life in Kyiv. 9.2 on Booking.com.",
    images: ["/media/rooms/women1-1.jpg"],
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='4' fill='%231C2416'/><text x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-family='Georgia,serif' font-size='18' font-weight='700' fill='%23F4D03F'>D</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${dmSans.variable} ${lora.variable} font-sans antialiased`}
      >
        <GoogleAnalytics gaId={GA_ID} />
        <LanguageProvider>
          <JsonLd />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
