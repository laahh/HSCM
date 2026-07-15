"use client";

import { motion } from "framer-motion";

function TickColumn({
  items,
  align,
  tone,
}: {
  items: string[];
  align: "left" | "right";
  tone: "dark" | "light";
}) {
  return (
    <div
      className={`hidden h-full flex-col items-center justify-between pb-32 pt-10 lg:flex ${
        align === "left" ? "border-r" : "border-l"
      }`}
      style={{
        borderColor: tone === "dark" ? "var(--green-line)" : "rgba(255,255,255,0.25)",
      }}
    >
      {items.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <span
            className="h-6 w-px"
            style={{
              background: tone === "dark" ? "var(--green-line)" : "rgba(255,255,255,0.3)",
            }}
          />
          <span
            className="vertical-rl font-heading text-[11px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: tone === "dark" ? "var(--ink-soft)" : "rgba(255,255,255,0.85)" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SidebarTicks() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 hidden justify-between px-3 lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8 }}
    >
      <TickColumn
        align="left"
        tone="dark"
        items={["HSECM · TINGKAT I", "QUARTER 2 · 2026", "HSE PERFORMANCE"]}
      />
      <TickColumn
        align="right"
        tone="light"
        items={["REFLECTION", "ACCOUNTABILITY", "IMPROVEMENT"]}
      />
    </motion.div>
  );
}
