"use client";

import dynamic from "next/dynamic";
import { heroScramblePhrases, heroSubheadline } from "@/lib/data";
import { TextScramble } from "@/components/ui/TextScramble";

const RainingLetters = dynamic(
  () => import("@/components/ui/RainingLetters").then((m) => m.RainingLetters),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0d1117]" />,
  },
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0d1117]"
      aria-label="Hero"
    >
      <RainingLetters />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-transparent to-[#0d1117]/80" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="font-mono text-sm tracking-[0.3em] text-[#3fb950] mb-4 uppercase">
          ANSHUMAAN SARAF
        </p>

        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6edf3] tracking-tight mb-2 min-h-[1.2em]">
          <TextScramble phrases={heroScramblePhrases} />
        </h1>

        <p className="text-xs text-[#484f58] font-mono mb-6 tracking-wide">
          (I embed with your business and build the system that solves the
          problem)
        </p>

        <p className="text-[#8b949e] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {heroSubheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#work"
            className="px-6 py-3 bg-[#3fb950] text-[#0d1117] font-mono text-sm font-semibold tracking-wide rounded-lg hover:bg-[#3fb950]/90 transition-colors"
          >
            View Work ↓
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#3fb950]/40 text-[#3fb950] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-[#3fb950] hover:bg-[#3fb950]/10 transition-all"
          >
            Let&apos;s Talk →
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#484f58] font-mono text-xs tracking-widest animate-bounce">
        ↓ SCROLL
      </div>
    </section>
  );
}
