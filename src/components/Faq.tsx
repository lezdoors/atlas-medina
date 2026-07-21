"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, LABEL, LineMask, Reveal, useReducedMotionSafe } from "@/lib/motion";
import { useLocale, type L } from "@/lib/i18n";

const STR = {
  eyebrow: { en: "Good to know", fr: "Bon à savoir" },
  headline1: { en: "Before", fr: "Avant" },
  headline2: { en: "you go", fr: "de partir" },
  intro: {
    en: "The short answers. Anything else, a human who knows the city is one message away.",
    fr: "Les réponses courtes. Pour le reste, un humain qui connaît la ville est à un message.",
  },
} satisfies Record<string, L>;

const ITEMS: { q: L; a: L }[] = [
  {
    q: {
      en: "What happens after I book?",
      fr: "Que se passe-t-il après ma réservation ?",
    },
    a: {
      en: "You get an instant email confirmation with your meeting point and your guide’s details, plus a WhatsApp contact. The evening before, we confirm timing directly.",
      fr: "Vous recevez immédiatement un e-mail de confirmation avec le point de rencontre et les coordonnées de votre guide, plus un contact WhatsApp. La veille au soir, nous confirmons l’horaire directement.",
    },
  },
  {
    q: { en: "Can I cancel?", fr: "Puis-je annuler ?" },
    a: {
      en: "Yes — free cancellation up to 24 hours before your tour, full refund. Weather cancellations on our side are always fully refunded.",
      fr: "Oui — annulation gratuite jusqu’à 24 heures avant le départ, remboursement intégral. Toute annulation météo de notre côté est toujours intégralement remboursée.",
    },
  },
  {
    q: {
      en: "Are the guides really licensed?",
      fr: "Les guides sont-ils vraiment agréés ?",
    },
    a: {
      en: "Every guide we work with holds an official Moroccan guide licence. It is the first thing we check and the reason we exist.",
      fr: "Chaque guide avec qui nous travaillons détient une licence officielle de guide marocain. C’est la première chose que nous vérifions, et notre raison d’être.",
    },
  },
  {
    q: { en: "Do you run private tours?", fr: "Proposez-vous des visites privées ?" },
    a: {
      en: "All six experiences can run privately for your group — ask via the contact page and we quote within a day.",
      fr: "Nos six expériences peuvent être privatisées pour votre groupe — écrivez-nous via la page contact, devis sous 24 heures.",
    },
  },
];

export default function Faq() {
  const locale = useLocale();
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotionSafe();

  return (
    <section
      id="faq"
      className="border-t border-ink/12 py-24 md:py-40 px-5 md:px-10 xl:px-16"
    >
      <div className="grid grid-cols-1 gap-y-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Reveal>
            <p className={`${LABEL} text-ink/60`}>
              <span className="font-display text-ember tracking-tight">07</span>
              <span className="mx-3">—</span>
              {STR.eyebrow[locale]}
            </p>
          </Reveal>
          <h2 className="mt-8 font-display uppercase tracking-tight leading-[0.9] text-[clamp(2.6rem,5vw,4.4rem)] text-ink">
            <LineMask>{STR.headline1[locale]}</LineMask>
            <LineMask delay={0.1}>
              {STR.headline2[locale]}
              <span className="text-ember">.</span>
            </LineMask>
          </h2>
          <Reveal delay={0.2} className="mt-8">
            <p className="text-[15px] leading-relaxed text-ink/75 max-w-[38ch]">
              {STR.intro[locale]}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q.en} delay={i * 0.08}>
                <div className="border-t border-ink/12 last:border-b">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
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
                        id={`faq-panel-${i}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-10 text-[15px] leading-relaxed text-ink/75 max-w-[58ch]">
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
      </div>
    </section>
  );
}
