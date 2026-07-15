"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { CountUp } from "./CountUp";
import { useInView } from "../safety-performance/useInView";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const pillarStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const pillarItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function Panel({
  title,
  subtitle,
  tone = "green",
  delay = 0,
  children,
}: {
  title: string;
  subtitle: string;
  tone?: "green" | "gold";
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
      className="lp-panel flex flex-col overflow-hidden rounded-[12px] border border-[color:var(--green-line)] bg-white shadow-sm"
    >
      <header
        className={`flex flex-col gap-0.5 px-4 py-3 ${
          tone === "gold"
            ? "bg-[color:var(--gold-bright)] text-[color:var(--ink)]"
            : "bg-[color:var(--green-deep)] text-white"
        }`}
      >
        <div className="text-sm font-bold uppercase tracking-wide">{title}</div>
        <div className="text-[11px] font-normal opacity-90">{subtitle}</div>
      </header>
      <div className="flex-1 space-y-4 p-4">{children}</div>
    </motion.article>
  );
}

/** 4-pillar board column — cover face flips open to reveal data */
export type PillarTone = "accountability" | "people" | "process" | "technology";

const PILLAR_THEME: Record<
  PillarTone,
  {
    front: string;
    header: string;
    accent: string;
    chip: string;
    hint: string;
    icon: string;
  }
> = {
  accountability: {
    front: "#166534",
    header: "#166534",
    accent: "#166534",
    chip: "bg-white/15 text-white ring-white/25",
    hint: "Klik untuk melihat data",
    icon: "SA",
  },
  people: {
    front: "#c2410c",
    header: "#c2410c",
    accent: "#c2410c",
    chip: "bg-white/15 text-white ring-white/25",
    hint: "Klik untuk melihat data",
    icon: "PE",
  },
  process: {
    front: "#3730a3",
    header: "#3730a3",
    accent: "#3730a3",
    chip: "bg-white/15 text-white ring-white/25",
    hint: "Klik untuk melihat data",
    icon: "PR",
  },
  technology: {
    front: "#0369a1",
    header: "#0369a1",
    accent: "#0369a1",
    chip: "bg-white/15 text-white ring-white/25",
    hint: "Klik untuk melihat data",
    icon: "TE",
  },
};

export function PillarColumn({
  title,
  tone = "accountability",
  delay = 0,
  children,
  footer,
}: {
  title: string;
  tone?: PillarTone;
  delay?: number;
  children: ReactNode;
  footer: ReactNode;
}) {
  const [flipped, setFlipped] = useState(false);
  const theme = PILLAR_THEME[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.45, delay, ease: easeOut }}
      className="lp-flip-scene min-h-[min(68vh,540px)]"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="lp-flip-card relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* FRONT — title cover */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-label={`Buka ${title}`}
          className="lp-flip-face absolute inset-0 flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200/80 text-left shadow-sm outline-none transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-slate-400/40"
          style={{
            background: theme.front,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: flipped ? "none" : "auto",
          }}
        >
          <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-4 px-5 py-8">
            <span
              className={`grid h-14 w-14 place-items-center rounded-xl text-base font-black tracking-wide ring-1 ${theme.chip}`}
            >
              {theme.icon}
            </span>
            <div className="text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Leading
              </div>
              <h3 className="mt-2 font-heading text-xl font-black leading-tight text-white md:text-[22px]">
                {title}
              </h3>
            </div>
            <span className="mt-1 rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-white/90">
              {theme.hint}
            </span>
          </div>
        </button>

        {/* BACK — data */}
        <div
          className="lp-flip-face absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            pointerEvents: flipped ? "auto" : "none",
          }}
        >
          <header
            className="relative flex shrink-0 items-center justify-between gap-2 px-3 py-2.5"
            style={{ background: theme.header }}
          >
            <div className="text-[12px] font-bold tracking-[0.04em] text-white md:text-[13px]">
              {title}
            </div>
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="rounded-md border border-white/25 bg-white/10 px-2 py-0.5 text-[9px] font-bold text-white/90 transition hover:bg-white/20"
              aria-label="Tutup data"
            >
              Tutup
            </button>
          </header>

          {flipped && (
            <motion.div
              key="pillar-body"
              className="lp-scroll-hidden flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-2.5 md:p-3"
              variants={pillarStagger}
              initial="hidden"
              animate="show"
            >
              {children}
              <motion.div
                variants={pillarItem}
                className="lp-footer-box mt-auto pl-3.5 text-[10px] leading-snug text-[color:var(--ink)] md:text-[11px]"
              >
                {footer}
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PillarBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={pillarItem} className={className}>
      {children}
    </motion.div>
  );
}

export function KpiSimple({
  label,
  from,
  to,
  fromSuffix = "",
  toSuffix = "",
  decimals = 0,
  toTone = "neutral",
  showMeter = false,
  meterMax = 100,
}: {
  label: string;
  from: number;
  to: number;
  fromSuffix?: string;
  toSuffix?: string;
  decimals?: number;
  toTone?: "good" | "bad" | "neutral";
  showMeter?: boolean;
  meterMax?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const toneClass = {
    good: "text-emerald-700",
    bad: "text-red-600",
    neutral: "text-[color:var(--ink)]",
  };
  const meterColor =
    toTone === "good" ? "var(--green-mid)" : toTone === "bad" ? "#dc2626" : "var(--green-deep)";
  const delta = to - from;
  const deltaLabel =
    Math.abs(delta) < 0.05
      ? "stabil"
      : `${delta > 0 ? "↑" : "↓"} ${Math.abs(delta).toFixed(decimals)}${toSuffix || ""}`;

  return (
    <div ref={ref} className="lp-metric-card">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[11px] font-bold text-[color:var(--green-deep)]">{label}</div>
        <span
          className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
            toTone === "good"
              ? "bg-emerald-50 text-emerald-700"
              : toTone === "bad"
                ? "bg-red-50 text-red-600"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {deltaLabel}
        </span>
      </div>
      <div className="mt-1 flex flex-wrap items-end gap-1.5">
        <CountUp
          className="font-heading text-[22px] font-black tabular-nums text-slate-700 md:text-[24px]"
          from={from}
          to={from}
          suffix={fromSuffix}
          decimals={decimals}
        />
        <span className="pb-1 text-slate-300">→</span>
        <CountUp
          className={`font-heading text-[22px] font-black tabular-nums md:text-[24px] ${toneClass[toTone]}`}
          from={from}
          to={to}
          suffix={toSuffix}
          decimals={decimals}
        />
      </div>
      {showMeter && (
        <div className="lp-meter-track mt-2">
          <div
            className="lp-meter-fill"
            style={{
              width: `${Math.min(100, (to / meterMax) * 100)}%`,
              background: meterColor,
              transform: inView ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
            }}
          />
        </div>
      )}
    </div>
  );
}

export function SectionLabel({ children, danger }: { children: ReactNode; danger?: boolean }) {
  return (
    <div
      className={`mb-1 text-[10px] font-semibold uppercase tracking-wide ${
        danger ? "text-red-600" : "text-[color:var(--ink)]"
      }`}
    >
      {children}
    </div>
  );
}

type Chip = string | { name: string; tip?: string; warn?: boolean };

export function PartnerChips({ items }: { items: Chip[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => {
        const name = typeof item === "string" ? item : item.name;
        const tip = typeof item === "string" ? undefined : item.tip;
        const warn = typeof item === "string" ? true : Boolean(item.warn ?? true);
        return (
          <li
            key={name}
            title={tip}
            className={`rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
              warn
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[color:var(--green-line)] bg-[color:var(--paper-soft,#f5f8f5)] text-[color:var(--ink)]"
            }`}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
}

export function TrendPill({
  tone,
  children,
}: {
  tone: "up-good" | "down-good" | "up-bad" | "down-bad";
  children: ReactNode;
}) {
  const good = tone === "up-good" || tone === "down-good";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-semibold ${
        good
          ? "bg-emerald-50 text-[color:var(--green-deep)]"
          : "bg-red-50 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}

export function Narrative({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-r border-l-2 border-[color:var(--green-line)] bg-[color:var(--paper-soft,#f5f8f5)] px-2.5 py-1.5 text-[11.5px] leading-relaxed text-[color:var(--ink-soft)]">
      {children}
    </div>
  );
}

export function KpiRow({
  from,
  to,
  fromSuffix = "",
  toSuffix = "",
  decimals = 0,
  fromTone = "neutral",
  toTone = "good",
  pill,
}: {
  from: number;
  to: number;
  fromSuffix?: string;
  toSuffix?: string;
  decimals?: number;
  fromTone?: "good" | "bad" | "neutral";
  toTone?: "good" | "bad" | "neutral";
  pill: ReactNode;
}) {
  const toneClass = {
    good: "text-[color:var(--green-deep)]",
    bad: "text-red-600",
    neutral: "text-[color:var(--ink)]",
  };
  return (
    <div className="flex flex-wrap items-end gap-3">
      <CountUp
        className={`lp-kpi ${toneClass[fromTone]}`}
        from={from}
        to={from}
        suffix={fromSuffix}
        decimals={decimals}
      />
      <span className="pb-1 text-lg text-[color:var(--ink-soft)]">→</span>
      <CountUp
        className={`lp-kpi ${toneClass[toTone]}`}
        from={from}
        to={to}
        suffix={toSuffix}
        decimals={decimals}
      />
      {pill}
    </div>
  );
}

export function TacticGlyph({ kind }: { kind: "shape" | "direct" | "intercept" }) {
  if (kind === "shape") {
    return (
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden className="lp-tactic-breathe">
        <rect x="2" y="2" width="66" height="66" rx="6" stroke="var(--green-mid)" strokeDasharray="3 2" fill="rgba(31,138,68,0.08)" />
        <circle cx="35" cy="20" r="4" fill="var(--green-deep)" />
        <circle cx="20" cy="38" r="4" fill="var(--green-deep)" />
        <circle cx="50" cy="38" r="4" fill="var(--green-deep)" />
        <circle cx="35" cy="52" r="4" fill="var(--green-deep)" />
        <path d="M35 20 L20 38 M35 20 L50 38 M20 38 L35 52 M50 38 L35 52" stroke="var(--green-mid)" strokeWidth="1" />
      </svg>
    );
  }
  if (kind === "direct") {
    return (
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden className="lp-tactic-breathe">
        <rect x="2" y="2" width="66" height="66" rx="6" stroke="var(--green-mid)" strokeDasharray="3 2" fill="rgba(31,138,68,0.08)" />
        <circle cx="15" cy="35" r="4" fill="var(--green-deep)" />
        <circle cx="30" cy="25" r="4" fill="var(--green-deep)" />
        <circle cx="30" cy="45" r="4" fill="var(--green-deep)" />
        <circle cx="50" cy="35" r="5" fill="var(--green-mid)" />
        <path d="M19 35 L45 35 M34 28 L45 35 L34 42" stroke="var(--green-mid)" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden className="lp-tactic-breathe">
      <rect x="2" y="2" width="66" height="66" rx="6" stroke="var(--green-mid)" strokeDasharray="3 2" fill="rgba(31,138,68,0.08)" />
      <circle cx="20" cy="50" r="4" fill="var(--green-deep)" />
      <circle cx="35" cy="35" r="4" fill="var(--green-deep)" />
      <circle cx="50" cy="20" r="5" fill="var(--green-mid)" />
      <path d="M20 50 L50 20" stroke="#d92b2b" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="50" cy="20" r="9" stroke="var(--green-mid)" strokeWidth="1" fill="none" />
    </svg>
  );
}
