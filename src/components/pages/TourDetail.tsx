"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  EASE,
  LABEL,
  LABEL_SM,
  LineMask,
  Reveal,
  useReducedMotionSafe,
} from "@/lib/motion";
import { formatPrice, UI, useLocale, type L, formatRating } from "@/lib/i18n";
import { categories, getTour } from "@/lib/tours-full";

const STR = {
  book: { en: "Book this tour", fr: "Réserver ce circuit" },
  highlights: { en: "Highlights", fr: "Points forts" },
  itinerary: { en: "Itinerary", fr: "Itinéraire" },
  included: { en: "Included", fr: "Inclus" },
  notIncluded: { en: "Not included", fr: "Non inclus" },
  meetingPoint: { en: "Meeting point", fr: "Point de rencontre" },
  openMaps: { en: "Open in Google Maps", fr: "Ouvrir dans Google Maps" },
  goodToKnow: { en: "Good to know", fr: "Bon à savoir" },
  ready: { en: "Ready when you are.", fr: "Quand vous voulez." },
  allTours: { en: "← All tours", fr: "← Tous les circuits" },
  photo: { en: "Photo", fr: "Photo" },
} satisfies Record<string, L>;

const PAD = "px-5 md:px-10 xl:px-16";

const CTA_CLASS = `inline-block border border-ink/30 px-6 py-3 text-ink ${LABEL} transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink hover:text-ground`;

export default function TourDetail({ slug }: { slug: string }) {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const [open, setOpen] = useState<number | null>(0);

  const tour = getTour(slug)!;
  const category =
    categories.find((c) => c.key === tour.category)?.label[locale] ?? "";
  const paragraphs = tour.description[locale].split(/\n\n+/);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    tour.meetingPoint.mapsQuery,
  )}`;

  return (
    <article>
      {/* 1 — Header */}
      <header className={`${PAD} pt-28 md:pt-36`}>
        <Reveal>
          <p className={`${LABEL} text-ink/60`}>
            {category} · {tour.durationLabel[locale]} · {UI.max[locale]}{" "}
            {tour.maxGroup}
          </p>
        </Reveal>
        <h1 className="mt-6 max-w-5xl font-display uppercase tracking-tight leading-[0.9] text-[clamp(2.6rem,6vw,5.5rem)] text-ink">
          <LineMask delay={0.05}>{tour.title[locale]}</LineMask>
        </h1>
        <Reveal delay={0.15} className="mt-6">
          <p className="max-w-[60ch] text-[17px] leading-relaxed text-ink/75">
            {tour.tagline[locale]}
          </p>
        </Reveal>
      </header>

      {/* 2 — Meta bar */}
      <Reveal delay={0.2} className={`${PAD} mt-10`}>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 border-y border-ink/12 py-5">
          <p className="text-[13px] text-ink/60">
            <span className="font-medium text-ink">
              {formatPrice(tour.priceEUR, locale)}
            </span>{" "}
            — {UI.perPerson[locale]}
          </p>
          <p className="text-[13px] text-ink/60">
            {formatRating(tour.rating, locale)} · {tour.reviewCount} {UI.reviews[locale]}
          </p>
          <p className="text-[13px] text-ink/60">{tour.durationLabel[locale]}</p>
          <p className="text-[13px] text-ink/60">
            {UI.max[locale]} {tour.maxGroup}
          </p>
          <Link href={`/${locale}/contact`} className={`ml-auto ${CTA_CLASS}`}>
            {STR.book[locale]}
          </Link>
        </div>
      </Reveal>

      {/* 3 — Full-bleed image band */}
      <div className="relative mt-10 aspect-[16/9] overflow-hidden md:aspect-[21/9]">
        <Image
          src={tour.image}
          alt={tour.title[locale]}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* 4 — Content grid */}
      <div
        className={`${PAD} grid grid-cols-1 gap-y-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-10`}
      >
        {/* Left — description, highlights, itinerary */}
        <div className="lg:col-span-7">
          {paragraphs.map((p) => (
            <Reveal key={p.slice(0, 32)}>
              <p className="mt-5 first:mt-0 max-w-[62ch] text-[15px] leading-relaxed text-ink/75">
                {p}
              </p>
            </Reveal>
          ))}

          <Reveal className="mt-14">
            <h2 className="font-display uppercase tracking-tight text-2xl text-ink">
              {STR.highlights[locale]}
              <span className="text-ember">.</span>
            </h2>
          </Reveal>
          <ul className="mt-6 space-y-3">
            {tour.highlights.map((h, i) => (
              <li key={h.en}>
                <Reveal delay={i * 0.06} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] block h-[6px] w-[6px] shrink-0 bg-ember"
                  />
                  <span className="text-[15px] leading-relaxed text-ink/75">
                    {h[locale]}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-14">
            <h2 className="font-display uppercase tracking-tight text-2xl text-ink">
              {STR.itinerary[locale]}
              <span className="text-ember">.</span>
            </h2>
          </Reveal>
          <div className="mt-6">
            {tour.itinerary.map((step, i) => (
              <Reveal key={step.time} delay={i * 0.06}>
                <div className="grid grid-cols-[5rem_1fr] gap-x-4 border-t border-ink/12 py-5">
                  <p className="font-display tracking-tight text-ember">
                    {step.time}
                  </p>
                  <div>
                    <h3 className="font-display uppercase tracking-tight text-lg text-ink">
                      {step.title[locale]}
                    </h3>
                    <p className="mt-2 max-w-[56ch] text-[14px] leading-relaxed text-ink/70">
                      {step.body[locale]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right — practical box */}
        <aside className="self-start lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9">
          <Reveal>
            <div className="space-y-5 border border-ink/12 p-6">
              <div>
                <p className={`${LABEL_SM} text-sand`}>{STR.included[locale]}</p>
                <ul className="mt-3 space-y-2">
                  {tour.includes.map((item) => (
                    <li key={item.en} className="flex gap-2 text-[13px] leading-relaxed text-ink/75">
                      <span aria-hidden className="text-ember">
                        +
                      </span>
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={`${LABEL_SM} text-sand`}>
                  {STR.notIncluded[locale]}
                </p>
                <ul className="mt-3 space-y-2">
                  {tour.excludes.map((item) => (
                    <li key={item.en} className="text-[13px] leading-relaxed text-ink/50">
                      {item[locale]}
                    </li>
                  ))}
                </ul>
              </div>

              <div aria-hidden className="border-t border-ink/12" />

              <div>
                <p className={`${LABEL_SM} text-sand`}>
                  {STR.meetingPoint[locale]}
                </p>
                <p className="mt-3 text-[15px] text-ink">
                  {tour.meetingPoint.name[locale]}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                  {tour.meetingPoint.details[locale]}
                </p>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`link-underline mt-4 inline-block ${LABEL} text-ember`}
                >
                  {STR.openMaps[locale]}
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* 5 — Gallery */}
      <div className={`${PAD} grid grid-cols-1 gap-4 md:grid-cols-3`}>
        {tour.gallery.map((src, i) => (
          <Reveal key={src} delay={i * 0.08}>
            <div className="group relative aspect-[4/5] overflow-hidden">
              <Image
                src={src}
                alt={`${tour.title[locale]} — ${STR.photo[locale]} ${i + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </div>

      {/* 6 — Tour FAQs */}
      <section className={`${PAD} py-16 md:py-24`}>
        <Reveal>
          <h2 className="font-display uppercase tracking-tight text-2xl text-ink">
            {STR.goodToKnow[locale]}
            <span className="text-ember">.</span>
          </h2>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          {tour.faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q.en} delay={i * 0.08}>
                <div className="border-t border-ink/12 last:border-b">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`tour-faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display uppercase tracking-tight text-lg md:text-xl text-ink">
                      {item.q[locale]}
                    </span>
                    <motion.span
                      aria-hidden
                      className="relative block h-4 w-4 shrink-0"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full bg-ember" />
                      <span className="absolute left-1/2 top-0 h-full w-px bg-ember" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        id={`tour-faq-panel-${i}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[58ch] pb-7 pr-10 text-[15px] leading-relaxed text-ink/75">
                          {item.a[locale]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 7 — Bottom CTA */}
      <section className={`${PAD} border-t border-ink/12 py-14`}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <h2 className="font-display uppercase tracking-tight leading-[0.9] text-3xl text-ink">
            <LineMask>{STR.ready[locale]}</LineMask>
          </h2>
          <Link href={`/${locale}/contact`} className={CTA_CLASS}>
            {STR.book[locale]}
          </Link>
        </div>
        <Reveal className="mt-8">
          <Link
            href={`/${locale}/tours`}
            className={`link-underline inline-block ${LABEL} text-ink/60 hover:text-ink`}
          >
            {STR.allTours[locale]}
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
