"use client";

import { beliefs } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

const categories = [
  {
    label: "On AI",
    color: "#3fb950",
    headline: 3, // "AI didn't make me a developer. It made me a faster thinker."
    supporting: [0, 1, 2, 4, 5],
  },
  {
    label: "On shipping",
    color: "#58a6ff",
    headline: 8, // "A working demo says more than a fifty-slide deck."
    supporting: [6, 7, 9, 10, 11],
  },
  {
    label: "On learning",
    color: "#e3b341",
    headline: 15, // "Grit > talent. Every time."
    supporting: [12, 13, 14, 16, 17],
  },
  {
    label: "On business",
    color: "#f85149",
    headline: 18, // '"This website doesn\'t matter if you have no revenue from it."'
    supporting: [19, 20, 21, 22, 23],
  },
  {
    label: "On communication",
    color: "#bc8cff",
    headline: 25, // "Communication is the job. The code is just the output."
    supporting: [24, 26, 27],
  },
  {
    label: "On being you",
    color: "#79c0ff",
    headline: 28, // "Your constraints are your advantage. Pressure creates shape."
    supporting: [29, 30, 31, 32, 33],
  },
];

export function Beliefs() {
  return (
    <MotionSection id="beliefs" className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Principles
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-2">
        Things I Believe
      </h2>
      <p className="text-[#8b949e] text-sm font-mono mb-20">
        Opinions I&apos;ve earned. Some from wins. Most from mistakes.
      </p>

      <div className="space-y-24">
        {categories.map((cat) => {
          const headlineBelief = beliefs[cat.headline];
          if (!headlineBelief) return null;
          return (
            <div key={cat.label}>
              {/* Headline belief — display scale */}
              <p
                className={`text-3xl md:text-[2.75rem] font-mono font-bold text-[#e6edf3] leading-tight mb-8${
                  headlineBelief.italic ? " italic" : ""
                }`}
              >
                {headlineBelief.text}
              </p>

              {/* Category separator */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-mono text-[10px] tracking-[0.35em] uppercase shrink-0"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: `${cat.color}25` }}
                />
              </div>

              {/* Supporting beliefs */}
              <div className="space-y-3">
                {cat.supporting.map((idx) => {
                  const belief = beliefs[idx];
                  if (!belief) return null;
                  return (
                    <p
                      key={idx}
                      className={`text-sm font-mono leading-relaxed${
                        belief.italic
                          ? " italic text-[#c9d1d9]"
                          : " text-[#8b949e]"
                      }`}
                    >
                      {belief.text}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MotionSection>
  );
}
