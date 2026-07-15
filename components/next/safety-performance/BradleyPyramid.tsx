"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { PYRAMID } from "./data";
import { useInView } from "./useInView";

/** Continuous left slope from a single apex — Fatality is a true sharp triangle. */
const TIP_H = 52;
const ROW_H = 30;
const PYR_W = 300;
const RIGHT = PYR_W;
/** Bottom-left inset (0 = full width). Slight inset keeps the last tier tidy. */
const BOTTOM_INSET = 4;

const easeOut = [0.22, 1, 0.36, 1] as const;

function ValueCell({
  value,
  color,
  emphasize,
}: {
  value: string;
  color: string;
  emphasize?: boolean;
}) {
  const empty = value === "–" || value === "-" || value === "";
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {!empty && (
        <span className="h-4 w-[3px] shrink-0 rounded-[1px]" style={{ background: color }} aria-hidden />
      )}
      <span
        className={`truncate tabular-nums text-[11px] font-semibold leading-none ${
          emphasize ? "font-black text-red-600" : empty ? "text-transparent" : "text-slate-800"
        }`}
      >
        {empty ? "–" : value}
      </span>
    </div>
  );
}

/** Vertical brace with ↔ arrows (as in PPT). */
function CategoryBrace({
  label,
  y,
  h,
  x = 8,
  delay = 0,
  play,
  reduceMotion,
}: {
  label: string;
  y: number;
  h: number;
  x?: number;
  delay?: number;
  play: boolean;
  reduceMotion: boolean | null;
}) {
  const mid = y + h / 2;
  const instant = !!reduceMotion;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={play ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: instant ? 0 : delay, duration: instant ? 0 : 0.4 }}
    >
      <motion.line
        x1={x}
        y1={y + 2}
        x2={x}
        y2={y + h - 2}
        stroke="#64748b"
        strokeWidth="1.25"
        initial={{ pathLength: 0 }}
        animate={play ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ delay: instant ? 0 : delay, duration: instant ? 0 : 0.55, ease: easeOut }}
      />
      <motion.path
        d={`M${x - 3.5} ${y + 6} L${x} ${y + 2} L${x + 3.5} ${y + 6}`}
        fill="none"
        stroke="#64748b"
        strokeWidth="1.25"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: instant ? 0 : delay + 0.35, duration: 0.25 }}
      />
      <motion.path
        d={`M${x - 3.5} ${y + h - 6} L${x} ${y + h - 2} L${x + 3.5} ${y + h - 6}`}
        fill="none"
        stroke="#64748b"
        strokeWidth="1.25"
        strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: instant ? 0 : delay + 0.35, duration: 0.25 }}
      />
      <motion.text
        x={x + 10}
        y={mid}
        fill="#475569"
        fontSize="9"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90 ${x + 10} ${mid})`}
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: instant ? 0 : delay + 0.4, duration: 0.3 }}
      >
        {label}
      </motion.text>
    </motion.g>
  );
}

export function BradleyPyramid() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const reduceMotion = useReducedMotion();
  const [built, setBuilt] = useState(false);
  const uid = useId().replace(/:/g, "");
  const n = PYRAMID.length;
  const totalH = TIP_H + (n - 1) * ROW_H;
  const braceW = 56;
  const play = inView && !reduceMotion;
  const playStatic = inView;

  const rowTop = (i: number) => (i === 0 ? 0 : TIP_H + (i - 1) * ROW_H);
  const rowBottom = (i: number) => (i === 0 ? TIP_H : TIP_H + i * ROW_H);
  /** Left edge of the pyramid at height y — apex at (RIGHT, 0), continuous hypoteneuse. */
  const leftX = (y: number) => RIGHT - (RIGHT - BOTTOM_INSET) * (y / totalH);

  // Build finishes ~ after last tier stagger
  useEffect(() => {
    if (!inView || built) return;
    const buildMs = reduceMotion ? 0 : 180 + n * 70 + 400;
    const t = window.setTimeout(() => setBuilt(true), buildMs);
    return () => window.clearTimeout(t);
  }, [inView, built, n, reduceMotion]);

  return (
    <div ref={ref} className="min-w-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[color:var(--ink)]">Piramida Bradley Curve</h3>
        <span className="text-[10px] text-[color:var(--ink-soft)]">
          Asimetris · Highlight MTI / Fire Case / Property Damage
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[760px] gap-2 sm:min-w-0">
          <motion.div
            className="relative w-5 shrink-0 sm:w-6"
            style={{ height: totalH + 22 }}
            initial={{ opacity: 0 }}
            animate={playStatic ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.15, duration: 0.5 }}
          >
            <span className="absolute left-1/2 top-6 bottom-4 -translate-x-1/2 rotate-180 text-center text-[8px] font-bold leading-tight text-red-600 [writing-mode:vertical-rl] sm:text-[9px]">
              Injury Need To Be Prevented (Top Of Pyramid)
            </span>
          </motion.div>

          <div className="min-w-0 flex-1">
            <div
              className="mb-1 grid items-end gap-0 text-[9px] font-bold uppercase tracking-wide text-slate-500"
              style={{ gridTemplateColumns: `${PYR_W}px ${braceW}px minmax(0,1fr)` }}
            >
              <div />
              <div />
              <motion.div
                className="grid grid-cols-3 pl-1 text-left"
                initial={{ opacity: 0, y: -4 }}
                animate={playStatic ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
              >
                <span>2025</span>
                <span>Q1 2026</span>
                <span>Q2 2026</span>
              </motion.div>
            </div>

            <div
              className="relative grid gap-0"
              style={{ gridTemplateColumns: `${PYR_W}px ${braceW}px minmax(0,1fr)` }}
            >
              <svg
                viewBox={`0 -2 ${PYR_W + 2} ${totalH + 2}`}
                width={PYR_W}
                height={totalH}
                className="overflow-visible"
                role="img"
                aria-label="Piramida Bradley Curve asimetris"
              >
                <defs>
                  <filter id={`${uid}-soft`} x="-8%" y="-8%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="0.5" stdDeviation="0.4" floodOpacity="0.15" />
                  </filter>
                </defs>

                {PYRAMID.map((d, i) => {
                  const y0 = rowTop(i);
                  const y1 = rowBottom(i);
                  const isFatality = i === 0;
                  // Build from base → tip
                  const delay = reduceMotion ? 0 : (n - 1 - i) * 0.07;

                  const xL0 = leftX(y0);
                  const xL1 = leftX(y1);

                  const poly = isFatality
                    ? `${RIGHT},${y0} ${RIGHT},${y1} ${xL1},${y1}`
                    : `${xL0},${y0} ${RIGHT},${y0} ${RIGHT},${y1} ${xL1},${y1}`;

                  let cx: number;
                  let cy: number;
                  let textAngle = 0;

                  if (isFatality) {
                    const mx = (RIGHT + xL1) / 2;
                    const my = (y0 + y1) / 2;
                    const dx = xL1 - RIGHT;
                    const dy = y1 - y0;
                    const nx = dy;
                    const ny = -dx;
                    const len = Math.hypot(nx, ny) || 1;
                    cx = mx + (nx / len) * 8;
                    cy = my + (ny / len) * 8;
                    textAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                  } else {
                    cx = (Math.min(xL0, xL1) + RIGHT) / 2;
                    cy = y0 + (y1 - y0) / 2;
                  }

                  const originX = RIGHT;
                  const originY = (y0 + y1) / 2;

                  return (
                    <motion.g
                      key={d.label}
                      style={{ transformOrigin: `${originX}px ${originY}px` }}
                      initial={
                        reduceMotion
                          ? { opacity: 1, scaleX: 1, y: 0 }
                          : { opacity: 0, scaleX: 0.12, y: 10 }
                      }
                      animate={
                        playStatic
                          ? built && play && d.concern
                            ? { opacity: 1, scaleX: 1, y: [0, -1.5, 0] }
                            : { opacity: 1, scaleX: 1, y: 0 }
                          : { opacity: 0, scaleX: 0.12, y: 10 }
                      }
                      transition={
                        built && play && d.concern
                          ? {
                              opacity: { duration: 0.45, delay, ease: easeOut },
                              scaleX: { duration: 0.55, delay, ease: easeOut },
                              y: {
                                duration: 2.8 + (i % 3) * 0.25,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.9 + i * 0.08,
                              },
                            }
                          : {
                              duration: reduceMotion ? 0 : 0.55,
                              delay,
                              ease: easeOut,
                            }
                      }
                    >
                      <motion.polygon
                        points={poly}
                        fill={d.color}
                        filter={isFatality ? undefined : `url(#${uid}-soft)`}
                        shapeRendering={isFatality ? "geometricPrecision" : undefined}
                        animate={
                          built && play
                            ? d.concern
                              ? { opacity: [0.92, 1, 0.92] }
                              : isFatality
                                ? { opacity: [1, 0.88, 1] }
                                : { opacity: 1 }
                            : { opacity: 1 }
                        }
                        transition={
                          built && play && (d.concern || isFatality)
                            ? {
                                duration: d.concern ? 2.4 : 3.6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.12,
                              }
                            : undefined
                        }
                      />
                      <motion.text
                        x={cx}
                        y={cy}
                        fill="#fff"
                        fontSize={isFatality ? 9 : i >= 9 ? 9 : 10}
                        fontWeight="800"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={isFatality ? `rotate(${textAngle} ${cx} ${cy})` : undefined}
                        style={{
                          paintOrder: "stroke",
                          stroke: "rgba(0,0,0,0.18)",
                          strokeWidth: 0.7,
                          pointerEvents: "none",
                        }}
                        initial={{ opacity: 0 }}
                        animate={playStatic ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : delay + 0.28,
                          duration: 0.3,
                        }}
                      >
                        {d.label}
                      </motion.text>
                    </motion.g>
                  );
                })}
              </svg>

              <svg viewBox={`0 0 ${braceW} ${totalH}`} width={braceW} height={totalH} aria-hidden>
                <CategoryBrace
                  label="Accident"
                  y={0}
                  h={TIP_H + 6 * ROW_H}
                  x={14}
                  delay={0.55}
                  play={playStatic}
                  reduceMotion={reduceMotion}
                />
                <CategoryBrace
                  label="Incident"
                  y={TIP_H + 2 * ROW_H}
                  h={4 * ROW_H}
                  x={30}
                  delay={0.7}
                  play={playStatic}
                  reduceMotion={reduceMotion}
                />
                <CategoryBrace
                  label="Pelanggaran"
                  y={TIP_H + 6 * ROW_H}
                  h={2 * ROW_H}
                  x={14}
                  delay={0.85}
                  play={playStatic}
                  reduceMotion={reduceMotion}
                />
                <CategoryBrace
                  label="Ketidaksesuaian"
                  y={TIP_H + 8 * ROW_H}
                  h={2 * ROW_H}
                  x={14}
                  delay={1.0}
                  play={playStatic}
                  reduceMotion={reduceMotion}
                />
              </svg>

              <div className="relative flex flex-col">
                {PYRAMID.map((d, i) => (
                  <motion.div
                    key={`v-${d.label}`}
                    className="relative grid grid-cols-3 items-center pl-2"
                    style={{ height: i === 0 ? TIP_H : ROW_H }}
                    initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                    animate={playStatic ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.35 + (n - 1 - i) * 0.05,
                      duration: 0.4,
                      ease: easeOut,
                    }}
                  >
                    <ValueCell value={d.v25} color={d.color} />
                    <ValueCell value={d.vq1} color={d.color} emphasize={d.redQ1} />
                    <ValueCell value={d.vq2} color={d.color} emphasize={d.redQ2 || d.redText} />
                  </motion.div>
                ))}
              </div>

              {PYRAMID.map((d, i) => {
                if (!d.concern) return null;
                return (
                  <motion.div
                    key={`box-${d.label}`}
                    className="pointer-events-none absolute z-[5] border-[2.5px] border-red-500"
                    style={{
                      top: rowTop(i),
                      left: 0,
                      height: rowBottom(i) - rowTop(i),
                      right: 0,
                    }}
                    initial={{ opacity: 0, scaleX: 0.92 }}
                    animate={
                      playStatic
                        ? built && play
                          ? { opacity: [0.55, 1, 0.55], scaleX: 1 }
                          : { opacity: 1, scaleX: 1 }
                        : { opacity: 0, scaleX: 0.92 }
                    }
                    transition={
                      built && play
                        ? {
                            opacity: {
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 0.2 + i * 0.1,
                            },
                            scaleX: { duration: 0.4, delay: 0.75 + i * 0.06, ease: easeOut },
                          }
                        : { delay: 0.75 + i * 0.06, duration: 0.35 }
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
