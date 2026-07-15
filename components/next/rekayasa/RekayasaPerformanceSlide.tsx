"use client";

import { motion } from "framer-motion";
import { PILLARS, TACTICS } from "../system-defender/tactical/data";
import { TACTIC_CARDS } from "../safety-performance/data";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

const QUOTE =
  "Fokus engineering / pengendalian risiko rekayasa diarahkan untuk menurunkan severity dan memperkuat kontrol pada aktivitas berisiko tinggi seperti Dozing, Dumping, dan Dewatering — sehingga residual risk semakin terkendali.";

const PILLAR_ICON: Record<string, string> = {
  leadership: "L",
  people: "P",
  process: "R",
  technology: "T",
};

const KPIS = [
  {
    value: "270",
    tone: "ink" as const,
    label: "Register Pengendalian Risiko Rekayasa",
  },
  {
    value: "67%",
    tone: "bad" as const,
    label: "(22/33) Group Aktivitas Tercover Pengendalian Risiko Rekayasa",
  },
  {
    value: "89%",
    tone: "bad" as const,
    label: "(239/270) Pengendalian Risiko Rekayasa menyisakan Residual Risk",
  },
];

const TECH = [
  {
    title: "Remote Pump",
    src: "/rekayasa-pump-ba.png",
    extra: "/rekayasa-pump-steps.png",
    dual: true,
  },
  {
    title: "Remote Dozer",
    src: "/rekayasa-dozer.png",
    dual: false,
  },
  {
    title: "Auto Brake System (ARCAS) HD Dumping High Risk",
    src: "/rekayasa-arcas.png",
    dual: false,
  },
] as const;

function Fig({ src, alt }: { src: string; alt: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="mx-auto block h-auto w-full object-contain" />
  );
}

export default function RekayasaPerformanceSlide({ onBack, onNext }: Props) {
  return (
    <div className="sp-slide min-h-screen bg-[#f9fafb] text-[color:var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        {/* Header — sama seperti Safety / Leading */}
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
              Pengendalian Risiko Rekayasa
            </h1>
            <p className="mt-1 text-[12px] text-[color:var(--ink-soft)]">
              Safety Performance · All Site Q2 2026 · Technology Improvements
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
            &ldquo;{QUOTE}&rdquo;
          </p>
        </motion.div>

        {/* Layout sama Safety/Leading: sidebar tactic | konten — tanpa tab */}
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
            {/* Board: KPI | Hierarchy | Tech */}
            <div className="grid grid-cols-1 gap-3 xl:grid-cols-[148px_minmax(0,1.1fr)_minmax(0,1fr)] xl:items-start">
              {/* KPI strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 xl:flex"
              >
                {KPIS.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.16 + i * 0.05 }}
                    className="rounded-xl border-2 border-[color:var(--green-mid)]/35 bg-[#f3f7f3] px-3 py-3.5 text-center shadow-sm"
                  >
                    <div
                      className={`font-heading text-[30px] font-black tabular-nums leading-none md:text-[32px] ${
                        k.tone === "bad" ? "text-red-600" : "text-[color:var(--ink)]"
                      }`}
                    >
                      {k.value}
                    </div>
                    <div className="mt-1.5 text-[9.5px] font-medium leading-snug text-[color:var(--ink-soft)]">
                      {k.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Hierarchy */}
              <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <header className="bg-[#1e3a8a] px-3 py-2 text-center">
                  <h2 className="text-[12px] font-extrabold tracking-wide text-white md:text-[13px]">
                    5 TINGKAT KONTROL REKAYASA (HIERARKI)
                  </h2>
                </header>
                <div className="bg-white p-1.5 md:p-2">
                  <Fig src="/rekayasa-hierarchy.png" alt="5 Tingkat Kontrol Rekayasa" />
                </div>
              </motion.section>

              {/* Technology */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="flex flex-col gap-2.5"
              >
                {TECH.map((t) => (
                  <section key={t.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <header className="bg-[#1e3a8a] px-3 py-1.5">
                      <h3 className="text-[11px] font-extrabold tracking-wide text-white">{t.title}</h3>
                    </header>
                    <div className="bg-white p-1.5">
                      {t.dual ? (
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-[1.1fr_0.9fr]">
                          <Fig src={t.src} alt={`${t.title} sebelum sesudah`} />
                          <Fig src={t.extra} alt={`${t.title} langkah`} />
                        </div>
                      ) : (
                        <Fig src={t.src} alt={t.title} />
                      )}
                    </div>
                  </section>
                ))}

                <div className="rounded-xl border-2 border-[color:var(--green-deep)] bg-[#f0faf2] px-3 py-2.5">
                  <div className="text-[11px] font-black tracking-wide text-[color:var(--green-deep)]">NEED SUPPORT:</div>
                  <ul className="mt-1 list-disc space-y-1 pl-3.5 text-[11px] leading-snug text-[color:var(--ink)]">
                    <li>
                      Review efektivitas penurunan risiko dari pengendalian rekayasa terhadap kejadian / pelanggaran
                      aktual.
                    </li>
                    <li>
                      Implementasi iteratif untuk upgrade pengendalian rekayasa pada aktivitas yang masih menyisakan
                      residual risk.
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </main>
        </div>

        <footer className="mt-6 flex flex-col items-center gap-3 py-4 text-center text-[11px] text-[color:var(--ink-soft)]">
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              className="rounded-full bg-[color:var(--green-deep)] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[color:var(--green-mid)]"
            >
              Lanjut: Highlight Summary & Enforcement →
            </button>
          )}
          <div>
            PT Berau Coal · HSECM Tingkat I · Q2 2026 ·{" "}
            <span className="font-semibold text-[color:var(--green-mid)]">#SiagaSalingMenjaga</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
