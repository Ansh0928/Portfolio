"use client";

import { useState, useEffect } from "react";
import { type CaseStudyData, type CaseStudyBlock } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";
import CelestialMatrixShader from "@/components/ui/matrix-shader";

// ── Block renderers ──────────────────────────────────────────────────────────

function TextBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "text" }>;
}) {
  return (
    <div>
      <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-2">
        {block.heading}
      </h4>
      <p className="text-[#8b949e] text-sm leading-relaxed">{block.body}</p>
    </div>
  );
}

function BulletsBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "bullets" }>;
}) {
  return (
    <div>
      <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
        {block.heading}
      </h4>
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-[#8b949e] leading-relaxed"
          >
            <span className="text-[#3fb950] font-mono mt-0.5 shrink-0">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuoteBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "quote" }>;
}) {
  return (
    <div className="border-l-2 border-[#3fb950] pl-4 py-1">
      <p className="text-[#e6edf3] text-base italic leading-relaxed">
        &ldquo;{block.text}&rdquo;
      </p>
      {block.attribution && (
        <p className="text-xs font-mono text-[#8b949e] mt-2">
          {block.attribution}
        </p>
      )}
    </div>
  );
}

function TimelineBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "timeline" }>;
}) {
  return (
    <div>
      <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-4">
        {block.heading}
      </h4>
      <div className="relative pl-4 space-y-5">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />
        {block.steps.map((step, i) => (
          <div key={i} className="relative pl-5">
            {/* Dot */}
            <div className="absolute left-[-1px] top-[5px] w-2 h-2 rounded-full bg-[#3fb950] border-2 border-[#0d1117] translate-x-[-50%]" />
            <p className="text-xs font-mono text-[#3fb950] mb-1">
              {step.label}
            </p>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CalloutBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "callout" }>;
}) {
  return (
    <div className="bg-[#3fb950]/5 border border-[#3fb950]/20 rounded-lg px-5 py-4">
      <h4 className="text-xs font-mono text-[#3fb950] tracking-widest uppercase mb-2">
        {block.heading}
      </h4>
      <p className="text-[#c9d1d9] text-sm leading-relaxed">{block.body}</p>
    </div>
  );
}

function StoryBlock({ block }: { block: CaseStudyBlock }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "bullets":
      return <BulletsBlock block={block} />;
    case "quote":
      return <QuoteBlock block={block} />;
    case "timeline":
      return <TimelineBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
  }
}

// ── Modal ────────────────────────────────────────────────────────────────────

function CaseStudyModal({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudyData;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${caseStudy.company} case study`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[#0d1117]/95 backdrop-blur border-b border-white/10 px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#3fb950] tracking-widest uppercase">
              Case Study
            </span>
            <h2 className="text-2xl font-mono font-bold text-[#e6edf3] mt-1">
              {caseStudy.company}
            </h2>
            <p className="text-xs text-[#8b949e] font-mono mt-0.5">
              {caseStudy.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950] shrink-0"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {/* Metrics bar */}
        <div className="px-6 py-5 flex gap-8 flex-wrap border-b border-white/10 bg-[#161b22]">
          {caseStudy.metrics.map((m) => (
            <div key={m.label}>
              <div className="font-mono text-2xl font-bold text-[#3fb950]">
                {m.value}
              </div>
              <div className="text-xs text-[#8b949e] font-mono tracking-wide mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story blocks */}
        <div className="px-6 py-6 space-y-8">
          {caseStudy.story.map((block, i) => (
            <StoryBlock key={i} block={block} />
          ))}
        </div>

        {/* Pipeline tags */}
        <div className="px-6 py-5 border-t border-white/10">
          <p className="text-xs font-mono text-[#8b949e] tracking-widest uppercase mb-3">
            Systems Built
          </p>
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
        </div>

        {/* Tech + links */}
        <div className="px-6 py-5 border-t border-white/10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {caseStudy.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-mono bg-white/5 text-[#8b949e] border border-white/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 shrink-0">
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
        </div>
      </div>
    </div>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────

type Props = { caseStudy: CaseStudyData };

export function CaseStudy({ caseStudy }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MotionSection aria-label={`${caseStudy.company} case study`}>
        <button
          onClick={() => setOpen(true)}
          className="relative w-full text-left group bg-[#161b22] border border-white/10 rounded-xl overflow-hidden hover:border-[#3fb950]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(63,185,80,0.07)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
        >
          {/* Matrix shader background — subtle, fades in on hover */}
          <CelestialMatrixShader
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ zIndex: 0 }}
          />
          {/* Card content sits above the shader */}
          <div className="relative z-10">
            {/* Header */}
            <div className="border-b border-white/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#3fb950] tracking-widest uppercase">
                  Case Study
                </span>
                <h3 className="text-xl font-mono font-bold text-[#e6edf3] mt-1 group-hover:text-white transition-colors">
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

            {/* Teaser: first 2 quadrants */}
            <div className="grid grid-cols-2 gap-0 divide-x divide-white/10">
              {caseStudy.quadrants.slice(0, 2).map((q) => (
                <div key={q.label} className="px-6 py-5">
                  <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-2">
                    {q.label}
                  </h4>
                  <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-3">
                    {q.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {caseStudy.techTags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono bg-white/5 text-[#8b949e] border border-white/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {caseStudy.techTags.length > 4 && (
                  <span className="px-2 py-0.5 text-xs font-mono text-[#8b949e]">
                    +{caseStudy.techTags.length - 4} more
                  </span>
                )}
              </div>
              <span className="text-sm font-mono text-[#3fb950] flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                Read case study <span aria-hidden>→</span>
              </span>
            </div>
          </div>
          {/* end relative z-10 */}
        </button>
      </MotionSection>

      {open && (
        <CaseStudyModal caseStudy={caseStudy} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
