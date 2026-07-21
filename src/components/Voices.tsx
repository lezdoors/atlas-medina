"use client";

import { useLocale, type L } from "@/lib/i18n";
import Image from "next/image";
import { LABEL, LABEL_SM, LineMask, Reveal } from "@/lib/motion";

const STR = {
  eyebrow: { en: "Voices", fr: "Les voix" },
  headline1: { en: "The word", fr: "Ce qu’en disent" },
  headline2: { en: "from the road", fr: "les voyageurs" },
  tag: {
    en: "700 reviews — 4.8 average",
    fr: "700 avis — 4,8 de moyenne",
  },
} as const satisfies Record<string, L>;

type Voice = {
  index: string;
  quote: L;
  name: string;
  origin: L;
  tour: L;
};

const VOICES: Voice[] = [
  {
    index: "V.01",
    quote: {
      en: "Our guide read the medina like a book — three hours in, we understood a city we’d been lost in for two days.",
      fr: "Notre guide lisait la médina comme un livre — en trois heures, nous avons compris une ville où nous étions perdus depuis deux jours.",
    },
    name: "Sarah M.",
    origin: { en: "United Kingdom", fr: "Royaume-Uni" },
    tour: { en: "Medina & Souks", fr: "Médina & Souks" },
  },
  {
    index: "V.02",
    quote: {
      en: "The food tour was the best evening of our trip. Eight stops, zero tourist traps, and the tanjia is still in my dreams.",
      fr: "Le tour street food a été la plus belle soirée du voyage. Huit étapes, zéro piège à touristes, et la tanjia hante encore mes rêves.",
    },
    name: "Thomas & Léa",
    origin: { en: "France", fr: "France" },
    tour: { en: "Street Food Evening", fr: "Street food nocturne" },
  },
  {
    index: "V.03",
    quote: {
      en: "Sunset in the Agafay felt like the middle of the Sahara. Dinner by candlelight, musicians by the fire — unreal value.",
      fr: "Le coucher de soleil dans l’Agafay, on se serait cru en plein Sahara. Dîner aux chandelles, musiciens au coin du feu — irréel.",
    },
    name: "Amira B.",
    origin: { en: "Netherlands", fr: "Pays-Bas" },
    tour: { en: "Agafay Sunset", fr: "Coucher de soleil Agafay" },
  },
  {
    index: "V.04",
    quote: {
      en: "Lunch on that terrace in the Atlas, with the peaks behind — flawlessly organised from pickup to drop-off.",
      fr: "Déjeuner sur cette terrasse de l’Atlas, les sommets derrière nous — organisation impeccable, de la prise en charge au retour.",
    },
    name: "Daniel K.",
    origin: { en: "Germany", fr: "Allemagne" },
    tour: { en: "Atlas Mountains", fr: "Haut Atlas" },
  },
];

export default function Voices() {
  const locale = useLocale();
  return (
    <section
      id="voices"
      className="border-t border-ink/12 bg-panel py-24 md:py-40 px-5 md:px-10 xl:px-16"
    >
      <div className="mb-16 flex items-end justify-between md:mb-24">
        <div>
          <Reveal>
            <p className={`${LABEL} text-ink/60`}>
              <span className="font-display text-ember tracking-tight">05</span>
              <span className="mx-3">—</span>
              {STR.eyebrow[locale]}
            </p>
          </Reveal>
          <h2 className="mt-8 font-display uppercase tracking-tight leading-[0.9] text-[clamp(2.6rem,6vw,5.5rem)] text-ink">
            <LineMask>{STR.headline1[locale]}</LineMask>
            <LineMask delay={0.1}>
              {STR.headline2[locale]}
              <span className="text-ember">.</span>
            </LineMask>
          </h2>
        </div>
        <Reveal delay={0.2} className="hidden sm:block">
          <p className={`${LABEL} text-ink/60 whitespace-nowrap pb-2`}>
            {STR.tag[locale]}
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
        {VOICES.map((voice, i) => (
          <Reveal
            key={voice.index}
            delay={i * 0.1}
            className={i % 2 === 1 ? "md:mt-20" : undefined}
          >
            <figure className="border-t border-ink/12 pt-7">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-sm text-ink/30">
                  {voice.index}
                </span>
                <span className={`${LABEL_SM} text-ember`}>
                  {voice.tour[locale]}
                </span>
              </div>
              <blockquote className="mt-6 text-[17px] leading-relaxed text-ink/85 md:text-[19px] max-w-[52ch]">
                {locale === "fr" ? (
                  <>
                    {"« "}
                    {voice.quote.fr}
                    {" »"}
                  </>
                ) : (
                  <>&ldquo;{voice.quote.en}&rdquo;</>
                )}
              </blockquote>
              <figcaption className="mt-6 text-[13px] font-body text-ink/60">
                {voice.name}
                <span className="text-ink/40"> — {voice.origin[locale]}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}

        {/* Atmosphere inset among the quotes */}
        <Reveal delay={0.2}>
          <figure>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/photos/food-3.webp"
                alt={
                  {
                    en: "A night-market stall wrapped in steam, the vendor grilling skewers",
                    fr: "Une \u00e9choppe du march\u00e9 nocturne dans la vapeur, le vendeur au gril",
                  }[locale]
                }
                fill
                sizes="(min-width: 768px) 46vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase font-body text-sand">
              {
                {
                  en: "Jemaa el-Fnaa, stop six of eight",
                  fr: "Jemaa el-Fnaa, sixi\u00e8me \u00e9tape sur huit",
                }[locale]
              }
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
