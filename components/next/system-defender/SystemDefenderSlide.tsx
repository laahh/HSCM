"use client";

import TacticalBoard from "./tactical/TacticalBoard";

export default function SystemDefenderSlide({ onNext }: { onNext?: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <TacticalBoard onNext={onNext} />
    </div>
  );
}
