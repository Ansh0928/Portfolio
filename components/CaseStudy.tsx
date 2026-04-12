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
      <h4 className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-2">
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
      <h4 className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-3">
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
    <div className="my-2 pl-5 border-l-2 border-[#3fb950]/40 py-1">
      <p className="text-[#e6edf3] text-lg font-mono leading-snug">
        &ldquo;{block.text}&rdquo;
      </p>
      {block.attribution && (
        <p className="text-xs font-mono text-[#3fb950]/70 mt-3 tracking-wide">
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
      <h4 className="text-[10px] font-mono text-[#58a6ff] tracking-[0.2em] uppercase mb-4">
        {block.heading}
      </h4>
      <div className="relative pl-4 space-y-5">
        <div className="absolute left-0 top-2 bottom-2 w-px bg-[#3fb950]/20" />
        {block.steps.map((step, i) => (
          <div key={i} className="relative pl-5">
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
    <div className="border-l-2 border-[#3fb950]/40 pl-5 py-1">
      <h4 className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase mb-2">
        {block.heading}
      </h4>
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
  { bar: string; label: string; stack: string }
> = {
  green: {
    bar: "bg-[#3fb950]",
    label: "text-[#3fb950]",
    stack: "text-[#3fb950]/50",
  },
  blue: {
    bar: "bg-[#58a6ff]",
    label: "text-[#58a6ff]",
    stack: "text-[#58a6ff]/50",
  },
  purple: {
    bar: "bg-[#bc8cff]",
    label: "text-[#bc8cff]",
    stack: "text-[#bc8cff]/50",
  },
};

function SystemDesignSection({ caseStudy }: { caseStudy: CaseStudyData }) {
  if (!caseStudy.beforeAfter && !caseStudy.architecture && !caseStudy.verticals)
    return null;

  return (
    <div className="border-b border-white/8">
      {/* ── Section label ── */}
      <div className="px-7 pt-7 pb-4 flex items-center gap-4">
        <span className="text-[10px] font-mono text-[#484f58] tracking-[0.25em] uppercase">
          System Design
        </span>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      {/* ── Before → After ── */}
      {caseStudy.beforeAfter && (
        <div className="px-7 pb-7">
          <div className="grid grid-cols-[1fr_48px_1fr] gap-0">
            {/* Before column */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#f85149]/70 mb-3">
                Before
              </div>
              <div className="space-y-1.5">
                {caseStudy.beforeAfter.map((row, i) => (
                  <div key={row.before} className="flex items-center gap-3 h-9">
                    <span className="text-[10px] font-mono text-[#484f58] w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-2.5 border-l border-[#f85149]/25 pl-3 h-full">
                      <span className="text-xs font-mono text-[#8b949e] leading-tight">
                        {row.before}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow column */}
            <div className="flex items-center justify-center pt-6">
              <svg
                width="24"
                height="100%"
                viewBox="0 0 24 180"
                fill="none"
                className="text-[#484f58]"
              >
                <path
                  d="M4 90 L20 90 M14 84 L20 90 L14 96"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* After column */}
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#3fb950]/70 mb-3">
                After
              </div>
              <div className="space-y-1.5">
                {caseStudy.beforeAfter.map((row, i) => (
                  <div key={row.after} className="flex items-center gap-3 h-9">
                    <div className="flex items-center gap-2.5 border-l border-[#3fb950]/30 pl-3 h-full flex-1">
                      <span className="text-xs font-mono text-[#e6edf3] leading-tight">
                        {row.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Architecture ── */}
      {caseStudy.architecture && caseStudy.verticals && (
        <div className="mx-7 mb-7 bg-[#0a0e13] border border-white/6 rounded-xl overflow-hidden">
          {/* Input layer */}
          <div className="px-5 py-4 border-b border-white/6 flex items-center gap-3 flex-wrap">
            <span className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase shrink-0">
              Input
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#8b949e]">
              <span className="px-2.5 py-1 bg-white/4 border border-white/8 rounded">
                📧 {caseStudy.architecture.inputLabel}
              </span>
              <span className="text-[#484f58]">→</span>
              <span className="text-[#3fb950]/80">
                {caseStudy.architecture.inputFlow}
              </span>
            </div>
          </div>

          {/* Central platform */}
          <div className="px-5 py-5 border-b border-white/6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase mb-2">
                  Platform
                </div>
                <div
                  className="text-xl font-bold text-[#e6edf3] leading-tight"
                  style={{
                    fontFamily: "var(--font-barlow), sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {caseStudy.architecture.platformTitle}
                </div>
                <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed max-w-md">
                  {caseStudy.architecture.platformSub}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="flex gap-1.5 justify-end flex-wrap">
                  {caseStudy.architecture.platformStack
                    .split(" · ")
                    .map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono text-[#484f58] bg-white/4 border border-white/8 rounded px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3 verticals */}
          <div className="grid grid-cols-3 divide-x divide-white/6">
            {caseStudy.verticals.map((v) => {
              const c = verticalAccent[v.color];
              return (
                <div key={v.title} className="p-4">
                  <div className={`w-4 h-0.5 ${c.bar} mb-3`} />
                  <div className={`text-sm font-bold mb-0.5 ${c.label}`}>
                    {v.icon} {v.title}
                  </div>
                  <div className={`text-[10px] font-mono mb-3 ${c.stack}`}>
                    {v.stack}
                  </div>
                  <ul className="space-y-1.5">
                    {v.features.map((f) => (
                      <li
                        key={f}
                        className="text-[11px] text-[#8b949e] leading-snug flex gap-2 items-start"
                      >
                        <span className="text-[#484f58] mt-0.5 shrink-0">
                          ·
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* AI layer — full-width spanning strip */}
          <div className="border-t border-[#3fb950]/15 bg-[#3fb950]/3 px-5 py-3">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                  AI Layer
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {caseStudy.architecture.aiFeatures.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-mono text-[#8b949e]"
                  >
                    {f}
                  </span>
                ))}
              </div>
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
        {/* ── Sticky header ── */}
        <div className="sticky top-0 z-10 bg-[#0d1117]/96 backdrop-blur-md border-b border-white/8 px-7 py-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {caseStudy.isActiveBuild && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                    Active Build
                  </span>
                  <span className="text-[#484f58] font-mono text-[10px]">
                    ·
                  </span>
                </div>
              )}
              <span className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase">
                Case Study
              </span>
            </div>
            <h2
              className="text-3xl text-[#e6edf3] leading-none tracking-tight"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
                fontWeight: 800,
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
            className="text-[#484f58] hover:text-[#e6edf3] transition-colors p-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950] shrink-0"
            aria-label="Close"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* ── Metrics ── */}
        <div className="grid grid-cols-3 divide-x divide-white/6 border-b border-white/8">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="px-6 py-5">
              <div
                className="text-4xl text-[#3fb950] leading-none"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontWeight: 800,
                }}
              >
                {m.value}
              </div>
              <div className="text-[10px] text-[#484f58] font-mono tracking-[0.15em] uppercase mt-1.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── System design ── */}
        <SystemDesignSection caseStudy={caseStudy} />

        {/* ── Story blocks ── */}
        <div className="px-7 py-7 space-y-7">
          {caseStudy.story.map((block, i) => (
            <StoryBlock key={i} block={block} />
          ))}
        </div>

        {/* ── Pipeline tags ── */}
        <div className="px-7 py-5 border-t border-white/8">
          <div className="text-[10px] font-mono text-[#484f58] tracking-[0.2em] uppercase mb-3">
            Systems Built
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {caseStudy.pipelineTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-[#8b949e] flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[#3fb950]/50 inline-block" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Tech + links ── */}
        <div className="px-7 py-5 border-t border-white/8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {caseStudy.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-mono bg-white/4 text-[#8b949e] border border-white/8 rounded"
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
                Live Site ↗
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
          className="relative w-full text-left group bg-[#0d1117] border border-white/8 rounded-2xl overflow-hidden hover:border-[#3fb950]/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(63,185,80,0.06)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
        >
          {/* Matrix shader on hover */}
          <CelestialMatrixShader
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            style={{ zIndex: 0 }}
          />

          <div className="relative z-10">
            {/* ── Hero — massive type ── */}
            <div
              className="relative px-7 pt-8 pb-6 border-b border-white/6 overflow-hidden"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(63,185,80,0.04) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            >
              {/* Active build badge */}
              {caseStudy.isActiveBuild && (
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
                  <span className="text-[10px] font-mono text-[#3fb950] tracking-[0.2em] uppercase">
                    Active Build
                  </span>
                </div>
              )}

              <div className="text-[10px] font-mono text-[#484f58] tracking-[0.25em] uppercase mb-3">
                Case Study · Forward Deployed Engineer
              </div>

              <h3
                className="text-[56px] leading-[0.95] text-white group-hover:text-[#3fb950] transition-colors duration-500 mb-3"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                {caseStudy.company.toUpperCase()}
              </h3>

              <p className="text-xs font-mono text-[#484f58] leading-relaxed max-w-lg">
                QLD&apos;s #1 seafood company · One engineer replacing an entire
                disconnected tech stack
              </p>
            </div>

            {/* ── Problem — numbered ops list ── */}
            {caseStudy.problems && caseStudy.problems.length > 0 && (
              <div className="px-7 py-5 border-b border-white/6 bg-[#080b0f]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-[#f85149]/60 tracking-[0.25em] uppercase">
                    Problem
                  </span>
                  <div className="flex-1 h-px bg-[#f85149]/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                  {caseStudy.problems.map((p, i) => (
                    <div
                      key={p}
                      className="flex items-baseline gap-3 py-1.5 border-b border-white/4 last:border-0"
                    >
                      <span className="text-[10px] font-mono text-[#f85149]/40 shrink-0 w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-mono text-[#8b949e]">
                        {p}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── System preview ── */}
            {caseStudy.verticals && caseStudy.verticals.length > 0 && (
              <div className="px-7 py-5 border-b border-white/6 bg-[#080b0f]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-mono text-[#58a6ff]/60 tracking-[0.25em] uppercase">
                    Architecture
                  </span>
                  <div className="flex-1 h-px bg-[#58a6ff]/8" />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Warehouse */}
                  <div className="px-3 py-1.5 bg-white/3 border border-white/8 rounded-lg">
                    <div className="text-[10px] font-mono text-[#8b949e]">
                      📦 Warehouse
                    </div>
                    <div className="text-[9px] font-mono text-[#484f58] mt-0.5">
                      invoice scraping
                    </div>
                  </div>

                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    className="shrink-0 text-[#484f58]"
                  >
                    <path
                      d="M0 6h16M12 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Master platform */}
                  <div className="px-3 py-1.5 bg-[#3fb950]/5 border border-[#3fb950]/20 rounded-lg">
                    <div className="text-[10px] font-mono text-[#3fb950] font-bold">
                      🧠 Master Platform
                    </div>
                    <div className="text-[9px] font-mono text-[#3fb950]/40 mt-0.5">
                      live AI dashboard
                    </div>
                  </div>

                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    className="shrink-0 text-[#484f58]"
                  >
                    <path
                      d="M0 6h16M12 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Verticals */}
                  {caseStudy.verticals.map((v, i) => {
                    const colors = {
                      green:
                        "bg-[#3fb950]/5 border-[#3fb950]/20 text-[#3fb950]",
                      blue: "bg-[#58a6ff]/5 border-[#58a6ff]/20 text-[#58a6ff]",
                      purple:
                        "bg-[#bc8cff]/5 border-[#bc8cff]/20 text-[#bc8cff]",
                    };
                    const subColors = {
                      green: "text-[#3fb950]/40",
                      blue: "text-[#58a6ff]/40",
                      purple: "text-[#bc8cff]/40",
                    };
                    return (
                      <div key={v.title} className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1.5 border rounded-lg ${colors[v.color]}`}
                        >
                          <div className="text-[10px] font-mono font-bold">
                            {v.icon} {v.title}
                          </div>
                          <div
                            className={`text-[9px] font-mono mt-0.5 ${subColors[v.color]}`}
                          >
                            {v.stack.split(" · ")[0]}
                          </div>
                        </div>
                        {i < caseStudy.verticals!.length - 1 && (
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            fill="none"
                            className="shrink-0 text-[#484f58]"
                          >
                            <path
                              d="M0 6h16M12 2l4 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-[9px] font-mono text-[#484f58] mt-3">
                  Neon · Supabase · Prisma ORM
                </div>
              </div>
            )}

            {/* ── Footer — metrics + CTA ── */}
            <div className="px-7 py-4 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label}>
                    <div
                      className="text-xl text-[#3fb950] leading-none"
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

              <div className="flex items-center gap-2 text-xs font-mono text-[#3fb950] group-hover:gap-3 transition-all duration-300 shrink-0">
                Read case study
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path
                    d="M0 5h12M8 1l4 4-4 4"
                    stroke="#3fb950"
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
