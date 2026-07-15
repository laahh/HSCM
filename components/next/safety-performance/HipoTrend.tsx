"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { HIPO } from "./data";
import { useInView } from "./useInView";

const easeOut = [0.22, 1, 0.36, 1] as const;

type ChartSize = "inline" | "hero";

const DIM: Record<
  ChartSize,
  { w: number; h: number; padL: number; padR: number; padT: number; padB: number; className: string }
> = {
  inline: { w: 320, h: 96, padL: 24, padR: 12, padT: 12, padB: 20, className: "h-[96px] w-full" },
  hero: { w: 720, h: 340, padL: 48, padR: 28, padT: 36, padB: 44, className: "h-auto w-full max-h-[52vh]" },
};

function fmt(v: number) {
  return v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function HipoSvg({
  size,
  play,
  visible = true,
}: {
  size: ChartSize;
  play: boolean;
  reduceMotion?: boolean | null;
  visible?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const { w, h, padL, padR, padT, padB, className } = DIM[size];
  const max = 8;
  const last = HIPO.values.length - 1;
  const large = size === "hero";
  const sx = (i: number) => padL + (i / last) * (w - padL - padR);
  const sy = (v: number) => padT + (1 - v / max) * (h - padT - padB);

  let pathD = `M ${sx(0)} ${sy(HIPO.values[0])}`;
  HIPO.values.forEach((v, i) => {
    if (i > 0) pathD += ` L ${sx(i)} ${sy(v)}`;
  });
  const areaD = `${pathD} L ${sx(last)} ${h - padB} L ${sx(0)} ${h - padB} Z`;
  const fullW = w - padL - padR + 4;
  /** draw → hold → wipe → pause — longer for modal */
  const loopDur = large ? 5.2 : 4.2;
  const repeatDelay = large ? 0.55 : 0.35;
  const cxKeys = HIPO.values.map((_, i) => sx(i));
  const cyKeys = HIPO.values.map((v) => sy(v));
  const rDot = large ? 6.5 : 3.8;
  const rLast = large ? 9 : 5.5;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-label="Tren HIPO">
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1f1f" stopOpacity={large ? 0.4 : 0.34} />
          <stop offset="100%" stopColor="#7a1f1f" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <motion.rect
            x={padL}
            y={0}
            height={h}
            initial={{ width: 0 }}
            animate={
              play
                ? { width: [0, fullW, fullW, 0] }
                : { width: visible ? fullW : 0 }
            }
            transition={
              play
                ? {
                    duration: loopDur,
                    times: [0, 0.42, 0.72, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay,
                  }
                : { duration: 0.01 }
            }
          />
        </clipPath>
      </defs>

      {[0, 2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line
            x1={padL}
            y1={sy(v)}
            x2={w - padR}
            y2={sy(v)}
            stroke="#e8eee8"
            strokeDasharray="3 3"
          />
          <text
            x={padL - (large ? 8 : 4)}
            y={sy(v) + 3}
            fontSize={large ? 12 : 8}
            fill="#6b7d72"
            textAnchor="end"
          >
            {v}
          </text>
        </g>
      ))}

      <g clipPath={`url(#${uid}-clip)`}>
        <path d={areaD} fill={`url(#${uid}-fill)`} />
        <path
          d={pathD}
          fill="none"
          stroke="#7a1f1f"
          strokeWidth={large ? 4 : 2.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {play && (
        <motion.circle
          r={large ? 7 : 5}
          fill="#7a1f1f"
          stroke="#fff"
          strokeWidth={large ? 2 : 1.6}
          animate={{
            cx: [...cxKeys, cxKeys[0]],
            cy: [...cyKeys, cyKeys[0]],
            opacity: [1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{
            duration: loopDur,
            times: [0, 0.1, 0.2, 0.3, 0.42, 0.72, 1],
            ease: "linear",
            repeat: Infinity,
            repeatDelay,
          }}
        />
      )}

      <motion.line
        x1={sx(last)}
        x2={sx(last)}
        y1={h - padB}
        y2={sy(HIPO.values[last])}
        stroke="#16a34a"
        strokeWidth={large ? 1.75 : 1.25}
        strokeDasharray={large ? "5 5" : "3 3"}
        animate={
          play
            ? { opacity: [0, 0, 0.85, 0.85, 0] }
            : visible
              ? { opacity: 0.7 }
              : { opacity: 0 }
        }
        transition={
          play
            ? {
                duration: loopDur,
                times: [0, 0.38, 0.45, 0.72, 1],
                repeat: Infinity,
                repeatDelay,
              }
            : { duration: 0.3 }
        }
      />

      {HIPO.values.map((v, i) => {
        const isLast = i === last;
        const appearAt = 0.05 + (i / last) * 0.37;
        return (
          <g key={HIPO.labels[i]}>
            {isLast && play && (
              <>
                <motion.circle
                  cx={sx(i)}
                  cy={sy(v)}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth={large ? 2 : 1.5}
                  animate={{ r: [rLast, large ? 28 : 16], opacity: [0.55, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle
                  cx={sx(i)}
                  cy={sy(v)}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth={large ? 1.4 : 1}
                  animate={{ r: [rLast, large ? 36 : 22], opacity: [0.35, 0] }}
                  transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, ease: "easeOut" }}
                />
              </>
            )}
            <motion.circle
              cx={sx(i)}
              cy={sy(v)}
              fill={isLast ? "#16a34a" : "#7a1f1f"}
              stroke="#fff"
              strokeWidth={large ? 2.4 : 1.8}
              animate={
                play
                  ? isLast
                    ? {
                        r: [0, rLast, rLast + 1.5, rLast, rLast, 0],
                        opacity: [0, 1, 1, 1, 1, 0],
                      }
                    : {
                        r: [0, rDot, rDot, rDot, 0],
                        opacity: [0, 1, 1, 1, 0],
                      }
                  : visible
                    ? { r: isLast ? rLast : rDot, opacity: 1 }
                    : { r: 0, opacity: 0 }
              }
              transition={
                play
                  ? {
                      duration: loopDur,
                      times: isLast
                        ? [0, appearAt, appearAt + 0.08, 0.55, 0.72, 1]
                        : [0, appearAt, 0.55, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay,
                      ease: "easeInOut",
                    }
                  : { duration: 0.25 }
              }
            />
            <motion.text
              x={sx(i)}
              y={sy(v) - (isLast ? (large ? 20 : 12) : large ? 16 : 9)}
              fontSize={isLast ? (large ? 18 : 11) : large ? 13 : 8}
              fontWeight="800"
              fill={isLast ? "#16a34a" : "#7a1f1f"}
              textAnchor="middle"
              animate={
                play
                  ? { opacity: [0, 1, 1, 0] }
                  : visible
                    ? { opacity: 1 }
                    : { opacity: 0 }
              }
              transition={
                play
                  ? {
                      duration: loopDur,
                      times: [0, appearAt + 0.05, 0.72, 1],
                      repeat: Infinity,
                      repeatDelay,
                    }
                  : { duration: 0.25 }
              }
            >
              {fmt(v)}
            </motion.text>
          </g>
        );
      })}

      {HIPO.labels.map((l, i) => (
        <text
          key={l}
          x={sx(i)}
          y={h - (large ? 10 : 6)}
          fontSize={large ? 13 : 8}
          fontWeight={i === last ? 700 : 400}
          fill={i === last ? "#16a34a" : "#6b7d72"}
          textAnchor="middle"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

function HipoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            aria-labelledby="hipo-modal-title"
            className="relative z-[1] flex max-h-[min(96vh,820px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="hipo-modal-title"
                  className="font-heading text-lg font-black text-[color:var(--ink)] sm:text-xl"
                >
                  Tren HIPO
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

            <div className="min-h-0 flex-1 overflow-auto px-4 py-5 sm:px-8 sm:py-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <motion.span
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200/80 sm:text-sm"
                  animate={
                    reduceMotion
                      ? { opacity: 1, scale: 1 }
                      : { opacity: [0.7, 1, 0.7], scale: [0.98, 1.03, 0.98] }
                  }
                  transition={
                    reduceMotion
                      ? undefined
                      : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  Q1&apos;26 7,3 → Q2&apos;26 2,0
                </motion.span>
                <span className="text-xs font-semibold text-emerald-700 sm:text-sm">
                  ↓ {fmt(7.3 - 2.0)} poin dari puncak Q1
                </span>
              </div>

              <div className="rounded-xl border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-3 sm:p-5">
                <HipoSvg
                  key={animKey}
                  size="hero"
                  play={!reduceMotion}
                  reduceMotion={reduceMotion}
                  visible
                />
              </div>
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

export function HipoTrend() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const play = inView && !reduceMotion;

  return (
    <>
      <motion.div
        ref={ref}
        className="shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-2 shadow-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: easeOut }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative w-full cursor-pointer rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40"
          aria-label="Buka Tren HIPO dalam ukuran besar"
        >
          <div className="mb-0.5 flex items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-[color:var(--ink)]">Tren HIPO</h3>
            <motion.span
              className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700 ring-1 ring-emerald-200/80"
              animate={
                play
                  ? { opacity: [0.65, 1, 0.65], scale: [0.98, 1.03, 0.98] }
                  : inView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.75 }
              }
              transition={
                play
                  ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.35 }
              }
            >
              Q1&apos;26 7,3 → Q2&apos;26 2,0
            </motion.span>
          </div>

          <HipoSvg
            size="inline"
            play={play}
            reduceMotion={reduceMotion}
            visible={inView}
          />

          <span className="pointer-events-none absolute bottom-1 right-1 rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100">
            Perbesar
          </span>
        </button>
      </motion.div>

      <HipoModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
