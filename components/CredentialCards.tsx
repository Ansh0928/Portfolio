"use client";
import React, { useState, useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import PlayingCard from "@/components/ui/playing-card";

type Credential = {
  id: string;
  // PlayingCard props
  textArray: string[];
  cardTitle: string;
  cardSubtitle: string;
  outlineColor: string;
  hoverOutlineColor: string;
  inscriptionColor: string;
  inscriptionColorHovered: string;
  revealCanvasColors: number[][];
  revealCanvasBackgroundColor: string;
  // Modal content
  degree: string;
  field: string;
  institution: string;
  country: string;
  period: string;
  badge: string;
  specialisation?: string;
  highlight: string;
  pdfPath: string;
  typeColorDim: string;
};

const credentials: Credential[] = [
  {
    id: "parul",
    textArray: [],
    cardTitle: "Bachelors of Technology",
    cardSubtitle: "CSE",
    outlineColor: "#3fb950",
    hoverOutlineColor: "#56d364",
    inscriptionColor: "#3fb950",
    inscriptionColorHovered: "#56d364",
    revealCanvasColors: [
      [63, 185, 80],
      [86, 211, 100],
    ],
    revealCanvasBackgroundColor: "#0a1a0e",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Parul University",
    country: "India",
    period: "2021 – 2025",
    badge: "100% Merit Scholarship",
    highlight:
      "Awarded full academic scholarship as an international student from Nepal.",
    pdfPath: "/images/CREDENTIALS/Pdc.pdf",
    typeColorDim: "rgba(63,185,80,0.1)",
  },
  {
    id: "griffith",
    textArray: [],
    cardTitle: "Masters of IT",
    cardSubtitle: "Software Development",
    outlineColor: "#e5334b",
    hoverOutlineColor: "#ff4d63",
    inscriptionColor: "#e5334b",
    inscriptionColorHovered: "#ff4d63",
    revealCanvasColors: [
      [229, 51, 75],
      [255, 77, 99],
    ],
    revealCanvasBackgroundColor: "#1a0a0c",
    degree: "Master of Information Technology",
    field: "Information Technology",
    institution: "Griffith University",
    country: "Australia",
    period: "2025 – 2027",
    badge: "Currently Enrolled",
    specialisation: "Software Development",
    highlight:
      "Specialising in software development, applied AI, and systems architecture.",
    pdfPath: "/images/CREDENTIALS/GRIFFITH UNO.pdf",
    typeColorDim: "rgba(229,51,75,0.1)",
  },
];

export function CredentialCards() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [revealStates, setRevealStates] = useState<Record<string, boolean>>({});
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeCard ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCard]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeCard) closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  const handleCardClick = (id: string) => {
    // Toggle reveal canvas, then open modal
    setRevealStates((prev) => ({ ...prev, [id]: !prev[id] }));
    setTimeout(() => setActiveCard(id), 80);
  };

  const closeModal = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setActiveCard(null);
      setIsAnimatingOut(false);
    }, 280);
  };

  const active = credentials.find((c) => c.id === activeCard);

  return (
    <>
      {/* Tap hint */}
      <div className="flex items-center gap-2 mb-8">
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: "#484f58" }}
        >
          CLICK CARD TO EXPAND
        </span>
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            background: "#3fb950",
            animation: "tapPulse 1.8s ease-in-out infinite",
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="flex flex-col items-center gap-3"
            style={{ width: "280px" }}
          >
            <PlayingCard
              componentWidth="280px"
              aspectRatio="3/4"
              outerRounding="16px"
              innerRounding="14px"
              backgroundColor="#0d1117"
              foregroundColor="#e6edf3"
              imageHeightPercentage={28}
              imageContainerAspectRatio={cred.id === "griffith" ? "5/1" : "3/1"}
              imageSrc={
                cred.id === "parul"
                  ? "/images/parul-logo.svg"
                  : "/images/griffith-logo.svg"
              }
              imageAlt={`${cred.institution} logo`}
              cardTitle={cred.cardTitle}
              cardSubtitle={cred.cardSubtitle}
              outlineColor={cred.outlineColor}
              hoverOutlineColor={cred.hoverOutlineColor}
              textArray={cred.textArray}
              minWidth={120}
              maxWidth={220}
              minTextSize={13}
              maxTextSize={18}
              verticalPadding="12px"
              horizontalPadding="12px"
              manualLetterSpacing={-2}
              componentId={cred.id}
              revealCanvas={revealStates[cred.id] ?? false}
              onCardClicked={() => handleCardClick(cred.id)}
              textColorTransitionDelay="0.8s"
              textColorTransitionDuration="2s"
              revealCanvasBackgroundColor={cred.revealCanvasBackgroundColor}
              revealCanvasColors={cred.revealCanvasColors}
              inscriptionColor={cred.inscriptionColor}
              inscriptionColorHovered={cred.inscriptionColorHovered}
            />
            <p
              className="font-mono text-xs text-center"
              style={{ color: cred.outlineColor + "99" }}
            >
              {cred.institution}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeCard && active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.82)",
            backdropFilter: "blur(8px)",
            animation: isAnimatingOut
              ? "credFadeOut 0.28s ease forwards"
              : "credFadeIn 0.28s ease forwards",
          }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl p-7"
            style={{
              background: "linear-gradient(160deg, #161b22 0%, #0d1117 100%)",
              border: `1px solid ${active.outlineColor}44`,
              boxShadow: `0 0 60px ${active.outlineColor}22, 0 20px 60px rgba(0,0,0,0.6)`,
              animation: isAnimatingOut
                ? "credSlideDown 0.28s ease forwards"
                : "credSlideUp 0.28s ease forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#484f58] hover:text-[#e6edf3] transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="mb-5">
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: active.outlineColor }}
              >
                {active.degree}
              </span>
              <h3 className="text-[#e6edf3] text-xl font-bold mt-1 leading-tight">
                {active.field}
              </h3>
              <p className="text-[#8b949e] text-sm mt-1">
                {active.institution} · {active.country}
              </p>
            </div>

            {/* Stats */}
            <div
              className="rounded-xl p-4 mb-5 space-y-3"
              style={{
                background: active.typeColorDim,
                border: `1px solid ${active.outlineColor}22`,
              }}
            >
              {[
                { label: "Period", value: active.period },
                { label: "Country", value: active.country },
                ...(active.specialisation
                  ? [{ label: "Specialisation", value: active.specialisation }]
                  : []),
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between items-center"
                >
                  <span className="font-mono text-xs text-[#484f58] uppercase tracking-wider">
                    {row.label}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: active.outlineColor }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs mb-5"
              style={{
                background: active.typeColorDim,
                border: `1px solid ${active.outlineColor}44`,
                color: active.outlineColor,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: active.outlineColor }}
              />
              {active.badge}
            </div>

            <p className="text-[#8b949e] text-sm leading-relaxed mb-5">
              {active.highlight}
            </p>

            {/* CTA */}
            <a
              href={active.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-xl font-mono text-sm transition-opacity hover:opacity-80"
              style={{
                background: `linear-gradient(90deg, ${active.outlineColor}20, ${active.outlineColor}10)`,
                border: `1px solid ${active.outlineColor}55`,
                color: active.outlineColor,
              }}
            >
              <ExternalLink size={13} />
              View Certificate
            </a>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes credFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes credFadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes credSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes credSlideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(20px) scale(0.97);
          }
        }
        @keyframes tapPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.6);
          }
        }
      `}</style>
    </>
  );
}
