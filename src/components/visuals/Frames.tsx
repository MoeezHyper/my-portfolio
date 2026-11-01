import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-frame
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-900/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.02] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <div className="mx-auto flex w-1/2 min-w-0 items-center justify-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-0.5 font-mono text-[9px] text-white/45">
          <span className="text-lime/70">●</span>
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-frame
      className={cn(
        "relative overflow-hidden rounded-[28px] border-[5px] border-ink-700 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1.5 z-20 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
      {children}
    </div>
  );
}
