"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ0123456789!@#$%^&*()[]{}";
const CHAR_COUNT = 150;
const ACTIVE_COLOR = "#3fb950";
const INACTIVE_COLOR = "#21262d";
const ACTIVE_SHADOW =
  "0 0 8px rgba(63,185,80,0.9), 0 0 20px rgba(63,185,80,0.4)";

function rand(str: string) {
  return str[Math.floor(Math.random() * str.length)];
}

export function RainingLetters({ paused = false }: { paused?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialise character data
    const data = Array.from({ length: CHAR_COUNT }, () => ({
      char: rand(CHARS),
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.04 + Math.random() * 0.12,
    }));

    // Create DOM spans once
    const spans: HTMLSpanElement[] = data.map((d) => {
      const el = document.createElement("span");
      el.textContent = d.char;
      Object.assign(el.style, {
        position: "absolute",
        fontFamily: "monospace",
        fontSize: "1rem",
        transform: "translate(-50%, -50%)",
        left: `${d.x}%`,
        top: `${d.y}%`,
        color: INACTIVE_COLOR,
        opacity: "0.65",
        userSelect: "none",
        pointerEvents: "none",
        willChange: "top",
        transition: "color 0.12s, text-shadow 0.12s",
      });
      container.appendChild(el);
      return el;
    });

    // Flicker: swap active set every 60 ms
    const activeSet = new Set<number>();
    const flickerId = setInterval(() => {
      if (pausedRef.current) return;
      activeSet.forEach((i) => {
        spans[i].style.color = INACTIVE_COLOR;
        spans[i].style.textShadow = "none";
        spans[i].style.opacity = "0.65";
      });
      activeSet.clear();
      const count = 4 + Math.floor(Math.random() * 5);
      for (let k = 0; k < count; k++) {
        const idx = Math.floor(Math.random() * CHAR_COUNT);
        activeSet.add(idx);
        spans[idx].style.color = ACTIVE_COLOR;
        spans[idx].style.textShadow = ACTIVE_SHADOW;
        spans[idx].style.opacity = "1";
      }
    }, 60);

    // RAF loop: move characters downward
    let rafId = 0;
    const tick = () => {
      if (!pausedRef.current) {
        for (let i = 0; i < CHAR_COUNT; i++) {
          data[i].y += data[i].speed;
          if (data[i].y >= 105) {
            data[i].y = -5;
            data[i].x = Math.random() * 100;
            data[i].char = rand(CHARS);
            spans[i].textContent = data[i].char;
            spans[i].style.left = `${data[i].x}%`;
          }
          spans[i].style.top = `${data[i].y}%`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(flickerId);
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      spans.forEach((s) => s.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
