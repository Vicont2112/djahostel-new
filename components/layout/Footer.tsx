"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { address, contacts } from "@/lib/site-content";

export function Footer() {
  const { locale } = useLanguage();

  const currentAddress = locale === "ua" ? address.lineUA : address.lineEN;

  return (
    <footer className="bg-olive-deep py-12 text-white/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-serif text-2xl font-medium text-accent-muted">DJA</span>
            <p className="mt-4 text-sm leading-relaxed">
              {locale === "ua" 
                ? "Тихий хостел у центрі Києва. Сон, робота та відчуття безпеки." 
                : "A quiet hostel in the heart of Kyiv. Sleep, work, and feel safe."}
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-lg font-medium text-white">
              {locale === "ua" ? "Навігація" : "Navigation"}
            </h4>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="/#about" className="hover:text-accent-muted transition-colors">
                {locale === "ua" ? "Про нас" : "About"}
              </Link>
              <Link href="/#rooms" className="hover:text-accent-muted transition-colors">
                {locale === "ua" ? "Кімнати" : "Rooms"}
              </Link>
              <Link href="/rules" className="hover:text-accent-muted transition-colors">
                {locale === "ua" ? "Правила" : "Rules"}
              </Link>
              <Link href="/faq" className="hover:text-accent-muted transition-colors">
                {locale === "ua" ? "FAQ" : "FAQ"}
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-white">
              {locale === "ua" ? "Контакти" : "Contacts"}
            </h4>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <p>{currentAddress}</p>
              <a href={`tel:${contacts.phoneTel}`} className="hover:text-accent-muted transition-colors">
                {contacts.phoneDisplay}
              </a>
              <a href={contacts.telegramUrl} target="_blank" className="hover:text-accent-muted transition-colors">
                Telegram
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-medium text-white">
              {locale === "ua" ? "Графік" : "Schedule"}
            </h4>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <p>{locale === "ua" ? "Заїзд: з 14:00" : "Check-in: from 14:00"}</p>
              <p>{locale === "ua" ? "Виїзд: до 12:00" : "Check-out: until 12:00"}</p>
              <p className="mt-2 font-medium text-accent-muted">
                {locale === "ua" ? "Тихий час: 22:00 – 07:00" : "Quiet hours: 22:00 – 07:00"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} DJA Hostel Kyiv.
          </p>
          <div className="mt-4 flex gap-2 sm:mt-0">
            <span className="h-2 w-2 rounded-full bg-olive"></span>
            <span className="h-2 w-2 rounded-full bg-accent-muted"></span>
            <span className="h-2 w-2 rounded-full bg-accent"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
