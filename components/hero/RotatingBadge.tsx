"use client";

import { motion } from "framer-motion";

const LABEL = "PAHAM · INTROPEKSI · BANGKIT · ";

export default function RotatingBadge() {
  return (
    <motion.div
      className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32"
      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path id="badge-circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray="2 8"
        />
        <text fill="#ffffff" fontSize="12.5" letterSpacing="1.5" className="font-heading font-semibold">
          <textPath href="#badge-circle" startOffset="0%">
            {LABEL.repeat(2)}
          </textPath>
        </text>
      </motion.svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-deep)] shadow-lg sm:h-20 sm:w-20">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 9L2 5l4-4M2 5h13a5 5 0 0 1 5 5v1"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 15l4 4-4 4M22 19H9a5 5 0 0 1-5-5v-1"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
