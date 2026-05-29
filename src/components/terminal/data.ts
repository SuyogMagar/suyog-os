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
    slug: "Teckniv",
    name: "Teckniv",
    tagline: "Real-time event-driven SaaS platform.",
    problem: "Centralize multi-tenant operational data with sub-second updates across services.",
    architecture: [
      "Client → API Gateway (Spring Cloud Gateway)",
      "Gateway → Auth Service (JWT, OAuth2)",
      "Services → Kafka topics (events.*)",
      "Consumers → Postgres + Redis cache",
      "WebSocket fan-out → Frontend",
    ],
    stack: ["Java 21", "Spring Boot 3", "Kafka", "Redis", "Postgres", "Docker", "Kubernetes"],
    features: [
      "Event-driven micro-services",
      "Multi-tenant data isolation",
      "Realtime dashboards over WebSocket",
      "Role-based access control",
    ],
    challenges: [
      "Idempotent consumers across replays",
      "Hot-key cache invalidation under load",
    ],
    learnings: [
      "CQRS + outbox pattern for reliable event publishing",
      "K8s HPA tuning for bursty traffic",
    ],
    metrics: { p95_latency: "84ms", throughput: "12k rps", uptime: "99.97%" },
    deployment: "kubectl rollout: 3 replicas, HPA 3-12, Istio mesh",
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
  {
    slug: "DecentralX",
    name: "DecentralX",
    tagline: "Distributed file store with replication.",
    problem: "Store files reliably across N nodes with no single point of failure.",
    architecture: [
      "Client → Gateway",
      "Gateway → Hash ring (consistent hashing)",
      "Storage Nodes (replication factor 3)",
      "Gossip → membership & failure detection",
    ],
    stack: ["Java", "Netty", "Protobuf", "Docker"],
    features: ["Consistent hashing", "Replication", "Read repair"],
    challenges: ["Split-brain handling", "Rebalancing during node join"],
    learnings: ["Quorum reads/writes", "Gossip protocol design"],
    metrics: { nodes: "8", durability: "11 nines (modeled)", read_p95: "22ms" },
    deployment: "docker compose · 8 storage · 2 gateway",
  },
];

export const SKILLS_GRAPH = [
  { id: "client", label: "Frontend", x: 50, y: 60, tech: "React + TS", note: "SSR-ready UI" },
  { id: "gateway", label: "API Gateway", x: 50, y: 140, tech: "Spring Cloud Gateway", note: "Routing, rate-limit" },
  { id: "auth", label: "Auth", x: 220, y: 140, tech: "JWT · OAuth2", note: "Stateless tokens" },
  { id: "svc", label: "Services", x: 50, y: 230, tech: "Spring Boot 3", note: "Domain services" },
  { id: "kafka", label: "Kafka", x: 220, y: 230, tech: "Apache Kafka", note: "Event backbone" },
  { id: "redis", label: "Redis", x: 390, y: 230, tech: "Redis 7", note: "Cache · pub/sub" },
  { id: "db", label: "Postgres", x: 50, y: 320, tech: "Postgres 16", note: "OLTP store" },
  { id: "k8s", label: "Kubernetes", x: 390, y: 320, tech: "K8s + Docker", note: "Orchestration" },
];

export const SKILL_EDGES: Array<[string, string]> = [
  ["client", "gateway"],
  ["gateway", "auth"],
  ["gateway", "svc"],
  ["svc", "kafka"],
  ["kafka", "redis"],
  ["svc", "db"],
  ["kafka", "k8s"],
  ["redis", "k8s"],
];

export const TIMELINE = [
  { hash: "a1f2d3", date: "2021-04", title: "Started Java development", body: "First Spring Boot service deployed." },
  { hash: "b4c5d6", date: "2022-02", title: "Built DecentralX", body: "Distributed file store with replication and gossip." },
  { hash: "c7d8e9", date: "2023-06", title: "Built Teckniv", body: "Multi-tenant event-driven SaaS on Kafka + K8s." },
  { hash: "d8e9f0", date: "2024-01", title: "Real-Time-Stock-Pipeline", body: "Sub-second market data pipeline at 28k msg/s." },
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
