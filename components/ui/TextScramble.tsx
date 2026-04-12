"use client";

import { useEffect, useState, useRef } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

function scrambleText(target: string, progress: number): string {
  return target
    .split("")
    .map((char, i) => {
      if (i < progress) return char;
      if (char === " ") return " ";
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    })
    .join("");
}

type Props = {
  phrases: readonly string[] | string[];
  className?: string;
};

export function TextScramble({ phrases, className }: Props) {
  const [displayed, setDisplayed] = useState(phrases[0]);
  const phraseIndex = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    let cancelled = false;

    const animate = (phrase: string) => {
      return new Promise<void>((resolve) => {
        let progress = 0;
        const step = () => {
          if (cancelled) return resolve();
          setDisplayed(scrambleText(phrase, progress));
          progress++;
          if (progress > phrase.length) return resolve();
          rafId.current = requestAnimationFrame(step);
        };
        rafId.current = requestAnimationFrame(step);
      });
    };

    const loop = async () => {
      while (!cancelled) {
        const phrase = phrases[phraseIndex.current % phrases.length];
        await animate(phrase);
        if (cancelled) break;
        await new Promise((r) => setTimeout(r, 2500));
        phraseIndex.current++;
      }
    };

    loop();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId.current);
    };
  }, [phrases]);

  return <span className={className}>{displayed}</span>;
}
