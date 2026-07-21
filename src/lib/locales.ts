/* Server-safe locale constants — no "use client", so server components
   (layout generateStaticParams/metadata) can use the real values. */

export type Locale = "en" | "fr";
export type L = { en: string; fr: string };

export const LOCALES: Locale[] = ["en", "fr"];
