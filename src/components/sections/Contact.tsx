"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { profile } from "@/data/resume";

function LocalTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: profile.timezone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || "--:--:--"}</span>;
}

const channels = [
  { label: "LinkedIn", value: "Abdul Moeez", href: profile.linkedin, icon: LinkedinIcon },
  { label: "GitHub", value: "@MoeezHyper", href: profile.github, icon: GithubIcon },
  { label: "Resume", value: "Download PDF", href: profile.resume, icon: Download, download: true },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-40">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,#8b7bff,#45e3ff,#ff7ab8,#8b7bff)] opacity-20 blur-[120px] animate-spin-slow" />
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 backdrop-blur">
              <span className="relative h-9 w-9 shrink-0">
                <span className="absolute inset-0 overflow-hidden rounded-full ring-1 ring-white/20">
                  {/* zoom into the face from the full portrait */}
                  <Image
                    src="/abdul-moeez.jpg"
                    alt=""
                    fill
                    sizes="72px"
                    className="origin-[45%_37%] scale-[2.4] object-cover object-[45%_37%]"
                  />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-950 bg-lime" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist">Open to opportunities</span>
            </div>
          </div>
        </Reveal>

        <h2 className="mx-auto max-w-5xl text-center font-display text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[7.5rem]">
          <SplitWords
            text="Let's build something remarkable."
            wordClassName={(w) => (w.startsWith("remarkable") ? "text-gradient-animated" : undefined)}
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-base text-mist sm:text-lg">
            Hiring for a full-stack or AI role, or need a product built end to end? I reply fast.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Email"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-7 py-5 text-base font-semibold text-ink-950 sm:text-lg"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-gradient-to-r from-violet to-cyan transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <Mail size={20} className="relative" />
                <span className="relative break-all">{profile.email}</span>
                <ArrowUpRight size={20} className="relative transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-[60px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 text-sm text-white backdrop-blur transition-colors hover:border-white/30"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "y" : "n"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check size={16} className="text-lime" /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Copy email"}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-4xl gap-3 sm:grid-cols-3">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={0.1 + i * 0.08}>
              <a
                href={c.href}
                target={c.download ? undefined : "_blank"}
                rel="noreferrer"
                download={c.download || undefined}
                className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white">
                    <c.icon size={17} />
                  </span>
                  <div>
                    <p className="text-xs text-mist">{c.label}</p>
                    <p className="text-sm font-medium text-white">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-white/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs text-mist">
            <span className="flex items-center gap-2">
              <MapPin size={13} /> {profile.location}
            </span>
            <span>
              Local time · <LocalTime /> (PKT)
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
