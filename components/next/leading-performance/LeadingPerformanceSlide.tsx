"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import { PILLARS, TACTICS } from "../system-defender/tactical/data";
import { TACTIC_CARDS } from "../safety-performance/data";
import { LEADING_QUOTE } from "./data";
import PanelLeading from "./PanelLeading";
import PanelHighlightGrTbc from "./PanelHighlightGrTbc";
import PanelHighlightGap from "./PanelHighlightGap";
import PanelImprovementTeknologi from "./PanelImprovementTeknologi";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type TabId = "leading" | "highlight-gr-tbc" | "highlight-gap" | "improvement-tech";

const TABS: {
  id: TabId;
  label: string;
  short: string;
  desc: string;
}[] = [
  {
    id: "leading",
    label: "Leading · Supervisor Accountability",
    short: "Leading",
    desc: "People · Process · Technology",
  },
  {
    id: "highlight-gr-tbc",
    label: "Highlight GR & TBC",
    short: "Highlight GR",
    desc: "Dokumentasi temuan lapangan",
  },
  {
    id: "highlight-gap",
    label: "Highlight Gap Leading Performance Q2",
    short: "Highlight Gap",
    desc: "Gap per pilar · Catatan Q2",
  },
  {
    id: "improvement-tech",
    label: "Improvement Teknologi",
    short: "Improvement",
    desc: "BeARC · Rule-based Trigger",
  },
];

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

export default function LeadingPerformanceSlide({ onBack, onNext }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("leading");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="sp-slide lp-slide min-h-screen bg-[#f9fafb] text-[color:var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[auto_1fr_auto] md:gap-6"
        >
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="mr-1 rounded-lg border border-slate-200 px-2.5 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-800"
              >
                ←
              </button>
            )}
            <div
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full shadow-md"
              style={{ background: "radial-gradient(circle at 30% 30%, var(--green-mid), var(--green-deep))" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-bold tracking-[0.12em] text-[color:var(--green-mid)]">
                DIVISI · SYSTEM DEFENDER
              </div>
              <div className="max-w-[220px] text-[11px] text-[color:var(--ink-soft)]">
                Menjaga sistem, agar operasi tetap maju, aman, dan produktif
              </div>
            </div>
          </div>

          <div className="order-3 text-center md:order-2">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              HSECM Tingkat I · Q2 2026
            </div>
            <h1 className="mt-1 font-heading text-xl font-black leading-tight text-[color:var(--ink)] md:text-2xl lg:text-[28px]">
              Leading Performance
            </h1>
            <p className="mt-1 text-[12px] text-[color:var(--ink-soft)]">{active.label}</p>
          </div>

          <div className="order-2 flex items-center justify-end gap-3 md:order-3">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-md">
              #SiagaSalingMenjaga
            </span>
            <div className="border-l border-slate-200 pl-3">
              <BerauCoalLogo height={36} />
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-4 rounded-xl border border-slate-200 border-l-4 border-l-[color:var(--green-mid)] bg-white p-4 pl-5 shadow-sm"
        >
          <p className="text-[13px] italic leading-relaxed text-[color:var(--ink)] md:text-sm">
            &ldquo;{LEADING_QUOTE}&rdquo;
          </p>
        </motion.div>

        <nav
          className="sp-tabs mt-5 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
          aria-label="Leading Performance tabs"
        >
          <div className="flex min-w-max gap-1 md:min-w-0 md:grid md:grid-cols-4">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sp-tab relative rounded-lg px-3 py-2.5 text-left transition ${
                    isActive
                      ? "bg-[color:var(--green-deep)] text-white shadow-sm"
                      : "text-[color:var(--green-deep)] hover:bg-emerald-50/60"
                  }`}
                >
                  <div className={`text-[12px] font-bold leading-snug md:text-[13px] ${isActive ? "text-white" : ""}`}>
                    <span className="md:hidden">{tab.short}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </div>
                  <div
                    className={`mt-0.5 text-[10px] leading-snug ${
                      isActive ? "text-white/75" : "text-[color:var(--ink-soft)]"
                    }`}
                  >
                    {tab.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-3"
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
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[color:var(--green-mid)]"
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-[color:var(--green-mid)]/10 text-[9px] font-bold">
                    {PILLAR_ICON[p.id]}
                  </span>
                  {p.title}
                </div>
              ))}
            </div>
          </motion.aside>

          <main className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                {activeTab === "leading" && <PanelLeading />}
                {activeTab === "highlight-gr-tbc" && <PanelHighlightGrTbc />}
                {activeTab === "highlight-gap" && <PanelHighlightGap />}
                {activeTab === "improvement-tech" && <PanelImprovementTeknologi />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <footer className="mt-6 flex flex-col items-center gap-3 py-4 text-center text-[11px] text-[color:var(--ink-soft)]">
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-[color:var(--green-deep)] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[color:var(--green-mid)]"
            >
              Lanjut: Pengendalian Risiko Rekayasa →
            </button>
          )}
          <div>
            <span className="inline-flex items-center gap-2">
              <BerauCoalLogo height={18} />
              <span>· HSECM Tingkat I · Q2 2026 ·</span>
            </span>{" "}
            <span className="font-semibold text-[color:var(--green-mid)]">#SiagaSalingMenjaga</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
