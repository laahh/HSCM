"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SystemDefenderSlide from "./system-defender/SystemDefenderSlide";
import SafetyPerformanceSlide from "./safety-performance/SafetyPerformanceSlide";
import LeadingPerformanceSlide from "./leading-performance/LeadingPerformanceSlide";

type Stage = "idle" | "panning" | "video" | "slide";
type DeckPage = "tactical" | "performance" | "leading";

const PAN_TRANSITION = { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const };

export default function PanToVideo({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("idle");
  const [deckPage, setDeckPage] = useState<DeckPage>("tactical");
  const [needsUnmute, setNeedsUnmute] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (stage !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        v.muted = true;
        setNeedsUnmute(true);
        v.play().catch(() => {});
      });
    }
  }, [stage]);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        animate={{ x: stage === "idle" ? 0 : "-100%" }}
        transition={PAN_TRANSITION}
        className="cursor-pointer"
        onClick={() => {
          if (stage === "idle") setStage("panning");
        }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {stage !== "idle" && (
          <motion.div
            key="pan-incoming"
            className={`fixed inset-0 z-[80] ${stage === "slide" ? "overflow-y-auto bg-white" : "overflow-hidden bg-black"}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={PAN_TRANSITION}
            onAnimationComplete={() => {
              if (stage === "panning") setStage("video");
            }}
          >
            {stage !== "slide" && (
              <>
                <video
                  ref={videoRef}
                  src="/opening.mp4"
                  className="h-full w-full object-cover"
                  playsInline
                  onEnded={() => {
                    setDeckPage("tactical");
                    setStage("slide");
                  }}
                />

                {needsUnmute && (
                  <button
                    type="button"
                    onClick={() => {
                      const v = videoRef.current;
                      if (v) v.muted = false;
                      setNeedsUnmute(false);
                    }}
                    className="glass-chip absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wide text-[var(--ink)] shadow-xl"
                  >
                    Aktifkan Suara
                  </button>
                )}
              </>
            )}

            {stage === "slide" && (
              <AnimatePresence mode="wait">
                {deckPage === "tactical" ? (
                  <motion.div
                    key="tactical"
                    className="min-h-full bg-white"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SystemDefenderSlide onNext={() => setDeckPage("performance")} />
                  </motion.div>
                ) : deckPage === "performance" ? (
                  <motion.div
                    key="performance"
                    className="min-h-full bg-white"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SafetyPerformanceSlide
                      onBack={() => setDeckPage("tactical")}
                      onNext={() => setDeckPage("leading")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="leading"
                    className="min-h-full bg-white"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.35 }}
                  >
                    <LeadingPerformanceSlide onBack={() => setDeckPage("performance")} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
