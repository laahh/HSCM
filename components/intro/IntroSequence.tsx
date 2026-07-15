"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";
import SpotlightReveal from "./SpotlightReveal";

type Phase = "loading" | "spotlight";

type Props = {
  active: boolean;
  onComplete: () => void;
};

export default function IntroSequence({ active, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("loading");

  useEffect(() => {
    if (!active) return;
    setPhase("loading");
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!active) return null;

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <Preloader key="loading" onComplete={() => setPhase("spotlight")} />
      )}
      {phase === "spotlight" && (
        <SpotlightReveal key="spotlight" onContinue={onComplete} />
      )}
    </AnimatePresence>
  );
}
