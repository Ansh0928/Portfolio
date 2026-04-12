"use client";

import { beliefs } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

const categories = [
  {
    label: "On AI",
    color: "#3fb950",
    beliefs: [0, 1, 2, 3, 4, 5],
  },
  {
    label: "On shipping",
    color: "#58a6ff",
    beliefs: [6, 7, 8, 9, 10, 11],
  },
  {
    label: "On learning",
    color: "#e3b341",
    beliefs: [12, 13, 14, 15, 16, 17],
  },
  {
    label: "On business",
    color: "#f85149",
    beliefs: [18, 19, 20, 21, 22, 23],
  },
  {
    label: "On communication",
    color: "#bc8cff",
    beliefs: [24, 25, 26, 27],
  },
  {
    label: "On being you",
    color: "#79c0ff",
    beliefs: [28, 29, 30, 31, 32, 33],
  },
];

export function Beliefs() {
  return (
    <MotionSection id="beliefs" className="max-w-5xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Principles
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-2">
        Things I Believe
      </h2>
      <p className="text-[#8b949e] text-sm font-mono mb-12">
        Opinions I&apos;ve earned. Some from wins. Most from mistakes.
      </p>

      <div className="space-y-10">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: cat.color }}
              />
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: cat.color }}
              >
                {cat.label}
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-5">
              {cat.beliefs.map((idx) => {
                const belief = beliefs[idx];
                if (!belief) return null;
                return (
                  <p
                    key={idx}
                    className={`text-sm leading-relaxed border-l-2 pl-3 py-0.5${
                      belief.italic
                        ? " italic text-[#c9d1d9]"
                        : " text-[#8b949e]"
                    }`}
                    style={{ borderColor: `${cat.color}40` }}
                  >
                    {belief.text}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
