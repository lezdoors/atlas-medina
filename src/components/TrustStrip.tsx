"use client";

import { useLocale } from "@/lib/i18n";
import { TRUST } from "@/lib/data";
import { LABEL, Reveal } from "@/lib/motion";

export default function TrustStrip() {
  const locale = useLocale();
  return (
    <section className="px-5 py-6 md:px-10 md:py-8">
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
    </section>
  );
}
