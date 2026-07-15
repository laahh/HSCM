"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ACTIVITY, COMPOSITION, INCIDENT_NOTES, TREND } from "./data";
import { contractorLogo } from "./contractorLogo";
import { useInView } from "./useInView";

function fmt(v: number) {
  return v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Vertical stacked bars — top segment first (Core / Minecont on top) */
function CompositionColumn({
  size = "inline",
  loop = false,
  forcePlay = false,
}: {
  size?: "inline" | "hero";
  loop?: boolean;
  forcePlay?: boolean;
}) {
  const { ref, inView: inViewRaw } = useInView<HTMLDivElement>(0.2);
  const reduceMotion = useReducedMotion();
  const inView = forcePlay || inViewRaw;
  const play = inView && !reduceMotion;
  const hero = size === "hero";
  const groups = [COMPOSITION.coreSupport, COMPOSITION.minecont];
  /** Slow pour + brief full hold + drain */
  const loopDur = 5.2;
  const repeatDelay = 0.55;
  const liquid = loop || hero;

  return (
    <div ref={ref} className={`flex h-full flex-col ${hero ? "gap-8" : "gap-5"}`}>
      {groups.map((g, gi) => (
        <div key={g.title} className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-1">
            <h3
              className={`font-bold text-[color:var(--ink)] ${
                hero ? "text-sm sm:text-base" : "text-[11px]"
              }`}
            >
              {g.title}
            </h3>
            <div className={`flex gap-2 text-slate-500 ${hero ? "text-xs" : "text-[9px]"}`}>
              {g.legend.map((l) => (
                <span key={l.label} className="inline-flex items-center gap-1">
                  <span
                    className={`rounded-sm ${hero ? "h-2.5 w-2.5" : "h-2 w-2"}`}
                    style={{ background: l.bg }}
                  />
                  {l.label}
                </span>
              ))}
            </div>
          </div>
          <div className={`flex flex-1 items-end justify-center pb-1 ${hero ? "gap-10" : "gap-5"}`}>
            {g.years.map((y, yi) => {
              const delay = gi * 0.12 + yi * 0.18;
              return (
                <div
                  key={y.label}
                  className={`flex flex-col items-center ${
                    hero ? "w-[110px] sm:w-[128px]" : "w-[76px] sm:w-[88px]"
                  }`}
                >
                  <motion.div
                    className={`mb-1 font-black tabular-nums text-[color:var(--ink)] ${
                      hero ? "text-xl sm:text-2xl" : "text-[13px]"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={
                      loop && play
                        ? { opacity: [0, 1, 1, 0.35, 0] }
                        : { opacity: inView ? 1 : 0 }
                    }
                    transition={
                      loop && play
                        ? {
                            duration: loopDur,
                            times: [0, 0.28, 0.62, 0.82, 1],
                            repeat: Infinity,
                            repeatDelay,
                            delay,
                          }
                        : { duration: 0.4, delay: 0.35 + yi * 0.1 }
                    }
                  >
                    {fmt(y.total)}
                  </motion.div>

                  {/* Vessel — liquid rises from bottom via clip-path */}
                  <div
                    className={`relative overflow-hidden rounded-sm border border-slate-300 bg-slate-100/80 shadow-inner ${
                      hero
                        ? "h-[220px] w-[72px] sm:h-[260px] sm:w-20"
                        : "h-[150px] w-[52px] sm:h-[168px] sm:w-14"
                    }`}
                  >
                    <motion.div
                      className="absolute inset-0 flex flex-col"
                      style={{ transformOrigin: "bottom center" }}
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={
                        liquid && play
                          ? loop
                            ? {
                                clipPath: [
                                  "inset(100% 0 0 0)",
                                  "inset(0% 0 0 0)",
                                  "inset(0% 0 0 0)",
                                  "inset(100% 0 0 0)",
                                ],
                              }
                            : { clipPath: "inset(0% 0 0 0)" }
                          : { clipPath: inView ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }
                      }
                      transition={
                        liquid && play && loop
                          ? {
                              duration: loopDur,
                              times: [0, 0.48, 0.68, 1],
                              ease: [0.22, 0.61, 0.36, 1],
                              repeat: Infinity,
                              repeatDelay,
                              delay,
                            }
                          : {
                              duration: reduceMotion ? 0 : hero ? 1.8 : 0.9,
                              delay: reduceMotion ? 0 : delay,
                              ease: [0.22, 0.61, 0.36, 1],
                            }
                      }
                    >
                      {y.segments.map((s) => (
                        <div
                          key={s.key}
                          className={`relative flex items-center justify-center overflow-hidden font-bold ${
                            hero ? "text-sm" : "text-[10px]"
                          }`}
                          style={{
                            height: `${s.pct}%`,
                            background: s.bg,
                            color: s.fg,
                          }}
                        >
                          {/* soft liquid shine */}
                          {liquid && (
                            <motion.span
                              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-30"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
                              }}
                              animate={
                                play
                                  ? { opacity: [0.15, 0.4, 0.15] }
                                  : { opacity: 0.25 }
                              }
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: delay + 0.3,
                              }}
                            />
                          )}
                          <span className="relative z-[1]">{(liquid ? play : inView) ? s.label : ""}</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  <div
                    className={`mt-1.5 text-center font-semibold leading-tight text-slate-500 ${
                      hero ? "text-xs" : "text-[9px]"
                    }`}
                  >
                    {y.label}
                  </div>
                </div>
              );
            })}
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
  size = "inline",
  loop = false,
  forcePlay = false,
}: {
  title: string;
  band: string;
  blue: number[];
  grey: number[];
  size?: "inline" | "hero";
  loop?: boolean;
  forcePlay?: boolean;
}) {
  const { ref, inView: inViewRaw } = useInView<HTMLDivElement>(0.2);
  const reduceMotion = useReducedMotion();
  const inView = forcePlay || inViewRaw;
  const play = inView && !reduceMotion;
  const hero = size === "hero";
  const w = hero ? 560 : 340;
  const h = hero ? 200 : 132;
  const padL = hero ? 36 : 26;
  const padR = hero ? 28 : 18;
  const padT = hero ? 28 : 18;
  const padB = hero ? 32 : 22;
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
  const loopDur = 5.0;
  const repeatDelay = 0.5;

  return (
    <div ref={ref} className="flex min-h-0 flex-1 gap-1.5">
      <div
        className={`flex shrink-0 items-center justify-center rounded-sm font-black tracking-wide text-white ${
          hero ? "w-9 text-xs sm:w-10 sm:text-sm" : "w-7 text-[10px]"
        }`}
        style={{ background: band, writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {title}
      </div>
      <div className="min-w-0 flex-1">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" aria-label={`Tren ${title}`}>
          <motion.rect
            x={q2x - colW * 0.42}
            y={padT - 6}
            width={colW * 0.84}
            height={h - padT - padB + 10}
            fill="#fecaca"
            rx="3"
            animate={
              loop && play
                ? { opacity: [0, 0.55, 0.55, 0] }
                : { opacity: inView ? 0.55 : 0 }
            }
            transition={
              loop && play
                ? { duration: loopDur, times: [0, 0.35, 0.72, 1], repeat: Infinity, repeatDelay }
                : { duration: 0.4 }
            }
          />

          {[0, 2, 4, 6].map((v) => (
            <line key={v} x1={padL} y1={sy(v)} x2={w - padR} y2={sy(v)} stroke="#e8eee8" />
          ))}

          <motion.path
            d={pathOf(grey)}
            fill="none"
            stroke="#94a3b8"
            strokeWidth={hero ? 2.2 : 1.6}
            strokeDasharray="4 3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              loop && play
                ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                : { pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }
            }
            transition={
              loop && play
                ? {
                    duration: loopDur,
                    times: [0, 0.4, 0.72, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay,
                  }
                : { duration: 1, delay: 0.15 }
            }
          />
          <motion.path
            d={pathOf(blue)}
            fill="none"
            stroke="#2f6fb5"
            strokeWidth={hero ? 3 : 2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              loop && play
                ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                : { pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0 }
            }
            transition={
              loop && play
                ? {
                    duration: loopDur,
                    times: [0, 0.42, 0.72, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay,
                  }
                : { duration: 1 }
            }
          />

          {blue.map((v, i) => {
            const appearAt = 0.06 + (i / last) * 0.36;
            return (
              <g key={`b-${i}`}>
                <motion.polygon
                  points={`${sx(i)},${sy(v) - (hero ? 6 : 4)} ${sx(i) + (hero ? 5.5 : 4)},${sy(v) + (hero ? 4 : 3)} ${sx(i) - (hero ? 5.5 : 4)},${sy(v) + (hero ? 4 : 3)}`}
                  fill="#2f6fb5"
                  animate={
                    loop && play
                      ? { opacity: [0, 1, 1, 0] }
                      : { opacity: inView ? 1 : 0 }
                  }
                  transition={
                    loop && play
                      ? {
                          duration: loopDur,
                          times: [0, appearAt, 0.72, 1],
                          repeat: Infinity,
                          repeatDelay,
                        }
                      : { duration: 0.3, delay: 0.45 + i * 0.05 }
                  }
                />
                <motion.text
                  x={sx(i)}
                  y={sy(v) - (hero ? 11 : 7)}
                  fontSize={hero ? 12 : 8}
                  fontWeight="700"
                  fill="#1e3a5f"
                  textAnchor="middle"
                  animate={
                    loop && play
                      ? { opacity: [0, 1, 1, 0] }
                      : { opacity: inView ? 1 : 0 }
                  }
                  transition={
                    loop && play
                      ? {
                          duration: loopDur,
                          times: [0, appearAt + 0.04, 0.72, 1],
                          repeat: Infinity,
                          repeatDelay,
                        }
                      : { duration: 0.3, delay: 0.45 + i * 0.05 }
                  }
                >
                  {fmt(v)}
                </motion.text>
              </g>
            );
          })}

          {grey.map((v, i) => {
            const appearAt = 0.08 + (i / last) * 0.36;
            const s = hero ? 4 : 2.8;
            return (
              <g key={`g-${i}`}>
                <motion.rect
                  x={sx(i) - s}
                  y={sy(v) - s}
                  width={s * 2}
                  height={s * 2}
                  fill="#94a3b8"
                  animate={
                    loop && play
                      ? { opacity: [0, 1, 1, 0] }
                      : { opacity: inView ? 1 : 0 }
                  }
                  transition={
                    loop && play
                      ? {
                          duration: loopDur,
                          times: [0, appearAt, 0.72, 1],
                          repeat: Infinity,
                          repeatDelay,
                        }
                      : { duration: 0.3, delay: 0.5 + i * 0.05 }
                  }
                />
                <motion.text
                  x={sx(i)}
                  y={sy(v) + (hero ? 16 : 12)}
                  fontSize={hero ? 11 : 7.5}
                  fontWeight="600"
                  fill="#64748b"
                  textAnchor="middle"
                  animate={
                    loop && play
                      ? { opacity: [0, 1, 1, 0] }
                      : { opacity: inView ? 1 : 0 }
                  }
                  transition={
                    loop && play
                      ? {
                          duration: loopDur,
                          times: [0, appearAt + 0.04, 0.72, 1],
                          repeat: Infinity,
                          repeatDelay,
                        }
                      : { duration: 0.3, delay: 0.5 + i * 0.05 }
                  }
                >
                  {fmt(v)}
                </motion.text>
              </g>
            );
          })}

          <motion.rect
            x={q2x - (hero ? 14 : 10)}
            y={sy(blue[last]) - (hero ? 14 : 10)}
            width={hero ? 28 : 20}
            height={hero ? 28 : 20}
            fill="none"
            stroke="#dc2626"
            strokeWidth={hero ? 3 : 2.2}
            rx="2"
            animate={
              loop && play
                ? { opacity: [0, 0, 1, 1, 0] }
                : { opacity: inView ? 1 : 0 }
            }
            transition={
              loop && play
                ? {
                    duration: loopDur,
                    times: [0, 0.38, 0.45, 0.72, 1],
                    repeat: Infinity,
                    repeatDelay,
                  }
                : { duration: 0.35, delay: 0.9 }
            }
          />
          <motion.path
            d={`M ${q2x} ${sy(blue[last]) - (hero ? 28 : 20)} L ${q2x - (hero ? 7 : 5)} ${sy(blue[last]) - (hero ? 18 : 13)} L ${q2x + (hero ? 7 : 5)} ${sy(blue[last]) - (hero ? 18 : 13)} Z`}
            fill="#dc2626"
            animate={
              loop && play
                ? { opacity: [0, 0, 1, 1, 0], y: [0, 0, -2, 0, 0] }
                : inView
                  ? { opacity: 1, y: [0, -3, 0] }
                  : { opacity: 0 }
            }
            transition={
              loop && play
                ? {
                    opacity: {
                      duration: loopDur,
                      times: [0, 0.38, 0.45, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay,
                    },
                    y: { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.45 },
                  }
                : inView
                  ? { opacity: { duration: 0.3 }, y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
                  : { duration: 0.3 }
            }
          />

          {TREND.labels.map((l, i) => (
            <text
              key={l}
              x={sx(i)}
              y={h - (hero ? 8 : 5)}
              fontSize={hero ? 12 : 8}
              fontWeight={i === last ? 700 : 400}
              fill={i === last ? "#dc2626" : "#6b7d72"}
              textAnchor="middle"
            >
              {l}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function TrendColumn({
  size = "inline",
  loop = false,
  forcePlay = false,
}: {
  size?: "inline" | "hero";
  loop?: boolean;
  forcePlay?: boolean;
}) {
  const hero = size === "hero";
  return (
    <div className={`flex h-full flex-col ${hero ? "gap-4" : "gap-2"}`}>
      <h3
        className={`font-bold text-[color:var(--ink)] ${
          hero ? "text-sm sm:text-base" : "text-[11px]"
        }`}
      >
        Tren Core &amp; Support (Q1&apos;25 → Q2&apos;26)
      </h3>
      <MiniTrend
        title="Core"
        band="#2f6fb5"
        blue={TREND.coreSolid}
        grey={TREND.coreDash}
        size={size}
        loop={loop}
        forcePlay={forcePlay}
      />
      <MiniTrend
        title="Support"
        band="#f0c419"
        blue={TREND.supSolid}
        grey={TREND.supDash}
        size={size}
        loop={loop}
        forcePlay={forcePlay}
      />
    </div>
  );
}

function ActivityColumn({ loop = false }: { loop?: boolean }) {
  const { ref, inView: inViewRaw } = useInView<HTMLDivElement>(0.15);
  const reduceMotion = useReducedMotion();
  const inView = inViewRaw;
  const play = inView && !reduceMotion && loop;
  const maxV = 0.8;
  const barW = 28;
  const barH = (v: number) => (v <= 0 ? 0 : Math.max((v / maxV) * 70, 14));
  const loopDur = 3.8;
  const repeatDelay = 0.4;

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
              <div className="flex items-center gap-2 px-2.5 py-2">
                {contractorLogo(r.company) && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full border border-slate-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={contractorLogo(r.company)!}
                      alt=""
                      className="h-full w-full object-contain p-[2px]"
                    />
                  </span>
                )}
                <div>
                  <div className="text-[12px] font-bold leading-tight text-[color:var(--ink)]">{r.title}</div>
                  <div className="text-[11px] italic leading-tight text-slate-600">{r.company}</div>
                </div>
              </div>

              <div className="flex h-full flex-col items-center justify-end border-l border-dashed border-slate-300 bg-slate-50 px-1 pb-2.5 pt-8">
                <span className="mb-0.5 text-[11px] font-bold tabular-nums text-[color:var(--ink)]">{fmt(avg)}</span>
                <motion.div
                  className="rounded-t-[2px]"
                  style={{ width: barW, background: r.color }}
                  initial={{ height: 0 }}
                  animate={
                    play
                      ? { height: [0, hAvg, hAvg, 0] }
                      : { height: inView ? hAvg : 0 }
                  }
                  transition={
                    play
                      ? {
                          duration: loopDur,
                          times: [0, 0.35, 0.7, 1],
                          ease: "easeInOut",
                          repeat: Infinity,
                          repeatDelay,
                          delay: ri * 0.12,
                        }
                      : { duration: 0.65, delay: ri * 0.08, ease: [0.34, 1.56, 0.64, 1] }
                  }
                />
              </div>

              <div className="relative h-full border-l border-dashed border-slate-300 bg-sky-50/70">
                <div className="relative grid h-full grid-cols-2">
                  <div className="flex flex-col items-center justify-end pb-2.5">
                    <span className="text-[11px] font-bold tabular-nums text-slate-500">{fmt(q1)}</span>
                  </div>

                  <div className="flex flex-col items-center justify-end pb-2.5 pt-8">
                    <span className="mb-0.5 text-[11px] font-bold tabular-nums text-[color:var(--ink)]">
                      {fmt(q2)}
                    </span>
                    <motion.div
                      className="rounded-t-[2px]"
                      style={{ width: barW, background: r.color }}
                      initial={{ height: 0 }}
                      animate={
                        play
                          ? { height: [0, hQ2, hQ2, 0] }
                          : { height: inView ? hQ2 : 0 }
                      }
                      transition={
                        play
                          ? {
                              duration: loopDur,
                              times: [0, 0.38, 0.72, 1],
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay,
                              delay: 0.1 + ri * 0.12,
                            }
                          : {
                              duration: 0.65,
                              delay: 0.1 + ri * 0.08,
                              ease: [0.34, 1.56, 0.64, 1],
                            }
                      }
                    />
                  </div>

                  {(play || inView) && (
                    <>
                      <motion.svg
                        className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
                        viewBox="0 0 200 140"
                        preserveAspectRatio="none"
                        aria-hidden
                        animate={
                          play
                            ? { opacity: [0, 1, 1, 0] }
                            : { opacity: 1 }
                        }
                        transition={
                          play
                            ? {
                                duration: loopDur,
                                times: [0, 0.3, 0.72, 1],
                                repeat: Infinity,
                                repeatDelay,
                              }
                            : undefined
                        }
                      >
                        <path
                          d="M 50 128 L 50 16 L 150 16 L 150 42"
                          fill="none"
                          stroke="#111"
                          strokeWidth="1.5"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path d="M 146 40 L 150 48 L 154 40 Z" fill="#111" />
                      </motion.svg>
                      <motion.span
                        className="pointer-events-none absolute left-1/2 top-1 z-[2] -translate-x-1/2 rounded-full border border-red-500 bg-white px-2.5 py-0.5 text-[10px] font-black leading-none text-red-600 shadow-sm"
                        animate={
                          play
                            ? { opacity: [0, 1, 1, 0], scale: [0.92, 1.05, 1, 0.92] }
                            : { opacity: 1, scale: 1 }
                        }
                        transition={
                          play
                            ? {
                                duration: loopDur,
                                times: [0, 0.32, 0.72, 1],
                                repeat: Infinity,
                                repeatDelay,
                              }
                            : undefined
                        }
                      >
                        +100%
                      </motion.span>
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


function PhotosColumn({
  onExpand,
  loop = false,
}: {
  onExpand: () => void;
  loop?: boolean;
}) {
  const { ref, inView } = useInView<HTMLButtonElement>(0.12);
  const reduceMotion = useReducedMotion();
  const play = inView && !reduceMotion && loop;
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = window.setInterval(() => {
      setFocus((f) => (f + 1) % INCIDENT_NOTES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [play]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onExpand}
      className="group relative grid h-full min-h-[320px] w-full cursor-pointer grid-cols-2 grid-rows-2 gap-2 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
      aria-label="Perbesar Profile Insiden Q2 2026"
    >
      {INCIDENT_NOTES.map((item, i) => {
        const active = play && focus === i;
        return (
          <motion.div
            key={item.src}
            className="flex min-h-0 flex-col overflow-hidden rounded-md border border-slate-300 bg-white transition group-hover:border-slate-400"
            initial={{ opacity: 0, y: 8 }}
            animate={
              inView
                ? {
                    opacity: play ? (active ? 1 : 0.72) : 1,
                    y: 0,
                    scale: active ? 1.02 : 1,
                    borderColor: active ? "rgba(220,38,38,0.45)" : "rgba(203,213,225,1)",
                  }
                : { opacity: 0, y: 8 }
            }
            transition={{
              opacity: { delay: i * 0.07, duration: 0.45 },
              y: { delay: i * 0.07, duration: 0.45 },
              scale: { type: "spring", stiffness: 280, damping: 20 },
            }}
          >
            <div className="relative min-h-[88px] flex-1 overflow-hidden bg-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 h-full w-full object-cover"
                animate={
                  play && active
                    ? { scale: [1.02, 1.08, 1.02] }
                    : { scale: 1 }
                }
                transition={
                  play && active
                    ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.4 }
                }
              />
            </div>
            <p className="shrink-0 p-1.5 text-[9px] italic leading-snug text-slate-700">{item.caption}</p>
          </motion.div>
        );
      })}
      <span className="pointer-events-none absolute bottom-2 right-2 z-[2] rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
        Perbesar
      </span>
    </button>
  );
}

const photoEase = [0.22, 1, 0.36, 1] as const;

function IncidentProfileModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [focus, setFocus] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setAnimKey((k) => k + 1);
    setFocus(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  /** Loop spotlight across cards */
  useEffect(() => {
    if (!open || reduceMotion) return;
    const id = window.setInterval(() => {
      setFocus((f) => (f + 1) % INCIDENT_NOTES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [open, reduceMotion, animKey]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Tutup modal"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="incident-modal-title"
            className="relative z-[1] flex max-h-[min(96vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="incident-modal-title"
                  className="font-heading text-lg font-black text-[color:var(--ink)] sm:text-xl"
                >
                  Profile Insiden Q2 2026
                </h2>
                <p className="mt-0.5 text-xs text-[color:var(--ink-soft)] sm:text-sm">
                  Catatan visual insiden — {INCIDENT_NOTES.length} kasus
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Tutup"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M4 4l8 8M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto px-4 py-5 sm:px-7 sm:py-6">
              <div
                key={animKey}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
              >
                {INCIDENT_NOTES.map((item, i) => {
                  const active = focus === i;
                  return (
                    <motion.article
                      key={item.src}
                      className="relative overflow-hidden rounded-2xl border bg-white shadow-sm"
                      style={{
                        borderColor: active ? "rgba(220,38,38,0.55)" : "rgba(226,232,240,1)",
                      }}
                      initial={
                        reduceMotion
                          ? { opacity: 1, y: 0, scale: 1 }
                          : { opacity: 0, y: 36, scale: 0.92, rotate: i % 2 === 0 ? -2 : 2 }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: active && !reduceMotion ? 1.02 : 1,
                        rotate: 0,
                        boxShadow: active
                          ? "0 12px 28px rgba(185,28,28,0.18)"
                          : "0 1px 3px rgba(15,23,42,0.06)",
                      }}
                      transition={{
                        delay: reduceMotion ? 0 : 0.12 + i * 0.14,
                        duration: 0.55,
                        ease: photoEase,
                        scale: { type: "spring", stiffness: 260, damping: 18 },
                      }}
                      onMouseEnter={() => setFocus(i)}
                    >
                      <div className="relative aspect-[16/11] overflow-hidden bg-slate-200">
                        <motion.img
                          src={item.src}
                          alt={item.alt}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={reduceMotion ? false : { scale: 1.18 }}
                          animate={{
                            scale: active && !reduceMotion ? [1.05, 1.12, 1.05] : 1,
                          }}
                          transition={
                            active && !reduceMotion
                              ? { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                              : { duration: 0.8, delay: 0.2 + i * 0.14, ease: photoEase }
                          }
                        />
                        <motion.div
                          className="absolute left-3 top-3 rounded-full bg-slate-950/75 px-2.5 py-1 text-[10px] font-black tracking-wide text-white"
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: reduceMotion ? 0 : 0.35 + i * 0.14 }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.div>
                        {active && (
                          <motion.div
                            className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-red-500/70"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.35, 0.85, 0.35] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                      </div>
                      <motion.div
                        className="border-t border-slate-100 bg-gradient-to-b from-white to-slate-50 px-4 py-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: reduceMotion ? 0 : 0.4 + i * 0.14, duration: 0.4 }}
                      >
                        <div className="text-[10px] font-bold uppercase tracking-wider text-red-700/80">
                          {item.alt}
                        </div>
                        <p className="mt-1 text-sm font-medium leading-snug text-[color:var(--ink)] sm:text-[15px]">
                          {item.caption}
                        </p>
                      </motion.div>
                    </motion.article>
                  );
                })}
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 sm:px-7">
              <span className="text-[11px] text-slate-400">
                Tekan Esc atau klik luar untuk menutup
              </span>
              <button
                type="button"
                onClick={() => setAnimKey((k) => k + 1)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Putar ulang animasi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function CompTrendModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setAnimKey((k) => k + 1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            type="button"
            aria-label="Tutup modal"
            className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="comp-trend-modal-title"
            className="relative z-[1] flex max-h-[min(96vh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="comp-trend-modal-title"
                  className="font-heading text-lg font-black text-[color:var(--ink)] sm:text-xl"
                >
                  Komposisi & Tren Insiden
                </h2>
                <p className="mt-0.5 text-xs text-[color:var(--ink-soft)] sm:text-sm">
                  Core vs Support · Minecont · Tren Q1&apos;25 → Q2&apos;26
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Tutup"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M4 4l8 8M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto px-4 py-5 sm:px-7 sm:py-6">
              <div
                key={animKey}
                className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.35fr] lg:items-stretch lg:gap-6"
              >
                <div className="rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-4 sm:p-5">
                  <CompositionColumn size="hero" loop forcePlay />
                </div>
                <div className="min-h-[420px] rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-4 sm:min-h-[480px] sm:p-5">
                  <TrendColumn size="hero" loop forcePlay />
                </div>
              </div>
              <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-relaxed text-[color:var(--ink)] sm:text-[13px]">
                Peningkatan{" "}
                <strong className="font-semibold text-red-600">11% insiden</strong> pada Mitra Kerja
                Mine Contractor baik pada Aktivitas Core &amp; Support. Terdapat perulangan kontak
                kejadian pada Aktivitas Support seperti di Area Pit Service dan perulangan kejadian
                berakibat Injury pada aktivitas Maintenance.
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 sm:px-7">
              <span className="text-[11px] text-slate-400">
                Tekan Esc atau klik luar untuk menutup
              </span>
              <button
                type="button"
                onClick={() => setAnimKey((k) => k + 1)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                Putar ulang animasi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function PanelC() {
  const [photoOpen, setPhotoOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
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
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setChartOpen(true)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Perbesar chart
          </button>
          <button
            type="button"
            onClick={() => setPhotoOpen(true)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Perbesar foto
          </button>
        </div>
      </div>

      {/* 4 columns seperti referensi: bars | trends | activity | photos */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[0.85fr_1.2fr_1.15fr_0.95fr] xl:items-stretch xl:gap-2.5">
        <button
          type="button"
          onClick={() => setChartOpen(true)}
          className="group relative min-h-[300px] cursor-pointer rounded-lg border border-slate-100 bg-white p-2 text-left outline-none transition hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-emerald-600/40 xl:min-h-[380px]"
          aria-label="Perbesar komposisi Core Support"
        >
          <CompositionColumn loop={!chartOpen} />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
            Perbesar
          </span>
        </button>
        <button
          type="button"
          onClick={() => setChartOpen(true)}
          className="group relative min-h-[280px] cursor-pointer rounded-lg border border-slate-100 bg-white p-2 text-left outline-none transition hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-emerald-600/40 xl:min-h-[380px]"
          aria-label="Perbesar tren Core Support"
        >
          <TrendColumn loop={!chartOpen} />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
            Perbesar
          </span>
        </button>
        <div className="min-h-[260px] xl:min-h-[380px]">
          <ActivityColumn loop={!chartOpen && !photoOpen} />
        </div>
        <div className="min-h-[260px] xl:min-h-[380px]">
          <PhotosColumn onExpand={() => setPhotoOpen(true)} loop={!photoOpen} />
        </div>
      </div>

      <p className="mt-4 border-t border-slate-100 pt-3 text-[12px] leading-relaxed text-[color:var(--ink)] md:text-[13px]">
        Peningkatan{" "}
        <strong className="font-semibold text-red-600">11% insiden</strong> pada Mitra Kerja Mine
        Contractor baik pada Aktivitas Core &amp; Support. Terdapat perulangan kontak kejadian pada
        Aktivitas Support seperti di Area Pit Service dan perulangan kejadian berakibat Injury pada
        aktivitas Maintenance.
      </p>

      <IncidentProfileModal open={photoOpen} onClose={() => setPhotoOpen(false)} />
      <CompTrendModal open={chartOpen} onClose={() => setChartOpen(false)} />
    </section>
  );
}
