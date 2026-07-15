"use client";

import { motion } from "framer-motion";

const DOTS = [
  "var(--dot-1)",
  "var(--dot-2)",
  "var(--dot-3)",
  "var(--dot-4)",
  "var(--dot-5)",
  "var(--dot-6)",
];

export default function ColorDots() {
  return (
    <div className="flex gap-3">
      {DOTS.map((color, i) => (
        <motion.span
          key={color}
          className="h-8 w-8 rounded-full shadow-lg ring-2 ring-white/80"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0, scale: 0, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: 0.5 + i * 0.08,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.15, y: -3 }}
        />
      ))}
    </div>
  );
}
