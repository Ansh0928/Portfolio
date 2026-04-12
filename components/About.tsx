import { MotionSection } from "@/components/ui/MotionSection";

const nonNegotiables = [
  {
    title: "Positioning",
    description:
      "Knowing where I stand, where I'm going, and how to communicate that clearly to anyone in the room.",
  },
  {
    title: "Communication",
    description:
      "Saying the right thing, to the right people, at the right time — across code, docs, and boardrooms.",
  },
  {
    title: "Obsession",
    description:
      "Caring deeply about the work, even when no one's watching. Still learning. Still making mistakes worth documenting.",
  },
];

export function About() {
  return (
    <MotionSection
      id="about"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="About"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-10">
        About
      </h2>

      {/* Name + role */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#e6edf3] leading-tight mb-1">
          Anshumaan Saraf
        </h1>
        <p className="text-[#3fb950] font-mono text-sm">
          Forward Deployed Engineer · Gold Coast, Australia
        </p>
      </div>

      {/* Bio + Non-negotiables */}
      <div className="max-w-2xl flex flex-col gap-8">
        <div className="space-y-4 text-[#8b949e] text-base leading-relaxed">
          <p>
            You&apos;ll find wins here. You&apos;ll also find rejections. And
            most importantly — the thought process behind both.
          </p>
          <p>
            I&apos;m Anshumaan (Ansh), a Forward Deployed Engineer and MIT
            student at Griffith University, Gold Coast. I build systems that
            solve real problems.
          </p>
          <p>
            I&apos;m figuring out what it means to become an engineer — not just
            someone who writes code, but someone who focuses on business needs,
            thinks clearly, communicates precisely, and stays obsessed with the
            right problems.
          </p>
        </div>

        <div className="font-mono text-sm space-y-4">
          <p className="text-[#484f58] text-xs tracking-widest uppercase">
            Non-Negotiables
          </p>
          {nonNegotiables.map((item) => (
            <div key={item.title}>
              <p className="text-[#3fb950]">→ {item.title}</p>
              <p className="text-[#8b949e] mt-1 pl-4 leading-relaxed text-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
