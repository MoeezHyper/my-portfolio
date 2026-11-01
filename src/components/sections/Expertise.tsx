"use client";

import { Brain, Cloud, CreditCard, Server, ShieldCheck, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import {
  CloudVisual,
  NeuralVisual,
  PaymentsVisual,
  PipelineVisual,
  SecurityVisual,
  TerminalVisual,
} from "@/components/visuals/ExpertiseVisuals";
import { cn } from "@/lib/utils";

type Tile = {
  icon: typeof Server;
  title: string;
  body: string;
  visual: ReactNode;
  span?: "wide" | "full";
  color: string;
};

const tiles: Tile[] = [
  {
    icon: Server,
    title: "Backend-first engineering",
    body: "PostgreSQL schemas designed from scratch, multi-tenant row-level security, Prisma migrations and REST APIs in NestJS and Express. The foundation every product I ship stands on.",
    visual: <TerminalVisual />,
    span: "wide",
    color: "196, 255, 97",
  },
  {
    icon: Brain,
    title: "AI & ML pipelines",
    body: "Claude, OpenAI and Gemini integrations, a real-time voice agent, plus custom YOLO, Keras and YAMNet models served through Flask inference APIs.",
    visual: <NeuralVisual />,
    color: "69, 227, 255",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    body: "Hetzner and AWS Linux servers, Nginx and Apache reverse proxies, PM2, DNS and TLS, plus EC2, RDS and VPC networking.",
    visual: <CloudVisual />,
    color: "255, 159, 67",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    body: "Row-level security on every table, per-tenant key rotation, audit trails, Google OAuth, JWT and role-based access.",
    visual: <SecurityVisual />,
    color: "196, 255, 97",
  },
  {
    icon: CreditCard,
    title: "SaaS & payments",
    body: "Stripe subscriptions with signed webhooks, Stripe Connect onboarding and payouts, and credits ledgers, verified with test clocks.",
    visual: <PaymentsVisual />,
    color: "139, 123, 255",
  },
  {
    icon: Workflow,
    title: "Automation & real-time systems",
    body: "Queue-driven jobs on Redis and BullMQ, scheduled Playwright discovery bots, retry outboxes so no message is lost, and AI content engines that publish on their own.",
    visual: <PipelineVisual />,
    span: "full",
    color: "255, 122, 184",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="02"
        eyebrow="What I bring"
        title="Strengths that take ideas all the way to production."
        highlight={["production."]}
        description="I'm comfortable at every layer, but I'm strongest where the hard problems live: architecture, data, AI integration and secure deployment."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t, i) => (
          <Reveal
            key={t.title}
            delay={(i % 3) * 0.08}
            className={cn(
              "h-full",
              t.span === "wide" && "sm:col-span-2",
              t.span === "full" && "sm:col-span-2 lg:col-span-3",
            )}
          >
            <SpotlightCard color={t.color} className="h-full">
              <div className={cn("flex h-full flex-col gap-6 p-6 sm:p-7", t.span === "full" && "lg:grid lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-10")}>
                <div>
                  <div
                    className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
                    style={{ color: `rgb(${t.color})` }}
                  >
                    <t.icon size={20} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white">{t.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{t.body}</p>
                </div>
                <div className="mt-auto">{t.visual}</div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
