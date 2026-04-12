"use client";

import { beliefs } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Beliefs() {
  return (
    <MotionSection id="beliefs" className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Principles
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-8">
        Things I Believe
      </h2>

      {/* Two-column masonry on desktop, single column on mobile */}
      <div className="columns-1 lg:columns-2 gap-6">
        {beliefs.map((belief, i) => (
          <p
            key={i}
            className={`text-[#8b949e] text-sm leading-relaxed mb-4 break-inside-avoid${belief.italic ? " italic" : ""}`}
          >
            {belief.text}
          </p>
        ))}
      </div>
    </MotionSection>
  );
}
