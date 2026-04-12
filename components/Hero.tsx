"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { heroScramblePhrases, heroSubheadline, contact } from "@/lib/data";
import { TextScramble } from "@/components/ui/TextScramble";
import { Mail, Pause, Play } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const RainingLetters = dynamic(
  () => import("@/components/ui/RainingLetters").then((m) => m.RainingLetters),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0d1117]" />,
  },
);

export function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0d1117]"
      aria-label="Hero"
    >
      <RainingLetters paused={paused} />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-transparent to-[#0d1117]/80" />

      {/* Pause / play button */}
      <button
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-[#484f58] hover:text-[#3fb950] hover:border-[#3fb950]/30 transition-all font-mono text-[10px] tracking-widest uppercase"
        aria-label={paused ? "Resume animation" : "Pause animation"}
      >
        {paused ? (
          <>
            <Play size={10} />
            play
          </>
        ) : (
          <>
            <Pause size={10} />
            pause
          </>
        )}
      </button>

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Status badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-[#3fb950] uppercase">
            Available · contract &amp; part-time
          </span>
        </div>

        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-[#e6edf3] tracking-tight mb-3">
          ANSHUMAAN SARAF
        </h1>

        <p className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-[#3fb950] tracking-wide mb-2 min-h-[1.4em]">
          <TextScramble phrases={heroScramblePhrases} />
        </p>

        <p className="text-xs text-[#8b949e] font-mono mb-6 tracking-wide">
          (I embed with your business and build the system that solves the
          problem)
        </p>

        <p className="text-[#8b949e] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {heroSubheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/work"
            className="px-6 py-3 bg-[#3fb950] text-[#0d1117] font-mono text-sm font-semibold tracking-wide rounded-lg hover:bg-[#3fb950]/90 transition-colors"
          >
            View Work ↓
          </a>
          <a
            href="/Resume_Anshumaan_Saraf.pdf"
            download
            className="px-6 py-3 border border-[#3fb950]/40 text-[#3fb950] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-[#3fb950] hover:bg-[#3fb950]/10 transition-all"
          >
            Download CV ↓
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-[#484f58]/60 text-[#8b949e] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-[#8b949e] hover:text-[#e6edf3] transition-all"
          >
            Let&apos;s Talk →
          </a>
        </div>

        <div className="flex items-center justify-center gap-5 mt-6">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#484f58] hover:text-[#3fb950] transition-colors"
          >
            <LinkedInIcon size={18} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#484f58] hover:text-[#3fb950] transition-colors"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="text-[#484f58] hover:text-[#3fb950] transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
