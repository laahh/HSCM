"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DEMO_DURATION_MS, RULE_TRIGGER_DEMO } from "./ruleTriggerDemoData";

const PANELS = [
  {
    id: "bearc",
    src: "/bearc.png",
    title: "BeARC",
    subtitle: "Access Role Control",
    hasDemo: false,
  },
  {
    id: "rule",
    src: "/rulebase.png",
    title: "Rule based Trigger",
    subtitle: "Leading Performance Control",
    hasDemo: true,
  },
] as const;

type DemoPhase = "idle" | "loading" | "modal";

const EASE = [0.22, 1, 0.36, 1] as const;

const LOADING_STEPS = [
  "Menyiapkan payload trigger…",
  "Menyusun ringkasan gap per site…",
  "Menghubungkan WhatsApp gateway…",
  "Mengirim notifikasi ke WA PJO…",
  "Menunggu konfirmasi delivery…",
] as const;

export default function PanelImprovementTeknologi() {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const titleId = useId();

  useEffect(() => {
    if (phase !== "loading") return;

    setProgress(0);
    setStepIdx(0);
    const started = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DEMO_DURATION_MS);
      setProgress(t);
      setStepIdx(Math.min(LOADING_STEPS.length - 1, Math.floor(t * LOADING_STEPS.length)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("modal");
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "modal") setPhase("idle");
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const startDemo = () => {
    setPhase("loading");
  };

  const closeDemo = () => setPhase("idle");

  const remainingSec = Math.max(0, Math.ceil((1 - progress) * (DEMO_DURATION_MS / 1000)));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
      >
        <header className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-3.5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-soft)]">
            Technology
          </div>
          <h2 className="mt-0.5 font-heading text-lg font-extrabold text-[color:var(--ink)]">
            Improvement Teknologi
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-4 p-4 md:p-5 xl:grid-cols-2">
          {PANELS.map((p, i) => (
            <motion.figure
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.08, duration: 0.4 }}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <figcaption className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    {p.subtitle}
                  </div>
                  <div className="text-[13px] font-bold text-[color:var(--ink)]">{p.title}</div>
                </div>
                {p.hasDemo && (
                  <button
                    type="button"
                    onClick={startDemo}
                    disabled={phase !== "idle"}
                    className="shrink-0 border border-[color:var(--green-deep)] bg-[color:var(--green-deep)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-mid)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Demo
                  </button>
                )}
              </figcaption>
              <div className="bg-white p-2 md:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.title}
                  className="mx-auto h-auto max-h-[520px] w-full object-contain"
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="w-full max-w-md border border-slate-200 bg-white p-6 shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="relative mt-0.5 grid h-12 w-12 place-items-center">
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-[color:var(--green-mid)]/30"
                    animate={reduceMotion ? undefined : { scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute inset-1 rounded-full border-2 border-t-[color:var(--green-deep)] border-r-transparent border-b-transparent border-l-transparent"
                    animate={reduceMotion ? undefined : { rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                  />
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 2C6.5 2 2 6.1 2 11.2c0 2.5 1 4.7 2.7 6.4L4 22l4.6-1.5c1.1.4 2.3.6 3.4.6 5.5 0 10-4.1 10-9.2S17.5 2 12 2z"
                      stroke="var(--green-deep)"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.2 10.2h7.6M8.2 13.2h5.2"
                      stroke="var(--green-mid)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    id={titleId}
                    className="font-heading text-[15px] font-extrabold text-[color:var(--ink)]"
                  >
                    Mengirim notifikasi ke WA PJO
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[color:var(--ink-soft)]">
                    Rule based Trigger sedang memproses gap dan mengirim alert WhatsApp ke PJO…
                  </p>
                  <p className="mt-3 text-[12px] font-semibold text-[color:var(--green-deep)]">
                    {LOADING_STEPS[stepIdx]}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  <span>Progress</span>
                  <span>{remainingSec}s</span>
                </div>
                <div className="h-2 overflow-hidden bg-slate-100">
                  <motion.div
                    className="h-full bg-[color:var(--green-deep)]"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "modal" && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${titleId}-result`}
            onClick={closeDemo}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden border border-slate-200 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3.5 md:px-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--green-mid)]">
                    Notifikasi terkirim · WA PJO
                  </p>
                  <h3
                    id={`${titleId}-result`}
                    className="mt-0.5 font-heading text-base font-extrabold text-[color:var(--ink)] md:text-lg"
                  >
                    Rule based Trigger · Ringkasan Gap
                  </h3>
                  <p className="mt-0.5 text-[11px] text-[color:var(--ink-soft)]">
                    Sample alert data · BMO 2 &amp; GMO
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeDemo}
                  className="grid h-8 w-8 place-items-center border border-slate-200 text-slate-500 transition hover:border-slate-400 hover:text-[color:var(--ink)]"
                  aria-label="Tutup"
                >
                  ✕
                </button>
              </header>

              <div className="space-y-3 overflow-y-auto px-4 py-4 md:px-5">
                {RULE_TRIGGER_DEMO.map((item, i) => (
                  <motion.article
                    key={item.code}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.035, duration: 0.3 }}
                    className="border border-slate-200 bg-white"
                  >
                    <div className="flex items-baseline gap-2 border-b border-slate-100 bg-slate-50/80 px-3 py-2">
                      <span className="font-heading text-[13px] font-extrabold text-[color:var(--green-deep)]">
                        {item.code}
                      </span>
                      <h4 className="text-[12px] font-bold leading-snug text-[color:var(--ink)] md:text-[13px]">
                        {item.title}
                      </h4>
                    </div>
                    <ul className="divide-y divide-slate-100">
                      {item.rows.map((row) => (
                        <li key={`${item.code}-${row.site}`} className="flex gap-3 px-3 py-2.5">
                          <span className="mt-0.5 shrink-0 border border-[color:var(--green-mid)]/30 bg-[color:var(--green-mid)]/8 px-1.5 py-0.5 text-[10px] font-bold text-[color:var(--green-deep)]">
                            {row.site}
                          </span>
                          <p className="text-[12px] leading-relaxed text-[color:var(--ink)]">{row.detail}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                ))}
              </div>

              <footer className="flex justify-end border-t border-slate-200 bg-white px-4 py-3 md:px-5">
                <button
                  type="button"
                  onClick={closeDemo}
                  className="border border-[color:var(--green-deep)] bg-[color:var(--green-deep)] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-mid)]"
                >
                  Tutup
                </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
