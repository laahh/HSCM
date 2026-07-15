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

const DOTS = [
  "var(--dot-1)",
  "var(--dot-2)",
  "var(--dot-3)",
  "var(--dot-4)",
  "var(--dot-5)",
  "var(--dot-6)",
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function SafetyPerformanceSlide({ onBack, onNext }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("all-site");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const reduceMotion = useReducedMotion();

  return (
    <div className="sp-slide relative min-h-screen overflow-hidden bg-white text-[color:var(--ink)]">
      {/* Atmosphere rings */}
      <motion.div
        className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full border-[28px] border-[color:var(--green-deep)]/[0.05]"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <motion.div
        className="pointer-events-none absolute -right-8 top-16 h-[280px] w-[280px] rounded-full border border-dashed border-[color:var(--green-mid)]/25"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0, rotate: -40 }}
        animate={
          reduceMotion
            ? { opacity: 1, rotate: 0 }
            : { opacity: 1, rotate: 360 }
        }
        transition={
          reduceMotion
            ? { duration: 0.4 }
            : { rotate: { duration: 48, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.8 } }
        }
      />
      <motion.div
        className="pointer-events-none absolute right-28 top-40 h-16 w-16 rounded-full border border-[color:var(--green-mid)]/15"
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-5 md:px-6 md:py-6">
        <header>
          {/* Utility row */}
          <motion.div
            className="flex flex-wrap items-center justify-between gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-[12px] font-semibold text-[color:var(--ink-soft)] transition hover:text-[color:var(--green-deep)]"
                  aria-label="Kembali"
                >
                  ← Kembali
                </button>
              )}
              <span className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
              <div className="leading-tight">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--green-mid)]">
                  System Defender
                </p>
                <p className="text-[11px] text-[color:var(--ink-soft)]">
                  Divisi · Operasi aman &amp; produktif
                </p>
              </div>
            </div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45, ease: EASE }}
            >
              <BerauCoalLogo height={34} />
            </motion.div>
          </motion.div>

          {/* Title + stamp */}
          <div className="mt-7 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <div className="mb-4 flex gap-2">
                {DOTS.map((c, i) => (
                  <motion.span
                    key={c}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: c }}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: EASE }}
                    whileHover={reduceMotion ? undefined : { scale: 1.35, y: -2 }}
                  />
                ))}
              </div>

              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
              >
                HSECM Tingkat I · Q2 2026
              </motion.p>

              <h1 className="mt-2 overflow-hidden font-heading text-[clamp(2.1rem,4.2vw,3.4rem)] font-extrabold leading-[0.92] tracking-tight text-[color:var(--ink)]">
                {["Safety", "Performance"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="mr-[0.28em] inline-block"
                    initial={reduceMotion ? false : { opacity: 0, y: "110%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.55, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="mt-2 text-[13px] text-[color:var(--ink-soft)]"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                {active.label}
              </motion.p>
            </div>

            {/* Stamp cluster with orbit */}
            <div className="relative flex shrink-0 items-center justify-end self-end pb-2 pt-1 lg:self-start lg:pt-4">
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-red-600/20"
                aria-hidden
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-3 rounded-full border border-red-600/10"
                aria-hidden
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="sp-hash-stamp relative text-[12px] md:text-[13px]"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.35, rotate: -24 }}
                animate={
                  reduceMotion
                    ? { opacity: 1, rotate: -8 }
                    : {
                        opacity: 1,
                        scale: [1.35, 0.94, 1],
                        rotate: [-24, -6, -8],
                      }
                }
                transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
                whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: -4 }}
              >
                #SiagaSalingMenjaga
              </motion.span>
            </div>
          </div>

          <motion.p
            className="mt-6 max-w-4xl font-body text-[13px] leading-[1.7] text-[color:var(--ink)] md:text-[14px]"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: EASE }}
          >
            Performance Q2 2026 masih mencatatkan terdapatnya kejadian berakibat ke pekerja yaitu{" "}
            <motion.strong
              className="inline-block font-semibold text-red-600"
              initial={reduceMotion ? false : { backgroundColor: "rgba(220,38,38,0.12)" }}
              animate={{ backgroundColor: "rgba(220,38,38,0)" }}
              transition={{ delay: 1.1, duration: 1.2 }}
            >
              2 Medical Treatment Injury
            </motion.strong>{" "}
            dan{" "}
            <motion.strong
              className="inline-block font-semibold text-red-600"
              initial={reduceMotion ? false : { backgroundColor: "rgba(220,38,38,0.12)" }}
              animate={{ backgroundColor: "rgba(220,38,38,0)" }}
              transition={{ delay: 1.35, duration: 1.2 }}
            >
              Accident Non Injury meningkat 14%
            </motion.strong>
            . Peningkatan 11% kejadian pada Mitra Kerja Mine Contractor baik pada Aktivitas Core &amp; Support,
            terutama catatan kejadian di PAMA, baik PAMA BMO dan PAMA GMO. Terdapat perulangan Insiden pada
            Aktivitas Support terutama di Area Pit Service &amp; Maintenance.
          </motion.p>
        </header>

        <nav className="sp-tabs mt-7 overflow-x-auto" aria-label="Safety Performance tabs">
          <div className="flex min-w-max gap-2 md:min-w-0 md:grid md:grid-cols-4 md:gap-3">
            {TABS.map((tab, i) => {
              const isActive = tab.id === activeTab;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.07, duration: 0.4, ease: EASE }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  className={`sp-tab group flex items-start gap-2.5 border px-3 py-3 text-left transition-colors ${
                    isActive
                      ? "border-[color:var(--green-deep)] bg-[color:var(--green-deep)] text-white"
                      : "border-slate-200 bg-white text-[color:var(--ink-soft)] hover:border-[color:var(--green-mid)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  <span
                    className={`mt-0.5 font-heading text-[15px] font-extrabold leading-none ${
                      isActive ? "text-white/50" : "text-[color:var(--green-mid)]/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold leading-snug md:text-[13px]">
                      <span className="md:hidden">{tab.short}</span>
                      <span className="hidden md:inline">{tab.label}</span>
                    </span>
                    <span className={`mt-0.5 block text-[10px] leading-snug ${isActive ? "text-white/70" : "text-slate-400"}`}>
                      {tab.desc}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Body */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
            {sidebarOpen ? "Taktik System Defender" : active.short}
          </p>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            aria-controls="sp-tactic-sidebar"
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
                id="sp-tactic-sidebar"
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
            )}
          </AnimatePresence>

          <main className="min-w-0 flex-1">
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
