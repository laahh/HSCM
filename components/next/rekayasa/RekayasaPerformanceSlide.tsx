"use client";

import { motion } from "framer-motion";
import BerauCoalLogo from "../../brand/BerauCoalLogo";
import TacticSidebarLayout from "../TacticSidebarLayout";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

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

            {/* MIDDLE — Hierarchy */}
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="flex min-h-0 min-w-0 flex-col overflow-hidden border border-slate-200 bg-white"
            >
              <PanelTitle>5 TINGKAT KONTROL REKAYASA (HIERARKI)</PanelTitle>
              <div className="min-h-0 flex-1 bg-white p-1 sm:p-1.5">
                <FitImg src="/rekayasa-hierarchy.png" alt="5 Tingkat Kontrol Rekayasa" />
              </div>
            </motion.section>

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
    </div>
  );
}
