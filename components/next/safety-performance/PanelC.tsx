"use client";

import { ACTIVITY, INCIDENT_NOTES, TREND } from "./data";
import { useInView } from "./useInView";

function CompositionBars() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const rows = [
    {
      title: "Core vs Support · AVG 2025",
      segments: [
        { label: "Core 38%", w: 38, bg: "#3b82f6", fg: "#fff" },
        { label: "Support 62%", w: 62, bg: "var(--gold)", fg: "#5a4400" },
      ],
    },
    {
      title: "Core vs Support · AVG 2026",
      segments: [
        { label: "Core 33%", w: 33, bg: "#3b82f6", fg: "#fff" },
        { label: "Support 67%", w: 67, bg: "var(--gold)", fg: "#5a4400" },
      ],
    },
    {
      title: "Minecont vs Non · AVG 2025",
      segments: [
        { label: "Minecont 54%", w: 54, bg: "#1e3a5f", fg: "#fff" },
        { label: "Non Minecont 46%", w: 46, bg: "#9ca3af", fg: "#fff" },
      ],
    },
    {
      title: "Minecont vs Non · AVG 2026",
      segments: [
        { label: "Minecont 59%", w: 59, bg: "#1e3a5f", fg: "#fff" },
        { label: "Non Minecont 41%", w: 41, bg: "#9ca3af", fg: "#fff" },
      ],
    },
  ];

  return (
    <div ref={ref} className="rounded-lg border border-[color:var(--green-line)] bg-[color:var(--paper-soft,#f5f8f5)] p-4">
      <h3 className="mb-3 text-sm font-bold text-[color:var(--ink)]">Komposisi Core vs Support</h3>
      <div className="space-y-4">
        {rows.map((row, ri) => (
          <div key={row.title}>
            <div className="mb-1.5 text-[11px] font-semibold text-[color:var(--ink-soft)]">{row.title}</div>
            <div className="flex h-7 overflow-hidden rounded border border-slate-200">
              {row.segments.map((s, si) => (
                <div
                  key={s.label}
                  className="flex items-center justify-center text-[10px] font-bold"
                  style={{
                    width: inView ? `${s.w}%` : "0%",
                    background: s.bg,
                    color: s.fg,
                    transition: `width .7s cubic-bezier(.34,1.56,.64,1) ${(ri * 2 + si) * 80}ms`,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  {inView ? s.label : ""}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const w = 320;
  const h = 200;
  const padL = 24;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const max = 7;
  const sx = (i: number) => padL + (i / (TREND.labels.length - 1)) * (w - padL - padR);
  const sy = (v: number) => padT + (1 - v / max) * (h - padT - padB);
  const pathOf = (arr: number[]) => {
    let p = `M ${sx(0)} ${sy(arr[0])}`;
    arr.forEach((v, i) => {
      if (i > 0) p += ` L ${sx(i)} ${sy(v)}`;
    });
    return p;
  };

  return (
    <div ref={ref} className="rounded-lg border border-[color:var(--green-line)] bg-[color:var(--paper-soft,#f5f8f5)] p-4">
      <h3 className="mb-1 text-sm font-bold text-[color:var(--ink)]">Tren Core & Support (Q1&apos;25 → Q2&apos;26)</h3>
      <div className="mb-1 flex gap-3 text-[10px]">
        <span className="text-sky-600">▲ Core</span>
        <span className="text-[color:var(--ink-soft)]">■ Support</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[200px] w-full" aria-label="Tren Core dan Support">
        {[0, 2, 4, 6].map((v) => (
          <line key={v} x1={padL} y1={sy(v)} x2={w - padR} y2={sy(v)} stroke="#e1e8e1" />
        ))}
        {[
          { d: pathOf(TREND.coreSolid), stroke: "#3b82f6", dash: undefined as string | undefined, w: 2 },
          { d: pathOf(TREND.coreDash), stroke: "#9ca3af", dash: "4 3", w: 1.6 },
          { d: pathOf(TREND.supDash), stroke: "#9ca3af", dash: "4 3", w: 1.6 },
          { d: pathOf(TREND.supSolid), stroke: "#3b82f6", dash: undefined, w: 2 },
        ].map((line, i) => (
          <path
            key={i}
            d={line.d}
            fill="none"
            stroke={line.stroke}
            strokeWidth={line.w}
            strokeDasharray={line.dash}
            strokeLinecap="round"
            pathLength={line.dash ? undefined : 1}
            style={
              line.dash
                ? { opacity: inView ? 1 : 0, transition: `opacity .6s ease ${0.2 + i * 0.1}s` }
                : {
                    strokeDasharray: 1,
                    strokeDashoffset: inView ? 0 : 1,
                    transition: `stroke-dashoffset 1.1s ease ${i * 0.12}s`,
                  }
            }
          />
        ))}
        <rect
          x={sx(5) - 5}
          y={sy(TREND.coreSolid[5]) - 5}
          width="10"
          height="10"
          fill="none"
          stroke="#d92b2b"
          strokeWidth="2"
          opacity={inView ? 1 : 0}
        />
        <path
          d={`M ${sx(5) + 4} ${sy(TREND.coreSolid[5]) - 10} L ${sx(5) + 8} ${sy(TREND.coreSolid[5]) - 16} L ${sx(5) + 12} ${sy(TREND.coreSolid[5]) - 10} Z`}
          fill="#d92b2b"
          className={inView ? "sp-bounce-y" : undefined}
          opacity={inView ? 1 : 0}
        />
        {TREND.labels.map((l, i) => (
          <text key={l} x={sx(i)} y={h - 6} fontSize="8" fill="#6b7d72" textAnchor="middle">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

export default function PanelC() {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  const maxV = 1;

  return (
    <section ref={ref} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="sp-panel-badge">C</div>
        <div>
          <h2 className="font-heading text-base font-black leading-tight text-[color:var(--ink)] md:text-lg">
            Profil Incident Q2 2026
          </h2>
          <div className="text-[11px] text-[color:var(--ink-soft)]">Core vs Support · Tren · Insiden Berulang</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <CompositionBars />
        <TrendChart />
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-[color:var(--green-line)]">
        <div className="flex items-center justify-between bg-[color:var(--green-deep)] px-4 py-2.5">
          <h3 className="text-sm font-bold text-white">Activity & Perusahaan Berulang</h3>
          <div className="flex gap-3 text-[10px] text-white/80">
            <span>Injury</span>
            <span>Non Injury</span>
          </div>
        </div>
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-[color:var(--paper-soft,#f5f8f5)] text-[color:var(--ink-soft)]">
              <th className="px-4 py-2 text-left font-semibold">Aktivitas / Perusahaan</th>
              <th className="w-[18%] px-4 py-2 text-center font-semibold">AVG 2026</th>
              <th className="w-[18%] px-4 py-2 text-center font-semibold">Q1&apos;26</th>
              <th className="w-[18%] px-4 py-2 text-center font-semibold">Q2&apos;26</th>
            </tr>
          </thead>
          <tbody>
            {ACTIVITY.map((r) => (
              <tr key={r.label} className="border-t border-[color:var(--green-line)]">
                <td className="px-4 py-3">
                  <div className="font-semibold text-[color:var(--ink)]">{r.label}</div>
                  <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">{r.type}</div>
                </td>
                {r.vals.map((v, i) => (
                  <td key={i} className="relative px-4 py-3 align-bottom">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-16 w-full max-w-[80px] items-end overflow-hidden rounded bg-slate-100">
                        <div
                          className="w-full rounded-t"
                          style={{
                            background: r.color,
                            height: inView ? `${(v / maxV) * 100}%` : "0%",
                            transition: `height .7s cubic-bezier(.34,1.56,.64,1) ${i * 0.2}s`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold tabular-nums text-[color:var(--ink)]">
                        {v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                      </span>
                    </div>
                    {i === 2 && inView && (
                      <div className="sp-callout-pop absolute left-1/2 top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-red-600 text-[10px] font-black text-white shadow-lg">
                        +100%
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 text-sm font-bold text-[color:var(--ink)]">Catatan Insiden Q2 2026</h3>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {INCIDENT_NOTES.map((cap, i) => (
            <div
              key={cap}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: `opacity .55s ease ${i * 0.1}s, transform .55s cubic-bezier(.34,1.56,.64,1) ${i * 0.1}s`,
              }}
            >
              <div
                className="relative flex h-28 items-center justify-center"
                style={{ background: "linear-gradient(135deg,#1a2e22,var(--green-deep))" }}
              >
                <span className="absolute left-2 top-2 rounded bg-red-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  INCIDENT
                </span>
                <span className="absolute right-2 top-2 rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  Q2&apos;26
                </span>
                <span className="font-heading text-3xl font-black text-[color:var(--lime)]/50">0{i + 1}</span>
              </div>
              <div className="p-2.5 text-[11px] font-medium leading-snug text-[color:var(--ink)]">{cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
