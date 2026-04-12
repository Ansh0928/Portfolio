"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { ParulPhoto } from "@/lib/data";

type Props = {
  photos: ParulPhoto[];
};

export function PhotoCarousel({ photos }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(next, 4000);
  }, [next]);

  const stopAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "ArrowRight")
          setLightbox((l) => ((l ?? 0) + 1) % photos.length);
        if (e.key === "ArrowLeft")
          setLightbox((l) => ((l ?? 0) - 1 + photos.length) % photos.length);
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, lightbox, photos.length]);

  const photo = photos[current];

  return (
    <div
      role="region"
      aria-label="Parul University experience photos"
      className="relative"
      onMouseEnter={stopAuto}
      onMouseLeave={startAuto}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-[#161b22] cursor-pointer group">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={current === 0}
          onClick={() => setLightbox(current)}
          aria-label={photo.highlight ? `Credential: ${photo.alt}` : photo.alt}
        />

        {photo.highlight && (
          <div
            className="absolute top-3 left-3 px-2 py-1 bg-amber-500/90 text-black text-xs font-mono font-bold rounded-full border border-amber-400"
            aria-label="Credential: Letter of Appreciation from Parul University"
          >
            ✓ Credential
          </div>
        )}

        {photo.highlight && (
          <div className="absolute inset-0 ring-2 ring-amber-400/60 rounded-lg pointer-events-none" />
        )}

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded px-2 py-1 text-xs text-white font-mono">
          ↗ expand
        </div>
      </div>

      <p className="text-xs text-[#8b949e] font-mono mt-2 text-center">
        {photo.caption}
      </p>

      <div className="flex items-center justify-between mt-3">
        <button
          onClick={prev}
          className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          aria-label="Previous photo"
        >
          ←
        </button>

        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Photo navigation"
        >
          {photos.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Photo ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-[#3fb950] w-4" : "bg-white/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          aria-label="Next photo"
        >
          →
        </button>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="text-center text-sm text-[#8b949e] font-mono mt-3">
              {photos[lightbox].caption}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-0 right-0 -mt-8 text-[#8b949e] hover:text-white font-mono text-sm"
              aria-label="Close lightbox"
            >
              [ESC] close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
