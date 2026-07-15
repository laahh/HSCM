"use client";

import {
  GR_TABLE,
  NARRATIVE,
  SAP_BC,
  SAP_MIN_BC,
  SAP_MIN_MK,
  SAP_MK,
  SAP_WEEKS,
  TBC_BC,
  TBC_MK,
  TBC_MIN,
} from "./data";
import { CountUp } from "./CountUp";
import { SparkLine } from "./SparkLine";
import { KpiSimple, PillarBlock, PillarColumn } from "./ui";

function q2CellClass(tone: (typeof GR_TABLE)[number]["tone"]) {
  if (tone === "hot") return "rounded bg-red-200/90 font-bold text-red-800";
  if (tone === "mild") return "rounded bg-rose-100 font-semibold text-rose-700";
  if (tone === "warn") return "rounded bg-amber-100 font-semibold text-amber-800";
  return "font-semibold text-[color:var(--ink)]";
}

/** Tab Leading — 4 cards: Supervisor Accountability · People · Process · Technology */
export default function PanelLeading() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:items-stretch xl:gap-3.5">
      <PillarColumn title="Supervisor Accountability" delay={0} footer={NARRATIVE.leadership}>
        <PillarBlock>
          <div className="lp-chart-card">
            <div className="mb-0.5 text-[11px] font-bold text-[color:var(--green-deep)]">Weekly Ratio SAP</div>
            <SparkLine
              labels={SAP_WEEKS}
              height={100}
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
        </PillarBlock>
        <PillarBlock>
          <div className="lp-chart-card">
            <div className="mb-0.5 text-[11px] font-bold text-[color:var(--green-deep)]">Weekly Ratio TBC</div>
            <SparkLine
              labels={SAP_WEEKS}
              height={100}
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
        </PillarBlock>
        <PillarBlock>
          <div className="flex items-center justify-center gap-4 text-[10px] font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-5 rounded bg-[#15803d]" /> BC
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-5 rounded bg-[#ea580c]" /> MK
            </span>
          </div>
        </PillarBlock>
        <PillarBlock>
          <div className="grid grid-cols-2 gap-2">
            <div className="lp-metric-card">
              <div className="text-[10px] font-bold text-[color:var(--green-deep)]">Blindspot TBC</div>
              <div className="mt-0.5 flex flex-wrap items-end gap-1">
                <CountUp className="font-heading text-[16px] font-black tabular-nums text-slate-700" from={343} to={343} />
                <span className="pb-0.5 text-slate-300">→</span>
                <CountUp className="font-heading text-[16px] font-black tabular-nums text-emerald-700" from={343} to={222} />
              </div>
            </div>
            <div className="lp-metric-card">
              <div className="text-[10px] font-bold text-[color:var(--green-deep)]">Blindspot GR</div>
              <div className="mt-0.5 flex flex-wrap items-end gap-1">
                <CountUp
                  className="font-heading text-[16px] font-black tabular-nums text-slate-700"
                  from={47}
                  to={47}
                  suffix="%"
                />
                <span className="pb-0.5 text-slate-300">→</span>
                <CountUp
                  className="font-heading text-[16px] font-black tabular-nums text-red-600"
                  from={47}
                  to={67}
                  suffix="%"
                />
              </div>
            </div>
          </div>
        </PillarBlock>
      </PillarColumn>

      <PillarColumn title="People" delay={0.06} footer={NARRATIVE.people}>
        <PillarBlock>
          <KpiSimple label="Valid Golden Rules" from={15} to={33} toTone="bad" />
        </PillarBlock>
        <PillarBlock>
          <div className="overflow-hidden rounded-[10px] border border-slate-200/80 bg-white">
            <table className="w-full border-collapse text-left text-[9px] leading-tight">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[8.5px] text-slate-500">
                  <th className="px-1 py-1 font-semibold">GR</th>
                  <th className="px-1 py-1 font-semibold">Jenis</th>
                  <th className="px-0.5 py-1 text-center font-semibold">Q1</th>
                  <th className="px-1 py-1 text-center font-semibold">Q2</th>
                </tr>
              </thead>
              <tbody>
                {GR_TABLE.map((row) => (
                  <tr key={`${row.code}-${row.jenis}`} className="border-b border-slate-100 last:border-0">
                    <td className="whitespace-nowrap px-1 py-0.5 text-slate-500">{row.code}</td>
                    <td className="px-1 py-0.5">{row.jenis}</td>
                    <td className="px-0.5 py-0.5 text-center text-slate-500">{row.q1}</td>
                    <td className={`px-1 py-0.5 text-center ${q2CellClass(row.tone)}`}>{row.q2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PillarBlock>
      </PillarColumn>

      <PillarColumn
        title="Process"
        delay={0.12}
        footer={
          <ul className="list-disc space-y-1 pl-3.5">
            {NARRATIVE.process.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        }
      >
        <PillarBlock>
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
        </PillarBlock>
        <PillarBlock>
          <KpiSimple label="Implementasi IKK" from={98} to={99} fromSuffix="%" toSuffix="%" toTone="good" showMeter />
        </PillarBlock>
        <PillarBlock>
          <KpiSimple label="Golden Time" from={68} to={59} fromSuffix="%" toSuffix="%" toTone="bad" showMeter />
        </PillarBlock>
      </PillarColumn>

      <PillarColumn
        title="Technology"
        delay={0.18}
        footer={
          <ul className="list-disc space-y-1 pl-3.5">
            {NARRATIVE.technology.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        }
      >
        <PillarBlock>
          <KpiSimple label="Leadtime Alert DMS" from={62} to={67} fromSuffix="%" toSuffix="%" toTone="good" showMeter />
        </PillarBlock>
        <PillarBlock>
          <KpiSimple
            label="Intervensi Alert DMS"
            from={72}
            to={73}
            fromSuffix="%"
            toSuffix="%"
            toTone="good"
            showMeter
          />
        </PillarBlock>
      </PillarColumn>
    </div>
  );
}
