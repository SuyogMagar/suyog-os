export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  architecture: string[];
  stack: string[];
  features: string[];
  challenges: string[];
  learnings: string[];
  metrics: Record<string, string>;
  deployment: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "Full-Stack-Enterprise-Operations-Platform",
    name: "Full-Stack Enterprise Operations Platform",
    tagline: "Multi-module enterprise operations suite on Spring Boot + PostgreSQL.",
    problem:
      "Unify HR, inventory, billing and reporting for mid-size enterprises under one secure, role-based platform.",
    architecture: [
      "React client → Spring Boot REST API",
      "Spring Security (JWT) → Role-based access",
      "Spring Data JPA → PostgreSQL (normalized schema)",
      "Reporting service → scheduled jobs → PDF/CSV exports",
      "Dockerized services orchestrated via docker-compose",
    ],
    stack: ["Java", "Spring Boot", "Spring JPA", "PostgreSQL", "React", "Docker"],
    features: [
      "Modular domain services (HR, inventory, billing)",
      "JWT auth with fine-grained RBAC",
      "Audit trail on every mutation",
      "Exportable reports (PDF / CSV)",
    ],
    challenges: [
      "Designing a normalized PostgreSQL schema that scales across modules",
      "Transactional consistency across cross-module workflows",
    ],
    learnings: [
      "Spring JPA + PostgreSQL indexing strategies for OLTP",
      "Clean domain boundaries inside a monolith pay off long-term",
    ],
    metrics: { p95_latency: "92ms", tables: "48", modules: "5" },
    deployment: "docker compose · spring-boot · postgres 16 · nginx",
  },
  {
    slug: "Drive-Luxe",
    name: "Drive Luxe",
    tagline: "Premium self-drive car rental platform.",
    problem:
      "Provide a seamless, luxury car booking experience with dynamic fleet management and secure authentication.",
    architecture: [
      "React/Vite client → TailwindCSS + Framer Motion",
      "Supabase (PostgreSQL) → Auth, Database & Storage",
      "Dynamic fleet filtering & search",
      "Admin panel for inventory management",
    ],
    stack: ["React", "TypeScript", "Supabase", "TailwindCSS", "Vercel"],
    features: [
      "Secure Email/Password & Google OAuth",
      "Live fleet availability & filtering",
      "Premium, responsive UI with micro-animations",
      "Admin dashboard for fleet management",
    ],
    challenges: [
      "Building a complex filtering system for cars",
      "Seamless integration of Supabase Auth flows",
    ],
    learnings: [
      "Managing complex React state for bookings",
      "Supabase RLS (Row Level Security) policies",
    ],
    metrics: { page_load: "< 1s", lighthouse_score: "98/100" },
    deployment: "vercel · supabase",
  },
  {
    slug: "Real-Time-Stock-Pipeline",
    name: "Real-Time-Stock-Pipeline",
    tagline: "Streaming market data → Kafka → Redis → UI.",
    problem: "Ingest live stock ticks and deliver to thousands of clients with <200ms freshness.",
    architecture: [
      "Market Data API → Producer",
      "Producer → Kafka (topic: ticks)",
      "Consumers → Redis (ZSET per symbol)",
      "Spring Boot → SSE → React frontend",
    ],
    stack: ["Java", "Spring Boot", "Kafka", "Redis", "React", "Docker"],
    features: [
      "Backpressure-safe producer",
      "Per-symbol partitioning",
      "Hot/cold tier in Redis",
      "Live charting on the client",
    ],
    challenges: ["Avoiding tick reordering", "Handling broker disconnects gracefully"],
    learnings: ["Kafka partition keys matter", "SSE > WS for one-way push at scale"],
    metrics: { freshness_p95: "143ms", msgs_per_sec: "28k", symbols: "500" },
    deployment: "docker compose · 3 brokers · 1 redis · 2 api replicas",
  },
  {
    slug: "Huffman-Coder",
    name: "Huffman-Coder",
    tagline: "From-scratch Huffman compression in Java.",
    problem: "Build a teaching-grade lossless compressor with CLI and benchmarks.",
    architecture: [
      "CLI → Tokenizer",
      "Frequency table → Priority queue",
      "Tree → Canonical codes",
      "Bit-packed writer → .huf file",
    ],
    stack: ["Java", "JUnit", "Gradle"],
    features: ["Encode/decode CLI", "Canonical codes", "Bit-level IO"],
    challenges: ["Bit-packing edge cases", "Streaming large files without OOM"],
    learnings: ["Greedy + priority queues", "IO buffering matters"],
    metrics: { compression: "~42% on text", throughput: "180 MB/s" },
    deployment: "java -jar huffman.jar encode input.txt out.huf",
  },
];

/* ---------- Skills, grouped, with related projects ---------- */

export type Skill = {
  name: string;
  /** slugs from PROJECTS this skill was used in */
  projects?: string[];
};

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    icon: "</>",
    skills: [
      { name: "Core Java", projects: ["Full-Stack-Enterprise-Operations-Platform", "Real-Time-Stock-Pipeline", "Huffman-Coder"] },
      { name: "Python" },
      { name: "TypeScript", projects: ["Drive-Luxe"] },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙",
    skills: [
      { name: "Spring Boot", projects: ["Full-Stack-Enterprise-Operations-Platform", "Real-Time-Stock-Pipeline"] },
      { name: "Spring JPA", projects: ["Full-Stack-Enterprise-Operations-Platform"] },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "▤",
    skills: [
      { name: "PostgreSQL", projects: ["Full-Stack-Enterprise-Operations-Platform", "Drive-Luxe"] },
      { name: "Supabase", projects: ["Drive-Luxe"] },
      { name: "SQL", projects: ["Full-Stack-Enterprise-Operations-Platform"] },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "▣",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Postman" },
      { name: "Bash Shell" },
      { name: "Docker", projects: ["Full-Stack-Enterprise-Operations-Platform", "Real-Time-Stock-Pipeline"] },
      { name: "Kubernetes" },
    ],
  },
  {
    id: "subjects",
    label: "Core Subjects",
    icon: "✦",
    skills: [
      { name: "DSA", projects: ["Huffman-Coder"] },
      { name: "OOPs", projects: ["Full-Stack-Enterprise-Operations-Platform"] },
      { name: "Operating Systems" },
      { name: "Computer Networks", projects: ["Real-Time-Stock-Pipeline"] },
      { name: "DBMS", projects: ["Full-Stack-Enterprise-Operations-Platform", "Drive-Luxe"] },
    ],
  },
];

/* legacy exports kept for any stale imports */
export const SKILLS_GRAPH: Array<{ id: string; label: string; x: number; y: number; tech: string; note: string }> = [];
export const SKILL_EDGES: Array<[string, string]> = [];

export const TIMELINE = [
  { hash: "a1f2d3", date: "2021-04", title: "Started Java development", body: "First Spring Boot service deployed." },
  { hash: "b4c5d6", date: "2022-02", title: "Built Huffman-Coder", body: "From-scratch lossless compressor in Java with CLI + benchmarks." },
  { hash: "c7d8e9", date: "2023-06", title: "Built Full-Stack Enterprise Operations Platform", body: "Modular Spring Boot + PostgreSQL suite for HR, inventory and billing." },
  { hash: "d8e9f0", date: "2024-01", title: "Real-Time-Stock-Pipeline", body: "Sub-second market data pipeline at 28k msg/s on Kafka + Redis." },
  { hash: "e9f0a1", date: "2024-07", title: "Built Drive Luxe", body: "Premium self-drive car rental platform using React and Supabase." },
  { hash: "f1g2h3", date: "2024-10", title: "Deep dive: distributed systems", body: "Consensus, CRDTs, observability at scale." },
];

export const ABOUT_MD = [
  "# about.md",
  "",
  "**Suyog Magar** — Backend Engineer based in India.",
  "",
  "I design and operate backend systems: event-driven services, real-time",
  "pipelines, and infrastructure that survives bad days. I live in the Linux",
  "ecosystem and care about latency tails, observability, and clean domain",
  "boundaries.",
  "",
  "## What I do",
  "- Build Java / Spring Boot services that scale predictably",
  "- Design Kafka-based pipelines for real-time data",
  "- Ship containers with Docker, orchestrate with Kubernetes",
  "- Treat performance, reliability, and DX as first-class features",
  "",
  "## How I think",
  "Systems first. Measure before optimizing. Boring tech where it belongs,",
  "sharp tools where it counts.",
  "",
  "_eof_",
];

export const COMMANDS = [
  "help","about","skills","projects","resume","contact",
  "architecture","infra","monitor","timeline","neofetch","clear","history",
] as const;
export type Command = (typeof COMMANDS)[number] | string;
