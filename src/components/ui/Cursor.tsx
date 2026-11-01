"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type Variant = "default" | "hover" | "view";

export function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });
  const [variant, setVariant] = useState<Variant>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!finePointer) return;
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, [role='button']",
      );
      if (!target) {
        setVariant("default");
        setLabel("");
        return;
      }
      const c = target.dataset.cursor;
      if (c && c !== "hover") {
        setVariant("view");
        setLabel(c);
      } else {
        setVariant("hover");
        setLabel("");
      }
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [finePointer, x, y]);

  if (!finePointer) return null;

  const size = variant === "view" ? 88 : variant === "hover" ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && variant !== "view" ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border text-[11px] font-medium uppercase tracking-[0.18em] text-ink-950"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor:
            variant === "view"
              ? "rgba(255,255,255,0.95)"
              : variant === "hover"
                ? "rgba(139,123,255,0.14)"
                : "rgba(255,255,255,0)",
          borderColor:
            variant === "view" ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.35)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        {variant === "view" && label}
      </motion.div>
    </>
  );
}
