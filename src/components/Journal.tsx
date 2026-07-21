"use client";

import Image from "next/image";
import Link from "next/link";
import { LineMask, Reveal } from "@/lib/motion";
import { JOURNAL } from "@/lib/data";
import { useLocale, type L } from "@/lib/i18n";

const STR: Record<string, L> = {
  eyebrow: { en: "Journal", fr: "Journal" },
  headline: { en: "Field Notes", fr: "Notes de terrain" },
  allEntries: { en: "All entries — 014", fr: "Toutes les entrées — 014" },
};

export default function Journal() {
  const locale = useLocale();
  return (
    <section id="journal" className="py-24 md:py-40 px-5 md:px-10 xl:px-16">
      {/* Header row */}
      <div className="flex justify-between items-end mb-14 md:mb-20">
        <div>
          <Reveal>
            <p className="text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60 mb-5">
              <span className="text-ember font-display">06</span> —{" "}
              {STR.eyebrow[locale]}
            </p>
          </Reveal>
          <h2 className="text-[clamp(2.8rem,7vw,6.5rem)] font-display uppercase tracking-tight leading-[0.85] text-ink">
            <LineMask delay={0.1}>{STR.headline[locale]}</LineMask>
          </h2>
        </div>
        <Reveal delay={0.2} className="hidden sm:block">
          <Link
            href={`/${locale}/journal`}
            className="link-underline text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60 whitespace-nowrap pb-2 inline-block"
          >
            {STR.allEntries[locale]}
          </Link>
        </Reveal>
      </div>

      {/* Entries — editorial stagger on md+ */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6">
        {JOURNAL.map((entry, i) => (
          <Reveal
            key={entry.index}
            delay={i * 0.12}
            className={i === 1 ? "md:mt-20" : undefined}
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
                <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-ember">
                  {entry.tag[locale]}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-body font-medium text-sand">
                  {entry.date[locale]}
                </span>
              </div>
              <h3 className="font-display uppercase tracking-tight text-xl xl:text-2xl leading-tight max-w-[22ch] text-ink">
                {entry.title[locale]}
              </h3>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
