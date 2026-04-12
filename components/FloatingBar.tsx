"use client";

import { useEffect, useState } from "react";
import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { contact } from "@/lib/data";

export function FloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-center gap-1 bg-[#161b22] border border-[#3fb950]/20 rounded-lg px-2 py-1.5 shadow-xl shadow-black/40 backdrop-blur-sm">
        <a
          href="/Resume_Anshumaan_Saraf.pdf"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 text-[#3fb950] font-mono text-xs tracking-wide hover:bg-[#3fb950]/10 rounded transition-colors whitespace-nowrap"
        >
          <Download size={12} />
          Download CV
        </a>
        <div className="w-px h-4 bg-[#3fb950]/20 mx-0.5" />
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-1.5 text-[#8b949e] hover:text-[#3fb950] transition-colors rounded hover:bg-[#3fb950]/10"
        >
          <LinkedInIcon size={14} />
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-1.5 text-[#8b949e] hover:text-[#3fb950] transition-colors rounded hover:bg-[#3fb950]/10"
        >
          <GitHubIcon size={14} />
        </a>
        <a
          href={`mailto:${contact.email}`}
          aria-label="Email"
          className="p-1.5 text-[#8b949e] hover:text-[#3fb950] transition-colors rounded hover:bg-[#3fb950]/10"
        >
          <Mail size={14} />
        </a>
      </div>
    </div>
  );
}
