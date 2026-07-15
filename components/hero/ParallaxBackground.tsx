"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const panelX = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const swooshY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden bg-[var(--lime)]">
      {/* deep-green diagonal panel, right side (desktop only — full dark coverage
          reads fine at wide widths, but on narrow screens it swallows the whole
          hero and tanks text contrast, so it's confined to lg+). */}
      <motion.svg
        className="absolute inset-y-0 right-0 hidden h-full w-[58%] min-w-[460px] lg:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ x: panelX }}
      >
        <path
          d="M32 0 C50 12 18 30 34 48 C52 64 22 78 36 100 L100 100 L100 0 Z"
          fill="var(--green-deep)"
        />
      </motion.svg>

      {/* subtle swoosh accent near the panel seam */}
      <motion.svg
        className="pointer-events-none absolute left-[46%] top-[50%] hidden h-[32%] w-[28%] opacity-40 lg:block"
        viewBox="0 0 400 260"
        fill="none"
        style={{ y: swooshY, opacity }}
      >
        <path
          d="M0 160C90 210 180 230 260 180C300 155 320 110 400 70C330 130 260 130 210 90C170 60 120 90 80 130C55 156 25 158 0 160Z"
          fill="var(--green-mid)"
        />
      </motion.svg>

      {/* soft top highlight for depth */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 0%, var(--lime-soft) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
