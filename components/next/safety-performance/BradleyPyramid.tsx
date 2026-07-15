"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { PYRAMID } from "./data";
import { useInView } from "./useInView";

const easeOut = [0.22, 1, 0.36, 1] as const;

type PyramidSize = "inline" | "hero";

const SIZE: Record<
  PyramidSize,
  { tipH: number; rowH: number; pyrW: number; braceW: number; bottomInset: number }
> = {
  inline: { tipH: 52, rowH: 30, pyrW: 300, braceW: 56, bottomInset: 4 },
  hero: { tipH: 78, rowH: 44, pyrW: 440, braceW: 72, bottomInset: 6 },
};

function ValueCell({
  value,
  color,
  emphasize,
  large,
}: {
  value: string;
  color: string;
  emphasize?: boolean;
  large?: boolean;
}) {
  const empty = value === "–" || value === "-" || value === "";
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {!empty && (
        <span
          className={`shrink-0 rounded-[1px] ${large ? "h-5 w-1" : "h-4 w-[3px]"}`}
          style={{ background: color }}
          aria-hidden
        />
      )}
      <span
        className={`truncate tabular-nums font-semibold leading-none ${
          large ? "text-sm md:text-base" : "text-[11px]"
        } ${emphasize ? "font-black text-red-600" : empty ? "text-transparent" : "text-slate-800"}`}
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
  fontSize = 9,
}: {
  label: string;
  y: number;
  h: number;
  x?: number;
  delay?: number;
  play: boolean;
  reduceMotion: boolean | null;
  fontSize?: number;
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
        fontSize={fontSize}
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

/** Stagger between falling tiers (modal) — longer = more dramatic */
const FALL_STAGGER = 0.38;
/** Extra settle time after last tier lands before reveal */
const FALL_SETTLE = 0.7;

function PyramidChart({
  size,
  play,
  reduceMotion,
  fallIn,
  onBuilt,
}: {
  size: PyramidSize;
  play: boolean;
  reduceMotion: boolean | null;
  /** Modal: each tier falls from above, tip → base */
  fallIn?: boolean;
  onBuilt?: () => void;
}) {
  const uid = useId().replace(/:/g, "");
  const { tipH, rowH, pyrW, braceW, bottomInset } = SIZE[size];
  const n = PYRAMID.length;
  const totalH = tipH + (n - 1) * rowH;
  const RIGHT = pyrW;
  const large = size === "hero";
  /** Numbers + red concern lines only after pyramid fully stacked (fallIn modal) */
  const [assembled, setAssembled] = useState(!fallIn || !!reduceMotion);

  const rowTop = (i: number) => (i === 0 ? 0 : tipH + (i - 1) * rowH);
  const rowBottom = (i: number) => (i === 0 ? tipH : tipH + i * rowH);
  const leftX = (y: number) => RIGHT - (RIGHT - bottomInset) * (y / totalH);

  useEffect(() => {
    if (!play) return;
    if (!fallIn || reduceMotion) {
      setAssembled(true);
      onBuilt?.();
      return;
    }
    setAssembled(false);
    const ms = Math.round(((n - 1) * FALL_STAGGER + FALL_SETTLE) * 1000);
    const t = window.setTimeout(() => {
      setAssembled(true);
      onBuilt?.();
    }, ms);
    return () => window.clearTimeout(t);
  }, [play, fallIn, n, reduceMotion, onBuilt]);

  const reveal = fallIn ? assembled : play;
  const minW = large ? 980 : 760;
  const fallPad = fallIn ? 56 : 0;

  return (
    <div className={fallIn ? "overflow-visible" : "overflow-x-auto"}>
      <div
        className={`flex gap-2 sm:min-w-0 ${fallIn ? "overflow-visible" : ""}`}
        style={{ minWidth: minW, paddingTop: fallPad }}
      >
        <motion.div
          className={`relative shrink-0 ${large ? "w-7 sm:w-8" : "w-5 sm:w-6"}`}
          style={{ height: totalH + 22 }}
          initial={{ opacity: 0 }}
          animate={reveal ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reduceMotion || !fallIn ? 0.15 : 0.05, duration: 0.45 }}
        >
          <span
            className={`absolute left-1/2 top-6 bottom-4 -translate-x-1/2 rotate-180 text-center font-bold leading-tight text-red-600 [writing-mode:vertical-rl] ${
              large ? "text-[11px] sm:text-xs" : "text-[8px] sm:text-[9px]"
            }`}
          >
            Injury Need To Be Prevented (Top Of Pyramid)
          </span>
        </motion.div>

        <div className={`min-w-0 flex-1 ${fallIn ? "overflow-visible" : ""}`}>
          <div
            className={`mb-1 grid items-end gap-0 font-bold uppercase tracking-wide text-slate-500 ${
              large ? "text-[11px] sm:text-xs" : "text-[9px]"
            }`}
            style={{ gridTemplateColumns: `${pyrW}px ${braceW}px minmax(0,1fr)` }}
          >
            <div />
            <div />
            <motion.div
              className="grid grid-cols-3 pl-1 text-left"
              initial={{ opacity: 0, y: -4 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              transition={{ delay: fallIn ? 0.05 : 0.1, duration: 0.35 }}
            >
              <span>2025</span>
              <span>Q1 2026</span>
              <span>Q2 2026</span>
            </motion.div>
          </div>

          <div
            className={`relative grid gap-0 ${fallIn ? "overflow-visible" : ""}`}
            style={{ gridTemplateColumns: `${pyrW}px ${braceW}px minmax(0,1fr)` }}
          >
            <svg
              viewBox={`0 -2 ${pyrW + 2} ${totalH + 2}`}
              width={pyrW}
              height={totalH}
              className="overflow-visible"
              style={{ overflow: "visible" }}
              role="img"
              aria-label="Piramida Bradley Curve asimetris"
            >
              <defs>
                <filter id={`${uid}-soft`} x="-8%" y="-8%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0.5" stdDeviation="0.4" floodOpacity="0.15" />
                </filter>
                <filter id={`${uid}-concern`} x="-20%" y="-40%" width="140%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor="#ef4444" floodOpacity="0.55" />
                </filter>
                <filter id={`${uid}-impact`} x="-30%" y="-40%" width="160%" height="180%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.28" />
                </filter>
                <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="45%" stopColor="#fff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {PYRAMID.map((d, i) => {
                const y0 = rowTop(i);
                const y1 = rowBottom(i);
                const isFatality = i === 0;
                const buildDelay = reduceMotion ? 0 : fallIn ? i * FALL_STAGGER : (n - 1 - i) * 0.07;
                const fallFrom = large ? 260 + i * 28 : 10;
                const tilt = i % 2 === 0 ? -11 : 9;

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
                  cx = mx + (nx / len) * (large ? 12 : 8);
                  cy = my + (ny / len) * (large ? 12 : 8);
                  textAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
                } else {
                  cx = (Math.min(xL0, xL1) + RIGHT) / 2;
                  cy = y0 + (y1 - y0) / 2;
                }

                const originX = RIGHT;
                const originY = (y0 + y1) / 2;
                const labelSize = isFatality
                  ? large
                    ? 13
                    : 9
                  : i >= 9
                    ? large
                      ? 13
                      : 9
                    : large
                      ? 14
                      : 10;

                return (
                  <motion.g
                    key={d.label}
                    style={{ transformOrigin: `${originX}px ${originY}px` }}
                    initial={
                      reduceMotion
                        ? { opacity: 1, scaleX: 1, scaleY: 1, y: 0, rotate: 0 }
                        : fallIn
                          ? {
                              opacity: 0,
                              scaleX: 0.92,
                              scaleY: 1.35,
                              y: -fallFrom,
                              rotate: tilt,
                            }
                          : { opacity: 0, scaleX: 0.12, scaleY: 1, y: 10, rotate: 0 }
                    }
                    animate={
                      play
                        ? { opacity: 1, scaleX: 1, scaleY: 1, y: 0, rotate: 0 }
                        : {
                            opacity: 0,
                            scaleX: fallIn ? 0.92 : 0.12,
                            scaleY: fallIn ? 1.35 : 1,
                            y: fallIn ? -fallFrom : 10,
                            rotate: fallIn ? tilt : 0,
                          }
                    }
                    transition={
                      fallIn && !reduceMotion
                        ? {
                            y: {
                              type: "spring",
                              stiffness: 160,
                              damping: 11,
                              mass: 1.35,
                              delay: buildDelay,
                            },
                            rotate: {
                              type: "spring",
                              stiffness: 140,
                              damping: 10,
                              mass: 1.1,
                              delay: buildDelay,
                            },
                            scaleY: {
                              type: "spring",
                              stiffness: 280,
                              damping: 14,
                              delay: buildDelay + 0.05,
                            },
                            scaleX: {
                              type: "spring",
                              stiffness: 260,
                              damping: 16,
                              delay: buildDelay + 0.05,
                            },
                            opacity: { duration: 0.18, delay: buildDelay },
                          }
                        : {
                            duration: reduceMotion ? 0 : 0.55,
                            delay: buildDelay,
                            ease: easeOut,
                          }
                    }
                  >
                    <polygon
                      points={poly}
                      fill={d.color}
                      filter={
                        fallIn && reveal && d.concern
                          ? `url(#${uid}-concern)`
                          : fallIn
                            ? `url(#${uid}-impact)`
                            : d.concern
                              ? `url(#${uid}-concern)`
                              : isFatality
                                ? undefined
                                : `url(#${uid}-soft)`
                      }
                      shapeRendering={isFatality ? "geometricPrecision" : undefined}
                    />
                    <motion.text
                      x={cx}
                      y={cy}
                      fill="#fff"
                      fontSize={labelSize}
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
                      animate={play ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        delay: reduceMotion ? 0 : buildDelay + (fallIn ? 0.2 : 0.28),
                        duration: 0.28,
                      }}
                    >
                      {d.label}
                    </motion.text>
                  </motion.g>
                );
              })}

              {play && !reduceMotion && reveal && (
                <motion.rect
                  x={0}
                  y={-2}
                  width={40}
                  height={totalH + 4}
                  fill={`url(#${uid}-shine)`}
                  pointerEvents="none"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: [-50, pyrW + 20], opacity: [0, 0.85, 0] }}
                  transition={{
                    duration: 1.45,
                    delay: 0.15,
                    ease: easeOut,
                  }}
                />
              )}
            </svg>

            <svg viewBox={`0 0 ${braceW} ${totalH}`} width={braceW} height={totalH} aria-hidden>
              <CategoryBrace
                label="Accident"
                y={0}
                h={tipH + 6 * rowH}
                x={large ? 18 : 14}
                delay={fallIn ? 0.12 : 0.55}
                play={reveal}
                reduceMotion={reduceMotion}
                fontSize={large ? 11 : 9}
              />
              <CategoryBrace
                label="Incident"
                y={tipH + 2 * rowH}
                h={4 * rowH}
                x={large ? 38 : 30}
                delay={fallIn ? 0.22 : 0.7}
                play={reveal}
                reduceMotion={reduceMotion}
                fontSize={large ? 11 : 9}
              />
              <CategoryBrace
                label="Pelanggaran"
                y={tipH + 6 * rowH}
                h={2 * rowH}
                x={large ? 18 : 14}
                delay={fallIn ? 0.32 : 0.85}
                play={reveal}
                reduceMotion={reduceMotion}
                fontSize={large ? 11 : 9}
              />
              <CategoryBrace
                label="Ketidaksesuaian"
                y={tipH + 8 * rowH}
                h={2 * rowH}
                x={large ? 18 : 14}
                delay={fallIn ? 0.42 : 1.0}
                play={reveal}
                reduceMotion={reduceMotion}
                fontSize={large ? 11 : 9}
              />
            </svg>

            <div className="relative flex flex-col">
              {PYRAMID.map((d, i) => (
                <motion.div
                  key={`v-${d.label}`}
                  className="relative grid grid-cols-3 items-center pl-2"
                  style={{ height: i === 0 ? tipH : rowH }}
                  initial={
                    reduceMotion
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: 14 }
                  }
                  animate={
                    reveal
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: fallIn ? 14 : 12 }
                  }
                  transition={{
                    delay: reduceMotion
                      ? 0
                      : fallIn
                        ? 0.08 + i * 0.045
                        : 0.35 + (n - 1 - i) * 0.05,
                    duration: 0.4,
                    ease: easeOut,
                  }}
                >
                  <ValueCell value={d.v25} color={d.color} large={large} />
                  <ValueCell value={d.vq1} color={d.color} emphasize={d.redQ1} large={large} />
                  <ValueCell
                    value={d.vq2}
                    color={d.color}
                    emphasize={d.redQ2 || d.redText}
                    large={large}
                  />
                </motion.div>
              ))}
            </div>

            {PYRAMID.map((d, i) => {
              if (!d.concern) return null;
              return (
                <motion.div
                  key={`box-${d.label}`}
                  className={`pointer-events-none absolute z-[5] border-red-500 ${
                    large ? "border-[3px]" : "border-[2.5px]"
                  }`}
                  style={{
                    top: rowTop(i),
                    left: 0,
                    height: rowBottom(i) - rowTop(i),
                    right: 0,
                  }}
                  initial={{ opacity: 0, scaleX: 0.86 }}
                  animate={
                    reveal
                      ? {
                          opacity: [0.45, 1, 0.45],
                          scaleX: 1,
                          boxShadow: [
                            "0 0 0 0 rgba(239,68,68,0)",
                            "0 0 14px 3px rgba(239,68,68,0.4)",
                            "0 0 0 0 rgba(239,68,68,0)",
                          ],
                        }
                      : { opacity: 0, scaleX: 0.86 }
                  }
                  transition={
                    reveal && !reduceMotion
                      ? {
                          opacity: {
                            duration: 2.0,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (fallIn ? 0.35 : 0.2) + i * 0.12,
                          },
                          boxShadow: {
                            duration: 2.0,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (fallIn ? 0.35 : 0.2) + i * 0.12,
                          },
                          scaleX: {
                            duration: 0.45,
                            delay: (fallIn ? 0.18 : 0.75) + i * 0.08,
                            ease: easeOut,
                          },
                        }
                      : { duration: 0.25 }
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function BradleyPyramidModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
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
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
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
            aria-labelledby="bradley-modal-title"
            className="relative z-[1] flex max-h-[min(96vh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="bradley-modal-title"
                  className="font-heading text-lg font-black text-[color:var(--ink)] sm:text-xl"
                >
                  Piramida Bradley Curve
                </h2>
                <p className="mt-0.5 text-xs text-[color:var(--ink-soft)] sm:text-sm">
                  Safety Performance All Site YTD 2026
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

            <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
              <PyramidChart
                key={animKey}
                size="hero"
                play
                reduceMotion={reduceMotion}
                fallIn
              />
              <p className="mx-auto mt-5 max-w-4xl border-t border-slate-100 pt-4 text-center text-[12px] leading-relaxed text-[color:var(--ink)] sm:text-[13px]">
                Performance Q2 2026 masih mencatatkan terdapatnya kejadian berakibat ke pekerja yaitu{" "}
                <strong className="font-semibold text-red-600">2 Medical Treatment Injury</strong> dan{" "}
                <strong className="font-semibold text-red-600">Accident Non Injury meningkat 14%</strong>.
                Jumlah HIPO Incident secara frekuensi menurun drastis dibandingkan Q1. Pelaporan Hazard dan
                TBC meningkat tetapi Golden Rules meningkat drastic dibandingkan Q1.
              </p>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 sm:px-7">
              <span className="text-[11px] text-slate-400">Tekan Esc atau klik luar untuk menutup</span>
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

export function BradleyPyramid() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const play = inView;

  return (
    <>
      <div ref={ref} className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[color:var(--ink)]">Piramida Bradley Curve</h3>
          <span className="text-[10px] text-[color:var(--ink-soft)]">
            Asimetris · Highlight MTI / Fire Case / Property Damage
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative w-full cursor-pointer rounded-xl border border-transparent text-left outline-none transition hover:border-slate-200 hover:bg-slate-50/60 focus-visible:ring-2 focus-visible:ring-emerald-600/40"
          aria-label="Buka Piramida Bradley Curve dalam ukuran besar"
        >
          <PyramidChart size="inline" play={play} reduceMotion={reduceMotion} />
          <span className="pointer-events-none absolute bottom-2 right-2 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
            Perbesar · animasi jatuh
          </span>
        </button>
      </div>

      <BradleyPyramidModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
