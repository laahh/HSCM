export const SUMMARY_QUOTE =
  "Highlight Summary Lagging & Leading menjadi baseline untuk Enforcement: menjaga Stability operasi yang sudah berjalan, sekaligus Transform gap kritis agar tidak berkembang menjadi insiden.";

export type SummaryTone = "green" | "blue";

export type SummaryMetric = {
  label: string;
  from?: string;
  to?: string;
  note?: string;
  bad?: boolean;
};

export type SummaryCard = {
  n: number;
  title: string;
  tone: SummaryTone;
  metrics: SummaryMetric[];
  notes: string[];
  gap: string;
};

export const SUMMARY_CARDS: SummaryCard[] = [
  {
    n: 1,
    title: "LEADERSHIP",
    tone: "green",
    metrics: [
      { label: "Rasio SAP", from: "20,7", to: "23,5" },
      { label: "Rasio TBC", from: "3,5", to: "7,2" },
    ],
    notes: [
      "Pemenuhan rasio minimal weekly belum konsisten di seluruh mitra kerja.",
      "Perlu penekanan efektifitas pengawasan supervisor.",
    ],
    gap: "SAP & TBC membaik, namun konsistensi pencapaian target masih menjadi fokus.",
  },
  {
    n: 2,
    title: "PEOPLE",
    tone: "green",
    metrics: [
      { label: "Blindspot Golden Rules", from: "47%", to: "67%", bad: true },
      { label: "Valid Golden Rules", from: "15", to: "33", bad: true },
      { label: "MCU / Fit to Work", note: "memburuk 18%", bad: true },
    ],
    notes: [
      "Isu kritis: seatbelt, HP, dan perilaku kerja kritis masih menonjol.",
      "Perulangan pelanggaran masih terjadi di mitra kerja spesifik.",
    ],
    gap: "Perilaku kritis dan kepatuhan pekerja masih perlu diperkuat.",
  },
  {
    n: 3,
    title: "PROCESS",
    tone: "blue",
    metrics: [
      { label: "FTW", from: "99,5%", to: "97,6%", bad: true },
      { label: "IKK", from: "98%", to: "99%" },
      { label: "Golden Time", from: "68%", to: "59%", bad: true },
    ],
    notes: [
      "Fatigue management, work planning, dan emergency awareness belum stabil.",
      "Disiplin proses dan kesiapan kerja masih menjadi gap.",
    ],
    gap: "Disiplin proses, readiness, dan pelaporan emergency perlu diperkuat.",
  },
  {
    n: 4,
    title: "TECHNOLOGY",
    tone: "blue",
    metrics: [
      { label: "Leadtime Alert DMS", from: "62%", to: "67%" },
      { label: "Intervensi Alert DMS", from: "72%", to: "73%" },
    ],
    notes: [
      "Konfigurasi DMS dan coverage/reliabilitas CCTV belum optimal.",
      "Early detection berbasis teknologi belum sepenuhnya efektif.",
    ],
    gap: "DMS dan CCTV belum cukup efektif sebagai kontrol deteksi dini.",
  },
];

export const ENFORCEMENT = {
  stability: {
    title: "STABILITY",
    items: [
      "Memperkuat struktur layering pengawasan dan monitoring pemenuhan rasio SAP minimum secara harian.",
      "Perbaikan kualitas maintenance dibantu dengan support dari principal.",
      "Expand implementasi BeARC untuk all pengawas di all department dan untuk Work Around Rules lainnya.",
      "Pemenuhan coverage CCTV untuk historical insiden dengan catatan tidak ter-cover CCTV.",
      "Implementasi rekomendasi insiden bersifat HIPO untuk seluruh area kerja di seluruh mitra kerja.",
      "Kontrol aktivitas pekerjaan di luar kabin.",
    ],
  },
  transform: {
    title: "TRANSFORM",
    items: [
      "Pemberian early warning leading program yang menjadi gap agar segera ditindaklanjuti sebelum menjadi insiden.",
      "Upgrade rekayasa engineering yang masih menyisakan residual risk dan yang masih bergantung pada intervensi & deteksi oleh manusia.",
      "Replikasi rekayasa engineering yang sudah terbukti efektif mengendalikan risiko tinggi seperti ARCAS, Remote Pump, dan Remote Dozer.",
      "Implementasi CCTV analytics untuk use case lain yang bersifat kritikal.",
    ],
  },
} as const;
