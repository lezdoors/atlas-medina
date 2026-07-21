"use client";

import Image from "next/image";
import { useLocale, type L } from "@/lib/i18n";
import { LABEL, LineMask, Reveal } from "@/lib/motion";

const STR: Record<string, L> = {
  eyebrow: { en: "How it works", fr: "Comment ça marche" },
  headline1: { en: "Three steps", fr: "Trois étapes" },
  headline2: { en: "to the city", fr: "vers la ville" },
};

const STEPS: { index: string; title: L; body: L }[] = [
  {
    index: "01",
    title: { en: "Pick your experience", fr: "Choisissez votre expérience" },
    body: {
      en: "Six tours, honestly described — real durations, real group sizes, real prices. No padding, no surprises.",
      fr: "Six circuits, décrits honnêtement — vraies durées, vraies tailles de groupe, vrais prix. Rien de gonflé, rien de caché.",
    },
  },
  {
    index: "02",
    title: { en: "Book in two minutes", fr: "Réservez en deux minutes" },
    body: {
      en: "Choose a date, tell us who's coming, pay securely online. Confirmation lands instantly.",
      fr: "Choisissez une date, dites-nous qui vient, payez en ligne en toute sécurité. Confirmation immédiate.",
    },
  },
  {
    index: "03",
    title: { en: "Meet your guide", fr: "Rencontrez votre guide" },
    body: {
      en: "A licensed local guide, a small group, and a WhatsApp line to us the whole time.",
      fr: "Un guide local agréé, un petit groupe, et une ligne WhatsApp avec nous en permanence.",
    },
  },
];

export default function HowItWorks() {
  const locale = useLocale();
  return (
    <section
      id="how-it-works"
      className="border-t border-ink/12 py-24 md:py-40 px-5 md:px-10 xl:px-16"
    >
      <div className="mb-16 md:mb-24">
        <Reveal>
          <p className={`${LABEL} text-ink/60`}>
            <span className="font-display text-ember tracking-tight">02</span>
            <span className="mx-3">—</span>
            {STR.eyebrow[locale]}
          </p>
        </Reveal>
        <h2 className="mt-8 font-display uppercase tracking-tight leading-[0.9] text-[clamp(2.6rem,5.5vw,4.8rem)] text-ink">
          <LineMask>{STR.headline1[locale]}</LineMask>
          <LineMask delay={0.1}>
            {STR.headline2[locale]}
            <span className="text-ember">.</span>
          </LineMask>
        </h2>
      </div>

      <Reveal className="mb-16 md:mb-24">
        <figure>
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src="/photos/hero.webp"
              alt={
                {
                  en: "Marrakech skyline at golden hour",
                  fr: "Marrakech \u00e0 l\u2019heure dor\u00e9e",
                }[locale]
              }
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase font-body text-sand">
            {
              {
                en: "Marrakech at golden hour",
                fr: "Marrakech \u00e0 l\u2019heure dor\u00e9e",
              }[locale]
            }
          </figcaption>
        </figure>
      </Reveal>

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-10">
        {STEPS.map((step, i) => (
          <Reveal key={step.index} delay={i * 0.12}>
            <div className="border-t border-ink/12 pt-8">
              <span className="font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-none text-ember">
                {step.index}
              </span>
              <h3 className="mt-6 font-display uppercase tracking-tight text-2xl leading-[0.95] text-ink">
                {step.title[locale]}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75 max-w-[38ch]">
                {step.body[locale]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
