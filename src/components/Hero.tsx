"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, LABEL, LineMask, useReducedMotionSafe } from "@/lib/motion";
import { COORDINATES } from "@/lib/data";
import { useLocale, type L } from "@/lib/i18n";

const FRAMES: { src: string; alt: L; caption: L }[] = [
  {
    src: "/images/hero-1.webp",
    alt: {
      en: "Marrakech medina rooftops, the Koutoubia minaret ringed by birds, snow-capped Atlas behind under a bright blue sky",
      fr: "Toits de la médina de Marrakech, le minaret de la Koutoubia entouré d’oiseaux, l’Atlas enneigé en arrière-plan sous un ciel bleu éclatant",
    },
    caption: {
      en: "Marrakech — the Koutoubia & the snows",
      fr: "Marrakech — la Koutoubia & les neiges",
    },
  },
  {
    src: "/images/hero-2.webp",
    alt: {
      en: "Light falling through the reed roof of a covered souk, lanterns and spice sacks lining the lane",
      fr: "La lumière tombant à travers le toit de roseaux d’un souk couvert, lanternes et sacs d’épices le long de la ruelle",
    },
    caption: {
      en: "Inside the covered souk, midmorning",
      fr: "Sous le souk couvert, en matinée",
    },
  },
  {
    src: "/images/agafay-1.webp",
    alt: {
      en: "Amber stone desert ridges at dusk, two distant figures crossing the crest",
      fr: "Crêtes ambrées du désert de pierre au crépuscule, deux silhouettes lointaines franchissant la ligne de crête",
    },
    caption: {
      en: "Agafay ridges, last light",
      fr: "Crêtes de l’Agafay, dernière lumière",
    },
  },
  {
    src: "/photos/hero-4.webp",
    alt: {
      en: "Bright blue fishing boats packed into the Essaouira harbour under an airy Atlantic sky",
      fr: "Barques de p\u00eache bleu vif serr\u00e9es dans le port d\u2019Essaouira sous un ciel atlantique lumineux",
    },
    caption: {
      en: "Essaouira \u2014 the trade-wind port",
      fr: "Essaouira, le port des aliz\u00e9s",
    },
  },
];

const STR = {
  sectionLabel: {
    en: "Atlas & Medina — Marrakech, with the people who know it",
    fr: "Atlas & Medina — Marrakech, avec ceux qui la connaissent",
  },
  eyebrow: {
    en: "Atlas & Medina — Marrakech, Morocco",
    fr: "Atlas & Medina — Marrakech, Maroc",
  },
  line1: { en: "From the", fr: "De la" },
  line2: { en: "Medina", fr: "Médina" },
  line3: { en: "To the Dunes", fr: "Aux dunes" },
  kingdom: { en: "Kingdom of Morocco", fr: "Royaume du Maroc" },
  showFrame: { en: "Show frame: ", fr: "Afficher : " },
} as const satisfies Record<string, L>;

/** Slow editorial rhythm: long holds, long dissolves. */
const HOLD_MS = 8000;
const FADE_S = 2;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const locale = useLocale();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* Auto-advance; restarting on every change means a manual pick also gets a
     full hold before the next dissolve. */
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActive((a) => (a + 1) % FRAMES.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduced, active]);

  const shown = reduced ? 0 : active;

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-basalt"
      aria-label={STR.sectionLabel[locale]}
    >
      {/* Background frames: parallax container extended above the frame so the
          downward translate never reveals an edge. Frames dissolve slowly;
          each carries its own drift. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-[-12%]"
        style={reduced ? undefined : { y: imageY }}
      >
        {FRAMES.map((frame, i) => (
          <motion.div
            key={frame.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: shown === i ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : FADE_S, ease: EASE }}
          >
            <motion.div
              className="relative h-full w-full"
              animate={reduced ? undefined : { scale: [1, 1.06] }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "linear",
              }}
            >
              <Image
                src={frame.src}
                alt={i === shown ? frame.alt[locale] : ""}
                fill
                preload={i === 0 ? true : undefined}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Legibility overlays */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-basalt via-basalt/45 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-basalt/55 to-transparent"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col justify-center px-5 md:px-10 xl:px-16"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Eyebrow */}
        <motion.p
          className={`mb-6 md:mb-8 ${LABEL} text-bone/60`}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          {STR.eyebrow[locale]}
        </motion.p>

        {/* Headline */}
        <h1 className="font-display uppercase leading-[0.85] tracking-tight text-bone text-[clamp(3.8rem,14vw,12rem)]">
          <LineMask delay={0.15}>{STR.line1[locale]}</LineMask>
          <LineMask delay={0.3} className="ml-[0.55em]">
            <span aria-hidden className="text-ember">
              —
            </span>
            {STR.line2[locale]}
          </LineMask>
          <LineMask delay={0.45}>
            {STR.line3[locale]}
            <span className="text-ember">.</span>
          </LineMask>
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-5 pb-7 md:px-10 md:pb-9 xl:px-16"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.1 }}
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand font-body md:text-[11px]">
            {COORDINATES} / {STR.kingdom[locale]}
          </p>
          {/* Mobile frame dashes */}
          {!reduced && (
            <div className="mt-3 flex gap-2 md:hidden" aria-hidden>
              {FRAMES.map((frame, i) => (
                <button
                  key={frame.src}
                  type="button"
                  tabIndex={-1}
                  onClick={() => setActive(i)}
                  className={`h-px w-8 transition-colors duration-500 ${
                    shown === i ? "bg-ember" : "bg-bone/25"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Scroll cue — 1px vertical line with a looping traveller */}
        <div
          aria-hidden
          className="absolute bottom-7 left-1/2 hidden h-14 w-px -translate-x-1/2 overflow-hidden bg-bone/15 sm:block md:bottom-9"
        >
          {reduced ? (
            <span className="absolute inset-0 bg-bone/40" />
          ) : (
            <motion.span
              className="absolute inset-0 bg-bone/70"
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 2.2,
                ease: EASE,
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          )}
        </div>

        {/* Frame selector — caption, counter, thumbnails with hold progress */}
        <div className="hidden md:block text-right">
          <p className={`${LABEL} text-bone/55`}>
            <motion.span
              key={shown}
              className="inline-block"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              {String(shown + 1).padStart(2, "0")} /{" "}
              {String(FRAMES.length).padStart(2, "0")} —{" "}
              {FRAMES[shown].caption[locale]}
            </motion.span>
          </p>
          <div className="mt-4 flex justify-end gap-3">
            {FRAMES.map((frame, i) => (
              <button
                key={frame.src}
                type="button"
                aria-label={`${STR.showFrame[locale]}${frame.caption[locale]}`}
                aria-pressed={shown === i}
                onClick={() => setActive(i)}
                className={`group relative h-14 w-22 overflow-hidden border transition-[border-color,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  shown === i
                    ? "border-bone/70 opacity-100"
                    : "border-bone/20 opacity-55 hover:opacity-90"
                }`}
              >
                <Image
                  src={frame.src}
                  alt=""
                  fill
                  sizes="88px"
                  className="object-cover"
                />
                {/* Hold progress on the active thumb */}
                {shown === i && !reduced && (
                  <motion.span
                    key={`progress-${shown}`}
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-ember"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
