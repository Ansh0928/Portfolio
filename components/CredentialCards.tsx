"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

type Credential = {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  dimColor: string;
  typeLabel: string;
  hpLabel: string;
  hpValue: string;
  logoSrc: string;
  logoAlt: string;
  logoAspect: string;
  cardName: string;
  cardSubtype: string;
  flavorText: string;
  stats: { label: string; value: string }[];
  moveName: string;
  moveDesc: string;
  moveDamage: string;
  rarity: string;
  cardNumber: string;
  degree: string;
  field: string;
  institution: string;
  country: string;
  period: string;
  badge: string;
  highlight: string;
  pdfPath: string;
};

const credentials: Credential[] = [
  {
    id: "parul",
    primaryColor: "#3fb950",
    secondaryColor: "#0a1a0e",
    dimColor: "rgba(63,185,80,0.12)",
    typeLabel: "MERIT",
    hpLabel: "SCHOLARSHIP",
    hpValue: "100%",
    logoSrc: "/images/parul-logo.svg",
    logoAlt: "Parul University",
    logoAspect: "3/1",
    cardName: "B.Tech — CSE",
    cardSubtype: "Computer Science & Engineering",
    flavorText:
      "Full merit scholarship awarded to an international student. Excellence has no borders.",
    stats: [
      { label: "PERIOD", value: "2021 – 2025" },
      { label: "COUNTRY", value: "India" },
      { label: "FIELD", value: "CSE" },
    ],
    moveName: "Full Stack Development",
    moveDesc: "Built and shipped production systems end-to-end",
    moveDamage: "+100",
    rarity: "★",
    cardNumber: "001 / 002",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Parul University",
    country: "India",
    period: "2021 – 2025",
    badge: "100% Merit Scholarship",
    highlight:
      "Awarded full academic scholarship as an international student from Nepal.",
    pdfPath: "/images/CREDENTIALS/Pdc.pdf",
  },
  {
    id: "griffith",
    primaryColor: "#e5334b",
    secondaryColor: "#1a0a0c",
    dimColor: "rgba(229,51,75,0.12)",
    typeLabel: "ACTIVE",
    hpLabel: "STATUS",
    hpValue: "ENROLLED",
    logoSrc: "/images/griffith-logo.svg",
    logoAlt: "Griffith University",
    logoAspect: "5/1",
    cardName: "M.IT — Software Dev",
    cardSubtype: "Software Development",
    flavorText:
      "Specialising in applied AI and systems architecture while building in the real world.",
    stats: [
      { label: "PERIOD", value: "2025 – 2027" },
      { label: "COUNTRY", value: "Australia" },
      { label: "SPEC", value: "Software Dev" },
    ],
    moveName: "AI Systems Architecture",
    moveDesc: "Design and deploy production AI pipelines",
    moveDamage: "+150",
    rarity: "★",
    cardNumber: "002 / 002",
    degree: "Master of Information Technology",
    field: "Information Technology",
    institution: "Griffith University",
    country: "Australia",
    period: "2025 – 2027",
    badge: "Currently Enrolled",
    highlight:
      "Specialising in software development, applied AI, and systems architecture.",
    pdfPath: "/images/CREDENTIALS/GRIFFITH UNO.pdf",
  },
];

function PokemonCard({
  cred,
  onClick,
}: {
  cred: Credential;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x, y, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShine({ x: 50, y: 50, active: false });
  }, []);

  const rotX = shine.active ? (shine.y - 50) * -0.12 : 0;
  const rotY = shine.active ? (shine.x - 50) * 0.12 : 0;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "260px",
        cursor: "pointer",
        transform: shine.active
          ? `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: shine.active
          ? "transform 0.05s ease"
          : "transform 0.4s ease",
        position: "relative",
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: "-3px",
          borderRadius: "18px",
          background: `linear-gradient(135deg, ${cred.primaryColor}cc, ${cred.primaryColor}44, ${cred.primaryColor}88)`,
          opacity: shine.active ? 1 : 0.6,
          transition: "opacity 0.3s ease",
          zIndex: 0,
        }}
      />

      {/* Card body */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "16px",
          background: `linear-gradient(160deg, #161b22 0%, #0d1117 60%, ${cred.secondaryColor} 100%)`,
          border: `1px solid ${cred.primaryColor}55`,
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* Holographic overlay */}
        {shine.active && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, ${cred.primaryColor}18 0%, transparent 60%)`,
              borderRadius: "16px",
            }}
          />
        )}

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px 8px",
            borderBottom: `1px solid ${cred.primaryColor}22`,
            background: `linear-gradient(90deg, ${cred.primaryColor}18, transparent)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: cred.primaryColor,
                background: `${cred.primaryColor}22`,
                border: `1px solid ${cred.primaryColor}44`,
                borderRadius: "4px",
                padding: "2px 5px",
              }}
            >
              {cred.typeLabel}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#e6edf3",
                letterSpacing: "0.01em",
              }}
            >
              {cred.cardName}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "1px",
            }}
          >
            <span
              style={{
                fontSize: "7px",
                fontFamily: "monospace",
                color: "#484f58",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {cred.hpLabel}
            </span>
            <span
              style={{
                fontSize: "11px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: cred.primaryColor,
              }}
            >
              {cred.hpValue}
            </span>
          </div>
        </div>

        {/* Illustration panel */}
        <div
          style={{
            margin: "10px 12px",
            borderRadius: "10px",
            background: `linear-gradient(145deg, ${cred.secondaryColor} 0%, #0d1117 50%, ${cred.primaryColor}18 100%)`,
            border: `1px solid ${cred.primaryColor}33`,
            height: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner decorations */}
          <div
            style={{
              position: "absolute",
              top: "6px",
              left: "8px",
              width: "16px",
              height: "16px",
              borderTop: `1.5px solid ${cred.primaryColor}55`,
              borderLeft: `1.5px solid ${cred.primaryColor}55`,
              borderRadius: "2px 0 0 0",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "6px",
              right: "8px",
              width: "16px",
              height: "16px",
              borderBottom: `1.5px solid ${cred.primaryColor}55`,
              borderRight: `1.5px solid ${cred.primaryColor}55`,
              borderRadius: "0 0 2px 0",
            }}
          />
          {/* Logo */}
          <div
            style={{
              position: "relative",
              width: "75%",
              aspectRatio: cred.logoAspect,
              maxHeight: "55px",
            }}
          >
            <Image
              src={cred.logoSrc}
              alt={cred.logoAlt}
              fill
              unoptimized={cred.logoSrc.endsWith(".svg")}
              style={{ objectFit: "contain" }}
              priority
              sizes="200px"
            />
          </div>
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              color: cred.primaryColor,
              opacity: 0.6,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {cred.logoAlt} ·{" "}
            {cred.stats.find((s) => s.label === "COUNTRY")?.value}
          </span>
        </div>

        {/* Subtype + flavor */}
        <div style={{ padding: "0 14px 8px" }}>
          <p
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: cred.primaryColor,
              opacity: 0.8,
              letterSpacing: "0.08em",
              marginBottom: "4px",
            }}
          >
            {cred.cardSubtype}
          </p>
          <p
            style={{
              fontSize: "9px",
              fontStyle: "italic",
              color: "#484f58",
              lineHeight: 1.5,
            }}
          >
            &ldquo;{cred.flavorText}&rdquo;
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            margin: "0 14px",
            background: `linear-gradient(90deg, transparent, ${cred.primaryColor}33, transparent)`,
          }}
        />

        {/* Stats */}
        <div style={{ padding: "8px 14px" }}>
          {cred.stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "3px",
              }}
            >
              <span
                style={{
                  fontSize: "8px",
                  fontFamily: "monospace",
                  color: "#484f58",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </span>
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  color: "#8b949e",
                }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            margin: "0 14px",
            background: `linear-gradient(90deg, transparent, ${cred.primaryColor}33, transparent)`,
          }}
        />

        {/* Move / Attack */}
        <div
          style={{
            margin: "8px 12px",
            borderRadius: "8px",
            background: cred.dimColor,
            border: `1px solid ${cred.primaryColor}22`,
            padding: "8px 10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#e6edf3",
              }}
            >
              {cred.moveName}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: cred.primaryColor,
              }}
            >
              {cred.moveDamage}
            </span>
          </div>
          <p
            style={{
              fontSize: "8.5px",
              color: "#8b949e",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {cred.moveDesc}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 14px 10px",
            borderTop: `1px solid ${cred.primaryColor}11`,
          }}
        >
          <span
            style={{
              fontSize: "9px",
              fontFamily: "monospace",
              color: cred.primaryColor,
              opacity: 0.6,
            }}
          >
            {cred.rarity} {cred.cardNumber}
          </span>
          <span
            style={{
              fontSize: "8px",
              fontFamily: "monospace",
              color: "#484f58",
              letterSpacing: "0.1em",
            }}
          >
            CLICK TO EXPAND
          </span>
        </div>
      </div>
    </div>
  );
}

export function CredentialCards() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
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
      <div className="flex flex-col sm:flex-row gap-10 justify-center items-start">
        {credentials.map((cred) => (
          <PokemonCard
            key={cred.id}
            cred={cred}
            onClick={() => setActiveCard(cred.id)}
          />
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
              border: `1px solid ${active.primaryColor}44`,
              boxShadow: `0 0 60px ${active.primaryColor}22, 0 20px 60px rgba(0,0,0,0.6)`,
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

            <div className="mb-5">
              <span
                className="font-mono text-xs tracking-widest uppercase"
                style={{ color: active.primaryColor }}
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

            <div
              className="rounded-xl p-4 mb-5 space-y-3"
              style={{
                background: active.dimColor,
                border: `1px solid ${active.primaryColor}22`,
              }}
            >
              {[
                { label: "Period", value: active.period },
                { label: "Country", value: active.country },
                ...(active.id === "griffith"
                  ? [{ label: "Specialisation", value: "Software Development" }]
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
                    style={{ color: active.primaryColor }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs mb-5"
              style={{
                background: active.dimColor,
                border: `1px solid ${active.primaryColor}44`,
                color: active.primaryColor,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: active.primaryColor }}
              />
              {active.badge}
            </div>

            <p className="text-[#8b949e] text-sm leading-relaxed mb-5">
              {active.highlight}
            </p>

            <a
              href={active.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-xl font-mono text-sm transition-opacity hover:opacity-80"
              style={{
                background: `linear-gradient(90deg, ${active.primaryColor}20, ${active.primaryColor}10)`,
                border: `1px solid ${active.primaryColor}55`,
                color: active.primaryColor,
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
      `}</style>
    </>
  );
}
