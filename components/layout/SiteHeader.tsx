"use client";

import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "framer-motion";

export function SiteHeader() {
  const { locale, setLocale } = useLanguage();

  const NAV = [
    { href: "/#rooms", label: locale === "ua" ? "Кімнати" : "Rooms" },
    { href: "/rules", label: locale === "ua" ? "Правила" : "Rules" },
    { href: "/faq", label: locale === "ua" ? "Питання" : "FAQ" },
    { href: "/#location", label: locale === "ua" ? "Локація" : "Location" },
  ] as const;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-pill pointer-events-auto px-6 py-3 flex items-center gap-12"
      >
        <div className="flex items-center gap-6 border-r border-white/10 pr-6 mr-2">
          <Link
            href="/#top"
            className="text-lg font-bold tracking-tight text-white/90 hover:text-white transition-colors"
          >
            DJA HOSTEL
          </Link>
          <div className="flex gap-2 text-[10px] font-bold tracking-[0.2em]">
            <button
              onClick={() => setLocale("ua")}
              className={`transition ${locale === "ua" ? "text-accent-peach" : "text-white/30 hover:text-white"}`}
            >
              UA
            </button>
            <button
              onClick={() => setLocale("en")}
              className={`transition ${locale === "en" ? "text-accent-blue" : "text-white/30 hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all hover:scale-105"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="pl-6 border-l border-white/10 ml-2 hidden lg:block">
          <button className="px-6 py-2 bg-gradient-to-r from-accent-peach via-accent-indigo to-accent-blue rounded-full text-[10px] font-bold tracking-widest text-white shadow-xl shadow-accent-indigo/20 hover:scale-105 transition-transform">
            BOOK YOUR STAY
          </button>
        </div>
      </motion.header>
    </div>
  );
}

