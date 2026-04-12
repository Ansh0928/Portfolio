# Portfolio Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Anshumaan Saraf's personal portfolio as a Next.js 15 static site with dark builder aesthetic, canvas animation, photo carousel, and all 9 sections per spec.

**Architecture:** Next.js 15 App Router, fully static export. All content lives in `lib/data.ts`. Server components for all sections except canvas/carousel/navbar (client). Framer Motion via `MotionSection` wrapper keeps client boundary clean.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, next/image, Playwright (E2E)

---

### Task 1: Scaffold Next.js 15 Project

**Files:**

- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/globals.css`

- [ ] **Step 1: Init Next.js 15 project with TS + Tailwind**

```bash
cd /Users/anshumaansaraf/Desktop/Projects/PRTFOLIO
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint --yes
```

Expected: Project scaffolded, `package.json` created with next 15.x.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion
npm install -D @playwright/test
npx playwright install --with-deps chromium
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init --yes --base-color slate
```

- [ ] **Step 4: Replace globals.css with design tokens**

File: `app/globals.css`

```css
@import "tailwindcss";

:root {
  --background: #0d1117;
  --surface: #161b22;
  --border: rgba(255, 255, 255, 0.1);
  --accent: #3fb950;
  --link: #58a6ff;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --text-muted: #484f58;
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--accent);
  color: var(--background);
}
```

- [ ] **Step 5: Update tailwind.config.ts with CSS variable bridge**

File: `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        link: "var(--link)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderColor: {
        DEFAULT: "var(--border)",
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 6: Update next.config.ts**

File: `next.config.ts`

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default config;
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 15 portfolio project"
```

---

### Task 2: Create lib/data.ts — Single Source of Truth

**Files:**

- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/data.ts with all types and content**

```ts
// lib/data.ts — ALL content lives here. Components are purely presentational.

// ─── Types ───────────────────────────────────────────────────────────────────

export type StatMetric = { value: string; label: string };

export type ProjectCard = {
  title: string;
  badge: string;
  tagline: string;
  story: string;
  tech: string[];
  links: { live?: string; github: string };
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

export type Achievement = { emoji: string; title: string; description: string };

export type Certification = {
  name: string;
  issuer: string;
  credentialUrl?: string;
};

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  highlight?: boolean;
};

export type CaseStudyData = {
  title: string;
  metrics: { label: string; value: string }[];
  quadrants: { label: string; content: string }[];
  pipelineTags: string[];
  techTags: string[];
  links: { live?: string; github: string };
};

export type TechTag = { name: string; primary?: boolean };

export type BeliefSection = { category: string; items: string[] };

// ─── Hero ────────────────────────────────────────────────────────────────────

export const heroPhrases = [
  "FORWARD DEPLOYED ENGINEER",
  "I BUILD SYSTEMS",
  "GOLD COAST, AU",
] as const;

export const heroSubheadline =
  "I don't just write code. I embed with your business, understand the problem, and build the system that solves it.";

// ─── Stats Bar ───────────────────────────────────────────────────────────────

export const statsBar: StatMetric[] = [
  { value: "$300k+", label: "Revenue supported" },
  { value: "5 days", label: "Days to $10k revenue" },
  { value: "$26k+", label: "SaaS/yr saved" },
  { value: "🏆 1st Place", label: "Hackathon" },
];

// ─── Case Studies ─────────────────────────────────────────────────────────────

export const caseStudies: CaseStudyData[] = [
  {
    title: "Tasman Star Seafood",
    metrics: [
      { label: "SaaS/yr saved", value: "$26k+" },
      { label: "Days to $10k revenue", value: "5 days" },
      { label: "Revenue supported", value: "$300k+" },
    ],
    quadrants: [
      {
        label: "The Problem",
        content:
          "QLD's #1 seafood company — fishing fleet, 2 retail stores, wholesale, transport — running on an old Shopify store with no unified tech infrastructure.",
      },
      {
        label: "The Hustle",
        content:
          'Built their website before the interview. Walked in and said: "This website doesn\'t matter if you have no revenue from it." Got the job. First production role — 24hrs/week as an international student.',
      },
      {
        label: "What I Built",
        content:
          "Eliminated Shopify (saving $20k+/yr). Custom full-stack e-commerce: dynamic pricing, RBAC (super admin / admin / staff / wholesale), inventory system, iOS delivery verification app, transport booking app, AI-powered stock management pipeline.",
      },
      {
        label: "The Hard Parts",
        content:
          "No production experience. Learned by talking to IBM, Amazon & CrowdStrike engineers on the bus. Navigated Australian privacy law (ACL, Privacy Act, PCI DSS), human resistance to change, and my own tendency to ship fast without documenting.",
      },
    ],
    pipelineTags: [
      "E-commerce + Dynamic Pricing",
      "Inventory System",
      "Transport Booking App",
      "iOS Delivery Verification",
      "AI Stock Management",
      "RBAC + Wholesale Portal",
      "SEO/AEO/GEO",
    ],
    techTags: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "LangChain",
      "Swift",
      "Vercel",
    ],
    links: {
      live: undefined,
      github: "https://github.com/anshumaansaraf",
    },
  },
];

// ─── Project Cards ────────────────────────────────────────────────────────────

export const projects: ProjectCard[] = [
  {
    title: "Medicrew",
    badge: "REJECTED → ITERATED",
    tagline: "What if 8 AI doctors argued about your diagnosis?",
    story:
      "Sister is a physiotherapist. Australian healthcare takes too long, especially in rural Gold Coast aged-care areas. Built a multi-agent debate framework: 8 AI residents argue, supervising agent synthesizes, doctors get structured report on their portal. Applied to Alexa Lumina Health — rejected. Discovered Heidi doing something similar, scraped their approach, iterated, redesigned.",
    tech: ["Next.js", "LangChain", "Ollama", "Docker", "shadcn/ui"],
    links: {
      live: undefined,
      github: "https://github.com/anshumaansaraf",
    },
  },
  {
    title: "Ambassador",
    badge: "BUILT FROM FRUSTRATION",
    tagline: "The bus didn't stop. So I built the complaint system.",
    story:
      "Gold Coast public transport as an international student — the bus doesn't always stop, nowhere to complain. Built real-time geospatial complaint platform: AI classifies severity, maps issues by location, council admins see a live command center. Proof that AI belongs in everyday civic infrastructure.",
    tech: [
      "Next.js",
      "TypeScript",
      "SSE",
      "AI Classification",
      "Geospatial maps",
    ],
    links: {
      live: undefined,
      github: "https://github.com/anshumaansaraf",
    },
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experience: ExperienceEntry[] = [
  {
    company: "Tasman Star Seafood",
    role: "Forward Deployed Engineer",
    period: "Feb 2026 – Present",
    bullets: [
      "Replaced Shopify + Fresho SaaS saving $26k+/year with custom full-stack platform",
      "Shipped e-commerce with RBAC, dynamic pricing, inventory — drove $10k+ in 5 days",
      "Architecting unified AI infrastructure for stock management across warehouse + retail",
    ],
  },
  {
    company: "Parul University — Center for International Relations",
    role: "Admin Executive",
    period: "Nov 2022 – Jan 2025",
    bullets: [
      "Led 5 interns as head of the department's digital operations",
      "Grew social media from 10 → 4,000 followers (400x) through content strategy",
      "Collaborated directly with the Director on international event delivery for 500+ attendees",
    ],
  },
];

// ─── Leadership Photos (Parul University) ─────────────────────────────────────

export const parulPhotos: Photo[] = [
  {
    src: "/images/leadership/parul-slide-1-admin-block-group.png",
    alt: "Department group photo at Parul University Administrative Block",
    caption: "Leading department operations — 500+ attendee events",
  },
  {
    src: "/images/leadership/parul-slide-3-letter-appreciation.png",
    alt: "Letter of Appreciation from Director, Center for International Relations",
    caption:
      "Letter of Appreciation — Director, Center for International Relations",
    highlight: true,
  },
  {
    src: "/images/leadership/parul-slide-5-bristol-partnership.png",
    alt: "With Director of Global Partnerships, University of Bristol",
    caption: "University of Bristol Global Partnerships collaboration",
  },
  {
    src: "/images/leadership/parul-slide-4-international-students.png",
    alt: "International student community at Parul University",
    caption: "International Relations — multicultural community programs",
  },
  {
    src: "/images/leadership/parul-slide-2-personal-network.png",
    alt: "Professional network and community events",
    caption: "Building community across roles and events",
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────

export const achievements: Achievement[] = [
  {
    emoji: "🏆",
    title: "GC Innovation Hub AI Hackathon — 1st Place",
    description:
      'Built "Alumni Quest Hub" for Tech Ready Women. Gamified alumni retention platform, fully functional in 48 hours.',
  },
  {
    emoji: "🥈",
    title: "ANZ Cyber Crime Hackathon — Top 5",
    description:
      "Security platform with AI detection + Blockchain audit logs. Simulated threats with Kali Linux under time pressure.",
  },
];

export const certifications: Certification[] = [
  { name: "Full Stack Dev", issuer: "GFG", credentialUrl: undefined },
  { name: "DSA", issuer: "TUF+", credentialUrl: undefined },
  { name: "Google Data Analytics", issuer: "Google", credentialUrl: undefined },
  { name: "AWS Cloud", issuer: "AWS", credentialUrl: undefined },
  { name: "Data Analytics Python", issuer: "NPTEL", credentialUrl: undefined },
];

// ─── Tech Stack ───────────────────────────────────────────────────────────────

export const techStack: TechTag[] = [
  { name: "Next.js", primary: true },
  { name: "TypeScript", primary: true },
  { name: "React", primary: true },
  { name: "LangChain", primary: true },
  { name: "PostgreSQL" },
  { name: "Prisma" },
  { name: "Supabase" },
  { name: "Docker" },
  { name: "Ollama" },
  { name: "Swift" },
  { name: "Vue" },
  { name: "Framer Motion" },
  { name: "shadcn/ui" },
  { name: "Vercel" },
  { name: "Git" },
  { name: "Figma" },
];

// ─── Beliefs ──────────────────────────────────────────────────────────────────

export const beliefs: BeliefSection[] = [
  {
    category: "On AI",
    items: [
      "For people like me, AI is a goldmine in a gold rush. Imagination and execution are the only limits.",
      "The best way to understand AI isn't a course. It's a dinner table conversation with your family.",
      "If you can explain what you're building to your mum and she gets excited — you're building something real.",
      "AI didn't make me a developer. It made me a faster thinker.",
      "The engineers who'll win aren't the ones who fear AI. They're the ones already building with it.",
      "AI-native teams will move 10x faster than those unwilling to change.",
    ],
  },
  {
    category: "On shipping",
    items: [
      "Shipping fast beats the best strategy. The market tells you more than any planning session.",
      "_I built their website before the interview. That's still the best decision I've ever made._",
      "A working demo says more than a fifty-slide deck.",
      "The goal isn't perfect code. The goal is something that works in production.",
      "Landings > launches. Adoption matters more than shipping.",
      "Listen, build, ship, tell the customer, then repeat forever.",
    ],
  },
  {
    category: "On learning",
    items: [
      "You learn more from one real conversation than from ten tutorials. Talk to people.",
      "Talk to your family about what you're building. Especially your mum. You'll understand it better yourself.",
      "Rejection is just a dataset. Iterate anyway.",
      "Grit > talent. Every time.",
      "There's no substitute for putting in the hours.",
      'The engineers I respect most are the ones most willing to say "I don\'t know yet."',
    ],
  },
  {
    category: "On business & engineering",
    items: [
      '_"This website doesn\'t matter if you have no revenue from it."_',
      "Understand the workflow before you touch the code.",
      "The business doesn't care how elegant the code is. It cares if it works.",
      "Revenue validates everything. Features validate nothing on their own.",
      "The problem is always worth more time than the solution you already thought of.",
      "Make-vs-buy is a strategy question first, an engineering question second.",
    ],
  },
  {
    category: "On communication",
    items: [
      "Clear writing is clear thinking. If you can't write it simply, you don't understand it yet.",
      "Communication is the job. The code is just the output.",
      "Say the right thing, to the right people, at the right time.",
      "Mismatched expectations always lead to sadness.",
    ],
  },
  {
    category: "On being you",
    items: [
      "Your constraints are your advantage. Pressure creates shape.",
      "Being new to something means you ask the questions everyone else forgot to ask.",
      "Own your failures publicly. It builds more trust than any portfolio.",
      "Have strong opinions, loosely held.",
      "Influence > titles. Always.",
      "_Still learning. Still growing. Still making mistakes worth documenting._",
    ],
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contact = {
  email: "anshumaansaraf24@gmail.com",
  github: "https://github.com/anshumaansaraf",
  linkedin: "https://linkedin.com/in/anshumaansaraf",
  resumePath: "/Resume_Anshumaan_Saraf.pdf",
};
```

- [ ] **Step 2: Commit**

```bash
git add lib/data.ts && git commit -m "feat: add lib/data.ts - single source of truth for all content"
```

---

### Task 3: Core UI Components — RainingLetters, TextScramble, MotionSection

**Files:**

- Create: `components/ui/RainingLetters.tsx`
- Create: `components/ui/TextScramble.tsx`
- Create: `components/ui/MotionSection.tsx`

- [ ] **Step 1: Create RainingLetters.tsx**

File: `components/ui/RainingLetters.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const FONT_SIZE = 14;
const COLOR = "#3fb950";

export function RainingLetters() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (prefersReduced) {
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return () => window.removeEventListener("resize", resize);
    }

    const columns = Math.floor(canvas.width / FONT_SIZE);
    const drops: number[] = Array(columns).fill(1);

    const isMobile = (navigator.hardwareConcurrency ?? 8) <= 4;
    let frameCount = 0;

    const draw = () => {
      frameCount++;
      if (isMobile && frameCount % 2 !== 0) {
        rafId.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(13, 17, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = COLOR;
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId.current);
      } else {
        rafId.current = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Create TextScramble.tsx**

File: `components/ui/TextScramble.tsx`

```tsx
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
  phrases: readonly string[];
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
```

- [ ] **Step 3: Create MotionSection.tsx**

File: `components/ui/MotionSection.tsx`

```tsx
"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

type Props = ComponentPropsWithoutRef<"section"> & {
  children: ReactNode;
};

export function MotionSection({ children, className, ...props }: Props) {
  return (
    <motion.section
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/ui/ && git commit -m "feat: add RainingLetters, TextScramble, MotionSection UI components"
```

---

### Task 4: Navbar

**Files:**

- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

File: `components/Navbar.tsx`

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handler = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 80);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on nav click
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-label="Main navigation"
    >
      <div className="bg-[#0d1117]/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-sm text-[#3fb950] tracking-widest hover:opacity-80 transition-opacity"
            onClick={handleNavClick}
          >
            ANSHUMAAN SARAF
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-[#8b949e] hover:text-[#e6edf3] transition-colors font-mono tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10">
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleNavClick}
                    className="block px-6 py-3 text-sm text-[#8b949e] hover:text-[#e6edf3] font-mono tracking-wide transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx && git commit -m "feat: add sticky hide-on-scroll Navbar with mobile menu"
```

---

### Task 5: Hero Section

**Files:**

- Create: `components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

File: `components/Hero.tsx`

```tsx
import dynamic from "next/dynamic";
import { heroPhrases, heroSubheadline } from "@/lib/data";
import { TextScramble } from "@/components/ui/TextScramble";

const RainingLetters = dynamic(
  () => import("@/components/ui/RainingLetters").then((m) => m.RainingLetters),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0d1117]" />,
  },
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0d1117]"
      aria-label="Hero"
    >
      <RainingLetters />

      {/* Gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/60 via-transparent to-[#0d1117]/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Static name — always readable */}
        <p className="font-mono text-sm tracking-[0.3em] text-[#3fb950] mb-4 uppercase">
          ANSHUMAAN SARAF
        </p>

        {/* Scrambling role */}
        <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-[#e6edf3] tracking-tight mb-2 min-h-[1.2em]">
          <TextScramble phrases={heroPhrases} />
        </h1>

        {/* Context line */}
        <p className="text-xs text-[#484f58] font-mono mb-6 tracking-wide">
          (I embed with your business and build the system that solves the
          problem)
        </p>

        {/* Sub-headline */}
        <p className="text-[#8b949e] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          {heroSubheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#work"
            className="px-6 py-3 bg-[#3fb950] text-[#0d1117] font-mono text-sm font-semibold tracking-wide rounded-lg hover:bg-[#3fb950]/90 transition-colors"
          >
            View Work ↓
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[#3fb950]/40 text-[#3fb950] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-[#3fb950] hover:bg-[#3fb950]/10 transition-all"
          >
            Let's Talk →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#484f58] font-mono text-xs tracking-widest animate-bounce">
        ↓ SCROLL
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx && git commit -m "feat: add Hero section with RainingLetters and TextScramble"
```

---

### Task 6: StatsBar

**Files:**

- Create: `components/StatsBar.tsx`

- [ ] **Step 1: Create StatsBar.tsx**

File: `components/StatsBar.tsx`

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/StatsBar.tsx && git commit -m "feat: add StatsBar with key metrics"
```

---

### Task 7: CaseStudy Component

**Files:**

- Create: `components/CaseStudy.tsx`

- [ ] **Step 1: Create CaseStudy.tsx**

File: `components/CaseStudy.tsx`

```tsx
import { type CaseStudyData } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

type Props = { caseStudy: CaseStudyData };

export function CaseStudy({ caseStudy }: Props) {
  return (
    <MotionSection
      className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden"
      aria-label={`${caseStudy.title} case study`}
    >
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#3fb950] tracking-widest uppercase">
            Case Study
          </span>
          <h3 className="text-xl font-mono font-bold text-[#e6edf3] mt-1">
            {caseStudy.title}
          </h3>
        </div>

        {/* Header metrics */}
        <div className="flex gap-6 flex-wrap">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-mono text-lg font-bold text-[#3fb950]">
                {m.value}
              </div>
              <div className="text-xs text-[#8b949e] font-mono tracking-wide">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {caseStudy.quadrants.map((q) => (
          <div
            key={q.label}
            className="p-6 even:border-t md:even:border-t-0 border-white/10"
          >
            <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
              {q.label}
            </h4>
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {q.content}
            </p>
          </div>
        ))}
      </div>

      {/* Footer — tags + links */}
      <div className="border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {caseStudy.pipelineTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-[#3fb950]/10 text-[#3fb950] border border-[#3fb950]/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {caseStudy.techTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-mono bg-white/5 text-[#8b949e] border border-white/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="border-t border-white/10 px-6 py-4 flex gap-4">
        {caseStudy.links.live && (
          <a
            href={caseStudy.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-[#3fb950] hover:underline"
          >
            Live Site ↗
          </a>
        )}
        <a
          href={caseStudy.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-[#58a6ff] hover:underline"
        >
          GitHub ↗
        </a>
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/CaseStudy.tsx && git commit -m "feat: add data-driven CaseStudy component"
```

---

### Task 8: Projects Cards

**Files:**

- Create: `components/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

File: `components/Projects.tsx`

```tsx
import { projects } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {projects.map((project) => (
        <MotionSection
          key={project.title}
          className="bg-[#161b22] border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-white/20 transition-colors group"
          aria-label={`${project.title} project`}
        >
          {/* Card header */}
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-lg font-mono font-bold text-[#e6edf3]">
                {project.title}
              </h3>
              <div className="flex gap-2 shrink-0">
                {/* GitHub icon — always shown */}
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#8b949e] hover:text-[#3fb950] transition-colors"
                    aria-label={`${project.title} live site`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Badge */}
            <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20 rounded-full mb-3">
              {project.badge}
            </span>

            {/* Tagline */}
            <p className="text-[#e6edf3] text-sm font-medium mb-3 italic">
              "{project.tagline}"
            </p>

            {/* Story */}
            <p className="text-[#8b949e] text-sm leading-relaxed">
              {project.story}
            </p>
          </div>

          {/* Tech tags */}
          <div className="border-t border-white/10 px-6 py-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs font-mono bg-white/5 text-[#8b949e] rounded-full border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </MotionSection>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Projects.tsx && git commit -m "feat: add Projects cards for Medicrew and Ambassador"
```

---

### Task 9: About Section

**Files:**

- Create: `components/About.tsx`

- [ ] **Step 1: Create About.tsx**

File: `components/About.tsx`

```tsx
import { MotionSection } from "@/components/ui/MotionSection";

const nonNegotiables = [
  {
    title: "Positioning",
    description:
      "Knowing where I stand, where I'm going, and how to communicate that clearly to anyone in the room.",
  },
  {
    title: "Communication",
    description:
      "Saying the right thing, to the right people, at the right time — across code, docs, and boardrooms.",
  },
  {
    title: "Obsession",
    description:
      "Caring deeply about the work, even when no one's watching. Still learning. Still making mistakes worth documenting.",
  },
];

export function About() {
  return (
    <MotionSection
      id="about"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="About"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-8">
        About
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left — narrative */}
        <div className="space-y-4 text-[#8b949e] text-base leading-relaxed">
          <p>
            You'll find wins here. You'll also find rejections. And most
            importantly — the thought process behind both.
          </p>
          <p>
            I'm Anshumaan (Ansh), a Forward Deployed Engineer and MIT student at
            Griffith University, Gold Coast. I build systems that solve real
            problems.
          </p>
          <p>
            I'm figuring out what it means to become an engineer — not just
            someone who writes code, but someone who focuses on business needs,
            thinks clearly, communicates precisely, and stays obsessed with the
            right problems.
          </p>
        </div>

        {/* Right — non-negotiables (terminal list style) */}
        <div className="font-mono text-sm space-y-6">
          {nonNegotiables.map((item) => (
            <div key={item.title}>
              <p className="text-[#3fb950]">→ {item.title}</p>
              <p className="text-[#8b949e] mt-1 pl-4 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/About.tsx && git commit -m "feat: add About section with narrative and non-negotiables"
```

---

### Task 10: PhotoCarousel Component

**Files:**

- Create: `components/ui/PhotoCarousel.tsx`

- [ ] **Step 1: Create PhotoCarousel.tsx**

File: `components/ui/PhotoCarousel.tsx`

```tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/data";

type Props = {
  photos: Photo[];
};

export function PhotoCarousel({ photos }: Props) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % photos.length);
  }, [photos.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Auto-advance every 4s, pause on hover
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

  // Keyboard navigation
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
      {/* Main image */}
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

        {/* Credential badge */}
        {photo.highlight && (
          <div
            className="absolute top-3 left-3 px-2 py-1 bg-amber-500/90 text-black text-xs font-mono font-bold rounded-full border border-amber-400"
            aria-label="Credential: Letter of Appreciation from Parul University"
          >
            ✓ Credential
          </div>
        )}

        {/* Highlight ring */}
        {photo.highlight && (
          <div className="absolute inset-0 ring-2 ring-amber-400/60 rounded-lg pointer-events-none" />
        )}

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded px-2 py-1 text-xs text-white font-mono">
          ↗ expand
        </div>
      </div>

      {/* Caption */}
      <p className="text-xs text-[#8b949e] font-mono mt-2 text-center">
        {photo.caption}
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={prev}
          className="p-1.5 rounded text-[#8b949e] hover:text-[#e6edf3] transition-colors"
          aria-label="Previous photo"
        >
          ←
        </button>

        {/* Dots */}
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

      {/* Lightbox */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/PhotoCarousel.tsx && git commit -m "feat: add PhotoCarousel with lightbox, auto-advance, keyboard nav"
```

---

### Task 11: Experience Section

**Files:**

- Create: `components/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx**

File: `components/Experience.tsx`

```tsx
import { experience, parulPhotos } from "@/lib/data";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { MotionSection } from "@/components/ui/MotionSection";

export function Experience() {
  return (
    <MotionSection
      id="experience"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="Experience"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-12">
        Experience
      </h2>

      <div className="space-y-12">
        {experience.map((entry, index) => {
          const isParul = entry.company.includes("Parul");
          return (
            <article
              key={entry.company}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Text side */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="font-mono text-base font-bold text-[#e6edf3]">
                    {entry.company}
                  </h3>
                  <span className="text-xs font-mono text-[#484f58] shrink-0 pt-0.5">
                    {entry.period}
                  </span>
                </div>
                <p className="text-sm font-mono text-[#58a6ff] mb-4">
                  {entry.role}
                </p>
                <ul className="space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm text-[#8b949e] flex gap-2"
                    >
                      <span className="text-[#3fb950] shrink-0">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo carousel for Parul entry */}
              {isParul && (
                <div>
                  <PhotoCarousel photos={parulPhotos} />
                </div>
              )}
            </article>
          );
        })}
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Experience.tsx && git commit -m "feat: add Experience timeline with Parul photo carousel"
```

---

### Task 12: Achievements Section

**Files:**

- Create: `components/Achievements.tsx`

- [ ] **Step 1: Create Achievements.tsx**

File: `components/Achievements.tsx`

```tsx
import { achievements, certifications } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Achievements() {
  return (
    <MotionSection
      id="achievements"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="Achievements"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-12">
        Achievements
      </h2>

      {/* Hackathon wins */}
      <div className="space-y-4 mb-12">
        {achievements.map((a) => (
          <div
            key={a.title}
            className="flex gap-4 p-5 bg-[#161b22] border border-white/10 rounded-xl hover:border-white/20 transition-colors"
          >
            <span className="text-2xl shrink-0">{a.emoji}</span>
            <div>
              <h3 className="font-mono text-sm font-bold text-[#e6edf3] mb-1">
                {a.title}
              </h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                {a.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <h3 className="font-mono text-xs tracking-widest text-[#484f58] uppercase mb-4">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-3">
          {certifications.map((cert) =>
            cert.credentialUrl ? (
              <a
                key={cert.name}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#161b22] border border-white/10 rounded-full text-sm font-mono text-[#8b949e] hover:border-[#58a6ff]/40 hover:text-[#58a6ff] transition-all"
              >
                {cert.name}
                <span className="text-xs text-[#484f58] ml-1">
                  · {cert.issuer}
                </span>
              </a>
            ) : (
              <span
                key={cert.name}
                className="px-3 py-1.5 bg-[#161b22] border border-white/10 rounded-full text-sm font-mono text-[#8b949e]"
              >
                {cert.name}
                <span className="text-xs text-[#484f58] ml-1">
                  · {cert.issuer}
                </span>
              </span>
            ),
          )}
        </div>
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Achievements.tsx && git commit -m "feat: add Achievements section with hackathon wins and cert badges"
```

---

### Task 13: TechStack Section

**Files:**

- Create: `components/TechStack.tsx`

- [ ] **Step 1: Create TechStack.tsx**

File: `components/TechStack.tsx`

```tsx
import { techStack } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function TechStack() {
  const primary = techStack.filter((t) => t.primary);
  const secondary = techStack.filter((t) => !t.primary);

  return (
    <MotionSection
      id="stack"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="Tech stack"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-8">
        Tech Stack
      </h2>

      <div className="flex flex-wrap gap-3">
        {primary.map((tag) => (
          <span
            key={tag.name}
            className="px-3 py-1.5 bg-[#3fb950]/10 border border-[#3fb950]/30 rounded-full text-sm font-mono text-[#3fb950]"
          >
            {tag.name}
          </span>
        ))}
        {secondary.map((tag) => (
          <span
            key={tag.name}
            className="px-3 py-1.5 bg-[#161b22] border border-white/10 rounded-full text-sm font-mono text-[#8b949e]"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TechStack.tsx && git commit -m "feat: add TechStack tag grid"
```

---

### Task 14: Beliefs Section

**Files:**

- Create: `components/Beliefs.tsx`

- [ ] **Step 1: Create Beliefs.tsx**

File: `components/Beliefs.tsx`

```tsx
import { beliefs } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

function renderBelief(text: string) {
  // Italic beliefs wrapped in _..._
  if (text.startsWith("_") && text.endsWith("_")) {
    return (
      <p className="italic text-[#c9d1d9] text-sm leading-relaxed">
        {text.slice(1, -1)}
      </p>
    );
  }
  // Bold key phrases wrapped in **...**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-[#8b949e] text-sm leading-relaxed">
      {parts.map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="text-[#e6edf3] font-medium">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </p>
  );
}

export function Beliefs() {
  return (
    <MotionSection
      id="beliefs"
      className="max-w-5xl mx-auto px-6 py-20"
      aria-label="Things I believe"
    >
      <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-12">
        Things I Believe
      </h2>

      <div className="columns-1 lg:columns-2 gap-8 space-y-0">
        {beliefs.flatMap((section) =>
          section.items.map((item, i) => (
            <div
              key={`${section.category}-${i}`}
              className="break-inside-avoid mb-4 p-4 rounded-lg hover:bg-white/2 transition-colors"
            >
              {renderBelief(item)}
            </div>
          )),
        )}
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Beliefs.tsx && git commit -m "feat: add Beliefs section in masonry columns"
```

---

### Task 15: Contact + Footer

**Files:**

- Create: `components/Contact.tsx`
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create Contact.tsx**

File: `components/Contact.tsx`

```tsx
import { contact } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export function Contact() {
  return (
    <MotionSection
      id="contact"
      className="max-w-5xl mx-auto px-6 py-24 text-center"
      aria-label="Contact"
    >
      <h2 className="font-mono text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">
        Got a problem that costs time or money?
      </h2>
      <p className="text-[#8b949e] text-base max-w-lg mx-auto mb-10 leading-relaxed">
        I embed with your business, understand the problem deeply, and build the
        system that fixes it. Let's talk.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
        {/* Primary CTA */}
        <a
          href={`mailto:${contact.email}`}
          className="px-6 py-3 bg-[#3fb950] text-[#0d1117] font-mono text-sm font-semibold tracking-wide rounded-lg hover:bg-[#3fb950]/90 transition-colors"
        >
          {contact.email}
        </a>

        {/* Resume */}
        <a
          href={contact.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-white/20 text-[#e6edf3] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-white/40 transition-colors"
        >
          Resume ↓
        </a>

        {/* GitHub */}
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-white/20 text-[#e6edf3] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-white/40 transition-colors"
        >
          GitHub ↗
        </a>

        {/* LinkedIn */}
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-white/20 text-[#e6edf3] font-mono text-sm font-semibold tracking-wide rounded-lg hover:border-white/40 transition-colors"
        >
          LinkedIn ↗
        </a>
      </div>
    </MotionSection>
  );
}
```

- [ ] **Step 2: Create Footer.tsx**

File: `components/Footer.tsx`

```tsx
export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-mono text-[#484f58]">
          © {new Date().getFullYear()} Anshumaan Saraf. Built with Next.js.
        </p>
        <p className="text-xs font-mono text-[#484f58]">
          Gold Coast, Australia 🇦🇺
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx components/Footer.tsx && git commit -m "feat: add Contact CTA and Footer"
```

---

### Task 16: App Layout + Page Assembly

**Files:**

- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Write app/layout.tsx**

File: `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anshumaan Saraf — Forward Deployed Engineer | Gold Coast, Australia",
  description:
    "Anshumaan Saraf is a Forward Deployed Engineer based in Gold Coast, Australia. He builds full-stack systems that eliminate SaaS costs and drive revenue — from e-commerce platforms to AI-powered infrastructure.",
  openGraph: {
    title: "Anshumaan Saraf — Forward Deployed Engineer",
    description:
      "Building full-stack systems that eliminate SaaS costs and drive revenue. Gold Coast, Australia.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anshumaan Saraf — Forward Deployed Engineer",
    description:
      "Building full-stack systems that eliminate SaaS costs and drive revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anshumaan Saraf",
  jobTitle: "Forward Deployed Engineer",
  url: "https://anshumaansaraf.com",
  email: "anshumaansaraf24@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gold Coast",
    addressCountry: "AU",
  },
  sameAs: [
    "https://github.com/anshumaansaraf",
    "https://linkedin.com/in/anshumaansaraf",
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "AI Integration",
    "LangChain",
    "PostgreSQL",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0d1117] text-[#e6edf3]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#3fb950] focus:text-[#0d1117] focus:font-mono focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Write app/page.tsx**

File: `app/page.tsx`

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { CaseStudy } from "@/components/CaseStudy";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { TechStack } from "@/components/TechStack";
import { Beliefs } from "@/components/Beliefs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/lib/data";
import { MotionSection } from "@/components/ui/MotionSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <StatsBar />

        {/* Selected Work */}
        <section id="work" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="font-mono text-xs tracking-[0.3em] text-[#3fb950] uppercase mb-8">
            Selected Work
          </h2>
          {caseStudies.map((cs) => (
            <CaseStudy key={cs.title} caseStudy={cs} />
          ))}
          <Projects />
        </section>

        <About />
        <Experience />
        <Achievements />
        <TechStack />
        <Beliefs />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Create app/not-found.tsx**

File: `app/not-found.tsx`

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6">
      <div className="text-center font-mono">
        <p className="text-[#3fb950] text-xs tracking-widest uppercase mb-4">
          404
        </p>
        <h1 className="text-3xl font-bold text-[#e6edf3] mb-4">
          Page not found
        </h1>
        <p className="text-[#8b949e] text-sm mb-8">
          This URL doesn't exist. The portfolio does.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-[#3fb950] text-[#0d1117] text-sm font-semibold rounded-lg hover:bg-[#3fb950]/90 transition-colors"
        >
          ← Back to portfolio
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Copy resume PDF to public folder**

```bash
cp "/Users/anshumaansaraf/Desktop/Projects/PRTFOLIO/Resume _Anshumaan Saraf.pdf" \
   "/Users/anshumaansaraf/Desktop/Projects/PRTFOLIO/public/Resume_Anshumaan_Saraf.pdf"
```

- [ ] **Step 5: Commit**

```bash
git add app/ && git commit -m "feat: assemble full portfolio page with all sections"
```

---

### Task 17: Build Verification + Typecheck

- [ ] **Step 1: Run typecheck**

```bash
cd /Users/anshumaansaraf/Desktop/Projects/PRTFOLIO && npm run typecheck
```

Expected: `No errors` (exit code 0).

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build succeeds, `.next/` directory created.

- [ ] **Step 3: Fix any type errors or build failures**

Common issues:

- Import paths not matching actual file locations → fix the import
- Missing `"use client"` on a component using browser APIs → add it
- Type mismatches in `lib/data.ts` usage → adjust to match exported type

- [ ] **Step 4: Commit fixes**

```bash
git add -A && git commit -m "fix: resolve typecheck and build errors"
```

---

### Task 18: Basic E2E Tests with Playwright

**Files:**

- Create: `tests/portfolio.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 1: Create playwright.config.ts**

File: `playwright.config.ts`

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "line",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

- [ ] **Step 2: Create tests/portfolio.spec.ts**

File: `tests/portfolio.spec.ts`

```ts
import { test, expect } from "@playwright/test";

test.describe("Portfolio — critical path", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/Anshumaan Saraf/);
  });

  test("hero shows name and CTAs", async ({ page }) => {
    await expect(page.getByText("ANSHUMAAN SARAF").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /View Work/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Let.s Talk/i })).toBeVisible();
  });

  test("stats bar shows key metrics", async ({ page }) => {
    await expect(page.getByText("$300k+")).toBeVisible();
    await expect(page.getByText("$26k+")).toBeVisible();
    await expect(page.getByText("5 days")).toBeVisible();
  });

  test("work section has case study", async ({ page }) => {
    await page.getByRole("link", { name: /View Work/i }).click();
    await expect(page.getByText("Tasman Star Seafood")).toBeVisible();
  });

  test("contact section is reachable", async ({ page }) => {
    await page.getByRole("link", { name: /Let.s Talk/i }).click();
    await expect(
      page.getByText("Got a problem that costs time or money?"),
    ).toBeVisible();
  });

  test("navbar hides on scroll and shows email in contact", async ({
    page,
  }) => {
    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);
    // Scroll up
    await page.evaluate(() => window.scrollBy(0, -500));
    await page.waitForTimeout(300);
    // Navbar should be back
    await expect(page.getByText("ANSHUMAAN SARAF").first()).toBeVisible();
  });

  test("404 page renders", async ({ page }) => {
    await page.goto("/nonexistent-page");
    await expect(page.getByText("404")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Back to portfolio/i }),
    ).toBeVisible();
  });
});
```

- [ ] **Step 3: Run tests against dev server**

```bash
npx playwright test --reporter=line
```

Expected: All 6 tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/ playwright.config.ts && git commit -m "test: add Playwright E2E tests for critical portfolio paths"
```

---

## Summary

| Task | Output                                           |
| ---- | ------------------------------------------------ |
| 1    | Next.js 15 scaffolded, Tailwind + design tokens  |
| 2    | `lib/data.ts` — all content typed                |
| 3    | RainingLetters, TextScramble, MotionSection      |
| 4    | Navbar (sticky, hide-on-scroll, mobile)          |
| 5    | Hero (canvas bg, scramble text, CTAs)            |
| 6    | StatsBar (4 metrics)                             |
| 7    | CaseStudy (data-driven card)                     |
| 8    | Projects (Medicrew + Ambassador)                 |
| 9    | About (narrative + non-negotiables)              |
| 10   | PhotoCarousel (lightbox, keyboard, auto-advance) |
| 11   | Experience (timeline + carousel)                 |
| 12   | Achievements + cert badges                       |
| 13   | TechStack tag grid                               |
| 14   | Beliefs (masonry columns)                        |
| 15   | Contact + Footer                                 |
| 16   | Layout + page assembly                           |
| 17   | Build + typecheck verification                   |
| 18   | Playwright E2E tests                             |
