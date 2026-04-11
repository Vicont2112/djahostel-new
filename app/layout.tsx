import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

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

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLd } from "@/components/seo/JsonLd";

const GA_ID = "G-MPM30EPXQ8";

export const metadata: Metadata = {
  title: "Dja Hostel Київ — тихий хостел у центрі",
  description: "Тихий хостел у центрі Києва, ~12 хв від м. Золоті Ворота. Спокійно після 22:00, власник поруч.",
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
