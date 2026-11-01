"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  AudioLines,
  AudioWaveform,
  BadgeCheck,
  Bot,
  Bug,
  CalendarCheck,
  Camera,
  CircleCheck,
  Clock3,
  Code,
  Coffee,
  Database,
  Dog,
  FileText,
  Globe,
  Handshake,
  Heart,
  Lock,
  MapPin,
  MessageCircle,
  Mic,
  Plug,
  Repeat2,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Users,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { ProjectVisual } from "@/data/resume";
import { BrowserFrame, PhoneFrame } from "./Frames";

const loop = { repeat: Infinity, ease: "easeInOut" as const };

function useTyping(text: string, speed = 45, pause = 1800) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i++;
      setN(i);
      if (i < text.length) t = setTimeout(tick, speed);
      else
        t = setTimeout(() => {
          i = 0;
          setN(0);
          t = setTimeout(tick, 400);
        }, pause);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, [text, speed, pause]);
  return text.slice(0, n);
}

function Float({
  children,
  className,
  delay = 0,
  amp = 6,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amp?: number;
}) {
  return (
    <motion.div
      data-chip
      className={className}
      animate={{ y: [0, -amp, 0] }}
      transition={{ duration: 4.5, delay, ...loop }}
    >
      {children}
    </motion.div>
  );
}

/** Row of status chips placed under a mockup, so they never cover it. */
function ChipRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full max-w-[520px] flex-wrap items-center justify-between gap-2 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/* ================= Tazmim: AI interior design ================= */
function Room({ styled }: { styled: boolean }) {
  return (
    <svg
      viewBox="0 0 400 230"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`wall-${styled}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={styled ? "#2a2140" : "#26262e"} />
          <stop offset="1" stopColor={styled ? "#3a2c4f" : "#1f1f26"} />
        </linearGradient>
        <linearGradient id={`floor-${styled}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={styled ? "#8a6a4a" : "#3a3a42"} />
          <stop offset="1" stopColor={styled ? "#5c4330" : "#2b2b31"} />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd59a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd59a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="160" fill={`url(#wall-${styled})`} />
      <polygon
        points="0,160 400,160 400,230 0,230"
        fill={`url(#floor-${styled})`}
      />
      {/* window */}
      <rect
        x="250"
        y="30"
        width="90"
        height="80"
        rx="3"
        fill={styled ? "#7cc6ff" : "#44444d"}
        opacity={styled ? 0.55 : 1}
      />
      <line
        x1="295"
        y1="30"
        x2="295"
        y2="110"
        stroke={styled ? "#f5e6d3" : "#2c2c33"}
        strokeWidth="3"
      />
      <line
        x1="250"
        y1="70"
        x2="340"
        y2="70"
        stroke={styled ? "#f5e6d3" : "#2c2c33"}
        strokeWidth="3"
      />
      {/* art */}
      {styled && (
        <rect
          x="80"
          y="45"
          width="60"
          height="42"
          rx="2"
          fill="#ff7ab8"
          opacity="0.7"
        />
      )}
      {styled && (
        <rect
          x="150"
          y="52"
          width="34"
          height="34"
          rx="2"
          fill="#45e3ff"
          opacity="0.6"
        />
      )}
      {/* sofa */}
      <rect
        x="60"
        y="120"
        width="170"
        height="50"
        rx="12"
        fill={styled ? "#e8d8c3" : "#4a4a52"}
      />
      <rect
        x="70"
        y="105"
        width="150"
        height="30"
        rx="10"
        fill={styled ? "#f3e7d7" : "#55555e"}
      />
      {styled && (
        <rect x="90" y="112" width="30" height="22" rx="6" fill="#8b7bff" />
      )}
      {styled && (
        <rect
          x="170"
          y="112"
          width="30"
          height="22"
          rx="6"
          fill="#c4ff61"
          opacity="0.8"
        />
      )}
      {/* rug */}
      {styled && (
        <ellipse
          cx="150"
          cy="200"
          rx="120"
          ry="18"
          fill="#c9a27e"
          opacity="0.6"
        />
      )}
      {/* lamp */}
      <line
        x1="300"
        y1="125"
        x2="300"
        y2="185"
        stroke={styled ? "#d4b483" : "#555"}
        strokeWidth="3"
      />
      <path
        d="M285 125 L315 125 L308 108 L292 108 Z"
        fill={styled ? "#ffd59a" : "#5a5a63"}
      />
      {styled && <circle cx="300" cy="120" r="40" fill="url(#glow)" />}
      {/* plant */}
      {styled && (
        <g>
          <rect x="350" y="160" width="22" height="25" rx="3" fill="#b5835a" />
          <ellipse cx="355" cy="148" rx="9" ry="18" fill="#4caf7a" />
          <ellipse cx="368" cy="145" rx="8" ry="20" fill="#3d9a68" />
        </g>
      )}
    </svg>
  );
}

function TazmimVisual() {
  const prompt = useTyping("Japandi living room, warm oak, soft evening light");
  // One value drives both the reveal mask and the divider, so they can never drift apart.
  const split = useMotionValue(75);
  useEffect(() => {
    const c = animate(split, [75, 22, 75], {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return () => c.stop();
  }, [split]);
  const reveal = useMotionTemplate`inset(0 0 0 ${split}%)`;
  const dividerLeft = useMotionTemplate`${split}%`;

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:p-8">
      <BrowserFrame url="tazmim.app/studio" className="w-full max-w-[520px]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <div className="absolute inset-0">
            <Room styled={false} />
          </div>
          <motion.div className="absolute inset-0" style={{ clipPath: reveal }}>
            <Room styled />
          </motion.div>
          <motion.div
            className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            style={{ left: dividerLeft }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[9px] font-bold text-ink-950">
              ⇆
            </div>
          </motion.div>
          <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/80">
            BEFORE
          </span>
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-violet/80 px-1.5 py-0.5 font-mono text-[9px] text-white">
            <Sparkles size={9} /> AI RENDER
          </span>
        </div>
        <div className="flex items-center gap-2 border-t border-white/[0.07] p-2.5">
          <WandSparkles size={13} className="shrink-0 text-violet" />
          <p className="min-w-0 flex-1 truncate font-mono text-[10px] text-white/80">
            {prompt}
            <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-white" />
          </p>
          <span className="shrink-0 rounded-md bg-gradient-to-r from-violet to-cyan px-2.5 py-1 text-[10px] font-semibold text-ink-950">
            Generate
          </span>
        </div>
      </BrowserFrame>

      <ChipRow>
        <Float amp={3} delay={1.2}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <ShieldCheck size={14} className="text-cyan" />
            <span className="text-white/80">Signed in with Google</span>
          </div>
        </Float>
        <Float amp={3} delay={0.4}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <BadgeCheck size={14} className="text-lime" />
            <span className="font-semibold text-white">Pro plan active</span>
            <span className="text-white/50">via Stripe</span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

/* ================= Animal welfare: AI mobile app ================= */
function Waveform() {
  return (
    <div className="flex h-6 items-center gap-[2px]">
      {Array.from({ length: 22 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-cyan"
          animate={{ height: [4, 6 + ((i * 7) % 18), 4] }}
          transition={{
            duration: 0.9 + (i % 4) * 0.15,
            delay: i * 0.04,
            ...loop,
          }}
        />
      ))}
    </div>
  );
}

function AnimalVisual() {
  // Container query: chips flank the phone only when this panel is wide enough;
  // otherwise they wrap into a row below it so nothing covers the screen.
  return (
    <div className="@container h-full w-full">
      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5">
        <PhoneFrame className="h-[330px] w-[170px] sm:h-[370px] sm:w-[190px]">
          <div className="flex h-full flex-col">
            <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-[#1b2a2f] to-[#0f1a1d]">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <Dog
                className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-amber/90"
                size={92}
                strokeWidth={1.1}
              />
              {/* detection box */}
              <motion.div
                className="absolute rounded-md border-2 border-cyan"
                animate={{
                  left: ["22%", "18%", "22%"],
                  top: ["28%", "25%", "28%"],
                  width: ["56%", "64%", "56%"],
                  height: ["42%", "48%", "42%"],
                }}
                transition={{ duration: 3, ...loop }}
              >
                <span className="absolute -top-4 left-0 whitespace-nowrap rounded-sm bg-cyan px-1 font-mono text-[8px] font-bold text-ink-950">
                  golden_retriever 0.94
                </span>
              </motion.div>
              {/* scan line */}
              <motion.div
                className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-cyan/25 to-transparent"
                animate={{ top: ["-10%", "100%"] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-x-2 bottom-2 flex gap-1">
                {["Breed", "Emotion", "Disease"].map((t, i) => (
                  <motion.span
                    key={t}
                    className="flex-1 rounded bg-black/60 py-1 text-center font-mono text-[7px] text-white/80"
                    animate={{
                      borderColor: ["#ffffff00", "#45e3ff", "#ffffff00"],
                    }}
                    style={{ border: "1px solid" }}
                    transition={{ duration: 3, delay: i, repeat: Infinity }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 bg-ink-900 p-2.5">
              <div className="flex items-center justify-between text-[9px]">
                <span className="font-semibold text-white">AI Health Scan</span>
                <span className="text-lime">Healthy</span>
              </div>
              <div className="h-1 overflow-hidden rounded bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan to-lime"
                  animate={{ width: ["0%", "88%"] }}
                  transition={{ duration: 2.4, repeat: Infinity }}
                />
              </div>
              <div className="flex justify-between pt-1 text-white/50">
                <Camera size={12} />
                <MapPin size={12} />
                <Heart size={12} />
                <FileText size={12} />
              </div>
            </div>
          </div>
        </PhoneFrame>

        <div className="flex flex-wrap items-start justify-center gap-2 @min-[560px]:contents">
          <Float
            className="@min-[560px]:absolute @min-[560px]:left-6 @min-[560px]:top-8"
            delay={0.2}
          >
            <div className="glass rounded-xl px-3 py-2 text-[10px]">
              <div className="mb-1 flex items-center gap-1.5 text-white/70">
                <AudioLines size={12} className="text-cyan" /> YAMNet audio
              </div>
              <Waveform />
              <p className="mt-1 font-mono text-[9px] text-rose">
                bark → distress
              </p>
            </div>
          </Float>
          <Float
            className="@min-[560px]:absolute @min-[560px]:bottom-10 @min-[560px]:left-8"
            delay={1}
          >
            <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
              <MapPin size={13} className="text-rose" />
              <div>
                <p className="font-semibold text-white">Rescue case opened</p>
                <p className="text-white/50">geo-tagged · team notified</p>
              </div>
            </div>
          </Float>
          <Float
            className="@min-[560px]:absolute @min-[560px]:right-6 @min-[560px]:top-1/3"
            delay={0.7}
          >
            <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
              <FileText size={13} className="text-lime" />
              <div>
                <p className="font-semibold text-white">OCR record</p>
                <p className="text-white/50">vaccination digitized ✓</p>
              </div>
            </div>
          </Float>
        </div>
      </div>
    </div>
  );
}

/* ================= Memecoin launcher: AI auto-posting ================= */
function MemecoinVisual() {
  const tweet = useTyping(
    "🚀 $MOON just broke out. Community is the rocket, memes are the fuel. Join us 👇",
    35,
    2200,
  );
  const queue = [
    { time: "09:00", status: "Posted", color: "text-lime" },
    { time: "13:30", status: "Posted", color: "text-lime" },
    { time: "18:00", status: "Scheduled", color: "text-amber" },
    { time: "21:15", status: "Generating", color: "text-violet" },
  ];
  return (
    <div className="relative flex h-full items-center justify-center gap-4 p-5 sm:p-8">
      <div className="w-full max-w-[290px] rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-amber text-sm">
            🐸
          </div>
          <div className="text-[11px]">
            <p className="font-semibold text-white">MoonFrog</p>
            <p className="text-white/40">@moonfrog_ai</p>
          </div>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-violet/15 px-2 py-0.5 text-[9px] text-violet">
            <Sparkles size={9} /> AI draft
          </span>
        </div>
        <p className="mt-3 min-h-[54px] text-[12px] leading-relaxed text-white/90">
          {tweet}
          <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-white" />
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-3 text-white/40">
          <MessageCircle size={13} />
          <Repeat2 size={13} />
          <Heart size={13} />
          <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-ink-950">
            Schedule
          </span>
        </div>
      </div>

      <div className="hidden w-[180px] shrink-0 space-y-2 sm:block">
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <Clock3 size={11} /> Today&apos;s queue
        </p>
        {queue.map((q, i) => (
          <motion.div
            key={q.time}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-ink-900/90 px-3 py-2 text-[10px]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <span className="font-mono text-white/80">{q.time}</span>
            <span className={`flex items-center gap-1 ${q.color}`}>
              {q.status === "Generating" ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles size={10} />
                </motion.span>
              ) : (
                <CircleCheck size={10} />
              )}
              {q.status}
            </span>
          </motion.div>
        ))}
        <div className="flex items-center gap-1.5 rounded-xl border border-rose/30 bg-rose/10 px-3 py-2 font-mono text-[10px] text-rose">
          <Database size={11} /> redis · cache:HIT
        </div>
      </div>
    </div>
  );
}

/* ================= ZenBug: Chrome extension bug reporter ================= */
function ZenBugVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 p-5">
      <BrowserFrame
        url="client-app.com/checkout"
        className="w-full max-w-[460px]"
      >
        <div className="relative aspect-[16/9] p-4">
          {/* page skeleton */}
          <div className="mb-3 h-3 w-1/3 rounded bg-white/15" />
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 space-y-2">
              <div className="h-16 rounded-lg bg-white/[0.06]" />
              <div className="h-2 w-4/5 rounded bg-white/10" />
              <div className="h-2 w-3/5 rounded bg-white/10" />
              <div className="relative mt-3 h-7 w-28 translate-x-3 rounded-md bg-lime/70">
                {/* annotation circle */}
                <svg
                  className="absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] overflow-visible"
                  viewBox="0 0 140 52"
                >
                  <motion.ellipse
                    cx="70"
                    cy="26"
                    rx="66"
                    ry="22"
                    fill="none"
                    stroke="#ff5f57"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{
                      duration: 4,
                      times: [0, 0.3, 0.85, 1],
                      repeat: Infinity,
                    }}
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-10 rounded-lg bg-white/[0.06]" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
            </div>
          </div>

          {/* widget */}
          <motion.div
            className="absolute bottom-3 right-3 w-[140px] rounded-xl border border-white/10 bg-ink-800/95 p-2.5 shadow-2xl backdrop-blur"
            animate={{ y: [8, 0, 0, 8], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              times: [0.2, 0.35, 0.9, 1],
              repeat: Infinity,
            }}
          >
            <p className="flex items-center gap-1 text-[9px] font-semibold text-white">
              <Bug size={10} className="text-lime" /> Report a bug
            </p>
            <div className="mt-1.5 h-9 rounded-md border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02]">
              <span className="m-1 inline-block h-2 w-6 rounded-full border border-[#ff5f57]" />
            </div>
            <p className="mt-1.5 text-[8px] text-white/60">
              &quot;Pay button misaligned on mobile&quot;
            </p>
            <div className="mt-1.5 rounded bg-lime py-1 text-center text-[8px] font-bold text-ink-950">
              Send to dashboard
            </div>
          </motion.div>
        </div>
      </BrowserFrame>

      <ChipRow className="max-w-[460px] justify-center">
        <motion.div
          data-chip
          className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]"
          animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, -4] }}
          transition={{
            duration: 4,
            times: [0, 0.5, 0.6, 0.92, 1],
            repeat: Infinity,
          }}
        >
          <CircleCheck size={13} className="text-lime" />
          <span className="font-semibold text-white">Ticket #482 created</span>
          <span className="text-white/50">screenshot + metadata stored</span>
        </motion.div>
      </ChipRow>
    </div>
  );
}

/* ================= Shoplify: e-commerce ================= */
const products = [
  { name: "Aero Runner", price: "$129", g: "from-amber to-rose" },
  { name: "Nimbus Hoodie", price: "$79", g: "from-violet to-cyan" },
  { name: "Pulse Watch", price: "$249", g: "from-cyan to-lime" },
  { name: "Echo Buds", price: "$99", g: "from-rose to-violet" },
];

function ShoplifyVisual() {
  const [count, setCount] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c >= 5 ? 2 : c + 1)), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 p-5">
      <BrowserFrame url="shoplify.store" className="w-full max-w-[460px]">
        <div className="p-3.5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-sm font-bold text-white">
              shoplify.
            </span>
            <div className="relative text-white/80">
              <ShoppingCart size={15} />
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber text-[8px] font-bold text-ink-950"
              >
                {count}
              </motion.span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {products.map((p, i) => (
              <div
                key={p.name}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-1.5"
              >
                <motion.div
                  className={`aspect-square rounded-md bg-gradient-to-br ${p.g}`}
                  animate={{ opacity: [0.75, 1, 0.75] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}
                />
                <p className="mt-1.5 truncate text-[8px] text-white/80">
                  {p.name}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-semibold text-white">
                    {p.price}
                  </p>
                  <Star size={7} className="fill-amber text-amber" />
                </div>
                <motion.div
                  className="mt-1 rounded py-0.5 text-center text-[7px] text-white"
                  // Explicit rgba on both sides: Motion can't animate the oklab() colors Tailwind v4 emits.
                  initial={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  animate={{
                    backgroundColor:
                      i === count % 4
                        ? [
                            "rgba(255,255,255,0.1)",
                            "rgba(255,184,107,0.9)",
                            "rgba(255,255,255,0.1)",
                          ]
                        : "rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.8 }}
                >
                  Add to cart
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
      <ChipRow className="max-w-[460px]">
        <Float amp={3} delay={0.6}>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] font-semibold text-white">
            <Lock size={11} className="text-lime" /> Secure checkout
          </div>
        </Float>
        <Float amp={3} delay={1.1}>
          <div className="glass flex items-center gap-3 rounded-xl px-3 py-2 text-[10px] text-white/60">
            <span>
              Items <span className="text-white">{count}</span>
            </span>
            <span>
              Session <span className="text-lime">verified</span>
            </span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

/* ================= AWS: architecture diagram ================= */
function Node({
  icon: Icon,
  label,
  sub,
  color,
}: {
  icon: typeof Server;
  label: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl border bg-ink-900 sm:h-12 sm:w-12"
        style={{
          borderColor: `${color}66`,
          color,
          boxShadow: `0 0 24px ${color}33`,
        }}
      >
        <Icon size={18} />
      </div>
      <p className="text-[9px] font-semibold text-white sm:text-[10px]">
        {label}
      </p>
      <p className="font-mono text-[8px] text-white/45">{sub}</p>
    </div>
  );
}

function Packet({ delay }: { delay: number }) {
  return (
    <motion.span
      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_10px_#ffb86b]"
      animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.6, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function Wire() {
  return (
    <div className="relative h-px flex-1 bg-gradient-to-r from-white/10 via-white/25 to-white/10">
      <Packet delay={0} />
      <Packet delay={0.8} />
    </div>
  );
}

function AwsVisual() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 p-5 sm:p-8">
      <div className="flex w-full max-w-[540px] items-center gap-2">
        <Node icon={Users} label="Users" sub="HTTPS" color="#a1a1b5" />
        <Wire />
        <Node icon={Globe} label="DNS" sub="domain" color="#45e3ff" />
        <Wire />
        <div className="relative flex flex-[2.6] items-center gap-2 rounded-2xl border border-dashed border-amber/50 px-2 pb-3 pt-5 sm:px-3">
          <span className="absolute -top-2 left-3 bg-ink-850 px-1.5 font-mono text-[9px] text-amber">
            AWS VPC
          </span>
          <div className="relative flex flex-1 items-center justify-center rounded-xl bg-white/[0.03] px-1 py-2">
            <span className="absolute -top-1.5 left-2 font-mono text-[7px] text-white/40">
              public
            </span>
            <Node
              icon={ShieldCheck}
              label="Apache"
              sub="proxy · TLS"
              color="#c4ff61"
            />
          </div>
          <Wire />
          <div className="relative flex flex-[1.6] items-center justify-around gap-1 rounded-xl bg-white/[0.03] px-1 py-2">
            <span className="absolute -top-1.5 left-2 font-mono text-[7px] text-white/40">
              private
            </span>
            <Node icon={Server} label="EC2" sub="Tomcat" color="#ff9f43" />
            <Node icon={Database} label="RDS" sub="MySQL" color="#8b7bff" />
          </div>
        </div>
      </div>

      <div className="grid w-full max-w-[540px] grid-cols-3 gap-2 font-mono text-[9px]">
        {[
          { k: "SSL", v: "Let's Encrypt · Certbot" },
          { k: "Security groups", v: "least-privilege" },
          { k: "Scan", v: "Acunetix scanned" },
        ].map((s, i) => (
          <motion.div
            key={s.k}
            className="rounded-xl border border-white/10 bg-ink-900/90 p-2.5"
            animate={{
              borderColor: [
                "rgba(255,255,255,0.1)",
                "rgba(255,159,67,0.5)",
                "rgba(255,255,255,0.1)",
              ],
            }}
            transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
          >
            <p className="text-white/40">{s.k}</p>
            <p className="mt-0.5 text-white/85">{s.v}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================= Orenyx Influencer Connect: matching marketplace ================= */
const creators = [
  {
    handle: "@ayesha.eats",
    niche: ["Food", "Lifestyle"],
    dist: "1.2 km",
    score: 96,
    g: "from-rose to-amber",
  },
  {
    handle: "@urban.sips",
    niche: ["Coffee", "Reels"],
    dist: "0.8 km",
    score: 92,
    g: "from-violet to-rose",
  },
  {
    handle: "@city.bites",
    niche: ["Food", "Local"],
    dist: "2.1 km",
    score: 89,
    g: "from-cyan to-violet",
  },
];

function InfluencerVisual() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % creators.length), 2600);
    return () => clearInterval(id);
  }, []);
  const c = creators[i];

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:flex-row sm:gap-0 sm:p-8">
      {/* business */}
      <div
        data-frame
        className="w-full max-w-[200px] rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/15 text-amber">
            <Coffee size={16} />
          </div>
          <div className="min-w-0 text-[11px]">
            <p className="truncate font-semibold text-white">
              Bean &amp; Brew Café
            </p>
            <p className="text-white/45">Business</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1 text-[9px]">
          {["Coffee", "Food", "Local"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2 py-0.5 text-white/70"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1 text-[10px] text-white/50">
          <MapPin size={10} className="text-rose" /> Looking within 3 km
        </p>
      </div>

      {/* engine link */}
      <div className="relative hidden h-px w-24 bg-gradient-to-r from-amber/50 via-white/30 to-rose/50 sm:block lg:w-28">
        {[0, 0.9].map((d) => (
          <motion.span
            key={d}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_#fff]"
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{
              duration: 1.8,
              delay: d,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-rose/40 bg-ink-850 text-rose shadow-[0_0_24px_rgba(255,122,184,0.4)]">
          <Handshake size={15} />
        </span>
      </div>

      {/* creator match */}
      <div data-frame className="relative h-[150px] w-full max-w-[210px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={c.handle}
            className="absolute inset-0 rounded-2xl border border-white/10 bg-ink-900/95 p-4 shadow-2xl"
            initial={{ opacity: 0, x: 30, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -30, rotate: -4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className={`h-9 w-9 rounded-full bg-gradient-to-br ${c.g}`}
              />
              <div className="text-[11px]">
                <p className="font-semibold text-white">{c.handle}</p>
                <p className="text-white/45">Influencer · {c.dist}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-1 text-[9px]">
              {c.niche.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-rose/15 px-2 py-0.5 text-rose"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-white/50">Match</span>
              <span className="font-semibold text-lime">{c.score}%</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-rose to-lime"
                initial={{ width: "0%" }}
                animate={{ width: `${c.score}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <Float className="absolute left-6 top-5 hidden sm:block" delay={0.3}>
        <div className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[9px] text-white/80">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={10} className="text-rose" />
          </motion.span>
          Creator discovery · per city
        </div>
      </Float>
      <Float
        className="absolute bottom-5 right-3 hidden sm:right-6 sm:block"
        delay={1.1}
      >
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
          <CircleCheck size={13} className="text-lime" />
          <div>
            <p className="font-semibold text-white">Deal accepted</p>
            <p className="text-white/50">collaboration started</p>
          </div>
        </div>
      </Float>
    </div>
  );
}

/* ================= Voice agent ================= */
const convo = [
  { who: "agent", text: "Hi Mike, I've got a dry van load out of Dallas tomorrow. Interested?" },
  { who: "driver", text: "Maybe. Where's it headed?" },
  { who: "agent", text: "Atlanta, pickup at 8am. Want me to put you on it?" },
  { who: "driver", text: "Yeah, lock it in." },
] as const;

const voiceStages = [
  { label: "STT", icon: Mic },
  { label: "LLM", icon: Bot },
  { label: "TTS", icon: AudioWaveform },
];

function VoiceVisual() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s + 1) % (convo.length + 1)),
      1700,
    );
    return () => clearInterval(id);
  }, []);
  const shown = convo.slice(Math.max(0, step - 3), step);
  const speaking = step > 0 ? convo[step - 1].who : "driver";

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 p-5 sm:flex-row sm:gap-8 sm:p-8">
      {/* orb */}
      <div className="relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-44 sm:w-44">
        {[0, 1, 2].map((r) => (
          <motion.span
            key={r}
            className="absolute inset-0 rounded-full border border-cyan/30"
            animate={{ scale: [0.6, 1.15], opacity: [0.7, 0] }}
            transition={{
              duration: 2.4,
              delay: r * 0.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#9ff3ff,#45e3ff_35%,#8b7bff_75%)] shadow-[0_0_60px_rgba(69,227,255,0.55)] sm:h-28 sm:w-28"
          animate={{
            scale:
              speaking === "agent" ? [1, 1.08, 0.98, 1.05, 1] : [1, 1.02, 1],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="flex h-7 items-center gap-[3px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-white"
                animate={{ height: [6, 10 + ((i * 5) % 16), 6] }}
                transition={{
                  duration: 0.7 + (i % 3) * 0.15,
                  delay: i * 0.06,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* transcript */}
      <div className="w-full max-w-[260px]">
        <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose" />{" "}
            Outbound call
          </span>
          <span className="flex items-center gap-1 text-cyan">
            <Zap size={10} /> ≤300 ms
          </span>
        </div>
        <div className="flex h-[132px] flex-col justify-end gap-1.5 overflow-hidden">
          <AnimatePresence initial={false}>
            {shown.map((m) => (
              <motion.div
                key={m.text}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className={`max-w-[88%] rounded-2xl px-3 py-1.5 text-[10.5px] leading-snug ${
                  m.who === "agent"
                    ? "self-end rounded-br-sm bg-gradient-to-r from-cyan/90 to-violet/90 text-ink-950"
                    : "self-start rounded-bl-sm border border-white/10 bg-ink-900/95 text-white/85"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          {voiceStages.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-1.5">
              <motion.div
                className="flex flex-1 items-center justify-center gap-1 rounded-lg border bg-ink-900/90 py-1.5 font-mono text-[9px]"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.1)",
                    "rgba(69,227,255,0.7)",
                    "rgba(255,255,255,0.1)",
                  ],
                  color: [
                    "rgba(255,255,255,0.6)",
                    "#45e3ff",
                    "rgba(255,255,255,0.6)",
                  ],
                }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 0.8,
                }}
              >
                <s.icon size={10} /> {s.label}
              </motion.div>
              {i < voiceStages.length - 1 && (
                <span className="text-[9px] text-white/30">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= GIXIAI website ================= */
function GixiVisual() {
  const services = [
    { icon: Workflow, label: "Workflow Automation" },
    { icon: Code, label: "Web Development" },
    { icon: Plug, label: "API Integration" },
  ];
  const flow = ["Lead", "AI", "CRM", "Email"];
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:p-8">
      <BrowserFrame url="gixiai.com" className="w-full max-w-[520px]">
        <div className="relative overflow-hidden p-4">
          <div
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/15 blur-3xl"
          />
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display text-[12px] font-bold tracking-tight text-white">
              GIXI<span className="text-lime">AI</span>
            </span>
            <div className="hidden gap-3 text-[8px] text-white/50 sm:flex">
              <span>Services</span>
              <span>Portfolio</span>
              <span>FAQ</span>
            </div>
            <span className="rounded-full bg-lime px-2 py-0.5 text-[8px] font-semibold text-ink-950">
              Book a call
            </span>
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-lime/80">
            AI Automation Agency
          </p>
          <p className="mt-1 max-w-[260px] font-display text-[17px] font-semibold leading-tight text-white">
            Automate the busywork. Scale what matters.
          </p>

          {/* workflow */}
          <div className="relative mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-white/10" />
            <motion.span
              className="absolute top-1/2 h-1 w-6 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-lime to-transparent"
              animate={{ left: ["6%", "88%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
            {flow.map((f, i) => (
              <motion.span
                key={f}
                className="relative z-10 rounded-md border border-white/10 bg-ink-850 px-2 py-1 font-mono text-[8px] text-white/80"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.1)",
                    "rgba(196,255,97,0.7)",
                    "rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.55,
                  repeat: Infinity,
                }}
              >
                {f}
              </motion.span>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {services.map((s, i) => (
              <motion.div
                key={s.label}
                className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <s.icon size={12} className="text-lime" />
                <p className="mt-1.5 text-[8px] leading-tight text-white/80">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </BrowserFrame>

      <ChipRow>
        <Float amp={3} delay={0.2}>
          <div className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-[10px] text-white/80">
            <CalendarCheck size={12} className="text-lime" /> Call booked
          </div>
        </Float>
        <Float amp={3} delay={0.8}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <span className="flex gap-0.5 text-amber">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={9} className="fill-amber" />
              ))}
            </span>
            <span className="text-white/70">Client testimonials</span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

/** Cycles 0..n-1 on an interval; drives the step-by-step mockups below. */
function useStep(n: number, ms: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % n), ms);
    return () => clearInterval(id);
  }, [n, ms]);
  return step;
}

/* ================= Orenyx NIL Engine: deals platform ================= */
const nilStages = ["Offer", "Review", "Compliance", "Signed"];
const nilAudit = [
  "Offer sent by brand",
  "Agent approved terms",
  "Compliance check passed",
  "Deal signed by athlete",
];
const outbox = [
  { label: "queued", color: "text-white/60" },
  { label: "retrying", color: "text-amber" },
  { label: "delivered", color: "text-lime" },
];

function NilVisual() {
  const step = useStep(nilStages.length + 1, 1500);
  const stage = Math.min(step, nilStages.length - 1);
  const box = outbox[Math.min(step, 2)];
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:p-8">
      <BrowserFrame url="portal.orenyxnilengine.com/deals" className="w-full max-w-[520px]">
        <div className="relative overflow-hidden p-4">
          <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#ffd166]/15 blur-3xl" />
          <div className="flex items-center justify-between">
            <span className="font-display text-[12px] font-bold text-white">
              NIL <span className="text-[#ffd166]">Engine</span>
            </span>
            <div className="flex gap-1 text-[8px]">
              {["Athlete", "Agent", "Brand"].map((r, i) => (
                <span
                  key={r}
                  className={`rounded-full border px-2 py-0.5 transition-colors duration-300 ${
                    i === step % 3 ? "border-[#ffd166]/60 bg-[#ffd166]/15 text-[#ffd166]" : "border-white/10 text-white/50"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
            <div className="flex -space-x-2">
              <span className="h-7 w-7 rounded-full border-2 border-ink-900 bg-gradient-to-br from-[#ffd166] to-rose" />
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink-900 bg-ink-800 text-white/70">
                <Handshake size={12} />
              </span>
            </div>
            <div className="min-w-0 flex-1 text-[10px]">
              <p className="truncate font-semibold text-white">Athlete × Brand partnership</p>
              <p className="text-white/45">Represented by agent · ID verified</p>
            </div>
            <BadgeCheck size={14} className="shrink-0 text-lime" />
          </div>

          {/* deal workflow */}
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {nilStages.map((s, i) => (
              <div key={s} className="text-center">
                <div className="h-1 overflow-hidden rounded bg-white/10">
                  <motion.div
                    className="h-full bg-[#ffd166]"
                    initial={false}
                    animate={{ width: i <= stage ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className={`mt-1 font-mono text-[8px] ${i <= stage ? "text-white/85" : "text-white/35"}`}>{s}</p>
              </div>
            ))}
          </div>

          {/* compliance audit trail */}
          <div className="mt-3 space-y-1 rounded-lg border border-white/[0.07] bg-ink-950/50 p-2 font-mono text-[8.5px]">
            {nilAudit.map((a, i) => (
              <motion.p
                key={a}
                className="flex items-center gap-1.5"
                initial={false}
                animate={{ opacity: i <= stage ? 1 : 0.25 }}
              >
                <FileText size={9} className="text-[#ffd166]" />
                <span className="text-white/75">{a}</span>
              </motion.p>
            ))}
          </div>
        </div>
      </BrowserFrame>

      <ChipRow>
        <Float amp={3} delay={0.3}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <Repeat2 size={13} className="text-[#ffd166]" />
            <span className="text-white/70">Retry outbox</span>
            <span className={`font-mono font-semibold ${box.color}`}>{box.label}</span>
          </div>
        </Float>
        <Float amp={3} delay={1}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <ShieldCheck size={13} className="text-lime" />
            <span className="font-semibold text-white">Audit trail</span>
            <span className="text-white/50">every step logged</span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

/* ================= Orenyx Engine: security & compliance ================= */
const rlsTables = ["tenants", "leads", "contacts", "api_keys", "audit_log"];
const keySuffixes = ["9f3a", "c71e", "4b08"];

function EngineVisual() {
  const step = useStep(rlsTables.length + 2, 900);
  const keyStep = useStep(keySuffixes.length, 2600);
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:p-8">
      <BrowserFrame url="portal.orenyxengine.com/security" className="w-full max-w-[520px]">
        <div className="grid grid-cols-[1.1fr_1fr] gap-3 p-4">
          <div>
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
              <Database size={10} className="text-[#5eead4]" /> Row-level security
            </p>
            <div className="space-y-1">
              {rlsTables.map((t, i) => (
                <div
                  key={t}
                  className="flex items-center justify-between rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 font-mono text-[9px]"
                >
                  <span className="text-white/75">{t}</span>
                  <motion.span
                    className="flex items-center gap-1"
                    initial={false}
                    animate={{ opacity: i < step ? 1 : 0.3, color: i < step ? "#5eead4" : "#ffffff" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Lock size={8} /> {i < step ? "enabled" : "checking"}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2">
              <div className="flex items-center justify-between text-[9px]">
                <span className="text-white/80">Sandbox for test keys</span>
                <span className="flex h-3.5 w-6 items-center justify-end rounded-full bg-[#5eead4] p-0.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-950" />
                </span>
              </div>
              <p className="mt-1 font-mono text-[8px] text-white/40">strict · isolated data</p>
            </div>

            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2">
              <p className="text-[9px] text-white/80">Per-tenant key rotation</p>
              <div className="mt-1 flex items-center justify-between font-mono text-[9px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keyStep}
                    className="text-white/70"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                  >
                    sk_live_••••{keySuffixes[keyStep]}
                  </motion.span>
                </AnimatePresence>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
                  className="text-[#5eead4]"
                >
                  <Repeat2 size={10} />
                </motion.span>
              </div>
            </div>

            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2">
              <p className="flex items-center justify-between text-[9px] text-white/80">
                Audit export <span className="font-mono text-[8px] text-white/40">streaming</span>
              </p>
              <div className="mt-1.5 h-1 overflow-hidden rounded bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#5eead4] to-cyan"
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      <ChipRow>
        <Float amp={3} delay={0.4}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <ShieldCheck size={13} className="text-[#5eead4]" />
            <span className="font-semibold text-white">RLS on every table</span>
          </div>
        </Float>
        <Float amp={3} delay={1.1}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <Sparkles size={13} className="text-violet" />
            <span className="text-white/70">Engagement → Claude lead scoring</span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

/* ================= Field service platform: call to scheduled job ================= */
const fsSlots = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function FieldServiceVisual() {
  const step = useStep(4, 1600);
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-5 sm:p-8">
      <div className="flex w-full max-w-[520px] items-center gap-3">
        {/* call */}
        <div data-frame className="w-[44%] shrink-0 rounded-2xl border border-white/10 bg-ink-900/95 p-3.5 shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#60a5fa]/15 text-[#60a5fa]">
              {step === 0 && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#60a5fa]/60"
                  animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <Mic size={13} />
            </span>
            <div className="text-[10px]">
              <p className="font-semibold text-white">Customer call</p>
              <p className="text-white/45">{step === 0 ? "ringing" : "AI answering"}</p>
            </div>
          </div>
          <div className="mt-3 min-h-[40px] rounded-lg bg-white/[0.04] p-2 text-[9px] leading-snug text-white/75">
            {step >= 1 ? "“My water heater is leaking. Can someone come Tuesday morning?”" : <Waveform />}
          </div>
        </div>

        {/* handoff */}
        <div className="relative h-px flex-1 bg-gradient-to-r from-[#60a5fa]/50 to-white/20">
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#60a5fa] shadow-[0_0_10px_#60a5fa]"
            animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* job */}
        <div data-frame className="w-[44%] shrink-0 rounded-2xl border border-white/10 bg-ink-900/95 p-3.5 shadow-2xl">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold text-white">
            <CalendarCheck size={12} className="text-[#60a5fa]" /> New job
          </p>
          <motion.div initial={false} animate={{ opacity: step >= 2 ? 1 : 0.3 }} className="mt-2 text-[9px]">
            <p className="text-white/85">Water heater repair</p>
            <p className="text-white/45">Tue · 10:00 to 12:00</p>
          </motion.div>
          <div className="mt-2.5 grid grid-cols-5 gap-1">
            {fsSlots.map((d) => (
              <div key={d} className="text-center">
                <p className="font-mono text-[7px] text-white/40">{d}</p>
                <motion.div
                  className="mt-0.5 h-4 rounded"
                  initial={false}
                  animate={{
                    backgroundColor:
                      d === "Tue" && step >= 3 ? "rgba(96,165,250,0.85)" : "rgba(255,255,255,0.06)",
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ChipRow>
        <Float amp={3} delay={0.2}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <Bot size={13} className="text-[#60a5fa]" />
            <span className="text-white/75">AI scheduling bot · Google Calendar</span>
          </div>
        </Float>
        <Float amp={3} delay={0.9}>
          <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-[10px]">
            <CircleCheck size={13} className="text-lime" />
            <span className="font-semibold text-white">Voice call → job</span>
          </div>
        </Float>
      </ChipRow>
    </div>
  );
}

const map: Record<ProjectVisual, () => React.JSX.Element> = {
  influencer: InfluencerVisual,
  nil: NilVisual,
  orenyxEngine: EngineVisual,
  fieldService: FieldServiceVisual,
  voice: VoiceVisual,
  gixiai: GixiVisual,
  tazmim: TazmimVisual,
  animal: AnimalVisual,
  memecoin: MemecoinVisual,
  zenbug: ZenBugVisual,
  shoplify: ShoplifyVisual,
  aws: AwsVisual,
};

export function ProjectVisualFor({ id }: { id: ProjectVisual }) {
  const V = map[id];
  return <V />;
}
