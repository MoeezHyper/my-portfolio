import { Marquee } from "@/components/ui/Marquee";

const rowA = ["Next.js", "Node.js", "NestJS", "PostgreSQL", "Stripe", "Claude API", "BullMQ", "TypeScript"];
const rowB = ["Voice Agent", "Prisma", "Playwright", "Redis", "Supabase", "YOLO", "Docker", "Turborepo"];

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={t} className="flex items-center">
          <span
            className={`px-6 font-display text-5xl font-semibold tracking-tight sm:px-10 sm:text-7xl lg:text-8xl ${
              (i + (outline ? 1 : 0)) % 2 ? "text-outline" : "text-white/90"
            }`}
          >
            {t}
          </span>
          <span className="text-2xl text-violet sm:text-4xl">✦</span>
        </span>
      ))}
    </>
  );
}

export function TechBand() {
  return (
    <div aria-hidden className="relative overflow-hidden py-14 sm:py-20">
      <div className="-mx-[5%] w-[110%] -rotate-2 border-y border-white/[0.06] bg-ink-900/60 py-6 backdrop-blur mask-fade-x">
        <Marquee duration={45}>
          <Row items={rowA} />
        </Marquee>
        <Marquee duration={50} reverse className="mt-2">
          <Row items={rowB} outline />
        </Marquee>
      </div>
    </div>
  );
}
