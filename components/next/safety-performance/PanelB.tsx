"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SCATTER, type QuadKey, type ScatterPoint } from "./data";
import { useInView } from "./useInView";

const Q_META: Record<
  QuadKey,
  { label: string; tone: string; fill: string; soft: string; border: string }
> = {
  K1: {
    label: "Perlu Perhatian",
    tone: "#b91c1c",
    fill: "#dc2626",
    soft: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.28)",
  },
  K2: {
    label: "Watch",
    tone: "#c2410c",
    fill: "#ea580c",
    soft: "rgba(234,88,12,0.08)",
    border: "rgba(234,88,12,0.28)",
  },
  K3: {
    label: "Cukup",
    tone: "#a16207",
    fill: "#ca8a04",
    soft: "rgba(202,138,4,0.1)",
    border: "rgba(202,138,4,0.3)",
  },
  K4: {
    label: "Baik",
    tone: "#15803d",
    fill: "#16a34a",
    soft: "rgba(22,163,74,0.1)",
    border: "rgba(22,163,74,0.3)",
  },
};

const Q_RANK: Record<QuadKey, number> = { K1: 1, K2: 2, K3: 3, K4: 4 };

type ViewMode = "q1" | "morph" | "q2";
type MoveKind = "up" | "down" | "flat";

/** Auto timeline (ms) — loops while panel is in view */
const HOLD_Q1 = 1400;
const MORPH_MS = 1600;
const HOLD_Q2 = 2800;
const LOOP_GAP = 700;
const CYCLE_MS = HOLD_Q1 + MORPH_MS + HOLD_Q2 + LOOP_GAP;

function shortName(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].slice(0, 3);
  return (parts[0].slice(0, 2) + parts[1].slice(0, 1)).toUpperCase();
}

function moveKind(d: ScatterPoint): MoveKind {
  const dq = Q_RANK[d.q] - Q_RANK[d.q1];
  if (dq > 0) return "up";
  if (dq < 0) return "down";
  const leadΔ = d.lead - d.leadQ1;
  const sevΔ = d.sev - d.sevQ1;
  if (leadΔ >= 0.4 && sevΔ <= 0.02) return "up";
  if (leadΔ <= -0.4 || sevΔ >= 0.08) return "down";
  return "flat";
}

function fmtΔ(n: number, digits = 2) {
  const sign = n > 0 ? "+" : "";
  return `${sign}${n.toLocaleString("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function PanelB() {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("q1");
  const [auto, setAuto] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [progress, setProgress] = useState(0);
  const [filterMove, setFilterMove] = useState<MoveKind | "all">("all");
  const timers = useRef<number[]>([]);
  const raf = useRef<number | null>(null);
  const cycleStart = useRef(0);

  const x0 = 58;
  const x1 = 708;
  const y0 = 40;
  const y1 = 328;
  const midX = (x0 + x1) / 2;
  const midY = (y0 + y1) / 2;
  const leadMin = 70;
  const leadMax = 86;
  const sx = useCallback(
    (l: number) => x0 + ((l - leadMin) / (leadMax - leadMin)) * (x1 - x0),
    [],
  );
  const sy = useCallback((s: number) => y1 - (s / 0.8) * (y1 - y0), []);

  const enriched = useMemo(
    () =>
      SCATTER.map((d) => ({
        ...d,
        move: moveKind(d),
        dLead: d.lead - d.leadQ1,
        dSev: d.sev - d.sevQ1,
      })),
    [],
  );

  const summary = useMemo(() => {
    const up = enriched.filter((d) => d.move === "up").length;
    const down = enriched.filter((d) => d.move === "down").length;
    const flat = enriched.filter((d) => d.move === "flat").length;
    return { up, down, flat };
  }, [enriched]);

  const visible = useMemo(
    () => (filterMove === "all" ? enriched : enriched.filter((d) => d.move === filterMove)),
    [enriched, filterMove],
  );

  const selected = enriched.find((d) => d.name === active) ?? null;

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (raf.current != null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  }, []);

  const runCycle = useCallback(() => {
    clearTimers();
    setMode("q1");
    cycleStart.current = performance.now();

    const tick = () => {
      const elapsed = performance.now() - cycleStart.current;
      setProgress(Math.min(1, elapsed / CYCLE_MS));
      if (elapsed < CYCLE_MS) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);

    timers.current.push(
      window.setTimeout(() => setMode("morph"), HOLD_Q1),
      window.setTimeout(() => setMode("q2"), HOLD_Q1 + MORPH_MS),
      window.setTimeout(() => setCycle((c) => c + 1), CYCLE_MS),
    );
  }, [clearTimers]);

  /** Auto-loop Q1 → Q2 while in view (presentation-friendly) */
  useEffect(() => {
    if (!inView || reduceMotion || !auto || active) {
      clearTimers();
      if (reduceMotion) {
        setMode("q2");
        setProgress(1);
      }
      return;
    }
    runCycle();
    return clearTimers;
  }, [inView, reduceMotion, auto, active, cycle, runCycle, clearTimers]);

  const pickPeriod = (id: "q1" | "q2") => {
    setAuto(false);
    clearTimers();
    setMode(id);
    setProgress(id === "q1" ? 0 : 1);
  };

  const toggleAuto = () => {
    if (reduceMotion) return;
    if (auto) {
      setAuto(false);
      clearTimers();
    } else {
      setAuto(true);
      setCycle((c) => c + 1);
    }
  };

  const playing = auto && inView && !reduceMotion && !active;

  const pointAt = (d: (typeof enriched)[0]) => {
    if (mode === "q1") return { lead: d.leadQ1, sev: d.sevQ1, q: d.q1 };
    return { lead: d.lead, sev: d.sev, q: d.q };
  };

  const showTrails = mode !== "q1";

  return (
    <section ref={ref} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      {/* Header */}
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="sp-panel-badge">B</div>
          <div>
            <h2 className="font-heading text-base font-black leading-tight text-[color:var(--ink)] md:text-lg">
              Performance Mining Contractor
            </h2>
            <div className="text-[11px] text-[color:var(--ink-soft)]">
              Pergerakan Q1 → Q2 · % Leading vs Lagging Severity
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-[10px] font-bold">
            {(
              [
                { id: "q1" as const, label: "Q1" },
                { id: "q2" as const, label: "Q2" },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => pickPeriod(p.id)}
                className={`rounded-full px-3 py-1 transition-colors ${
                  !auto && (mode === p.id || (mode === "morph" && p.id === "q2"))
                    ? "bg-[color:var(--green-deep)] text-white shadow-sm"
                    : auto &&
                        ((p.id === "q1" && mode === "q1") ||
                          (p.id === "q2" && (mode === "q2" || mode === "morph")))
                      ? "bg-[color:var(--green-deep)] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleAuto}
            disabled={!!reduceMotion}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold transition disabled:opacity-50 ${
              auto
                ? "border-[color:var(--green-line)] bg-[color:var(--green-deep)] text-white"
                : "border-[color:var(--green-line)] bg-white text-[color:var(--green-deep)] hover:bg-[color:var(--paper-soft)]"
            }`}
          >
            <span aria-hidden>{playing ? "●" : auto ? "▶" : "❚❚"}</span>
            {auto ? (playing ? "Auto Q1→Q2" : "Auto (pause)") : "Nyalakan Auto"}
          </button>
        </div>
      </div>

      {/* Auto progress rail */}
      <div className="mb-2.5">
        <div className="mb-1 flex items-center justify-between text-[9px] font-semibold uppercase tracking-wide text-slate-400">
          <span>
            {mode === "q1" ? "Posisi Q1" : mode === "morph" ? "Bergerak ke Q2…" : "Posisi Q2"}
          </span>
          <span className="tabular-nums">{auto ? "Loop otomatis" : "Manual"}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background:
                mode === "q1"
                  ? "#94a3b8"
                  : mode === "morph"
                    ? "linear-gradient(90deg,#94a3b8,#0f766e)"
                    : "var(--green-deep, #166534)",
            }}
            transition={{ duration: 0.05 }}
          />
        </div>
        <div className="mt-1 flex justify-between text-[8px] font-bold text-slate-400">
          <span>Q1</span>
          <span>Morph</span>
          <span>Q2</span>
        </div>
      </div>

      {/* Movement summary */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(
          [
            { id: "all" as const, label: "Semua", n: enriched.length, color: "#334155" },
            { id: "up" as const, label: "Membaik", n: summary.up, color: "#16a34a" },
            { id: "down" as const, label: "Memburuk", n: summary.down, color: "#dc2626" },
            { id: "flat" as const, label: "Stabil", n: summary.flat, color: "#64748b" },
          ] as const
        ).map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilterMove(c.id)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold transition ${
              filterMove === c.id
                ? "border-slate-300 bg-white shadow-sm"
                : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
            {c.label}
            <span className="rounded bg-slate-100 px-1.5 py-0.5 tabular-nums text-[9px] text-slate-600">{c.n}</span>
          </button>
        ))}

        <div className="ml-auto hidden items-center gap-3 text-[9px] font-semibold text-slate-400 sm:flex">
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-400 bg-transparent" />
            Q1
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
            Q2
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-0.5 w-4 bg-[#16a34a]" />
            ↑ membaik
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-0.5 w-4 bg-[#dc2626]" />
            ↓ memburuk
          </span>
        </div>
      </div>

      <div className="qb-stage relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/90">
        <div className="pointer-events-none absolute inset-0 qb-grid-fade" aria-hidden />

        <div className="pointer-events-none absolute left-2 top-1/2 z-[1] hidden -translate-y-1/2 -rotate-90 text-[9px] font-bold tracking-[0.18em] text-slate-400 sm:block">
          LAGGING SEVERITY ↑
        </div>
        <div className="pointer-events-none absolute bottom-[4.75rem] left-1/2 z-[1] -translate-x-1/2 text-[9px] font-bold tracking-[0.18em] text-slate-400">
          % LEADING →
        </div>

        {/* Period beacon */}
        <motion.div
          className="pointer-events-none absolute right-3 top-3 z-[2] rounded-full px-2.5 py-1 text-[10px] font-black tracking-wide text-white shadow-sm"
          style={{
            background:
              mode === "q1" ? "#64748b" : mode === "morph" ? "#0f766e" : "var(--green-deep, #166534)",
          }}
          key={mode}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {mode === "q1" ? "POSISI Q1" : mode === "morph" ? "BERGERAK → Q2" : "POSISI Q2"}
        </motion.div>

        <svg viewBox="0 0 760 400" className="h-auto w-full pb-14" aria-label="Scatter Q1 ke Q2 mining contractor">
          <defs>
            <linearGradient id="qb-sev" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#ca8a04" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="qb-lead" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.75" />
            </linearGradient>
            <pattern id="qb-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.85" fill="#94a3b8" opacity="0.25" />
            </pattern>
            <clipPath id="qb-frame">
              <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={16} />
            </clipPath>
            <filter id="qb-soft" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#0f172a" floodOpacity="0.18" />
            </filter>
            <marker id="qb-arr-up" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#16a34a" />
            </marker>
            <marker id="qb-arr-down" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626" />
            </marker>
            <marker id="qb-arr-flat" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#94a3b8" />
            </marker>
          </defs>

          <motion.rect
            x={x0}
            y={y0}
            width={x1 - x0}
            height={y1 - y0}
            rx={16}
            fill="#fff"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.45 }}
          />

          <g clipPath="url(#qb-frame)">
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="url(#qb-dots)" opacity={0.5} />

            {(
              [
                { q: "K1" as const, x: x0, y: y0, w: midX - x0, h: midY - y0 },
                { q: "K2" as const, x: midX, y: y0, w: x1 - midX, h: midY - y0 },
                { q: "K3" as const, x: x0, y: midY, w: midX - x0, h: y1 - midY },
                { q: "K4" as const, x: midX, y: midY, w: x1 - midX, h: y1 - midY },
              ]
            ).map((pane, i) => (
              <motion.rect
                key={pane.q}
                x={pane.x}
                y={pane.y}
                width={pane.w}
                height={pane.h}
                fill={Q_META[pane.q].soft}
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
              />
            ))}

            <line
              x1={x0}
              y1={midY}
              x2={x1}
              y2={midY}
              stroke="#94a3b8"
              strokeWidth="1.1"
              strokeDasharray="6 5"
              opacity={0.55}
            />
            <line
              x1={midX}
              y1={y0}
              x2={midX}
              y2={y1}
              stroke="#94a3b8"
              strokeWidth="1.1"
              strokeDasharray="6 5"
              opacity={0.55}
            />
            <circle cx={midX} cy={midY} r={3.5} fill="#fff" stroke="#64748b" strokeWidth="1.4" />
          </g>

          {/* Axis bars */}
          <motion.line
            x1={x0 - 10}
            y1={y1}
            x2={x0 - 10}
            y2={y0}
            stroke="url(#qb-sev)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 0.7, ease }}
          />
          <motion.line
            x1={x0}
            y1={y1 + 10}
            x2={x1}
            y2={y1 + 10}
            stroke="url(#qb-lead)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          />

          {/* Quadrant labels */}
          {(
            [
              { q: "K1" as const, x: x0 + 14, y: y0 + 16 },
              { q: "K2" as const, x: midX + 14, y: y0 + 16 },
              { q: "K3" as const, x: x0 + 14, y: midY + 16 },
              { q: "K4" as const, x: midX + 14, y: midY + 16 },
            ]
          ).map((t, i) => (
            <motion.g
              key={t.q}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
            >
              <rect
                x={t.x - 4}
                y={t.y - 11}
                width={92}
                height={18}
                rx={9}
                fill="#fff"
                stroke={Q_META[t.q].border}
              />
              <circle cx={t.x + 5} cy={t.y - 2} r={3} fill={Q_META[t.q].fill} />
              <text x={t.x + 12} y={t.y + 1} fontSize="8.5" fontWeight="800" fill={Q_META[t.q].tone}>
                {t.q}
              </text>
              <text x={t.x + 30} y={t.y + 1} fontSize="7.5" fontWeight="600" fill="#64748b">
                {Q_META[t.q].label}
              </text>
            </motion.g>
          ))}

          {/* Trajectories Q1 → Q2 */}
          {visible.map((d, i) => {
            const xA = sx(d.leadQ1);
            const yA = sy(d.sevQ1);
            const xB = sx(d.lead);
            const yB = sy(d.sev);
            const dist = Math.hypot(xB - xA, yB - yA);
            if (dist < 4) return null;

            const color =
              d.move === "up" ? "#16a34a" : d.move === "down" ? "#dc2626" : "#94a3b8";
            const marker =
              d.move === "up"
                ? "url(#qb-arr-up)"
                : d.move === "down"
                  ? "url(#qb-arr-down)"
                  : "url(#qb-arr-flat)";
            const dim = Boolean(active && active !== d.name);
            const focus = !active || active === d.name;
            const mx = (xA + xB) / 2;
            const my = (yA + yB) / 2 - Math.min(22, dist * 0.18);

            return (
              <g key={`trail-${d.name}`}>
                <motion.path
                  d={`M ${xA} ${yA} Q ${mx} ${my} ${xB} ${yB}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={focus ? 2.25 : 1.35}
                  strokeLinecap="round"
                  markerEnd={marker}
                  strokeDasharray={d.move === "flat" ? "4 4" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: inView && showTrails ? 1 : 0,
                    opacity: inView && showTrails ? (dim ? 0.1 : 0.85) : 0,
                  }}
                  transition={{
                    pathLength: {
                      duration: reduceMotion ? 0.01 : mode === "morph" ? MORPH_MS / 1000 : 0.85,
                      delay:
                        reduceMotion || mode !== "morph"
                          ? mode === "q2"
                            ? 0.05 + i * 0.03
                            : 0
                          : i * 0.07,
                      ease,
                    },
                    opacity: { duration: 0.25 },
                  }}
                />
                {/* Mid delta chip for movers */}
                {d.move !== "flat" && focus && showTrails && !active && (
                  <motion.text
                    x={mx}
                    y={my - 4}
                    fontSize="7.5"
                    fontWeight="800"
                    fill={color}
                    textAnchor="middle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 0.9 : 0 }}
                    transition={{ delay: 0.7 + i * 0.05 }}
                  >
                    {d.q1}→{d.q}
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* Q1 ghost rings (always when comparing / at Q2) */}
          {visible.map((d, i) => {
            if (mode === "q1") return null;
            const x = sx(d.leadQ1);
            const y = sy(d.sevQ1);
            const dim = Boolean(active && active !== d.name);
            return (
              <motion.circle
                key={`q1-${d.name}`}
                cx={x}
                cy={y}
                r={9}
                fill="none"
                stroke={Q_META[d.q1].fill}
                strokeWidth="1.6"
                strokeDasharray="3.5 2.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{
                  opacity: inView ? (dim ? 0.08 : 0.45) : 0,
                  scale: 1,
                }}
                transition={{ delay: reduceMotion ? 0 : 0.15 + i * 0.04 }}
                style={{ transformOrigin: `${x}px ${y}px` }}
              />
            );
          })}

          {/* Live points (morph between Q1 and Q2) */}
          {visible.map((d, i) => {
            const at = pointAt(d);
            const x = sx(at.lead);
            const y = sy(at.sev);
            const isOn = active === d.name;
            const dim = Boolean(active && !isOn);
            const fill = Q_META[at.q].fill;

            return (
              <motion.g
                key={`pt-${d.name}`}
                tabIndex={0}
                role="button"
                aria-label={`${d.name}, ${d.q1} ke ${d.q}, leading ${d.lead}%`}
                style={{ cursor: "pointer", outline: "none" }}
                onMouseEnter={() => setActive(d.name)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(d.name)}
                onBlur={() => setActive(null)}
                initial={false}
                animate={{
                  opacity: inView ? (dim ? 0.22 : 1) : 0,
                }}
                transition={{ opacity: { duration: 0.25 } }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={isOn ? 19 : 15}
                  fill={fill}
                  stroke="#fff"
                  strokeWidth={isOn ? 3 : 2.2}
                  filter="url(#qb-soft)"
                  initial={false}
                  animate={{
                    cx: x,
                    cy: y,
                    r: isOn ? 19 : mode === "morph" && d.move !== "flat" ? [15, 18, 15] : 15,
                    fill,
                  }}
                  transition={{
                    cx: {
                      duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
                      delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                      ease,
                    },
                    cy: {
                      duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
                      delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                      ease,
                    },
                    fill: {
                      duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.45,
                      delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                    },
                    r: {
                      duration: mode === "morph" ? MORPH_MS / 1000 : 0.25,
                      delay: mode === "morph" ? i * 0.07 : 0,
                      ease: "easeInOut",
                    },
                  }}
                />
                <motion.text
                  x={x}
                  y={y + 3.2}
                  fontSize="7.5"
                  fontWeight="800"
                  fill="#fff"
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                  animate={{ x, y: y + 3.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
                    delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                    ease,
                  }}
                >
                  {shortName(d.name)}
                </motion.text>
                <motion.text
                  x={x}
                  y={y - (isOn ? 26 : 22)}
                  fontSize="8.5"
                  fontWeight="700"
                  fill="#0f172a"
                  textAnchor="middle"
                  style={{ pointerEvents: "none" }}
                  animate={{ x, y: y - (isOn ? 26 : 22) }}
                  transition={{
                    duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
                    delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                    ease,
                  }}
                >
                  {d.name}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>

        {/* Detail dock */}
        <div className="absolute inset-x-3 bottom-3 z-[2] sm:inset-x-4">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.28, ease }}
                className="grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-sm backdrop-blur-md sm:grid-cols-6"
              >
                <div className="col-span-2 flex items-center gap-2 sm:col-span-2">
                  <div className="flex flex-col gap-1">
                    <span
                      className="w-fit rounded-md px-2 py-0.5 text-[9px] font-black text-white"
                      style={{ background: Q_META[selected.q].fill }}
                    >
                      {selected.q1} → {selected.q}
                    </span>
                    <div className="font-heading text-sm font-black leading-tight text-[color:var(--ink)]">
                      {selected.name}
                    </div>
                  </div>
                  <span
                    className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      selected.move === "up"
                        ? "bg-emerald-50 text-emerald-700"
                        : selected.move === "down"
                          ? "bg-red-50 text-red-700"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {selected.move === "up" ? "Membaik" : selected.move === "down" ? "Memburuk" : "Stabil"}
                  </span>
                </div>
                <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Insiden Q2</div>
                  <div className="mt-0.5 text-[12px] font-bold text-[color:var(--ink)]">{selected.inc}</div>
                </div>
                <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Δ Leading</div>
                  <div
                    className={`mt-0.5 font-heading text-[13px] font-black tabular-nums ${
                      selected.dLead >= 0 ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {fmtΔ(selected.dLead)} pp
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 px-2.5 py-2">
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Δ Severity</div>
                  <div
                    className={`mt-0.5 font-heading text-[13px] font-black tabular-nums ${
                      selected.dSev <= 0 ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {fmtΔ(selected.dSev)}
                  </div>
                </div>
                <div className="col-span-2 rounded-xl bg-slate-50 px-2.5 py-2 sm:col-span-1">
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">Catatan</div>
                  <div className="mt-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
                    {selected.gap}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-slate-200 bg-white/85 px-3.5 py-2.5 text-center text-[11px] text-slate-500 backdrop-blur-sm"
              >
                Panah menunjukkan perjalanan tiap kontraktor dari Q1 ke Q2 — putar otomatis, atau hover untuk detail Δ
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
