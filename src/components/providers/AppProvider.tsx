"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type AppState = { introDone: boolean; finishIntro: () => void };

const AppContext = createContext<AppState>({ introDone: true, finishIntro: () => {} });

export const useApp = () => useContext(AppContext);

function ScrollLock({ locked }: { locked: boolean }) {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);
  useEffect(() => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, [locked]);
  return null;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    // Always start at the top so the intro reveal lines up with the hero.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppContext.Provider value={{ introDone, finishIntro: () => setIntroDone(true) }}>
      <MotionConfig reducedMotion="user">
        <ReactLenis
          root
          options={{
            lerp: reduceMotion ? 1 : 0.1,
            smoothWheel: !reduceMotion,
            wheelMultiplier: 1,
            anchors: { offset: -20 },
          }}
        >
          <ScrollLock locked={!introDone} />
          {children}
        </ReactLenis>
      </MotionConfig>
    </AppContext.Provider>
  );
}
