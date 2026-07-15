"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import { PILLARS, TACTICS } from "../system-defender/tactical/data";
import { TACTIC_CARDS } from "./data";
import PanelA from "./PanelA";
import PanelB from "./PanelB";
import PanelC from "./PanelC";
import PanelD from "./PanelD";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

type TabId = "all-site" | "rapor" | "profile" | "health";

const TABS: {
  id: TabId;
  label: string;
  short: string;
  desc: string;
}[] = [
  {
    id: "all-site",
    label: "Safety Performance All Site YTD 2026",
    short: "All Site YTD",
    desc: "Piramida · HIPO · Komposisi",
  },
  {
    id: "rapor",
    label: "Rapor Mining Kontraktor Q2 2026",
    short: "Rapor Mining",
    desc: "Kuadran · Q1 → Q2",
  },
  {
    id: "profile",
    label: "Profile Insiden Q2 2026",
    short: "Profile Insiden",
    desc: "Core · Support · Tren",
  },
  {
    id: "health",
    label: "Health Management Q2 2026",
    short: "Health Management",
    desc: "Fit to Work · MCU",
  },
];

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SafetyPerformanceSlide({ onBack, onNext }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("all-site");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="sp-slide relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-white text-[color:var(--ink)]">
      <motion.div
        className="pointer-events-none absolute -right-20 -top-24 h-[280px] w-[280px] rounded-full border-[20px] border-[color:var(--green-deep)]/[0.04]"
        aria-hidden
        initial={false}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-4 top-10 h-[180px] w-[180px] rounded-full border border-dashed border-[color:var(--green-mid)]/20"
        aria-hidden
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={reduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col px-3 py-2.5 md:px-5 md:py-3">
        {/* Compact chrome — satu baris */}
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
                  Safety Performance
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="sp-hash-stamp text-[10px] sm:text-[11px]">#SiagaSalingMenjaga</span>
              <BerauCoalLogo height={26} />
            </div>
          </div>

          <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-[color:var(--ink)] md:text-[12px]">
            Performance Q2 2026 masih mencatatkan kejadian berakibat ke pekerja yaitu{" "}
            <strong className="font-semibold text-red-600">2 Medical Treatment Injury</strong> dan{" "}
            <strong className="font-semibold text-red-600">Accident Non Injury +14%</strong>
            . Fokus catatan Mine Contractor (PAMA BMO &amp; GMO) serta perulangan di Support / Maintenance.
          </p>
        </header>

        {/* Slim tabs */}
        <nav className="sp-tabs mt-2 shrink-0 overflow-x-auto" aria-label="Safety Performance tabs">
          <div className="flex min-w-max gap-1.5 md:min-w-0 md:grid md:grid-cols-4">
            {TABS.map((tab) => {
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
                    {String(TABS.findIndex((t) => t.id === tab.id) + 1).padStart(2, "0")}
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

        {/* Body fills remaining viewport */}
        <div className="mt-2 flex min-h-0 flex-1 flex-col">
          <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
              {sidebarOpen ? "Taktik System Defender" : active.short}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSidebarOpen((v) => !v)}
                aria-expanded={sidebarOpen}
                aria-controls="sp-tactic-sidebar"
                className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-[color:var(--ink)] transition hover:border-[color:var(--green-mid)]"
              >
                <span aria-hidden>{sidebarOpen ? "«" : "»"}</span>
                {sidebarOpen ? "Sembunyikan" : "Sidebar"}
              </button>
              {onNext && (
                <button
                  type="button"
                  onClick={onNext}
                  className="border border-[color:var(--green-deep)] bg-[color:var(--green-deep)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-mid)]"
                >
                  Lanjut →
                </button>
              )}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 gap-3 overflow-hidden">
            <AnimatePresence initial={false}>
              {sidebarOpen && (
                <motion.aside
                  id="sp-tactic-sidebar"
                  key="tactic-sidebar"
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="hidden min-h-0 w-[200px] shrink-0 flex-col gap-1.5 overflow-y-auto lg:flex"
                >
                  {TACTIC_CARDS.map((t, i) => (
                    <div
                      key={t.n}
                      className="sp-tac-card flex items-start gap-2 p-2"
                      title={TACTICS[i]?.centerMessage}
                    >
                      <div className="text-lg font-black leading-none opacity-25">{t.n}</div>
                      <div>
                        <div className="text-[11px] font-bold tracking-wide">{t.title}</div>
                        <div className="mt-0.5 text-[9px] leading-snug opacity-85">{t.desc}</div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {PILLARS.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-1 border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-[color:var(--green-mid)]"
                      >
                        <span className="grid h-3.5 w-3.5 place-items-center bg-[color:var(--green-mid)]/10 text-[8px] font-bold">
                          {PILLAR_ICON[p.id]}
                        </span>
                        {p.title}
                      </div>
                    ))}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            <main className="sp-panel-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="h-full min-h-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  {activeTab === "all-site" && <PanelA />}
                  {activeTab === "rapor" && <PanelB />}
                  {activeTab === "profile" && <PanelC />}
                  {activeTab === "health" && <PanelD />}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
