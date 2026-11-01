"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { easeOutExpo } from "@/lib/utils";

/** Fade + rise when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "span" | "p";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      {children}
    </Comp>
  );
}

const wordParent: Variants = {
  hidden: {},
  show: (stagger: number) => ({ transition: { staggerChildren: stagger } }),
};

const wordChild: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease: easeOutExpo } },
};

/** Masked word-by-word headline reveal. */
export function SplitWords({
  text,
  className,
  wordClassName,
  stagger = 0.06,
  animateNow,
}: {
  text: string;
  className?: string;
  wordClassName?: (word: string, i: number) => string | undefined;
  stagger?: number;
  /** If provided, animation is controlled externally instead of on scroll. */
  animateNow?: boolean;
}) {
  const words = text.split(" ");
  const controlled = animateNow !== undefined;
  return (
    <motion.span
      className={className}
      variants={wordParent}
      custom={stagger}
      initial="hidden"
      {...(controlled
        ? { animate: animateNow ? "show" : "hidden" }
        : { whileInView: "show", viewport: { once: true, margin: "-60px 0px" } })}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
        >
          <motion.span variants={wordChild} className={`inline-block ${wordClassName?.(w, i) ?? ""}`}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
