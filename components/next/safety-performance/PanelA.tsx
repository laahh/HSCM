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

  /** Per-column timing so bars feel independent, not in lockstep */
  const colMotion = STACKED.labels.map((_, i) => {
    const grow = 0.55 + (i % 3) * 0.12;
    const hold = 0.9 + (i % 2) * 0.35;
    const shrink = 0.5 + ((i + 1) % 3) * 0.1;
    const pause = 0.25 + (i % 4) * 0.12;
    const duration = grow + hold + shrink + pause;
    const tGrow = grow / duration;
    const tHold = (grow + hold) / duration;
    const tShrink = (grow + hold + shrink) / duration;
    return {
      duration,
      delay: i * 0.22 + (i % 2) * 0.08,
      times: [0, tGrow, tHold, tShrink, 1] as number[],
      bobDur: 2.4 + (i % 3) * 0.45,
      bobAmp: i % 2 === 0 ? -3 : -1.5,
    };
  });

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3 shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[color:var(--ink)]">Nearmiss · Fire · Property Damage</h3>
        <div className="flex flex-wrap justify-end gap-2 text-[9px]">
          {(
            [
              { c: "bg-slate-400", t: "NM" },
              { c: "bg-red-600", t: "Fire" },
              { c: "bg-[color:var(--accent-orange)]", t: "PD" },
            ] as const
          ).map((leg, li) => (
            <motion.span
              key={leg.t}
              className="inline-flex items-center gap-1"
              animate={play ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
              transition={
                play
                  ? { duration: 2.6 + li * 0.4, repeat: Infinity, ease: "easeInOut", delay: li * 0.35 }
                  : undefined
              }
            >
              <span className={`h-2 w-2 rounded-sm ${leg.c}`} /> {leg.t}
            </motion.span>
          ))}
        </div>
      </div>
      <div className="flex h-[160px] items-end gap-2 px-1 pb-6 pt-2">
        {STACKED.labels.map((label, i) => {
          const nm = STACKED.nearmiss[i];
          const fire = STACKED.fire[i];
          const pd = STACKED.pd[i];
          const total = STACKED.totals[i];
          const m = colMotion[i];
          const segments = [
            { h: nm, color: "bg-slate-400", key: "nm", lag: 0 },
            { h: fire, color: "bg-red-600", key: "fire", lag: 0.07 },
            { h: pd, color: "bg-[color:var(--accent-orange)]", key: "pd", lag: 0.14 },
          ] as const;

          return (
            <motion.div
              key={label}
              className="relative flex flex-1 flex-col items-center justify-end"
              animate={play ? { y: [0, m.bobAmp, 0] } : { y: 0 }}
              transition={
                play
                  ? {
                      duration: m.bobDur,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: m.delay * 0.4,
                    }
                  : undefined
              }
            >
              <motion.span
                className="mb-1 text-[10px] font-extrabold text-[color:var(--ink)]"
                animate={
                  play
                    ? { opacity: [0, 1, 1, 0.15, 0], y: [8, 0, 0, -2, 4] }
                    : inView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 6 }
                }
                transition={
                  play
                    ? {
                        duration: m.duration,
                        times: m.times,
                        ease: easeOut,
                        repeat: Infinity,
                        delay: m.delay,
                      }
                    : { duration: 0.3 }
                }
              >
                {total.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
              </motion.span>
              <div className="flex h-24 w-full max-w-[42px] flex-col-reverse overflow-hidden rounded-t-md shadow-sm ring-1 ring-black/5">
                {segments.map((seg) => (
                  <motion.div
                    key={seg.key}
                    className={`w-full ${seg.color} origin-bottom will-change-[height]`}
                    initial={{ height: "0%" }}
                    animate={
                      play
                        ? { height: ["0%", pct(seg.h), pct(seg.h), "0%", "0%"] }
                        : inView
                          ? { height: pct(seg.h) }
                          : { height: "0%" }
                    }
                    transition={
                      play
                        ? {
                            duration: m.duration,
                            times: m.times,
                            ease: [0.22, 1, 0.36, 1],
                            repeat: Infinity,
                            delay: m.delay + seg.lag,
                          }
                        : { duration: 0.55, delay: i * 0.06, ease: easeOut }
                    }
                  />
                ))}
              </div>
              <span className="absolute -bottom-5 whitespace-nowrap text-[8px] text-[color:var(--ink-soft)]">{label}</span>
            </motion.div>
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
      className={`rounded-lg border p-3.5 shadow-sm ${
        isGood ? "border-emerald-200 bg-emerald-50/80" : "border-red-200 bg-red-50"
      }`}
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.97 }}
      transition={{ delay, duration: 0.5, ease: easeOut }}
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(15,23,42,0.08)" }}
    >
      <div className="mb-2 flex items-center gap-2">
        <motion.div
          className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-black text-white ${
            isGood ? "bg-[color:var(--green-mid)]" : "bg-red-600"
          }`}
          animate={
            inView
              ? isGood
                ? { scale: [1, 1.12, 1] }
                : { scale: [1, 1.1, 1], boxShadow: ["0 0 0 0 rgba(220,38,38,0.0)", "0 0 0 6px rgba(220,38,38,0.18)", "0 0 0 0 rgba(220,38,38,0.0)"] }
              : {}
          }
          transition={{ delay: delay + 0.35, duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {isGood ? "+" : "!"}
        </motion.div>
        <h4 className={`text-sm font-black ${isGood ? "text-[color:var(--ink)]" : "text-red-600"}`}>{title}</h4>
      </div>
      <ul className="space-y-1 text-[12px] text-[color:var(--ink)]">
        {items.map((g, i) => (
          <motion.li
            key={g}
            className="flex gap-2"
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
      className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="mb-4 flex items-center gap-3"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <motion.div
          className="sp-panel-badge"
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 16, delay: 0.08 }}
        >
          A
        </motion.div>
        <div>
          <h2 className="font-heading text-base font-black leading-tight text-[color:var(--ink)] md:text-lg">
            Safety Performance All Site YTD 2026
          </h2>
          <div className="text-[11px] text-[color:var(--ink-soft)]">Piramida · HIPO · Komposisi Kejadian</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        >
          <BradleyPyramid />
        </motion.div>

        <div className="flex min-w-0 flex-col gap-3">
          <HipoTrend />
          <StackedBars />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SummaryCard tone="good" title="Good Record" items={GOOD_RECORD} delay={0.15} />
        <SummaryCard tone="gap" title="Gap" items={GAP_ITEMS} delay={0.28} />
      </div>
    </motion.section>
  );
}
