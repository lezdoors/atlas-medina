# ATLAS & MEDINA (premium remix) — Design Register v2 (LOCKED)

Small-group Marrakech tour operator, licensed local guides. The site must feel
like sunlight: a warm white ground, big joyful photography, huge type. Premium
editorial, NOT a SaaS template. No glassmorphism, no gradient blobs, no rounded
corners, no drop shadows, no emoji. Dark full-bleed image bands (manifesto,
CTA) punctuate the light page for rhythm.

## Tokens (defined in globals.css — use these only)
- `bg-ground` #FBF8F2 (page), `bg-panel` #F2EBDF (tinted panels/bands),
  `text-ink` #17130C (primary text), `text-ink/60` secondary, `text-ink/45`
  muted metadata, `ember` #C2571B (terracotta accent — numerals, underlines,
  periods, hover; matches the master brand), `sand` #8A6C4A (captions),
  `bone` #EAE3D6 and `basalt` #0B0A08 exist ONLY for text/overlays on top of
  photography (cards, hero, dark bands).
- Hairlines: `border-ink/12` on light ground, `border-bone/12` over dark
  imagery. 1px only. Square corners only.
- Fonts: `font-display` (Anton — ALWAYS uppercase, tracking-tight,
  leading [0.82-0.9]) and `font-body` (Manrope).
- Labels/eyebrows: `text-[11px] tracking-[0.25em] uppercase font-body
  font-medium text-ink/60` (over photos: `text-bone/60`). Body copy
  `text-[15px] leading-relaxed text-ink/75 max-w-[42ch]`.
- Section index numerals: ember `font-display` (01, 02 …).

## Motion rules — unchanged from v1
EASE [0.16,1,0.3,1]; LineMask/Reveal from `@/lib/motion`; parallax ±8-12%;
whileInView margins vertical-only; everything respects `useReducedMotionSafe`.

## i18n (mandatory)
- Locales `en` + `fr`, routed at `/en` and `/fr`. `useLocale()` from
  `@/lib/i18n`. EVERY user-visible string is an `L = {en, fr}` pair — no
  hardcoded single-language strings.
- French: real French, not translation-ese. Vocabulary from the master site:
  "guide marrakchi agréé", "petits groupes", "annulation gratuite jusqu'à
  24 h", "À partir de 39 €" (€ AFTER the number, non-breaking space), "avis".
  Anton has no accented-caps issues — accents REQUIRED on capitals (MÉDINA).

## Section order & index
01 Tours · 02 How it works · 03 Ethos · 04 Guides · 05 Voices · 06 Journal ·
07 Good to know. Trust strip (unnumbered) sits between Marquee and Tours.

## Copy voice
Terse, declarative, warm. No exclamation marks, no "unforgettable". Prices
"From €39" / "À partir de 39 €". Curly apostrophes (' / ').
