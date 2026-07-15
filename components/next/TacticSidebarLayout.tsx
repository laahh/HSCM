"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PILLARS, TACTICS } from "./system-defender/tactical/data";
import { TACTIC_CARDS } from "./safety-performance/data";

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  /** Label when sidebar is open */
  openLabel?: string;
  /** Label when sidebar is closed */
  closedLabel?: string;
  children: ReactNode;
  className?: string;
};

/** Shared tactic sidebar with hide/show — content expands when closed */
export default function TacticSidebarLayout({
  openLabel = "Taktik System Defender",
  closedLabel = "Konten penuh",
  children,
  className = "",
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
          {sidebarOpen ? openLabel : closedLabel}
        </p>
        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-expanded={sidebarOpen}
          aria-controls="tactic-sidebar-panel"
          className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold tracking-wide text-[color:var(--ink)] transition hover:border-[color:var(--green-mid)] hover:text-[color:var(--green-deep)]"
        >
          <span aria-hidden className="font-heading text-[12px]">
            {sidebarOpen ? "«" : "»"}
          </span>
          {sidebarOpen ? "Sembunyikan sidebar" : "Tampilkan sidebar"}
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-5 lg:flex-row">
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              id="tactic-sidebar-panel"
              key="tactic-sidebar"
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="space-y-3 lg:w-[260px] lg:shrink-0"
            >
              <div className="space-y-2.5">
                {TACTIC_CARDS.map((t, i) => (
                  <div
                    key={t.n}
                    className="sp-tac-card flex items-start gap-3 p-3.5"
                    title={TACTICS[i]?.centerMessage}
                  >
                    <div className="text-2xl font-black leading-none opacity-25">{t.n}</div>
                    <div>
                      <div className="text-[13px] font-bold tracking-wide">{t.title}</div>
                      <div className="mt-1 text-[11px] leading-snug opacity-85">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {PILLARS.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1.5 border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[color:var(--green-mid)]"
                  >
                    <span className="grid h-4 w-4 place-items-center bg-[color:var(--green-mid)]/10 text-[9px] font-bold">
                      {PILLAR_ICON[p.id]}
                    </span>
                    {p.title}
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
