"use client";

import { useEffect, useRef, useState } from "react";
import { statsBar } from "@/lib/data";

function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const elRef = useRef<HTMLSpanElement>(null);

  // Trigger once the element enters the viewport
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate when triggered
  useEffect(() => {
    if (!triggered) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [triggered, to, duration]);

  return (
    <span
      ref={elRef}
      className="font-mono text-4xl sm:text-5xl font-bold text-[#3fb950] tracking-tight tabular-nums"
    >
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section
      id="stats"
      className="bg-[#0d1117] border-y border-white/[0.06]"
      aria-label="Key metrics"
    >
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-0 sm:divide-x divide-white/[0.06]">
          {statsBar.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center sm:px-12"
            >
              <CountUp
                to={stat.animValue}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
              <span className="font-mono text-[11px] text-[#8b949e] uppercase tracking-[0.2em] mt-3">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
