"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  PILLARS,
  PLAYERS_META,
  TACTICS,
  type PillarId,
  type PlayerId,
} from "./data";
import {
  ConeLayer,
  CoordLayer,
  FieldMarkings,
  FxLayer,
  MoveLayer,
  PassLayer,
  PitchDefs,
  RiskLayer,
  ZonesLayer,
} from "./PitchOverlays";

const PILLAR_ICON_PATHS: Record<string, string> = {
  crown: "M3 17h18l-2-9-5 4-4-6-4 6-5-4z M3 17v3h18v-3",
  users: "M9 8m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M3 20c0-3 3-5 6-5s6 2 6 5 M16 9m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M14 20c0-2 2-4 4.5-4s3.5 1.5 3.5 4",
  flow: "M4 6h10 M17 6m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M4 18h6 M13 18m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0 M14 8v4a2 2 0 0 1-2 2H8",
  cpu: "M5 5h14v14h-14z M9 9h6v6h-6z M9 2v3 M15 2v3 M9 19v3 M15 19v3 M2 9h3 M2 15h3 M19 9h3 M19 15h3",
};

function PillarIcon({ icon }: { icon: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="var(--tb-green-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={PILLAR_ICON_PATHS[icon]} />
    </svg>
  );
}

export default function TacticalBoard({ onNext }: { onNext?: () => void }) {
  const [activeTacticId, setActiveTacticId] = useState(TACTICS[0].id);
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerId | null>(null);
  const [hoveredPlayer, setHoveredPlayer] = useState<PlayerId | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [ballIndex, setBallIndex] = useState(0);
  const pitchRef = useRef<HTMLDivElement>(null);

  const activeTactic = useMemo(
    () => TACTICS.find((t) => t.id === activeTacticId) ?? TACTICS[0],
    [activeTacticId]
  );

  // ball animation
  useEffect(() => {
    setBallIndex(0);
    if (!isPlaying) return;
    const path = activeTactic.ballPath ?? [{ x: 50, y: 50 }];
    const baseMs = 1400 / speed;
    const timer = setInterval(() => {
      setBallIndex((i) => (i + 1) % path.length);
    }, baseMs);
    return () => clearInterval(timer);
  }, [activeTacticId, isPlaying, speed, activeTactic.ballPath]);

  const ballPath = activeTactic.ballPath ?? [{ x: 50, y: 50 }];
  const ballPos = ballPath[ballIndex % ballPath.length];

  const hoveredMeta = hoveredPlayer ? PLAYERS_META.find((p) => p.id === hoveredPlayer) : null;
  const hoveredNorm = hoveredPlayer ? activeTactic.normalized.find((p) => p.id === hoveredPlayer) : null;

  return (
    <div className="tactical-board font-body min-h-screen bg-white text-slate-900">
      {/* header */}
      <header className="bg-white px-4 pb-3 pt-5 md:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="grid h-11 w-11 place-items-center rounded-xl border bg-white shadow-sm"
                style={{ borderColor: "rgba(15, 92, 46, 0.18)" }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="var(--tb-green-deep)" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v18M3 12h18" opacity="0.35" />
                  <circle cx="12" cy="12" r="2.5" fill="var(--lime)" stroke="none" />
                </svg>
              </div>
              <div>
                <div className="mono text-[11px] tracking-[0.25em] text-emerald-700">HSECM TINGKAT I</div>
                <div className="font-heading text-sm font-semibold text-slate-800">
                  Quarter 2 &middot; Tahun 2026 &middot; Tactical Board
                </div>
              </div>
            </div>

            <div className="mono hidden items-center gap-2 text-xs text-slate-500 md:flex">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> LIVE
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-600 shadow-sm">
                FORMATION <span className="ml-1 text-emerald-700">{activeTactic.formation}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="tb-glass-strong flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-heading text-sm font-semibold text-slate-800 transition hover:border-emerald-400 hover:text-emerald-800"
              >
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
                <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePillar(null);
                  setSelectedPlayer(null);
                  setSpeed(1);
                  setIsPlaying(true);
                  setActiveTacticId(TACTICS[0].id);
                }}
                className="tb-glass-strong flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 font-heading text-sm font-semibold text-slate-800 transition hover:border-amber-400 hover:text-amber-800"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span className="hidden sm:inline">Reset</span>
              </button>
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                aria-label="Kecepatan animasi"
                className="tb-glass-strong cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 font-heading text-sm font-semibold text-slate-800 outline-none"
              >
                <option value={0.5}>0.5&times;</option>
                <option value={1}>1&times;</option>
                <option value={1.5}>1.5&times;</option>
              </select>
            </div>
          </div>

          <div className="mt-5 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              {["var(--dot-1)", "var(--dot-2)", "var(--dot-3)", "var(--dot-4)", "var(--dot-5)", "var(--dot-6)"].map((c) => (
                <span key={c} className="tb-swatch shadow-sm ring-1 ring-black/5" style={{ background: c }} />
              ))}
            </div>
            <div className="mono mb-2 text-[10px] tracking-[0.4em] text-emerald-700/80">
              &mdash; ENHANCING OPERATION &ndash; HSE PERFORMANCE &mdash;
            </div>
            <h1 className="font-heading text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-4xl">
              <span className="block text-slate-800">WE DEFEND THE SYSTEM,</span>
              <span className="mt-1 block bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent">
                SO THE OPERATION CAN MOVE FORWARD SAFELY
              </span>
            </h1>
            <div className="mono mt-2 text-[11px] tracking-[0.2em] text-slate-500 md:text-xs">
              Divisi berperan sebagai <span className="font-semibold text-slate-700">SYSTEM DEFENDER</span> dalam Sistem Bekerja Selamat
            </div>
            <div className="tb-title-underline mx-auto mt-3 max-w-3xl opacity-80" />
          </div>
        </div>
      </header>

      {/* main grid */}
      <main className="bg-white px-3 pb-10 md:px-6">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 lg:grid-cols-[240px_1fr_260px] lg:gap-5">
          {/* left pillar sidebar */}
          <aside className="order-2 lg:order-1">
            <div className="tb-glass h-full rounded-xl border border-slate-200 bg-white p-3 md:p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="mono text-[10px] tracking-[0.25em] text-emerald-700">PILLARS</div>
                <div className="mono text-[10px] text-slate-400">4 CORE</div>
              </div>

              <div className="tb-mobile-scroll-x flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-x-visible">
                {PILLARS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePillar((cur) => (cur === p.id ? null : p.id))}
                    className={`tb-pillar-card w-[170px] shrink-0 rounded-lg border border-slate-200 bg-white p-3 text-left lg:w-full lg:shrink ${
                      activePillar === p.id ? "tb-active-card" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-lime-50">
                        <PillarIcon icon={p.icon} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-heading text-sm font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] leading-snug text-slate-500">{p.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4">
                <div className="mono mb-2 text-[10px] tracking-[0.25em] text-slate-400">LEGEND</div>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li className="flex items-center gap-2"><span className="tb-leg-line bg-slate-500" /> Koordinasi</li>
                  <li className="flex items-center gap-2"><span className="tb-leg-line" style={{ background: "var(--tb-lime-400)" }} /> Passing / Info flow</li>
                  <li className="flex items-center gap-2"><span className="tb-leg-line" style={{ background: "var(--tb-amber)" }} /> Movement / Intervention</li>
                  <li className="flex items-center gap-2"><span className="tb-leg-dot" style={{ background: "var(--tb-danger)" }} /> Critical risk area</li>
                  <li className="flex items-center gap-2"><span className="tb-leg-dot" style={{ background: "var(--tb-emerald)" }} /> Control efektif</li>
                </ul>
              </div>
            </div>
          </aside>

          {/* center pitch */}
          <section className="order-1 lg:order-2">
            <div className="tb-glass-strong relative rounded-xl border border-slate-200 bg-white p-3 md:p-4">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div className="flex items-center gap-2">
                  <div className="mono text-[10px] tracking-[0.25em] text-emerald-700">ACTIVE TACTIC</div>
                  <div className="font-heading text-sm font-bold text-slate-900">{activeTactic.title}</div>
                </div>
                <div className="mono text-[10px] text-slate-400">
                  <span className="text-amber-700">{activeTactic.formation}</span>
                  <span className="mx-2 text-slate-300">|</span>
                  <span className="text-emerald-700">{`#${activeTactic.id}`}</span>
                </div>
                <p className="w-full text-[12px] leading-snug text-slate-600">{activeTactic.centerMessage}</p>
              </div>

              <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                <div
                  ref={pitchRef}
                  className="tb-pitch-stripes absolute inset-0 overflow-hidden rounded-lg border border-emerald-800/20 shadow-[inset_0_0_40px_rgba(0,0,0,0.18)]"
                >
                  <svg viewBox="0 0 1000 625" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <PitchDefs />
                    <FieldMarkings />
                    <ZonesLayer tactic={activeTactic} />
                    <CoordLayer tactic={activeTactic} pillar={activePillar} />
                    <PassLayer tactic={activeTactic} pillar={activePillar} />
                    <MoveLayer tactic={activeTactic} />
                    <ConeLayer tactic={activeTactic} />
                    <RiskLayer tactic={activeTactic} />
                    <FxLayer tactic={activeTactic} pillar={activePillar} />
                  </svg>

                  {/* players */}
                  <div className="absolute inset-0">
                    {activeTactic.normalized.map((p) => {
                      const isGK = p.id === "gk";
                      const isFocused = selectedPlayer === p.id;
                      return (
                        <div
                          key={p.id}
                          role="button"
                          tabIndex={0}
                          aria-label={`${p.role} #${p.num}`}
                          className={`tb-player absolute -translate-x-1/2 -translate-y-1/2 tb-breathe ${isFocused ? "tb-focused" : ""}`}
                          style={{ left: `${p.x}%`, top: `${p.y}%` }}
                          onMouseEnter={() => setHoveredPlayer(p.id)}
                          onMouseLeave={() => setHoveredPlayer(null)}
                          onFocus={() => setHoveredPlayer(p.id)}
                          onBlur={() => setHoveredPlayer(null)}
                          onClick={() => setSelectedPlayer((cur) => (cur === p.id ? null : p.id))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelectedPlayer((cur) => (cur === p.id ? null : p.id));
                            }
                          }}
                        >
                          <div className="relative">
                            <div className={`absolute -inset-2 rounded-full ${isGK ? "bg-amber-400/25" : "bg-white/15"}`} />
                            <div
                              className={`relative grid h-9 w-9 place-items-center rounded-full border-2 font-bold text-white shadow-lg md:h-10 md:w-10 ${
                                isGK
                                  ? "border-amber-100 bg-gradient-to-br from-amber-300 to-amber-500"
                                  : "border-white/70 bg-gradient-to-br from-emerald-600 to-emerald-900"
                              }`}
                            >
                              <span className="mono text-[11px] md:text-[12px]">{p.num}</span>
                              {isGK && (
                                <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full border border-amber-600 bg-white text-[9px] font-black text-amber-600">
                                  C
                                </span>
                              )}
                            </div>
                            <div className="mono absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/45 px-1.5 py-0.5 text-[9px] tracking-wider text-white/90">
                              {p.id.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ball */}
                  <div
                    className="absolute z-30 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all duration-[1200ms] ease-in-out"
                    style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
                  >
                    <div
                      className="absolute inset-0 rounded-full border border-black/30"
                      style={{ background: "radial-gradient(circle at 30% 30%, #fff 0%, #fff 40%, #111 41%, #111 50%, #fff 51%)" }}
                    />
                  </div>

                  {/* tooltip */}
                  {hoveredMeta && hoveredNorm && (
                    <div
                      className="tb-tooltip tb-glass-strong tb-show w-56 rounded-lg border border-emerald-200 px-3 py-2 text-[11px] shadow-lg"
                      style={{ left: `${hoveredNorm.x}%`, top: `${hoveredNorm.y}%` }}
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <div className="font-heading font-bold text-slate-900">{hoveredMeta.role}</div>
                        <div className="mono text-[10px] text-emerald-700">{`#${hoveredMeta.num}`}</div>
                      </div>
                      <div className="text-[10px] leading-snug text-slate-600">{hoveredMeta.resp}</div>
                      <div className="mono mt-1 border-t border-slate-200 pt-1 text-[10px] text-amber-700">
                        {`▸ ${activeTactic.title}: ${hoveredMeta.instr}`}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="mono text-[10px] tracking-[0.25em] text-slate-400">
                  <span className="text-slate-700">
                    {selectedPlayer ? PLAYERS_META.find((p) => p.id === selectedPlayer)?.role : "No selection"}
                  </span>
                  <span className="mx-2 text-slate-300">&middot;</span>
                  <span className="text-emerald-700">{isPlaying ? `EXECUTING · ${activeTactic.title}` : "PAUSED"}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><span className="tb-leg-dot" style={{ background: "var(--tb-amber)" }} /> Captain / GK</span>
                  <span className="inline-flex items-center gap-1.5"><span className="tb-leg-dot" style={{ background: "var(--tb-green-deep)" }} /> Outfield</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-slate-300 bg-white" /> Ball</span>
                </div>
              </div>
            </div>
          </section>

          {/* right tactic sidebar */}
          <aside className="order-3">
            <div className="tb-glass h-full rounded-xl border border-slate-200 bg-white p-3 md:p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="mono text-[10px] tracking-[0.25em] text-emerald-700">TACTICS</div>
                <div className="mono text-[10px] text-slate-400">6 PLAYS</div>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {TACTICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTacticId(t.id)}
                    className={`tb-tactic-card w-full rounded-lg border border-slate-200 bg-white p-3 text-left ${
                      t.id === activeTacticId ? "tb-active-card" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="mono text-[10px] tracking-[0.2em] text-emerald-700">{`#${t.id.toUpperCase()}`}</div>
                        <div className="font-heading text-sm font-bold leading-tight text-slate-900">{t.title}</div>
                      </div>
                      <div className="mono rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] text-amber-700">
                        {t.formation}
                      </div>
                    </div>
                    <div className="tb-mini-pitch relative mt-2 h-14">
                      {t.normalized.map((p) => (
                        <span
                          key={p.id}
                          className={`tb-mini-dot ${p.id === "gk" ? "tb-gk" : ""}`}
                          style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        />
                      ))}
                    </div>
                    <p className="mt-2 line-clamp-3 text-[11px] leading-snug text-slate-500">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white px-4 pb-8 text-center">
        <div className="mono text-[10px] tracking-[0.3em] text-slate-400">
          HSECM TINGKAT I &middot; TACTICAL OPERATIONS &middot; QUARTER 2 TAHUN 2026
        </div>
        {onNext && (
          <button
            type="button"
            onClick={onNext}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 font-heading text-sm font-bold text-emerald-800 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100"
          >
            Lanjut: Safety Performance
            <span aria-hidden>→</span>
          </button>
        )}
      </footer>
    </div>
  );
}
