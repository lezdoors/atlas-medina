"use client";

import Image from "next/image";
import { LineMask, Reveal, LABEL, LABEL_SM } from "@/lib/motion";
import { IMG } from "@/lib/tours-full";
import { useLocale, type L } from "@/lib/i18n";

const STR: Record<string, L> = {
  eyebrow: { en: "Journal", fr: "Journal" },
  headline: { en: "Field notes", fr: "Notes de terrain" },
  intro: {
    en: "Dispatches from the routes — what we saw, scouted and ate.",
    fr: "Dépêches des routes — ce que nous avons vu, repéré et goûté.",
  },
};

type Entry = {
  index: string;
  title: L;
  tag: L;
  date: L;
  image: string;
};

const ENTRIES: Entry[] = [
  {
    index: "N.014",
    title: {
      en: "Reading the wind at Essaouira",
      fr: "Lire le vent à Essaouira",
    },
    tag: { en: "Field Note", fr: "Note de terrain" },
    date: { en: "March 2026", fr: "Mars 2026" },
    image: "/images/essaouira-1.webp",
  },
  {
    index: "N.013",
    title: {
      en: "Scouting the Ounila kasbah road",
      fr: "Repérage sur la route des kasbahs",
    },
    tag: { en: "Recce", fr: "Repérage" },
    date: { en: "February 2026", fr: "Février 2026" },
    image: "/images/atlas-1.webp",
  },
  {
    index: "N.012",
    title: {
      en: "Agafay at noon, before the tents",
      fr: "L'Agafay à midi, avant les tentes",
    },
    tag: { en: "Terrain", fr: "Terrain" },
    date: { en: "January 2026", fr: "Janvier 2026" },
    image: "/images/plateau.jpg",
  },
  {
    index: "N.011",
    title: {
      en: "The cedar door on Derb Dabachi",
      fr: "La porte de cèdre de Derb Dabachi",
    },
    tag: { en: "Detail", fr: "Détail" },
    date: { en: "December 2025", fr: "Décembre 2025" },
    image: IMG.medina2,
  },
  {
    index: "N.010",
    title: {
      en: "One table, twelve hands",
      fr: "Une table, douze mains",
    },
    tag: { en: "Camp Life", fr: "Vie de camp" },
    date: { en: "December 2025", fr: "Décembre 2025" },
    image: IMG.food2,
  },
  {
    index: "N.009",
    title: {
      en: "Light study, Bahia at four",
      fr: "Étude de lumière, la Bahia à 16 h",
    },
    tag: { en: "Field Note", fr: "Note de terrain" },
    date: { en: "November 2025", fr: "Novembre 2025" },
    image: IMG.heritage2,
  },
  {
    index: "N.008",
    title: {
      en: "Tea above the square",
      fr: "Le thé au-dessus de la place",
    },
    tag: { en: "Ritual", fr: "Rituel" },
    date: { en: "November 2025", fr: "Novembre 2025" },
    image: IMG.medina3,
  },
  {
    index: "N.007",
    title: {
      en: "Argan, cracked the old way",
      fr: "L'argan, cassé à l'ancienne",
    },
    tag: { en: "Craft", fr: "Artisanat" },
    date: { en: "October 2025", fr: "Octobre 2025" },
    image: IMG.essaouira3,
  },
  {
    index: "N.006",
    title: {
      en: "Tea on the crest",
      fr: "Le thé sur la crête",
    },
    tag: { en: "Ritual", fr: "Rituel" },
    date: { en: "October 2025", fr: "Octobre 2025" },
    image: IMG.agafay3,
  },
];

export default function JournalIndex() {
  const locale = useLocale();
  return (
    <section className="pt-28 md:pt-36 pb-24 md:pb-40 px-5 md:px-10 xl:px-16">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <Reveal>
          <p className={`${LABEL} text-ink/60 mb-5`}>{STR.eyebrow[locale]}</p>
        </Reveal>
        <h1 className="text-[clamp(3rem,10vw,9rem)] font-display uppercase tracking-tight leading-[0.85] text-ink">
          <LineMask delay={0.1}>{STR.headline[locale]}</LineMask>
        </h1>
        <Reveal delay={0.25}>
          <p className="mt-8 text-[15px] leading-relaxed text-ink/75 max-w-[42ch]">
            {STR.intro[locale]}
          </p>
        </Reveal>
      </div>

      {/* Entries — editorial stagger on md+ */}
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-3 md:gap-x-6">
        {ENTRIES.map((entry, i) => (
          <Reveal
            key={entry.index}
            delay={(i % 3) * 0.12}
            className={i % 3 === 1 ? "md:mt-20" : undefined}
          >
            <article className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-char">
                <Image
                  src={entry.image}
                  alt={entry.title[locale]}
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover grayscale-[20%] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute top-3 right-4 z-10 font-display text-sm text-bone/30">
                  {entry.index}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-5 mb-3">
                <span className={`${LABEL_SM} text-ember`}>
                  {entry.tag[locale]}
                </span>
                <span className={`${LABEL_SM} text-sand`}>
                  {entry.date[locale]}
                </span>
              </div>
              <h2 className="font-display uppercase tracking-tight text-xl leading-tight max-w-[22ch] text-ink">
                {entry.title[locale]}
              </h2>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
