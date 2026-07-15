"use client";

import { motion } from "framer-motion";
import {
  BEARC_BREAKDOWN,
  BEARC_FLOW,
  BEARC_IMPACT,
  DMS_INTERVENSI_BELOW,
  DMS_LEAD_BELOW,
  FTW_BELOW,
  GOLDEN_TIME_BELOW,
  GR_BLINDSPOT,
  GR_REPEAT,
  GR_TABLE,
  HIGHLIGHTS,
  IKK_BELOW,
  LEADING_QUOTE,
  SAP_BC,
  SAP_BELOW_MIN,
  SAP_MK,
  SAP_WEEKS,
  TACTIC_MINIS,
  TBC_BLINDSPOT_UP,
  TBC_RATIO,
  TECH_GAPS,
} from "./data";
import { CountUp } from "./CountUp";
import { SparkLine } from "./SparkLine";
import {
  KpiRow,
  Narrative,
  Panel,
  PartnerChips,
  SectionLabel,
  TacticGlyph,
  TrendPill,
} from "./ui";

type Props = {
  onBack?: () => void;
};

export default function LeadingPerformanceSlide({ onBack }: Props) {
  return (
    <div className="lp-slide min-h-screen bg-[color:var(--paper-soft,#f5f8f5)] text-[color:var(--ink)]">
      <div className="mx-auto max-w-[1600px] px-4 pb-16 pt-8 md:px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex flex-wrap items-start gap-5"
        >
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-emerald-400 hover:text-emerald-800"
              >
                ←
              </button>
            )}
            <div
              className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full text-center text-[9px] font-semibold leading-tight text-white shadow-md"
              style={{
                background: "linear-gradient(135deg, var(--ink), var(--green-deep))",
                boxShadow: "0 0 0 3px rgba(15,92,46,0.15), 0 4px 12px rgba(11,61,31,0.25)",
              }}
            >
              DIVISI
              <br />
              SYSTEM
              <br />
              DEFENDER
            </div>
            <p className="max-w-[200px] text-xs leading-tight text-[color:var(--ink-soft)] italic">
              Menjaga sistem, agar operasi tetap maju, aman, dan produktif
            </p>
          </div>

          <div className="min-w-[280px] flex-1 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              HSECM Tingkat I · Q2 2026 · PT Berau Coal
            </div>
            <h1 className="mt-1 font-heading text-[22px] font-extrabold leading-tight text-[color:var(--ink)] md:text-[28px] lg:text-[32px]">
              Leading Performance{" "}
              <span className="text-[color:var(--green-mid)]">| Leadership · People · Process · Technology</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[color:var(--green-deep)] bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[color:var(--ink)]">
              #SiagaSalingMenjaga
            </span>
            <span className="rounded-md bg-[color:var(--ink)] px-3 py-1.5 text-sm font-bold tracking-wider text-white">
              beraucoal
            </span>
          </div>
        </motion.header>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-6 rounded-r-lg border-l-4 border-l-[color:var(--green-mid)] bg-emerald-50 px-[18px] py-3.5 text-[13px] leading-relaxed text-[color:var(--ink)] italic"
        >
          &ldquo;{LEADING_QUOTE}&rdquo;
        </motion.div>

        {/* Tactics */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TACTIC_MINIS.map((t, i) => (
            <motion.div
              key={t.n}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[10px] border border-[color:var(--green-line)] bg-white px-[18px] py-4"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_60%,rgba(31,138,68,0.04))]" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
                    Tactic {t.n}
                  </div>
                  <div className="mt-0.5 text-[15px] font-bold text-[color:var(--ink)]">{t.title}</div>
                  <div className="mt-0.5 text-[11px] text-[color:var(--ink-soft)]">{t.desc}</div>
                </div>
                <TacticGlyph kind={t.kind} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 rounded-[14px] border-[3px] border-dashed border-[color:var(--green-mid)] bg-white p-[18px]"
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Leadership */}
            <Panel title="Leadership" subtitle="Supervisor Accountability" delay={0}>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <SectionLabel>Weekly Ratio SAP</SectionLabel>
                  <span className="text-[10px] text-[color:var(--ink-soft)]">W14 → W26</span>
                </div>
                <SparkLine
                  labels={SAP_WEEKS}
                  series={[
                    { label: "BC", values: SAP_BC, color: "var(--green-deep)", dashed: true },
                    { label: "MK", values: SAP_MK, color: "var(--gold-bright)" },
                  ]}
                />
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">
                  Ratio SAP Min → <strong className="text-[color:var(--green-deep)]">BC: 19</strong> |{" "}
                  <strong className="text-[color:var(--green-deep)]">MK: 24</strong>
                </div>
              </div>

              <div>
                <SectionLabel danger>SAP Ratio &lt; Ratio Min</SectionLabel>
                <PartnerChips items={SAP_BELOW_MIN} />
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Blindspot TBC</SectionLabel>
                <KpiRow
                  from={343}
                  to={222}
                  fromTone="good"
                  toTone="good"
                  pill={<TrendPill tone="down-good">↓ membaik</TrendPill>}
                />
                <div className="mt-1.5 text-[10px] text-[color:var(--ink-soft)]">Q1 → Q2 (tren turun / membaik)</div>
                <div className="mt-2">
                  <SectionLabel danger>Blindspot TBC Meningkat</SectionLabel>
                  <PartnerChips items={TBC_BLINDSPOT_UP} />
                </div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <div className="mb-1 flex items-center justify-between">
                  <SectionLabel>Weekly Ratio TBC</SectionLabel>
                  <span className="text-[10px] text-[color:var(--ink-soft)]">W14 → W26</span>
                </div>
                <SparkLine
                  labels={SAP_WEEKS}
                  series={[{ label: "Ratio TBC", values: TBC_RATIO, color: "var(--green-mid)", fill: true }]}
                  height={110}
                  showLegend={false}
                />
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">
                  Ratio TBC Min: <strong className="text-[color:var(--green-deep)]">5</strong>
                </div>
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">
                  Ratio &lt; Ratio Min: All Minecont kecuali <strong>PAMA GMO 6, FAD &amp; KDC LMO</strong>
                </div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Blindspot GR (Golden Rules)</SectionLabel>
                <KpiRow
                  from={47}
                  to={67}
                  fromSuffix="%"
                  toSuffix="%"
                  fromTone="bad"
                  toTone="bad"
                  pill={<TrendPill tone="up-bad">↑ memburuk</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>Blindspot GR Meningkat</SectionLabel>
                  <PartnerChips
                    items={GR_BLINDSPOT.map((g) => ({ name: `${g.name} (${g.tip.replace(" blindspot", "")})`, tip: g.tip, warn: true }))}
                  />
                </div>
              </div>

              <Narrative>
                Secara Ratio SAP dan TBC cenderung meningkat memenuhi minimum target, namun blindspot meningkat
                menunjukkan ratio belum merata sesuai kebutuhan setiap minggu kerja.
              </Narrative>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Golden Rules Berulang</SectionLabel>
                <ul className="space-y-1 text-[11px]">
                  {GR_REPEAT.map((g) => (
                    <li
                      key={g.name}
                      className="flex justify-between rounded bg-[color:var(--gold-bright)]/25 px-2 py-1"
                    >
                      <strong>{g.name}</strong>
                      <span className="text-[color:var(--ink-soft)]">{g.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Panel>

            {/* People */}
            <Panel title="People" subtitle="Worker Management" delay={0.08}>
              <div>
                <SectionLabel>Valid Golden Rules</SectionLabel>
                <KpiRow
                  from={15}
                  to={33}
                  fromTone="neutral"
                  toTone="good"
                  pill={<TrendPill tone="up-good">↑ naik</TrendPill>}
                />
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">Q1&apos;26 → Q2&apos;26</div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Fit to Work hasil MCU</SectionLabel>
                <div className="flex items-end gap-3">
                  <CountUp className="lp-kpi text-red-600" from={0} to={18} suffix="%" />
                </div>
                <div className="mt-1 text-[10px] text-red-600">Penurunan hasil MCU (Kelayakan Kerja)</div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Pelanggaran per Jenis Golden Rules</SectionLabel>
                <div className="overflow-x-auto">
                  <table className="lp-table w-full text-left text-[11px]">
                    <thead>
                      <tr>
                        <th>GR</th>
                        <th>Jenis</th>
                        <th className="text-center">Q1&apos;26</th>
                        <th className="text-center">Q2&apos;26</th>
                      </tr>
                    </thead>
                    <tbody>
                      {GR_TABLE.map((row) => (
                        <tr key={row.code} className={row.hot ? "lp-row-hot" : undefined}>
                          <td>{row.code}</td>
                          <td>{row.jenis}</td>
                          <td className="text-center text-[color:var(--ink-soft)]">{row.q1}</td>
                          <td className={`text-center font-semibold ${row.hot ? "lp-flash" : ""}`}>{row.q2}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-1 text-[9px] italic text-[color:var(--ink-soft)]">
                  Nilai ± — cek ulang ke sumber asli untuk presisi 100%.
                </div>
              </div>
            </Panel>

            {/* Highlight */}
            <Panel title="Highlight" subtitle="Golden Rules & To Be Concerned Hazard" tone="gold" delay={0.16}>
              <div className="grid grid-cols-2 gap-3">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h.title}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                    className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br ${h.tone}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <div className="h-10 w-10 rounded-full border-2 border-white/50" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-2.5 py-2 text-[11px] font-medium leading-snug text-white">
                      {h.title}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Panel>

            {/* Process */}
            <Panel title="Process" subtitle="Working Plan & Implementation" delay={0}>
              <div>
                <SectionLabel>Aggregator FTW (Fit To Work)</SectionLabel>
                <KpiRow
                  from={99.5}
                  to={97.6}
                  fromSuffix="%"
                  toSuffix="%"
                  decimals={1}
                  fromTone="good"
                  toTone="bad"
                  pill={<TrendPill tone="down-bad">↓ memburuk</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>FTW &lt; 100%</SectionLabel>
                  <PartnerChips
                    items={[
                      { name: FTW_BELOW[0], warn: true },
                      { name: FTW_BELOW[1], warn: false },
                      { name: FTW_BELOW[2], warn: true },
                    ]}
                  />
                </div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Implementasi IKK</SectionLabel>
                <KpiRow
                  from={98}
                  to={99}
                  fromSuffix="%"
                  toSuffix="%"
                  fromTone="neutral"
                  toTone="good"
                  pill={<TrendPill tone="up-good">↑ naik tipis</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>IKK &lt; 100%</SectionLabel>
                  <PartnerChips items={IKK_BELOW} />
                </div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Golden Time</SectionLabel>
                <KpiRow
                  from={68}
                  to={59}
                  fromSuffix="%"
                  toSuffix="%"
                  fromTone="neutral"
                  toTone="bad"
                  pill={<TrendPill tone="down-bad">↓ memburuk</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>Golden Time &lt; 100%</SectionLabel>
                  <PartnerChips items={GOLDEN_TIME_BELOW} />
                </div>
              </div>

              <Narrative>
                <div className="space-y-1.5">
                  <div>Implementasi Fatigue Management melalui Pengisian Fit to Work menurun, 100% belum tercapai, sudah teridentifikasi by operator.</div>
                  <div>Implementasi IKK terdapat peningkatan namun capaian belum konsisten tercapai pada seluruh mitra kerja.</div>
                  <div>Awareness pelaporan Emergency menurun di Q2, beberapa mitra kerja tidak melaporkan.</div>
                </div>
              </Narrative>
            </Panel>

            {/* Technology */}
            <Panel title="Technology" subtitle="Supporting Technology" delay={0.08}>
              <div>
                <SectionLabel>Leadtime Alert DMS</SectionLabel>
                <KpiRow
                  from={62}
                  to={67}
                  fromSuffix="%"
                  toSuffix="%"
                  fromTone="neutral"
                  toTone="good"
                  pill={<TrendPill tone="up-good">↑ naik</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>Leadtime under 5 Min &lt; 70%</SectionLabel>
                  <PartnerChips items={DMS_LEAD_BELOW} />
                </div>
              </div>

              <div className="space-y-2 border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Gap Inc terkait Teknologi</SectionLabel>
                {TECH_GAPS.map((g, i) => (
                  <motion.div
                    key={g.title}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.45 }}
                    className="rounded-md border-[1.5px] border-red-500 bg-red-50 px-2.5 py-2 text-[11px] leading-relaxed text-[color:var(--ink)]"
                  >
                    <div className="mb-0.5 text-[10px] font-bold text-red-600">{g.title}</div>
                    {g.body}
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Intervensi Alert DMS (Fatigue &amp; Violation)</SectionLabel>
                <KpiRow
                  from={72}
                  to={73}
                  fromSuffix="%"
                  toSuffix="%"
                  fromTone="neutral"
                  toTone="good"
                  pill={<TrendPill tone="up-good">↑ naik tipis</TrendPill>}
                />
                <div className="mt-2">
                  <SectionLabel danger>Intervensi &lt;</SectionLabel>
                  <PartnerChips items={DMS_INTERVENSI_BELOW} />
                </div>
                <div className="mt-1.5 text-[10px] italic text-[color:var(--ink-soft)]">
                  Catatan: pekerjaan di KDC belum tercover CCTV.
                </div>
              </div>
            </Panel>

            {/* BeARC */}
            <Panel title="BeARC" subtitle="Access Role Control" delay={0.16}>
              <div>
                <SectionLabel>Alur Akses Verifikasi</SectionLabel>
                <div className="flex flex-wrap items-center justify-between gap-1">
                  {BEARC_FLOW.map((node, i) => (
                    <div key={node} className="flex items-center gap-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08, type: "spring", stiffness: 260, damping: 18 }}
                        className="min-w-[70px] rounded-lg border-2 border-[color:var(--green-deep)] bg-emerald-50 px-2.5 py-2 text-center text-[10px] font-semibold text-[color:var(--ink)]"
                      >
                        <div className="mb-0.5 text-[10px] font-bold tracking-wide text-[color:var(--green-mid)]">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        {node}
                      </motion.div>
                      {i < BEARC_FLOW.length - 1 && (
                        <span className="text-lg text-[color:var(--green-deep)]" aria-hidden>
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3 text-center">
                <SectionLabel>Total Pekerja Banned</SectionLabel>
                <CountUp
                  className="lp-kpi block text-[52px] leading-none text-[color:var(--green-deep)]"
                  from={0}
                  to={283}
                  duration={1100}
                />
                <div className="mt-1 text-[10px] text-[color:var(--ink-soft)]">pekerja terkontrol aksesnya</div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-[color:var(--green-line)] pt-3">
                {BEARC_BREAKDOWN.map((b, i) => (
                  <div key={`${b.label}-${i}`} className="rounded bg-[color:var(--paper-soft,#f5f8f5)] p-2 text-center">
                    <div className="text-[9px] font-semibold uppercase text-[color:var(--ink-soft)]">{b.label}</div>
                    <CountUp
                      className="text-[20px] font-extrabold text-[color:var(--green-deep)]"
                      from={0}
                      to={b.value}
                    />
                  </div>
                ))}
              </div>

              <div className="border-t border-[color:var(--green-line)] pt-3">
                <SectionLabel>Dampak per Kategori</SectionLabel>
                <div className="grid grid-cols-4 gap-2">
                  {BEARC_IMPACT.map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 + i * 0.07 }}
                      className="text-center"
                    >
                      <CountUp
                        className={`text-[22px] font-extrabold ${c.up ? "text-[color:var(--green-deep)]" : "text-red-600"}`}
                        from={0}
                        to={c.value}
                        suffix="%"
                      />
                      <div className="text-[9px] text-[color:var(--ink-soft)]">{c.label}</div>
                      <div className={`text-[9px] font-bold ${c.up ? "text-[color:var(--green-deep)]" : "text-red-600"}`}>
                        {c.up ? "↑" : "↓"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Panel>
          </div>
        </motion.div>

        <footer className="mt-8 text-center text-[11px] text-[color:var(--ink-soft)]">
          <div>Leading Performance Dashboard · HSECM Q2 2026 · PT Berau Coal</div>
          <div className="mt-1 opacity-60">#SiagaSalingMenjaga · System Defender</div>
        </footer>
      </div>
    </div>
  );
}
