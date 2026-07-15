"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TAGS = [
  "#HSECM TINGKAT I",
  "#PAHAM KONDISI",
  "#BERANI INTROPEKSI",
  "#BANGKIT LEBIH KUAT",
  "#SIAGA SALING MENJAGA",
];

const TAG_COLORS = ["#0b3d1f", "#2f5a3d", "#e8632c", "#0b3d1f", "#1f8a44"];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const step = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = p + Math.max(1, Math.round(Math.random() * 3));
        return next >= 100 ? 100 : next;
      });
    }, 180);
    return () => clearInterval(step);
  }, []);

  useEffect(() => {
    const cycle = setInterval(() => {
      setTagIndex((i) => (i + 1) % TAGS.length);
    }, 1100);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const done = setTimeout(onComplete, 1000);
    return () => clearTimeout(done);
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={tagIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-3xl font-extrabold uppercase tracking-tight sm:text-5xl"
          style={{ color: TAG_COLORS[tagIndex] }}
        >
          {TAGS[tagIndex]}
        </motion.span>
      </AnimatePresence>

      <span className="mt-10 font-heading text-sm font-semibold tabular-nums text-[var(--ink-soft)]">
        {progress} %
      </span>
    </motion.div>
  );
}
