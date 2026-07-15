"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ContractorQuadrantBoard } from "./ContractorQuadrantBoard";
import ContractorRaporTable from "./ContractorRaporTable";

const RAPOR_NARRATIVE = (
  <>
    Rapor Mitra Kerja yang menjadi catatan utama adalah peningkatan Lagging di{" "}
    <strong className="font-semibold text-red-600">PAMA BMO</strong> dan{" "}
    <strong className="font-semibold text-red-600">PAMA GMO</strong> secara jumlah dan severity yang
    masuk pada Kuadran 1 serta masih tidak terdapat perbaikan dari Q1. Secara leading mitra kerja{" "}
    <strong className="font-semibold text-red-600">BAR</strong> mengalami penurunan pada aspek
    Leadership. Mitra kerja pada Kuadran 4 yang mengalami peningkatan Lagging di{" "}
    <strong className="font-semibold text-[color:var(--ink)]">FAD</strong> dan{" "}
    <strong className="font-semibold text-[color:var(--ink)]">KDC</strong> perlu dilakukan
    pendalaman karena skor leading yang cukup tinggi tetapi terdapat gap pada Incident.
  </>
);

export default function PanelB() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setAnimKey((k) => k + 1);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-sm md:p-2.5">
      <div className="mb-1.5 flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div className="sp-panel-badge scale-90">B</div>
          <div className="min-w-0">
            <h2 className="font-heading text-sm font-black leading-tight text-[color:var(--ink)] md:text-base">
              Rapor Mining Kontraktor Q2 2026
            </h2>
            <div className="text-[10px] text-[color:var(--ink-soft)]">
              Kuadran · Pergerakan Q1 → Q2 · % Leading vs Lagging Severity
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-700 transition hover:bg-slate-100"
        >
          Perbesar
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <ContractorQuadrantBoard
          size="inline"
          paused={open}
          onExpand={() => setOpen(true)}
          className="h-full"
        >
          <ContractorRaporTable variant="compact" />
        </ContractorQuadrantBoard>
      </div>

      <p className="mt-1.5 shrink-0 border-t border-slate-100 bg-white pt-1.5 text-[10px] leading-snug text-[color:var(--ink)] md:text-[11px] line-clamp-3">
        {RAPOR_NARRATIVE}
      </p>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <motion.button
                  type="button"
                  aria-label="Tutup modal"
                  className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="rapor-modal-title"
                  className="relative z-[1] flex max-h-[min(96vh,980px)] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl"
                  initial={{ opacity: 0, y: 28, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                >
                  <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
                    <div>
                      <h2
                        id="rapor-modal-title"
                        className="font-heading text-lg font-black text-[color:var(--ink)] sm:text-xl"
                      >
                        Rapor Mining Kontraktor Q2 2026
                      </h2>
                      <p className="mt-0.5 text-xs text-[color:var(--ink-soft)] sm:text-sm">
                        Kuadran · Pergerakan Q1 → Q2 · % Leading vs Lagging Severity
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                      aria-label="Tutup"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                        <path
                          d="M4 4l8 8M12 4L4 12"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="min-h-0 flex-1 space-y-4 overflow-auto px-4 py-4 sm:px-7 sm:py-5">
                    <ContractorQuadrantBoard key={`board-${animKey}`} size="hero" forcePlay />
                    <ContractorRaporTable key={`table-${animKey}`} variant="hero" animate />
                    <p className="border-t border-slate-100 pt-3 text-[12px] leading-relaxed text-[color:var(--ink)] sm:text-[13px]">
                      {RAPOR_NARRATIVE}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 sm:px-7">
                    <span className="text-[11px] text-slate-400">
                      Tekan Esc atau klik luar untuk menutup
                    </span>
                    <button
                      type="button"
                      onClick={() => setAnimKey((k) => k + 1)}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                    >
                      Putar ulang animasi
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
