"use client";

import Image from "next/image";
import { LineMask, Reveal } from "@/lib/motion";
import { useLocale, type L } from "@/lib/i18n";

const STR = {
  eyebrow: { en: "Guides", fr: "Les guides" },
  line1: { en: "The faces", fr: "Les visages" },
  line2: { en: "of the route", fr: "de la route" },
  guidingAlt: {
    en: "The guiding team gathered on a trail above Imlil",
    fr: "L’équipe de guides réunie sur un sentier au-dessus d’Imlil",
  },
  guidingCaption: {
    en: "With the guiding team, Imlil",
    fr: "Avec l’équipe de guides, Imlil",
  },
  portraitAlt: {
    en: "A guide looking out over the High Atlas",
    fr: "Un guide face au Haut Atlas",
  },
  portraitCaption: {
    en: "The mountain office",
    fr: "Le bureau, en montagne",
  },
  p1: {
    en: "Atlas & Medina runs its own tours — designed in-house, delivered with licensed Marrakchi guides who have walked these routes their whole lives.",
    fr: "Atlas & Medina conçoit ses propres circuits — pensés en interne, menés par des guides marrakchis agréés qui parcourent ces routes depuis toujours.",
  },
  p2: {
    en: "Licence checked before anything else. A WhatsApp line the whole time. And mint tea that finds you wherever the day ends.",
    fr: "La licence, vérifiée avant tout le reste. Une ligne WhatsApp en permanence. Et un thé à la menthe qui vous trouve, où que la journée se termine.",
  },
  teaAlt: {
    en: "Mint tea poured from height into small glasses",
    fr: "Thé à la menthe versé de haut dans de petits verres",
  },
  teaCaption: { en: "Poured properly", fr: "Versé comme il faut" },
} satisfies Record<string, L>;

const IMG_HOVER =
  "object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100";

const CAPTION =
  "mt-3 text-[11px] tracking-[0.2em] uppercase font-body text-sand";

export default function Guides() {
  const locale = useLocale();

  return (
    <section id="guides" className="py-24 md:py-40 px-5 md:px-10 xl:px-16">
      {/* Header block */}
      <div className="max-w-[40rem]">
        <Reveal>
          <p className="text-[11px] tracking-[0.25em] uppercase font-body font-medium text-ink/60">
            <span className="font-display text-ember tracking-tight">04</span>
            <span className="mx-3">—</span>
            {STR.eyebrow[locale]}
          </p>
        </Reveal>

        <h2 className="mt-8 font-display uppercase tracking-tight text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[0.9] text-ink">
          <LineMask>{STR.line1[locale]}</LineMask>
          <LineMask delay={0.1}>
            {STR.line2[locale]}
            <span className="text-ember">.</span>
          </LineMask>
        </h2>
      </div>

      <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-10">
        {/* Left — big figure */}
        <div className="lg:col-span-7">
          <Reveal>
            <figure>
              <div className="group relative overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about-guiding.webp"
                  alt={STR.guidingAlt[locale]}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className={IMG_HOVER}
                />
              </div>
              <figcaption className={CAPTION}>
                {STR.guidingCaption[locale]}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Right — stacked portrait, copy, tea */}
        <div className="lg:col-span-5 flex flex-col">
          <Reveal delay={0.1} className="w-4/5">
            <figure>
              <div className="group relative overflow-hidden aspect-[3/4]">
                <Image
                  src="/images/about-portrait.webp"
                  alt={STR.portraitAlt[locale]}
                  fill
                  sizes="(min-width: 1024px) 32vw, 80vw"
                  className={IMG_HOVER}
                />
              </div>
              <figcaption className={CAPTION}>
                {STR.portraitCaption[locale]}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 space-y-6">
            <p className="text-[15px] leading-relaxed text-ink/75 max-w-[38ch]">
              {STR.p1[locale]}
            </p>
            <p className="text-[15px] leading-relaxed text-ink/75 max-w-[38ch]">
              {STR.p2[locale]}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="w-3/5 self-end -mt-6">
            <figure>
              <div className="group relative overflow-hidden aspect-[4/3]">
                <Image
                  src="/images/about-tea.webp"
                  alt={STR.teaAlt[locale]}
                  fill
                  sizes="(min-width: 1024px) 24vw, 60vw"
                  className={IMG_HOVER}
                />
              </div>
              <figcaption className={CAPTION}>
                {STR.teaCaption[locale]}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
