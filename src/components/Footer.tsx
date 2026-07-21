"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LABEL,
  LABEL_SM,
  LineMask,
  Reveal,
  useReducedMotionSafe,
} from "@/lib/motion";
import { COORDINATES, TOURS, TRUST } from "@/lib/data";
import { useLocale, type L } from "@/lib/i18n";

const STR: Record<string, L> = {
  eyebrow: {
    en: "Departures daily — Marrakech",
    fr: "Départs quotidiens — Marrakech",
  },
  line1: { en: "Your best", fr: "Votre plus" },
  line2: { en: "day in", fr: "belle journée" },
  line3: { en: "Morocco", fr: "au Maroc" },
  cta: {
    en: "Plan your Marrakech days",
    fr: "Organisons vos journées à Marrakech",
  },
  alt: {
    en: "A lone walker crossing a dune crest at sunset",
    fr: "Un marcheur solitaire franchissant la crête d'une dune au coucher du soleil",
  },
  experiences: { en: "Experiences", fr: "Expériences" },
  company: { en: "Company", fr: "Société" },
  marrakech: { en: "Marrakech", fr: "Marrakech" },
  ledger: { en: "Ledger", fr: "Registre" },
  contact: { en: "Contact & bookings", fr: "Contact & réservations" },
  terms: { en: "Terms", fr: "Conditions" },
  legal: {
    en: "© MMXXVI Atlas & Medina — a trading name of Altus Lumen Ltd, England & Wales no. 17331447",
    fr: "© MMXXVI Atlas & Medina — nom commercial d'Altus Lumen Ltd, Angleterre & pays de Galles n° 17331447",
  },
  motto: {
    en: "No two departures alike",
    fr: "Aucun départ ne se ressemble",
  },
};

const COMPANY: { label: L; path: string }[] = [
  { label: { en: "Tours", fr: "Circuits" }, path: "tours" },
  { label: { en: "Ethos", fr: "Éthique" }, path: "ethos" },
  { label: { en: "Journal", fr: "Journal" }, path: "journal" },
];

const LEDGER: L[] = [
  { en: "Instagram", fr: "Instagram" },
  { en: "GetYourGuide", fr: "GetYourGuide" },
  STR.terms,
];

export default function Footer() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <footer id="contact">
      {/* ————— CTA band (dark image band) ————— */}
      <div
        ref={bandRef}
        className="relative h-[80vh] min-h-[520px] overflow-hidden bg-basalt"
      >
        <motion.div
          className="absolute inset-[-12%]"
          style={reduced ? undefined : { y }}
        >
          <Image
            src="/images/hero-dune.jpg"
            alt={STR.alt[locale]}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-basalt/60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,10,8,0.9),rgba(11,10,8,0)_35%,rgba(11,10,8,0)_65%,rgba(11,10,8,0.9))]" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center md:px-10 xl:px-16">
          <Reveal>
            <p className={`${LABEL} text-bone/55`}>{STR.eyebrow[locale]}</p>
          </Reveal>

          <h2 className="mt-8 font-display uppercase tracking-tight leading-[0.85] text-[clamp(3rem,10vw,8.5rem)] text-bone">
            <LineMask>{STR.line1[locale]}</LineMask>
            <LineMask delay={0.1}>{STR.line2[locale]}</LineMask>
            <LineMask delay={0.2}>
              {STR.line3[locale]}
              <span className="text-ember">.</span>
            </LineMask>
          </h2>

          <Reveal delay={0.3}>
            <Link
              href={`/${locale}/contact`}
              className="mt-12 inline-block border border-bone/30 px-10 py-5 text-[13px] tracking-[0.25em] uppercase font-body font-medium text-bone transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-bone hover:text-basalt"
            >
              {STR.cta[locale]}
            </Link>
          </Reveal>
        </div>
      </div>

      {/* ————— Footer proper (light ground) ————— */}
      <div className="border-t border-ink/12 pt-20 pb-10 px-5 md:px-10 xl:px-16">
        <Reveal y={40}>
          <Image
            src="/logo-mark-ink.png"
            alt=""
            aria-hidden
            width={90}
            height={59}
            className="mx-auto mb-10 h-14 w-auto opacity-80"
          />
          <p
            aria-hidden="true"
            className="text-stroke w-full whitespace-nowrap text-center font-display uppercase tracking-tight leading-[0.8] text-[clamp(2.6rem,10.5vw,10rem)] select-none"
          >
            Atlas &amp; Medina
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <div>
            <h3 className={`${LABEL_SM} text-sand`}>
              {STR.experiences[locale]}
            </h3>
            <ul className="mt-5 space-y-3">
              {TOURS.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/${locale}/tours/${t.slug}`}
                    className="link-underline text-[13px] font-body text-ink/60"
                  >
                    {t.title[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${LABEL_SM} text-sand`}>{STR.company[locale]}</h3>
            <ul className="mt-5 space-y-3">
              {COMPANY.map((item) => (
                <li key={item.path}>
                  <Link
                    href={`/${locale}/${item.path}`}
                    className="link-underline text-[13px] font-body text-ink/60"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`${LABEL_SM} text-sand`}>{STR.marrakech[locale]}</h3>
            <ul className="mt-5 space-y-3 text-[13px] font-body text-ink/60">
              {TRUST.slice(0, 3).map((item) => (
                <li key={item.en}>{item[locale]}</li>
              ))}
              <li>
                <Link href={`/${locale}/contact`} className="link-underline">
                  {STR.contact[locale]}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`${LABEL_SM} text-sand`}>{STR.ledger[locale]}</h3>
            <ul className="mt-5 space-y-3">
              {LEDGER.map((label) => (
                <li key={label.en}>
                  <a
                    href="#"
                    className="link-underline text-[13px] font-body text-ink/60"
                  >
                    {label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ink/12 pt-6 text-[12px] font-body text-ink/60 md:flex-row md:items-center md:justify-between">
          <p>{STR.legal[locale]}</p>
          <p className="hidden md:block">{COORDINATES.replace(" — ", ", ")}</p>
          <p>{STR.motto[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
