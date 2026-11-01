"use client";

import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"a"> & {
  variant?: "primary" | "ghost";
  icon?: ReactNode;
};

export function Button({ variant = "primary", icon, className, children, ...rest }: Props) {
  return (
    <Magnetic>
      <a
        {...rest}
        className={cn(
          "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300",
          variant === "primary"
            ? "bg-white text-ink-950"
            : "border border-white/15 bg-white/[0.03] text-white backdrop-blur-md hover:border-white/30",
          className,
        )}
      >
        {/* liquid fill on hover */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0",
            variant === "primary"
              ? "bg-gradient-to-r from-violet to-cyan"
              : "bg-white/10",
          )}
        />
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          {icon && (
            <span className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              {icon}
            </span>
          )}
        </span>
      </a>
    </Magnetic>
  );
}
