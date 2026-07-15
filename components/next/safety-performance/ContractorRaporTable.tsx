"use client";

import { QUAD_TABLE_DESC, SCATTER, type QuadKey, type ScatterPoint } from "./data";

const QUAD_ORDER: QuadKey[] = ["K1", "K2", "K3", "K4"];

const QUAD_TONE: Record<
  QuadKey,
  { label: string; fill: string; soft: string; text: string; border: string }
> = {
  K1: {
    label: "K1",
    fill: "#fecaca",
    soft: "#fff1f2",
    text: "#991b1b",
    border: "#f87171",
  },
  K2: {
    label: "K2",
    fill: "#fed7aa",
    soft: "#fff7ed",
    text: "#9a3412",
    border: "#fb923c",
  },
  K3: {
    label: "K3",
    fill: "#fef08a",
    soft: "#fefce8",
    text: "#854d0e",
    border: "#eab308",
  },
  K4: {
    label: "K4",
    fill: "#bbf7d0",
    soft: "#f0fdf4",
    text: "#166534",
    border: "#4ade80",
  },
};

function formatLead(n: number) {
  return `${n.toFixed(2)}%`;
}

function formatTrans(d: ScatterPoint) {
  return `${d.q1}→${d.q}`;
}

export default function ContractorRaporTable() {
  const byQuad = QUAD_ORDER.map((q) => ({
    q,
    rows: SCATTER.filter((d) => d.q === q),
    desc: QUAD_TABLE_DESC[q],
    tone: QUAD_TONE[q],
  }));

  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full table-fixed border-collapse text-left text-[10px]">
          <colgroup>
            <col className="w-[11%]" />
            <col className="w-[22%]" />
            <col className="w-[18%]" />
            <col className="w-[14%]" />
            <col className="w-[35%]" />
          </colgroup>
          <thead className="sticky top-0 z-[1]">
            <tr>
              <th className="border-b border-slate-200 bg-[#e8f5e9] px-1.5 py-1.5 font-bold text-[color:var(--ink)]">
                Kuadran
                <span className="mt-0.5 block text-[8px] font-semibold leading-tight text-slate-500">
                  Q1→Q2
                </span>
              </th>
              <th className="border-b border-slate-200 bg-[#e8f5e9] px-1.5 py-1.5 font-bold text-[color:var(--ink)]">
                Kontraktor
              </th>
              <th className="border-b border-slate-200 bg-[#dbeafe] px-1.5 py-1.5 text-center font-bold text-[#1e3a5f]">
                Lagging
              </th>
              <th className="border-b border-slate-200 bg-[#f5e6c8] px-1.5 py-1.5 text-center font-bold text-[#5c4a1f]">
                Leading
              </th>
              <th className="border-b border-slate-200 bg-[#e2e8f0] px-1.5 py-1.5 font-bold text-slate-700">
                Gap Related Causal
              </th>
            </tr>
          </thead>
          <tbody>
            {byQuad.map(({ q, rows, desc, tone }) => {
              if (rows.length === 0) {
                return (
                  <tr key={q} className="border-b border-slate-200">
                    <td
                      className="border-r border-slate-100 px-1.5 py-1.5 align-middle text-center"
                      style={{ background: tone.fill }}
                      title={desc}
                    >
                      <div className="font-black" style={{ color: tone.text }}>
                        {tone.label}
                      </div>
                    </td>
                    <td className="border-r border-slate-100 px-1.5 py-1.5 italic text-slate-400" style={{ background: tone.soft }}>
                      —
                    </td>
                    <td className="border-r border-slate-100 px-1.5 py-1.5 text-center text-slate-300">—</td>
                    <td className="border-r border-slate-100 px-1.5 py-1.5 text-center text-slate-300">—</td>
                    <td className="px-1.5 py-1.5 text-center text-slate-300">—</td>
                  </tr>
                );
              }

              return rows.map((row, i) => (
                <tr key={row.name} className="border-b border-slate-200">
                  {i === 0 ? (
                    <td
                      rowSpan={rows.length}
                      className="border-r border-slate-100 px-1.5 py-1.5 align-middle text-center"
                      style={{ background: tone.fill }}
                      title={desc}
                    >
                      <div className="font-black leading-none" style={{ color: tone.text }}>
                        {tone.label}
                      </div>
                      <div
                        className="mt-1 text-[8px] leading-tight"
                        style={{ color: tone.text, opacity: 0.8 }}
                      >
                        {desc}
                      </div>
                    </td>
                  ) : null}
                  <td
                    className="border-r border-slate-100 px-1.5 py-1 align-middle"
                    style={{ background: tone.soft }}
                  >
                    <div className="font-bold leading-tight text-[color:var(--ink)]">{row.name}</div>
                    <div className="font-mono text-[8px] text-slate-500">{formatTrans(row)}</div>
                  </td>
                  <td
                    className="border-r border-slate-100 px-1.5 py-1 text-center align-middle font-semibold leading-tight text-[color:var(--ink)]"
                    style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                  >
                    {row.inc}
                  </td>
                  <td
                    className="border-r border-slate-100 px-1.5 py-1 text-center align-middle font-heading text-[11px] font-black tabular-nums text-[color:var(--ink)]"
                    style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                  >
                    {formatLead(row.lead)}
                  </td>
                  <td
                    className="px-1.5 py-1 align-middle leading-snug text-[color:var(--ink)]"
                    style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                  >
                    {row.gapCausal.length === 0 ? (
                      <span className="text-slate-400">—</span>
                    ) : (
                      row.gapCausal.join(", ")
                    )}
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
