"use client";

import { AnimatePresence, animate, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { easeInOutQuart, easeOutExpo } from "@/lib/utils";
import { profile } from "@/data/resume";

const words = ["Design", "Build", "Train", "Deploy", "Scale"];
const noop = () => () => {};

export function Preloader() {
  const { finishIntro } = useApp();
  // The overlay itself is server-rendered (no flash of content), but its text is not,
  // so crawlers and no-JS readers never see "Design." / "0%".
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setShow(false);
          finishIntro();
        }, 250);
      },
    });
    const interval = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 400);
    return () => {
      controls.stop();
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink-950 p-6 sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: easeInOutQuart }}
        >
          {mounted && (
            <>
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.25em] text-mist">
                <span>{profile.name}</span>
                <span>Portfolio Â© {new Date().getFullYear()}</span>
              </div>
    
              <div className="flex flex-col items-start gap-4">
                <div className="h-[1.1em] overflow-hidden font-display text-5xl font-semibold tracking-tight sm:text-7xl">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      className="block text-gradient"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-110%" }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                    >
                      {words[wordIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="h-px w-full max-w-md overflow-hidden bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet via-cyan to-rose"
                    style={{ width: `${count}%` }}
                  />
                </div>
              </div>
    
              <div className="flex items-end justify-between">
                <span className="max-w-[16rem] text-sm text-mist">{profile.role}</span>
                <span className="font-display text-7xl font-semibold tabular-nums tracking-tighter sm:text-9xl">
                  {count}
                  <span className="text-violet">%</span>
                </span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
