"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    desc: "Piramida · HIPO · Komposisi Kejadian",
  },
  {
    id: "rapor",
    label: "Rapor Mining Kontraktor Q2 2026",
    short: "Rapor Mining",
    desc: "Kuadran · Pergerakan Q1 → Q2",
  },
  {
    id: "profile",
    label: "Profile Insiden Q2 2026",
    short: "Profile Insiden",
    desc: "Core vs Support · Tren · Insiden Berulang",
  },
  {
    id: "health",
    label: "Health Management Q2 2026",
    short: "Health Management",
    desc: "Fit to Work · Hasil MCU",
  },
];

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

export default function SafetyPerformanceSlide({ onBack, onNext }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("all-site");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <div className="sp-slide min-h-screen bg-white text-[color:var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        {/* Masthead — one composition, no twin cards */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[color:var(--green-line)] pb-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="grid h-8 w-8 place-items-center border border-slate-200 text-[13px] text-slate-500 transition hover:border-[color:var(--green-mid)] hover:text-[color:var(--green-deep)]"
                  aria-label="Kembali"
                >
                  ←
                </button>
              )}
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--green-mid)]">
                  Divisi · System Defender
                </p>
                <p className="mt-0.5 max-w-[280px] text-[11px] text-[color:var(--ink-soft)]">
                  Menjaga sistem agar operasi tetap maju, aman, dan produktif
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] font-bold tracking-wide text-red-600">
                #SiagaSalingMenjaga
              </span>
              <div className="h-7 w-px bg-slate-200" aria-hidden />
              <BerauCoalLogo height={32} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:mt-7 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">
                HSECM Tingkat I · Q2 2026
              </p>
              <h1 className="mt-1.5 font-heading text-[1.75rem] font-extrabold leading-[1.05] tracking-tight text-[color:var(--ink)] sm:text-3xl lg:text-[2.35rem]">
                Safety Performance
              </h1>
            </div>
            <p className="max-w-md border-l-2 border-[color:var(--green-mid)] pl-3 text-[12px] leading-snug text-[color:var(--ink-soft)] md:text-right md:border-l-0 md:border-r-2 md:pl-0 md:pr-3">
              {active.label}
            </p>
          </div>
        </motion.header>

        {/* Briefing — asymmetric: key signals + narrative */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="mt-5 grid grid-cols-1 gap-5 border-b border-[color:var(--green-line)] pb-5 md:grid-cols-[140px_1fr] md:gap-8"
          aria-label="Ringkasan kinerja Q2"
        >
          <div className="flex gap-4 md:flex-col md:gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
                Fokus Q2
              </p>
              <p className="mt-1 font-heading text-2xl font-extrabold leading-none text-red-600">2</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
                Medical Treatment Injury
              </p>
            </div>
            <div className="w-px bg-slate-200 md:hidden" aria-hidden />
            <div className="hidden h-px w-10 bg-slate-200 md:block" aria-hidden />
            <div>
              <p className="font-heading text-2xl font-extrabold leading-none text-red-600">+14%</p>
              <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
                Accident Non Injury
              </p>
            </div>
          </div>

          <p className="font-body text-[13px] leading-[1.65] text-[color:var(--ink)] md:text-sm">
            Performance Q2 2026 masih mencatatkan terdapatnya kejadian berakibat ke pekerja yaitu{" "}
            <strong className="font-semibold text-red-600">2 Medical Treatment Injury</strong> dan{" "}
            <strong className="font-semibold text-red-600">Accident Non Injury meningkat 14%</strong>.
            Peningkatan 11% kejadian pada Mitra Kerja Mine Contractor baik pada Aktivitas Core &amp; Support,
            terutama catatan kejadian di PAMA, baik PAMA BMO dan PAMA GMO. Terdapat perulangan Insiden pada
            Aktivitas Support terutama di Area Pit Service &amp; Maintenance.
          </p>
        </motion.section>

        {/* Tabs — underline rail, not another card */}
        <nav className="sp-tabs mt-5 overflow-x-auto border-b border-slate-200" aria-label="Safety Performance tabs">
          <div className="flex min-w-max gap-0 md:min-w-0 md:grid md:grid-cols-4">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`sp-tab relative px-3 py-3 text-left transition ${
                    isActive
                      ? "text-[color:var(--green-deep)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[color:var(--green-deep)]"
                      : "text-[color:var(--ink-soft)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  <div className={`text-[12px] font-bold leading-snug md:text-[13px]`}>
                    <span className="md:hidden">{tab.short}</span>
                    <span className="hidden md:inline">{tab.label}</span>
                  </div>
                  <div className={`mt-0.5 text-[10px] leading-snug ${isActive ? "text-[color:var(--ink-soft)]" : "text-slate-400"}`}>
                    {tab.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Body */}
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
                {activeTab === "all-site" && <PanelA />}
                {activeTab === "rapor" && <PanelB />}
                {activeTab === "profile" && <PanelC />}
                {activeTab === "health" && <PanelD />}
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
              Lanjut: Leading Performance →
            </button>
          )}
          <div>
            <span className="inline-flex items-center gap-2">
              <BerauCoalLogo height={18} />
              <span>· HSECM Tingkat I · Q2 2026 ·</span>
            </span>{" "}
            <span className="font-semibold text-red-600">#SiagaSalingMenjaga</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
