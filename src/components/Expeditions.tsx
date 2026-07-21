"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LABEL,
  LineMask,
  Reveal,
  useReducedMotionSafe,
} from "@/lib/motion";
import { UI, formatPrice, useLocale, type L } from "@/lib/i18n";
import { TOURS, type Tour } from "@/lib/data";

const STR: Record<string, L> = {
  eyebrow: { en: "Tours", fr: "Circuits" },
  headline1: { en: "Six ways in.", fr: "Six entrées." },
  headline2: { en: "No crowds.", fr: "Zéro foule." },
  body: {
    en: "Medina, mountains, desert, coast. Every departure runs with a licensed local guide, honestly described — real durations, real group sizes, real prices.",
    fr: "Médina, montagnes, désert, côte. Chaque départ se fait avec un guide local agréé, décrit honnêtement — vraies durées, vraies tailles de groupe, vrais prix.",
  },
  viewTour: { en: "View tour", fr: "Voir le circuit" },
};

/** Single tour card — shared by the pinned rail and the native rail. */
function TourCard({
  tour,
  sizes,
  className,
}: {
  tour: Tour;
  sizes: string;
  className: string;
}) {
  const locale = useLocale();
  const rating = locale === "fr" ? tour.rating.replace(".", ",") : tour.rating;
  const meta =
    locale === "fr"
      ? `${tour.category.fr} · ${tour.duration.fr} · ${tour.group} max`
      : `${tour.category.en} · ${tour.duration.en} · Max ${tour.group}`;

  return (
    <Link
      href={`/${locale}/tours/${tour.slug}`}
      aria-label={tour.title[locale]}
      className={`group relative block shrink-0 ${className}`}
    >
      <article className="relative h-full w-full overflow-hidden bg-char">
        <Image
          src={tour.image}
          alt={`${tour.title[locale]} — ${tour.category[locale]}`}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />

        {/* Legibility gradient into basalt */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-basalt via-basalt/55 to-transparent"
        />

        {/* Index numeral */}
        <span className="absolute left-5 top-5 font-display text-2xl text-ember">
          {tour.index}
        </span>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 xl:p-6">
          <h3 className="font-display uppercase tracking-tight leading-[0.9] text-3xl xl:text-4xl text-bone">
            {tour.title[locale]}
          </h3>
          <p className={`mt-3 ${LABEL} text-sand`}>{meta}</p>
          <div className="mt-4 flex items-baseline justify-between border-t border-bone/12 pt-3">
            <span className="text-[15px] text-bone">
              {UI.from[locale]} {formatPrice(tour.priceEUR, locale)}
              <span className="text-bone/55"> — {UI.perPerson[locale]}</span>
            </span>
            <span className={`${LABEL} text-bone/55`}>
              {rating} · {tour.reviews} {UI.reviews[locale]}
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-bone/60 max-w-[36ch]">
            {tour.blurb[locale]}
          </p>
          <p className={`mt-4 ${LABEL} text-ember`}>
            {STR.viewTour[locale]}
            <span
              aria-hidden
              className="ml-2 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}

/** Shared intro copy block. */
function IntroCopy() {
  const locale = useLocale();
  return (
    <>
      <p className={`${LABEL} text-ink/60`}>
        <span className="font-display text-ember tracking-tight">01</span>
        <span className="mx-3">—</span>
        {STR.eyebrow[locale]}
      </p>
      <h2 className="mt-6 font-display uppercase tracking-tight leading-[0.9] text-6xl xl:text-7xl text-ink">
        <LineMask>{STR.headline1[locale]}</LineMask>
        <LineMask delay={0.12}>{STR.headline2[locale]}</LineMask>
      </h2>
      <Reveal delay={0.2} className="mt-8">
        <p className="text-[15px] leading-relaxed text-ink/75 max-w-[42ch]">
          {STR.body[locale]}
        </p>
      </Reveal>
    </>
  );
}

/** Native snap-scroll rail — mobile layout, and the reduced-motion fallback at all sizes. */
function NativeRail({ allSizes }: { allSizes: boolean }) {
  return (
    <div className={allSizes ? "py-24 md:py-40" : "py-24 md:hidden"}>
      <div className="px-5 md:px-10 xl:px-16">
        <IntroCopy />
      </div>
      <div className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 pb-4 md:gap-8 md:px-10 xl:px-16">
        {TOURS.map((tour) => (
          <TourCard
            key={tour.slug}
            tour={tour}
            sizes="(max-width: 768px) 82vw, 30rem"
            className="w-[82vw] h-[64vh] snap-start md:w-[30rem] md:h-[68vh]"
          />
        ))}
      </div>
    </div>
  );
}

export default function Expeditions() {
  const locale = useLocale();
  const reduced = useReducedMotionSafe();
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to horizontal travel. The output clamps at 0.92 so the
  // last card is fully in view with a beat to spare before the section unpins.
  const x = useTransform(scrollYProgress, [0, 0.92], [0, -shift]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // clientWidth, not innerWidth: the layout viewport excludes the
      // classic scrollbar this site styles in.
      setShift(
        Math.max(0, track.scrollWidth - document.documentElement.clientWidth),
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduced]);

  if (reduced) {
    return (
      <section id="tours" className="relative">
        {/* useScroll's target must stay mounted in every branch. */}
        <div ref={outerRef}>
          <NativeRail allSizes />
        </div>
      </section>
    );
  }

  return (
    <section id="tours" className="relative">
      {/* Desktop: pinned horizontal rail. Height derives from the measured
          travel so a viewport wide enough to fit everything gets no dead pin. */}
      <div
        ref={outerRef}
        className="hidden md:block"
        style={{ height: `calc(100vh + ${Math.round(shift * 1.5)}px)` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-8 pl-10 pr-10 xl:pl-16 xl:pr-16 will-change-transform"
          >
            {/* Intro panel */}
            <div className="w-[38rem] shrink-0 pr-16">
              <IntroCopy />
              <Reveal delay={0.3} className="mt-14">
                <div className="flex items-center gap-4">
                  <span className={`${LABEL} text-ink/60`}>
                    {UI.scroll[locale]}
                  </span>
                  <span aria-hidden className="h-px w-20 bg-ink/30" />
                </div>
              </Reveal>
            </div>

            {TOURS.map((tour) => (
              <TourCard
                key={tour.slug}
                tour={tour}
                sizes="(max-width: 1280px) 26rem, 30rem"
                className="w-[26rem] xl:w-[30rem] h-[68vh]"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile: native snap rail */}
      <NativeRail allSizes={false} />
    </section>
  );
}
