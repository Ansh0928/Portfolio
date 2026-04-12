"use client";

import { useState, useEffect } from "react";
import { projects, type ProjectData } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
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
      aria-label={`${project.id} project details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#0d1117] border-b border-white/10 px-6 py-5 flex items-start justify-between gap-4">
          <div>
            <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 rounded-full mb-2">
              {project.badge}
            </span>
            <h2 className="text-2xl font-mono font-bold text-[#e6edf3] capitalize">
              {project.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#e6edf3] transition-colors p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
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

        {/* Tagline */}
        <div className="px-6 py-5 border-b border-white/10">
          <p className="text-[#e6edf3] text-base font-medium italic leading-relaxed">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>

        {/* Story */}
        <div className="px-6 py-5 border-b border-white/10">
          <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
            The Story
          </h4>
          <p className="text-[#8b949e] text-sm leading-relaxed">
            {project.story}
          </p>
        </div>

        {/* Tech tags + links */}
        <div className="px-6 py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-xs font-mono bg-white/5 text-[#8b949e] border border-white/10 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4 shrink-0">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono text-[#3fb950] hover:underline"
              >
                Live Site ↗
              </a>
            )}
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-[#58a6ff] hover:underline"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {projects.map((project) => (
          <MotionSection key={project.id} aria-label={`${project.id} project`}>
            <button
              onClick={() => setActiveProject(project)}
              className="w-full h-full text-left bg-[#161b22] border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-[#58a6ff]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(88,166,255,0.07)] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]"
            >
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-mono font-bold text-[#e6edf3] capitalize group-hover:text-white transition-colors">
                    {project.id}
                  </h3>
                  {/* Icon hint */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-[#8b949e] group-hover:text-[#58a6ff] transition-colors shrink-0 mt-0.5"
                  >
                    <path d="M8 1h7v7M15 1L7 9M6 3H2a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V9" />
                  </svg>
                </div>

                <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 rounded-full mb-3">
                  {project.badge}
                </span>

                <p className="text-[#e6edf3] text-sm font-medium mb-3 italic line-clamp-2">
                  &ldquo;{project.tagline}&rdquo;
                </p>

                <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-3">
                  {project.story}
                </p>
              </div>

              <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.techTags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs font-mono bg-white/5 text-[#8b949e] rounded-full border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                  {project.techTags.length > 3 && (
                    <span className="text-xs font-mono text-[#8b949e]">
                      +{project.techTags.length - 3}
                    </span>
                  )}
                </div>
                <span className="text-sm font-mono text-[#58a6ff] flex items-center gap-1 group-hover:gap-2 transition-all shrink-0">
                  Read more <span aria-hidden>→</span>
                </span>
              </div>
            </button>
          </MotionSection>
        ))}
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
