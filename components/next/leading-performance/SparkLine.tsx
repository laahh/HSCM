"use client";

import { useInView } from "../safety-performance/useInView";

type Series = {
  label: string;
  values: number[];
  color: string;
  dashed?: boolean;
  fill?: boolean;
};

type Guide = {
  value: number;
  color: string;
};

type Props = {
  labels: string[];
  series: Series[];
  height?: number;
  showLegend?: boolean;
  endLabels?: boolean;
  guides?: Guide[];
  yMin?: number;
  yMax?: number;
};

function fmtId(n: number) {
  return n.toLocaleString("id-ID", { maximumFractionDigits: 1, minimumFractionDigits: n % 1 ? 1 : 0 });
}

export function SparkLine({
  labels,
  series,
  height = 140,
  showLegend = true,
  endLabels = true,
  guides = [],
  yMin,
  yMax,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const w = 360;
  const h = height;
  const padL = 28;
  const padR = 28;
  const padT = 22;
  const padB = 22;
  const all = [...series.flatMap((s) => s.values), ...guides.map((g) => g.value)];
  const min = yMin ?? Math.min(...all) * 0.9;
  const max = yMax ?? Math.max(...all) * 1.08;
  const sx = (i: number) => padL + (i / Math.max(1, labels.length - 1)) * (w - padL - padR);
  const sy = (v: number) => padT + (1 - (v - min) / (max - min || 1)) * (h - padT - padB);

  return (
    <div ref={ref}>
      {showLegend && (
        <div className="mb-1 flex flex-wrap gap-3 text-[9px] font-semibold text-[color:var(--ink-soft)]">
          {series.map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-0.5 w-3 rounded" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img">
        {[0, 0.5, 1].map((t) => {
          const y = padT + t * (h - padT - padB);
          return <line key={t} x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--green-line)" strokeOpacity="0.7" />;
        })}

        {guides.map((g) => (
          <line
            key={`g-${g.value}-${g.color}`}
            x1={padL}
            y1={sy(g.value)}
            x2={w - padR}
            y2={sy(g.value)}
            stroke={g.color}
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity={0.9}
          />
        ))}

        {series.map((s, si) => {
          let d = "";
          s.values.forEach((v, i) => {
            d += `${i === 0 ? "M" : "L"} ${sx(i)} ${sy(v)} `;
          });
          const last = s.values.length - 1;
          return (
            <g key={s.label}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={s.dashed ? "5 4" : undefined}
                pathLength={s.dashed ? undefined : 1}
                style={
                  s.dashed
                    ? { opacity: inView ? 1 : 0, transition: `opacity .6s ease ${0.15 + si * 0.1}s` }
                    : {
                        strokeDasharray: 1,
                        strokeDashoffset: inView ? 0 : 1,
                        transition: `stroke-dashoffset 1.1s ease-out ${si * 0.12}s`,
                      }
                }
              />
              {s.values.map((v, i) => (
                <circle
                  key={`${s.label}-${i}`}
                  cx={sx(i)}
                  cy={sy(v)}
                  r={i === last ? 3.5 : 2}
                  fill={s.color}
                  stroke="#fff"
                  strokeWidth="1.2"
                  style={{
                    opacity: inView ? 1 : 0,
                    transition: `opacity .35s ease ${0.7 + i * 0.03}s`,
                  }}
                />
              ))}
              {endLabels && (
                <text
                  x={sx(last)}
                  y={sy(s.values[last]) - 8}
                  fontSize="10"
                  fontWeight="800"
                  fill={s.color}
                  textAnchor="end"
                  opacity={inView ? 1 : 0}
                  style={{ transition: "opacity .4s ease .9s" }}
                >
                  {fmtId(s.values[last])}
                </text>
              )}
            </g>
          );
        })}

        {labels.map((l, i) =>
          i % 2 === 0 || i === labels.length - 1 ? (
            <text key={l} x={sx(i)} y={h - 6} fontSize="8" fill="var(--ink-soft)" textAnchor="middle">
              {l}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  );
}
