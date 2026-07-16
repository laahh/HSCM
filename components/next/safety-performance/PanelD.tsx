"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FIT_TO_WORK, FIT_TO_WORK_KPIS } from "./data";
import { contractorLogo } from "./contractorLogo";

const WELL_SRC = "/well.jpeg";

export default function PanelD() {
  const [wellOpen, setWellOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!wellOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWellOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [wellOpen]);

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-3 shadow-sm md:p-4">
      <div className="mb-3 flex items-center justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="sp-panel-badge">D</div>
          <div className="min-w-0">
            <h2 className="font-heading text-sm font-black leading-tight text-[color:var(--ink)] md:text-base">
              Health Management Q2 2026
            </h2>
            <div className="text-[10px] text-[color:var(--ink-soft)]">Fit to Work · Hasil MCU</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setWellOpen(true)}
          className="shrink-0 border border-emerald-700/30 bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-emerald-700"
          aria-label="Buka W.E.L.L. Program"
        >
          Well
        </button>
      </div>

      <div className="mb-4 text-center">
        <h3 className="font-heading text-base font-black italic text-[color:var(--ink)] md:text-lg">
          Fit to Work hasil MCU
        </h3>
        <p className="text-[11px] italic text-slate-500">(berdasarkan hasil MCU 2025 – 2026)</p>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-6 sm:mx-auto sm:max-w-xl sm:gap-10">
        <div className="text-center">
          <div className="font-heading text-3xl font-black tabular-nums leading-none text-red-600 md:text-4xl">
            {FIT_TO_WORK_KPIS.penurunan}%
          </div>
          <div className="mt-1.5 inline-block border-b border-slate-300 pb-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
            {FIT_TO_WORK_KPIS.penurunanLabel}
          </div>
        </div>
        <div className="text-center">
          <div className="font-heading text-3xl font-black tabular-nums leading-none text-emerald-600 md:text-4xl">
            {FIT_TO_WORK_KPIS.peningkatan}%
          </div>
          <div className="mt-1.5 inline-block border-b border-slate-300 pb-0.5 text-[11px] font-semibold leading-snug text-[color:var(--ink)]">
            {FIT_TO_WORK_KPIS.peningkatanLabel}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-md border border-slate-200">
        <div className="h-full overflow-auto">
          <table className="w-full table-fixed border-collapse text-center text-[12px] md:text-[13px]">
            <colgroup>
              <col className="w-[34%]" />
              <col className="w-[28%]" />
              <col className="w-[19%]" />
              <col className="w-[19%]" />
            </colgroup>
            <thead>
              <tr className="bg-[#1e4a7a] text-white">
                <th className="px-3 py-2.5 text-left font-bold md:px-4 md:py-3">Perusahaan</th>
                <th className="px-3 py-2.5 font-bold underline underline-offset-2 md:px-4 md:py-3">
                  Rasio Kelayakan Kerja
                </th>
                <th className="px-3 py-2.5 font-bold md:px-4 md:py-3">MFR</th>
                <th className="px-3 py-2.5 font-bold md:px-4 md:py-3">ASR</th>
              </tr>
            </thead>
            <tbody>
              {FIT_TO_WORK.map((row) => (
                <tr key={row.company} className="border-t border-slate-200">
                  <td className="bg-[#c8e6c9] px-3 py-2 text-left font-semibold text-[color:var(--ink)] md:px-4 md:py-2.5">
                    <span className="inline-flex items-center gap-2">
                      {contractorLogo(row.company) && (
                        <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full border border-white/80 bg-white md:h-8 md:w-8">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={contractorLogo(row.company)!}
                            alt=""
                            className="h-full w-full object-contain p-[2px]"
                          />
                        </span>
                      )}
                      {row.company}
                    </span>
                  </td>
                  <td
                    className={`px-3 py-2 font-semibold tabular-nums md:px-4 md:py-2.5 ${
                      row.gap.rasio ? "bg-[#f8d5c2]" : "bg-white"
                    }`}
                  >
                    {row.rasio}
                  </td>
                  <td
                    className={`px-3 py-2 font-semibold tabular-nums md:px-4 md:py-2.5 ${
                      row.gap.mfr ? "bg-[#f8d5c2]" : "bg-white"
                    }`}
                  >
                    {row.mfr}
                  </td>
                  <td
                    className={`px-3 py-2 font-semibold tabular-nums md:px-4 md:py-2.5 ${
                      row.gap.asr ? "bg-[#f8d5c2]" : "bg-white"
                    }`}
                  >
                    {row.asr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] italic text-slate-500">
        <span className="inline-block h-3 w-3 shrink-0 rounded-sm border border-[#e8b89a] bg-[#f8d5c2]" />
        Gap penurunan / peningkatan dibandingkan Q1 2026
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {wellOpen && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center p-3 sm:p-6"
                style={{ zIndex: 200 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <motion.button
                  type="button"
                  aria-label="Tutup modal W.E.L.L."
                  className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setWellOpen(false)}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="well-modal-title"
                  className="relative flex max-h-[min(94vh,920px)] w-full max-w-lg flex-col overflow-hidden border border-slate-200/90 bg-white shadow-2xl"
                  style={{ zIndex: 1 }}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                        Health Management
                      </p>
                      <h2
                        id="well-modal-title"
                        className="font-heading text-sm font-extrabold text-[color:var(--ink)] sm:text-base"
                      >
                        W.E.L.L. Program
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWellOpen(false)}
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
                  </header>

                  <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-3 sm:p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={WELL_SRC}
                      alt="W.E.L.L. Program — Satu Aplikasi Multi Solusi Sehatmu"
                      className="mx-auto h-auto w-full max-w-md object-contain"
                      draggable={false}
                    />
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
