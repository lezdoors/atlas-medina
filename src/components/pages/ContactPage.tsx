"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  CAPTION,
  LABEL,
  LABEL_SM,
  LineMask,
  Reveal,
  useReducedMotionSafe,
} from "@/lib/motion";
import { useLocale, type L } from "@/lib/i18n";
import { TRUST } from "@/lib/data";
import { COMPANY, IMG } from "@/lib/tours-full";

const STR: Record<string, L> = {
  eyebrow: { en: "Contact", fr: "Contact" },
  line1: { en: "Let’s plan", fr: "Organisons" },
  line2: { en: "your days", fr: "vos journées" },
  intro: {
    en: "A question, a private group, a tailor-made day — talk to a human who knows the city.",
    fr: "Une question, un groupe privé, une journée sur mesure — parlez à un humain qui connaît la ville.",
  },
  whatsappLabel: { en: "WhatsApp", fr: "WhatsApp" },
  whatsappCta: { en: "Message us", fr: "Écrivez-nous" },
  whatsappNote: {
    en: "Fastest — a human replies the same day.",
    fr: "Le plus rapide — un humain répond le jour même.",
  },
  privateLabel: { en: "Private tours", fr: "Visites privées" },
  privateBody: {
    en: "All six experiences can run privately — tell us dates and party size, we quote within a day.",
    fr: "Nos six expériences peuvent être privatisées — donnez-nous vos dates et la taille du groupe, devis sous 24 h.",
  },
  privateCta: { en: "Browse the tours", fr: "Parcourir les circuits" },
  caption: {
    en: "Mint tea — the first answer to every question",
    fr: "Thé à la menthe — la première réponse à toute question",
  },
  alt: {
    en: "Mint tea poured into a glass, close up",
    fr: "Thé à la menthe versé dans un verre, en gros plan",
  },
};

export default function ContactPage() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const figRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: figRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const waDigits = COMPANY.whatsapp.replace(/\D/g, "");

  return (
    <div className="px-5 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32 xl:px-16">
      {/* ————— Header ————— */}
      <header className="mb-16 md:mb-24">
        <Reveal>
          <p className={`${LABEL} text-ink/60`}>{STR.eyebrow[locale]}</p>
        </Reveal>
        <h1 className="mt-8 font-display uppercase tracking-tight leading-[0.85] text-[clamp(3rem,9vw,8rem)] text-ink">
          <LineMask>{STR.line1[locale]}</LineMask>
          <LineMask delay={0.12}>
            {STR.line2[locale]}
            <span className="text-ember">.</span>
          </LineMask>
        </h1>
        <Reveal delay={0.2} className="mt-8">
          <p className="text-[15px] leading-relaxed text-ink/75 max-w-[48ch]">
            {STR.intro[locale]}
          </p>
        </Reveal>
      </header>

      {/* ————— Channels + photo ————— */}
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          {/* WhatsApp */}
          <Reveal delay={0.08}>
            <div className="border-t border-ink/12 py-8">
              <p className={`${LABEL_SM} text-sand`}>
                {STR.whatsappLabel[locale]}
              </p>
              <a
                href={`https://wa.me/${waDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-4 inline-block font-display uppercase tracking-tight text-2xl text-ink"
              >
                {STR.whatsappCta[locale]}
              </a>
              <p className="mt-3 text-[13px] leading-relaxed text-ink/60">
                {STR.whatsappNote[locale]}
              </p>
            </div>
          </Reveal>

          {/* Private tours */}
          <Reveal delay={0.16}>
            <div className="border-t border-ink/12 py-8">
              <p className={`${LABEL_SM} text-sand`}>
                {STR.privateLabel[locale]}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75 max-w-[42ch]">
                {STR.privateBody[locale]}
              </p>
              <Link
                href={`/${locale}/tours`}
                className={`link-underline mt-5 inline-block ${LABEL} text-ink`}
              >
                {STR.privateCta[locale]}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Photo */}
        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal delay={0.1}>
            <figure>
              <div
                ref={figRef}
                className="relative aspect-[4/5] overflow-hidden bg-panel"
              >
                <motion.div
                  className="absolute inset-[-10%]"
                  style={reduced ? undefined : { y }}
                >
                  <Image
                    src={IMG.aboutTea}
                    alt={STR.alt[locale]}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <figcaption className={CAPTION}>
                {STR.caption[locale]}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>

      {/* ————— Trust row ————— */}
      <div className="mt-20 border-t border-ink/12 pt-8 md:mt-28">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-4">
          {TRUST.map((item, i) => (
            <Reveal key={item.en} delay={i * 0.08}>
              <span className="inline-flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-[6px] w-[6px] shrink-0 bg-ember"
                />
                <span className={`${LABEL} text-ink/60`}>{item[locale]}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
