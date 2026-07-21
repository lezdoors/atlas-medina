"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Reveal, useReducedMotionSafe } from "@/lib/motion";
import { useLocale, type L } from "@/lib/i18n";
import { MANIFESTO } from "@/lib/data";

const STR: Record<string, L> = {
  eyebrow: {
    en: "The Atlas & Medina position",
    fr: "La position d’Atlas & Medina",
  },
  signature: {
    en: "— Atlas & Medina, Marrakech",
    fr: "— Atlas & Medina, Marrakech",
  },
  imageAlt: {
    en: "Medina rooftops at dusk",
    fr: "Toits de la médina au crépuscule",
  },
};

/** Scroll window (as scrollYProgress fractions) over which the words reveal. */
const REVEAL_START = 0.15;
const REVEAL_END = 0.78;

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const WORDS = MANIFESTO[locale].split(" ");
  const step = (REVEAL_END - REVEAL_START) / WORDS.length;

  if (reduced) {
    return (
      <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-40">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-alt.webp"
            alt={STR.imageAlt[locale]}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-basalt/80" />
        <div className="relative mx-auto w-full max-w-5xl px-5 md:px-10 xl:px-16">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.25em] text-ember">
            {STR.eyebrow[locale]}
          </p>
          <p className="mt-8 font-display uppercase tracking-tight text-bone text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.12]">
            {MANIFESTO[locale]}
          </p>
          <p className="mt-12 font-body text-[12px] uppercase tracking-[0.25em] text-sand">
            {STR.signature[locale]}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-x-0 -inset-y-[12%]"
        >
          <Image
            src="/images/hero-alt.webp"
            alt={STR.imageAlt[locale]}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-basalt/80" />
        <div className="relative mx-auto w-full max-w-5xl px-5 md:px-10 xl:px-16">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.25em] text-ember">
            {STR.eyebrow[locale]}
          </p>
          <p className="mt-8 font-display uppercase tracking-tight text-bone text-[clamp(1.9rem,4.2vw,3.6rem)] leading-[1.12]">
            {WORDS.map((word, i) => (
              <span key={`${word}-${i}`}>
                <Word
                  word={word}
                  progress={scrollYProgress}
                  range={[REVEAL_START + i * step, REVEAL_START + (i + 1) * step]}
                />{" "}
              </span>
            ))}
          </p>
          <Reveal delay={0.2} className="mt-12">
            <p className="font-body text-[12px] uppercase tracking-[0.25em] text-sand">
              {STR.signature[locale]}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
