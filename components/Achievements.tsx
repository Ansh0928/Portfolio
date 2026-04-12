"use client";

import { achievements, certifications } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Achievements() {
  return (
    <MotionSection id="achievements" className="max-w-4xl mx-auto px-6 py-20">
      <p className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Recognition
      </p>
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-8">
        Achievements
      </h2>

      {/* Hackathon cards — side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {achievements.map((achievement) => (
          <div
            key={achievement.title}
            className="bg-[#161b22] border border-white/10 rounded-xl p-6"
          >
            <div className="text-3xl mb-3">{achievement.icon}</div>
            <h3 className="font-mono font-bold text-[#e6edf3] mb-2 leading-snug">
              {achievement.title}
            </h3>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>

      {/* Certifications row */}
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert) => (
          <a
            key={cert.label}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-[#8b949e] hover:text-[#e6edf3] hover:border-[#3fb950]/50 transition-colors"
          >
            {cert.label}
          </a>
        ))}
      </div>
    </MotionSection>
  );
}
