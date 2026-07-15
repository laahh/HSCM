"use client";

import { GAP_ITEMS, GOOD_RECORD, HIPO, STACKED } from "./data";
import { useInView } from "./useInView";
import { BradleyPyramid } from "./BradleyPyramid";

function HipoChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const w = 320;
  const h = 140;
  const padL = 28;
  const padR = 12;
  const padT = 16;
  const padB = 24;
  const max = 8;
  const sx = (i: number) => padL + (i / (HIPO.values.length - 1)) * (w - padL - padR);
  const sy = (v: number) => padT + (1 - v / max) * (h - padT - padB);
  let pathD = `M ${sx(0)} ${sy(HIPO.values[0])}`;
  HIPO.values.forEach((v, i) => {
    if (i > 0) pathD += ` L ${sx(i)} ${sy(v)}`;
  });
  const areaD = `${pathD} L ${sx(HIPO.values.length - 1)} ${h - padB} L ${sx(0)} ${h - padB} Z`;
  const last = HIPO.values.length - 1;

  return (
    <div ref={ref} className="rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[color:var(--ink)]">Tren HIPO</h3>
        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          Q1&apos;26 7,3 → Q2&apos;26 2,0
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[140px] w-full" aria-label="Tren HIPO">
        <defs>
          <linearGradient id="hipoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a1f1f" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#7a1f1f" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line x1={padL} y1={sy(v)} x2={w - padR} y2={sy(v)} stroke="#e8eee8" />
            <text x={padL - 4} y={sy(v) + 3} fontSize="8" fill="#6b7d72" textAnchor="end">
              {v}
            </text>
          </g>
        ))}
        <path d={areaD} fill="url(#hipoFill)" opacity={inView ? 1 : 0} style={{ transition: "opacity .8s ease .4s" }} />
        <path
          d={pathD}
          fill="none"
          stroke="#7a1f1f"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: "stroke-dashoffset 1.15s ease-out",
          }}
        />
        {HIPO.values.map((v, i) => (
          <g key={HIPO.labels[i]}>
            <circle
              cx={sx(i)}
              cy={sy(v)}
              r={i === last ? 5 : 3.5}
              fill={i === last ? "#16a34a" : "#7a1f1f"}
              stroke="#fff"
              strokeWidth="1.6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "scale(1)" : "scale(0)",
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: `opacity .35s ease ${0.9 + i * 0.1}s, transform .45s cubic-bezier(.34,1.56,.64,1) ${0.9 + i * 0.1}s`,
              }}
            />
            {i === last && (
              <text x={sx(i)} y={sy(v) - 10} fontSize="10" fontWeight="800" fill="#16a34a" textAnchor="middle" opacity={inView ? 1 : 0}>
                2,0
              </text>
            )}
          </g>
        ))}
        {HIPO.labels.map((l, i) => (
          <text key={l} x={sx(i)} y={h - 6} fontSize="8" fill="#6b7d72" textAnchor="middle">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

function StackedBars() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const max = 14;

  return (
    <div ref={ref} className="rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[color:var(--ink)]">Nearmiss · Fire · Property Damage</h3>
        <div className="flex flex-wrap justify-end gap-2 text-[9px]">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-slate-400" /> NM</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-600" /> Fire</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[color:var(--accent-orange)]" /> PD</span>
        </div>
      </div>
      <div className="flex h-[160px] items-end gap-2 px-1 pb-6 pt-2">
        {STACKED.labels.map((label, i) => {
          const nm = STACKED.nearmiss[i];
          const fire = STACKED.fire[i];
          const pd = STACKED.pd[i];
          const total = STACKED.totals[i];
          const pct = (v: number) => `${(v / max) * 100}%`;
          return (
            <div key={label} className="relative flex flex-1 flex-col items-center justify-end">
              <span
                className="mb-1 text-[10px] font-extrabold text-[color:var(--ink)]"
                style={{ opacity: inView ? 1 : 0, transition: `opacity .4s ease ${0.75 + i * 0.08}s` }}
              >
                {total.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
              </span>
              <div className="flex h-24 w-full max-w-[42px] flex-col-reverse overflow-hidden rounded-t-md shadow-sm">
                <div className="w-full bg-slate-400" style={{ height: inView ? pct(nm) : "0%", transition: `height .75s cubic-bezier(.34,1.56,.64,1) ${i * 0.08}s` }} />
                <div className="w-full bg-red-600" style={{ height: inView ? pct(fire) : "0%", transition: `height .75s cubic-bezier(.34,1.56,.64,1) ${0.04 + i * 0.08}s` }} />
                <div className="w-full bg-[color:var(--accent-orange)]" style={{ height: inView ? pct(pd) : "0%", transition: `height .75s cubic-bezier(.34,1.56,.64,1) ${0.08 + i * 0.08}s` }} />
              </div>
              <span className="absolute -bottom-5 whitespace-nowrap text-[8px] text-[color:var(--ink-soft)]">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PanelA() {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="sp-panel-badge">A</div>
        <div>
          <h2 className="font-heading text-base font-black leading-tight text-[color:var(--ink)] md:text-lg">
            Safety Performance All Site YTD 2026
          </h2>
          <div className="text-[11px] text-[color:var(--ink-soft)]">Piramida · HIPO · Komposisi Kejadian</div>
        </div>
      </div>

      <BradleyPyramid />

      <div className="mt-4 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        <HipoChart />
        <StackedBars />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-[color:var(--green-mid)] text-[10px] font-black text-white">+</div>
            <h4 className="text-sm font-black text-[color:var(--ink)]">Good Record</h4>
          </div>
          <ul className="space-y-1 text-[12px] text-[color:var(--ink)]">
            {GOOD_RECORD.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-[color:var(--green-mid)]">●</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-red-600 text-[10px] font-black text-white">!</div>
            <h4 className="text-sm font-black text-red-600">Gap</h4>
          </div>
          <ul className="space-y-1 text-[12px] text-[color:var(--ink)]">
            {GAP_ITEMS.map((g) => (
              <li key={g} className="flex gap-2">
                <span className="text-red-600">●</span>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
