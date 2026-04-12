import { MotionSection } from "@/components/ui/MotionSection";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { experience } from "@/lib/data";
import type { ExperienceEntry } from "@/lib/data";

function TimelineDot() {
  return (
    <div className="hidden md:flex flex-col items-center" aria-hidden="true">
      <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950] ring-2 ring-[#3fb950]/30 mt-1.5 shrink-0" />
      <div className="w-px flex-1 bg-white/10 mt-2" />
    </div>
  );
}

function EntryHeader({ entry }: { entry: ExperienceEntry }) {
  return (
    <div className="mb-4">
      <h3 className="text-[#e6edf3] font-mono font-semibold text-base leading-snug">
        {entry.company}
      </h3>
      <p className="text-[#3fb950] font-mono text-sm mt-0.5">{entry.role}</p>
      <p className="text-[#8b949e] font-mono text-xs mt-0.5">{entry.period}</p>
    </div>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="space-y-2">
      {bullets.map((bullet, i) => (
        <li
          key={i}
          className="flex gap-2 text-[#8b949e] text-sm leading-relaxed"
        >
          <span className="text-[#3fb950] font-mono shrink-0 mt-0.5">→</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const hasPhotos = entry.photos && entry.photos.length > 0;

  return (
    <div className="flex gap-4 md:gap-6">
      <TimelineDot />

      <div className="flex-1 pb-10">
        <div className="rounded-lg border border-white/10 bg-[#161b22] p-6">
          {hasPhotos ? (
            /* Parul: two-column on desktop, stacked on mobile */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <EntryHeader entry={entry} />
                <BulletList bullets={entry.bullets} />
              </div>
              <div>
                <PhotoCarousel photos={entry.photos!} />
              </div>
            </div>
          ) : (
            /* Tasman: single column */
            <div>
              <EntryHeader entry={entry} />
              <BulletList bullets={entry.bullets} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <MotionSection id="experience" className="max-w-5xl mx-auto px-6 py-20">
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-2">
        Experience
      </h2>
      <p className="text-[#e6edf3] font-mono text-2xl font-semibold mb-10">
        Embedded at
      </p>

      <div>
        {experience.map((entry) => (
          <ExperienceCard
            key={`${entry.company}-${entry.period}`}
            entry={entry}
          />
        ))}
      </div>
    </MotionSection>
  );
}
