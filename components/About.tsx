import { MotionSection } from "@/components/ui/MotionSection";

const nonNegotiables = [
  {
    num: "01",
    title: "Positioning",
    description:
      "Know where I stand. Know where I'm going. Communicate both clearly to anyone in the room.",
  },
  {
    num: "02",
    title: "Communication",
    description:
      "Right message, right person, right time — whether that's code, a doc, or a boardroom.",
  },
  {
    num: "03",
    title: "Obsession",
    description:
      "Care deeply about the work when no one's watching. Make mistakes worth documenting.",
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

      {/* Name + role + journey */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-[#e6edf3] leading-tight mb-2">
          Anshumaan Saraf
        </h1>
        <p className="text-[#3fb950] font-mono text-sm mb-4">
          Forward Deployed Engineer · Gold Coast, Australia
        </p>
        {/* Journey */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#484f58]">
          <span>Nepal</span>
          <span className="text-[#3fb950]">→</span>
          <span>India</span>
          <span className="text-[#3fb950]">→</span>
          <span>Australia</span>
        </div>
      </div>

      {/* Two-column: Non-negotiables left, Bio right */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left — Non-negotiables */}
        <div className="font-mono text-sm space-y-6 lg:w-64 flex-shrink-0">
          <p className="text-[#484f58] text-xs tracking-widest uppercase">
            Non-Negotiables
          </p>
          {nonNegotiables.map((item) => (
            <div key={item.title} className="relative pl-5">
              {/* Left accent line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, #3fb950, transparent)",
                }}
              />
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[#484f58] text-[10px]">{item.num}</span>
                <span className="text-[#3fb950] text-xs font-bold tracking-wide">
                  {item.title}
                </span>
              </div>
              <p className="text-[#8b949e] leading-relaxed text-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right — Bio */}
        <div className="flex-1 space-y-5">
          <p className="text-[#e6edf3] text-lg font-medium leading-snug">
            Wins here. Rejections too.
            <span className="text-[#8b949e]">
              {" "}
              What matters is the thinking behind both.
            </span>
          </p>
          <p className="text-[#8b949e] text-base leading-relaxed">
            I&apos;m Ansh — Forward Deployed Engineer and MIT student at
            Griffith University, Gold Coast. From Nepal, through India, now
            building in Australia. I build systems that solve real problems.
          </p>
          <p className="text-[#8b949e] text-base leading-relaxed">
            I&apos;m still figuring out what it means to be a great engineer —
            not just someone who writes code, but someone who understands
            business, communicates precisely, and stays obsessed with the right
            problems.
          </p>
        </div>
      </div>
    </MotionSection>
  );
}
