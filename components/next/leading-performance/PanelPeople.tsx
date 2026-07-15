"use client";

import { motion } from "framer-motion";
import { GR_TABLE, HIGHLIGHTS, NARRATIVE } from "./data";
import { KpiSimple } from "./ui";

function q2CellClass(tone: (typeof GR_TABLE)[number]["tone"]) {
  if (tone === "hot") return "rounded bg-red-200/90 font-bold text-red-800";
  if (tone === "mild") return "rounded bg-rose-100 font-semibold text-rose-700";
  if (tone === "warn") return "rounded bg-amber-100 font-semibold text-amber-800";
  return "font-semibold text-[color:var(--ink)]";
}

export default function PanelPeople() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Worker Management
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">People</h2>
      </header>

      <div className="space-y-5 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <KpiSimple label="Valid Golden Rules" from={15} to={33} toTone="bad" />

          <div className="overflow-hidden rounded-[10px] border border-slate-200/80 bg-white">
            <table className="w-full border-collapse text-left text-[11px] leading-tight">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[10px] text-slate-500">
                  <th className="px-2.5 py-2 font-semibold">GR #</th>
                  <th className="px-2 py-2 font-semibold">Jenis</th>
                  <th className="px-2 py-2 text-center font-semibold">Q1&apos;26</th>
                  <th className="px-2 py-2 text-center font-semibold">Q2&apos;26</th>
                </tr>
              </thead>
              <tbody>
                {GR_TABLE.map((row, i) => (
                  <motion.tr
                    key={`${row.code}-${row.jenis}`}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.03, duration: 0.3 }}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="whitespace-nowrap px-2.5 py-1.5 text-slate-500">{row.code}</td>
                    <td className="px-2 py-1.5">{row.jenis}</td>
                    <td className="px-2 py-1.5 text-center text-slate-500">{row.q1}</td>
                    <td className={`px-2 py-1.5 text-center ${q2CellClass(row.tone)}`}>{row.q2}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--ink-soft)]">
            Highlight · Golden Rules &amp; To Be Concerned
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                className={`relative aspect-[16/10] overflow-hidden rounded-lg bg-gradient-to-br ${h.tone}`}
              >
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2.5 py-2 text-[11px] font-medium leading-snug text-white">
                  {h.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lp-footer-box pl-4 text-[12.5px] leading-relaxed text-[color:var(--ink)]">
          {NARRATIVE.people}
        </div>
      </div>
    </motion.div>
  );
}
