"use client";

import { motion, type Variants } from "framer-motion";
import ColorDots from "./ColorDots";
import BrandBar from "./BrandBar";
import ParallaxBackground from "./ParallaxBackground";
import SidebarTicks from "./SidebarTicks";
import RotatingBadge from "./RotatingBadge";
import AbstractVisual from "./AbstractVisual";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <ParallaxBackground />
      <SidebarTicks />

      <div className="relative z-10 flex items-start justify-between px-6 pt-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="glass-chip flex items-center gap-3 rounded-2xl px-4 py-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--green-deep)]">
            <svg width="18" height="18" viewBox="0 0 28 28" fill="none" aria-hidden>
              <path d="M14 2c4 4 4 9 0 13-4-4-4-9 0-13Z" fill="var(--lime)" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className="font-heading text-sm font-extrabold uppercase tracking-wide text-[var(--ink)]">
              HSECM Tingkat I
            </p>
            <p className="text-[11px] font-medium text-[var(--ink-soft)]">
              Quarter 2 Tahun 2026
            </p>
          </div>
        </motion.div>

        <RotatingBadge />
      </div>

      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-8 px-6 pb-16 pt-10 lg:grid-cols-2 lg:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5"
        >
          <motion.div variants={item}>
            <ColorDots />
          </motion.div>

          <motion.h1
            variants={item}
            className="font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl"
          >
            Enhancing
            <br />
            Operation-HSE
            <br />
            Performance
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md font-body text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base"
          >
            Through Reflection, Accountability, and Improvement.
          </motion.p>

          <motion.p
            variants={item}
            className="font-heading text-2xl font-bold italic leading-snug sm:text-3xl"
          >
            <span className="text-gradient-gold underline decoration-4 underline-offset-4">
              Paham Kondisi, Berani Intropeksi, Bangkit Lebih Kuat
            </span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 14, mass: 0.8, delay: 0.35 }}
          className="relative h-[300px] w-full overflow-hidden rounded-3xl bg-[var(--green-deep)] sm:h-[380px] lg:h-[440px] lg:overflow-visible lg:rounded-none lg:bg-transparent"
        >
          <AbstractVisual />
        </motion.div>
      </div>

      <BrandBar />
    </section>
  );
}
