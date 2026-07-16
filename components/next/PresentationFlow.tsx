"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroSequence from "@/components/intro/IntroSequence";
import Hero from "@/components/hero/Hero";
import SystemDefenderSlide from "./system-defender/SystemDefenderSlide";
import SafetyPerformanceSlide from "./safety-performance/SafetyPerformanceSlide";
import LeadingPerformanceSlide from "./leading-performance/LeadingPerformanceSlide";
import RekayasaPerformanceSlide from "./rekayasa/RekayasaPerformanceSlide";
import SummaryEnforcementSlide from "./summary/SummaryEnforcementSlide";

type Stage = "hero" | "intro" | "video" | "slide" | "closing";
type DeckPage = "tactical" | "performance" | "leading" | "rekayasa" | "summary";

const FADE = { duration: 0.55, ease: [0.76, 0, 0.24, 1] as const };

export default function PresentationFlow({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<Stage>("hero");
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
        animate={{
          opacity: stage === "hero" ? 1 : 0,
          x: stage === "hero" ? 0 : "-8%",
          pointerEvents: stage === "hero" ? "auto" : "none",
        }}
        transition={FADE}
        className="cursor-pointer"
        onClick={() => {
          if (stage === "hero") setStage("intro");
        }}
      >
        {children}
      </motion.div>

      <IntroSequence active={stage === "intro"} onComplete={() => setStage("video")} />

      <AnimatePresence>
        {stage === "closing" && (
          <motion.div
            key="closing"
            className="fixed inset-0 z-[80] overflow-y-auto bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
          >
            <Hero
              variant="closing"
              onBack={() => {
                setDeckPage("summary");
                setStage("slide");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === "video" || stage === "slide") && (
          <motion.div
            key="after-intro"
            className={`fixed inset-0 z-[80] ${
              stage === "slide" ? "overflow-hidden bg-white" : "overflow-hidden bg-black"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
          >
            {stage === "video" && (
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
                    className="h-full overflow-y-auto bg-white"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SystemDefenderSlide onNext={() => setDeckPage("performance")} />
                  </motion.div>
                ) : deckPage === "performance" ? (
                  <motion.div
                    key="performance"
                    className="h-full overflow-hidden bg-white"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SafetyPerformanceSlide
                      onBack={() => setDeckPage("tactical")}
                      onNext={() => setDeckPage("leading")}
                    />
                  </motion.div>
                ) : deckPage === "leading" ? (
                  <motion.div
                    key="leading"
                    className="h-full overflow-hidden bg-white"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <LeadingPerformanceSlide
                      onBack={() => setDeckPage("performance")}
                      onNext={() => setDeckPage("rekayasa")}
                    />
                  </motion.div>
                ) : deckPage === "rekayasa" ? (
                  <motion.div
                    key="rekayasa"
                    className="h-full overflow-hidden bg-white"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <RekayasaPerformanceSlide
                      onBack={() => setDeckPage("leading")}
                      onNext={() => setDeckPage("summary")}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="summary"
                    className="h-full overflow-y-auto bg-white"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SummaryEnforcementSlide
                      onBack={() => setDeckPage("rekayasa")}
                      onNext={() => setStage("closing")}
                    />
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
