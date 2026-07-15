export const PERFORMANCE_QUOTE =
  'Performance Q2 2026 masih mencatatkan terdapatnya kejadian berakibat ke pekerja yaitu 2 Medical Treatment Injury dan Accident Non Injury meningkat 14%. Peningkatan 11% kejadian pada Mitra Kerja Mine Contractor baik pada Aktivitas Core & Support, terutama catatan kejadian di PAMA, baik PAMA BMO dan PAMA GMO. Terdapat perulangan Insiden pada Aktivitas Support terutama di Area Pit Service & Maintenance.';

export const TACTIC_CARDS = [
  {
    n: "01",
    title: "READ THE GAME",
    desc: "Membaca pergerakan lawan (risiko) lebih awal dari data, observasi, dan pengalaman.",
  },
  {
    n: "02",
    title: "MAINTAIN SHAPE",
    desc: "Menjaga struktur & jarak pengendalian agar tidak ada celah risiko.",
  },
  {
    n: "03",
    title: "DIRECT THE TEAM",
    desc: "Komunikasi, arahan, dan pengingat agar semua berada pada posisi yang benar.",
  },
  {
    n: "04",
    title: "INTERCEPT EARLY",
    desc: "Memotong serangan (risiko) sebelum masuk ke area berbahaya.",
  },
  {
    n: "05",
    title: "PROTECT CRITICAL AREA",
    desc: "Fokus melindungi area dengan konsekuensi tertinggi.",
  },
  {
    n: "06",
    title: "BUILD FROM THE BACK",
    desc: "Memberikan solusi, menyederhanakan kontrol, membantu operasi maju dengan aman.",
  },
] as const;

export type PyramidRow = {
  label: string;
  color: string;
  v25: string;
  vq1: string;
  vq2: string;
  concern: boolean;
  redText?: boolean;
  redQ1?: boolean;
  redQ2?: boolean;
};

export const PYRAMID: PyramidRow[] = [
  { label: "Fatality", color: "#dc2626", v25: "–", vq1: "–", vq2: "–", concern: false },
  { label: "LTI", color: "#ea580c", v25: "–", vq1: "0,3", vq2: "–", concern: false, redQ1: true },
  { label: "RWI", color: "#f59e0b", v25: "–", vq1: "–", vq2: "–", concern: false },
  { label: "MTI", color: "#fbbf24", v25: "0,3", vq1: "–", vq2: "0,7", concern: true, redQ2: true },
  { label: "First Aid", color: "#facc15", v25: "0,4", vq1: "0,3", vq2: "–", concern: false },
  { label: "Fire Case", color: "#eab308", v25: "0,6", vq1: "1,7", vq2: "1,7", concern: true, redQ1: true, redQ2: true },
  { label: "Property Damage", color: "#c4d64a", v25: "3,3", vq1: "2,7", vq2: "3,3", concern: true },
  { label: "Nearmiss", color: "#86ef62", v25: "6,9", vq1: "5,3", vq2: "4,3", concern: false },
  { label: "Golden Rules", color: "#22c55e", v25: "11,1", vq1: "5,3", vq2: "11,7", concern: false, redQ2: true },
  { label: "To Be Concerned", color: "#166534", v25: "20.281 (3,7)", vq1: "29.163 (5,8)", vq2: "33.445 (7,0)", concern: false },
  { label: "Hazard Report", color: "#9ca3af", v25: "83.332 (12,6)", vq1: "86.110 (14,9)", vq2: "91.899 (15,8)", concern: false },
];

export const HIPO = {
  labels: ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26"],
  values: [5.0, 6.3, 4.7, 5.3, 7.3, 2.0],
};

export const STACKED = {
  labels: ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26"],
  nearmiss: [8.0, 7.3, 5.0, 5.0, 5.3, 4.3],
  fire: [1.3, 0.7, 1.0, 0.0, 0.7, 0.7],
  pd: [2.7, 3.3, 7.0, 4.3, 4.3, 5.0],
  totals: [12.0, 11.3, 13.0, 9.3, 10.3, 10.0],
};

export const GOOD_RECORD = ["Zero LTI", "Hazard & TBC Report meningkat", "Incident HIPO menurun"];
export const GAP_ITEMS = ["2 Injury (MTI)", "Peningkatan pada Accident Non Injury", "Golden Rules meningkat"];

export type QuadKey = "K1" | "K2" | "K3" | "K4";

export type ScatterPoint = {
  name: string;
  /** Current period (Q2) */
  q: QuadKey;
  /** Prior period (Q1) */
  q1: QuadKey;
  trans: string;
  inc: string;
  lead: number;
  sev: number;
  leadQ1: number;
  sevQ1: number;
  /** Short note for chart detail card */
  gap: string;
  /** Gap related causal factors for rapor table */
  gapCausal: string[];
};

export const QUAD_TABLE_DESC: Record<QuadKey, string> = {
  K1: "Leading rendah, Gap Lagging",
  K2: "Leading tinggi, Gap Lagging",
  K3: "Leading rendah, Lagging relative terkendali",
  K4: "Leading tinggi, Lagging relative terkendali",
};

/** Mining contractor scatter — Q2 current, Q1 prior for movement story */
export const SCATTER: ScatterPoint[] = [
  {
    name: "PAMA BMO",
    q: "K1",
    q1: "K1",
    trans: "K1→K1",
    inc: "4 PD, 2 NM",
    lead: 75.46,
    sev: 0.62,
    leadQ1: 73.0,
    sevQ1: 0.3,
    gap: "PD naik, severity memburuk",
    gapCausal: ["Perilaku Pekerja", "Pengawasan", "Road Management", "Fatigue"],
  },
  {
    name: "PAMA GMO",
    q: "K1",
    q1: "K1",
    trans: "K1→K1",
    inc: "2 MTI, 3 NM",
    lead: 74.34,
    sev: 0.58,
    leadQ1: 75.0,
    sevQ1: 0.28,
    gap: "MTI berulang, severity naik",
    gapCausal: ["Metode Kerja Tidak Standar", "Perilaku Pekerja", "Pengawasan", "Area Kerja", "Tools"],
  },
  {
    name: "MTN",
    q: "K3",
    q1: "K1",
    trans: "K1→K3",
    inc: "Zero Inc",
    lead: 76.0,
    sev: 0.2,
    leadQ1: 73.0,
    sevQ1: 0.45,
    gap: "Zero incident — lompat kuadran",
    gapCausal: [],
  },
  {
    name: "MTL",
    q: "K3",
    q1: "K3",
    trans: "K3→K3",
    inc: "1 NM",
    lead: 76.94,
    sev: 0.25,
    leadQ1: 76.2,
    sevQ1: 0.27,
    gap: "NM sporadis — relatif stabil",
    gapCausal: ["Pengoperasian Unit"],
  },
  {
    name: "BUMA LMO",
    q: "K3",
    q1: "K1",
    trans: "K1→K3",
    inc: "1 NM",
    lead: 78.19,
    sev: 0.28,
    leadQ1: 75.0,
    sevQ1: 0.5,
    gap: "Membaik dari K1",
    gapCausal: ["Perilaku Pekerja"],
  },
  {
    name: "BAR",
    q: "K3",
    q1: "K4",
    trans: "K4→K3",
    inc: "1 PD, 1 NM",
    lead: 76.73,
    sev: 0.32,
    leadQ1: 80.0,
    sevQ1: 0.1,
    gap: "Turun dari K4 — PD & NM",
    gapCausal: ["Pengoperasian Unit", "Tools"],
  },
  {
    name: "FAD",
    q: "K4",
    q1: "K4",
    trans: "K4→K4",
    inc: "2 NM",
    lead: 80.41,
    sev: 0.15,
    leadQ1: 80.1,
    sevQ1: 0.14,
    gap: "Tetap Baik — NM rendah",
    gapCausal: ["Pengawasan", "Pengoperasian Unit"],
  },
  {
    name: "KDC",
    q: "K4",
    q1: "K4",
    trans: "K4→K4",
    inc: "1 PD",
    lead: 83.72,
    sev: 0.12,
    leadQ1: 83.2,
    sevQ1: 0.13,
    gap: "Tetap Baik — PD tunggal",
    gapCausal: ["Maintenance"],
  },
  {
    name: "BUMA BMO",
    q: "K4",
    q1: "K3",
    trans: "K3→K4",
    inc: "Zero Inc",
    lead: 84.22,
    sev: 0.1,
    leadQ1: 80.0,
    sevQ1: 0.3,
    gap: "Naik ke Baik — zero incident",
    gapCausal: [],
  },
];

/** @deprecated use SCATTER[i].leadQ1 / sevQ1 */
export const PREV_POS: Record<string, { lead: number; sev: number }> = Object.fromEntries(
  SCATTER.map((d) => [d.name, { lead: d.leadQ1, sev: d.sevQ1 }]),
);

export const TREND = {
  labels: ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26"],
  /** Blue triangles — Core */
  coreSolid: [4.3, 3.0, 3.3, 4.0, 2.7, 3.0],
  /** Grey squares — Core */
  coreDash: [0.3, 0.0, 1.0, 1.3, 0.7, 0.3],
  /** Blue triangles — Support */
  supSolid: [3.0, 2.3, 2.7, 2.0, 3.0, 3.3],
  /** Grey squares — Support */
  supDash: [4.3, 6.0, 6.0, 2.0, 4.0, 3.3],
};

/** Stacked composition bars — Profile Insiden (exact % from source) */
export const COMPOSITION = {
  coreSupport: {
    title: "Core vs Support",
    legend: [
      { label: "Core", bg: "#2f6fb5" },
      { label: "Support", bg: "#f0c419" },
    ],
    years: [
      {
        label: "AVG 2025",
        total: 11.5,
        segments: [
          { key: "Core", pct: 38, label: "38%", bg: "#2f6fb5", fg: "#fff" },
          { key: "Support", pct: 62, label: "62%", bg: "#f0c419", fg: "#5a4400" },
        ],
      },
      {
        label: "AVG 2026",
        total: 10.2,
        segments: [
          { key: "Core", pct: 33, label: "33%", bg: "#2f6fb5", fg: "#fff" },
          { key: "Support", pct: 67, label: "67%", bg: "#f0c419", fg: "#5a4400" },
        ],
      },
    ],
  },
  minecont: {
    title: "Minecont vs Non Minecont",
    legend: [
      { label: "Minecont", bg: "#3d4f63" },
      { label: "Non Minecont", bg: "#9ca3af" },
    ],
    years: [
      {
        label: "AVG 2025",
        total: 11.5,
        segments: [
          { key: "Minecont", pct: 54, label: "54%", bg: "#3d4f63", fg: "#fff" },
          { key: "Non", pct: 46, label: "46%", bg: "#9ca3af", fg: "#fff" },
        ],
      },
      {
        label: "AVG 2026",
        total: 10.2,
        segments: [
          { key: "Minecont", pct: 59, label: "59%", bg: "#3d4f63", fg: "#fff" },
          { key: "Non", pct: 41, label: "41%", bg: "#9ca3af", fg: "#fff" },
        ],
      },
    ],
  },
} as const;

export const ACTIVITY = [
  {
    title: "Pit Service",
    company: "(PAMA BMO 2)",
    color: "#f59e0b",
    vals: [0.3, 0.0, 0.7] as const,
    type: "Non Injury" as const,
  },
  {
    title: "Maintenance",
    company: "(PAMA GMO)",
    color: "#dc2626",
    vals: [0.3, 0.0, 0.7] as const,
    type: "Injury" as const,
  },
];

export const INCIDENT_NOTES = [
  {
    src: "/grader1.png",
    alt: "Grader 502",
    caption: "Kaca Kabin Grader 502 pecah terkena lentingan material",
  },
  {
    src: "/grader2.png",
    alt: "Dozer 1212",
    caption: "Kaca Kabin Dozer 1212 pecah terkena lentingan material",
  },
  {
    src: "/grader4.png",
    alt: "Maintenance hammer",
    caption: "Jari tangan kiri pekerja terkena pukulan hammer saat maintenance unit",
  },
  {
    src: "/grader3.png",
    alt: "Final Drive cleaning",
    caption: "Tangan pekerja terjepit Final Drive saat aktivitas cleaning sparepart",
  },
] as const;

export const FIT_TO_WORK_KPIS = {
  penurunan: 18,
  penurunanLabel: "Penurunan hasil MCU (Kelayakan Kerja)",
  peningkatan: 19,
  peningkatanLabel: "Peningkatan hasil MCU (Kelayakan Kerja)",
} as const;

/** Fit to Work MCU — Health Management Q2 2026. gap.* = peach highlight vs Q1. */
export const FIT_TO_WORK = [
  {
    company: "MTL",
    rasio: "90.7%",
    mfr: "6.01",
    asr: "0",
    gap: { rasio: true, mfr: true, asr: false },
  },
  {
    company: "BUMA LMO",
    rasio: "95.1%",
    mfr: "188.77",
    asr: "98.02",
    gap: { rasio: true, mfr: true, asr: true },
  },
  {
    company: "BUMA BMO",
    rasio: "70.4%",
    mfr: "3.50",
    asr: "3.50",
    gap: { rasio: true, mfr: true, asr: true },
  },
  {
    company: "PAMA BMO",
    rasio: "80.8%",
    mfr: "74.53",
    asr: "6.82",
    gap: { rasio: true, mfr: true, asr: true },
  },
  {
    company: "PAMA GMO",
    rasio: "96.6%",
    mfr: "141.18",
    asr: "1.43",
    gap: { rasio: false, mfr: true, asr: true },
  },
  {
    company: "MTN",
    rasio: "90.9%",
    mfr: "69.52",
    asr: "68.45",
    gap: { rasio: false, mfr: true, asr: true },
  },
  {
    company: "KDC BMO",
    rasio: "89.3%",
    mfr: "0",
    asr: "0",
    gap: { rasio: true, mfr: false, asr: false },
  },
  {
    company: "KDC GMO",
    rasio: "90.3%",
    mfr: "0",
    asr: "0",
    gap: { rasio: true, mfr: false, asr: false },
  },
  {
    company: "FAD LMO",
    rasio: "99.0%",
    mfr: "37.59",
    asr: "0",
    gap: { rasio: false, mfr: true, asr: false },
  },
  {
    company: "BAR",
    rasio: "97.6%",
    mfr: "0",
    asr: "0",
    gap: { rasio: true, mfr: false, asr: false },
  },
] as const;
