"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

/** House easing — every animation on the site uses this curve. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Locked label tokens (see DESIGN-SPEC.md). */
export const LABEL =
  "text-[11px] tracking-[0.25em] uppercase font-body font-medium";
export const LABEL_SM =
  "text-[10px] tracking-[0.25em] uppercase font-body font-medium";

const RM_QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Hydration-safe prefers-reduced-motion. The server snapshot is `false`, so
 * SSR and the first client render always match (framer's useReducedMotion
 * reports the real value on the first client render and mismatches
 * server-rendered branches); the real preference applies right after
 * hydration.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(RM_QUERY).matches,
    () => false,
  );
}

/** Fade-and-rise block reveal, fired once on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Masked line reveal for display headlines. Wrap each line:
 * <LineMask delay={0.1}>THE WILD</LineMask>
 */
export function LineMask({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  // The observer must sit on the OUTER mask: the inner span starts fully
  // clipped by overflow-hidden, and a fully-clipped element never
  // intersects, which would deadlock the reveal.
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  if (reduced) return <span className={`block ${className ?? ""}`}>{children}</span>;
  // py/-my expands the clip box without changing layout: at display leading
  // (0.85–0.9) Anton's accents on capitals (É, À) poke above the line box and
  // a tight overflow-hidden mask would shear them off in French.
  return (
    <span ref={ref} className="block overflow-hidden py-[0.14em] -my-[0.14em]">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "130%" }}
        animate={inView ? { y: "0%" } : { y: "130%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
