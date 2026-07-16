export const LEADING_QUOTE =
  "Gap pada Leading Performance di Q2 yang perlu menjadi catatan adalah Pemenuhan SAP & Identifikasi TBC, Kontrol Perilaku & Kesehatan Pekerja, Implementasi Fatigue Management, Awareness Pelaporan Emergency. Implementasi Teknologi masih mencatatkan beberapa deviasi. Kontrol Peran sudah dijalankan untuk membantu meningkatkan performance Leading.";

export const TACTIC_MINIS = [
  {
    n: "01",
    title: "MAINTAIN SHAPE",
    desc: "Pertahankan formasi sistem",
    kind: "shape" as const,
  },
  {
    n: "02",
    title: "DIRECT THE TEAM",
    desc: "Arahkan tim ke target",
    kind: "direct" as const,
  },
  {
    n: "03",
    title: "INTERCEPT EARLY",
    desc: "Intersepsi dini ancaman",
    kind: "intercept" as const,
  },
] as const;

/** Sidebar tactic cards — same pattern as Safety Performance */
export const LEADING_TACTIC_CARDS = [
  {
    n: "01",
    title: "MAINTAIN SHAPE",
    desc: "Menjaga struktur & jarak pengendalian agar tidak ada celah pada Leading Performance.",
  },
  {
    n: "02",
    title: "DIRECT THE TEAM",
    desc: "Komunikasi, arahan, dan pengingat agar supervisor & pekerja berada pada posisi yang benar.",
  },
  {
    n: "03",
    title: "INTERCEPT EARLY",
    desc: "Intersepsi dini gap SAP/TBC, Golden Rules, Fatigue, dan alert teknologi sebelum menjadi lagging.",
  },
] as const;

export const SAP_WEEKS = [
  "W14",
  "W15",
  "W16",
  "W17",
  "W18",
  "W19",
  "W20",
  "W21",
  "W22",
  "W23",
  "W24",
  "W25",
  "W26",
];

export const SAP_BC = [16.8, 17.2, 17.9, 18.5, 18.1, 18.8, 19.2, 19.6, 19.0, 19.8, 20.1, 20.4, 20.7];
export const SAP_MK = [18.2, 19.0, 19.8, 20.5, 20.1, 21.0, 21.4, 22.0, 21.6, 22.4, 22.8, 23.1, 23.5];
export const SAP_MIN_BC = 19;
export const SAP_MIN_MK = 24;

/** Weekly Ratio TBC — BC (green) & MK (orange) */
export const TBC_BC = [4.1, 4.8, 5.2, 5.5, 5.9, 6.1, 6.4, 6.0, 6.7, 6.9, 7.0, 6.8, 7.2];
export const TBC_MK = [2.8, 3.0, 3.2, 3.1, 3.4, 3.3, 3.6, 3.4, 3.5, 3.3, 3.4, 3.4, 3.5];
export const TBC_MIN = 5;

/** @deprecated use TBC_BC */
export const TBC_RATIO = TBC_BC;
export const SAP_BELOW_MIN = ["PAMA BMO 2", "BAR BMO 3", "BUMA LMO", "FAD LMO"];
export const TBC_BLINDSPOT_UP = ["KDC BMO 1", "KDC GMO"];
export const GR_BLINDSPOT = [
  { name: "FAD LMO", tip: "100% blindspot" },
  { name: "BUMA BMO", tip: "100% blindspot" },
  { name: "PAMA GMO", tip: "80% blindspot" },
  { name: "MTN SMO", tip: "67% blindspot" },
  { name: "BAR BMO 3", tip: "67% blindspot" },
];

export const GR_REPEAT = [
  { name: "PAMA BMO 2", note: "Seatbelt 3× di Q2" },
  { name: "MTN SMO", note: "Seatbelt 2× di Q2" },
];

export type GrTone = "warn" | "hot" | "mild" | null;

export const GR_TABLE: {
  code: string;
  jenis: string;
  q1: string;
  q2: string;
  tone: GrTone;
}[] = [
  { code: "GR 1", jenis: "Menutup kamera DMS", q1: "–", q2: "3", tone: "warn" },
  { code: "GR 2", jenis: "Headset", q1: "4", q2: "–", tone: null },
  { code: "GR 2", jenis: "HP", q1: "4", q2: "8", tone: "hot" },
  { code: "GR 2", jenis: "Seatbelt", q1: "4", q2: "13", tone: "hot" },
  { code: "GR 3", jenis: "LOTO", q1: "2", q2: "3", tone: "mild" },
  { code: "GR 4", jenis: "Bodyharness", q1: "–", q2: "2", tone: "warn" },
  { code: "GR 6", jenis: "Penyanggaan", q1: "–", q2: "1", tone: "warn" },
  { code: "GR 7", jenis: "Berdiri di atas crest", q1: "–", q2: "1", tone: "warn" },
  { code: "GR 9", jenis: "Undercut", q1: "1", q2: "1", tone: null },
  { code: "GR 9", jenis: "Pelampung", q1: "–", q2: "1", tone: "warn" },
];

export const NARRATIVE = {
  leadership:
    "Secara Ratio SAP dan TBC cenderung meningkat dalam beberapa minggu terakhir, tetapi belum memenuhi ratio minimal secara Weekly. Blindspot mengalami penurunan tetapi Blindspot GR mengalami peningkatan dan masih menjadi gap di beberapa mitra kerja utama.",
  people:
    "Terdapat peningkatan Golden Rules sebesar 120% dan peningkatan tertinggi pada pelanggaran Seatbelt. Perulangan pelanggaran masih terjadi di spesifik mitra kerja terutama terkait penggunaan Seatbelt",
  process: [
    "Implementasi Fatigue Management melalui identifikasi Fit to Work awal shift melalui pengisian Aggregator FTW belum konsisten di Q2.",
    "Implementasi pelaporan IPK & OKK belum konsisten comply saat pelaksanaan IKK",
    "Perlunya peningkatan awareness pelaporan Emergency",
  ],
  technology: [
    "Perlunya pemenuhan infrastruktur jaringan untuk meningkatkan kecepatan alert DMS masuk ke Server BeDMS",
    "Intervensi alert DMS untuk alert Fatigue & Pelanggaran perlu diperkuat untuk mencegah bahaya terlewat.",
  ],
} as const;

export const HIGHLIGHTS = [
  {
    src: "/tbc1.png",
    title: "Tidak menggunakan seatbelt",
    kind: "GR" as const,
  },
  {
    src: "/tbc2.png",
    title: "Pekerja berada di luar kabin",
    kind: "TBC" as const,
  },
  {
    src: "/tbc3.png",
    title: "LV melanggar rambu stop",
    kind: "TBC" as const,
  },
  {
    src: "/tbc4.png",
    title: "Pekerjaan tanpa pengawasan",
    kind: "TBC" as const,
  },
  {
    src: "/tbc5.png",
    title: "Dumping dengan beberapa unit berada di bawahnya",
    kind: "TBC" as const,
  },
  {
    src: "/tbc6.png",
    title: "Modifikasi alat penyangga",
    kind: "TBC" as const,
  },
];

/** Highlight Gap Leading Performance Q2 — matrix (X = gap) */
export const GAP_CONTRACTORS = [
  "BUMA LMO",
  "FAD LMO",
  "MTN SMO",
  "KDC BMO 1",
  "BUMA BMO 1",
  "MTL BMO 1",
  "PAMA BMO 2",
  "PAMA GMO",
  "BAR BMO 3",
] as const;

export type GapPillar = {
  id: string;
  label: string;
  incidents: string;
  color: string;
  headerBg: string;
  headerFg: string;
  rows: { metric: string; gaps: boolean[] }[];
};

export const GAP_MATRIX: GapPillar[] = [
  {
    id: "leadership",
    label: "LEADERSHIP",
    incidents: "20 Inc",
    color: "#2563eb",
    headerBg: "#60a5fa",
    headerFg: "#0f172a",
    rows: [
      {
        metric: "Weekly Ratio SAP < 24",
        gaps: [true, true, false, false, false, false, true, false, true],
      },
      {
        metric: "Weekly Ratio TBC < 5",
        gaps: [true, false, true, true, true, true, true, false, true],
      },
      {
        metric: "Blindspot TBC Meningkat",
        gaps: [false, false, false, true, false, false, false, false, false],
      },
      {
        metric: "Blindspot GR Meningkat",
        gaps: [false, true, true, false, true, false, true, false, true],
      },
    ],
  },
  {
    id: "people",
    label: "PEOPLE",
    incidents: "10 Inc",
    color: "#d97706",
    headerBg: "#fbbf24",
    headerFg: "#0f172a",
    rows: [
      {
        metric: "GR Berulang",
        gaps: [false, false, true, false, false, false, true, false, false],
      },
      {
        metric: "Rasio Kelayakan Kerja Menurun",
        gaps: [true, true, false, true, true, true, true, false, true],
      },
      {
        metric: "MFR Meningkat",
        gaps: [false, true, true, false, false, false, true, true, false],
      },
      {
        metric: "ASR Meningkat",
        gaps: [false, false, true, false, false, false, true, true, false],
      },
      {
        metric: "Fit to Work MCU Memburuk vs 2025 > 18%",
        gaps: [true, false, true, true, true, false, false, true, false],
      },
    ],
  },
  {
    id: "process",
    label: "PROCESS",
    incidents: "2 Inc",
    color: "#16a34a",
    headerBg: "#4ade80",
    headerFg: "#0f172a",
    rows: [
      {
        metric: "Aggregator FTW < 100%",
        gaps: [true, true, true, true, false, true, true, true, false],
      },
      {
        metric: "Implementasi IKK < 100%",
        gaps: [false, true, true, false, false, false, true, false, false],
      },
      {
        metric: "Golden Time < 100%",
        gaps: [false, false, false, false, false, true, true, true, false],
      },
    ],
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    incidents: "4 Inc",
    color: "#7c3aed",
    headerBg: "#c4b5fd",
    headerFg: "#0f172a",
    rows: [
      {
        metric: "Leadtime Entry Alert DMS On time < 70%",
        gaps: [true, false, false, false, true, true, true, true, false],
      },
      {
        metric: "Intervensi Alert DMS < 70%",
        gaps: [false, true, true, false, false, true, false, true, false],
      },
    ],
  },
];

export const GAP_NARRATIVE =
  "Ketidaktercapaian leading yang diikuti terjadinya insiden mengindikasikan adanya gap laten atau sistemik yang belum terdeteksi dan diintervensi secara cepat.";

/** @deprecated — diganti GAP_MATRIX */
export const LEADING_GAPS = [
  {
    pillar: "Leadership",
    title: "Pemenuhan SAP & Identifikasi TBC",
    detail: "Ratio SAP dan TBC meningkat namun belum memenuhi ratio minimal secara Weekly. Blindspot GR naik 47% → 67%.",
    tone: "bad" as const,
  },
  {
    pillar: "People",
    title: "Kontrol Perilaku & Kesehatan Pekerja",
    detail: "Valid Golden Rules naik 120% (15 → 33). Pelanggaran Seatbelt tertinggi; perulangan di mitra kerja spesifik.",
    tone: "bad" as const,
  },
  {
    pillar: "Process",
    title: "Fatigue Management & Pelaporan Emergency",
    detail: "Aggregator FTW turun 99,5% → 97,6%. Golden Time turun 68% → 59%. Awareness pelaporan Emergency belum konsisten.",
    tone: "bad" as const,
  },
  {
    pillar: "Technology",
    title: "Deviasi Implementasi Teknologi",
    detail: "Gap pada DMS (close eyes) dan CCTV off/jarak jauh. Leadtime & intervensi alert masih perlu diperkuat.",
    tone: "warn" as const,
  },
];

export const FTW_BELOW = ["All Minecont", "kecuali BUMA LMO (1% ±)", "BAR BMO 3"];
export const IKK_BELOW = ["FAD LMO (99% ±)", "PAMA BMO 2 (96% ±)", "MTN SMO (99% ±)", "PAMA GMO (99% ±)"];
export const GOLDEN_TIME_BELOW = ["MTL BMO 1 (0%)", "PAMA BMO 2 (20% ±)", "BAR BMO 3 (30% ±)", "PAMA GMO (50% ±)"];

export const DMS_LEAD_BELOW = ["PAMA BMO 1", "MTL BMO 1", "PAMA BMO 2 (±)"];
export const DMS_INTERVENSI_BELOW = ["MTL BMO 1", "FAD LMO", "PAMA GMO", "MTN SMO"];

export const TECH_GAPS = [
  {
    title: "GAP PADA DMS",
    body: "Konfigurasi alert close eyes pada DMS tidak mampu mendeteksi gejala fatigue sebelum kejadian.",
  },
  {
    title: "GAP PADA CCTV",
    body: "CCTV saat kejadian dalam kondisi off. CCTV ada tetapi terlalu jauh / tidak menyorot dan tidak menangkap detail aktivitas.",
  },
];

export const BEARC_SOURCES = [
  { code: "RFID", desc: "Data tap personel" },
  { code: "SAP", desc: "Data HR & kontraktor" },
  { code: "TBC", desc: "Laporan temuan & hazard" },
] as const;

export const BEARC_FLOW = [
  "Data tervalidasi",
  "Pekerja terdeteksi banned",
  "Akses kerja ditolak",
  "Pekerja menjalankan treatment",
  "Verifikasi treatment",
  "Pekerja unbanned & dapat bekerja kembali",
  "Loop monitoring berlanjut",
] as const;

export const BEARC_BREAKDOWN = [
  { label: "Banned RFID", value: 129 },
  { label: "Banned RFID & SAP", value: 79 },
  { label: "Banned SAP", value: 75 },
];

export const BEARC_IMPACT = [
  { label: "Peningkatan SAP Report", value: 33, up: true },
  { label: "Peningkatan TBC", value: 53, up: true },
  { label: "Peningkatan Pelapor SAP", value: 13, up: true },
  { label: "Peningkatan Pelapor TBC", value: 9, up: true },
];

export const BEARC_NEXT = [
  "Perluas implementasi ke divisi / departemen lain",
  "Jaga kualitas sistem banned–unbanned agar konsisten dan andal",
] as const;

export const BEARC_NARRATIVE =
  "Kontrol Peran sudah dijalankan untuk membantu meningkatkan partisipasi pekerja dalam rangka peningkatan performance Leading. Implementasi yang sudah berjalan sejak Week 27 pada Tim Safety & HSE baik di BC maupun Mitra Kerja berdampak pada peningkatan partisipasi pelaporan SAP & TBC.";

export const RULE_FLOW = [
  { step: "Deteksi Data", note: "Auto load data dari HSE Automation module" },
  { step: "Trigger Rule", note: "Rule gap sesuai matrix" },
  { step: "Assign Tasklist", note: "PIC follow-up gap sesuai matrix" },
  { step: "Eksekusi & Tindak Lanjut", note: "Intervensi terukur" },
  { step: "Verifikasi", note: "SOD BC verifikasi hasil perbaikan" },
  { step: "Closed & Monitor Efektivitas", note: "Pantau efektivitas close" },
] as const;

export const RULE_MATRIX = [
  "Partisipasi SAP L1 by RFID",
  "Pemenuhan Coverage Area Kritis Daily",
  "Blindspot TBC / GR",
  "Overdue Hazard",
  "Submitted Hazard > 24 jam",
  "Jumlah IKK aktif dan ada pengecekan IPK-OKK",
  "Pengisian Fit to Work",
  "Fit to Work Merah",
  "Implementasi IKK",
  "Jumlah Pekerja Baru",
] as const;

export const RULE_OUTPUTS = [
  "Early detection of emerging gaps",
  "Measured and rapid intervention",
  "Escalation of recurring gaps",
  "Preventing latent gaps and fixing systemic gaps",
] as const;

export const RULE_NARRATIVE =
  "Rule-based performance control hadir untuk mendeteksi deviasi lebih dini, memastikan tindak lanjut terukur, dan mencegah gap berkembang menjadi insiden.";
