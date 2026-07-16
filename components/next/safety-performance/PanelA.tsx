"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GAP_ITEMS, GOOD_RECORD, STACKED } from "./data";
import { useInView } from "./useInView";
import { BradleyPyramid } from "./BradleyPyramid";
import { HipoTrend } from "./HipoTrend";

const easeOut = [0.22, 1, 0.36, 1] as const;

function StackedBars() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reduceMotion = useReducedMotion();
  const play = inView && !reduceMotion;
  const max = 14;
  const pct = (v: number) => `${(v / max) * 100}%`;

  return (
    <motion.div
      ref={ref}
      className="min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-2 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <h3 className="text-xs font-bold text-[color:var(--ink)]">Nearmiss · Fire · Property Damage</h3>
        <div className="flex flex-wrap justify-end gap-1.5 text-[8px]">
          {(
            [
              { c: "bg-slate-400", t: "NM" },
              { c: "bg-red-600", t: "Fire" },
              { c: "bg-[color:var(--accent-orange)]", t: "PD" },
            ] as const
          ).map((leg) => (
            <span key={leg.t} className="inline-flex items-center gap-1">
              <span className={`h-2 w-2 rounded-sm ${leg.c}`} /> {leg.t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex h-[88px] items-end gap-1.5 px-1 pb-4 pt-1">
        {STACKED.labels.map((label, i) => {
          const nm = STACKED.nearmiss[i];
          const fire = STACKED.fire[i];
          const pd = STACKED.pd[i];
          const total = STACKED.totals[i];
          const segments = [
            { h: nm, color: "bg-slate-400", key: "nm" },
            { h: fire, color: "bg-red-600", key: "fire" },
            { h: pd, color: "bg-[color:var(--accent-orange)]", key: "pd" },
          ] as const;

          return (
            <div key={label} className="relative flex flex-1 flex-col items-center justify-end">
              <motion.span
                className="mb-0.5 text-[9px] font-extrabold text-[color:var(--ink)]"
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.3, delay: play ? i * 0.06 : 0, ease: easeOut }}
              >
                {total.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
              </motion.span>
              <div className="flex h-14 w-full max-w-[36px] flex-col-reverse overflow-hidden rounded-t-md shadow-sm ring-1 ring-black/5">
                {segments.map((seg, si) => (
                  <motion.div
                    key={seg.key}
                    className={`w-full ${seg.color} origin-bottom will-change-[height]`}
                    initial={{ height: "0%" }}
                    animate={{ height: inView ? pct(seg.h) : "0%" }}
                    transition={{
                      duration: play ? 0.55 : 0.01,
                      delay: play ? i * 0.06 + si * 0.04 : 0,
                      ease: easeOut,
                    }}
                  />
                ))}
              </div>
              <span className="absolute -bottom-3.5 whitespace-nowrap text-[7px] text-[color:var(--ink-soft)]">{label}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function SummaryCard({
  tone,
  title,
  items,
  delay,
}: {
  tone: "good" | "gap";
  title: string;
  items: readonly string[];
  delay: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const isGood = tone === "good";

  return (
    <motion.div
      ref={ref}
      className={`rounded-md border px-2.5 py-1.5 shadow-sm ${
        isGood ? "border-emerald-200 bg-emerald-50/80" : "border-red-200 bg-red-50"
      }`}
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.97 }}
      transition={{ delay, duration: 0.5, ease: easeOut }}
      whileHover={{ y: -1, boxShadow: "0 8px 20px rgba(15,23,42,0.08)" }}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <motion.div
          className={`grid h-4 w-4 place-items-center rounded-full text-[8px] font-black text-white ${
            isGood ? "bg-[color:var(--green-mid)]" : "bg-red-600"
          }`}
          animate={
            inView
              ? isGood
                ? { scale: 1 }
                : { scale: 1, boxShadow: "0 0 0 0 rgba(220,38,38,0)" }
              : {}
          }
          transition={{ delay: delay + 0.35, duration: 0.35, ease: easeOut }}
        >
          {isGood ? "+" : "!"}
        </motion.div>
        <h4 className={`text-xs font-black ${isGood ? "text-[color:var(--ink)]" : "text-red-600"}`}>{title}</h4>
      </div>
      <ul className="space-y-0.5 text-[10px] leading-snug text-[color:var(--ink)]">
        {items.map((g, i) => (
          <motion.li
            key={g}
            className="flex gap-1.5"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: delay + 0.2 + i * 0.08, duration: 0.35, ease: easeOut }}
          >
            <span className={isGood ? "text-[color:var(--green-mid)]" : "text-red-600"}>●</span>
            {g}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function PanelA() {
  return (
    <motion.section
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:p-2.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="mb-1.5 flex shrink-0 items-center gap-2"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <motion.div
          className="sp-panel-badge scale-90"
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 0.9, rotate: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 16, delay: 0.08 }}
        >
          A
        </motion.div>
        <div className="min-w-0">
          <h2 className="font-heading text-sm font-black leading-tight text-[color:var(--ink)] md:text-base">
            Safety Performance All Site YTD 2026
          </h2>
          <div className="text-[10px] text-[color:var(--ink-soft)]">Piramida · HIPO · Komposisi Kejadian</div>
        </div>
      </motion.div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 overflow-hidden lg:grid-cols-[1.25fr_1fr] lg:items-stretch">
        <motion.div
          className="min-h-0 overflow-hidden"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        >
          <BradleyPyramid />
        </motion.div>

        <div className="flex min-h-0 min-w-0 flex-col gap-1.5 overflow-hidden">
          <HipoTrend />
          <StackedBars />
        </div>
      </div>

      <div className="mt-1.5 grid shrink-0 grid-cols-1 gap-1.5 sm:grid-cols-2">
        <SummaryCard tone="good" title="Good Record" items={GOOD_RECORD} delay={0.15} />
        <SummaryCard tone="gap" title="Gap" items={GAP_ITEMS} delay={0.28} />
      </div>
    </motion.section>
  );
}
