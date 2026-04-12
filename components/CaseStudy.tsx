import { type CaseStudyData } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

type Props = { caseStudy: CaseStudyData };

export function CaseStudy({ caseStudy }: Props) {
  return (
    <MotionSection
      className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden"
      aria-label={`${caseStudy.company} case study`}
    >
      <div className="border-b border-white/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#3fb950] tracking-widest uppercase">
            Case Study
          </span>
          <h3 className="text-xl font-mono font-bold text-[#e6edf3] mt-1">
            {caseStudy.company}
          </h3>
          <p className="text-xs text-[#8b949e] font-mono mt-0.5">
            {caseStudy.role}
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-mono text-lg font-bold text-[#3fb950]">
                {m.value}
              </div>
              <div className="text-xs text-[#8b949e] font-mono tracking-wide">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {caseStudy.quadrants.map((q) => (
          <div
            key={q.label}
            className="p-6 even:border-t md:even:border-t-0 border-white/10"
          >
            <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
              {q.label}
            </h4>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {q.content}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {caseStudy.pipelineTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {caseStudy.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-white/5 text-[#8b949e] border border-white/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 flex gap-4">
        {caseStudy.links.live && (
          <a
            href={caseStudy.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-[#3fb950] hover:underline"
          >
            Live Site ↗
          </a>
        )}
        {caseStudy.links.github && (
          <a
            href={caseStudy.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-[#58a6ff] hover:underline"
          >
            GitHub ↗
          </a>
        )}
      </div>
    </MotionSection>
  );
}
