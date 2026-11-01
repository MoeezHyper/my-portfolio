// Single source of truth for all portfolio content.
// Edit this file to update anything on the site.

export const profile = {
  name: "Abdul Moeez",
  firstName: "Abdul",
  lastName: "Moeez",
  role: "Full-Stack Engineer",
  currentRole: "Full-Stack Engineer at GixiAI",
  tagline: "Full-stack engineer building multi-tenant SaaS, payments and AI integrations.",
  intro:
    "Backend focused: I architect PostgreSQL databases and REST APIs from scratch, wire in Stripe and AI, and ship it all to production.",
  about:
    "Backend-focused full-stack engineer who architects PostgreSQL databases and REST APIs from scratch and ships multi-tenant SaaS to production. At GixiAI I build products for Orenyx, a US AI lead-handling platform, on Node.js, TypeScript, Next.js and PostgreSQL with row-level security.",
  location: "Islamabad, Pakistan",
  timezone: "Asia/Karachi",
  email: "moeezmalik03@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdul-moeez-naeem-malik-888626208/",
  github: "https://github.com/MoeezHyper",
  resume: "/Abdul-Moeez-Resume.pdf",
  rotatingWords: ["multi-tenant SaaS", "Stripe payments", "AI integrations", "real-time voice agents", "REST APIs"],
};

/** Names that get auto-linked wherever they appear in copy. */
export const companyLinks: Record<string, string> = {
  "FIDSOR Private Limited": "https://fidsor.com/",
  FIDSOR: "https://fidsor.com/",
  GixiAI: "https://www.gixiai.com/",
  "gixiai.com": "https://www.gixiai.com/",
  "Orenyx Influencer Connect": "https://portal.orenyxinfluencerconnect.com/",
  "Orenyx NIL Engine": "https://portal.orenyxnilengine.com/",
  "Orenyx Engine": "https://portal.orenyxengine.com/",
};

export const stats: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  icon: "rocket" | "layers" | "brain";
  color: string; // rgb triplet
}[] = [
  {
    value: 10,
    suffix: "+",
    label: "Products live in production",
    detail: "Marketplaces, SaaS & voice agents",
    icon: "rocket",
    color: "196, 255, 97",
  },
  {
    value: 12,
    suffix: "+",
    label: "Projects shipped end to end",
    detail: "Full-time, freelance & internships",
    icon: "layers",
    color: "139, 123, 255",
  },
  {
    value: 6,
    suffix: "+",
    label: "Custom AI models trained",
    detail: "Vision & audio: YOLO, Keras, YAMNet",
    icon: "brain",
    color: "69, 227, 255",
  },
];

export type ExperienceKind = "work" | "internship" | "freelance" | "research";

export type Experience = {
  role: string;
  company: string;
  url?: string;
  period: string;
  type: string;
  kind: ExperienceKind;
  current?: boolean;
  summary: string;
  projects: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "Full-Stack Engineer",
    company: "GixiAI",
    url: "https://www.gixiai.com/",
    period: "08/2026 to Present",
    type: "Hybrid · Islamabad",
    kind: "work",
    current: true,
    summary:
      "Client: Orenyx, a US multi-product SaaS company whose AI lead-handling engine powers several vertical products. Two-developer team; I own whole products from scope to production.",
    projects: [
      "Architected the PostgreSQL databases for all three Orenyx products from scratch, with row-level security on every table, and built their REST APIs in NestJS and Express.",
      "Orenyx Influencer Connect: two-sided marketplace with a city launch lifecycle, a per-city Instagram creator discovery bot (Playwright, BullMQ), deal flow and billing.",
      "Orenyx NIL Engine: NIL deals platform for athletes, agents and brands, built end to end, with a retry outbox so no sign-up is lost.",
      "Orenyx Engine: security and compliance module with live Postgres row-level security status, sandbox mode, key rotation and audit exports.",
      "Stripe subscriptions, Stripe Connect and a credits ledger across three products.",
      "Co-built a live field service platform for trades businesses, with AI scheduling bots and voice-call-to-job handoff.",
      "Built gixiai.com solo: design, animations, responsive layout and SEO.",
    ],
    stack: [
      "TypeScript",
      "NestJS",
      "Express",
      "Next.js 16",
      "Prisma",
      "PostgreSQL (RLS)",
      "Redis",
      "BullMQ",
      "Stripe",
      "Playwright",
      "Vitest",
      "Turborepo",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "FIDSOR Private Limited",
    url: "https://fidsor.com/",
    period: "07/2026 to 09/2026",
    type: "Internship · Islamabad",
    kind: "internship",
    summary:
      "Took two SaaS products from concept to working MVP in a Next.js and React team, with code reviews, API integrations, testing and bug fixing.",
    projects: [
      "WhatsApp messaging platform on the official WhatsApp Business API: multi-account management, virtual groups, AI auto-replies and campaign messaging.",
      "Support and sales chatbot with FAQ intent detection, running on Gemini via OpenRouter.",
      "Social media manager that posts text, images and video to Facebook, Instagram and TikTok in one click, with AI post generation via the OpenAI API.",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Meta APIs"],
  },
  {
    role: "AI & Mobile Engineer, Final Year Project",
    company: "SZABIST University Islamabad",
    period: "01/2026 to Present",
    type: "Research & Engineering",
    kind: "research",
    summary:
      "Building an AI-powered animal welfare platform: training YOLO, Keras and YAMNet models, serving them through a Flask inference service, and shipping a React Native app on top.",
    projects: ["Integrated Animal Welfare & Rescue System"],
    stack: ["React Native", "Flask", "TensorFlow/Keras", "YOLO", "YAMNet"],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Zendev Studios",
    period: "07/2025 to 08/2025",
    type: "Internship",
    kind: "internship",
    summary:
      "Built ZenBug, a Chrome extension feedback tool with screenshot capture, annotation and upload, plus an admin dashboard and bug-tracking APIs.",
    projects: ["ZenBug Feedback Widget"],
    stack: ["React", "Node.js", "Supabase", "MongoDB", "Chrome Extensions API", "Tailwind CSS"],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Upwork & Freelancer",
    period: "2024 to Present",
    type: "Freelance",
    kind: "freelance",
    summary:
      "Delivering SaaS products and AI automation for international clients: database design, auth, payments, AI workflows and Linux deployments, shipped end to end.",
    projects: ["Tazmim: AI Interior Design SaaS", "Memecoin Launcher: AI auto-posting to X"],
    stack: ["Next.js", "React", "Node.js", "Supabase", "Stripe", "OpenAI API", "X API", "Redis"],
  },
];

export type ProjectVisual =
  | "influencer"
  | "nil"
  | "orenyxEngine"
  | "fieldService"
  | "voice"
  | "tazmim"
  | "gixiai"
  | "animal"
  | "memecoin"
  | "zenbug"
  | "shoplify"
  | "aws";

/**
 * Screenshot gallery / demo video for live projects without a public link.
 * Files go in /public/projects/. An empty object renders an "on request" slot.
 */
export type ProjectMedia = { video?: string; poster?: string; images?: string[] };

export type Project = {
  id: ProjectVisual;
  title: string;
  category: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: string; // hex used for glows and chips
  /** Live in production */
  live?: boolean;
  links?: { live?: string; repo?: string };
  media?: ProjectMedia;
};

/** Flagship products, ordered by impact, shown as full-screen stacking cards. */
export const featuredProjects: Project[] = [
  {
    id: "influencer",
    title: "Orenyx Influencer Connect",
    category: "Two-sided Marketplace",
    context: "GixiAI · for Orenyx",
    live: true,
    description:
      "A marketplace matching local businesses with creators, launched city by city. Each city moves through a launch lifecycle (Off, Warming Up, Ready, Live, At Risk) driven by live readiness counts, admin-editable thresholds and owner approval.",
    highlights: [
      "Scheduled per-city Instagram creator discovery bot on Playwright, Redis and BullMQ",
      "Live bot progress and stall detection in the admin panel",
      "Deal flow with in-app chat, city-gated free trials and billing",
      "Server-checked paid ad slots and an Instagram integration",
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL (RLS)", "Prisma", "BullMQ", "Playwright", "Stripe"],
    accent: "#ff7ab8",
    links: { live: "https://portal.orenyxinfluencerconnect.com/" },
  },
  {
    id: "nil",
    title: "Orenyx NIL Engine",
    category: "NIL Deals Platform",
    context: "GixiAI · for Orenyx",
    live: true,
    description:
      "A deals platform for college athletes, agents and brands, built end to end: role-based sign-up, identity verification intake, deal workflow, compliance audit trail, reporting and an admin console.",
    highlights: [
      "Retry outbox for calls to Orenyx Engine, so no sign-up or contact message is lost",
      "Role-based sign-up for athletes, agents and brands",
      "Deal workflow with a compliance audit trail",
      "Reporting and a full admin console",
    ],
    stack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL (RLS)", "Prisma"],
    accent: "#ffd166",
    links: { live: "https://portal.orenyxnilengine.com/" },
  },
  {
    id: "orenyxEngine",
    title: "Orenyx Engine",
    category: "Security & Compliance",
    context: "GixiAI · for Orenyx",
    live: true,
    description:
      "The AI lead-handling engine behind Orenyx's vertical products. I built its security and compliance module, plus rate-limited public endpoints that feed website engagement into Claude-based lead scoring.",
    highlights: [
      "Live row-level security status read from the PostgreSQL catalogue",
      "Strict sandbox mode for test keys",
      "Per-tenant key rotation",
      "Streamed audit exports",
    ],
    stack: ["NestJS", "TypeScript", "PostgreSQL (RLS)", "Prisma", "Claude API"],
    accent: "#5eead4",
    links: { live: "https://portal.orenyxengine.com/" },
  },
  {
    id: "voice",
    title: "AI Voice Calling Agent for US Trucking",
    category: "Conversational AI",
    context: "Personal SaaS · 06/2026 to 08/2026",
    live: true,
    description:
      "A voice agent that phones truck drivers across the US to connect them with available work, handling each call end to end. It starts replying within 300 ms of the driver finishing speaking, close to human conversational turn-taking.",
    highlights: [
      "Streaming speech-to-text, LLM and text-to-speech",
      "Starts replying within 300 ms of the driver finishing speaking",
      "Handles each call end to end",
    ],
    stack: ["Speech-to-Text", "LLM", "Text-to-Speech", "Real-time Streaming"],
    accent: "#45e3ff",
    media: {},
  },
  {
    id: "gixiai",
    title: "GixiAI Website",
    category: "Company Website",
    context: "Built solo at GixiAI",
    live: true,
    description:
      "The company website for GixiAI, designed and built solo in Next.js: original design, scroll-driven animations, fully responsive layouts and technical SEO.",
    highlights: [
      "Original design with scroll-driven animations",
      "Fully responsive layouts on every page",
      "Technical SEO: meta tags, Open Graph and Twitter cards, canonical URLs, indexing rules",
      "Service, portfolio, blog, FAQ and contact pages",
    ],
    stack: ["Next.js", "React", "Responsive Design", "Technical SEO"],
    accent: "#c4ff61",
    links: { live: "https://www.gixiai.com/" },
  },
  {
    id: "tazmim",
    title: "Tazmim",
    category: "AI SaaS Platform",
    context: "Freelance",
    live: true,
    description:
      "An AI interior design SaaS that turns a photo of a room into redesigned concepts, with subscriptions, payments and accounts built in.",
    highlights: [
      "Supabase PostgreSQL schema designed from scratch",
      "AI design generation workflows",
      "Google OAuth and JWT authentication",
      "Stripe subscriptions and Linux server deployment",
    ],
    stack: ["Next.js", "Supabase", "Stripe", "Google OAuth", "Linux"],
    accent: "#8b7bff",
  },
  {
    id: "animal",
    title: "Animal Welfare & Rescue System",
    category: "AI + Mobile Platform",
    context: "Final Year Project",
    live: true,
    description:
      "A React Native app for animal rescue, adoption, vet appointments and donations, powered by custom-trained vision and audio models.",
    highlights: [
      "Trained and fine-tuned YOLO, Keras and YAMNet models",
      "Breed, disease and emotion detection from images and audio",
      "OCR medical record digitization and geo-tagged rescue reports",
      "JWT, Google OAuth and role-based access",
    ],
    stack: ["React Native", "Expo", "Flask", "TensorFlow", "YOLO", "YAMNet"],
    accent: "#ffb86b",
    media: {},
  },
];

/** Additional work, shown as a compact grid. */
export const moreProjects: Project[] = [
  {
    id: "fieldService",
    title: "Field Service Platform",
    category: "Trades SaaS",
    context: "Co-built at GixiAI",
    live: true,
    description:
      "A platform for trades businesses with AI scheduling bots on Google Calendar and voice-call-to-job handoff, delivered against milestone scopes with unit and end-to-end tests.",
    highlights: [],
    stack: ["TypeScript", "Google Calendar API", "ElevenLabs", "Stripe", "Vitest"],
    accent: "#60a5fa",
    media: {},
  },
  {
    id: "zenbug",
    title: "ZenBug Feedback Widget",
    category: "Chrome Extension",
    context: "Zendev Studios",
    live: true,
    description:
      "Capture a screenshot, annotate it and send it straight to an admin dashboard backed by bug-tracking APIs.",
    highlights: [],
    stack: ["Chrome Extensions API", "React", "Node.js", "Supabase", "MongoDB"],
    accent: "#c4ff61",
    media: {},
  },
  {
    id: "aws",
    title: "Spring MVC on AWS",
    category: "Cloud & DevOps",
    context: "Production Deployment",
    live: true,
    description:
      "EC2 and RDS inside a custom VPC with public and private subnets, Apache reverse proxy, DNS and TLS via Certbot, scanned with Acunetix.",
    highlights: [],
    stack: ["Java", "Spring MVC", "AWS EC2", "AWS RDS", "Apache"],
    accent: "#ff9f43",
    media: {},
  },
  {
    id: "memecoin",
    title: "Memecoin Launcher",
    category: "AI Automation",
    context: "Freelance",
    description:
      "AI content generation and scheduled auto-posting to X with the OpenAI and X APIs, using Redis caching to cut API load.",
    highlights: [],
    stack: ["React", "Node.js", "OpenAI API", "X API", "Redis"],
    accent: "#ff7ab8",
  },
  {
    id: "shoplify",
    title: "Shoplify",
    category: "E-commerce",
    context: "Full-stack build",
    description: "A full-stack store with catalogue, cart, checkout and secure sessions, tuned with optimized queries.",
    highlights: [],
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    accent: "#ffb86b",
  },
];

export type SkillGroup = { title: string; color: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frontend",
    color: "#8b7bff",
    items: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "Next.js", "React", "React Native", "Tailwind CSS", "Zustand"],
  },
  {
    title: "Backend & Data",
    color: "#c4ff61",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Supabase",
      "MongoDB",
      "MySQL",
      "Flask",
      "Spring MVC",
    ],
  },
  {
    title: "Payments & Integrations",
    color: "#ff7ab8",
    items: [
      "Stripe",
      "Stripe Connect",
      "Twilio",
      "Meta Graph API",
      "WhatsApp Business API",
      "TikTok API",
      "Google Calendar API",
      "X API",
      "Google OAuth",
      "JWT",
    ],
  },
  {
    title: "AI / ML",
    color: "#45e3ff",
    items: [
      "Claude API",
      "OpenAI API",
      "Gemini (OpenRouter)",
      "ElevenLabs",
      "Voice Agent",
      "YOLO",
      "TensorFlow",
      "Keras",
      "YAMNet",
      "Transfer Learning",
    ],
  },
  {
    title: "Testing & Automation",
    color: "#ffd166",
    items: ["Playwright", "Vitest", "End-to-end Testing"],
  },
  {
    title: "DevOps & Tooling",
    color: "#ff9f43",
    items: [
      "Linux",
      "Hetzner",
      "Nginx",
      "Apache",
      "PM2",
      "Docker",
      "AWS EC2",
      "AWS RDS",
      "AWS VPC",
      "SSL/TLS",
      "Vercel",
      "pnpm",
      "Turborepo",
      "Git",
    ],
  },
];

export const education = [
  {
    degree: "BS Computer Science",
    school: "SZABIST University Islamabad · CGPA 3.6/4.0",
    courses: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Object Oriented Programming",
      "Computer Networks",
      "Operating Systems",
      "Parallel & Distributed Computing",
      "Artificial Intelligence",
    ],
  },
  {
    degree: "O & A Levels",
    school: "The City School",
    courses: [],
  },
];

export const certifications = [
  {
    title: "National AI Training Bootcamp: Datacenter Infrastructure & Solutions",
    issuer: "Pakistan Software Export Board (PSEB) · Indus AI Week",
  },
  {
    title: "Artificial Intelligence & Data Science Technical Training",
    issuer: "SZABIST Islamabad",
  },
  { title: "JavaScript", issuer: "Codecademy" },
  { title: "Python for Programmers", issuer: "Codecademy" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
