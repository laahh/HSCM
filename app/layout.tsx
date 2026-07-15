import type { Metadata } from "next";
import { Outfit, Rubik } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HSECM Tingkat I — Quarter 2 2026",
  description:
    "Mengubah Ketidakpastian Menjadi Keunggulan: Kolaborasi Membangun Organisasi Berkinerja Tinggi untuk Stabilitas dan Meningkatkan Daya Saing melalui Disiplin Operasional, Perbaikan Berkelanjutan dan Inovasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${outfit.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        {children}
      </body>
    </html>
  );
}
