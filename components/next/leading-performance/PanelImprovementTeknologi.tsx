"use client";

import { motion } from "framer-motion";

const PANELS = [
  {
    src: "/improvement-bearc.png",
    title: "BeARC",
    subtitle: "Access Role Control",
  },
  {
    src: "/improvement-rule.png?v=2",
    title: "Rule based Trigger",
    subtitle: "Leading Performance Control",
  },
] as const;

export default function PanelImprovementTeknologi() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Technology
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">
          Improvement Teknologi
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-4 p-4 md:p-5 xl:grid-cols-2">
        {PANELS.map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 + i * 0.08, duration: 0.4 }}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <figcaption className="border-b border-slate-100 bg-slate-50 px-3 py-2">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{p.subtitle}</div>
              <div className="text-[13px] font-bold text-[color:var(--ink)]">{p.title}</div>
            </figcaption>
            <div className="bg-white p-2 md:p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.title}
                className="mx-auto h-auto max-h-[520px] w-full object-contain"
              />
            </div>
          </motion.figure>
        ))}
      </div>
    </motion.div>
  );
}
