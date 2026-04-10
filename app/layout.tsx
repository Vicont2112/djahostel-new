import type { Metadata } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

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
  title: "DJA Hostel — спокійний дім у центрі Києва",
  description:
    "Хостел з високими стелями та домашньою атмосферою. Довгі зупинки, чисті кімнати, пряме бронювання.",
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
        {children}
      </body>
    </html>
  );
}
