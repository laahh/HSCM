"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CountUp } from "./CountUp";

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
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="lp-panel flex flex-col overflow-hidden rounded-[10px] border border-[color:var(--green-line)] bg-white"
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
