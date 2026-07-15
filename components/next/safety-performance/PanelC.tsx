"use client";

import { ACTIVITY, COMPOSITION, INCIDENT_NOTES, TREND } from "./data";
import { useInView } from "./useInView";

function fmt(v: number) {
  return v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Vertical stacked bars — top segment first (Core / Minecont on top) */
function CompositionColumn() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const groups = [COMPOSITION.coreSupport, COMPOSITION.minecont];

  return (
    <div ref={ref} className="flex h-full flex-col gap-5">
      {groups.map((g) => (
        <div key={g.title} className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
            <h3 className="text-[11px] font-bold text-[color:var(--ink)]">{g.title}</h3>
            <div className="flex gap-2 text-[9px] text-slate-500">
              {g.legend.map((l) => (
                <span key={l.label} className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm" style={{ background: l.bg }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center gap-5 pb-1">
            {g.years.map((y, yi) => (
              <div key={y.label} className="flex w-[76px] flex-col items-center sm:w-[88px]">
                <div
                  className="mb-1 text-[13px] font-black tabular-nums text-[color:var(--ink)]"
                  style={{
                    opacity: inView ? 1 : 0,
                    transition: `opacity .4s ease ${0.35 + yi * 0.1}s`,
                  }}
                >
                  {fmt(y.total)}
                </div>
                {/* flex-col = first segment (Core/Minecont) on TOP — matches source */}
                <div className="flex h-[150px] w-[52px] flex-col overflow-hidden rounded-sm border border-slate-300 shadow-sm sm:h-[168px] sm:w-14">
                  {y.segments.map((s, si) => (
                    <div
                      key={s.key}
                      className="flex items-center justify-center text-[10px] font-bold"
                      style={{
                        height: inView ? `${s.pct}%` : "0%",
                        background: s.bg,
                        color: s.fg,
                        transition: `height .75s cubic-bezier(.34,1.56,.64,1) ${(yi * 2 + si) * 0.08}s`,
                      }}
                    >
                      {inView ? s.label : ""}
                    </div>
                  ))}
                </div>
                <div className="mt-1.5 text-center text-[9px] font-semibold leading-tight text-slate-500">
                  {y.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MiniTrend({
  title,
  band,
  blue,
  grey,
}: {
  title: string;
  band: string;
  blue: number[];
  grey: number[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const w = 340;
  const h = 132;
  const padL = 26;
  const padR = 18;
  const padT = 18;
  const padB = 22;
  const max = 7;
  const last = TREND.labels.length - 1;
  const sx = (i: number) => padL + (i / last) * (w - padL - padR);
  const sy = (v: number) => padT + (1 - v / max) * (h - padT - padB);
  const pathOf = (arr: number[]) => {
    let p = `M ${sx(0)} ${sy(arr[0])}`;
    arr.forEach((v, i) => {
      if (i > 0) p += ` L ${sx(i)} ${sy(v)}`;
    });
    return p;
  };

  const q2x = sx(last);
  const colW = (w - padL - padR) / last;

  return (
    <div ref={ref} className="flex min-h-0 flex-1 gap-1.5">
      <div
        className="flex w-7 shrink-0 items-center justify-center rounded-sm text-[10px] font-black tracking-wide text-white"
        style={{ background: band, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {title}
      </div>
      <div className="min-w-0 flex-1">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-label={`Tren ${title}`}>
          {/* Q2 highlight column */}
          <rect
            x={q2x - colW * 0.42}
            y={padT - 6}
            width={colW * 0.84}
            height={h - padT - padB + 10}
            fill="#fecaca"
            opacity={inView ? 0.55 : 0}
            rx="3"
          />

          {[0, 2, 4, 6].map((v) => (
            <line key={v} x1={padL} y1={sy(v)} x2={w - padR} y2={sy(v)} stroke="#e8eee8" />
          ))}

          {/* Grey squares series */}
          <path
            d={pathOf(grey)}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.6"
            strokeDasharray="4 3"
            strokeLinecap="round"
            style={{ opacity: inView ? 1 : 0, transition: "opacity .55s ease .15s" }}
          />
          {/* Blue triangles series */}
          <path
            d={pathOf(blue)}
            fill="none"
            stroke="#2f6fb5"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: inView ? 0 : 1,
              transition: "stroke-dashoffset 1s ease",
            }}
          />

          {blue.map((v, i) => (
            <g key={`b-${i}`} style={{ opacity: inView ? 1 : 0, transition: `opacity .3s ease ${0.45 + i * 0.05}s` }}>
              <polygon
                points={`${sx(i)},${sy(v) - 4} ${sx(i) + 4},${sy(v) + 3} ${sx(i) - 4},${sy(v) + 3}`}
                fill="#2f6fb5"
              />
              <text
                x={sx(i)}
                y={sy(v) - 7}
                fontSize="8"
                fontWeight="700"
                fill="#1e3a5f"
                textAnchor="middle"
              >
                {fmt(v)}
              </text>
            </g>
          ))}

          {grey.map((v, i) => (
            <g key={`g-${i}`} style={{ opacity: inView ? 1 : 0, transition: `opacity .3s ease ${0.5 + i * 0.05}s` }}>
              <rect x={sx(i) - 2.8} y={sy(v) - 2.8} width="5.6" height="5.6" fill="#94a3b8" />
              <text
                x={sx(i)}
                y={sy(v) + 12}
                fontSize="7.5"
                fontWeight="600"
                fill="#64748b"
                textAnchor="middle"
              >
                {fmt(v)}
              </text>
            </g>
          ))}

          {/* Q2 red box + arrow around blue point */}
          <rect
            x={q2x - 10}
            y={sy(blue[last]) - 10}
            width="20"
            height="20"
            fill="none"
            stroke="#dc2626"
            strokeWidth="2.2"
            rx="2"
            opacity={inView ? 1 : 0}
          />
          <path
            d={`M ${q2x} ${sy(blue[last]) - 20} L ${q2x - 5} ${sy(blue[last]) - 13} L ${q2x + 5} ${sy(blue[last]) - 13} Z`}
            fill="#dc2626"
            className={inView ? "sp-bounce-y" : undefined}
            opacity={inView ? 1 : 0}
          />

          {TREND.labels.map((l, i) => (
            <text key={l} x={sx(i)} y={h - 5} fontSize="8" fill="#6b7d72" textAnchor="middle">
              {l}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function TrendColumn() {
  return (
    <div className="flex h-full flex-col gap-2">
      <h3 className="text-[11px] font-bold text-[color:var(--ink)]">Tren Core &amp; Support (Q1&apos;25 → Q2&apos;26)</h3>
      <MiniTrend title="Core" band="#2f6fb5" blue={TREND.coreSolid} grey={TREND.coreDash} />
      <MiniTrend title="Support" band="#f0c419" blue={TREND.supSolid} grey={TREND.supDash} />
    </div>
  );
}

function ActivityColumn() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const maxV = 0.8;
  const barW = 28;
  const barH = (v: number) => (v <= 0 ? 0 : Math.max((v / maxV) * 70, 14));

  return (
    <div ref={ref} className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-lg border border-slate-300 bg-white">
      {/* Header */}
      <div className="grid shrink-0 grid-cols-[1.35fr_0.7fr_1.15fr] border-b border-slate-300 text-[10px] font-bold">
        <div className="bg-slate-100 px-2.5 py-2 text-[color:var(--ink)]">Activity &amp; Perusahaan Berulang</div>
        <div className="bg-slate-500 px-1 py-2 text-center text-white">AVG 2026</div>
        <div className="grid grid-cols-2 bg-sky-100 text-center text-[color:var(--ink)]">
          <div className="px-1 py-2">Q1&apos;26</div>
          <div className="px-1 py-2">Q2&apos;26</div>
        </div>
      </div>

      {/* Rows: each takes equal half of remaining height */}
      <div className="flex min-h-0 flex-1 flex-col divide-y divide-slate-300">
        {ACTIVITY.map((r, ri) => {
          const [avg, q1, q2] = r.vals;
          const hAvg = barH(avg);
          const hQ2 = barH(q2);

          return (
            <div key={r.title} className="grid min-h-0 flex-1 grid-cols-[1.35fr_0.7fr_1.15fr]">
              {/* Label — vertically centered in its half */}
              <div className="flex items-center px-2.5 py-2">
                <div>
                  <div className="text-[12px] font-bold leading-tight text-[color:var(--ink)]">{r.title}</div>
                  <div className="text-[11px] italic leading-tight text-slate-600">{r.company}</div>
                </div>
              </div>

              {/* AVG 2026 */}
              <div className="flex h-full flex-col items-center justify-end border-l border-dashed border-slate-300 bg-slate-50 px-1 pb-2.5 pt-8">
                <span className="mb-0.5 text-[11px] font-bold tabular-nums text-[color:var(--ink)]">{fmt(avg)}</span>
                <div
                  className="rounded-t-[2px]"
                  style={{
                    width: barW,
                    background: r.color,
                    height: inView ? hAvg : 0,
                    transition: `height .65s cubic-bezier(.34,1.56,.64,1) ${ri * 0.08}s`,
                  }}
                />
              </div>

              {/* Q1 + Q2 */}
              <div className="relative h-full border-l border-dashed border-slate-300 bg-sky-50/70">
                <div className="relative grid h-full grid-cols-2">
                  <div className="flex flex-col items-center justify-end pb-2.5">
                    <span className="text-[11px] font-bold tabular-nums text-slate-500">{fmt(q1)}</span>
                  </div>

                  <div className="flex flex-col items-center justify-end pb-2.5 pt-8">
                    <span className="mb-0.5 text-[11px] font-bold tabular-nums text-[color:var(--ink)]">
                      {fmt(q2)}
                    </span>
                    <div
                      className="rounded-t-[2px]"
                      style={{
                        width: barW,
                        background: r.color,
                        height: inView ? hQ2 : 0,
                        transition: `height .65s cubic-bezier(.34,1.56,.64,1) ${0.1 + ri * 0.08}s`,
                      }}
                    />
                  </div>

                  {inView && (
                    <>
                      <svg
                        className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
                        viewBox="0 0 200 140"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <path
                          d="M 50 128 L 50 16 L 150 16 L 150 42"
                          fill="none"
                          stroke="#111"
                          strokeWidth="1.5"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path d="M 146 40 L 150 48 L 154 40 Z" fill="#111" />
                      </svg>
                      <span className="pointer-events-none absolute left-1/2 top-1 z-[2] -translate-x-1/2 rounded-full border border-red-500 bg-white px-2.5 py-0.5 text-[10px] font-black leading-none text-red-600 shadow-sm">
                        +100%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-4 border-t-2 border-slate-300 px-3 py-2.5 text-[10px] text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-[#dc2626]" /> Injury
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-[#f59e0b]" /> Non Injury
        </span>
      </div>
    </div>
  );
}


function PhotosColumn() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  return (
    <div ref={ref} className="grid h-full min-h-[320px] grid-cols-2 grid-rows-2 gap-2">
      {INCIDENT_NOTES.map((item, i) => (
        <div
          key={item.src}
          className="flex min-h-0 flex-col overflow-hidden rounded-md border border-slate-300 bg-white"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: `opacity .45s ease ${i * 0.07}s, transform .45s ease ${i * 0.07}s`,
          }}
        >
          <div className="relative min-h-[88px] flex-1 bg-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <p className="shrink-0 p-1.5 text-[9px] italic leading-snug text-slate-700">{item.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default function PanelC() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="sp-panel-badge">C</div>
        <div>
          <h2 className="font-heading text-base font-black leading-tight text-[color:var(--ink)] md:text-lg">
            Profile Insiden Q2 2026
          </h2>
          <div className="text-[11px] text-[color:var(--ink-soft)]">
            Komposisi · Tren · Activity Berulang · Catatan Insiden
          </div>
        </div>
      </div>

      {/* 4 columns seperti referensi: bars | trends | activity | photos */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[0.85fr_1.2fr_1.15fr_0.95fr] xl:items-stretch xl:gap-2.5">
        <div className="min-h-[300px] rounded-lg border border-slate-100 bg-white p-2 xl:min-h-[380px]">
          <CompositionColumn />
        </div>
        <div className="min-h-[280px] rounded-lg border border-slate-100 bg-white p-2 xl:min-h-[380px]">
          <TrendColumn />
        </div>
        <div className="min-h-[260px] xl:min-h-[380px]">
          <ActivityColumn />
        </div>
        <div className="min-h-[260px] xl:min-h-[380px]">
          <PhotosColumn />
        </div>
      </div>
    </section>
  );
}
