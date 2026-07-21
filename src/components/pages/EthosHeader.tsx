"use client";

import { LABEL, LineMask, Reveal } from "@/lib/motion";
import { useLocale, type L } from "@/lib/i18n";

const STR = {
  eyebrow: { en: "About us", fr: "À propos" },
  line1: { en: "Run by locals,", fr: "Tenu par des locaux," },
  line2: { en: "built to last", fr: "fait pour durer" },
} satisfies Record<string, L>;

export default function EthosHeader() {
  const locale = useLocale();
  return (
    <header className="pt-28 md:pt-36 px-5 md:px-10 xl:px-16">
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
    </header>
  );
}
