"use client";

import { Award, GraduationCap } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { certifications, education } from "@/data/resume";

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        index="06"
        eyebrow="Education & certifications"
        title="Grounded in computer science. Always learning."
        highlight={["computer", "science.", "learning."]}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.1}>
              <SpotlightCard color="139, 123, 255">
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet/15 text-violet">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight text-white">{e.degree}</h3>
                      <p className="mt-1 text-sm text-mist">{e.school}</p>
                    </div>
                  </div>
                  {e.courses.length > 0 && (
                    <>
                      <p className="mb-3 mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                        Relevant coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {e.courses.map((c) => (
                          <span key={c} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75">
                            {c}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <SpotlightCard color="69, 227, 255" className="h-full">
                <div className="flex h-full flex-col p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <Award size={18} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-white">
                    {c.title}
                  </h3>
                  <p className="mt-auto pt-4 text-xs text-mist">{c.issuer}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
