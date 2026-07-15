"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

const RADIUS = 260;

export default function SpotlightReveal({ onContinue }: { onContinue: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);
  const idleControls = useRef<{ stop: () => void } | null>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { damping: 32, stiffness: 90, mass: 1.1 });
  const springY = useSpring(mvY, { damping: 32, stiffness: 90, mass: 1.1 });

  const maskImage = useMotionTemplate`radial-gradient(${RADIUS}px circle at ${springX}px ${springY}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,1) 100%)`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startIdleDrift = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const rx = Math.min(w, 900) * 0.22;
      const ry = Math.min(h, 600) * 0.22;
      let angle = 0;
      let raf = 0;
      const tick = () => {
        angle += 0.0035;
        mvX.set(cx + Math.cos(angle) * rx);
        mvY.set(cy + Math.sin(angle * 1.3) * ry);
        raf = requestAnimationFrame(tick);
      };
      tick();
      idleControls.current = { stop: () => cancelAnimationFrame(raf) };
    };

    mvX.set(el.clientWidth / 2);
    mvY.set(el.clientHeight / 2);
    startIdleDrift();

    const stopIdle = () => {
      if (!hasInteracted.current) {
        hasInteracted.current = true;
        idleControls.current?.stop();
      }
    };

    const handlePointer = (clientX: number, clientY: number) => {
      stopIdle();
      const rect = el.getBoundingClientRect();
      mvX.set(clientX - rect.left);
      mvY.set(clientY - rect.top);
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) handlePointer(t.clientX, t.clientY);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchstart", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchstart", onTouchMove);
      idleControls.current?.stop();
    };
  }, [mvX, mvY]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-[60] overflow-hidden bg-[#050c07]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* bright content, only visible through the flashlight cutout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[var(--lime)] px-6 text-center">
        <div className="relative h-40 w-40 sm:h-56 sm:w-56">
          <Image
            src="/pildun.png"
            alt="HSECM Q2 2026 trophy"
            fill
            sizes="220px"
            className="object-contain"
          />
        </div>
        <p className="font-heading text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--ink)]">
          HSECM Tingkat I &middot; Quarter 2 2026
        </p>
        <h1 className="max-w-3xl font-heading text-4xl font-extrabold uppercase leading-[0.95] text-[var(--ink)] sm:text-6xl">
          Bangkit Lebih Kuat
        </h1>
        <p className="max-w-md font-body text-sm text-[var(--ink-soft)] sm:text-base">
          Paham Kondisi, Berani Intropeksi, Bangkit Lebih Kuat.
        </p>
      </div>

      {/* dark cover with a cursor/touch-follow cutout */}
      <motion.div
        className="absolute inset-0 bg-[#050c07]"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      />

      {/* always-visible chrome: hint, skip, continue */}
      <div className="pointer-events-none absolute inset-x-0 top-6 flex items-center justify-between px-6 sm:px-10">
        <span className="hidden font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:inline">
          Geser kursor untuk menjelajah
        </span>
        <span className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:hidden">
          Sentuh untuk menjelajah
        </span>
        <button
          type="button"
          onClick={onContinue}
          className="pointer-events-auto font-heading text-xs font-semibold uppercase tracking-[0.2em] text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Lewati
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center">
        <motion.button
          type="button"
          onClick={onContinue}
          className="glass-chip pointer-events-auto rounded-full px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-[var(--ink)] shadow-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Lanjutkan &darr;
        </motion.button>
      </div>
    </motion.div>
  );
}
