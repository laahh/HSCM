export type PlayerId =
  | "gk"
  | "lb"
  | "cb1"
  | "cb2"
  | "rb"
  | "dm"
  | "cm1"
  | "cm2"
  | "lw"
  | "rw"
  | "st";

export interface PlayerMeta {
  id: PlayerId;
  num: number;
  role: string;
  resp: string;
  instr: string;
}

export const PLAYERS_META: PlayerMeta[] = [
  { id: "gk", num: 1, role: "Goalkeeper · Captain", resp: "Komandan terakhir, membaca seluruh lapangan, memulai build-up.", instr: "Sapu, komunikasikan, distribusikan." },
  { id: "lb", num: 2, role: "Left Back", resp: "Menjaga flank kiri, overlap, cover ruang belakang.", instr: "Jaga lebar, dukung winger." },
  { id: "cb1", num: 4, role: "Center Back (L)", resp: "Duel udara, intersepsi, cover rekannya.", instr: "Tetap compact, komunikasi garis." },
  { id: "cb2", num: 5, role: "Center Back (R)", resp: "Penyapu, pembaca bola panjang, inisiator umpan.", instr: "Sapu, umpan ke gelandang." },
  { id: "rb", num: 3, role: "Right Back", resp: "Menjaga flank kanan, bantu transisi.", instr: "Naik selektif, tutup balik." },
  { id: "dm", num: 6, role: "Defensive Midfield", resp: "Jangkar, memotong umpan lawan, eskalasi.", instr: "Scan, potong, distribusikan." },
  { id: "cm1", num: 8, role: "Central Midfield (L)", resp: "Penyeimbang, koneksi antar lini.", instr: "Jaga jarak, sambungkan lini." },
  { id: "cm2", num: 10, role: "Playmaker", resp: "Mengatur tempo, membaca celah, umpan kunci.", instr: "Baca, arahkan, eksekusi." },
  { id: "lw", num: 11, role: "Left Winger", resp: "Tekanan tinggi di flank, transisi cepat.", instr: "Press, potong, serang." },
  { id: "rw", num: 7, role: "Right Winger", resp: "Press balik, umpan silang, cut inside.", instr: "Press, isolasi, eksekusi." },
  { id: "st", num: 9, role: "Striker", resp: "Garis depan pertama pertahanan, target serangan.", instr: "Press pertama, tahan bola." },
];

export interface Vec2 {
  x: number;
  y: number;
}

export type ZoneType = "risk" | "safe" | "amber";

export interface Zone {
  type: ZoneType;
  x: number;
  y: number;
  r: number;
  label: string;
}

export interface Tactic {
  id: string;
  title: string;
  formation: string;
  desc: string;
  centerMessage: string;
  positions: Partial<Record<PlayerId, Vec2>>;
  coordLines?: [PlayerId, PlayerId][];
  passLines?: [PlayerId, PlayerId][];
  moveArrows?: { from: PlayerId; dx: number; dy: number }[];
  zones?: Zone[];
  cones?: { player: PlayerId }[];
  risks?: Vec2[];
  focusPlayers?: PlayerId[];
  ballPath?: Vec2[];
  commsFrom?: PlayerId;
  interceptAt?: Vec2;
  shieldAt?: Vec2;
  normalized: (PlayerMeta & Vec2)[];
}

type RawTactic = Omit<Tactic, "normalized">;

const RAW_TACTICS: RawTactic[] = [
  {
    id: "read-game",
    title: "READ THE GAME",
    formation: "LAGGING",
    desc: "Menggambarkan kondisi performance lagging beserta profilingnya.",
    centerMessage: "Menggambarkan kondisi performance lagging beserta profilingnya.",
    positions: {
      gk: { x: 50, y: 94 }, lb: { x: 14, y: 78 }, cb1: { x: 36, y: 82 }, cb2: { x: 64, y: 82 }, rb: { x: 86, y: 78 },
      dm: { x: 50, y: 62 }, cm1: { x: 24, y: 58 }, cm2: { x: 76, y: 58 },
      lw: { x: 16, y: 34 }, st: { x: 50, y: 28 }, rw: { x: 84, y: 34 },
    },
    coordLines: [["gk", "cb1"], ["gk", "cb2"], ["cb1", "cb2"], ["lb", "cm1"], ["rb", "cm2"], ["dm", "cm1"], ["dm", "cm2"]],
    zones: [{ type: "amber", x: 50, y: 20, r: 14, label: "RISK SCAN" }],
    risks: [{ x: 30, y: 22 }, { x: 68, y: 18 }, { x: 50, y: 10 }],
    focusPlayers: ["st", "cm2", "dm"],
    ballPath: [{ x: 50, y: 50 }, { x: 40, y: 40 }, { x: 60, y: 30 }, { x: 50, y: 20 }],
  },
  {
    id: "maintain-shape",
    title: "MAINTAIN SHAPE",
    formation: "LEADING",
    desc: "Strategi pengendalian performance melalui indikator leading.",
    centerMessage: "Strategi pengendalian performance melalui indikator leading.",
    positions: {
      gk: { x: 50, y: 94 }, lb: { x: 24, y: 78 }, cb1: { x: 42, y: 80 }, cb2: { x: 58, y: 80 }, rb: { x: 76, y: 78 },
      dm: { x: 24, y: 58 }, cm1: { x: 42, y: 60 }, cm2: { x: 58, y: 60 }, lw: { x: 76, y: 58 },
      st: { x: 42, y: 38 }, rw: { x: 58, y: 38 },
    },
    coordLines: [
      ["lb", "cb1"], ["cb1", "cb2"], ["cb2", "rb"],
      ["dm", "cm1"], ["cm1", "cm2"], ["cm2", "lw"],
      ["st", "rw"],
      ["lb", "dm"], ["cb1", "cm1"], ["cb2", "cm2"], ["rb", "lw"],
    ],
    zones: [{ type: "safe", x: 50, y: 70, r: 22, label: "COMPACT BLOCK" }],
    focusPlayers: ["cb1", "cb2", "dm", "cm1"],
    ballPath: [{ x: 50, y: 60 }, { x: 50, y: 50 }, { x: 50, y: 40 }],
  },
  {
    id: "direct-team",
    title: "DIRECT THE TEAM",
    formation: "LEADERSHIP",
    desc: "Leadership mengarahkan dan memastikan pekerja melaksanakan pekerjaan dengan benar.",
    centerMessage: "Leadership mengarahkan dan memastikan pekerja melaksanakan pekerjaan dengan benar.",
    positions: {
      gk: { x: 50, y: 94 }, lb: { x: 20, y: 80 }, cb1: { x: 40, y: 82 }, cb2: { x: 60, y: 82 }, rb: { x: 80, y: 80 },
      dm: { x: 50, y: 62 }, cm1: { x: 30, y: 60 }, cm2: { x: 70, y: 60 },
      lw: { x: 24, y: 38 }, st: { x: 50, y: 32 }, rw: { x: 76, y: 38 },
    },
    commsFrom: "gk",
    zones: [{ type: "safe", x: 50, y: 94, r: 10, label: "HQ" }],
    focusPlayers: ["gk"],
    ballPath: [{ x: 50, y: 94 }, { x: 50, y: 62 }, { x: 30, y: 60 }, { x: 50, y: 32 }],
  },
  {
    id: "intercept-early",
    title: "INTERCEPT EARLY",
    formation: "EARLY DETECT",
    desc: "Deteksi dini gap dan pembacaan anomia, sebelum terjadi peningkatan risiko.",
    centerMessage: "Deteksi dini gap dan pembacaan anomia, sebelum terjadi peningkatan risiko.",
    positions: {
      gk: { x: 50, y: 94 }, lb: { x: 20, y: 74 }, cb1: { x: 40, y: 76 }, cb2: { x: 60, y: 76 }, rb: { x: 80, y: 74 },
      dm: { x: 38, y: 58 }, cm1: { x: 62, y: 58 },
      cm2: { x: 24, y: 40 }, lw: { x: 50, y: 38 }, rw: { x: 76, y: 40 },
      st: { x: 50, y: 22 },
    },
    moveArrows: [
      { from: "st", dx: 0, dy: -6 }, { from: "lw", dx: -4, dy: -4 }, { from: "rw", dx: 4, dy: -4 },
    ],
    zones: [{ type: "risk", x: 50, y: 18, r: 12, label: "INTERCEPT ZONE" }],
    risks: [{ x: 50, y: 18 }],
    interceptAt: { x: 50, y: 22 },
    focusPlayers: ["st", "lw", "rw"],
    ballPath: [{ x: 50, y: 10 }, { x: 50, y: 22 }],
  },
  {
    id: "protect-critical",
    title: "PROTECT CRITICAL AREA",
    formation: "CRITICAL",
    desc: "Pengendalian pada area kritis.",
    centerMessage: "Pengendalian pada area kritis.",
    positions: {
      gk: { x: 50, y: 95 }, lb: { x: 14, y: 82 }, cb1: { x: 30, y: 84 }, dm: { x: 50, y: 85 }, cb2: { x: 70, y: 84 }, rb: { x: 86, y: 82 },
      cm1: { x: 24, y: 68 }, cm2: { x: 42, y: 70 }, lw: { x: 58, y: 70 }, rw: { x: 76, y: 68 },
      st: { x: 50, y: 48 },
    },
    zones: [
      { type: "risk", x: 50, y: 88, r: 18, label: "CRITICAL AREA" },
      { type: "safe", x: 50, y: 88, r: 10, label: "SHIELD" },
    ],
    shieldAt: { x: 50, y: 88 },
    focusPlayers: ["cb1", "cb2", "dm", "gk"],
    ballPath: [{ x: 50, y: 30 }, { x: 50, y: 50 }, { x: 50, y: 70 }],
  },
  {
    id: "build-from-back",
    title: "BUILD FROM THE BACK",
    formation: "SOLUTION",
    desc: "Memberikan solusi menyederhanakan.",
    centerMessage: "Memberikan solusi menyederhanakan.",
    positions: {
      gk: { x: 50, y: 95 }, cb1: { x: 26, y: 82 }, dm: { x: 50, y: 84 }, cb2: { x: 74, y: 82 },
      lb: { x: 38, y: 68 }, rb: { x: 62, y: 68 },
      cm1: { x: 16, y: 50 }, cm2: { x: 40, y: 52 }, lw: { x: 60, y: 52 }, rw: { x: 84, y: 50 },
      st: { x: 50, y: 30 },
    },
    passLines: [
      ["gk", "cb1"], ["cb1", "dm"], ["dm", "rb"],
      ["rb", "cm2"], ["cm2", "st"],
    ],
    zones: [{ type: "safe", x: 50, y: 85, r: 14, label: "BUILD-UP BASE" }],
    focusPlayers: ["gk", "cb1", "dm", "rb", "st"],
    ballPath: [{ x: 50, y: 95 }, { x: 26, y: 82 }, { x: 50, y: 84 }, { x: 62, y: 68 }, { x: 40, y: 52 }, { x: 50, y: 30 }],
  },
];

function normalize(raw: RawTactic): Tactic {
  const normalized = PLAYERS_META.map((meta) => {
    const pos = raw.positions[meta.id];
    return { ...meta, x: pos?.x ?? 50, y: pos?.y ?? 50 };
  });
  return { ...raw, normalized };
}

export const TACTICS: Tactic[] = RAW_TACTICS.map(normalize);

export type PillarId = "leadership" | "people" | "process" | "technology";

export interface Pillar {
  id: PillarId;
  title: string;
  icon: "crown" | "users" | "flow" | "cpu";
  desc: string;
}

export const PILLARS: Pillar[] = [
  { id: "leadership", title: "Leadership", icon: "crown", desc: "Kapten sebagai komandan: visi, arahan, dan akuntabilitas." },
  { id: "people", title: "People", icon: "users", desc: "Setiap individu memahami peran, tanggung jawab, dan rekan." },
  { id: "process", title: "Process", icon: "flow", desc: "SOP, escalation path, dan critical control yang dijalankan konsisten." },
  { id: "technology", title: "Technology", icon: "cpu", desc: "Sensor, GPS, dashboard, dan warning signal yang memperkuat keputusan." },
];

export function pctToSvg(xPct: number, yPct: number): Vec2 {
  return { x: 20 + (xPct / 100) * 960, y: 20 + (yPct / 100) * 585 };
}

export function getPlayerPos(tactic: Tactic, id: PlayerId): Vec2 {
  const p = tactic.normalized.find((n) => n.id === id);
  return p ? pctToSvg(p.x, p.y) : { x: 500, y: 312 };
}

export function allCoordPairs(tactic: Tactic): [PlayerId, PlayerId][] {
  const ids = PLAYERS_META.map((p) => p.id);
  const pairs: [PlayerId, PlayerId][] = [];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = getPlayerPos(tactic, ids[i]);
      const b = getPlayerPos(tactic, ids[j]);
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 260) pairs.push([ids[i], ids[j]]);
    }
  }
  return pairs;
}
