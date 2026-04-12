# Tasman Star Case Study Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Tasman Star card and modal so anyone can immediately understand the problem, what was built, and the system architecture.

**Architecture:** Extend `CaseStudyData` in `lib/data.ts` with new typed fields (`problems`, `verticals`, `architecture`, `beforeAfter`, `isActiveBuild`), populate Tasman Star data, then rebuild the card and modal in `components/CaseStudy.tsx` to render them.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS

---

## File Map

| File                       | Role                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| `lib/data.ts`              | Add 5 new fields to `CaseStudyData` type + populate Tasman Star data                      |
| `components/CaseStudy.tsx` | Redesign card (hero + problem bar + system preview) + modal (system design section first) |

---

### Task 1: Extend CaseStudyData type in lib/data.ts

**Files:**

- Modify: `lib/data.ts`

- [ ] **Step 1: Add new types after the existing `CaseStudyData` type definition (around line 46)**

Replace the existing `CaseStudyData` type (lines 46–58) with:

```ts
export type VerticalColor = "green" | "blue" | "purple";

export type Vertical = {
  icon: string;
  title: string;
  stack: string;
  color: VerticalColor;
  features: string[];
};

export type ArchitectureData = {
  inputLabel: string;
  inputFlow: string;
  platformTitle: string;
  platformSub: string;
  platformStack: string;
  aiFeatures: string[];
};

export type BeforeAfterRow = {
  before: string;
  after: string;
};

export type CaseStudyData = {
  id: string;
  title: string;
  company: string;
  role: string;
  metrics: { label: string; value: string }[];
  quadrants: QuadrantItem[];
  story: CaseStudyBlock[];
  pipelineTags: string[];
  techTags: string[];
  links: { live?: string; github?: string };
  // New fields
  isActiveBuild?: boolean;
  problems?: string[];
  beforeAfter?: BeforeAfterRow[];
  verticals?: Vertical[];
  architecture?: ArchitectureData;
};
```

- [ ] **Step 2: Run typecheck — should pass (new fields are optional)**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat(data): extend CaseStudyData type with system design fields"
```

---

### Task 2: Populate Tasman Star data in lib/data.ts

**Files:**

- Modify: `lib/data.ts` — inside `caseStudies[0]` (the Tasman Star entry)

- [ ] **Step 1: Add new fields to the Tasman Star entry (after `links: { ... }` on line ~215)**

```ts
    isActiveBuild: true,
    problems: [
      "$26k/yr on disconnected SaaS",
      "Inventory tracked in spreadsheets",
      "Wholesale via phone & text",
      "Paper delivery dockets",
      "Perishable stock with no live visibility",
      "Nothing talks to anything",
    ],
    beforeAfter: [
      { before: "Shopify + Fresho ($26k/yr)", after: "Custom platform (owned forever)" },
      { before: "Inventory in spreadsheets", after: "Live inventory + expiry tracking" },
      { before: "Wholesale via phone/text", after: "Self-serve wholesale portal" },
      { before: "Paper delivery dockets", after: "Expo app · photo + signature verify" },
      { before: "No field rep visibility", after: "Sales rep app + office God's Eye" },
      { before: "Perishable waste, no alerts", after: "AI flags low stock + near-expiry" },
    ],
    verticals: [
      {
        icon: "🛒",
        title: "E-Commerce",
        stack: "Next.js · Postgres (Neon)",
        color: "green",
        features: [
          "Dynamic pricing automation",
          "Live inventory + expiry tracking",
          "Wholesale approval portal",
          "RBAC (4 roles: super admin / admin / staff / wholesale)",
          "Staff dashboard + batch delivery runs by area",
        ],
      },
      {
        icon: "🚛",
        title: "Transport & Freight",
        stack: "Expo · Supabase · Next.js",
        color: "blue",
        features: [
          "God's Eye admin oversight",
          "Live driver tracking",
          "Mandatory photo + signature verification",
          "Revenue leak prevention",
        ],
      },
      {
        icon: "👤",
        title: "Sales & Field Ops",
        stack: "Expo · Next.js",
        color: "purple",
        features: [
          "Sales reps lodge orders in-field",
          "GPS location pinning",
          "Office sees all reps live",
          "Full field-to-office control",
        ],
      },
    ],
    architecture: {
      inputLabel: "Warehouse Invoices / Emails",
      inputFlow: "scraped + parsed → Dynamic Pricing Automation",
      platformTitle: "Master Platform — Live AI Dashboard",
      platformSub: "Everything connected · Each store owns its view · Warehouse + stores + website in sync",
      platformStack: "Next.js · Postgres (Neon) · Supabase",
      aiFeatures: [
        "Near-expiry flagging",
        "Stock level alerts",
        "Dynamic price automation",
        "Invoice scraping (LangChain)",
        "Sales + weather forecasting",
        "What's in · what's out · what's expiring",
      ],
    },
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat(data): populate Tasman Star system design fields"
```

---

### Task 3: Redesign the CaseStudy card

**Files:**

- Modify: `components/CaseStudy.tsx`

- [ ] **Step 1: Replace the card `<button>` content (lines ~286–371) with the new layout**

The new card has 4 sections: hero strip → problem bar → system preview → footer.
Replace the entire contents of the `<button>` (everything inside `<MotionSection>`) with:

```tsx
<MotionSection aria-label={`${caseStudy.company} case study`}>
  <button
    onClick={() => setOpen(true)}
    className="relative w-full text-left group bg-[#161b22] border border-white/10 rounded-xl overflow-hidden hover:border-[#3fb950]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(63,185,80,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3fb950]"
  >
    <CelestialMatrixShader
      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ zIndex: 0 }}
    />

    <div className="relative z-10">
      {/* ── Hero strip ── */}
      <div className="relative bg-gradient-to-br from-[#0d1117] via-[#1a2d1f] to-[#0f2318] px-6 py-7 border-b border-white/6">
        {/* Active build badge */}
        {caseStudy.isActiveBuild && (
          <div className="absolute top-5 right-5 flex items-center gap-2 bg-[#3fb950]/10 border border-[#3fb950]/25 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
            <span className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase">
              Active Build
            </span>
          </div>
        )}
        <span className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase">
          Case Study · Forward Deployed Engineer
        </span>
        <h3 className="text-2xl font-bold text-white mt-2 mb-1 leading-tight group-hover:text-[#3fb950] transition-colors duration-300">
          {caseStudy.company}
        </h3>
        <p className="text-sm text-[#8b949e] font-mono">
          QLD&apos;s #1 seafood company · Master platform connecting warehouse →
          stores → field
        </p>
      </div>

      {/* ── Problem bar ── */}
      {caseStudy.problems && caseStudy.problems.length > 0 && (
        <div className="px-6 py-4 border-b border-white/6 bg-[#0d1117]">
          <p className="text-[10px] font-mono text-[#f85149] tracking-widest uppercase mb-3">
            The Problem
          </p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.problems.map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 text-xs font-mono bg-[#f85149]/8 text-[#f85149] border border-[#f85149]/20 rounded-md"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── System preview ── */}
      {caseStudy.verticals && caseStudy.verticals.length > 0 && (
        <div className="px-6 py-4 border-b border-white/6 bg-[#0d1117]">
          <p className="text-[10px] font-mono text-[#58a6ff] tracking-widest uppercase mb-3">
            What&apos;s Being Built
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex flex-col items-center bg-[#161b22] border border-[#58a6ff]/25 rounded-lg px-3 py-2 text-center">
              <span className="text-[11px] font-mono text-[#58a6ff]">
                📦 Warehouse
              </span>
              <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                invoice scraping
              </span>
            </div>
            <span className="text-[#484f58] text-sm">→</span>
            <div className="flex flex-col items-center bg-[#3fb950]/6 border border-[#3fb950]/35 rounded-lg px-3 py-2 text-center">
              <span className="text-[11px] font-mono text-[#3fb950] font-bold">
                🧠 Master Platform
              </span>
              <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                live AI dashboard
              </span>
            </div>
            <span className="text-[#484f58] text-sm">→</span>
            {caseStudy.verticals.map((v, i) => (
              <div key={v.title} className="flex items-center gap-2">
                <div
                  className={`flex flex-col items-center bg-[#161b22] rounded-lg px-3 py-2 text-center ${
                    v.color === "green"
                      ? "border border-[#3fb950]/30"
                      : v.color === "blue"
                        ? "border border-[#58a6ff]/30"
                        : "border border-[#bc8cff]/30"
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono ${
                      v.color === "green"
                        ? "text-[#3fb950]"
                        : v.color === "blue"
                          ? "text-[#58a6ff]"
                          : "text-[#bc8cff]"
                    }`}
                  >
                    {v.icon} {v.title}
                  </span>
                  <span className="text-[9px] text-[#484f58] font-mono mt-0.5">
                    {v.stack.split(" · ")[0]}
                  </span>
                </div>
                {i < caseStudy.verticals!.length - 1 && (
                  <span className="text-[#484f58] text-sm">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] font-mono text-[#484f58] mt-2">
            Neon · Supabase · Prisma ORM
          </p>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex gap-5">
          {caseStudy.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-mono text-base font-bold text-[#3fb950] leading-none">
                {m.value}
              </div>
              <div className="text-[10px] text-[#484f58] font-mono tracking-wide mt-1 whitespace-nowrap">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <span className="text-sm font-mono text-[#3fb950] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200 shrink-0 font-medium">
          Read case study <span aria-hidden>→</span>
        </span>
      </div>
    </div>
  </button>
</MotionSection>
```

- [ ] **Step 2: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/CaseStudy.tsx
git commit -m "feat(card): redesign Tasman Star card with problem bar + system preview"
```

---

### Task 4: Add SystemDesign section to the modal

**Files:**

- Modify: `components/CaseStudy.tsx`

- [ ] **Step 1: Add a `SystemDesignSection` component above the `CaseStudyModal` function**

Insert this new component before the `// ── Modal ──` comment:

```tsx
// ── System Design Section ────────────────────────────────────────────────────

function SystemDesignSection({ caseStudy }: { caseStudy: CaseStudyData }) {
  if (
    !caseStudy.beforeAfter &&
    !caseStudy.architecture &&
    !caseStudy.verticals
  ) {
    return null;
  }

  const colorClass = {
    green: {
      border: "border-[#3fb950]/30",
      title: "text-[#3fb950]",
      stack: "text-[#484f58]",
      feat: "text-[#8b949e]",
    },
    blue: {
      border: "border-[#58a6ff]/30",
      title: "text-[#58a6ff]",
      stack: "text-[#484f58]",
      feat: "text-[#8b949e]",
    },
    purple: {
      border: "border-[#bc8cff]/30",
      title: "text-[#bc8cff]",
      stack: "text-[#484f58]",
      feat: "text-[#8b949e]",
    },
  } satisfies Record<"green" | "blue" | "purple", Record<string, string>>;

  return (
    <div className="px-6 py-6 border-b border-white/10 space-y-6">
      <h4 className="text-xs font-mono text-[#58a6ff] tracking-widest uppercase">
        System Design — What Replaced What
      </h4>

      {/* Before → After */}
      {caseStudy.beforeAfter && (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-[#f85149] tracking-widest uppercase mb-1">
              Before
            </p>
            {caseStudy.beforeAfter.map((row) => (
              <div
                key={row.before}
                className="flex items-center gap-2 bg-[#f85149]/6 border border-[#f85149]/18 rounded-lg px-3 py-2 text-xs font-mono text-[#f85149]"
              >
                <span>❌</span>
                <span>{row.before}</span>
              </div>
            ))}
          </div>

          <div className="text-[#484f58] text-xl self-center">→</div>

          <div className="space-y-2">
            <p className="text-[10px] font-mono text-[#3fb950] tracking-widest uppercase mb-1">
              After
            </p>
            {caseStudy.beforeAfter.map((row) => (
              <div
                key={row.after}
                className="flex items-center gap-2 bg-[#3fb950]/6 border border-[#3fb950]/18 rounded-lg px-3 py-2 text-xs font-mono text-[#3fb950]"
              >
                <span>✓</span>
                <span>{row.after}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture map */}
      {caseStudy.architecture && caseStudy.verticals && (
        <div className="bg-[#0d1117] border border-white/6 rounded-xl p-5 space-y-4">
          <p className="text-[10px] font-mono text-[#484f58] tracking-widest uppercase">
            Architecture
          </p>

          {/* Input layer */}
          <div className="flex items-center gap-3 text-xs font-mono flex-wrap">
            <span className="bg-[#161b22] border border-white/8 rounded-md px-3 py-2 text-[#8b949e]">
              📧 {caseStudy.architecture.inputLabel}
            </span>
            <span className="text-[#484f58]">
              → {caseStudy.architecture.inputFlow}
            </span>
          </div>

          {/* Connector */}
          <p className="text-[10px] font-mono text-[#484f58] text-center">
            ↓ feeds into ↓
          </p>

          {/* Central platform */}
          <div className="bg-[#3fb950]/5 border border-[#3fb950]/25 rounded-xl px-5 py-4 text-center">
            <p className="text-sm font-mono font-bold text-[#3fb950]">
              🧠 {caseStudy.architecture.platformTitle}
            </p>
            <p className="text-xs text-[#8b949e] mt-1">
              {caseStudy.architecture.platformSub}
            </p>
            <p className="text-[10px] font-mono text-[#484f58] mt-2">
              {caseStudy.architecture.platformStack}
            </p>
          </div>

          {/* Connector */}
          <p className="text-[10px] font-mono text-[#484f58] text-center">
            ↓ powers these verticals ↓
          </p>

          {/* 3 verticals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {caseStudy.verticals.map((v) => {
              const c = colorClass[v.color];
              return (
                <div
                  key={v.title}
                  className={`bg-[#161b22] border rounded-xl p-4 space-y-2 ${c.border}`}
                >
                  <p className={`text-xs font-mono font-bold ${c.title}`}>
                    {v.icon} {v.title}
                  </p>
                  <p className={`text-[10px] font-mono ${c.stack}`}>
                    {v.stack}
                  </p>
                  <ul className="space-y-1">
                    {v.features.map((f) => (
                      <li
                        key={f}
                        className={`text-[10px] font-mono ${c.feat} flex gap-1.5 items-start`}
                      >
                        <span className="text-[#484f58] shrink-0 mt-0.5">
                          →
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* AI layer */}
          <div className="border border-dashed border-[#3fb950]/25 rounded-xl px-4 py-3 space-y-2">
            <p className="text-[11px] font-mono font-bold text-[#3fb950]">
              🤖 AI Layer — spans all verticals
            </p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.architecture.aiFeatures.map((f) => (
                <span
                  key={f}
                  className="text-[10px] font-mono text-[#8b949e] bg-[#3fb950]/6 border border-[#3fb950]/15 rounded px-2 py-1"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add `<SystemDesignSection>` to the modal, between the metrics bar and story blocks**

Inside `CaseStudyModal`, find the `{/* Story blocks */}` div (currently after the metrics bar). Insert `<SystemDesignSection caseStudy={caseStudy} />` between the metrics bar div and the story blocks div:

```tsx
        {/* System design — shown first */}
        <SystemDesignSection caseStudy={caseStudy} />

        {/* Story blocks */}
        <div className="px-6 py-6 space-y-7">
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add components/CaseStudy.tsx
git commit -m "feat(modal): add SystemDesignSection with before/after + architecture map"
```

---

### Task 5: Push to remote

- [ ] **Step 1: Final typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 2: Push**

```bash
git push
```
