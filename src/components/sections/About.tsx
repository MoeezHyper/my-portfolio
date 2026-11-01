"use client";

import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Brain, Layers, MapPin, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile, stats } from "@/data/resume";
import { Linkify } from "@/components/ui/Linkify";

const statement =
  "I don't just write endpoints. I design the system around them. From multi-tenant PostgreSQL with row-level security and Stripe Connect billing to real-time voice agents and custom-trained vision models, I own the whole stack and ship it to production.";

function ScrollWord({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const highlight = /multi-tenant|PostgreSQL|Stripe|voice|agents|models,|production\.|whole/.test(word);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={highlight ? "text-gradient" : "text-white"}>
        {word}
      </motion.span>
    </span>
  );
}

function ScrollParagraph({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="font-display text-2xl font-medium leading-[1.3] tracking-tight sm:text-3xl lg:text-[2.6rem]"
    >
      {words.map((w, i) => (
        <ScrollWord
          key={i}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        />
      ))}
    </p>
  );
}

const statIcons = { rocket: Rocket, layers: Layers, brain: Brain };

function Counter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  // Server HTML carries the final value; the count-up only runs on the client.
  const count = useMotionValue(value);
  const rounded = useTransform(count, Math.round);
  useEffect(() => {
    if (!inView) {
      count.set(0);
      return;
    }
    const c = animate(count, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, value, count]);
  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span style={{ color: `rgb(${color})` }}>{suffix}</span>
    </span>
  );
}

function IdCard() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 45%)`;
  const holoAngle = useTransform(gx, [0, 100], [100, 160]);
  const holo = useMotionTemplate`linear-gradient(${holoAngle}deg,rgba(139,123,255,0.35), rgba(69,227,255,0.25) 35%, rgba(255,122,184,0.25) 65%, rgba(196,255,97,0.2))`;

  return (
    <div className="[perspective:1200px]">
      <motion.div
        data-cursor="Hi!"
        className="group relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-ink-800 p-7 shadow-[0_40px_120px_-30px_rgba(139,123,255,0.45)] [transform-style:preserve-3d]"
        style={{ rotateX: srx, rotateY: sry }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          ry.set((px - 0.5) * 22);
          rx.set(-(py - 0.5) * 22);
          gx.set(px * 100);
          gy.set(py * 100);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
          gx.set(50);
          gy.set(50);
        }}
      >
        {/* Head-and-shoulders crop via an oversized layout box (not a CSS scale), so the
            browser gets a source sized for the rendered pixels and never upscales a bitmap. */}
        <div className="absolute left-[-12%] top-[-24%] h-[145%] w-[145%]">
          <Image
            src="/abdul-moeez.jpg"
            alt={`Portrait of ${profile.name}`}
            fill
            quality={95}
            sizes="(min-width: 640px) 560px, 130vw"
            className="object-cover"
          />
        </div>
        {/* legibility gradients only where text sits; face stays untouched */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-950 from-5% via-ink-950/60 via-35% to-transparent to-65%" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink-950/45 to-transparent" />
        {/* holographic shine appears only while interacting */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: holo }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: sheen }}
        />

        <div className="relative flex h-full flex-col justify-between [transform:translateZ(40px)]">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-cyan font-display text-lg font-bold text-ink-950 shadow-lg">
              AM
            </div>
            <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              Dev ID · 2026
            </span>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">Name</p>
            <p className="font-display text-3xl font-semibold tracking-tight text-white">{profile.name}</p>
            <p className="mt-1 text-sm text-white/80">{profile.role}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-black/40 px-2.5 py-1 text-[11px] font-medium text-lime backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
              <Linkify text={profile.currentRole} />
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} /> {profile.location}
              </span>
              <span className="flex items-center gap-3">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white">
                  <GithubIcon size={15} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white">
                  <LinkedinIcon size={15} />
                </a>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-40">
      <SectionHeading
        index="01"
        eyebrow="About me"
        title="A backend-first engineer who ships the whole product."
        highlight={["backend-first", "whole", "product"]}
      />

      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
          <IdCard />
        </Reveal>

        <div>
          <ScrollParagraph text={statement} />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">
              <Linkify text={profile.about} />
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((s, i) => {
              const Icon = statIcons[s.icon];
              return (
                <Reveal key={s.label} delay={i * 0.08} className="h-full">
                  <SpotlightCard color={s.color} className="h-full">
                    <div className="relative flex h-full flex-col p-6">
                      <div
                        aria-hidden
                        className="absolute inset-x-6 top-0 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, rgb(${s.color}), transparent)` }}
                      />
                      <div className="flex items-center justify-between">
                        <span
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                          style={{ color: `rgb(${s.color})` }}
                        >
                          <Icon size={17} />
                        </span>
                        <span className="font-mono text-[10px] text-white/30">0{i + 1}</span>
                      </div>
                      <div className="mt-6 font-display text-5xl font-semibold tracking-tight text-white sm:text-[3.4rem]">
                        <Counter value={s.value} suffix={s.suffix} color={s.color} />
                      </div>
                      <p className="mt-2 text-sm font-medium text-white/90">{s.label}</p>
                      <p className="mt-1 text-xs text-mist">{s.detail}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
