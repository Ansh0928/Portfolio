# Portfolio TODOs

## Post-launch

### DESIGN.md — Design system source of truth

**What:** Extract the Design Tokens section from the spec into a standalone `DESIGN.md`.
**Why:** Once implementation starts, the spec and the codebase will drift. A separate DESIGN.md gives the implementer (and future-you) a single file to check token values.
**Pros:** Prevents token drift; makes future UI additions consistent.
**Cons:** Maintenance burden for a solo project — needs updating whenever tokens change.
**Context:** Design tokens currently live in `docs/superpowers/specs/2026-04-12-portfolio-design.md` § "Design Tokens". Extract after the first implementation pass when you know what was actually built.
**Depends on:** First implementation pass complete.

---

### OG image — Social sharing preview

**What:** Add `/app/opengraph-image.tsx` using `next/og` to generate a dynamic OG image.
**Why:** When this URL is shared on LinkedIn, Twitter, or in a Slack message, a missing OG image shows a blank card. First impressions matter.
**Pros:** ~30 minutes with `next/og`; looks professional; Vercel generates it at the edge.
**Cons:** Minor — just needs doing.
**Context:** The spec defines the text content and palette (`#0d1117` bg, `#3fb950` accent, Geist Mono). A good OG image: name in large green mono, title below in white, location in muted slate. 1200×630px.
**Depends on:** Domain confirmed and site deployed.
