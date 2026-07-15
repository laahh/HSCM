"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SCATTER, type QuadKey, type ScatterPoint } from "./data";
import { contractorLogo } from "./contractorLogo";
import { useInView } from "./useInView";

const Q_META: Record<
  QuadKey,
  { label: string; tone: string; fill: string; soft: string; border: string }
> = {
  K1: {
    label: "Perlu Perhatian",
    tone: "#b91c1c",
    fill: "#dc2626",
    soft: "rgba(252, 165, 165, 0.35)",
    border: "rgba(220,38,38,0.28)",
  },
  K2: {
    label: "Watch",
    tone: "#c2410c",
    fill: "#ea580c",
    soft: "rgba(253, 186, 116, 0.32)",
    border: "rgba(234,88,12,0.28)",
  },
  K3: {
    label: "Cukup",
    tone: "#a16207",
    fill: "#ca8a04",
    soft: "rgba(253, 224, 71, 0.28)",
    border: "rgba(202,138,4,0.3)",
  },
  K4: {
    label: "Baik",
    tone: "#15803d",
    fill: "#16a34a",
    soft: "rgba(134, 239, 172, 0.32)",
    border: "rgba(22,163,74,0.3)",
  },
};

const Q_RANK: Record<QuadKey, number> = { K1: 1, K2: 2, K3: 3, K4: 4 };

type ViewMode = "q1" | "morph" | "q2";
type MoveKind = "up" | "down" | "flat";

/** Auto timeline (ms) — loops while panel is in view */
const HOLD_Q1 = 1200;
const MORPH_MS = 1800;
const HOLD_Q2 = 4200;
const LOOP_GAP = 600;
const CYCLE_MS = HOLD_Q1 + MORPH_MS + HOLD_Q2 + LOOP_GAP;

function shortName(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0].slice(0, 3);
  return (parts[0].slice(0, 2) + parts[1].slice(0, 1)).toUpperCase();
}

/** Site tag under logo — e.g. PAMA BMO → BMO */
function siteTag(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1];
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

type BoardSize = "inline" | "hero";

export function ContractorQuadrantBoard({
  size = "inline",
  forcePlay = false,
  paused = false,
  className = "",
  onExpand,
  children,
}: {
  size?: BoardSize;
  forcePlay?: boolean;
  paused?: boolean;
  className?: string;
  onExpand?: () => void;
  /** When set (inline), rendered beside the chart so tops align under shared toolbar */
  children?: ReactNode;
}) {
  const { ref, inView: inViewRaw } = useInView<HTMLDivElement>(0.12);
  const inView = forcePlay || inViewRaw;
  const hero = size === "hero";
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [mode, setMode] = useState<ViewMode>("q2");
  const [auto, setAuto] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [progress, setProgress] = useState(1);
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
    if (!inView || reduceMotion || !auto || active || paused) {
      clearTimers();
      if (reduceMotion) {
        setMode("q2");
        setProgress(1);
      }
      return;
    }
    runCycle();
    return clearTimers;
  }, [inView, reduceMotion, auto, active, paused, cycle, runCycle, clearTimers]);

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

  const playing = auto && inView && !reduceMotion && !active && !paused;
  const logoBase = hero ? 48 : 36;
  const logoOn = hero ? 58 : 44;
  const uid = useId().replace(/:/g, "");

  const pointAt = (d: (typeof enriched)[0]) => {
    if (mode === "q1") return { lead: d.leadQ1, sev: d.sevQ1, q: d.q1 };
    return { lead: d.lead, sev: d.sev, q: d.q };
  };

  const showTrails = mode !== "q1";

  return (
    <div ref={ref} className={`flex min-h-0 flex-col ${className}`}>
      <div className={`mb-2.5 flex flex-wrap items-center gap-2 ${hero ? "mb-3" : ""}`}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  pickPeriod(p.id);
                }}
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
            onClick={(e) => {
              e.stopPropagation();
              toggleAuto();
            }}
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
            {mode === "q1"
              ? "Posisi Q1"
              : mode === "morph"
                ? "Bergerak dari asal Q1…"
                : "Asal Q1 → Posisi Q2"}
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
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-bold text-slate-600">
          <span className="inline-block h-3 w-3 rounded-full border border-slate-400 bg-slate-200 grayscale" />
          Asal Q1
          <span className="text-slate-300">→</span>
          <span className="inline-block h-3 w-3 rounded-full border-2 border-emerald-600 bg-emerald-100" />
          Kini Q2
        </span>
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
            onClick={(e) => {
              e.stopPropagation();
              setFilterMove(c.id);
            }}
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

      <div
        className={
          children
            ? "grid min-h-0 grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:items-stretch"
            : undefined
        }
      >
      <div className={children ? "group relative min-h-0 min-w-0" : undefined}>
      <div
        className={`qb-stage relative min-h-0 overflow-hidden rounded-2xl border border-slate-200/90 ${
          hero ? "min-h-[min(52vh,480px)]" : "h-full"
        } ${onExpand ? "cursor-pointer" : ""}`}
        onClick={onExpand}
      >
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

        <div className="relative w-full pb-14">
        <div className="relative w-full">
        <svg viewBox="0 0 760 400" className="block h-auto w-full" aria-label="Scatter Q1 ke Q2 mining contractor">
          <defs>
            <linearGradient id={`${uid}-sev`} x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.7" />
              <stop offset="55%" stopColor="#ca8a04" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#dc2626" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id={`${uid}-lead`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.75" />
            </linearGradient>
            <pattern id={`${uid}-dots`} width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.85" fill="#94a3b8" opacity="0.25" />
            </pattern>
            <clipPath id={`${uid}-frame`}>
              <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={16} />
            </clipPath>
            <filter id={`${uid}-soft`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.4" floodColor="#0f172a" floodOpacity="0.18" />
            </filter>
            <marker id={`${uid}-arr-up`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#16a34a" />
            </marker>
            <marker id={`${uid}-arr-down`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#dc2626" />
            </marker>
            <marker id={`${uid}-arr-flat`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
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

          <g clipPath={`url(#${uid}-frame)`}>
            <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={`url(#${uid}-dots)`} opacity={0.5} />

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
            stroke={`url(#${uid}-sev)`}
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
            stroke={`url(#${uid}-lead)`}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          />

          {/* Quadrant watermarks */}
          {(
            [
              { q: 1, x: x0 + 18, y: y0 + 28, anchor: "start" as const },
              { q: 2, x: x1 - 18, y: y0 + 28, anchor: "end" as const },
              { q: 3, x: x0 + 18, y: y1 - 14, anchor: "start" as const },
              { q: 4, x: x1 - 18, y: y1 - 14, anchor: "end" as const },
            ]
          ).map((t, i) => (
            <motion.text
              key={`wm-${t.q}`}
              x={t.x}
              y={t.y}
              textAnchor={t.anchor}
              fontSize="22"
              fontWeight="800"
              fill="#0f172a"
              opacity={0.12}
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 0.12 : 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              style={{ pointerEvents: "none" }}
            >
              Kuadran {t.q}
            </motion.text>
          ))}

          {/* Trajectories Q1 → Q2 (asal → kini) */}
          {visible.map((d, i) => {
            const xA = sx(d.leadQ1);
            const yA = sy(d.sevQ1);
            const xB = sx(d.lead);
            const yB = sy(d.sev);
            const dist = Math.hypot(xB - xA, yB - yA);
            if (dist < 3) return null;

            const color =
              d.move === "up" ? "#16a34a" : d.move === "down" ? "#dc2626" : "#94a3b8";
            const marker =
              d.move === "up"
                ? `url(#${uid}-arr-up)`
                : d.move === "down"
                  ? `url(#${uid}-arr-down)`
                  : `url(#${uid}-arr-flat)`;
            const dim = Boolean(active && active !== d.name);
            const focus = !active || active === d.name;
            // Slight bow so arrows don't cover logos, still read as origin→now
            const mx = (xA + xB) / 2 + (yA - yB) * 0.08;
            const my = (yA + yB) / 2 - (xB - xA) * 0.06;

            return (
              <g key={`trail-${d.name}`}>
                <motion.path
                  d={`M ${xA} ${yA} Q ${mx} ${my} ${xB} ${yB}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={focus ? 2.6 : 1.5}
                  strokeLinecap="round"
                  markerEnd={marker}
                  strokeDasharray={d.move === "flat" ? "5 4" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: inView && showTrails ? 1 : 0,
                    opacity: inView && showTrails ? (dim ? 0.12 : 0.9) : 0,
                  }}
                  transition={{
                    pathLength: {
                      duration: reduceMotion ? 0.01 : mode === "morph" ? MORPH_MS / 1000 : 0.7,
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
              </g>
            );
          })}

          {/* Live hit targets (logos rendered as HTML overlay) */}
          {visible.map((d, i) => {
            const at = pointAt(d);
            const x = sx(at.lead);
            const y = sy(at.sev);
            const isOn = active === d.name;
            const dim = Boolean(active && !isOn);
            const fill = Q_META[at.q].fill;
            const logo = contractorLogo(d.name);
            const r = isOn ? 22 : 18;
            const pointEase = {
              duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
              delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
              ease,
            };

            return (
              <motion.g
                key={`pt-${d.name}`}
                tabIndex={0}
                role="button"
                aria-label={`${d.name}, dari ${d.q1} ke ${d.q}, leading ${d.lead}%`}
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
                  r={r}
                  fill={logo ? "#ffffff" : fill}
                  stroke={fill}
                  strokeWidth={isOn ? 3 : 2.4}
                  filter={`url(#${uid}-soft)`}
                  initial={false}
                  animate={{
                    cx: x,
                    cy: y,
                    r:
                      isOn || (mode === "morph" && d.move !== "flat")
                        ? isOn
                          ? [r, r + 2, r]
                          : [r, r + 2.5, r]
                        : r,
                    fill: logo ? "#ffffff" : fill,
                    stroke: fill,
                  }}
                  transition={{
                    cx: pointEase,
                    cy: pointEase,
                    fill: {
                      duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.45,
                      delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
                    },
                    stroke: {
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

                {!logo && (
                  <motion.text
                    x={x}
                    y={y + 3.2}
                    fontSize="7.5"
                    fontWeight="800"
                    fill="#fff"
                    textAnchor="middle"
                    style={{ pointerEvents: "none" }}
                    animate={{ x, y: y + 3.2 }}
                    transition={pointEase}
                  >
                    {shortName(d.name)}
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Logos: abu-abu = asal Q1, warna = posisi kini */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {visible.map((d) => {
            const logo = contractorLogo(d.name);
            if (!logo || !showTrails) return null;
            const dist = Math.hypot(sx(d.lead) - sx(d.leadQ1), sy(d.sev) - sy(d.sevQ1));
            if (dist < 3) return null;

            const xPct = (sx(d.leadQ1) / 760) * 100;
            const yPct = (sy(d.sevQ1) / 400) * 100;
            const dim = Boolean(active && active !== d.name);
            const size = hero ? 34 : 28;

            return (
              <motion.div
                key={`origin-${d.name}`}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  width: size,
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  zIndex: 0,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: inView ? (dim ? 0.12 : 0.85) : 0,
                  scale: 1,
                }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className="grid place-items-center overflow-hidden rounded-full border-2 border-slate-400 bg-white shadow-sm"
                  style={{ width: size, height: size }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt=""
                    className="h-full w-full object-contain p-[2px] grayscale contrast-125"
                    draggable={false}
                  />
                </div>
                <span className="mt-0.5 rounded bg-white/90 px-1 text-[8px] font-bold leading-none text-slate-500">
                  Q1
                </span>
              </motion.div>
            );
          })}

          {visible.map((d, i) => {
            const logo = contractorLogo(d.name);
            if (!logo) return null;
            const at = pointAt(d);
            const xPct = (sx(at.lead) / 760) * 100;
            const yPct = (sy(at.sev) / 400) * 100;
            const isOn = active === d.name;
            const dim = Boolean(active && !isOn);
            const fill = Q_META[at.q].fill;
            const size = isOn ? logoOn : logoBase;
            const pointEase = {
              duration: reduceMotion ? 0 : mode === "morph" ? MORPH_MS / 1000 : 0.55,
              delay: reduceMotion || mode !== "morph" ? 0 : i * 0.07,
              ease,
            };
            return (
              <motion.div
                key={`logo-${d.name}`}
                className="absolute flex flex-col items-center"
                style={{ zIndex: isOn ? 3 : 1 }}
                initial={false}
                animate={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  marginLeft: -size / 2,
                  marginTop: -size / 2,
                  opacity: inView ? (dim ? 0.22 : 1) : 0,
                }}
                transition={pointEase}
              >
                <div
                  className="grid place-items-center overflow-hidden rounded-full border-[2.5px] bg-white shadow-sm"
                  style={{
                    borderColor: fill,
                    width: size,
                    height: size,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt=""
                    className="h-full w-full object-contain p-[3px]"
                    draggable={false}
                  />
                </div>
                <span className="mt-0.5 rounded bg-white/95 px-1 text-[9px] font-extrabold leading-none text-slate-800 shadow-sm">
                  {siteTag(d.name)}
                </span>
              </motion.div>
            );
          })}
        </div>
        </div>
        </div>

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
                  {contractorLogo(selected.name) && (
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border-2 bg-white"
                      style={{ borderColor: Q_META[selected.q].fill }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={contractorLogo(selected.name)!}
                        alt={selected.name}
                        className="h-full w-full object-contain p-0.5"
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-col gap-1">
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
                Panah menunjuk dari asal Q1 (logo abu-abu) ke posisi Q2 (logo warna) — hover untuk detail Δ
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
      {children ? <div className="min-h-0 min-w-0">{children}</div> : null}
      </div>

    </div>
  );
}
