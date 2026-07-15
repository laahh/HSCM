"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import TacticSidebarLayout from "../TacticSidebarLayout";
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

export default function LeadingPerformanceSlide({ onBack, onNext }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("leading");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="sp-slide lp-slide relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-white text-[color:var(--ink)]">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-[280px] w-[280px] rounded-full border-[20px] border-[color:var(--green-deep)]/[0.04]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-4 top-10 h-[180px] w-[180px] rounded-full border border-dashed border-[color:var(--green-mid)]/20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col px-3 py-2.5 md:px-5 md:py-3">
        <header className="shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div className="flex min-w-0 items-center gap-2.5">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-[11px] font-semibold text-[color:var(--ink-soft)] transition hover:text-[color:var(--green-deep)]"
                  aria-label="Kembali"
                >
                  ←
                </button>
              )}
              <div className="leading-tight">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-mid)]">
                  System Defender · HSECM Q2 2026
                </p>
                <h1 className="font-heading text-lg font-extrabold tracking-tight text-[color:var(--ink)] sm:text-xl md:text-[1.35rem]">
                  Leading Performance
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="sp-hash-stamp text-[10px] sm:text-[11px]">#SiagaSalingMenjaga</span>
              <BerauCoalLogo height={26} />
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-[color:var(--ink)] md:text-[12px]">
            {LEADING_QUOTE}
          </p>
        </header>

        <nav className="sp-tabs mt-2 shrink-0 overflow-x-auto" aria-label="Leading Performance tabs">
          <div className="flex min-w-max gap-1.5 md:min-w-0 md:grid md:grid-cols-4">
            {TABS.map((tab, i) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sp-tab flex items-center gap-2 border px-2.5 py-1.5 text-left transition-colors ${
                    isActive
                      ? "border-[color:var(--green-deep)] bg-[color:var(--green-deep)] text-white"
                      : "border-slate-200 bg-white text-[color:var(--ink-soft)] hover:border-[color:var(--green-mid)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  <span
                    className={`font-heading text-[12px] font-extrabold leading-none ${
                      isActive ? "text-white/50" : "text-[color:var(--green-mid)]/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold leading-tight md:text-[12px]">
                      <span className="md:hidden">{tab.short}</span>
                      <span className="hidden md:inline">{tab.label}</span>
                    </span>
                    <span
                      className={`mt-0.5 hidden text-[9px] leading-none sm:block ${
                        isActive ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {tab.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <TacticSidebarLayout
          className="mt-2"
          fill
          defaultOpen={false}
          openLabel="Taktik System Defender"
          closedLabel={active.short}
          actions={
            onNext ? (
              <button
                type="button"
                onClick={onNext}
                className="border border-[color:var(--green-deep)] bg-[color:var(--green-deep)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-mid)]"
              >
                Lanjut →
              </button>
            ) : null
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="h-full min-h-0"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === "leading" && <PanelLeading />}
              {activeTab === "highlight-gr-tbc" && <PanelHighlightGrTbc />}
              {activeTab === "highlight-gap" && <PanelHighlightGap />}
              {activeTab === "improvement-tech" && <PanelImprovementTeknologi />}
            </motion.div>
          </AnimatePresence>
        </TacticSidebarLayout>
      </div>
    </div>
  );
}
