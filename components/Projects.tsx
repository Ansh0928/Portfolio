"use client";

import { projects } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {projects.map((project) => (
        <MotionSection
          key={project.id}
          className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-white/20 transition-colors group"
          aria-label={`${project.id} project`}
        >
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-lg font-mono font-bold text-[#e6edf3] capitalize">
                {project.id}
              </h3>
              <div className="flex gap-2 shrink-0">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  aria-label={`${project.id} GitHub repository`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#8b949e] hover:text-[#3fb950] transition-colors"
                    aria-label={`${project.id} live site`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 rounded-full mb-3">
              {project.badge}
            </span>

            <p className="text-[#e6edf3] text-sm font-medium mb-3 italic">
              &ldquo;{project.tagline}&rdquo;
            </p>

            <p className="text-[#8b949e] text-sm leading-relaxed">
              {project.story}
            </p>
          </div>

          <div className="border-t border-white/10 px-6 py-4 flex flex-wrap gap-2">
            {project.techTags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs font-mono bg-white/5 text-[#8b949e] rounded-full border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </MotionSection>
      ))}
    </div>
  );
}
