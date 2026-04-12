"use client";

import { contact } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Contact() {
  return (
    <MotionSection id="contact" className="px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-mono font-bold text-[#e6edf3] mb-4">
          Got a problem that costs time or money?
        </h2>
        <p className="text-[#8b949e] text-base leading-relaxed mb-10">
          I embed with your business, understand the problem deeply, and build
          the system that fixes it. Let&apos;s talk.
        </p>

        {/* Buttons row */}
        <div className="flex flex-wrap gap-3 justify-center">
          {/* Email — primary */}
          <a
            href={`mailto:${contact.email}`}
            className="px-5 py-2.5 font-mono text-sm font-medium rounded-lg transition-all bg-[#3fb950] text-[#0d1117] hover:bg-[#3fb950]/90"
          >
            Email
          </a>

          {/* Resume — outline */}
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 font-mono text-sm font-medium rounded-lg transition-all border border-[#3fb950]/40 text-[#3fb950] hover:border-[#3fb950] hover:bg-[#3fb950]/10"
          >
            Resume ↓
          </a>

          {/* GitHub — outline */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 font-mono text-sm font-medium rounded-lg transition-all border border-[#3fb950]/40 text-[#3fb950] hover:border-[#3fb950] hover:bg-[#3fb950]/10"
          >
            GitHub ↗
          </a>

          {/* LinkedIn — outline */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 font-mono text-sm font-medium rounded-lg transition-all border border-[#3fb950]/40 text-[#3fb950] hover:border-[#3fb950] hover:bg-[#3fb950]/10"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Footer */}
        <p className="text-[#484f58] text-xs mt-16">
          &copy; 2026 Anshumaan Saraf
        </p>
      </div>
    </MotionSection>
  );
}
