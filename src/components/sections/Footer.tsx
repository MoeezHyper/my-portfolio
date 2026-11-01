"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp, Mail } from "lucide-react";
import { useRef } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { navLinks, profile } from "@/data/resume";
import { Linkify } from "@/components/ui/Linkify";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06] px-5 pt-14 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-xl font-semibold text-white">{profile.name}</p>
          <p className="mt-2 text-sm text-mist">{profile.role}. Building multi-tenant SaaS, payments and AI integrations.</p>
        </div>
        <ul className="grid grid-cols-3 gap-x-10 gap-y-2 text-sm">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="text-mist transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/40"
        >
          Back to top
          <ArrowUp size={15} className="transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      <motion.p
        aria-hidden
        style={{ y, opacity }}
        className="mt-14 select-none text-center font-display text-[19vw] font-bold leading-[0.8] tracking-[-0.05em] text-gradient"
      >
        MOEEZ
      </motion.p>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 text-xs text-white/40 sm:flex-row">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot" />
            <span>
              Currently <Linkify text={profile.currentRole} />
            </span>
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <div className="flex items-center gap-3.5">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-white">
              <GithubIcon size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-white">
              <LinkedinIcon size={15} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-white">
              <Mail size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
