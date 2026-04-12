"use client";

import { useState, useEffect } from "react";
import {
  type CaseStudyData,
  type CaseStudyBlock,
  type VerticalColor,
} from "@/lib/data";
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
      <p className="text-[#c9d1d9] text-sm leading-relaxed">{block.body}</p>
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
            className="flex gap-3 text-sm text-[#c9d1d9] leading-relaxed"
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
    <div className="my-2 px-6 py-5 bg-[#3fb950]/5 border border-[#3fb950]/20 rounded-xl">
      <p className="text-[#e6edf3] text-xl font-mono leading-snug">
        &ldquo;{block.text}&rdquo;
      </p>
      {block.attribution && (
        <p className="text-xs font-mono text-[#3fb950] mt-3 tracking-wide">
          — {block.attribution}
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
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[#3fb950]/20" />
        {block.steps.map((step, i) => (
          <div key={i} className="relative pl-5">
            {/* Dot */}
            <div className="absolute left-[-1px] top-[5px] w-2 h-2 rounded-full bg-[#3fb950] border-2 border-[#0d1117] translate-x-[-50%]" />
            <p className="text-xs font-mono text-[#3fb950] mb-1 tracking-wide">
              {step.label}
            </p>
            <p className="text-[#c9d1d9] text-sm leading-relaxed">
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
    <div className="bg-[#3fb950]/8 border border-[#3fb950]/25 rounded-xl px-5 py-4">
      <h4 className="text-xs font-mono text-[#3fb950] tracking-widest uppercase mb-2">
        {block.heading}
      </h4>
      <p className="text-[#e6edf3] text-sm leading-relaxed">{block.body}</p>
    </div>
  );
}

function ImageBlock({
  block,
}: {
  block: Extract<CaseStudyBlock, { type: "image" }>;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10">
      <img src={block.src} alt={block.alt} className="w-full object-cover" />
      {block.caption && (
        <p className="text-xs font-mono text-[#8b949e] px-4 py-2 bg-[#161b22]">
          {block.caption}
        </p>
      )}
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
    case "image":
      return <ImageBlock block={block} />;
  }
}

// ── System Design Section ────────────────────────────────────────────────────

const verticalStyles: Record<
  VerticalColor,
  { border: string; title: string; feat: string }
> = {
  green: {
    border: "border-[#3fb950]/30",
    title: "text-[#3fb950]",
    feat: "text-[#8b949e]",
  },
  blue: {
    border: "border-[#58a6ff]/30",
    title: "text-[#58a6ff]",
    feat: "text-[#8b949e]",
  },
  purple: {
    border: "border-[#bc8cff]/30",
    title: "text-[#bc8cff]",
    feat: "text-[#8b949e]",
  },
};

function SystemDesignSection({ caseStudy }: { caseStudy: CaseStudyData }) {
  if (!caseStudy.beforeAfter && !caseStudy.architecture && !caseStudy.verticals)
    return null;

  return (
    <div className="px-6 py-6 border-b border-white/10 space-y-6">
      <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase">
        System Design — What Replaced What
      </h4>

      {/* Before → After */}
      {caseStudy.beforeAfter && (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-[#f85149] tracking-widest uppercase mb-1">
              Before
            </p>
            {caseStudy.beforeAfter.map((row) => (
              <div
                key={row.before}
                className="flex items-center gap-2 bg-[#f85149]/6 border border-[#f85149]/18 rounded-lg px-3 py-2 text-xs font-mono text-[#f85149]"
              >
                <span>❌</span>
                <span>{row.before}</span>
              </div>
            ))}
          </div>

          <div className="text-[#484f58] text-xl pt-7">→</div>

          <div className="space-y-2">
            <p className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase mb-1">
              After
            </p>
            {caseStudy.beforeAfter.map((row) => (
              <div
                key={row.after}
                className="flex items-center gap-2 bg-[#3fb950]/6 border border-[#3fb950]/18 rounded-lg px-3 py-2 text-xs font-mono text-[#3fb950]"
              >
                <span>✓</span>
                <span>{row.after}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture map */}
      {caseStudy.architecture && caseStudy.verticals && (
        <div className="bg-[#0d1117] border border-white/6 rounded-xl p-5 space-y-4">
          <p className="text-[10px] font-mono text-[#484f58] tracking-widest uppercase">
            Architecture
          </p>

          {/* Input layer */}
          <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
            <span className="bg-[#161b22] border border-white/8 rounded-md px-3 py-2 text-[#8b949e]">
              📧 {caseStudy.architecture.inputLabel}
            </span>
            <span className="text-[#484f58]">
              → {caseStudy.architecture.inputFlow}
            </span>
          </div>

          <p className="text-[10px] font-mono text-[#484f58] text-center">
            ↓ feeds into ↓
          </p>

          {/* Central platform */}
          <div className="bg-[#3fb950]/5 border border-[#3fb950]/25 rounded-xl px-5 py-4 text-center">
            <p className="text-sm font-mono font-bold text-[#3fb950]">
              🧠 {caseStudy.architecture.platformTitle}
            </p>
            <p className="text-xs text-[#8b949e] mt-1">
              {caseStudy.architecture.platformSub}
            </p>
            <p className="text-[10px] font-mono text-[#484f58] mt-2">
              {caseStudy.architecture.platformStack}
            </p>
          </div>

          <p className="text-[10px] font-mono text-[#484f58] text-center">
            ↓ powers these verticals ↓
          </p>

          {/* 3 verticals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {caseStudy.verticals.map((v) => {
              const c = verticalStyles[v.color];
              return (
                <div
                  key={v.title}
                  className={`bg-[#161b22] border rounded-xl p-4 space-y-2 ${c.border}`}
                >
                  <p className={`text-xs font-mono font-bold ${c.title}`}>
                    {v.icon} {v.title}
                  </p>
                  <p className="text-[10px] font-mono text-[#484f58]">
                    {v.stack}
                  </p>
                  <ul className="space-y-1">
                    {v.features.map((f) => (
                      <li
                        key={f}
                        className={`text-[10px] font-mono ${c.feat} flex gap-1.5 items-start`}
                      >
                        <span className="text-[#484f58] shrink-0 mt-0.5">
                          →
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* AI layer */}
          <div className="border border-dashed border-[#3fb950]/25 rounded-xl px-4 py-3 space-y-2">
            <p className="text-[11px] font-mono font-bold text-[#3fb950]">
              🤖 AI Layer — spans all verticals
            </p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.architecture.aiFeatures.map((f) => (
                <span
                  key={f}
                  className="text-[10px] font-mono text-[#8b949e] bg-[#3fb950]/6 border border-[#3fb950]/15 rounded px-2 py-1"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl">
        {/* Sticky header */}
        <div className="sticky top-0 z-10 bg-[#0d1117]/95 backdrop-blur border-b border-white/10 px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-[#3fb950] tracking-widest uppercase">
              {caseStudy.isActiveBuild
                ? "Case Study · Active Build"
                : "Case Study"}
            </span>
            <h2 className="text-2xl font-bold text-[#e6edf3] mt-1">
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

        {/* Metrics bar — bigger, bolder */}
        <div className="px-6 py-6 border-b border-white/10 bg-[#161b22]">
          <div className="grid grid-cols-3 gap-4">
            {caseStudy.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="font-mono text-3xl font-bold text-[#3fb950] leading-none">
                  {m.value}
                </div>
                <div className="text-xs text-[#8b949e] font-mono tracking-wide mt-1.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System design — shown first */}
        <SystemDesignSection caseStudy={caseStudy} />

        {/* Story blocks */}
        <div className="px-6 py-6 space-y-7">
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
                className="px-2.5 py-1 text-xs font-mono bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 rounded-full"
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
          className="relative w-full text-left group bg-[#161b22] border border-white/10 rounded-xl overflow-hidden hover:border-[#3fb950]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(63,185,80,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
        >
          {/* Matrix shader — subtle, fades in on hover */}
          <CelestialMatrixShader
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          <div className="relative z-10">
            {/* ── Hero strip ── */}
            <div className="relative bg-gradient-to-br from-[#0d1117] via-[#1a2d1f] to-[#0f2318] px-6 py-7 border-b border-white/6">
              {caseStudy.isActiveBuild && (
                <div className="absolute top-5 right-5 flex items-center gap-2 bg-[#3fb950]/10 border border-[#3fb950]/25 rounded-full px-3 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase">
                    Active Build
                  </span>
                </div>
              )}
              <span className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase">
                Case Study · Forward Deployed Engineer
              </span>
              <h3 className="text-2xl font-bold text-white mt-2 mb-1 leading-tight group-hover:text-[#3fb950] transition-colors duration-300">
                {caseStudy.company}
              </h3>
              <p className="text-sm text-[#8b949e] font-mono">
                QLD&apos;s #1 seafood company · Master platform connecting
                warehouse → stores → field
              </p>
            </div>

            {/* ── Problem bar ── */}
            {caseStudy.problems && caseStudy.problems.length > 0 && (
              <div className="px-6 py-4 border-b border-white/6 bg-[#0d1117]">
                <p className="text-[10px] font-mono text-[#f85149] tracking-widest uppercase mb-3">
                  The Problem
                </p>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.problems.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 text-xs font-mono bg-[#f85149]/8 text-[#f85149] border border-[#f85149]/20 rounded-md"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ── System preview ── */}
            {caseStudy.verticals && caseStudy.verticals.length > 0 && (
              <div className="px-6 py-4 border-b border-white/6 bg-[#0d1117]">
                <p className="text-[10px] font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
                  What&apos;s Being Built
                </p>
                <div className="flex flex-wrap gap-2 items-center">
                  <div className="flex flex-col items-center bg-[#161b22] border border-[#58a6ff]/25 rounded-lg px-3 py-2 text-center">
                    <span className="text-[11px] font-mono text-[#58a6ff]">
                      📦 Warehouse
                    </span>
                    <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                      invoice scraping
                    </span>
                  </div>
                  <span className="text-[#484f58] text-sm">→</span>
                  <div className="flex flex-col items-center bg-[#3fb950]/6 border border-[#3fb950]/35 rounded-lg px-3 py-2 text-center">
                    <span className="text-[11px] font-mono text-[#3fb950] font-bold">
                      🧠 Master Platform
                    </span>
                    <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                      live AI dashboard
                    </span>
                  </div>
                  <span className="text-[#484f58] text-sm">→</span>
                  {caseStudy.verticals.map((v, i) => (
                    <div key={v.title} className="flex items-center gap-2">
                      <div
                        className={`flex flex-col items-center bg-[#161b22] rounded-lg px-3 py-2 text-center ${
                          v.color === "green"
                            ? "border border-[#3fb950]/30"
                            : v.color === "blue"
                              ? "border border-[#58a6ff]/30"
                              : "border border-[#bc8cff]/30"
                        }`}
                      >
                        <span
                          className={`text-[11px] font-mono ${
                            v.color === "green"
                              ? "text-[#3fb950]"
                              : v.color === "blue"
                                ? "text-[#58a6ff]"
                                : "text-[#bc8cff]"
                          }`}
                        >
                          {v.icon} {v.title}
                        </span>
                        <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                          {v.stack.split(" · ")[0]}
                        </span>
                      </div>
                      {i < caseStudy.verticals!.length - 1 && (
                        <span className="text-[#484f58] text-sm">→</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-mono text-[#484f58] mt-2">
                  Neon · Supabase · Prisma ORM
                </p>
              </div>
            )}

            {/* ── Footer ── */}
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex gap-5">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="font-mono text-base font-bold text-[#3fb950] leading-none">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-[#484f58] font-mono tracking-wide mt-1 whitespace-nowrap">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-sm font-mono text-[#3fb950] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200 shrink-0 font-medium">
                Read case study <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </button>
      </MotionSection>

      {open && (
        <CaseStudyModal caseStudy={caseStudy} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
