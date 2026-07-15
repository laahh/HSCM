"use client";

import { motion } from "framer-motion";

export default function BrandBar() {
  return (
    <motion.div
      className="glass-panel mx-4 mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl px-6 py-4 sm:mx-8 sm:mb-8 md:px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
          <path
            d="M14 2c4 4 4 9 0 13-4-4-4-9 0-13Z"
            fill="var(--dot-2)"
          />
          <path
            d="M14 9c4 4 4 9 0 13-4-4-4-9 0-13Z"
            fill="var(--dot-1)"
          />
        </svg>
        <div className="leading-tight">
          <p className="font-heading text-lg font-bold text-white">
            beraucoal
          </p>
          <p className="text-[10px] tracking-wide text-white/60">
            better energy, brighter future
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="glass-chip rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[var(--ink)] sm:text-sm">
          #Siaga<span style={{ color: "var(--accent-orange)" }}>Saling</span>Menjaga
        </span>
        <span
          className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold italic tracking-wide text-[var(--lime-soft)] sm:text-sm"
        >
          #SayaBerani<span className="not-italic">SpeakUp</span>
        </span>
      </div>
    </motion.div>
  );
}
