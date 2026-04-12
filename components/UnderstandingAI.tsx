import Link from "next/link";
import { MotionSection } from "@/components/ui/MotionSection";

const takes = [
  {
    number: "01",
    headline: "The output ceiling is your taste, not the model.",
    body: "Most AI output is mediocre because the person directing it doesn't know what good looks like. The model reflects your judgment back at you. Better taste, better output. That's the whole game.",
  },
  {
    number: "02",
    headline: "I don't write code. I direct it.",
    body: "The shift isn't from developer to non-developer. It's from typist to architect. You still need to understand every line that ships — you just stop being the one who types all of them. The engineers who get this 10x their output. The ones who don't wonder why the output is bad.",
  },
  {
    number: "03",
    headline: "AI makes bad ideas faster. It doesn't make bad ideas good.",
    body: "The dinner table test still applies: can you explain what you're building to your mum and have her understand why it matters? If not, you're building the wrong thing faster. The problem-finding part is still 100% human.",
  },
  {
    number: "04",
    headline: "The 10x compounds on skill, not on ignorance.",
    body: "The engineers getting the biggest gains from AI aren't beginners who found a shortcut. They're people who already knew what great looked like — and now they can execute at 10x. If you don't know the craft, the model can't save you.",
  },
];

export function UnderstandingAI() {
  return (
    <MotionSection id="ai" className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Perspective
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-2">
        My AI Thesis
      </h2>
      <p className="text-[#8b949e] text-sm font-mono mb-16">
        Not what the courses say. What building with it every day actually
        taught me.
      </p>

      {/* Featured take — full width, large */}
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.35em] text-[#3fb950] uppercase mb-4">
          The core belief
        </p>
        <p className="text-3xl md:text-[2.75rem] font-mono font-bold text-[#e6edf3] leading-tight">
          {takes[0].headline}
        </p>
        <p className="text-[#8b949e] font-mono text-sm leading-relaxed mt-5 max-w-2xl">
          {takes[0].body}
        </p>
      </div>

      <div className="h-px bg-white/5 mb-16" />

      {/* Remaining takes */}
      <div className="space-y-14">
        {takes.slice(1).map((take) => (
          <div key={take.number} className="grid grid-cols-[3rem_1fr] gap-6">
            <span className="font-mono text-xs text-white/15 pt-1 select-none">
              {take.number}
            </span>
            <div>
              <p className="font-mono font-bold text-[#e6edf3] text-lg leading-snug mb-3">
                {take.headline}
              </p>
              <p className="font-mono text-sm text-[#8b949e] leading-relaxed">
                {take.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-white/5 mt-16 mb-12" />

      {/* What I've built CTA */}
      <Link
        href="/work"
        className="inline-flex items-center gap-3 font-mono text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors group"
      >
        <span className="text-[#3fb950] group-hover:translate-x-1 transition-transform">
          →
        </span>
        See what I&apos;ve built with it
      </Link>

      {/* Closing */}
      <div className="mt-14">
        <p className="font-mono text-sm text-[#3fb950] leading-relaxed">
          → AI-native teams move 10x faster than those who resist it. I&apos;ve
          been on that team since before it had a name.
        </p>
      </div>
    </MotionSection>
  );
}
