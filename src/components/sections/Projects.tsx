"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ProjectVisualFor } from "@/components/visuals/ProjectVisuals";
import { featuredProjects, moreProjects, profile, type Project } from "@/data/resume";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn, easeOutExpo } from "@/lib/utils";

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const { live, repo } = project.links ?? {};
  if (!live && !repo) return null;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {live && (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          data-cursor="Visit"
          className="group/link inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-950 transition-transform hover:scale-[1.03]"
        >
          Visit live site
          <ArrowUpRight size={14} className="transition-transform group-hover/link:rotate-45" />
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs text-white transition-colors hover:border-white/40"
        >
          <GithubIcon size={13} /> Source
        </a>
      )}
    </div>
  );
}

/** Screenshot gallery / demo video for live projects that have no public link. */
function ProjectMediaSlot({ project, className }: { project: Project; className?: string }) {
  if (!project.media) return null;
  const { video, poster, images = [] } = project.media;

  if (!video && images.length === 0) {
    return (
      <a
        href={`mailto:${profile.email}?subject=${encodeURIComponent(`Demo request: ${project.title}`)}`}
        data-cursor="Ask"
        className={cn(
          "group/demo flex items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/30 hover:bg-white/[0.04]",
          className,
        )}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
          style={{ color: project.accent }}
        >
          <Play size={13} className="translate-x-px" />
        </span>
        <div className="min-w-0 flex-1 text-xs">
          <p className="font-medium text-white/85">Demo video &amp; screenshots on request</p>
          <p className="mt-0.5 text-mist">No public link · email me for a walkthrough</p>
        </div>
        <ArrowUpRight size={14} className="shrink-0 text-white/40 transition-transform group-hover/demo:rotate-45" />
      </a>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {video && (
        <a
          href={video}
          target="_blank"
          rel="noreferrer"
          data-cursor="Play"
          className="relative flex h-14 w-24 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-ink-900"
        >
          {poster && <Image src={poster} alt="" fill sizes="96px" className="object-cover opacity-70" />}
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink-950">
            <Play size={12} className="translate-x-px" />
          </span>
          <span className="sr-only">Watch the {project.title} demo video</span>
        </a>
      )}
      {images.slice(0, 4).map((src, i) => (
        <a
          key={src}
          href={src}
          target="_blank"
          rel="noreferrer"
          className="relative h-14 w-24 overflow-hidden rounded-lg border border-white/10 bg-ink-900 transition-transform hover:scale-[1.04]"
        >
          <Image src={src} alt={`${project.title} screenshot ${i + 1}`} fill sizes="96px" className="object-cover" />
        </a>
      ))}
    </div>
  );
}

function MoreProjectCard({ project, index }: { project: Project; index: number }) {
  const rgb = hexToRgb(project.accent);
  return (
    <Reveal delay={(index % 2) * 0.1} className="h-full">
      <SpotlightCard color={rgb} className="h-full">
        <div className="flex h-full flex-col">
          <div className="relative h-[300px] overflow-hidden border-b border-white/[0.06] sm:h-[320px]">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: `radial-gradient(ellipse at 50% 40%, ${project.accent}22, transparent 65%)` }}
            />
            <div aria-hidden className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
            {/* render at 125% and scale down so full-size mockups fit the compact frame */}
            <div className="absolute left-1/2 top-1/2 h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 scale-[0.8]">
              <ProjectVisualFor id={project.id} />
            </div>
          </div>
          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-medium" style={{ color: project.accent }}>
                {project.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-xs text-mist">{project.context}</span>
              {project.live && <LiveBadge className="ml-auto" label="Live" />}
            </div>
            <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">{project.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-mist">{project.description}</p>
            <ProjectMediaSlot project={project} className="mt-5" />
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70">
                  {s}
                </span>
              ))}
            </div>
            <ProjectLinks project={project} className="mt-4" />
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

function LiveBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium text-lime", className)}>
      <span className="relative flex h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
      {label}
    </span>
  );
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  stacked,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const start = index / total;
  // Spread the same overall depth across however many cards there are.
  const targetScale = 1 - (total - 1 - index) * Math.min(0.04, 0.16 / Math.max(total - 1, 1));
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const dim = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [0, index === total - 1 ? 0 : 0.45]);

  return (
    <div className="flex items-center justify-center py-3 stack:sticky stack:top-0 stack:h-screen stack:py-0">
      <motion.article
        style={stacked ? { scale, top: `calc(-4vh + ${index * Math.min(26, 130 / Math.max(total - 1, 1))}px)` } : undefined}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px 0px" }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        className="relative flex w-full origin-top flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-ink-850 shadow-[0_-20px_80px_-30px_rgba(0,0,0,0.9)] stack:min-h-[min(600px,82vh)]"
      >
        {/* accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full opacity-25 blur-[120px]"
          style={{ background: project.accent }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
        />

        <div className="relative grid flex-1 grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
          {/* info */}
          <div className="order-2 flex flex-col p-6 sm:p-9 lg:order-1 lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span
                className="rounded-full border px-3 py-1 text-xs font-medium"
                style={{ borderColor: `${project.accent}55`, color: project.accent, background: `${project.accent}12` }}
              >
                {project.category}
              </span>
              {project.live && <LiveBadge label="Live in production" />}
              <span className="text-xs text-mist">{project.context}</span>
            </div>

            <h3 className="mt-4 font-display text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
              {project.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-mist sm:text-[15px]">{project.description}</p>

            <ul className="mt-5 space-y-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-white/85">
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${project.accent}22`, color: project.accent }}
                  >
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <ProjectMediaSlot project={project} className="mb-5" />
              <div className="flex flex-wrap items-center gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                    {s}
                  </span>
                ))}
              </div>
              <ProjectLinks project={project} className="mt-5" />
            </div>
          </div>

          {/* visual */}
          <div className="relative order-1 min-h-[320px] overflow-hidden border-b border-white/[0.06] sm:min-h-[380px] lg:order-2 lg:min-h-0 lg:border-b-0 lg:border-l">
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 60% 40%, ${project.accent}26, transparent 65%)`,
              }}
            />
            <div aria-hidden className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
            <div className="relative h-full">
              <ProjectVisualFor id={project.id} />
            </div>
          </div>
        </div>

        {stacked && (
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink-950" style={{ opacity: dim }} />
        )}
      </motion.article>
    </div>
  );
}

export function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });
  const stacked = useMediaQuery("(min-width: 1024px) and (min-height: 760px)");

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title="Products running in production."
          highlight={["production."]}
          description="Three live Orenyx platforms, an AI voice calling agent for US trucking, the GixiAI website, an AI design SaaS and more, each built end to end."
          className="stack:mb-0"
        />
      </div>

      <div ref={container} className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {featuredProjects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            total={featuredProjects.length}
            progress={scrollYProgress}
            stacked={stacked}
          />
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-7xl px-5 sm:mt-32 sm:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-mist">More work</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Field service, extensions, cloud &amp; automation.
              </h3>
            </div>
            <p className="max-w-sm text-sm text-mist">
              Client, studio and personal projects that sharpened the backend, integration and DevOps skills behind every product above.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {moreProjects.map((p, i) => (
            <MoreProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
