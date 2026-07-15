"use client";

import { motion, useReducedMotion } from "framer-motion";
import { QUAD_TABLE_DESC, SCATTER, type QuadKey, type ScatterPoint } from "./data";
import { contractorLogo } from "./contractorLogo";

const QUAD_ORDER: QuadKey[] = ["K1", "K2", "K3", "K4"];

const QUAD_TONE: Record<
  QuadKey,
  { label: string; fill: string; soft: string; text: string; border: string; chip: string }
> = {
  K1: {
    label: "K1",
    fill: "#fecaca",
    soft: "#fff1f2",
    text: "#991b1b",
    border: "#f87171",
    chip: "#dc2626",
  },
  K2: {
    label: "K2",
    fill: "#fed7aa",
    soft: "#fff7ed",
    text: "#9a3412",
    border: "#fb923c",
    chip: "#ea580c",
  },
  K3: {
    label: "K3",
    fill: "#fef08a",
    soft: "#fefce8",
    text: "#854d0e",
    border: "#eab308",
    chip: "#ca8a04",
  },
  K4: {
    label: "K4",
    fill: "#bbf7d0",
    soft: "#f0fdf4",
    text: "#166534",
    border: "#4ade80",
    chip: "#16a34a",
  },
};

const easeOut = [0.22, 1, 0.36, 1] as const;

function formatLead(n: number) {
  return `${n.toFixed(2)}%`;
}

function formatTrans(d: ScatterPoint) {
  return `${d.q1}→${d.q}`;
}

export default function ContractorRaporTable({
  variant = "compact",
  animate = false,
}: {
  variant?: "compact" | "hero";
  animate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const hero = variant === "hero";
  const play = animate && !reduceMotion;

  const byQuad = QUAD_ORDER.map((q) => ({
    q,
    rows: SCATTER.filter((d) => d.q === q),
    desc: QUAD_TABLE_DESC[q],
    tone: QUAD_TONE[q],
  }));

  let rowIndex = 0;

  return (
    <motion.div
      className={`flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
        hero ? "min-h-0" : "h-full min-h-[420px]"
      }`}
      initial={play ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: easeOut }}
    >
      {hero && (
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/50 px-4 py-3 sm:px-5">
          <div>
            <div className="text-sm font-black text-[color:var(--ink)]">Tabel Rapor per Kuadran</div>
            <div className="text-[11px] text-slate-500">Kontraktor · Lagging · Leading · Causal Gap</div>
          </div>
          <div className="hidden flex-wrap gap-1.5 sm:flex">
            {QUAD_ORDER.map((q) => (
              <span
                key={q}
                className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                style={{ background: QUAD_TONE[q].chip }}
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-auto">
        <table
          className={`w-full table-fixed border-collapse text-left ${
            hero ? "text-[12px] sm:text-[13px]" : "text-[10px]"
          }`}
        >
          <colgroup>
            <col className={hero ? "w-[12%]" : "w-[11%]"} />
            <col className={hero ? "w-[22%]" : "w-[22%]"} />
            <col className={hero ? "w-[18%]" : "w-[18%]"} />
            <col className={hero ? "w-[12%]" : "w-[14%]"} />
            <col className={hero ? "w-[36%]" : "w-[35%]"} />
          </colgroup>
          <thead className="sticky top-0 z-[1]">
            <motion.tr
              initial={play ? { opacity: 0, y: -8 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: play ? 0.1 : 0, duration: 0.35 }}
            >
              <th
                className={`border-b border-slate-200 bg-[#e8f5e9] font-bold text-[color:var(--ink)] ${
                  hero ? "px-3 py-3" : "px-1.5 py-1.5"
                }`}
              >
                Kuadran
                <span
                  className={`mt-0.5 block font-semibold leading-tight text-slate-500 ${
                    hero ? "text-[10px]" : "text-[8px]"
                  }`}
                >
                  Q1→Q2
                </span>
              </th>
              <th
                className={`border-b border-slate-200 bg-[#e8f5e9] font-bold text-[color:var(--ink)] ${
                  hero ? "px-3 py-3" : "px-1.5 py-1.5"
                }`}
              >
                Kontraktor
              </th>
              <th
                className={`border-b border-slate-200 bg-[#dbeafe] text-center font-bold text-[#1e3a5f] ${
                  hero ? "px-3 py-3" : "px-1.5 py-1.5"
                }`}
              >
                Lagging
              </th>
              <th
                className={`border-b border-slate-200 bg-[#f5e6c8] text-center font-bold text-[#5c4a1f] ${
                  hero ? "px-3 py-3" : "px-1.5 py-1.5"
                }`}
              >
                Leading
              </th>
              <th
                className={`border-b border-slate-200 bg-[#e2e8f0] font-bold text-slate-700 ${
                  hero ? "px-3 py-3" : "px-1.5 py-1.5"
                }`}
              >
                Gap Related Causal
              </th>
            </motion.tr>
          </thead>
          <tbody>
            {byQuad.map(({ q, rows, desc, tone }) => {
              if (rows.length === 0) {
                const ri = rowIndex++;
                return (
                  <motion.tr
                    key={q}
                    className="border-b border-slate-200"
                    initial={play ? { opacity: 0, x: -12 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: play ? 0.2 + ri * 0.06 : 0, duration: 0.4, ease: easeOut }}
                  >
                    <td
                      className={`border-r border-slate-100 align-middle text-center ${
                        hero ? "px-3 py-3" : "px-1.5 py-1.5"
                      }`}
                      style={{ background: tone.fill }}
                      title={desc}
                    >
                      <div className={`font-black ${hero ? "text-base" : ""}`} style={{ color: tone.text }}>
                        {tone.label}
                      </div>
                    </td>
                    <td
                      className={`border-r border-slate-100 italic text-slate-400 ${
                        hero ? "px-3 py-3" : "px-1.5 py-1.5"
                      }`}
                      style={{ background: tone.soft }}
                    >
                      —
                    </td>
                    <td className="border-r border-slate-100 px-1.5 py-1.5 text-center text-slate-300">—</td>
                    <td className="border-r border-slate-100 px-1.5 py-1.5 text-center text-slate-300">—</td>
                    <td className="px-1.5 py-1.5 text-center text-slate-300">—</td>
                  </motion.tr>
                );
              }

              return rows.map((row, i) => {
                const ri = rowIndex++;
                return (
                  <motion.tr
                    key={row.name}
                    className="border-b border-slate-200"
                    initial={play ? { opacity: 0, x: -16 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: play ? 0.22 + ri * 0.07 : 0,
                      duration: 0.42,
                      ease: easeOut,
                    }}
                    whileHover={
                      hero
                        ? { backgroundColor: "rgba(15, 23, 42, 0.02)" }
                        : undefined
                    }
                  >
                    {i === 0 ? (
                      <td
                        rowSpan={rows.length}
                        className={`border-r border-slate-100 align-middle text-center ${
                          hero ? "px-3 py-3" : "px-1.5 py-1.5"
                        }`}
                        style={{ background: tone.fill }}
                        title={desc}
                      >
                        <div
                          className={`font-black leading-none ${hero ? "text-lg" : ""}`}
                          style={{ color: tone.text }}
                        >
                          {tone.label}
                        </div>
                        <div
                          className={`mt-1 leading-tight ${hero ? "text-[10px]" : "text-[8px]"}`}
                          style={{ color: tone.text, opacity: 0.8 }}
                        >
                          {desc}
                        </div>
                      </td>
                    ) : null}
                    <td
                      className={`border-r border-slate-100 align-middle ${
                        hero ? "px-3 py-2.5" : "px-1.5 py-1"
                      }`}
                      style={{ background: tone.soft }}
                    >
                      <div className="flex items-center gap-2">
                        {contractorLogo(row.name) && (
                          <motion.span
                            className={`grid shrink-0 place-items-center overflow-hidden rounded-full border bg-white ${
                              hero ? "h-9 w-9 border-2" : "h-6 w-6 border border-slate-200"
                            }`}
                            style={{ borderColor: tone.border }}
                            initial={play ? { scale: 0.6, opacity: 0 } : false}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              delay: play ? 0.28 + ri * 0.07 : 0,
                              type: "spring",
                              stiffness: 360,
                              damping: 18,
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={contractorLogo(row.name)!}
                              alt=""
                              className="h-full w-full object-contain p-[2px]"
                            />
                          </motion.span>
                        )}
                        <div className="min-w-0">
                          <div
                            className={`font-bold leading-tight text-[color:var(--ink)] ${
                              hero ? "text-sm" : ""
                            }`}
                          >
                            {row.name}
                          </div>
                          <div
                            className={`font-mono text-slate-500 ${hero ? "text-[10px]" : "text-[8px]"}`}
                          >
                            {formatTrans(row)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className={`border-r border-slate-100 text-center align-middle font-semibold leading-tight text-[color:var(--ink)] ${
                        hero ? "px-3 py-2.5" : "px-1.5 py-1"
                      }`}
                      style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                    >
                      {row.inc}
                    </td>
                    <td
                      className={`border-r border-slate-100 text-center align-middle font-heading font-black tabular-nums text-[color:var(--ink)] ${
                        hero ? "px-3 py-2.5 text-base" : "px-1.5 py-1 text-[11px]"
                      }`}
                      style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                    >
                      {formatLead(row.lead)}
                    </td>
                    <td
                      className={`align-middle leading-snug text-[color:var(--ink)] ${
                        hero ? "px-3 py-2.5" : "px-1.5 py-1"
                      }`}
                      style={{ background: i % 2 === 0 ? tone.soft : "#fff" }}
                    >
                      {row.gapCausal.length === 0 ? (
                        <span className="text-slate-400">—</span>
                      ) : hero ? (
                        <div className="flex flex-wrap gap-1">
                          {row.gapCausal.map((c, ci) => (
                            <motion.span
                              key={c}
                              className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 shadow-sm"
                              initial={play ? { opacity: 0, scale: 0.85 } : false}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{
                                delay: play ? 0.35 + ri * 0.07 + ci * 0.04 : 0,
                                duration: 0.3,
                              }}
                            >
                              {c}
                            </motion.span>
                          ))}
                        </div>
                      ) : (
                        row.gapCausal.join(", ")
                      )}
                    </td>
                  </motion.tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
