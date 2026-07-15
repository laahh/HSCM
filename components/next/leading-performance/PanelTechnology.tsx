"use client";

import { motion } from "framer-motion";
import {
  BEARC_BREAKDOWN,
  BEARC_FLOW,
  BEARC_IMPACT,
  DMS_INTERVENSI_BELOW,
  DMS_LEAD_BELOW,
  NARRATIVE,
  TECH_GAPS,
} from "./data";
import { CountUp } from "./CountUp";
import { KpiSimple, PartnerChips, SectionLabel } from "./ui";

export default function PanelTechnology() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
            Supporting Technology
          </div>
          <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">Technology</h2>
        </header>

        <div className="space-y-5 p-4 md:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <KpiSimple
                label="Leadtime Alert DMS"
                from={62}
                to={67}
                fromSuffix="%"
                toSuffix="%"
                toTone="good"
                showMeter
              />
              <div>
                <SectionLabel danger>Leadtime under 5 Min &lt; 70%</SectionLabel>
                <PartnerChips items={DMS_LEAD_BELOW} />
              </div>
            </div>
            <div className="space-y-2">
              <KpiSimple
                label="Intervensi Alert DMS (Fatigue & Violation)"
                from={72}
                to={73}
                fromSuffix="%"
                toSuffix="%"
                toTone="good"
                showMeter
              />
              <div>
                <SectionLabel danger>Intervensi &lt;</SectionLabel>
                <PartnerChips items={DMS_INTERVENSI_BELOW} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {TECH_GAPS.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="rounded-lg border-[1.5px] border-red-400 bg-red-50 px-3 py-2.5 text-[12px] leading-relaxed text-[color:var(--ink)]"
              >
                <div className="mb-0.5 text-[10px] font-bold tracking-wide text-red-600">{g.title}</div>
                {g.body}
              </motion.div>
            ))}
          </div>

          <div className="lp-footer-box pl-4 text-[12.5px] leading-relaxed text-[color:var(--ink)]">
            <ul className="list-disc space-y-1.5 pl-3.5">
              {NARRATIVE.technology.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* BeARC */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <header className="border-b border-slate-100 bg-[color:var(--green-deep)] px-5 py-3.5 text-white">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">
            Access Role Control
          </div>
          <h2 className="mt-0.5 font-heading text-lg font-extrabold">BeARC</h2>
        </header>

        <div className="space-y-5 p-4 md:p-5">
          <div>
            <SectionLabel>Alur Akses Verifikasi</SectionLabel>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-1 md:justify-between">
              {BEARC_FLOW.map((node, i) => (
                <div key={node} className="flex items-center gap-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.12 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                    className="min-w-[76px] rounded-lg border-2 border-[color:var(--green-deep)] bg-emerald-50 px-2.5 py-2 text-center text-[10px] font-semibold text-[color:var(--ink)]"
                  >
                    <div className="mb-0.5 text-[10px] font-bold tracking-wide text-[color:var(--green-mid)]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {node}
                  </motion.div>
                  {i < BEARC_FLOW.length - 1 && (
                    <span className="text-lg text-[color:var(--green-deep)]" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 md:grid-cols-[200px_1fr]">
            <div className="text-center">
              <SectionLabel>Total Pekerja Banned</SectionLabel>
              <CountUp
                className="lp-kpi mt-1 block text-[48px] leading-none text-[color:var(--green-deep)]"
                from={0}
                to={283}
                duration={1100}
              />
              <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">pekerja terkontrol aksesnya</div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {BEARC_BREAKDOWN.map((b, i) => (
                <div key={`${b.label}-${i}`} className="rounded-lg bg-[color:var(--paper-soft,#f5f8f5)] p-3 text-center">
                  <div className="text-[9px] font-semibold uppercase text-[color:var(--ink-soft)]">{b.label}</div>
                  <CountUp className="text-[22px] font-extrabold text-[color:var(--green-deep)]" from={0} to={b.value} />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <SectionLabel>Dampak per Kategori</SectionLabel>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {BEARC_IMPACT.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-lg border border-slate-100 bg-slate-50/80 py-3 text-center"
                >
                  <CountUp
                    className={`text-[22px] font-extrabold ${c.up ? "text-[color:var(--green-deep)]" : "text-red-600"}`}
                    from={0}
                    to={c.value}
                    suffix="%"
                  />
                  <div className="mt-0.5 text-[9px] text-[color:var(--ink-soft)]">{c.label}</div>
                  <div className={`text-[9px] font-bold ${c.up ? "text-[color:var(--green-deep)]" : "text-red-600"}`}>
                    {c.up ? "↑" : "↓"}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
