import { MotionSection } from "@/components/ui/MotionSection";

const aiPerspectives = [
  {
    label: "My unfair advantage",
    text: "For people like me, AI is a goldmine in a gold rush. Imagination and execution are the only limits.",
  },
  {
    label: "How I actually learn it",
    text: "The best way to understand AI isn't a course. It's a dinner table conversation with your family.",
  },
  {
    label: "What it did to me",
    text: "AI didn't make me a developer. It made me a faster thinker.",
  },
  {
    label: "Who wins",
    text: "The engineers who'll win aren't the ones who fear AI. They're the ones already building with it.",
  },
];

export function UnderstandingAI() {
  return (
    <MotionSection id="ai" className="max-w-5xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Perspective
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-2">
        Understanding AI
      </h2>
      <p className="text-[#8b949e] text-sm font-mono mb-12">
        Not what the courses say. What building with it every day taught me.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiPerspectives.map((item) => (
          <div
            key={item.label}
            className="relative bg-[#161b22] border border-white/10 rounded-xl p-6 hover:border-[#3fb950]/30 transition-colors"
          >
            <span className="block text-xs font-mono text-[#3fb950] tracking-widest uppercase mb-3">
              {item.label}
            </span>
            <p className="text-[#e6edf3] text-base leading-relaxed font-mono">
              &ldquo;{item.text}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-[#3fb950]/20 bg-[#3fb950]/5 rounded-xl px-6 py-5">
        <p className="text-[#3fb950] font-mono text-sm leading-relaxed">
          → AI-native teams will move 10x faster than those unwilling to change.
          I&apos;m already on that team.
        </p>
      </div>
    </MotionSection>
  );
}
