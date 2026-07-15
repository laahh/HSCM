export type RuleSiteRow = {
  site: string;
  detail: string;
};

export type RuleTriggerItem = {
  code: string;
  title: string;
  rows: RuleSiteRow[];
};

export const RULE_TRIGGER_DEMO: RuleTriggerItem[] = [
  {
    code: "01",
    title: "PJA Performance Partisipasi SAP/RFID",
    rows: [
      {
        site: "BMO 2",
        detail:
          "NANANG WIDI UTOMO (PT Pamapersada Nusantara), jabatan Acting GL, RFID=1, SAP=0",
      },
      {
        site: "GMO",
        detail:
          "DIKI AULIA (PT Pamapersada Nusantara), jabatan Blasting GL, RFID=1, SAP=0",
      },
    ],
  },
  {
    code: "02",
    title: "Coverage Area Kritis Daily",
    rows: [
      {
        site: "BMO 2",
        detail: '"(Area Kritis) Dragflow J West" di (B8) Pit J → Tidak Tercover (0%)',
      },
      {
        site: "GMO",
        detail: '"Aktivitas Dewatering Penyambungan Pipa HDPE PAMA" → Tidak Tercover (0%)',
      },
    ],
  },
  {
    code: "03",
    title: "Identifikasi TBC Blindspot / TBC GR",
    rows: [
      {
        site: "BMO 2",
        detail: "tidak ada data di file ini (hanya ada site GMO)",
      },
      {
        site: "GMO",
        detail:
          'EUGENIUS FRISKA ANDIKA – "penumpang tidak memakai seatbelt di unit PM-691", status OPEN',
      },
    ],
  },
  {
    code: "04",
    title: "Closing Hazard (Overdue Hazard)",
    rows: [
      {
        site: "BMO 2",
        detail: "tidak ada data (site yang ada di file ini cuma BMO 3 & GMO)",
      },
      {
        site: "GMO",
        detail: "Task #8992745 – bendera unit DTS-001 buram (PIC: NURKHOLIS), status OVERDUE",
      },
    ],
  },
  {
    code: "05",
    title: "Closing Hazard (Submitted 24 Jam)",
    rows: [
      {
        site: "BMO 2",
        detail:
          "Task #8926582 – lampu kota LV PM 013 (PIC: MUHAMMAD SOFYAN ISNIAN), selisih 550 jam",
      },
      {
        site: "GMO",
        detail:
          "Task #8918552 – sampah makanan di tempat duduk pasien, selisih 571 jam",
      },
    ],
  },
  {
    code: "06",
    title: "IKK Aktif & Pengecekan IPK/OKK",
    rows: [
      {
        site: "BMO 2",
        detail: '"PENGELASAN ATTACHMENT EX1795" di (B8) Pit J, status EXPIRED',
      },
      {
        site: "GMO",
        detail: '"WORKSHOP FABRIKASI PAMA - REKONDISI BUCKET", status EXPIRED',
      },
    ],
  },
  {
    code: "08",
    title: "Fatigue Management (Pengisian Fit to Work)",
    rows: [
      {
        site: "BMO 2",
        detail:
          "MUHAMMAD HANAFI (PT Pamapersada Nusantara), Operator A2B, pengisian 0%",
      },
      {
        site: "GMO",
        detail: "MUH SYAHRUL (PT Bumi Artlantis Raya), Driver DT, pengisian 0%",
      },
    ],
  },
  {
    code: "09",
    title: "Fatigue Management (Fit to Work Merah)",
    rows: [
      {
        site: "BMO 2",
        detail: "tidak ada data (site yang ada di file ini cuma BMO 1 & GMO)",
      },
      {
        site: "GMO",
        detail: "ROBBIL AKMAL – Jam Tidur Kurang (4 jam), tekanan darah normal",
      },
    ],
  },
  {
    code: "10",
    title: "IKK Implementasi",
    rows: [
      {
        site: "BMO 2",
        detail: 'Identik dengan poin 06 — "PENGELASAN ATTACHMENT EX1795" di (B8) Pit J, status EXPIRED',
      },
      {
        site: "GMO",
        detail:
          'Identik dengan poin 06 — "WORKSHOP FABRIKASI PAMA - REKONDISI BUCKET", status EXPIRED',
      },
    ],
  },
  {
    code: "11",
    title: "Pengelolaan Pekerja (Pekerja Baru)",
    rows: [
      {
        site: "BMO 2",
        detail:
          "ACHMAD RIFQI (PT Pamapersada Nusantara), hari pertama 13-03-2026",
      },
      {
        site: "GMO",
        detail:
          "A RAODATUL FAHMI DG MAKERRA (PT Pamapersada Nusantara), hari pertama 06-02-2026",
      },
    ],
  },
];

export const DEMO_DURATION_MS = 30_000;
