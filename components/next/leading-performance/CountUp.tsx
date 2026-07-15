"use client";

import { useEffect, useState } from "react";
import { useInView } from "../safety-performance/useInView";

type Props = {
  from: number;
  to: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
};

export function CountUp({
  from,
  to,
  suffix = "",
  decimals = 0,
  className,
  duration = 900,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.2);
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}
