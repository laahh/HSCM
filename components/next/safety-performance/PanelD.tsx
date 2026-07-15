"use client";

import { FIT_TO_WORK, FIT_TO_WORK_KPIS } from "./data";

export default function PanelD() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="sp-panel-badge">D</div>
        <div>
          <h2 className="font-heading text-sm font-black leading-tight text-[color:var(--ink)] md:text-base">
            Health Management Q2 2026
          </h2>
          <div className="text-[10px] text-[color:var(--ink-soft)]">Fit to Work · Hasil MCU</div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-3 text-center">
          <h3 className="font-heading text-base font-black italic text-[color:var(--ink)] md:text-lg">
            Fit to Work hasil MCU
          </h3>
          <p className="text-[11px] italic text-slate-500">(berdasarkan hasil MCU 2025 – 2026)</p>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="font-heading text-3xl font-black tabular-nums leading-none text-red-600 md:text-4xl">
              {FIT_TO_WORK_KPIS.penurunan}%
            </div>
            <div className="mt-1.5 inline-block border-b border-slate-300 pb-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
              {FIT_TO_WORK_KPIS.penurunanLabel}
            </div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-black tabular-nums leading-none text-emerald-600 md:text-4xl">
              {FIT_TO_WORK_KPIS.peningkatan}%
            </div>
            <div className="mt-1.5 inline-block border-b border-slate-300 pb-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
              {FIT_TO_WORK_KPIS.peningkatanLabel}
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-md border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-center text-[12px]">
              <thead>
                <tr className="bg-[#1e4a7a] text-white">
                  <th className="px-2 py-1.5 font-bold">Perusahaan</th>
                  <th className="px-2 py-1.5 font-bold underline underline-offset-2">Rasio Kelayakan Kerja</th>
                  <th className="px-2 py-1.5 font-bold">MFR</th>
                  <th className="px-2 py-1.5 font-bold">ASR</th>
                </tr>
              </thead>
              <tbody>
                {FIT_TO_WORK.map((row) => (
                  <tr key={row.company} className="border-t border-slate-200">
                    <td className="bg-[#c8e6c9] px-2 py-1 font-semibold text-[color:var(--ink)]">
                      {row.company}
                    </td>
                    <td className={`px-2 py-1 tabular-nums ${row.gap.rasio ? "bg-[#f8d5c2]" : "bg-white"}`}>
                      {row.rasio}
                    </td>
                    <td className={`px-2 py-1 tabular-nums ${row.gap.mfr ? "bg-[#f8d5c2]" : "bg-white"}`}>
                      {row.mfr}
                    </td>
                    <td className={`px-2 py-1 tabular-nums ${row.gap.asr ? "bg-[#f8d5c2]" : "bg-white"}`}>
                      {row.asr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[11px] italic text-slate-500">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm border border-[#e8b89a] bg-[#f8d5c2]" />
          Gap penurunan / peningkatan dibandingkan Q1 2026
        </div>
      </div>
    </section>
  );
}
