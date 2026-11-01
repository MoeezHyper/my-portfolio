"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Briefcase, FlaskConical, Globe, Rocket } from "lucide-react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { experience, type ExperienceKind } from "@/data/resume";
import { easeOutExpo } from "@/lib/utils";
import { Linkify } from "@/components/ui/Linkify";

const kindStyle: Record<ExperienceKind, { icon: typeof Globe; color: string }> = {
  work: { icon: Rocket, color: "196, 255, 97" },
  internship: { icon: Briefcase, color: "139, 123, 255" },
  research: { icon: FlaskConical, color: "69, 227, 255" },
  freelance: { icon: Globe, color: "255, 122, 184" },
};

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl overflow-x-clip px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="03"
        eyebrow="Experience"
        title="Where I've been shipping."
        highlight={["shipping."]}
        description="Engineering Orenyx products at GixiAI, internships at FIDSOR and Zendev Studios, international freelance clients and applied AI research."
      />

      <div ref={ref} className="relative">
        {/* track */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-violet via-cyan to-lime shadow-[0_0_14px_rgba(139,123,255,0.8)] md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY }}
        />

        <ol className="flex flex-col gap-14 md:gap-24">
          {experience.map((job, i) => {
            const { icon: Icon, color } = kindStyle[job.kind];
            const left = i % 2 === 0;
            return (
              <li key={`${job.company}-${job.role}`} className="relative grid md:grid-cols-2 md:gap-16">
                {/* node */}
                <motion.div
                  className="absolute left-0 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-900 md:left-1/2 md:-translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ color: `rgb(${color})`, boxShadow: `0 0 30px rgba(${color},0.35)` }}
                >
                  <Icon size={17} />
                </motion.div>

                {/* date side */}
                <motion.div
                  className={`hidden md:flex md:flex-col md:pt-7 ${left ? "md:order-2 md:items-start" : "md:items-end md:text-right"}`}
                  initial={{ opacity: 0, x: left ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ duration: 1, ease: easeOutExpo }}
                >
                  <span className="font-display text-3xl font-semibold tracking-tight text-white/90 lg:text-4xl">
                    {job.period}
                  </span>
                  <span className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mist">{job.type}</span>
                </motion.div>

                {/* card */}
                <motion.div
                  className={`pl-16 md:pl-0 ${left ? "md:order-1" : ""}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ duration: 1, ease: easeOutExpo }}
                >
                  <SpotlightCard color={color}>
                    <div className="p-6 sm:p-8">
                      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-mist md:hidden">
                        {job.period} · {job.type}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {job.role}
                      </h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3">
                        {job.url ? (
                          <a
                            href={job.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group/co inline-flex items-center gap-1 text-sm font-medium"
                            style={{ color: `rgb(${color})` }}
                          >
                            {job.company}
                            <ArrowUpRight size={14} className="transition-transform group-hover/co:rotate-45" />
                          </a>
                        ) : (
                          <p className="text-sm font-medium" style={{ color: `rgb(${color})` }}>
                            {job.company}
                          </p>
                        )}
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 text-[11px] font-medium text-lime">
                            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
                            Current role
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-mist sm:text-[15px]">
                        <Linkify text={job.summary} />
                      </p>

                      <div className="mt-5 space-y-2">
                        {job.projects.map((p) => (
                          <div key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/85">
                            <span
                              className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full"
                              style={{ background: `rgb(${color})` }}
                            />
                            <span className="min-w-0">
                              <Linkify text={p} />
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {job.stack.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
