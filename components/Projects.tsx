"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
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
        {projects.map((project, i) => (
          <MotionSection key={project.id} aria-label={`${project.id} project`}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onClick={() => setActiveProject(project)}
              className="group relative w-full h-full text-left overflow-hidden rounded-2xl border border-white/10 bg-[#161b22]/60 backdrop-blur-md transition-all duration-300 hover:border-[#3fb950]/40 hover:shadow-xl hover:shadow-[#3fb950]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
            >
              {/* Image */}
              {project.image && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.id}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                  {/* Tags */}
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {project.techTags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[#0d1117]/60 px-2.5 py-0.5 text-xs font-mono text-[#8b949e] backdrop-blur-sm border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Hover CTA */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]/20 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-[#3fb950] px-6 py-2.5 text-sm font-mono font-medium text-[#0d1117] shadow-lg shadow-[#3fb950]/25">
                      <BookOpen className="h-4 w-4" />
                      View Project
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col gap-4 p-5">
                <div className="space-y-2">
                  <h3 className="text-lg font-mono font-semibold capitalize text-[#e6edf3] transition-colors group-hover:text-[#3fb950]">
                    {project.id}
                  </h3>
                  <p className="line-clamp-2 text-sm font-mono text-[#8b949e]">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="rounded-full bg-[#58a6ff]/10 px-2.5 py-0.5 text-xs font-mono text-[#58a6ff] border border-[#58a6ff]/20">
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#8b949e]">
                    <Clock className="h-3 w-3" />
                    <span>{project.techTags.length} technologies</span>
                  </div>
                </div>
              </div>
            </motion.button>
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
