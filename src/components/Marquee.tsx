"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/motion";
import { useLocale, type Locale } from "@/lib/i18n";

const SEGMENTS: Record<Locale, readonly string[]> = {
  en: [
    "MEDINA",
    "HIGH ATLAS",
    "AGAFAY",
    "ESSAOUIRA",
    "LICENSED LOCAL GUIDES",
    "SMALL GROUPS ONLY",
  ],
  fr: [
    "MÉDINA",
    "HAUT ATLAS",
    "AGAFAY",
    "ESSAOUIRA",
    "GUIDES LOCAUX AGRÉÉS",
    "PETITS GROUPES UNIQUEMENT",
  ],
} as const;

const ARIA_LABEL = {
  en: "Medina, High Atlas, Agafay, Essaouira — licensed local guides, small groups only",
  fr: "Médina, Haut Atlas, Agafay, Essaouira — guides locaux agréés, petits groupes uniquement",
} as const;

/** How many times the phrase repeats inside one half of the track. */
const REPEATS = 3;

function Strip({ locale }: { locale: Locale }) {
  return (
    <span
      aria-hidden
      className="flex-none whitespace-nowrap pr-2 font-display text-sm uppercase tracking-[0.15em] text-ink/40 md:text-base"
    >
      {Array.from({ length: REPEATS }, (_, r) =>
        SEGMENTS[locale].map((segment, s) => (
          <span key={`${r}-${s}`}>
            {segment}
            <span className="text-ember/70">{" — "}</span>
          </span>
        )),
      )}
    </span>
  );
}

export default function Marquee() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      aria-label={ARIA_LABEL[locale]}
      className="overflow-hidden border-y border-ink/12 py-5"
    >
      {reduced ? (
        <div className="flex w-max">
          <Strip locale={locale} />
        </div>
      ) : (
        <motion.div
          className="flex w-max"
          animate={inView ? { x: ["0%", "-50%"] } : false}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          <Strip locale={locale} />
          <Strip locale={locale} />
        </motion.div>
      )}
    </section>
  );
}
