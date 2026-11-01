"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Brain, Database, Lock, Send, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ---------- Backend: live API log terminal ---------- */
const logs = [
  { m: "POST", p: "/api/v1/designs/generate", s: 201, t: "184ms" },
  { m: "GET", p: "/api/v1/campaigns", s: 200, t: "3ms", tag: "cache:HIT" },
  { m: "POST", p: "/api/v1/auth/google", s: 200, t: "92ms" },
  { m: "PATCH", p: "/api/v1/bugs/8f2c/status", s: 204, t: "21ms" },
  { m: "POST", p: "/api/v1/webhooks/stripe", s: 200, t: "38ms" },
  { m: "GET", p: "/api/v1/rescues?near=33.6,73.1", s: 200, t: "46ms" },
  { m: "POST", p: "/api/v1/infer/breed", s: 200, t: "212ms" },
  { m: "GET", p: "/api/v1/products?page=2", s: 200, t: "12ms", tag: "idx" },
];

const methodColor: Record<string, string> = {
  GET: "text-cyan",
  POST: "text-lime",
  PATCH: "text-amber",
};

export function TerminalVisual() {
  const [lines, setLines] = useState(() => logs.slice(0, 4).map((l, i) => ({ ...l, id: i })));
  useEffect(() => {
    let n = 4;
    const id = setInterval(() => {
      const next = n++;
      setLines((prev) => [...prev.slice(-4), { ...logs[next % logs.length], id: next }]);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50 font-mono text-[11px] sm:text-xs">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-white/40">api-server: node</span>
        <span className="ml-auto flex items-center gap-1.5 text-lime/80">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" /> healthy
        </span>
      </div>
      <div className="flex h-[150px] flex-col justify-end gap-1.5 overflow-hidden p-4">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.div
              key={l.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <span className={`w-11 ${methodColor[l.m]}`}>{l.m}</span>
              <span className="min-w-0 truncate text-white/75">{l.p}</span>
              <span className="ml-auto text-lime">{l.s}</span>
              {l.tag && <span className="rounded bg-violet/20 px-1.5 text-violet">{l.tag}</span>}
              <span className="w-12 text-right text-white/40">{l.t}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- AI/ML: synchronized forward pass ---------- */
// Each layer "processes" (spinner), then data flows along every edge at once to the
// next layer, converging on a single output node, then the cycle restarts.
const layers = [3, 5, 5, 1];
const layerNames = ["input", "hidden", "hidden", "output"];
const STEPS = layers.length * 2; // process + transmit per layer, last slot = result
const PROCESS_MS = 900;
const TRANSMIT_MS = 750;
const RESULT_MS = 1800;

type Phase = { layer: number; kind: "process" | "transmit" | "result" };

function phaseOf(step: number): Phase {
  const layer = Math.floor(step / 2);
  if (step === STEPS - 1) return { layer, kind: "result" };
  return { layer, kind: step % 2 === 0 ? "process" : "transmit" };
}

const statusText = (p: Phase) => {
  if (p.kind === "result") return "✓ breed: golden_retriever · 0.94";
  if (p.kind === "transmit") return "forward pass →";
  return [
    "input · encoding image + audio",
    "hidden layer 1 · processing",
    "hidden layer 2 · processing",
    "output · computing",
  ][p.layer];
};

export function NeuralVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [{ step, cycle }, setTick] = useState({ step: 0, cycle: 0 });
  const phase = phaseOf(step);

  useEffect(() => {
    if (!inView) return;
    const ms = phase.kind === "process" ? PROCESS_MS : phase.kind === "transmit" ? TRANSMIT_MS : RESULT_MS;
    const id = setTimeout(
      () =>
        setTick((t) =>
          t.step + 1 >= STEPS ? { step: 0, cycle: t.cycle + 1 } : { step: t.step + 1, cycle: t.cycle },
        ),
      ms,
    );
    return () => clearTimeout(id);
  }, [step, inView, phase.kind]);

  const W = 260;
  const H = 156;
  const nodes = layers.map((count, li) =>
    Array.from({ length: count }, (_, ni) => ({
      x: 22 + (li * (W - 44)) / (layers.length - 1),
      y: 72 + (ni - (count - 1) / 2) * 28,
    })),
  );
  const edges = nodes.flatMap((layer, li) =>
    li === nodes.length - 1
      ? []
      : layer.flatMap((a, ai) => nodes[li + 1].map((b, bi) => ({ a, b, from: li, k: `${li}-${ai}-${bi}` }))),
  );

  const last = layers.length - 1;
  const nodeState = (li: number) => {
    if (phase.kind === "process" && phase.layer === li) return "processing";
    if (li < phase.layer || (li === phase.layer && phase.kind !== "process")) return "done";
    return "idle";
  };

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {edges.map((e) => {
          const active = phase.kind === "transmit" && phase.layer === e.from;
          return (
            <line
              key={e.k}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              stroke={active ? "rgba(69,227,255,0.35)" : "rgba(255,255,255,0.07)"}
              strokeWidth={0.8}
              style={{ transition: "stroke 0.3s" }}
            />
          );
        })}

        {/* packets: every edge of the transmitting layer fires at the same instant */}
        {phase.kind === "transmit" &&
          edges
            .filter((e) => e.from === phase.layer)
            .map((e) => (
              <motion.circle
                key={`${cycle}-${step}-${e.k}`}
                r={1.9}
                fill="#45e3ff"
                initial={{ cx: e.a.x, cy: e.a.y, opacity: 0 }}
                animate={{ cx: e.b.x, cy: e.b.y, opacity: [0, 1, 1, 0] }}
                transition={{ duration: TRANSMIT_MS / 1000, ease: "easeInOut" }}
              />
            ))}

        {nodes.map((layer, li) =>
          layer.map((n, ni) => {
            const state = nodeState(li);
            const isOut = li === last;
            const r = isOut ? 7 : 5;
            return (
              <g key={`${li}-${ni}`}>
                {isOut && phase.kind === "result" && (
                  <motion.circle
                    key={`pulse-${cycle}`}
                    cx={n.x}
                    cy={n.y}
                    fill="none"
                    stroke="#c4ff61"
                    strokeWidth={1}
                    initial={{ r, opacity: 0.9 }}
                    animate={{ r: r + 14, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={
                    state === "done" ? (isOut ? "rgba(196,255,97,0.25)" : "rgba(69,227,255,0.18)") : "#0b0b14"
                  }
                  stroke={state === "idle" ? "#8b7bff" : isOut && state === "done" ? "#c4ff61" : "#45e3ff"}
                  strokeOpacity={state === "idle" ? 0.6 : 1}
                  strokeWidth={1.4}
                  style={{ transition: "fill 0.3s, stroke 0.3s" }}
                />
                {state === "processing" && (
                  // Native SVG rotation pivots exactly on the node centre.
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={r + 4}
                    fill="none"
                    stroke="#45e3ff"
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    strokeDasharray={`${(r + 4) * 1.6} ${(r + 4) * 4.7}`}
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${n.x} ${n.y}`}
                      to={`360 ${n.x} ${n.y}`}
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          }),
        )}

        {layerNames.map((name, li) => (
          <text
            key={li}
            x={nodes[li][0].x}
            y={H - 2}
            textAnchor="middle"
            fontSize={7}
            fontFamily="var(--font-jetbrains), monospace"
            fill={
              phase.layer === li && phase.kind !== "transmit" ? "rgba(69,227,255,0.9)" : "rgba(255,255,255,0.3)"
            }
            style={{ transition: "fill 0.3s" }}
          >
            {name}
          </text>
        ))}
      </svg>

      <div className="mt-2 flex items-center gap-3 font-mono text-[10px]">
        <div className="relative h-5 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`${phase.kind}-${phase.layer}`}
              className={`absolute inset-y-0 left-0 flex items-center whitespace-nowrap ${
                phase.kind === "result" ? "text-lime" : "text-cyan"
              }`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {statusText(phase)}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="h-1 w-16 shrink-0 overflow-hidden rounded bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan to-lime transition-[width] duration-300"
            style={{ width: `${((step + 1) / STEPS) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Cloud: nested VPC stack ---------- */
export function CloudVisual() {
  return (
    <div className="relative rounded-2xl border border-dashed border-amber/40 p-3 font-mono text-[10px]">
      <span className="absolute -top-2 left-3 bg-ink-850 px-1.5 text-amber">VPC 10.0.0.0/16</span>
      <div className="grid grid-cols-2 gap-2 pt-1">
        {[
          { name: "public-subnet", items: ["Apache · TLS", "Reverse proxy"] },
          { name: "private-subnet", items: ["EC2 · Tomcat", "RDS · MySQL"] },
        ].map((s, si) => (
          <div key={s.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
            <p className="mb-1.5 text-white/40">{s.name}</p>
            {s.items.map((it, ii) => (
              <div key={it} className="mb-1 flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-white/80 last:mb-0">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-lime"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: si * 0.4 + ii * 0.3 }}
                />
                {it}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Security: JWT decode ---------- */
export function SecurityVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <motion.div
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/10 text-lime"
          animate={{ boxShadow: ["0 0 0 0 rgba(196,255,97,0.35)", "0 0 0 12px rgba(196,255,97,0)"] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <Lock size={18} />
        </motion.div>
        <div className="font-mono text-[10px] leading-relaxed">
          <p className="text-white/40">Authorization: Bearer</p>
          <p className="break-all">
            <span className="text-rose">eyJhbGciOiJIUzI1NiJ9</span>
            <span className="text-white/40">.</span>
            <span className="text-violet">eyJyb2xlIjoiYWRtaW4ifQ</span>
            <span className="text-white/40">.</span>
            <span className="text-cyan">4f9Tq…</span>
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 text-[10px]">
        {["OAuth 2.0", "JWT", "RBAC", "SSL/TLS", "Sessions"].map((t) => (
          <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-white/70">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Payments / SaaS ---------- */
export function PaymentsVisual() {
  return (
    <div className="relative h-[120px]">
      <motion.div
        className="absolute left-0 top-2 h-[100px] w-[170px] rounded-xl bg-gradient-to-br from-violet via-[#6d5dfc] to-cyan p-3 shadow-xl"
        animate={{ rotate: [-6, -3, -6], y: [0, -4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-5 w-7 rounded bg-white/40" />
        <p className="mt-5 font-mono text-[10px] tracking-widest text-white/90">•••• 4242</p>
        <p className="font-mono text-[9px] text-white/70">stripe · subscription</p>
      </motion.div>
      <motion.div
        className="absolute right-0 top-6 w-[130px] rounded-xl border border-white/10 bg-ink-800/90 p-3 text-[10px] backdrop-blur"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-white/50">Pro plan</p>
        <p className="font-display text-lg font-semibold text-white">Active</p>
        <div className="mt-1.5 h-1 overflow-hidden rounded bg-white/10">
          <motion.div
            className="h-full bg-lime"
            animate={{ width: ["10%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Automation pipeline ---------- */
const stages = [
  { icon: Sparkles, label: "Prompt", color: "#8b7bff" },
  { icon: Brain, label: "OpenAI", color: "#45e3ff" },
  { icon: Database, label: "Redis", color: "#ff7ab8" },
  { icon: Zap, label: "Scheduler", color: "#ffb86b" },
  { icon: Send, label: "X API", color: "#c4ff61" },
];

export function PipelineVisual() {
  return (
    <div className="relative flex items-center justify-between gap-2 py-4">
      <div className="absolute inset-x-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-violet/40 via-cyan/40 to-lime/40" />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 h-1.5 w-8 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ left: "4%" }}
          animate={{ left: ["4%", "92%"] }}
          transition={{ duration: 3, repeat: Infinity, delay: i, ease: "linear" }}
        />
      ))}
      {stages.map((s, i) => (
        <div key={s.label} className="relative z-10 flex flex-col items-center gap-2">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-ink-850 sm:h-14 sm:w-14"
            style={{ borderColor: `${s.color}55`, color: s.color }}
            animate={{ boxShadow: [`0 0 0px ${s.color}00`, `0 0 24px ${s.color}66`, `0 0 0px ${s.color}00`] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
          >
            <s.icon size={18} />
          </motion.div>
          <span className="font-mono text-[10px] text-white/60">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
