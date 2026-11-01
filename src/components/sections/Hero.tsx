"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers/AppProvider";
import { Button } from "@/components/ui/Button";
import { profile } from "@/data/resume";
import { easeOutExpo } from "@/lib/utils";
import { Linkify } from "@/components/ui/Linkify";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

function Letters({ text, delay, show }: { text: string; delay: number; show: boolean }) {
  return (
    <span className="flex overflow-hidden pb-[0.06em]" aria-hidden>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "115%" }}
          animate={show ? { y: "0%" } : { y: "115%" }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: easeOutExpo }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    // Own fixed-height line so phrases of different lengths never reflow the layout.
    <span className="relative block h-[1.35em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          key={words[i]}
          className="absolute left-0 top-0 whitespace-nowrap text-gradient-animated font-medium"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { introDone } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fade = (d: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, delay: d, ease: easeOutExpo },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_70%_60%_at_60%_45%,#000_30%,transparent_80%)]" />
        <div className="absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-violet/20 blur-[140px]" />
        <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full bg-cyan/10 blur-[140px]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-[100svh] opacity-75 lg:opacity-100">
        <HeroScene active={introDone} paused={!inView} eventSource={sectionRef} />
      </div>

      {/* readability gradient for small screens where the blob sits behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent lg:bg-gradient-to-r lg:from-ink-950/80 lg:via-ink-950/20 lg:to-transparent"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-28 sm:px-8 lg:justify-center lg:pb-24 lg:pt-32 short:pb-20 short:pt-24"
      >
        <motion.div {...fade(0.2)} className="pointer-events-auto mb-7 short:mb-4 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2 pr-4 text-xs text-mist backdrop-blur-md sm:text-sm">
          <span className="relative flex h-2 w-2 shrink-0 rounded-full bg-lime animate-pulse-dot" />
          <span>
            <span className="text-white/90">
              <Linkify text={profile.currentRole} />
            </span>
            <span className="hidden sm:inline"> · Open to new opportunities</span>
          </span>
        </motion.div>

        <h1
          className="font-display text-[min(19vw,14svh)] font-bold leading-[0.85] tracking-[-0.045em] text-white sm:text-[min(15vw,15svh)] lg:text-[min(10.5rem,17svh)] xl:text-[min(12rem,18svh)] short:text-[15svh]"
          aria-label={profile.name}
        >
          <Letters text={profile.firstName} delay={0.1} show={introDone} />
          <span className="flex items-end gap-4">
            <Letters text={profile.lastName} delay={0.35} show={introDone} />
            <motion.span
              aria-hidden
              className="mb-[0.18em] hidden h-[0.14em] w-[0.14em] rounded-full bg-gradient-to-br from-violet to-cyan sm:block"
              initial={{ scale: 0 }}
              animate={{ scale: introDone ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
            />
          </span>
        </h1>

        <motion.p
          {...fade(0.7)}
          className="mt-7 max-w-xl text-lg text-white/90 sm:text-2xl short:mt-4 short:text-xl"
        >
          {/* Full positioning line for crawlers and screen readers; the rotating version is visual only. */}
          <span className="sr-only">{profile.tagline}</span>
          <span aria-hidden className="block">
            {profile.role} building
          </span>
          <span aria-hidden>
            <RotatingWord words={profile.rotatingWords} />
          </span>
        </motion.p>

        <motion.p {...fade(0.8)} className="mt-4 max-w-lg text-sm leading-relaxed text-mist sm:text-base lg:max-w-xl short:mt-3">
          {profile.intro}
        </motion.p>

        <motion.div {...fade(0.95)} className="pointer-events-auto mt-9 flex flex-wrap items-center gap-3 short:mt-6">
          <Button href="#work" icon={<ArrowUpRight size={16} />}>
            Explore my work
          </Button>
          <Button href={profile.resume} variant="ghost" download icon={<Download size={15} />}>
            Download CV
          </Button>
        </motion.div>
      </motion.div>

      {/* bottom bar */}
      <motion.div
        {...fade(1.2)}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-center justify-between px-5 pb-7 font-mono text-[11px] uppercase tracking-[0.2em] text-mist sm:px-8"
      >
        <a href="#about" className="flex items-center gap-3 hover:text-white">
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20">
            <motion.span
              className="mt-1.5 h-1.5 w-1 rounded-full bg-white"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          <span className="hidden sm:inline">Scroll to explore</span>
          <ArrowDown size={12} className="sm:hidden" />
        </a>
        <span className="hidden sm:block">{profile.location}</span>
        <span>SaaS · Payments · AI</span>
      </motion.div>
    </section>
  );
}
