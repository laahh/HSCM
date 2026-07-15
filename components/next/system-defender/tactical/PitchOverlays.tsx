"use client";

import {
  PLAYERS_META,
  allCoordPairs,
  getPlayerPos,
  pctToSvg,
  type PillarId,
  type Tactic,
} from "./data";

const ZONE_FILL: Record<string, string> = {
  risk: "url(#riskGrad)",
  amber: "url(#amberGrad)",
  safe: "url(#safeGrad)",
};
const ZONE_LABEL_COLOR: Record<string, string> = {
  risk: "#fecaca",
  amber: "#fef08a",
  safe: "#d9f99d",
};

export function ZonesLayer({ tactic }: { tactic: Tactic }) {
  return (
    <g>
      {(tactic.zones ?? []).map((z) => {
        const c = pctToSvg(z.x, z.y);
        const rPx = (z.r / 100) * 585;
        return (
          <g key={z.label}>
            <circle
              cx={c.x}
              cy={c.y}
              r={rPx}
              fill={ZONE_FILL[z.type]}
              style={{ transformOrigin: `${c.x}px ${c.y}px`, transformBox: "fill-box", animation: "tb-pulseRing 3s ease-out infinite" }}
            />
            <text
              x={c.x}
              y={c.y - rPx - 6}
              textAnchor="middle"
              fill={ZONE_LABEL_COLOR[z.type]}
              fontSize="14"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
            >
              {z.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function CoordLayer({ tactic, pillar }: { tactic: Tactic; pillar: PillarId | null }) {
  const showAll = pillar === "people" || pillar === "process";
  const lines = showAll ? allCoordPairs(tactic) : tactic.coordLines ?? [];
  return (
    <g>
      {lines.map(([a, b], i) => {
        const p1 = getPlayerPos(tactic, a);
        const p2 = getPlayerPos(tactic, b);
        return (
          <line
            key={`${a}-${b}-${i}`}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke={showAll ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.35)"}
            strokeWidth="1.2"
            className="tb-dash-march"
          />
        );
      })}
    </g>
  );
}

export function PassLayer({ tactic, pillar }: { tactic: Tactic; pillar: PillarId | null }) {
  const lines = pillar === "process" && !(tactic.passLines ?? []).length ? tactic.coordLines ?? [] : tactic.passLines ?? [];
  return (
    <g>
      {lines.map(([a, b], idx) => {
        const p1 = getPlayerPos(tactic, a);
        const p2 = getPlayerPos(tactic, b);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2 - 20;
        return (
          <path
            key={`${a}-${b}-${idx}`}
            d={`M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`}
            stroke="#a3e635"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowCyan)"
            opacity="0.9"
            className="tb-path-draw"
            style={{ animationDelay: `${idx * 0.15}s` }}
          />
        );
      })}
    </g>
  );
}

export function MoveLayer({ tactic }: { tactic: Tactic }) {
  return (
    <g>
      {(tactic.moveArrows ?? []).map((m, i) => {
        const p = getPlayerPos(tactic, m.from);
        const ex = p.x + m.dx * 10;
        const ey = p.y + m.dy * 10;
        return (
          <line
            key={i}
            x1={p.x}
            y1={p.y}
            x2={ex}
            y2={ey}
            stroke="#f5b820"
            strokeWidth="2.5"
            markerEnd="url(#arrowAmber)"
            className="tb-path-draw"
          />
        );
      })}
    </g>
  );
}

export function ConeLayer({ tactic }: { tactic: Tactic }) {
  return (
    <g>
      {(tactic.cones ?? []).map((c) => {
        const p = getPlayerPos(tactic, c.player);
        return (
          <g key={c.player} transform={`translate(${p.x} ${p.y})`}>
            <g className="tb-cone-sweep">
              <path d="M 0 0 L -60 -160 A 70 170 0 0 1 60 -160 Z" fill="url(#coneGrad)" opacity="0.7" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

export function RiskLayer({ tactic }: { tactic: Tactic }) {
  return (
    <g>
      {(tactic.risks ?? []).map((r, i) => {
        const p = pctToSvg(r.x, r.y);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="14" fill="url(#riskGrad)" className="tb-blink" />
            <circle cx={p.x} cy={p.y} r="4" fill="#e63946" />
            <text x={p.x} y={p.y - 18} textAnchor="middle" fill="#fecaca" fontSize="13" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
              RISK
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function FxLayer({ tactic, pillar }: { tactic: Tactic; pillar: PillarId | null }) {
  const elements: React.ReactNode[] = [];

  if (tactic.shieldAt) {
    const p = pctToSvg(tactic.shieldAt.x, tactic.shieldAt.y);
    elements.push(
      <g key="shield" transform={`translate(${p.x} ${p.y})`} className="tb-breathe">
        <path
          d="M 0 -40 L 30 -28 L 30 10 C 30 28 15 40 0 48 C -15 40 -30 28 -30 10 L -30 -28 Z"
          fill="rgba(34,197,94,0.25)"
          stroke="#22c55e"
          strokeWidth="2"
        />
        <path d="M -10 0 L -2 10 L 14 -8" fill="none" stroke="#bbf7d0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }

  if (tactic.interceptAt) {
    const p = pctToSvg(tactic.interceptAt.x, tactic.interceptAt.y);
    elements.push(
      <g key="intercept" transform={`translate(${p.x} ${p.y})`}>
        <circle r="22" fill="rgba(34,197,94,0.25)" stroke="#22c55e" strokeWidth="2" className="tb-blink" />
        <text y="4" textAnchor="middle" fill="#bbf7d0" fontSize="15" fontWeight="bold" fontFamily="JetBrains Mono, monospace">
          STOP
        </text>
      </g>
    );
  }

  if (tactic.commsFrom || pillar === "leadership") {
    const from = tactic.commsFrom ?? "gk";
    const p1 = getPlayerPos(tactic, from);
    elements.push(
      <g key="comms">
        {PLAYERS_META.filter((m) => m.id !== from).map((m) => {
          const p2 = getPlayerPos(tactic, m.id);
          return (
            <line
              key={m.id}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="#a3e635"
              strokeWidth="1"
              strokeDasharray="2 6"
              opacity="0.6"
              className="tb-dash-march"
            />
          );
        })}
        <circle cx={p1.x} cy={p1.y} r="6" fill="none" stroke="#a3e635" strokeWidth="2" className="tb-ripple" />
        <circle cx={p1.x} cy={p1.y} r="6" fill="none" stroke="#a3e635" strokeWidth="2" className="tb-ripple" style={{ animationDelay: "1s" }} />
        <g transform={`translate(${p1.x + 18} ${p1.y - 26})`}>
          <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#0a3319" stroke="#a3e635" strokeWidth="1.5" />
          <path d="M -4 -6 L -2 -12 L 2 -12 L 4 -6" fill="none" stroke="#a3e635" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="1.5" fill="#a3e635" />
        </g>
      </g>
    );
  }

  if (pillar === "technology") {
    elements.push(
      <g key="tech">
        {[[6, 6], [94, 6], [6, 94], [94, 94]].map(([x, y], i) => {
          const p = pctToSvg(x, y);
          return (
            <g key={i} transform={`translate(${p.x} ${p.y})`}>
              <circle r="10" fill="#0a3319" stroke="#a3e635" strokeWidth="1.5" />
              <path d="M -4 -3 L 4 -3 L 4 3 L -4 3 Z" fill="#a3e635" />
              <text y="22" textAnchor="middle" fill="#bef264" fontSize="12" fontFamily="JetBrains Mono, monospace">
                {`CAM${i + 1}`}
              </text>
            </g>
          );
        })}
        {(() => {
          const c = pctToSvg(92, 50);
          return (
            <g transform={`translate(${c.x} ${c.y})`}>
              <rect x="-40" y="-26" width="80" height="52" rx="4" fill="#0a3319" stroke="#a3e635" strokeWidth="1.5" />
              <path d="M -32 -10 L -20 -18 L -8 -6 L 4 -14 L 16 -2 L 28 -10" fill="none" stroke="#a3e635" strokeWidth="1.5" />
              <text y="18" textAnchor="middle" fill="#bef264" fontSize="12" fontFamily="JetBrains Mono, monospace">
                ANALYTICS
              </text>
            </g>
          );
        })()}
        {PLAYERS_META.map((m) => {
          const p = getPlayerPos(tactic, m.id);
          return <circle key={m.id} cx={p.x} cy={p.y - 22} r="3" fill="#a3e635" className="tb-blink" />;
        })}
      </g>
    );
  }

  (tactic.focusPlayers ?? []).forEach((id) => {
    const p = getPlayerPos(tactic, id);
    elements.push(
      <circle
        key={`focus-${id}`}
        cx={p.x}
        cy={p.y}
        r="26"
        fill="none"
        stroke="#f5b820"
        strokeWidth="2"
        strokeDasharray="3 4"
        className="tb-dash-march"
      />
    );
  });

  return <g>{elements}</g>;
}

export function PitchDefs() {
  return (
    <defs>
      <linearGradient id="cyanGrad" x1="0" x2="1">
        <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
        <stop offset="50%" stopColor="#a3e635" stopOpacity="1" />
        <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="riskGrad">
        <stop offset="0%" stopColor="#e63946" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="safeGrad">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.38" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="amberGrad">
        <stop offset="0%" stopColor="#f5b820" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#f5b820" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="coneGrad" x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#a3e635" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#a3e635" stopOpacity="0" />
      </linearGradient>
      <marker id="arrowAmber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#f5b820" />
      </marker>
      <marker id="arrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a3e635" />
      </marker>
    </defs>
  );
}

export function FieldMarkings() {
  return (
    <>
      <rect x="20" y="20" width="960" height="585" className="tb-field-line" />
      <line x1="20" y1="312.5" x2="980" y2="312.5" className="tb-field-line" />
      <circle cx="500" cy="312.5" r="70" className="tb-field-line" />
      <circle cx="500" cy="312.5" r="3" fill="white" />

      <rect x="260" y="20" width="480" height="130" className="tb-field-line" />
      <rect x="380" y="20" width="240" height="50" className="tb-field-line" />
      <circle cx="500" cy="115" r="3" fill="white" />
      <path d="M 410 150 A 70 70 0 0 0 590 150" className="tb-field-line" />

      <rect x="260" y="475" width="480" height="130" className="tb-field-line" />
      <rect x="380" y="555" width="240" height="50" className="tb-field-line" />
      <circle cx="500" cy="510" r="3" fill="white" />
      <path d="M 410 475 A 70 70 0 0 1 590 475" className="tb-field-line" />

      <rect x="450" y="10" width="100" height="10" className="tb-field-line-soft" />
      <rect x="450" y="605" width="100" height="10" className="tb-field-line-soft" />

      <path d="M 20 35 A 15 15 0 0 1 35 20" className="tb-field-line-soft" />
      <path d="M 965 20 A 15 15 0 0 1 980 35" className="tb-field-line-soft" />
      <path d="M 35 605 A 15 15 0 0 1 20 590" className="tb-field-line-soft" />
      <path d="M 980 590 A 15 15 0 0 1 965 605" className="tb-field-line-soft" />
    </>
  );
}
