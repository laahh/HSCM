"use client";

import { motion } from "framer-motion";
import { HIGHLIGHTS } from "./data";

export default function PanelHighlightGrTbc() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Highlight
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">
          Highlight GR &amp; TBC
        </h2>
      </header>

      <div className="p-4 md:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <motion.figure
              key={h.src}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
              className="group overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm"
            >
              <div className="relative h-[160px] w-full overflow-hidden bg-slate-200 sm:h-[180px] lg:h-[200px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.src}
                  alt={h.title}
                  width={480}
                  height={320}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="border-t border-slate-200 px-2.5 py-2.5 text-center text-[12px] italic leading-snug text-[color:var(--ink)]">
                {h.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
