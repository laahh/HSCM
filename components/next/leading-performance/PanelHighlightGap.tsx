"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { GAP_CONTRACTORS, GAP_MATRIX, GAP_NARRATIVE } from "./data";

function GapMark({ show }: { show: boolean }) {
  if (!show) {
    return <span className="text-[10px] text-slate-200">·</span>;
  }

  return (
    <motion.span
      className="inline-flex h-4 w-4 items-center justify-center rounded-[2px] border border-red-600 bg-red-50 text-[10px] font-black leading-none text-red-700"
      animate={{
        opacity: [1, 0.35, 1],
        scale: [1, 0.92, 1],
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
  const totals = useMemo(
    () =>
      GAP_CONTRACTORS.map((_, gi) =>
        GAP_MATRIX.reduce((sum, pillar) => sum + pillar.rows.filter((r) => r.gaps[gi]).length, 0),
      ),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <header className="shrink-0 border-b border-slate-200 bg-slate-50 px-3 py-2 md:px-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Highlight
        </div>
        <h2 className="font-heading text-base font-extrabold leading-tight text-[color:var(--ink)] md:text-[17px]">
          Highlight Gap Leading Performance Q2
        </h2>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 md:p-2.5">
        <div className="min-h-0 flex-1 overflow-auto rounded-md border border-slate-200">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="sticky left-0 z-[2] w-[72px] border-b border-r border-slate-200 bg-slate-50 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                  Pillar
                </th>
                <th className="sticky left-[72px] z-[2] min-w-[168px] border-b border-r border-slate-200 bg-slate-50 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-500">
                  Indicator
                </th>
                {GAP_CONTRACTORS.map((c) => (
                  <th
                    key={c}
                    className="border-b border-slate-200 px-0.5 py-1 text-center text-[9px] font-bold leading-tight text-[color:var(--ink)]"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GAP_MATRIX.map((pillar, pi) =>
                pillar.rows.map((row, ri) => (
                  <motion.tr
                    key={`${pillar.id}-${row.metric}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.03 * (pi * 3 + ri), duration: 0.25 }}
                    className="hover:bg-slate-50/70"
                  >
                    {ri === 0 ? (
                      <td
                        rowSpan={pillar.rows.length}
                        className="border-b border-r border-slate-200 px-1 py-0.5 text-center align-middle text-[9px] font-black leading-tight tracking-wide"
                        style={{ background: pillar.headerBg, color: pillar.headerFg }}
                      >
                        <div>{pillar.label}</div>
                        <div className="mt-0.5 text-[8px] font-bold opacity-80">{pillar.incidents}</div>
                      </td>
                    ) : null}
                    <td className="sticky left-[72px] z-[1] border-b border-r border-slate-100 bg-white px-1.5 py-0.5 text-[10px] font-medium leading-snug text-[color:var(--ink)]">
                      {row.metric}
                    </td>
                    {row.gaps.map((hasGap, gi) => (
                      <td
                        key={`${row.metric}-${GAP_CONTRACTORS[gi]}`}
                        className={`border-b border-slate-100 px-0.5 py-0.5 text-center ${
                          hasGap ? "bg-red-50 ring-1 ring-inset ring-red-500/60" : "bg-white"
                        }`}
                      >
                        <GapMark show={hasGap} />
                      </td>
                    ))}
                  </motion.tr>
                )),
              )}
            </tbody>
            <tfoot>
              <tr className="bg-[#1e3a5f] text-white">
                <td
                  colSpan={2}
                  className="sticky left-0 z-[2] border-t border-[#1e3a5f] bg-[#1e3a5f] px-1.5 py-1 text-[10px] font-extrabold uppercase tracking-wide"
                >
                  Total Item Gap
                </td>
                {totals.map((n, i) => (
                  <td
                    key={GAP_CONTRACTORS[i]}
                    className={`border-t border-white/10 px-0.5 py-1 text-center text-[12px] font-black tabular-nums ${
                      n >= 9 ? "text-red-300" : "text-white"
                    }`}
                  >
                    {n}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="shrink-0 border-l-2 border-[color:var(--green-mid)] bg-slate-50/80 px-2.5 py-1.5 text-[11px] leading-snug text-[color:var(--ink)] md:text-[12px]"
        >
          {GAP_NARRATIVE}
        </motion.p>
      </div>
    </motion.div>
  );
}
