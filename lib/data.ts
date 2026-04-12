// lib/data.ts — single source of truth for all portfolio content

// ── STATS BAR ──────────────────────────────────────────────────────────────
export type StatItem = {
  value: string;
  label: string;
};

export const statsBar: StatItem[] = [
  { value: "$300k+", label: "revenue supported" },
  { value: "5 days", label: "to $10k revenue" },
  { value: "$26k+", label: "SaaS/yr saved" },
  { value: "🏆 1st", label: "place hackathon" },
];

// ── HERO ────────────────────────────────────────────────────────────────────
export const heroName = "ANSHUMAAN SARAF";
export const heroSubheadline =
  "I don't just write code. I embed with your business, understand the problem, and build the system that solves it.";
export const heroScramblePhrases = [
  "FORWARD DEPLOYED ENGINEER",
  "I BUILD SYSTEMS",
  "GOLD COAST, AU",
];
// Alias used by existing components
export const heroPhrases = heroScramblePhrases;

// ── CASE STUDIES ────────────────────────────────────────────────────────────
export type QuadrantItem = {
  label: string;
  content: string;
};

export type CaseStudyBlock =
  | { type: "text"; heading: string; body: string }
  | { type: "bullets"; heading: string; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | {
      type: "timeline";
      heading: string;
      steps: { label: string; detail: string }[];
    }
  | { type: "callout"; heading: string; body: string };

export type CaseStudyData = {
  id: string;
  title: string;
  company: string;
  role: string;
  metrics: { label: string; value: string }[];
  quadrants: QuadrantItem[];
  // Rich modal narrative
  story: CaseStudyBlock[];
  pipelineTags: string[];
  techTags: string[];
  links: { live?: string; github?: string };
};

export const caseStudies: CaseStudyData[] = [
  {
    id: "tasman-star",
    title: "Tasman Star Seafood",
    company: "Tasman Star Seafood",
    role: "Forward Deployed Engineer",
    metrics: [
      { value: "$26k+", label: "SaaS/yr saved" },
      { value: "5 days", label: "to $10k revenue" },
      { value: "$300k+", label: "revenue supported" },
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
    story: [
      {
        type: "text",
        heading: "The Company",
        body: "Tasman Star Seafood is Queensland's #1 seafood company. They run a fishing fleet, two retail stores, a wholesale operation, and their own transport. A real, multi-arm business — the kind that usually has a full tech team behind it. They had none.",
      },
      {
        type: "quote",
        text: "This website doesn't matter if you have no revenue from it.",
        attribution:
          "What I said in the interview — after building their site before walking in",
      },
      {
        type: "text",
        heading: "How I Got In",
        body: "I found the company, saw the gap, and built a new website before reaching out. Not as a demo — as a statement. I wanted them to see that I wasn't pitching effort, I was delivering results. I walked in with the work already done. That reframing changed the whole conversation from 'can you help us?' to 'when can you start?'",
      },
      {
        type: "text",
        heading: "What I Found",
        body: "Once I was inside, the real problems became clear. They were paying Shopify and Fresho a combined $26k+/year for tools that didn't talk to each other. Inventory was tracked in spreadsheets. Wholesale customers had no portal — they called or texted to order. Delivery drivers had no system. There was no unified view of the business at all.",
      },
      {
        type: "bullets",
        heading: "The Core Problems",
        items: [
          "Shopify + Fresho: $26k+/yr for disconnected SaaS tools",
          "No inventory management — spreadsheets and memory",
          "Wholesale ordering via phone/text — no portal, no history",
          "Delivery drivers carrying paper dockets — no verification",
          "Transport bookings handled manually by staff",
          "No data on what was selling, what was wasted, or what to stock",
        ],
      },
      {
        type: "text",
        heading: "My Approach",
        body: "I didn't start with code. I spent the first two weeks just watching — how orders came in, how stock moved, what the staff actually did vs. what the process was supposed to be. The real workflow is never what's written down. Once I understood the system, I mapped every tool to either eliminate, replace, or automate. Then I started building in order of revenue impact.",
      },
      {
        type: "timeline",
        heading: "How It Unfolded",
        steps: [
          {
            label: "Week 1–2: Observation",
            detail:
              "Embedded with the team. Mapped every workflow — retail, wholesale, transport, inventory. Asked why, not what.",
          },
          {
            label: "Week 3–4: E-commerce launch",
            detail:
              "Replaced Shopify with a custom Next.js storefront. Dynamic pricing by product type. Went live. $10k in revenue in 5 days.",
          },
          {
            label: "Month 2: RBAC + Wholesale portal",
            detail:
              "Built role-based access: super admin, admin, staff, wholesale customer. Wholesale buyers now self-serve — no more phone orders.",
          },
          {
            label: "Month 3: Inventory system",
            detail:
              "Replaced the spreadsheet. Real-time stock levels, low-stock alerts, purchase order tracking. Staff trained in one session.",
          },
          {
            label: "Month 4: iOS delivery app",
            detail:
              "Swift app for drivers. Digital dockets, photo verification on delivery, signature capture. Paper gone.",
          },
          {
            label: "Month 5+: AI stock pipeline",
            detail:
              "LangChain pipeline that reads sales history, seasonal patterns, and weather data to forecast what to order and when.",
          },
        ],
      },
      {
        type: "callout",
        heading: "The Make vs. Buy Decision",
        body: "The entire premise of this engagement was a make-vs-buy call. I could have recommended better SaaS tools. But after mapping the workflows, I realised no single tool would fit — and combining tools would still leave gaps. Custom was the right call here, not because I wanted to build, but because the math was clear: $26k/yr saved, full ownership, and a system that fits exactly how they operate.",
      },
      {
        type: "bullets",
        heading: "The Hard Parts",
        items: [
          "This was my first production role — no senior to ask, no runway for mistakes",
          "I learned by cold-messaging IBM, Amazon, and CrowdStrike engineers I met on the bus",
          "Australian privacy law: ACL, Privacy Act 1988, PCI DSS — all had to be right",
          "Human resistance was the real obstacle — not the code",
          "My own instinct to ship fast without documenting burned me twice",
          "Had to learn when to ask for help vs. when to trust myself",
        ],
      },
      {
        type: "text",
        heading: "What I'd Do Differently",
        body: "Document as you go, not after. I shipped fast and caught up on documentation later — twice that caused real confusion when onboarding staff. I'd also have built the wholesale portal earlier. The number of phone orders the team was handling was the biggest daily pain point, and I underestimated it initially because it wasn't on any system — it was just noise I had to notice.",
      },
      {
        type: "callout",
        heading: "The Outcome",
        body: "$26k+/yr eliminated in SaaS costs. $10k in e-commerce revenue in the first 5 days. $300k+ in total revenue now flowing through the platform. A business that used to run on phone calls and spreadsheets now runs on a single system built for exactly how they work.",
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
      // live: "https://tasmanstarseafood.com.au", // confirm before adding
      github: "https://github.com/Ansh0928",
    },
  },
];

// ── PROJECTS ─────────────────────────────────────────────────────────────────
export type ProjectData = {
  id: string;
  badge: string;
  tagline: string;
  story: string;
  techTags: string[];
  links: { live?: string; github: string };
  image?: string;
};

export const projects: ProjectData[] = [
  {
    id: "medicrew",
    badge: "REJECTED → ITERATED",
    tagline: "What if 8 AI doctors argued about your diagnosis?",
    story:
      "Sister is a physiotherapist. Australian healthcare takes too long, especially in rural Gold Coast aged-care areas. Built a multi-agent debate framework: 8 AI residents argue, supervising agent synthesizes, doctors get structured report on their portal. Applied to Alexa Lumina Health — rejected. Discovered Heidi doing something similar, scraped their approach, iterated, redesigned.",
    techTags: ["Next.js", "LangChain", "Ollama", "Docker", "shadcn/ui"],
    links: {
      live: "https://medicrew.vercel.app/",
      github: "https://github.com/Ansh0928/medicrew",
    },
    image: "/images/projects/medicrew.png",
  },
  {
    id: "ambassador",
    badge: "BUILT FROM FRUSTRATION",
    tagline: "The bus didn't stop. So I built the complaint system.",
    story:
      "Gold Coast public transport as an international student — the bus doesn't always stop, nowhere to complain. Built real-time geospatial complaint platform: AI classifies severity, maps issues by location, council admins see a live command center. Proof that AI belongs in everyday civic infrastructure.",
    techTags: [
      "Next.js",
      "TypeScript",
      "SSE",
      "AI Classification",
      "Geospatial maps",
    ],
    links: {
      live: "https://ambassador-jade.vercel.app/",
      github: "https://github.com/Ansh0928/ambassador",
    },
    image: "/images/projects/ambassador.png",
  },
];

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  photos?: ParulPhoto[];
};

export type ParulPhoto = {
  src: string;
  alt: string;
  caption: string;
  highlight?: boolean;
};
// Alias used by existing components
export type Photo = ParulPhoto;

export const parulPhotos: ParulPhoto[] = [
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
    photos: parulPhotos,
  },
];

// ── ACHIEVEMENTS ─────────────────────────────────────────────────────────────
export type Achievement = {
  icon: string;
  title: string;
  description: string;
};

export type Certification = {
  label: string;
  url: string; // Credly / LinkedIn credential URL
};

export const achievements: Achievement[] = [
  {
    icon: "🏆",
    title: "GC Innovation Hub AI Hackathon — 1st Place",
    description:
      'Built "Alumni Quest Hub" for Tech Ready Women. Gamified alumni retention platform, fully functional in 48 hours.',
  },
  {
    icon: "🥈",
    title: "ANZ Cyber Crime Hackathon — Top 5",
    description:
      "Security platform with AI detection + Blockchain audit logs. Simulated threats with Kali Linux under time pressure.",
  },
];

export const certifications: Certification[] = [
  {
    label: "Full Stack Dev (GFG)",
    url: "https://www.geeksforgeeks.org/certificate/",
  },
  { label: "DSA (TUF+)", url: "https://takeuforward.org/" },
  {
    label: "Google Data Analytics",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
  },
  { label: "AWS Cloud", url: "https://aws.amazon.com/certification/" },
  { label: "Data Analytics Python (NPTEL)", url: "https://nptel.ac.in/" },
];

// ── TECH STACK ───────────────────────────────────────────────────────────────
export const techStackPrimary = ["Next.js", "TypeScript", "React", "LangChain"];
export const techStackSecondary = [
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "Docker",
  "Ollama",
  "Swift",
  "Vue",
  "Framer Motion",
  "shadcn/ui",
  "Vercel",
  "Git",
  "Figma",
];

// ── BELIEFS ──────────────────────────────────────────────────────────────────
// italic: true = render in italic text-slate-300
export type Belief = {
  text: string;
  italic?: boolean;
};

export const beliefs: Belief[] = [
  // On AI
  {
    text: "For people like me, AI is a goldmine in a gold rush. Imagination and execution are the only limits.",
  },
  {
    text: "The best way to understand AI isn't a course. It's a dinner table conversation with your family.",
  },
  {
    text: "If you can explain what you're building to your mum and she gets excited — you're building something real.",
  },
  { text: "AI didn't make me a developer. It made me a faster thinker." },
  {
    text: "The engineers who'll win aren't the ones who fear AI. They're the ones already building with it.",
  },
  {
    text: "AI-native teams will move 10x faster than those unwilling to change.",
  },
  // On shipping
  {
    text: "Shipping fast beats the best strategy. The market tells you more than any planning session.",
  },
  {
    text: "I built their website before the interview. That's still the best decision I've ever made.",
    italic: true,
  },
  { text: "A working demo says more than a fifty-slide deck." },
  {
    text: "The goal isn't perfect code. The goal is something that works in production.",
  },
  { text: "Landings > launches. Adoption matters more than shipping." },
  { text: "Listen, build, ship, tell the customer, then repeat forever." },
  // On learning
  {
    text: "You learn more from one real conversation than from ten tutorials. Talk to people.",
  },
  {
    text: "Talk to your family about what you're building. Especially your mum. You'll understand it better yourself.",
  },
  { text: "Rejection is just a dataset. Iterate anyway." },
  { text: "Grit > talent. Every time." },
  { text: "There's no substitute for putting in the hours." },
  {
    text: 'The engineers I respect most are the ones most willing to say "I don\'t know yet."',
  },
  // On business & engineering
  {
    text: '"This website doesn\'t matter if you have no revenue from it."',
    italic: true,
  },
  { text: "Understand the workflow before you touch the code." },
  {
    text: "The business doesn't care how elegant the code is. It cares if it works.",
  },
  {
    text: "Revenue validates everything. Features validate nothing on their own.",
  },
  {
    text: "The problem is always worth more time than the solution you already thought of.",
  },
  {
    text: "Make-vs-buy is a strategy question first, an engineering question second.",
  },
  // On communication
  {
    text: "Clear writing is clear thinking. If you can't write it simply, you don't understand it yet.",
  },
  { text: "Communication is the job. The code is just the output." },
  { text: "Say the right thing, to the right people, at the right time." },
  { text: "Mismatched expectations always lead to sadness." },
  // On being you
  { text: "Your constraints are your advantage. Pressure creates shape." },
  {
    text: "Being new to something means you ask the questions everyone else forgot to ask.",
  },
  {
    text: "Own your failures publicly. It builds more trust than any portfolio.",
  },
  { text: "Have strong opinions, loosely held." },
  { text: "Influence > titles. Always." },
  {
    text: "Still learning. Still growing. Still making mistakes worth documenting.",
    italic: true,
  },
];

// ── CONTACT ──────────────────────────────────────────────────────────────────
export const contact = {
  email: "anshumaansaraf24@gmail.com",
  github: "https://github.com/Ansh0928",
  linkedin: "https://www.linkedin.com/in/anshumaan-saraf/",
  resume: "/Resume_Anshumaan_Saraf.pdf",
};

// ── META ─────────────────────────────────────────────────────────────────────
export const meta = {
  name: "Anshumaan Saraf",
  title: "Anshumaan Saraf — Forward Deployed Engineer | Gold Coast, Australia",
  description:
    "Anshumaan Saraf is a Forward Deployed Engineer based in Gold Coast, Australia. He builds full-stack systems that eliminate SaaS costs and drive revenue — from e-commerce platforms to AI-powered infrastructure.",
  url: "https://anshumaansaraf.com",
  jobTitle: "Forward Deployed Engineer",
  location: "Gold Coast, Australia",
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "AI Integration",
    "LangChain",
    "PostgreSQL",
  ],
};
