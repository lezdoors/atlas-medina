"use client";

import { createContext, useContext, type ReactNode } from "react";
import { LOCALES, type L, type Locale } from "./locales";

export { LOCALES };
export type { L, Locale };

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/** Current locale, provided by app/[locale]/layout.tsx. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Shared micro-copy used across several components. */
export const UI = {
  from: { en: "From", fr: "À partir de" },
  perPerson: { en: "per person", fr: "par personne" },
  reviews: { en: "reviews", fr: "avis" },
  max: { en: "Max", fr: "Max" },
  bookTour: { en: "Book a Tour", fr: "Réserver" },
  scroll: { en: "Scroll", fr: "Faites défiler" },
} as const;

/** Price formatter honouring French typography (39 € vs €39). */
export function formatPrice(priceEUR: number, locale: Locale): string {
  return locale === "fr" ? `${priceEUR} €` : `€${priceEUR}`;
}

/** Rating formatter — French uses the decimal comma (4,9). */
export function formatRating(rating: number | string, locale: Locale): string {
  const value = typeof rating === "number" ? rating.toFixed(1) : rating;
  return locale === "fr" ? value.replace(".", ",") : value;
}
