"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LABEL, LineMask, Reveal } from "@/lib/motion";
import { formatPrice, useLocale, type L } from "@/lib/i18n";
import { categories, tours, type Category } from "@/lib/tours-full";

const STR: Record<string, L> = {
  eyebrow: { en: "Tours & day trips", fr: "Circuits & excursions" },
  line1: { en: "Six ways", fr: "Six portes" },
  line2: { en: "into Morocco", fr: "vers le Maroc" },
  intro: {
    en: "Six experiences, one standard: a licensed local guide, a small group, and a day built around the place itself. Every departure cancels free up to 24 hours before.",
    fr: "Six expériences, un même standard : un guide local agréé, un petit groupe et une journée pensée autour du lieu lui-même. Chaque départ s’annule gratuitement jusqu’à 24 h avant.",
  },
  filterLabel: { en: "Filter tours by category", fr: "Filtrer les circuits par catégorie" },
  reviews: { en: "reviews", fr: "avis" },
  viewTour: { en: "View tour", fr: "Voir le circuit" },
};

const EASE_CSS = "ease-[cubic-bezier(0.16,1,0.3,1)]";

function formatRating(rating: number, locale: "en" | "fr"): string {
  const s = rating.toFixed(1);
  return locale === "fr" ? s.replace(".", ",") : s;
}

export default function ToursIndex() {
  const locale = useLocale();
  const [filter, setFilter] = useState<Category | "all">("all");

  const filtered =
    filter === "all" ? tours : tours.filter((t) => t.category === filter);

  const categoryLabel = (key: Category) =>
    categories.find((c) => c.key === key)?.label[locale] ?? key;

  return (
    <section className="px-5 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32 xl:px-16">
      {/* ————— Page header ————— */}
      <Reveal>
        <p className={`${LABEL} text-ink/60`}>{STR.eyebrow[locale]}</p>
      </Reveal>

      <h1 className="mt-6 font-display uppercase tracking-tight leading-[0.85] text-[clamp(3rem,9vw,7.5rem)] text-ink">
        <LineMask>{STR.line1[locale]}</LineMask>
        <LineMask delay={0.1}>
          {STR.line2[locale]}
          <span className="text-ember">.</span>
        </LineMask>
      </h1>

      <Reveal delay={0.2}>
        <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-ink/75">
          {STR.intro[locale]}
        </p>
      </Reveal>

      {/* ————— Category filter ————— */}
      <Reveal delay={0.25}>
        <div
          role="group"
          aria-label={STR.filterLabel[locale]}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-b border-ink/12 md:mt-20"
        >
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(c.key)}
                className={`${LABEL} -mb-px border-b pt-3 pb-4 transition-colors duration-500 ${EASE_CSS} ${
                  active
                    ? "border-ember text-ember"
                    : "border-transparent text-ink/60 hover:text-ink"
                }`}
              >
                {c.label[locale]}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ————— Tour grid ————— */}
      <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-2">
        {filtered.map((t, i) => (
          <Reveal key={t.slug} delay={(i % 2) * 0.1} y={40}>
            <Link
              href={`/${locale}/tours/${t.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-panel">
                <Image
                  src={t.image}
                  alt={t.title[locale]}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`object-cover transition-transform duration-[900ms] ${EASE_CSS} group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                />
              </div>

              <p className={`${LABEL} mt-6 text-sand`}>
                {categoryLabel(t.category)} · {t.durationLabel[locale]} · Max{" "}
                {t.maxGroup}
              </p>

              <h2 className="mt-3 font-display text-2xl uppercase tracking-tight leading-[0.9] text-ink xl:text-3xl">
                {t.title[locale]}
              </h2>

              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-ink/75">
                {t.tagline[locale]}
              </p>

              <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink/12 pt-4">
                <p className="text-[13px] font-body text-ink/60">
                  <span className="font-medium text-ink">
                    {locale === "fr"
                      ? `À partir de ${formatPrice(t.priceEUR, locale)}`
                      : `From ${formatPrice(t.priceEUR, locale)}`}
                  </span>{" "}
                  · {formatRating(t.rating, locale)} · {t.reviewCount}{" "}
                  {STR.reviews[locale]}
                </p>
                <span className={`link-underline ${LABEL} shrink-0 text-ember`}>
                  {STR.viewTour[locale]}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
