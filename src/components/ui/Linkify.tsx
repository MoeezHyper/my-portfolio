import { Fragment } from "react";
import { companyLinks } from "@/data/resume";
import { cn } from "@/lib/utils";

const names = Object.keys(companyLinks).sort((a, b) => b.length - a.length);
const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

/** Renders text with company names (GIXIAI, FIDSOR, …) turned into outbound links. */
export function Linkify({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {text.split(pattern).map((part, i) =>
        companyLinks[part] ? (
          <a
            key={i}
            href={companyLinks[part]}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "underline decoration-current/30 underline-offset-4 transition-colors hover:text-white hover:decoration-current",
              className,
            )}
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
