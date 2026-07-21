"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { usePathname } from "next/navigation";
import { EASE, LABEL, LineMask, useReducedMotionSafe } from "@/lib/motion";
import { UI, useLocale, type L } from "@/lib/i18n";

const ROUTES: { path: string; label: L }[] = [
  { path: "tours", label: { en: "Tours", fr: "Circuits" } },
  { path: "ethos", label: { en: "Ethos", fr: "Éthique" } },
  { path: "journal", label: { en: "Journal", fr: "Journal" } },
  { path: "contact", label: { en: "Contact", fr: "Contact" } },
];

const STR: Record<string, L> = {
  primary: { en: "Primary", fr: "Navigation principale" },
  openMenu: { en: "Open menu", fr: "Ouvrir le menu" },
  closeMenu: { en: "Close menu", fr: "Fermer le menu" },
  menu: { en: "Menu", fr: "Menu" },
  language: { en: "Language", fr: "Langue" },
  location: { en: "Marrakech, Morocco", fr: "Marrakech, Maroc" },
  tagline: {
    en: "Licensed local guides · small groups · WhatsApp line on every booking",
    fr: "Guides locaux agréés · petits groupes · ligne WhatsApp sur chaque réservation",
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();
  const locale = useLocale();
  const pathname = usePathname() ?? "";
  const { scrollY } = useScroll();

  /* "/en" and "/fr" (trailing-slash tolerant) are the only routes with a
     dark hero under the transparent bar. */
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isHome = normalizedPath === "/en" || normalizedPath === "/fr";

  /* Locale switch preserves the current path: /en/tours → /fr/tours. */
  const pathFor = (target: "en" | "fr") => {
    const rest = normalizedPath.replace(/^\/(en|fr)(?=\/|$)/, "");
    return `/${target}${rest === "/" ? "" : rest}`;
  };
  const burgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 48);
  });

  /* While the overlay is open: lock body scroll, close on Escape, close if
     the viewport crosses into the desktop layout (where the overlay and its
     close button become display:none), make the page content inert, and
     manage focus in/out of the dialog. */
  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    main?.setAttribute("inert", "");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    onMq();
    mq.addEventListener("change", onMq);
    overlayRef.current?.querySelector("a")?.focus();
    return () => {
      document.body.style.overflow = prev;
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      burger?.focus();
    };
  }, [open]);

  const barTransition = reduced
    ? "transition-none"
    : "transition-[background-color,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const colorTransition =
    "transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  /* The bar content must read as ink whenever it sits on a light ground:
     after scroll (bar is bg-ground/85), while the mobile overlay (bg-ground)
     is open beneath the transparent bar, or on any non-home page (no dark
     hero — force the light/ink state permanently). */
  const onLight = scrolled || open || !isHome;
  const barSolid = scrolled || !isHome;

  const localeSwitch = (over: "bar" | "overlay") => {
    const inactive =
      over === "overlay" || onLight
        ? "text-ink/70 hover:text-ink"
        : "text-bone/70 hover:text-bone";
    const hairline =
      over === "overlay" || onLight ? "bg-ink/20" : "bg-bone/20";
    return (
      <nav aria-label={STR.language[locale]} className="flex items-center gap-3">
        <Link
          href={pathFor("en")}
          aria-current={locale === "en" ? "true" : undefined}
          className={`${LABEL} ${colorTransition} ${
            locale === "en" ? "text-ember" : inactive
          }`}
        >
          EN
        </Link>
        <span aria-hidden className={`h-3 w-px ${colorTransition} ${hairline}`} />
        <Link
          href={pathFor("fr")}
          aria-current={locale === "fr" ? "true" : undefined}
          className={`${LABEL} ${colorTransition} ${
            locale === "fr" ? "text-ember" : inactive
          }`}
        >
          FR
        </Link>
      </nav>
    );
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b ${barTransition} ${
          barSolid
            ? "bg-ground/85 backdrop-blur-md border-ink/12"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-10 xl:px-16">
          {/* Logo + wordmark */}
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src={onLight ? "/logo-mark-ink.png" : "/logo-mark.png"}
              alt=""
              aria-hidden
              width={44}
              height={29}
              className="h-7 w-auto"
            />
            <span
              className={`font-display text-lg uppercase tracking-[0.08em] ${colorTransition} ${
                onLight ? "text-ink" : "text-bone"
              }`}
            >
              Atlas&nbsp;&amp;&nbsp;Medina
            </span>
          </Link>

          {/* Centre links — desktop only */}
          <nav
            aria-label={STR.primary[locale]}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
          >
            {ROUTES.map((route) => (
              <Link
                key={route.path}
                href={`/${locale}/${route.path}`}
                className={`link-underline ${LABEL} ${colorTransition} ${
                  onLight
                    ? "text-ink/70 hover:text-ink"
                    : "text-bone/70 hover:text-bone"
                }`}
              >
                {route.label[locale]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {/* CTA — desktop only */}
            <Link
              href={`/${locale}/tours`}
              className={`hidden border px-5 py-3 lg:inline-block ${LABEL} ${colorTransition} ${
                onLight
                  ? "border-ink/30 text-ink hover:bg-ink hover:text-ground"
                  : "border-bone/30 text-bone hover:bg-bone hover:text-basalt"
              }`}
            >
              {UI.bookTour[locale]}
            </Link>

            {/* Locale switch — desktop only (also inside the mobile overlay) */}
            <div className="hidden lg:block">{localeSwitch("bar")}</div>

            {/* Hamburger — mobile only */}
            <button
              ref={burgerRef}
              type="button"
              aria-label={open ? STR.closeMenu[locale] : STR.openMenu[locale]}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="-mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[7px] lg:hidden"
            >
              <motion.span
                className={`block h-px w-6 ${colorTransition} ${
                  onLight ? "bg-ink" : "bg-bone"
                }`}
                animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              />
              <motion.span
                className={`block h-px w-6 ${colorTransition} ${
                  onLight ? "bg-ink" : "bg-bone"
                }`}
                animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={STR.menu[locale]}
            className="fixed inset-0 z-30 bg-ground lg:hidden"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduced ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          >
            <div className="flex h-full flex-col justify-between px-5 pb-10 pt-28">
              <nav aria-label={STR.menu[locale]}>
                {ROUTES.map((route, i) => (
                  <Link
                    key={route.path}
                    href={`/${locale}/${route.path}`}
                    onClick={() => setOpen(false)}
                    className="block py-2"
                  >
                    <LineMask
                      delay={0.2 + i * 0.08}
                      className="font-display uppercase tracking-tight leading-[0.86] text-[clamp(3rem,15vw,5.5rem)] text-ink"
                    >
                      {route.label[locale]}
                    </LineMask>
                  </Link>
                ))}
              </nav>

              <div className="border-t border-ink/12 pt-6">
                <div className="mb-5">{localeSwitch("overlay")}</div>
                <p className={`${LABEL} text-ink/60`}>{STR.location[locale]}</p>
                <p className="mt-2 font-body text-[15px] text-ink/75">
                  {STR.tagline[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
