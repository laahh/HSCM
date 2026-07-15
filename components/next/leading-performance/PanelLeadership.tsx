"use client";

import { motion } from "framer-motion";
import { NARRATIVE, SAP_BC, SAP_MIN_BC, SAP_MIN_MK, SAP_MK, SAP_WEEKS, TBC_BC, TBC_MK, TBC_MIN } from "./data";
import { CountUp } from "./CountUp";
import { SparkLine } from "./SparkLine";

export default function PanelLeadership() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Supervisor Accountability
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">Leadership</h2>
      </header>

      <div className="space-y-5 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="lp-chart-card !p-3">
            <div className="mb-1 text-[12px] font-bold text-[color:var(--green-deep)]">Weekly Ratio SAP</div>
            <SparkLine
              labels={SAP_WEEKS}
              height={160}
              showLegend={false}
              guides={[
                { value: SAP_MIN_BC, color: "#15803d" },
                { value: SAP_MIN_MK, color: "#d97706" },
              ]}
              yMin={15}
              yMax={26}
              series={[
                { label: "BC", values: SAP_BC, color: "#15803d" },
                { label: "MK", values: SAP_MK, color: "#ea580c" },
              ]}
            />
          </div>
          <div className="lp-chart-card !p-3">
            <div className="mb-1 text-[12px] font-bold text-[color:var(--green-deep)]">Weekly Ratio TBC</div>
            <SparkLine
              labels={SAP_WEEKS}
              height={160}
              showLegend={false}
              guides={[{ value: TBC_MIN, color: "#dc2626" }]}
              yMin={2}
              yMax={8}
              series={[
                { label: "BC", values: TBC_BC, color: "#15803d" },
                { label: "MK", values: TBC_MK, color: "#ea580c" },
              ]}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 text-[11px] font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded bg-[#15803d]" /> BC
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded bg-[#ea580c]" /> MK
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="lp-metric-card">
            <div className="text-[11px] font-bold text-[color:var(--green-deep)]">Blindspot TBC</div>
            <div className="mt-1 flex flex-wrap items-end gap-2">
              <CountUp className="font-heading text-[28px] font-black tabular-nums text-slate-700" from={343} to={343} />
              <span className="pb-1 text-slate-300">→</span>
              <CountUp className="font-heading text-[28px] font-black tabular-nums text-emerald-700" from={343} to={222} />
            </div>
            <div className="mt-1 text-[10px] font-semibold text-emerald-600">Q1 → Q2 · ↓ membaik</div>
          </div>
          <div className="lp-metric-card">
            <div className="text-[11px] font-bold text-[color:var(--green-deep)]">Blindspot GR</div>
            <div className="mt-1 flex flex-wrap items-end gap-2">
              <CountUp
                className="font-heading text-[28px] font-black tabular-nums text-slate-700"
                from={47}
                to={47}
                suffix="%"
              />
              <span className="pb-1 text-slate-300">→</span>
              <CountUp
                className="font-heading text-[28px] font-black tabular-nums text-red-600"
                from={47}
                to={67}
                suffix="%"
              />
            </div>
            <div className="mt-1 text-[10px] font-semibold text-red-500">Q1 → Q2 · ↑ gap</div>
          </div>
        </div>

        <div className="lp-footer-box pl-4 text-[12.5px] leading-relaxed text-[color:var(--ink)]">
          {NARRATIVE.leadership}
        </div>
      </div>
    </motion.div>
  );
}
