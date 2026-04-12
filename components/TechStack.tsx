"use client";

import { techStackPrimary, techStackSecondary } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function TechStack() {
  return (
    <MotionSection id="tech" className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Stack
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-8">
        Tech Stack
      </h2>

      {/* Primary tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {techStackPrimary.map((tag) => (
          <span
            key={tag}
            className="bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 font-mono text-sm px-3 py-1.5 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Secondary tags */}
      <div className="flex flex-wrap gap-2">
        {techStackSecondary.map((tag) => (
          <span
            key={tag}
            className="bg-[#161b22] text-[#8b949e] border border-white/10 font-mono text-xs px-3 py-1 rounded-lg"
          >
            {tag}
          </span>
        ))}
      </div>
    </MotionSection>
  );
}
