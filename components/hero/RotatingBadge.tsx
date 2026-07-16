"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function RotatingBadge() {
  return (
    <motion.div
      className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-white shadow-lg sm:h-32 sm:w-32"
      initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/qrcode.jpeg"
        alt="QR Code"
        fill
        sizes="128px"
        className="object-contain p-1.5"
        priority
      />
    </motion.div>
  );
}
