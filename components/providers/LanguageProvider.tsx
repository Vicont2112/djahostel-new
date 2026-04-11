"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { Locale } from "@/lib/site-content";
import { DEFAULT_LOCALE, DICTIONARY } from "@/lib/site-content";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: (typeof DICTIONARY)[Locale];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const value = {
    locale,
    setLocale,
    dict: DICTIONARY[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
