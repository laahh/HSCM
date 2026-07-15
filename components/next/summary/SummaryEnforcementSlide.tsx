"use client";

import { motion } from "framer-motion";
import { PILLARS, TACTICS } from "../system-defender/tactical/data";
import { TACTIC_CARDS } from "../safety-performance/data";
import { ENFORCEMENT, SUMMARY_CARDS, SUMMARY_QUOTE, type SummaryCard } from "./data";

type Props = {
  onBack?: () => void;
};

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

function ThemeIcon({ tone, title }: { tone: SummaryCard["tone"]; title: string }) {
  const stroke = "#fff";
  if (title === "LEADERSHIP") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
      </svg>
    );
  }
  if (title === "PEOPLE") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16" cy="9" r="2" />
        <path d="M3 19v-1a4 4 0 0 1 4-4h3" />
        <path d="M12 19v-1a3.5 3.5 0 0 1 3.5-3.5H18" />
      </svg>
    );
  }
  if (title === "PROCESS") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
    </svg>
  );
}

function SummaryRow({ card, delay }: { card: SummaryCard; delay: number }) {
  const isGreen = card.tone === "green";
  const headerBg = isGreen ? "bg-[color:var(--green-deep)]" : "bg-[#1e3a8a]";
  const gapBorder = isGreen ? "border-emerald-300 bg-emerald-50/70" : "border-blue-300 bg-blue-50/70";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      <header className={`${headerBg} flex items-center gap-2.5 px-3 py-2 text-white`}>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-[11px] font-black">
          {card.n}
        </span>
        <ThemeIcon tone={card.tone} title={card.title} />
        <h3 className="text-[12px] font-extrabold tracking-wide">{card.title}</h3>
      </header>

      <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1.1fr_1fr]">
        <div className="space-y-2 border-b border-slate-100 p-3 md:border-b-0 md:border-r">
          {card.metrics.map((m) => (
            <div key={m.label} className="text-[11px] leading-snug">
              <div className="font-semibold text-slate-500">{m.label}</div>
              {m.note ? (
                <div className={`mt-0.5 font-bold ${m.bad ? "text-red-600" : "text-[color:var(--ink)]"}`}>{m.note}</div>
              ) : (
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 font-bold tabular-nums">
                  <span className="text-slate-600">{m.from}</span>
                  <span className="text-slate-300">→</span>
                  <span className={m.bad ? "text-red-600" : "text-emerald-700"}>{m.to}</span>
                  {!m.bad && <span className="text-[10px] text-emerald-600">↑</span>}
                  {m.bad && <span className="text-[10px] text-red-500">↑</span>}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-b border-slate-100 p-3 md:border-b-0 md:border-r">
          <ul className="list-disc space-y-1.5 pl-3.5 text-[11px] leading-snug text-[color:var(--ink)]">
            {card.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>

        <div className="p-3">
          <div className={`h-full rounded-lg border px-2.5 py-2 text-[11px] leading-snug ${gapBorder}`}>
            <div className="mb-1 text-[10px] font-black uppercase tracking-wide text-slate-600">Gap:</div>
            {card.gap}
          </div>
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
}: {
  title: string;
  tone: "green" | "blue";
  items: readonly string[];
  delay: number;
}) {
  const side = tone === "green" ? "bg-[color:var(--green-deep)]" : "bg-[#1e3a8a]";
  const ring = tone === "green" ? "border-emerald-300" : "border-blue-300";
  const num = tone === "green" ? "bg-[color:var(--green-deep)]" : "bg-[#1e3a8a]";
  const stripe = tone === "green" ? "bg-emerald-500/25" : "bg-blue-500/25";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className={`relative overflow-hidden rounded-xl border bg-white shadow-sm ${ring}`}
    >
      <div className="pointer-events-none absolute right-3 top-3 flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`h-5 w-1 rotate-12 rounded-full ${stripe}`} />
        ))}
      </div>

      <div className="flex min-h-[180px]">
        <div className={`${side} relative flex w-[72px] shrink-0 flex-col items-center justify-between px-2 py-4 text-white`}>
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
            {tone === "green" ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5" />
                <path d="m14 8 3-2 1 3" />
              </svg>
            )}
          </div>
          <div
            className="text-[12px] font-black tracking-[0.18em]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {title}
          </div>
          <div className={`absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 translate-x-full border-y-[8px] border-y-transparent border-l-[10px] ${tone === "green" ? "border-l-[color:var(--green-deep)]" : "border-l-[#1e3a8a]"}`} />
        </div>

        <div className="flex-1 p-3.5 pr-8">
          <ol className="space-y-0 divide-y divide-slate-100">
            {items.map((item, i) => (
              <li key={item} className="flex gap-2.5 py-2 first:pt-0 last:pb-0">
                <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-black text-white ${num}`}>
                  {i + 1}
                </span>
                <span className="text-[11.5px] leading-snug text-[color:var(--ink)]">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </motion.article>
  );
}

export default function SummaryEnforcementSlide({ onBack }: Props) {
  return (
    <div className="sp-slide min-h-screen bg-[#f9fafb] text-[color:var(--ink)]">
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
              HSECM Tingkat I · Q2 2026 · PT Berau Coal
            </div>
            <h1 className="mt-1 font-heading text-xl font-black leading-tight text-[color:var(--ink)] md:text-2xl lg:text-[26px]">
              Highlight Summary &amp; Enforcement
            </h1>
            <p className="mt-1 text-[12px] text-[color:var(--ink-soft)]">
              Lagging &amp; Leading · Stability · Transform
            </p>
          </div>

          <div className="order-2 flex items-center justify-end gap-3 md:order-3">
            <span className="rounded-full bg-red-600 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white shadow-md">
              #SiagaSalingMenjaga
            </span>
            <div className="border-l border-slate-200 pl-3 text-right leading-tight">
              <div className="text-lg font-black tracking-tight text-[color:var(--ink)]">beraucoal</div>
              <div className="text-[10px] italic text-[color:var(--ink-soft)]">bergerak lebih maju</div>
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
            &ldquo;{SUMMARY_QUOTE}&rdquo;
          </p>
        </motion.div>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[260px_1fr]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-3"
          >
            <div className="space-y-2.5">
              {TACTIC_CARDS.map((t, i) => (
                <div key={t.n} className="sp-tac-card flex items-start gap-3 p-3.5" title={TACTICS[i]?.centerMessage}>
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
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              {/* Highlight Summary */}
              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="bg-[#1e3a8a] px-4 py-2.5 text-center">
                  <h2 className="text-[12px] font-extrabold tracking-wide text-white md:text-[13px]">
                    HIGHLIGHT SUMMARY LAGGING &amp; LEADING
                  </h2>
                </header>
                <div className="space-y-2.5 p-2.5 md:p-3">
                  {SUMMARY_CARDS.map((card, i) => (
                    <SummaryRow key={card.title} card={card} delay={0.14 + i * 0.06} />
                  ))}
                </div>
              </section>

              {/* Enforcement */}
              <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <header className="bg-[#1e3a8a] px-4 py-2.5 text-center">
                  <h2 className="text-[12px] font-extrabold tracking-wide text-white md:text-[13px]">ENFORCEMENT</h2>
                </header>
                <div className="space-y-3 p-2.5 md:p-3">
                  <EnforcementBlock
                    title={ENFORCEMENT.stability.title}
                    tone="green"
                    items={ENFORCEMENT.stability.items}
                    delay={0.2}
                  />
                  <EnforcementBlock
                    title={ENFORCEMENT.transform.title}
                    tone="blue"
                    items={ENFORCEMENT.transform.items}
                    delay={0.28}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>

        <footer className="mt-6 py-4 text-center text-[11px] text-[color:var(--ink-soft)]">
          PT Berau Coal · HSECM Tingkat I · Q2 2026 ·{" "}
          <span className="font-semibold text-[color:var(--green-mid)]">#SiagaSalingMenjaga</span>
        </footer>
      </div>
    </div>
  );
}
