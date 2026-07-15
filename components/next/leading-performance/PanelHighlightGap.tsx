"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { GAP_CONTRACTORS, GAP_MATRIX, GAP_NARRATIVE } from "./data";

function GapMark({ show }: { show: boolean }) {
  if (!show) {
    return <span className="text-slate-200">·</span>;
  }

  return (
    <motion.span
      className="inline-flex h-6 w-6 items-center justify-center rounded border-[1.5px] border-red-600 bg-red-50 text-[13px] font-black leading-none text-red-700 shadow-[0_0_0_1px_rgba(220,38,38,0.12)]"
      animate={{
        opacity: [1, 0.25, 1],
        scale: [1, 0.94, 1],
        boxShadow: [
          "0 0 0 1px rgba(220,38,38,0.15)",
          "0 0 0 3px rgba(220,38,38,0.35)",
          "0 0 0 1px rgba(220,38,38,0.15)",
        ],
      }}
      transition={{
        duration: 1.15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-label="Gap"
    >
      X
    </motion.span>
  );
}

export default function PanelHighlightGap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-200 bg-slate-50 px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Highlight
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">
          Highlight Gap Leading Performance Q2
        </h2>
      </header>

      <div className="space-y-4 p-3 md:p-4">
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[920px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="sticky left-0 z-[2] min-w-[200px] border-b border-r border-slate-200 bg-slate-50 px-2.5 py-2 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Indicator
                </th>
                {GAP_CONTRACTORS.map((c) => (
                  <th
                    key={c}
                    className="border-b border-slate-200 px-1.5 py-2 text-center text-[10px] font-bold leading-tight text-[color:var(--ink)]"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GAP_MATRIX.map((pillar, pi) => (
                <Fragment key={pillar.id}>
                  <tr>
                    <td
                      colSpan={GAP_CONTRACTORS.length + 1}
                      className="border-y border-slate-200 px-2.5 py-1.5 text-[11px] font-black tracking-wide"
                      style={{ background: pillar.headerBg, color: pillar.headerFg }}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="inline-block h-2 w-2 rounded-full"
                          style={{ background: pillar.color }}
                        />
                        {pillar.label}
                        <span className="rounded-full bg-black/10 px-2 py-0.5 text-[9px] font-bold">
                          {pillar.incidents}
                        </span>
                      </span>
                    </td>
                  </tr>
                  {pillar.rows.map((row, ri) => (
                    <motion.tr
                      key={`${pillar.id}-${row.metric}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.04 * (pi * 4 + ri), duration: 0.3 }}
                      className="hover:bg-slate-50/80"
                    >
                      <td className="sticky left-0 z-[1] border-b border-r border-slate-100 bg-white px-2.5 py-1.5 text-[11px] font-medium text-[color:var(--ink)]">
                        {row.metric}
                      </td>
                      {row.gaps.map((hasGap, gi) => (
                        <td
                          key={`${row.metric}-${GAP_CONTRACTORS[gi]}`}
                          className={`border-b border-slate-100 px-1 py-1.5 text-center ${
                            hasGap
                              ? "bg-red-50 ring-1 ring-inset ring-red-500/70"
                              : "bg-white"
                          }`}
                        >
                          <GapMark show={hasGap} />
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="lp-footer-box pl-4 text-[12.5px] leading-relaxed text-[color:var(--ink)]"
        >
          {GAP_NARRATIVE}
        </motion.div>
      </div>
    </motion.div>
  );
}
