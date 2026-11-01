"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/resume";
import { cn } from "@/lib/utils";

type Tag = { label: string; color: string; group: string };

function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = phi * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

function TagSphere({ tags, activeGroup }: { tags: Tag[]; activeGroup: string | null }) {
  const wrap = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const active = useRef<string | null>(null);
  const [radius, setRadius] = useState(220);

  useEffect(() => {
    active.current = activeGroup;
  }, [activeGroup]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setRadius(Math.min(e.contentRect.width * 0.36, 230)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const pts = fibonacciSphere(tags.length);
    const auto = { x: 0.0012, y: 0.0035 };
    const vel = { x: auto.x, y: auto.y };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let raf = 0;
    let visible = false;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    });
    io.observe(el);

    const down = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      last = { x: e.clientX, y: e.clientY };
      vel.y = dx * 0.004;
      vel.x = -dy * 0.004;
    };
    const up = () => (dragging = false);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    function frame() {
      if (!dragging) {
        vel.x += (auto.x - vel.x) * 0.03;
        vel.y += (auto.y - vel.y) * 0.03;
      }
      const cx = Math.cos(vel.x), sx = Math.sin(vel.x);
      const cy = Math.cos(vel.y), sy = Math.sin(vel.y);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // rotate around X then Y
        const y1 = p[1] * cx - p[2] * sx;
        const z1 = p[1] * sx + p[2] * cx;
        const x2 = p[0] * cy + z1 * sy;
        const z2 = -p[0] * sy + z1 * cy;
        p[0] = x2;
        p[1] = y1;
        p[2] = z2;

        const node = els.current[i];
        if (!node) continue;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.55 + depth * 0.6;
        const g = active.current;
        const dimmed = g && tags[i].group !== g;
        const lit = g && tags[i].group === g;
        node.style.transform = `translate(-50%, -50%) translate3d(${x2 * radius}px, ${y1 * radius}px, 0) scale(${lit ? scale * 1.15 : scale})`;
        node.style.opacity = String(dimmed ? 0.08 : 0.18 + depth * 0.82);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.35 && !lit ? `blur(${(0.35 - depth) * 4}px)` : "none";
      }
      if (visible) raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [tags, radius]);

  return (
    <div
      ref={wrap}
      data-cursor="Drag"
      className="relative aspect-square w-full touch-pan-y select-none"
    >
      <div aria-hidden className="absolute inset-[12%] rounded-full bg-gradient-to-br from-violet/15 via-transparent to-cyan/10 blur-2xl" />
      <div aria-hidden className="absolute inset-[8%] rounded-full border border-white/[0.05]" />
      <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-white/[0.06] animate-spin-slow" />
      {tags.map((t, i) => (
        <span
          key={t.label}
          ref={(n) => {
            els.current[i] = n;
          }}
          className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border bg-ink-900/70 px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-[filter] will-change-transform sm:text-sm"
          style={{ color: t.color, borderColor: `${t.color}40` }}
        >
          {t.label}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const tags = useMemo<Tag[]>(
    () =>
      skillGroups.flatMap((g) => g.items.map((label) => ({ label, color: g.color, group: g.title }))),
    [],
  );

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="05"
        eyebrow="Toolkit"
        title="The stack behind the work."
        highlight={["stack"]}
        description="Drag the sphere, or hover a category to light up its tools."
      />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <Reveal className="mx-auto w-full max-w-[580px]">
          <TagSphere tags={tags} activeGroup={activeGroup} />
        </Reveal>

        <div className="flex flex-col gap-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.06}>
              <motion.div
                onPointerEnter={() => setActiveGroup(g.title)}
                onPointerLeave={() => setActiveGroup(null)}
                className={cn(
                  "rounded-2xl border p-5 transition-colors duration-300",
                  activeGroup === g.title ? "border-white/20 bg-white/[0.05]" : "border-white/[0.07] bg-white/[0.02]",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full" style={{ background: g.color, boxShadow: `0 0 12px ${g.color}` }} />
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">{g.title}</h3>
                  <span className="ml-auto font-mono text-xs text-white/35">{String(g.items.length).padStart(2, "0")}</span>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/[0.08] px-2.5 py-1 text-xs text-white/70 transition-colors"
                      style={activeGroup === g.title ? { color: g.color, borderColor: `${g.color}55` } : undefined}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
