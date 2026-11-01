"use client";

import { cn } from "@/lib/utils";
import { Linkify } from "./Linkify";
import { Reveal, SplitWords } from "./Reveal";

const strip = (s: string) => s.replace(/[.,!?']/g, "").toLowerCase();

export function SectionHeading({
  index,
  eyebrow,
  title,
  highlight = [],
  description,
  className,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: string;
  /** Words in the title to render with the gradient. */
  highlight?: string[];
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-5 sm:mb-20",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-mist">
          <span className="text-violet">{index}</span>
          <span className="h-px w-10 bg-gradient-to-r from-violet to-transparent" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>
      <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
        <SplitWords
          text={title}
          wordClassName={(w) =>
            highlight.some((h) => strip(h) === strip(w)) ? "text-gradient" : undefined
          }
        />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-mist sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            <Linkify text={description} />
          </p>
        </Reveal>
      )}
    </div>
  );
}
