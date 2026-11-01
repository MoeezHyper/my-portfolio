"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card with a mouse-following spotlight on both the surface and the border. */
export function SpotlightCard({
  children,
  className,
  color = "139, 123, 255",
}: {
  children: ReactNode;
  className?: string;
  /** rgb triplet */
  color?: string;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const bg = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgba(${color}, 0.13), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(280px circle at ${mx}px ${my}px, rgba(${color}, 0.7), transparent 70%)`;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-ink-850/80",
        className,
      )}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
    >
      {/* border glow (masked to a 1px ring) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: border,
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: bg }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
