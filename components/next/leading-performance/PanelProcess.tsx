"use client";

import { motion } from "framer-motion";
import { FTW_BELOW, GOLDEN_TIME_BELOW, IKK_BELOW, NARRATIVE } from "./data";
import { KpiSimple, PartnerChips, SectionLabel } from "./ui";

export default function PanelProcess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          Working Plan &amp; Implementation
        </div>
        <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">Process</h2>
      </header>

      <div className="space-y-5 p-4 md:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <KpiSimple
              label="Aggregator FTW"
              from={99.5}
              to={97.6}
              fromSuffix="%"
              toSuffix="%"
              decimals={1}
              toTone="bad"
              showMeter
            />
            <div>
              <SectionLabel danger>FTW &lt; 100%</SectionLabel>
              <PartnerChips
                items={[
                  { name: FTW_BELOW[0], warn: true },
                  { name: FTW_BELOW[1], warn: false },
                  { name: FTW_BELOW[2], warn: true },
                ]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <KpiSimple
              label="Implementasi IKK"
              from={98}
              to={99}
              fromSuffix="%"
              toSuffix="%"
              toTone="good"
              showMeter
            />
            <div>
              <SectionLabel danger>IKK &lt; 100%</SectionLabel>
              <PartnerChips items={IKK_BELOW} />
            </div>
          </div>

          <div className="space-y-2">
            <KpiSimple
              label="Golden Time"
              from={68}
              to={59}
              fromSuffix="%"
              toSuffix="%"
              toTone="bad"
              showMeter
            />
            <div>
              <SectionLabel danger>Golden Time &lt; 100%</SectionLabel>
              <PartnerChips items={GOLDEN_TIME_BELOW} />
            </div>
          </div>
        </div>

        <div className="lp-footer-box pl-4 text-[12.5px] leading-relaxed text-[color:var(--ink)]">
          <ul className="list-disc space-y-1.5 pl-3.5">
            {NARRATIVE.process.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
