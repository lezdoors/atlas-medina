"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE, LineMask, Reveal, useReducedMotionSafe } from "@/lib/motion";
import { STATS } from "@/lib/data";
import { useLocale, type L } from "@/lib/i18n";

const STR: Record<string, L> = {
  eyebrow: { en: "Ethos", fr: "Éthique" },
  h1: { en: "Led by", fr: "Mené par" },
  h2: { en: "the people", fr: "ceux qui" },
  h3: { en: "who live it", fr: "le vivent" },
  p1: {
    en: "Every guide we work with holds an official Moroccan guide licence. It is the first thing we check and the reason we exist — the medina, the mountains and the desert, read by the people who were raised in them.",
    fr: "Chaque guide avec qui nous travaillons détient une licence officielle de guide marocain. C'est la première chose que nous vérifions, et notre raison d'être — la médina, les montagnes et le désert, lus par ceux qui y ont grandi.",
  },
  p2: {
    en: "Groups stay small — never more than twelve, often eight. Free cancellation to twenty-four hours, instant confirmation, and a WhatsApp line to us the whole time. The guesswork stays out; the city does the talking.",
    fr: "Les groupes restent petits — jamais plus de douze, souvent huit. Annulation gratuite jusqu'à 24 heures, confirmation immédiate, et une ligne WhatsApp avec nous en permanence. Les mauvaises surprises restent dehors ; la ville fait le reste.",
  },
  standardsLink: {
    en: "Our standards, in writing",
    fr: "Nos engagements, par écrit",
  },
  valleyAlt: {
    en: "Green river valley cutting through the desert",
    fr: "Vallée verdoyante traversée par une rivière au milieu du désert",
  },
  valleyCaption: {
    en: "Ourika valley — midmorning",
    fr: "Vallée de l'Ourika — fin de matinée",
  },
  tableAlt: {
    en: "Lunch table set on a clay terrace in a mountain village",
    fr: "Table de déjeuner dressée sur une terrasse en terre dans un village de montagne",
  },
  tableCaption: {
    en: "The midday table — Imlil",
    fr: "La table de midi — Imlil",
  },
};

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(count, value, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [reduced, inView, value, count]);

  const shown = reduced ? value.toLocaleString("en-US") : display;

  return (
    <span
      ref={ref}
      className="font-display uppercase tracking-tight leading-[0.9] text-[clamp(2.4rem,5vw,4.2rem)] text-ink"
    >
      {shown}
      {suffix ? <span className="text-ember">{suffix}</span> : null}
    </span>
  );
}

const STAT_CELL_BORDERS = [
  "",
  "border-l",
  "border-t md:border-t-0 md:border-l",
  "border-l border-t md:border-t-0",
];

export default function Ethos() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();

  const valleyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: valleyRef,
    offset: ["start end", "end start"],
  });
  const valleyY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="ethos" className="py-24 md:py-40 px-5 md:px-10 xl:px-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-10">
        {/* Left — sticky editorial column */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60">
              <span className="font-display text-ember tracking-tight">03</span>
              <span className="mx-3">—</span>
              {STR.eyebrow[locale]}
            </p>
          </Reveal>

          <h2 className="mt-8 font-display uppercase tracking-tight text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.9] text-ink">
            <LineMask>{STR.h1[locale]}</LineMask>
            <LineMask delay={0.1}>{STR.h2[locale]}</LineMask>
            <LineMask delay={0.2}>
              {STR.h3[locale]}
              <span className="text-ember">.</span>
            </LineMask>
          </h2>

          <Reveal delay={0.15} className="mt-10 space-y-6">
            <p className="text-[15px] leading-relaxed text-ink/75 max-w-[42ch]">
              {STR.p1[locale]}
            </p>
            <p className="text-[15px] leading-relaxed text-ink/75 max-w-[42ch]">
              {STR.p2[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-12">
            <a
              href="#contact"
              className="link-underline inline-block text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink"
            >
              {STR.standardsLink[locale]}
            </a>
          </Reveal>
        </div>

        {/* Right — offset image stack */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
          <Reveal>
            <figure>
              <div
                ref={valleyRef}
                className="relative overflow-hidden aspect-[3/4]"
              >
                <motion.div
                  className="absolute inset-0"
                  style={reduced ? undefined : { y: valleyY, scale: 1.12 }}
                >
                  <Image
                    src="/images/valley.jpg"
                    alt={STR.valleyAlt[locale]}
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase font-body text-sand">
                {STR.valleyCaption[locale]}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="w-2/3 self-end -mt-16 md:-mt-24">
            <figure>
              <div className="relative overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/atlas-3.webp"
                  alt={STR.tableAlt[locale]}
                  fill
                  sizes="(min-width: 1024px) 32vw, 66vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase font-body text-sand">
                {STR.tableCaption[locale]}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* Stats — full-width count-up row */}
      <div className="mt-24 md:mt-32 border-y border-ink/12 grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label.en}
            className={`border-ink/12 px-6 py-10 md:py-12 ${STAT_CELL_BORDERS[i]}`}
          >
            <StatNumber value={stat.value} suffix={stat.suffix} />
            <p className="mt-3 text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60">
              {stat.label[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
