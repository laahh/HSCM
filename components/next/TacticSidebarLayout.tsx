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
  openLabel?: string;
  closedLabel?: string;
  children: ReactNode;
  className?: string;
  /** Start closed (more content width) */
  defaultOpen?: boolean;
  /** Fill remaining viewport height */
  fill?: boolean;
  /** Allow content area to scroll (default true when fill) */
  contentScroll?: boolean;
  /** Extra toolbar actions (e.g. Next button) */
  actions?: ReactNode;
};

/** Shared tactic sidebar with hide/show — content expands when closed */
export default function TacticSidebarLayout({
  openLabel = "Taktik System Defender",
  closedLabel = "Konten penuh",
  children,
  className = "",
  defaultOpen = true,
  fill = false,
  contentScroll = true,
  actions,
}: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className={`${fill ? "flex min-h-0 flex-1 flex-col" : ""} ${className}`}>
      <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
          {sidebarOpen ? openLabel : closedLabel}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            aria-controls="tactic-sidebar-panel"
            className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-[color:var(--ink)] transition hover:border-[color:var(--green-mid)] hover:text-[color:var(--green-deep)]"
          >
            <span aria-hidden className="font-heading text-[11px]">
              {sidebarOpen ? "«" : "»"}
            </span>
            {sidebarOpen ? "Sembunyikan" : "Sidebar"}
          </button>
          {actions}
        </div>
      </div>

      <div className={`flex gap-3 ${fill ? "min-h-0 flex-1 overflow-hidden" : "mt-3 flex-col lg:flex-row"} ${fill ? "flex-col lg:flex-row" : ""}`}>
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              id="tactic-sidebar-panel"
              key="tactic-sidebar"
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={
                fill
                  ? "hidden min-h-0 w-[200px] shrink-0 flex-col gap-1.5 overflow-y-auto lg:flex"
                  : "space-y-2.5 lg:w-[260px] lg:shrink-0"
              }
            >
              <div className={fill ? "space-y-1.5" : "space-y-2.5"}>
                {TACTIC_CARDS.map((t, i) => (
                  <div
                    key={t.n}
                    className={`sp-tac-card flex items-start gap-2 ${fill ? "p-2" : "gap-3 p-3.5"}`}
                    title={TACTICS[i]?.centerMessage}
                  >
                    <div className={`font-black leading-none opacity-25 ${fill ? "text-lg" : "text-2xl"}`}>
                      {t.n}
                    </div>
                    <div>
                      <div className={`font-bold tracking-wide ${fill ? "text-[11px]" : "text-[13px]"}`}>
                        {t.title}
                      </div>
                      <div className={`mt-0.5 leading-snug opacity-85 ${fill ? "text-[9px]" : "text-[11px]"}`}>
                        {t.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1 pt-0.5">
                {PILLARS.map((p) => (
                  <div
                    key={p.id}
                    className={`flex items-center gap-1 border border-slate-200 bg-white font-semibold text-[color:var(--green-mid)] ${
                      fill ? "px-1.5 py-0.5 text-[9px]" : "gap-1.5 px-2.5 py-1.5 text-[11px]"
                    }`}
                  >
                    <span
                      className={`grid place-items-center bg-[color:var(--green-mid)]/10 font-bold ${
                        fill ? "h-3.5 w-3.5 text-[8px]" : "h-4 w-4 text-[9px]"
                      }`}
                    >
                      {PILLAR_ICON[p.id]}
                    </span>
                    {p.title}
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <div
          className={`min-w-0 flex-1 ${
            fill
              ? contentScroll
                ? "sp-panel-scroll min-h-0 overflow-y-auto overflow-x-hidden"
                : "min-h-0 overflow-hidden"
              : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
