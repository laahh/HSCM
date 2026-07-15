"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

function RedCard() {
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" fill="none" aria-hidden>
      <rect x="1" y="1" width="24" height="32" rx="3.5" fill="#e5342b" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  );
}

function YellowCard() {
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" fill="none" aria-hidden>
      <rect x="1" y="1" width="24" height="32" rx="3.5" fill="#f4c521" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  );
}

function SoccerBall() {
  return (
    <svg width="30" height="30" viewBox="0 0 34 34" fill="none" aria-hidden>
      <circle cx="17" cy="17" r="15" fill="#ffffff" stroke="#0b3d1f" strokeWidth="1.5" />
      <path d="M17 7.5l7 5-2.7 8.3h-8.6L10 12.5l7-5Z" fill="#0b3d1f" />
    </svg>
  );
}

function Stopwatch() {
  return (
    <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden>
      <path d="M13 3h8" stroke="#0b3d1f" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 3v3.5" stroke="#0b3d1f" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="19" r="12.5" fill="#ffffff" stroke="#0b3d1f" strokeWidth="1.8" />
      <path d="M17 19V11.5" stroke="#0b3d1f" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 19l4.5 2.5" stroke="#0b3d1f" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type FlairKind = "flip" | "bounce" | "tick";

const ORBIT_ITEMS: {
  icon: ReactNode;
  label: string;
  orbitPct: number;
  size: number;
  duration: number;
  phase: number;
  reverse?: boolean;
  flair: FlairKind;
  flairDuration: number;
  flairDelay: number;
}[] = [
  { icon: <RedCard />, label: "red card", orbitPct: 92, size: 42, duration: 9, phase: 20, flair: "flip", flairDuration: 1.6, flairDelay: 0 },
  { icon: <YellowCard />, label: "yellow card", orbitPct: 92, size: 42, duration: 9, phase: 200, flair: "flip", flairDuration: 1.8, flairDelay: 0.7 },
  { icon: <SoccerBall />, label: "ball", orbitPct: 68, size: 48, duration: 12, phase: 100, reverse: true, flair: "bounce", flairDuration: 1.1, flairDelay: 0.3 },
  { icon: <Stopwatch />, label: "stopwatch", orbitPct: 68, size: 48, duration: 12, phase: 280, reverse: true, flair: "tick", flairDuration: 1.4, flairDelay: 0.5 },
];

const FLAIR_ANIMATE: Record<FlairKind, Record<string, number[]>> = {
  flip: { rotateY: [0, 180, 360], scale: [1, 1.18, 1] },
  bounce: { y: [0, -14, 0, -6, 0], scale: [1, 1.08, 0.96, 1.04, 1] },
  tick: { rotate: [0, -8, 8, -4, 0], scale: [1, 1.12, 1] },
};

/** Orbit radius = half the rotating square's side, so items ride the
 * same guide-ring percentages drawn behind them and stay responsive. */
function OrbitItem({
  icon,
  orbitPct,
  size,
  duration,
  phase,
  reverse,
  flair,
  flairDuration,
  flairDelay,
}: (typeof ORBIT_ITEMS)[number]) {
  const sweep = reverse ? -360 : 360;
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: `${orbitPct}%`, height: `${orbitPct}%` }}
      initial={{ rotate: phase }}
      animate={{ rotate: phase + sweep }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        style={{ width: size, height: size }}
        initial={{ rotate: -phase }}
        animate={{ rotate: -(phase + sweep) }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="flex h-full w-full items-center justify-center rounded-xl bg-white/95 shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={FLAIR_ANIMATE[flair]}
          transition={{
            duration: flairDuration,
            delay: flairDelay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function AbstractVisual() {
  return (
    <div className="relative h-full w-full">
      {/* orbit guide rings */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/35"
        animate={{ rotate: 360 }}
        transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/45"
        animate={{ rotate: -360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />

      {/* pulsing glow behind the trophy */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,193,101,0.55) 0%, rgba(15,92,46,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* trophy — static, no motion */}
      <div className="absolute left-1/2 top-1/2 h-[134%] w-[76%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 12%, black 86%, transparent 100%)",
          }}
        >
          <Image
            src="/pildun.png"
            alt="HSECM Q2 2026 achievement trophy"
            fill
            sizes="(max-width: 1024px) 75vw, 38vw"
            className="object-cover"
            style={{ objectPosition: "50% 48%" }}
            priority
          />
        </div>
      </div>

      {ORBIT_ITEMS.map((props) => (
        <OrbitItem key={props.label} {...props} />
      ))}
    </div>
  );
}
