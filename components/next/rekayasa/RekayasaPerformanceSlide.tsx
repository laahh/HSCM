"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import TacticSidebarLayout from "../TacticSidebarLayout";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

const DOZER_VIDEO_SRC = "/dozer.mp4";

const QUOTE =
  "Fokus engineering / pengendalian risiko rekayasa diarahkan untuk menurunkan severity dan memperkuat kontrol pada aktivitas berisiko tinggi seperti Dozing, Dumping, dan Dewatering — sehingga residual risk semakin terkendali.";

const KPIS = [
  {
    value: "270",
    tone: "ink" as const,
    label: "Register Pengendalian Risiko Rekayasa",
  },
  {
    value: "67%",
    tone: "bad" as const,
    sub: "(22/33)",
    label: "Group Aktivitas Tercover Pengendalian Risiko Rekayasa",
  },
  {
    value: "89%",
    tone: "bad" as const,
    sub: "(239/270)",
    label: "Pengendalian Risiko Rekayasa menyisakan Residual Risk",
  },
];

function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <header className="shrink-0 bg-[#1e3a8a] px-3 py-1.5 text-center">
      <h3 className="text-[11px] font-extrabold tracking-wide text-white md:text-[12px]">{children}</h3>
    </header>
  );
}

function FitImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full min-h-0 w-full min-w-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 m-auto max-h-full max-w-full object-contain object-center"
        draggable={false}
      />
    </div>
  );
}

export default function RekayasaPerformanceSlide({ onBack, onNext }: Props) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [needsUnmute, setNeedsUnmute] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [videoOpen]);

  useEffect(() => {
    if (!videoOpen) {
      setNeedsUnmute(false);
      return;
    }

    let cancelled = false;

    const tryPlay = () => {
      const v = videoRef.current;
      if (!v || cancelled) return;
      v.currentTime = 0;
      v.muted = false;
      const playPromise = v.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          if (cancelled) return;
          v.muted = true;
          setNeedsUnmute(true);
          v.play().catch(() => {});
        });
      }
    };

    // Wait one frame so the portaled <video> is mounted after AnimatePresence
    const raf = requestAnimationFrame(() => {
      tryPlay();
      // Retry once if ref was not ready yet
      if (!videoRef.current) {
        window.setTimeout(tryPlay, 80);
      }
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [videoOpen]);

  const closeVideo = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
    setVideoOpen(false);
  };

  return (
    <div className="sp-slide relative flex h-full max-h-full flex-col overflow-hidden bg-white text-[color:var(--ink)]">
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] min-h-0 flex-col px-3 py-1.5 md:px-4">
        <header className="shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-1">
            <div className="flex min-w-0 items-center gap-2">
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
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-[color:var(--green-mid)]">
                  System Defender · HSECM Q2 2026
                </p>
                <h1 className="font-heading text-base font-extrabold tracking-tight text-[color:var(--ink)] sm:text-lg">
                  Pengendalian Risiko Rekayasa
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="sp-hash-stamp text-[9px] sm:text-[10px]">#SiagaSalingMenjaga</span>
              <BerauCoalLogo height={22} />
            </div>
          </div>

          <p className="mt-1 line-clamp-1 text-[10px] leading-snug text-[color:var(--ink-soft)] md:text-[11px]">
            {QUOTE}
          </p>
        </header>

        <TacticSidebarLayout
          className="mt-1"
          fill
          contentScroll={false}
          defaultOpen={false}
          openLabel="Taktik System Defender"
          closedLabel="Board Rekayasa"
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
          {/* Layout referensi: KPI | Hierarki | Tech */}
          <div className="grid h-full min-h-0 grid-cols-1 gap-2 overflow-hidden lg:grid-cols-[148px_minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-1">
            {/* LEFT — KPI vertical */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex min-h-0 flex-col gap-2 sm:grid sm:grid-cols-3 lg:flex"
            >
              {KPIS.map((k, i) => (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.04 }}
                  className="flex min-h-0 flex-1 flex-col items-center justify-center border-2 border-[color:var(--green-mid)]/35 bg-[#f3f7f3] px-2 py-2 text-center"
                >
                  <div
                    className={`font-heading text-[28px] font-black tabular-nums leading-none md:text-[32px] ${
                      k.tone === "bad" ? "text-red-600" : "text-[color:var(--ink)]"
                    }`}
                  >
                    {k.value}
                  </div>
                  {"sub" in k && k.sub ? (
                    <div className={`mt-0.5 text-[11px] font-bold ${k.tone === "bad" ? "text-red-600" : "text-[color:var(--ink)]"}`}>
                      {k.sub}
                    </div>
                  ) : null}
                  <div
                    className={`mt-1.5 text-[9px] font-medium leading-snug ${
                      k.tone === "bad" ? "text-red-600/90" : "text-[color:var(--ink-soft)]"
                    }`}
                  >
                    {k.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* MIDDLE — Hierarchy → plays dozer video */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex min-h-0 min-w-0 flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[color:var(--green-mid)]"
            >
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="group flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--green-deep)]"
                aria-label="Putar video 5 Tingkat Kontrol Rekayasa"
              >
                <PanelTitle>5 TINGKAT KONTROL REKAYASA (HIERARKI)</PanelTitle>
                <div className="relative min-h-0 flex-1 bg-white p-1 sm:p-1.5">
                  <FitImg src="/rekayasa-hierarchy.png" alt="5 Tingkat Kontrol Rekayasa" />
                  <span className="pointer-events-none absolute bottom-2 right-2 border border-[color:var(--green-deep)]/50 bg-white/95 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[color:var(--green-deep)] shadow-sm">
                    ▶ Klik untuk putar video
                  </span>
                </div>
              </button>
            </motion.div>

            {/* RIGHT — Tech stack + Need Support */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex min-h-0 min-w-0 flex-col gap-1.5 overflow-hidden"
            >
              <section className="flex min-h-0 min-w-0 flex-[1.2] flex-col overflow-hidden border border-slate-200 bg-white">
                <PanelTitle>Remote Pump</PanelTitle>
                <div className="grid min-h-0 flex-1 grid-cols-1 gap-0.5 bg-white p-1 sm:grid-cols-[1.15fr_0.85fr]">
                  <div className="min-h-0 min-w-0 overflow-hidden">
                    <FitImg src="/rekayasa-pump-ba.png" alt="Remote Pump sebelum sesudah" />
                  </div>
                  <div className="min-h-0 min-w-0 overflow-hidden">
                    <FitImg src="/rekayasa-pump-steps.png" alt="Remote Pump langkah" />
                  </div>
                </div>
              </section>

              <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-slate-200 bg-white">
                <PanelTitle>Remote Dozer</PanelTitle>
                <div className="min-h-0 flex-1 bg-white p-1">
                  <FitImg src="/rekayasa-dozer.png" alt="Remote Dozer" />
                </div>
              </section>

              <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden border border-slate-200 bg-white">
                <PanelTitle>Auto Brake System (ARCAS) HD Dumping High Risk</PanelTitle>
                <div className="min-h-0 flex-1 bg-white p-1">
                  <FitImg src="/rekayasa-arcas.png" alt="ARCAS Auto Brake System" />
                </div>
              </section>

              <div className="shrink-0 border-2 border-[color:var(--green-deep)] bg-[#f0faf2] px-2.5 py-1.5">
                <div className="text-[10px] font-black tracking-wide text-[color:var(--green-deep)]">
                  NEED SUPPORT:
                </div>
                <ul className="mt-0.5 list-disc space-y-0.5 pl-3.5 text-[9px] leading-snug text-[color:var(--ink)] sm:text-[10px]">
                  <li>
                    Review efektivitas penurunan risiko dari pengendalian Rekayasa Engineering yang sudah
                    dijalankan dengan aktual insiden &amp; pelanggaran yang terjadi.
                  </li>
                  <li>
                    Iterasi &amp; Implementasi Upgrade efektivitas pengendalian Rekayasa Engineering untuk
                    aktivitas yang masih memiliki residual risk.
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </TacticSidebarLayout>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {videoOpen && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center p-2 sm:p-4"
                style={{ zIndex: 200 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <motion.button
                  type="button"
                  aria-label="Tutup video"
                  className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeVideo}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="dozer-video-title"
                  className="relative flex w-full max-w-[1400px] flex-col overflow-hidden border border-slate-200/90 bg-black shadow-2xl"
                  style={{ zIndex: 1, height: "min(92vh, 980px)" }}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#101720] px-3 py-2.5 sm:px-4">
                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[color:var(--green-mid)]">
                        5 Tingkat Kontrol Rekayasa
                      </p>
                      <h2
                        id="dozer-video-title"
                        className="truncate font-heading text-sm font-extrabold text-white sm:text-base"
                      >
                        Remote Dozer — Video Operasi
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={closeVideo}
                      className="grid h-9 w-9 shrink-0 place-items-center border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
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

                  <div className="relative min-h-0 flex-1 bg-black">
                    <video
                      ref={videoRef}
                      src={DOZER_VIDEO_SRC}
                      className="absolute inset-0 h-full w-full object-contain"
                      playsInline
                      controls
                      autoPlay
                      preload="auto"
                    />

                    {needsUnmute && (
                      <button
                        type="button"
                        onClick={() => {
                          const v = videoRef.current;
                          if (v) {
                            v.muted = false;
                            v.play().catch(() => {});
                          }
                          setNeedsUnmute(false);
                        }}
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 border border-white/25 bg-white/95 px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-[color:var(--ink)] shadow-xl transition hover:bg-white"
                      >
                        Aktifkan Suara
                      </button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
