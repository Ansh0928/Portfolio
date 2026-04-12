import { statsBar } from "@/lib/data";

export function StatsBar() {
  return (
    <section
      id="stats"
      className="bg-[#161b22] border-y border-white/10"
      aria-label="Key metrics"
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10">
          {statsBar.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center md:px-8 first:pl-0 last:pr-0"
            >
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#3fb950] tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-[#8b949e] mt-1 tracking-wide uppercase font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
