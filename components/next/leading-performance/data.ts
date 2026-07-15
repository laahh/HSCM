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
  { title: "Tidak menggunakan seatbelt", tone: "from-[#2d3e35] to-[#5a4a2a]" },
  { title: "Pekerja berada di luar kabin", tone: "from-[#3a2e1e] to-[#6b4a2a]" },
  { title: "LV melanggar rambu batas", tone: "from-[#2a3a4a] to-[#4a5a6a]" },
  { title: "Pekerjaan tanpa pengamanan", tone: "from-[#4a3a2a] to-[#7a5a3a]" },
  { title: "Dumping dengan ketinggian unit di bawah standar", tone: "from-[#3a4a3a] to-[#5a6a4a]" },
  { title: "Modifikasi alat penyangga", tone: "from-[#5a3a2a] to-[#8a5a3a]" },
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

export const BEARC_FLOW = ["RFID", "Data Hub", "SAP/HR/TBC", "Verifikasi"] as const;

export const BEARC_BREAKDOWN = [
  { label: "Banned RFID", value: 129 },
  { label: "Banned RFID", value: 79 },
  { label: "Lainnya", value: 75 },
];

export const BEARC_IMPACT = [
  { label: "Kategori A", value: 33, up: true },
  { label: "Kategori B", value: 53, up: true },
  { label: "Kategori C", value: 13, up: false },
  { label: "Kategori D", value: 9, up: false },
];
