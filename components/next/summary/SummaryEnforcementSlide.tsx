"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import { PILLARS, TACTICS } from "../system-defender/tactical/data";
import { TACTIC_CARDS } from "../safety-performance/data";
import { ENFORCEMENT, SUMMARY_CARDS, type SummaryCard } from "./data";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

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

function ThemeIcon({ title }: { title: string }) {
  const stroke = "currentColor";
  if (title === "LEADERSHIP") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
      </svg>
    );
  }
  if (title === "PEOPLE") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16" cy="9" r="2" />
        <path d="M3 19v-1a4 4 0 0 1 4-4h3" />
        <path d="M12 19v-1a3.5 3.5 0 0 1 3.5-3.5H18" />
      </svg>
    );
  }
  if (title === "PROCESS") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

function MetricDelta({ m }: { m: SummaryCard["metrics"][number] }) {
  if (m.note) {
    return (
      <span className={`text-[14px] font-extrabold leading-none ${m.bad ? "text-red-600" : "text-[color:var(--ink)]"}`}>
        {m.note}
      </span>
    );
  }
  return (
    <span className="inline-flex items-baseline gap-1 font-heading tabular-nums leading-none">
      <span className="text-[13px] font-semibold text-slate-500">{m.from}</span>
      <span className="text-[11px] text-slate-300">→</span>
      <span className={`text-[16px] font-extrabold ${m.bad ? "text-red-600" : "text-[color:var(--green-deep)]"}`}>
        {m.to}
      </span>
    </span>
  );
}

function SummaryRow({ card, delay, reduceMotion }: { card: SummaryCard; delay: number; reduceMotion: boolean | null }) {
  const accent = card.tone === "green" ? "var(--green-deep)" : "#1e3a8a";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: EASE }}
      className="border border-slate-200 bg-white"
    >
      <header
        className="flex items-center gap-2 border-b border-slate-100 px-2.5 py-1.5"
        style={{ borderLeft: `3px solid ${accent}` }}
      >
        <span
          className="grid h-6 w-6 place-items-center font-heading text-[11px] font-extrabold text-white"
          style={{ background: accent }}
        >
          {card.n}
        </span>
        <span style={{ color: accent }}>
          <ThemeIcon title={card.title} />
        </span>
        <h3 className="text-[13px] font-extrabold tracking-[0.06em] text-[color:var(--ink)]">{card.title}</h3>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.2fr]">
        <div className="space-y-1 border-b border-slate-100 px-2.5 py-1.5 md:border-b-0 md:border-r">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Metrik Q1 → Q2</p>
          {card.metrics.map((m) => (
            <div key={m.label} className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0">
              <span className="text-[12px] font-semibold text-slate-500">{m.label}</span>
              <MetricDelta m={m} />
            </div>
          ))}
        </div>

        <div className="px-2.5 py-1.5">
          <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">Catatan</p>
          <ul className="space-y-0.5">
            {card.notes.map((n) => (
              <li key={n} className="flex gap-1.5 text-[13px] leading-snug text-[color:var(--ink)]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

function EnforcementBlock({
  title,
  tone,
  items,
  delay,
  reduceMotion,
}: {
  title: string;
  tone: "green" | "blue";
  items: readonly string[];
  delay: number;
  reduceMotion: boolean | null;
}) {
  const accent = tone === "green" ? "var(--green-deep)" : "#1e3a8a";
  const soft = tone === "green" ? "bg-emerald-50/60" : "bg-blue-50/60";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: EASE }}
      className="border border-slate-200 bg-white"
    >
      <header
        className="flex items-center justify-between gap-2 px-3 py-2 text-white"
        style={{ background: accent }}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center bg-white/15">
            {tone === "green" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
            )}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">Enforcement</p>
            <h3 className="font-heading text-[16px] font-extrabold leading-tight tracking-wide">{title}</h3>
          </div>
        </div>
        <span className="font-heading text-[22px] font-black leading-none text-white/25">{items.length}</span>
      </header>

      <ol className={`divide-y divide-slate-100 ${soft}`}>
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduceMotion ? false : { opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.03 + i * 0.03, duration: 0.25 }}
            className="flex gap-2.5 px-3 py-2"
          >
            <span
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center text-[12px] font-extrabold text-white"
              style={{ background: accent }}
            >
              {i + 1}
            </span>
            <span className="text-[15px] leading-snug text-[color:var(--ink)]">{item}</span>
          </motion.li>
        ))}
      </ol>
    </motion.article>
  );
}

export default function SummaryEnforcementSlide({ onBack, onNext }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const reduceMotion = useReducedMotion();

  return (
    <div className="sp-slide relative min-h-screen overflow-hidden bg-white text-[color:var(--ink)]">
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
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { rotate: { duration: 48, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.8 } }
        }
      />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 py-5 md:px-6 md:py-6">
        <header>
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
            <div className="flex items-center gap-3">
              <BerauCoalLogo height={34} />
              {onNext ? (
                <button
                  type="button"
                  onClick={onNext}
                  className="border border-[color:var(--green-deep)] bg-[color:var(--green-deep)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-mid)]"
                >
                  Lanjut →
                </button>
              ) : null}
            </div>
          </motion.div>

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
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.35, ease: EASE }}
                  />
                ))}
              </div>
              <motion.p
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: EASE }}
              >
                HSECM Tingkat I · Q2 2026
              </motion.p>
              <h1 className="mt-2 overflow-hidden font-heading text-[clamp(1.85rem,3.6vw,2.9rem)] font-extrabold leading-[0.95] tracking-tight text-[color:var(--ink)]">
                {["Highlight Summary", "& Enforcement"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="mr-[0.28em] inline-block"
                    initial={reduceMotion ? false : { opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 + i * 0.1, duration: 0.5, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                className="mt-2 text-[13px] text-[color:var(--ink-soft)]"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.35 }}
              >
                Lagging &amp; Leading · Stability · Transform
              </motion.p>
            </div>

            <div className="relative flex shrink-0 items-center justify-end self-end pb-2 pt-1 lg:self-start lg:pt-4">
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-red-600/20"
                aria-hidden
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={reduceMotion ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="sp-hash-stamp relative text-[12px] md:text-[13px]"
                initial={reduceMotion ? false : { opacity: 0, scale: 1.3, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ delay: 0.5, duration: 0.65, ease: EASE }}
              >
                #SiagaSalingMenjaga
              </motion.span>
            </div>
          </div>
        </header>

        <div className="mt-7 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
            {sidebarOpen ? "Taktik System Defender" : "Ringkasan penuh"}
          </p>
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
            aria-controls="summary-tactic-sidebar"
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
                id="summary-tactic-sidebar"
                key="summary-sidebar"
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

          <main className="min-w-0 flex-1">
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.08fr_0.92fr]">
              <section>
                <div className="mb-1.5 flex items-end justify-between gap-3 border-b border-slate-200 pb-1">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Lagging &amp; Leading</p>
                    <h2 className="font-heading text-[15px] font-extrabold text-[color:var(--ink)] md:text-base">
                      Highlight Summary
                    </h2>
                  </div>
                  <span className="text-[12px] font-semibold text-[color:var(--ink-soft)]">
                    {SUMMARY_CARDS.length} pilar
                  </span>
                </div>
                <div className="space-y-1.5">
                  {SUMMARY_CARDS.map((card, i) => (
                    <SummaryRow
                      key={card.title}
                      card={card}
                      delay={0.1 + i * 0.06}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-1.5 flex items-end justify-between gap-3 border-b border-slate-200 pb-1">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Tindak lanjut</p>
                    <h2 className="font-heading text-[18px] font-extrabold text-[color:var(--ink)] md:text-xl">
                      Enforcement
                    </h2>
                  </div>
                  <span className="text-[13px] font-semibold text-[color:var(--ink-soft)]">
                    Stability · Transform
                  </span>
                </div>
                <div className="space-y-1.5">
                  <EnforcementBlock
                    title={ENFORCEMENT.stability.title}
                    tone="green"
                    items={ENFORCEMENT.stability.items}
                    delay={0.18}
                    reduceMotion={reduceMotion}
                  />
                  <EnforcementBlock
                    title={ENFORCEMENT.transform.title}
                    tone="blue"
                    items={ENFORCEMENT.transform.items}
                    delay={0.28}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>

        <footer className="mt-8 py-4 text-center text-[11px] text-[color:var(--ink-soft)]">
          <span className="inline-flex items-center justify-center gap-2">
            <BerauCoalLogo height={18} />
            <span>· HSECM Tingkat I · Q2 2026 ·</span>
            <span className="font-semibold text-red-600">#SiagaSalingMenjaga</span>
          </span>
        </footer>
      </div>
    </div>
  );
}
