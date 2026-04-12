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
      <p className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-2">
        {block.heading}
      </p>
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
      <p className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-3">
        {block.heading}
      </p>
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
    <div className="pl-5 border-l-2 border-[#3fb950]/50 py-1">
      <p className="text-[#e6edf3] text-lg font-mono leading-snug">
        &ldquo;{block.text}&rdquo;
      </p>
      {block.attribution && (
        <p className="text-xs font-mono text-[#3fb950]/60 mt-3">
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
      <p className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-4">
        {block.heading}
      </p>
      <div className="relative pl-4 space-y-5">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[#3fb950]/20" />
        {block.steps.map((step, i) => (
          <div key={i} className="relative pl-5">
            <div className="absolute left-[-1px] top-[5px] w-2 h-2 rounded-full bg-[#3fb950] border-2 border-[#0d1117] -translate-x-1/2" />
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
    <div className="pl-5 border-l-2 border-[#3fb950]/40 py-1">
      <p className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase mb-2">
        {block.heading}
      </p>
      <p className="text-[#c9d1d9] text-sm leading-relaxed">{block.body}</p>
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

const verticalAccent: Record<
  VerticalColor,
  { bar: string; title: string; stack: string; dot: string }
> = {
  green: {
    bar: "border-l-2 border-[#3fb950]",
    title: "text-[#3fb950]",
    stack: "text-[#3fb950]/40",
    dot: "bg-[#3fb950]",
  },
  blue: {
    bar: "border-l-2 border-[#58a6ff]",
    title: "text-[#58a6ff]",
    stack: "text-[#58a6ff]/40",
    dot: "bg-[#58a6ff]",
  },
  purple: {
    bar: "border-l-2 border-[#bc8cff]",
    title: "text-[#bc8cff]",
    stack: "text-[#bc8cff]/40",
    dot: "bg-[#bc8cff]",
  },
};

function SystemDesignSection({ caseStudy }: { caseStudy: CaseStudyData }) {
  if (!caseStudy.beforeAfter && !caseStudy.architecture && !caseStudy.verticals)
    return null;

  return (
    <div className="border-b border-white/8">
      {/* Header */}
      <div className="px-7 pt-7 pb-5 flex items-center gap-4">
        <span className="text-[10px] font-mono text-[#484f58] tracking-[0.25em] uppercase">
          System Design
        </span>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      {/* Before → After */}
      {caseStudy.beforeAfter && (
        <div className="px-7 pb-7">
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_32px_1fr] mb-2">
            <p className="text-[10px] font-mono text-[#f85149]/60 tracking-[0.2em] uppercase">
              Before
            </p>
            <div />
            <p className="text-[10px] font-mono text-[#3fb950]/60 tracking-[0.2em] uppercase">
              After
            </p>
          </div>

          {/* Rows */}
          <div className="space-y-1">
            {caseStudy.beforeAfter.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_32px_1fr] items-center gap-0"
              >
                {/* Before */}
                <div className="flex items-center gap-3 bg-[#f85149]/4 border border-[#f85149]/12 rounded-l-lg px-4 py-2.5">
                  <span className="text-[10px] font-mono text-[#f85149]/30 shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#c9d1d9] font-mono leading-snug">
                    {row.before}
                  </span>
                </div>
                {/* Arrow */}
                <div className="flex items-center justify-center h-full bg-white/2">
                  <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                    <path
                      d="M0 4h10M7 1l3 3-3 3"
                      stroke="#484f58"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {/* After */}
                <div className="flex items-center gap-3 bg-[#3fb950]/4 border border-[#3fb950]/12 rounded-r-lg px-4 py-2.5">
                  <span className="text-sm text-[#e6edf3] font-mono leading-snug">
                    {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture */}
      {caseStudy.architecture && caseStudy.verticals && (
        <div className="mx-7 mb-7 border border-white/8 rounded-xl overflow-hidden">
          {/* Input → pricing */}
          <div className="px-5 py-3.5 bg-[#161b22] border-b border-white/6 flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase shrink-0">
              Input
            </span>
            <span className="text-xs font-mono text-[#8b949e] bg-white/4 border border-white/8 rounded px-2.5 py-1">
              📧 {caseStudy.architecture.inputLabel}
            </span>
            <svg
              width="20"
              height="8"
              viewBox="0 0 20 8"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M0 4h16M12 1l4 3-4 3"
                stroke="#484f58"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-mono text-[#3fb950]/70">
              {caseStudy.architecture.inputFlow}
            </span>
          </div>

          {/* Central platform */}
          <div className="px-5 py-4 bg-[#0f1a14] border-b border-white/6">
            <div className="flex items-start gap-4 justify-between flex-wrap">
              <div>
                <p
                  className="text-[22px] text-[#3fb950] leading-tight mb-1"
                  style={{
                    fontFamily: "var(--font-barlow), sans-serif",
                    fontWeight: 800,
                  }}
                >
                  {caseStudy.architecture.platformTitle}
                </p>
                <p className="text-xs text-[#8b949e] leading-relaxed">
                  {caseStudy.architecture.platformSub}
                </p>
              </div>
              <div className="flex gap-1.5 flex-wrap shrink-0">
                {caseStudy.architecture.platformStack.split(" · ").map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-mono text-[#484f58] border border-white/8 rounded px-2 py-0.5 bg-white/2"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3 verticals */}
          <div className="grid grid-cols-3 bg-[#161b22]">
            {caseStudy.verticals.map((v, i) => {
              const c = verticalAccent[v.color];
              return (
                <div
                  key={v.title}
                  className={`p-4 ${c.bar} ${i < 2 ? "border-r border-white/6" : ""}`}
                >
                  <div className={`flex items-center gap-2 mb-2`}>
                    <span className={`text-base`}>{v.icon}</span>
                    <span className={`text-sm font-semibold ${c.title}`}>
                      {v.title}
                    </span>
                  </div>
                  <p className={`text-[10px] font-mono mb-3 ${c.stack}`}>
                    {v.stack}
                  </p>
                  <ul className="space-y-1.5">
                    {v.features.map((f) => (
                      <li key={f} className="flex gap-2 items-start">
                        <span
                          className={`w-1 h-1 rounded-full ${c.dot} mt-1.5 shrink-0`}
                        />
                        <span className="text-[11px] text-[#8b949e] leading-snug">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* AI layer */}
          <div className="px-5 py-3 bg-[#0f1a14] border-t border-[#3fb950]/15 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
              <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                AI Layer
              </span>
            </div>
            <div className="h-3 w-px bg-white/10 shrink-0" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {caseStudy.architecture.aiFeatures.map((f) => (
                <span key={f} className="text-[11px] font-mono text-[#8b949e]">
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
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0d1117]/96 backdrop-blur-md border-b border-white/8 px-7 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              {caseStudy.isActiveBuild && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                    Active Build
                  </span>
                  <span className="text-[#484f58] text-[10px]">·</span>
                </>
              )}
              <span className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase">
                Case Study
              </span>
            </div>
            <h2
              className="text-[32px] text-[#e6edf3] leading-none"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
                fontWeight: 800,
                letterSpacing: "-0.01em",
              }}
            >
              {caseStudy.company.toUpperCase()}
            </h2>
            <p className="text-xs text-[#484f58] font-mono mt-1">
              {caseStudy.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#484f58] hover:text-[#e6edf3] transition-colors p-2 rounded-lg hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950] shrink-0"
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/8">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="px-6 py-5">
              <div
                className="text-[42px] leading-none text-[#3fb950]"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontWeight: 800,
                }}
              >
                {m.value}
              </div>
              <div className="text-[10px] text-[#484f58] font-mono tracking-[0.15em] uppercase mt-2">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* System design */}
        <SystemDesignSection caseStudy={caseStudy} />

        {/* Story */}
        <div className="px-7 py-7 space-y-7">
          {caseStudy.story.map((block, i) => (
            <StoryBlock key={i} block={block} />
          ))}
        </div>

        {/* Pipeline tags */}
        <div className="px-7 py-5 border-t border-white/8">
          <p className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase mb-3">
            Systems Built
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {caseStudy.pipelineTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-[#8b949e] flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#3fb950]/40 inline-block" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tech + links */}
        <div className="px-7 py-5 border-t border-white/8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {caseStudy.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-mono bg-white/4 text-[#8b949e] border border-white/8 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-5 shrink-0">
            {caseStudy.links.live && (
              <a
                href={caseStudy.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#3fb950] hover:underline"
              >
                Live ↗
              </a>
            )}
            {caseStudy.links.github && (
              <a
                href={caseStudy.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#58a6ff] hover:underline"
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
          className="relative w-full text-left group border border-white/8 rounded-2xl overflow-hidden
                     hover:border-[#3fb950]/25 transition-all duration-500
                     hover:shadow-[0_0_80px_rgba(63,185,80,0.05)]
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
          style={{
            background:
              "linear-gradient(160deg, #0f1410 0%, #0d1117 40%, #0a0d0f 100%)",
          }}
        >
          <CelestialMatrixShader
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          <div className="relative z-10">
            {/* ── Top bar: label + active badge ── */}
            <div className="px-7 pt-6 pb-0 flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#484f58] tracking-[0.25em] uppercase">
                Case Study · Forward Deployed Engineer
              </span>
              {caseStudy.isActiveBuild && (
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                    Active Build
                  </span>
                </div>
              )}
            </div>

            {/* ── Company name — the poster moment ── */}
            <div className="px-7 pt-4 pb-6 border-b border-white/6">
              <h3
                className="text-[clamp(40px,7vw,72px)] leading-[0.92] text-[#e6edf3]
                           group-hover:text-[#3fb950] transition-colors duration-500 mb-3"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.025em",
                }}
              >
                {caseStudy.company.toUpperCase()}
              </h3>
              <p className="text-sm text-[#8b949e] max-w-lg leading-relaxed">
                QLD&apos;s #1 seafood company. One engineer. Replaced an entire
                disconnected tech stack — e-commerce, inventory, transport,
                field ops, and an AI pipeline.
              </p>
            </div>

            {/* ── The quote — the real hook ── */}
            <div className="px-7 py-6 border-b border-white/6">
              <p className="text-base font-mono text-[#e6edf3] leading-relaxed">
                &ldquo;Built their website before the interview. Walked in and
                said:
                <span className="text-[#3fb950]">
                  {" "}
                  this website doesn&apos;t matter if you have no revenue from
                  it.
                </span>
                &rdquo;
              </p>
            </div>

            {/* ── 3 verticals — what was built ── */}
            {caseStudy.verticals && (
              <div className="px-7 py-5 border-b border-white/6">
                <p className="text-[10px] font-mono text-[#484f58] tracking-[0.25em] uppercase mb-4">
                  What was built
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {caseStudy.verticals.map((v) => {
                    const styles = {
                      green: "border-[#3fb950]/20 text-[#3fb950]",
                      blue: "border-[#58a6ff]/20 text-[#58a6ff]",
                      purple: "border-[#bc8cff]/20 text-[#bc8cff]",
                    };
                    return (
                      <div
                        key={v.title}
                        className={`border rounded-xl px-4 py-3 bg-white/2 ${styles[v.color]}`}
                      >
                        <div className="text-lg mb-1">{v.icon}</div>
                        <div
                          className={`text-sm font-semibold leading-tight ${styles[v.color].split(" ")[1]}`}
                        >
                          {v.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#484f58] mt-1">
                          {v.stack.split(" · ")[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Footer: metrics + CTA ── */}
            <div className="px-7 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className="text-[22px] text-[#3fb950] leading-none"
                      style={{
                        fontFamily: "var(--font-barlow), sans-serif",
                        fontWeight: 800,
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="text-[9px] font-mono text-[#484f58] tracking-[0.1em] uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="flex items-center gap-2 text-xs font-mono text-[#3fb950] shrink-0
                              group-hover:gap-3 transition-all duration-300"
              >
                Read case study
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path
                    d="M0 5h12M8 1.5l4 3.5-4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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
