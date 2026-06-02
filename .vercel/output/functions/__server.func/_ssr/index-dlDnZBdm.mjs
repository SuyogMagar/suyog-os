import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { G as GitHubCalendar } from "../_libs/react-github-calendar.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/react-activity-calendar.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/tabbable.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const STEPS = [
  { cmd: "whoami", out: ["Suyog Magar"] },
  { cmd: "role", out: ["Backend Engineer", "Java Developer", "Distributed Systems Enthusiast"] },
  { cmd: "stack", out: ["Java · Spring Boot · Kafka · Redis", "Docker · Kubernetes · React · GitHub Actions"] },
  {
    cmd: "initialize portfolio",
    out: ["Loading modules...", "Loading infrastructure...", "Loading projects...", "Loading system architecture..."]
  }
];
function BootSequence({ onDone }) {
  const [step, setStep] = reactExports.useState(0);
  const [progress, setProgress] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (step >= STEPS.length) return;
    const isLast = step === STEPS.length - 1;
    const delay = isLast ? 1400 : 700;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);
  reactExports.useEffect(() => {
    if (step < STEPS.length - 1) return;
    let v = 0;
    const id = setInterval(() => {
      v += 4 + Math.random() * 6;
      setProgress(Math.min(100, v));
      if (v >= 100) {
        clearInterval(id);
        setTimeout(onDone, 450);
      }
    }, 70);
    return () => clearInterval(id);
  }, [step, onDone]);
  const visible = STEPS.slice(0, Math.min(step + 1, STEPS.length));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.4 },
      className: "glass w-full max-w-2xl overflow-hidden rounded-xl",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-[oklch(0.68_0.22_25)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-[oklch(0.82_0.16_85)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-[oklch(0.78_0.15_160)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-xs text-muted-foreground", children: "suyog@portfolio: ~ — boot" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "scanline px-5 py-6 text-sm leading-relaxed", children: [
          visible.map((s, i) => {
            const isCurrent = i === step;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "$ " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TypedLine, { text: s.cmd, done: !isCurrent })
              ] }),
              (!isCurrent || step >= STEPS.length - 1) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 pl-4 text-foreground/90", children: s.out.map((o, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, x: -6 },
                  animate: { opacity: 1, x: 0 },
                  transition: { delay: 0.05 * j + 0.25 },
                  children: o
                },
                j
              )) })
            ] }, i);
          }),
          step >= STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "h-full bg-primary",
                initial: { width: 0 },
                animate: { width: `${progress}%` },
                transition: { ease: "linear", duration: 0.07 }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "booting kernel · mounting filesystems" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                Math.floor(progress),
                "%"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
function TypedLine({ text, done }) {
  const [n, setN] = reactExports.useState(done ? text.length : 0);
  reactExports.useEffect(() => {
    if (done) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text, done]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: n < text.length ? "caret" : "", children: text.slice(0, n) });
}
const BANNER = [
  "███████╗██╗   ██╗██╗   ██╗ ██████╗  ██████╗   ███╗   ███╗ █████╗  ██████╗  █████╗ ██████╗ ",
  "██╔════╝██║   ██║╚██╗ ██╔╝██╔═══██╗██╔════╝   ████╗ ████║██╔══██╗██╔════╝ ██╔══██╗██╔══██╗",
  "███████╗██║   ██║ ╚████╔╝ ██║   ██║██║  ███╗  ██╔████╔██║███████║██║  ███╗███████║██████╔╝",
  "╚════██║██║   ██║  ╚██╔╝  ██║   ██║██║   ██║  ██║╚██╔╝██║██╔══██║██║   ██║██╔══██║██╔══██╗",
  "███████║╚██████╔╝   ██║   ╚██████╔╝╚██████╔╝  ██║ ╚═╝ ██║██║  ██║╚██████╔╝██║  ██║██║  ██║",
  "╚══════╝ ╚═════╝    ╚═╝    ╚═════╝  ╚═════╝   ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝"
];
const SUBLINES = [
  "> backend.engineer  //  java · spring · kafka · redis · k8s",
  "> compiling distributed systems..."
];
function AsciiBanner({ onDone }) {
  const total = BANNER[0].length;
  const [n, setN] = reactExports.useState(0);
  const [sub, setSub] = reactExports.useState(0);
  const doneRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      if (i >= total) {
        setN(total);
        clearInterval(id);
        setTimeout(() => setSub(1), 250);
        setTimeout(() => setSub(2), 900);
      } else setN(i);
    }, 14);
    return () => clearInterval(id);
  }, [total]);
  reactExports.useEffect(() => {
    if (sub < 2 || doneRef.current) return;
    doneRef.current = true;
    const t = setTimeout(onDone, 4e3);
    return () => clearTimeout(t);
  }, [sub, onDone]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col items-center justify-center overflow-hidden px-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "pre",
        {
          className: "m-0 w-full overflow-hidden whitespace-pre text-center font-mono text-[6px] leading-[1.05] text-primary sm:text-[7px] md:text-[8px]",
          style: { textShadow: "0 0 8px oklch(0.72 0.18 240 / 0.55)" },
          children: BANNER.map((l) => l.slice(0, n)).join("\n")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 ascii-scan" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 h-8 text-center text-[10px] leading-tight text-accent", children: [
      sub >= 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-90", children: SUBLINES[0] }),
      sub >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "caret opacity-90", children: SUBLINES[1] })
    ] })
  ] });
}
const CUP = [
  "      (  (   )    ",
  "       )  )  (    ",
  "      (  (   )    ",
  "    _.._.._.._.   ",
  "   |``''''''''|___",
  "   |  espresso |   )",
  "   |   ______  |  / ",
  "   |  |______| | /  ",
  "    \\__________|/   ",
  "   `'''''''''''`    "
];
const STEAM_FRAMES = [
  ["  ~   ~    ~  ", "   ~   ~   ~  ", "  ~   ~    ~  "],
  ["   ~   ~   ~ ", "  ~    ~  ~  ", "   ~   ~   ~ "],
  ["  ~  ~    ~  ", "   ~   ~   ~ ", "  ~   ~   ~  "],
  ["    ~   ~  ~ ", "   ~   ~    ~", "    ~   ~   ~"]
];
function AsciiCoffee() {
  const [f, setF] = reactExports.useState(0);
  const [tick, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => setF((x) => (x + 1) % STEAM_FRAMES.length), 220);
    const id2 = setInterval(() => setTick((x) => x + 1), 1e3);
    return () => {
      clearInterval(id);
      clearInterval(id2);
    };
  }, []);
  const steam = STEAM_FRAMES[f];
  const cup = [
    "      " + steam[0],
    "      " + steam[1],
    "      " + steam[2],
    ...CUP.slice(3)
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col items-center justify-center px-2 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "pre",
      {
        className: "m-0 whitespace-pre font-mono text-[11px] leading-[1.05] text-accent sm:text-[12px]",
        style: { textShadow: "0 0 6px oklch(0.78 0.15 160 / 0.45)" },
        children: cup.join("\n")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-[10px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block size-1.5 animate-pulse rounded-full bg-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "uptime: ∞" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "fueled by espresso" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 opacity-50", children: [
        "[",
        tick,
        "s]"
      ] })
    ] })
  ] });
}
function AsciiShowcase({ className = "" }) {
  const [phase, setPhase] = reactExports.useState("banner");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: phase === "banner" ? /* @__PURE__ */ jsxRuntimeExports.jsx(AsciiBanner, { onDone: () => setPhase("coffee") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AsciiCoffee, {}) });
}
const PROJECTS = [
  {
    slug: "Full-Stack-Enterprise-Operations-Platform",
    name: "Full-Stack Enterprise Operations Platform",
    tagline: "Multi-module enterprise operations suite on Spring Boot + PostgreSQL.",
    problem: "Unify HR, inventory, billing and reporting for mid-size enterprises under one secure, role-based platform.",
    architecture: [
      "React client → Spring Boot REST API",
      "Spring Security (JWT) → Role-based access",
      "Spring Data JPA → PostgreSQL (normalized schema)",
      "Reporting service → scheduled jobs → PDF/CSV exports",
      "Dockerized services orchestrated via docker-compose"
    ],
    stack: ["Java", "Spring Boot", "Spring JPA", "PostgreSQL", "React", "Docker"],
    features: [
      "Modular domain services (HR, inventory, billing)",
      "JWT auth with fine-grained RBAC",
      "Audit trail on every mutation",
      "Exportable reports (PDF / CSV)"
    ],
    challenges: [
      "Designing a normalized PostgreSQL schema that scales across modules",
      "Transactional consistency across cross-module workflows"
    ],
    learnings: [
      "Spring JPA + PostgreSQL indexing strategies for OLTP",
      "Clean domain boundaries inside a monolith pay off long-term"
    ],
    metrics: { p95_latency: "92ms", tables: "48", modules: "5" },
    deployment: "docker compose · spring-boot · postgres 16 · nginx"
  },
  {
    slug: "GeoRescue",
    name: "GeoRescue",
    tagline: "Geo-aware emergency response platform on MongoDB.",
    problem: "Match emergency requests with the nearest available responders in real time using geospatial queries.",
    architecture: [
      "Mobile/Web client → Spring Boot API",
      "MongoDB (2dsphere index) → geo-nearest queries",
      "WebSocket channel → live responder updates",
      "Notification worker → SMS / push alerts"
    ],
    stack: ["Java", "Spring Boot", "MongoDB", "WebSocket", "Docker"],
    features: [
      "Geospatial nearest-responder matching",
      "Live location streaming over WebSocket",
      "Incident lifecycle (open → assigned → resolved)",
      "Heatmap of historical incidents"
    ],
    challenges: [
      "Tuning MongoDB 2dsphere indexes for low-latency $near queries",
      "Reconnect + state sync for flaky mobile networks"
    ],
    learnings: [
      "MongoDB geospatial operators and index tradeoffs",
      "Designing event flows that survive disconnects"
    ],
    metrics: { match_p95: "180ms", active_responders: "120", incidents_handled: "3.2k" },
    deployment: "docker compose · spring-boot · mongo replica set"
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
      "Spring Boot → SSE → React frontend"
    ],
    stack: ["Java", "Spring Boot", "Kafka", "Redis", "React", "Docker"],
    features: [
      "Backpressure-safe producer",
      "Per-symbol partitioning",
      "Hot/cold tier in Redis",
      "Live charting on the client"
    ],
    challenges: ["Avoiding tick reordering", "Handling broker disconnects gracefully"],
    learnings: ["Kafka partition keys matter", "SSE > WS for one-way push at scale"],
    metrics: { freshness_p95: "143ms", msgs_per_sec: "28k", symbols: "500" },
    deployment: "docker compose · 3 brokers · 1 redis · 2 api replicas"
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
      "Bit-packed writer → .huf file"
    ],
    stack: ["Java", "JUnit", "Gradle"],
    features: ["Encode/decode CLI", "Canonical codes", "Bit-level IO"],
    challenges: ["Bit-packing edge cases", "Streaming large files without OOM"],
    learnings: ["Greedy + priority queues", "IO buffering matters"],
    metrics: { compression: "~42% on text", throughput: "180 MB/s" },
    deployment: "java -jar huffman.jar encode input.txt out.huf"
  }
];
const SKILL_CATEGORIES = [
  {
    id: "languages",
    label: "Programming Languages",
    icon: "</>",
    skills: [
      { name: "Core Java", projects: ["Full-Stack-Enterprise-Operations-Platform", "GeoRescue", "Real-Time-Stock-Pipeline", "Huffman-Coder"] },
      { name: "Python" }
    ]
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙",
    skills: [
      { name: "Spring Boot", projects: ["Full-Stack-Enterprise-Operations-Platform", "GeoRescue", "Real-Time-Stock-Pipeline"] },
      { name: "Spring JPA", projects: ["Full-Stack-Enterprise-Operations-Platform"] }
    ]
  },
  {
    id: "database",
    label: "Database",
    icon: "▤",
    skills: [
      { name: "PostgreSQL", projects: ["Full-Stack-Enterprise-Operations-Platform"] },
      { name: "MongoDB", projects: ["GeoRescue"] },
      { name: "SQL", projects: ["Full-Stack-Enterprise-Operations-Platform"] }
    ]
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
      { name: "Docker", projects: ["Full-Stack-Enterprise-Operations-Platform", "GeoRescue", "Real-Time-Stock-Pipeline"] },
      { name: "Kubernetes" }
    ]
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
      { name: "DBMS", projects: ["Full-Stack-Enterprise-Operations-Platform", "GeoRescue"] }
    ]
  }
];
const TIMELINE = [
  { hash: "a1f2d3", date: "2021-04", title: "Started Java development", body: "First Spring Boot service deployed." },
  { hash: "b4c5d6", date: "2022-02", title: "Built Huffman-Coder", body: "From-scratch lossless compressor in Java with CLI + benchmarks." },
  { hash: "c7d8e9", date: "2023-06", title: "Built Full-Stack Enterprise Operations Platform", body: "Modular Spring Boot + PostgreSQL suite for HR, inventory and billing." },
  { hash: "d8e9f0", date: "2024-01", title: "Real-Time-Stock-Pipeline", body: "Sub-second market data pipeline at 28k msg/s on Kafka + Redis." },
  { hash: "e9f0a1", date: "2024-07", title: "Built GeoRescue", body: "Geo-aware emergency response platform on MongoDB 2dsphere." },
  { hash: "f1g2h3", date: "2024-10", title: "Deep dive: distributed systems", body: "Consensus, CRDTs, observability at scale." }
];
const ABOUT_MD = [
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
  "_eof_"
];
const COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "resume",
  "contact",
  "architecture",
  "infra",
  "monitor",
  "timeline",
  "neofetch",
  "clear",
  "history"
];
function Window({
  title,
  children,
  tone = "default"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass overflow-hidden rounded-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[oklch(0.68_0.22_25)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[oklch(0.82_0.16_85)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[oklch(0.78_0.15_160)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-2 truncate text-xs ${tone === "accent" ? "text-accent" : "text-muted-foreground"}`, children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "scanline", children })
  ] });
}
function Neofetch() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "suyog@portfolio: ~ — neofetch", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 p-5 lg:grid-cols-[1fr_1.5fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-base", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "user", v: "Suyog Magar", highlight: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "role", v: "Backend Engineer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "location", v: "India" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "os", v: "Linux · Arch / Ubuntu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "shell", v: "zsh + tmux" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "editor", v: "Neovim · IntelliJ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { k: "focus", v: "Backend · Distributed Systems · Realtime Pipelines" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "primary stack" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: ["Java", "Spring Boot", "Kafka", "Redis", "Docker", "Kubernetes"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-surface-2 px-3 py-1 text-sm text-primary", children: t }, t)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-1.5", children: ["bg-primary", "bg-accent", "bg-[oklch(0.82_0.16_85)]", "bg-[oklch(0.68_0.22_25)]", "bg-foreground/70"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-4 w-8 rounded-sm ${c}` }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-5 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeetcodeStats, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-60 w-full overflow-hidden rounded-lg border border-border bg-[oklch(0.14_0.008_240)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AsciiShowcase, { className: "absolute inset-0 size-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 grid-bg opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-4 text-xs uppercase tracking-widest text-muted-foreground", children: "ident · globe.live" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-5 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GithubStats, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AchievementsSection, {}) })
    ] })
  ] }) });
}
function GithubStats() {
  const scrollRef = reactExports.useRef(null);
  const [totalCommits, setTotalCommits] = reactExports.useState(320);
  reactExports.useEffect(() => {
    fetch("https://github-contributions-api.deno.dev/suyogmagar.json").then((r) => r.json()).then((d) => {
      if (d && typeof d.totalContributions === "number") {
        setTotalCommits(d.totalContributions);
      }
    }).catch(console.error);
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const interval = setInterval(() => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth;
      }
    }, 100);
    setTimeout(() => clearInterval(interval), 3e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "★" }),
        " GitHub Profile"
      ] }),
      totalCommits !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary font-bold", children: [
        totalCommits,
        " Contributions ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "Last Year" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex-1 overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-[oklch(0.14_0.008_240)] p-5",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-max", id: "github-calendar-wrapper", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
            __html: `
            #github-calendar-wrapper article footer,
            #github-calendar-wrapper .react-activity-calendar__footer {
              display: none !important;
            }
          `
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GitHubCalendar,
            {
              username: "suyogmagar",
              colorScheme: "dark",
              fontSize: 12,
              blockSize: 11,
              blockMargin: 4,
              hideTotalCount: true,
              hideColorLegend: true
            }
          )
        ] })
      }
    )
  ] });
}
function LeetcodeStats() {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchLeetcode = async () => {
      const fallbackData = {
        easy: 133,
        medium: 140,
        hard: 27,
        total: 300,
        rating: 1675,
        topPercentage: 15.5
      };
      try {
        const username = "Suyog_Magar";
        const [solvedRes, contestRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`).then((r) => r.json()),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`).then((r) => r.json())
        ]);
        if (!solvedRes.solvedProblem) {
          setData(fallbackData);
        } else {
          setData({
            easy: solvedRes.easySolved || 0,
            medium: solvedRes.mediumSolved || 0,
            hard: solvedRes.hardSolved || 0,
            total: solvedRes.solvedProblem || 0,
            rating: contestRes.contestRating ? Math.round(contestRes.contestRating) : fallbackData.rating,
            topPercentage: contestRes.contestTopPercentage || fallbackData.topPercentage
          });
        }
      } catch (e) {
        console.error("Failed to fetch LeetCode stats", e);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchLeetcode();
  }, []);
  const easyPct = data?.total ? data.easy / data.total * 100 : 0;
  const medPct = data?.total ? easyPct + data.medium / data.total * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "⚡" }),
      " LeetCode Profile"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 rounded-lg border border-border bg-surface-2/40 p-5 sm:w-[160px] shrink-0 flex flex-col justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Contest Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-bold text-primary", children: loading ? "..." : data?.rating?.toLocaleString() }),
        !loading && data?.topPercentage !== "N/A" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-accent", children: [
          "Top ",
          data?.topPercentage,
          "%"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center rounded-lg border border-border bg-surface-2/40 p-5 flex-1 relative group cursor-pointer h-[160px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-5 text-xs uppercase text-muted-foreground z-10 transition-opacity group-hover:opacity-0", children: "Problems Solved" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-surface-2/95 z-20 rounded-lg p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProblemBar, { label: "Easy", count: data?.easy, total: 800, color: "bg-[oklch(0.78_0.15_160)]", loading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProblemBar, { label: "Medium", count: data?.medium, total: 1600, color: "bg-[oklch(0.82_0.16_85)]", loading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProblemBar, { label: "Hard", count: data?.hard, total: 700, color: "bg-[oklch(0.68_0.22_25)]", loading })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mt-4 group-hover:opacity-0 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "relative w-28 h-28 flex items-center justify-center rounded-full",
            style: {
              background: loading ? "transparent" : `conic-gradient(
                  oklch(0.78 0.15 160) 0% ${easyPct}%, 
                  oklch(0.82 0.16 85) ${easyPct}% ${medPct}%, 
                  oklch(0.68 0.22 25) ${medPct}% 100%
                )`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-1.5 bg-[oklch(0.12_0.005_240)] rounded-full flex flex-col items-center justify-center shadow-inner", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: loading ? "..." : data?.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase text-muted-foreground", children: "Total" })
            ] })
          }
        ) })
      ] })
    ] })
  ] });
}
function AchievementsSection() {
  const [leetcodeBadges, setLeetcodeBadges] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fallbackLeetcodeBadges = [
      { displayName: "100 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png" },
      { displayName: "50 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png" },
      { displayName: "Mar LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2026-3.png" },
      { displayName: "Feb LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2026-2.png" }
    ];
    fetch(`https://alfa-leetcode-api.onrender.com/Suyog_Magar/badges`).then((r) => r.json()).then((data) => {
      setLeetcodeBadges(data.badges && data.badges.length > 0 ? data.badges.slice(0, 4) : fallbackLeetcodeBadges);
      setLoading(false);
    }).catch(() => {
      setLeetcodeBadges(fallbackLeetcodeBadges);
      setLoading(false);
    });
  }, []);
  const githubBadges = [
    { name: "Pair Extraordinaire", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/pair-extraordinaire-default.png" },
    { name: "YOLO", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/yolo-default.png" },
    { name: "Quickdraw", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/quickdraw-default.png" },
    { name: "Pull Shark", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/pull-shark-default.png" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "🏆" }),
      " Achievements & Badges"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface-2/40 p-5 flex flex-col xl:flex-row gap-6 xl:items-center min-h-[100px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap", children: "GitHub" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: githubBadges.map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: badge.url, alt: badge.name, className: "w-16 h-16 object-contain drop-shadow-lg transition-transform hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-3 py-1.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-10 border border-border shadow-lg", children: badge.name })
        ] }, badge.name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-16 bg-border hidden xl:block" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-border block xl:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap", children: "LeetCode" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Loading..." }) : leetcodeBadges.map((b, i) => {
          const iconUrl = b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: iconUrl, alt: b.displayName, className: "w-16 h-16 object-contain drop-shadow-lg transition-transform hover:scale-110" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-3 py-1.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-10 border border-border shadow-lg", children: b.displayName })
          ] }, i);
        }) })
      ] })
    ] })
  ] });
}
function ProblemBar({ label, count, total, color, loading }) {
  const pct = loading || !count ? 0 : Math.min(100, Math.max(0, count / total * 100));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-16 text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 flex-1 overflow-hidden rounded-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `h-full ${color} transition-all duration-1000 ease-out`,
        style: { width: `${pct}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-right text-primary", children: loading ? "-" : count })
  ] });
}
function Row({ k, v, highlight }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-24 shrink-0 text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ": " }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `pl-2 ${highlight ? "text-accent" : "text-foreground"}`, children: v })
  ] });
}
function AboutFile() {
  const [shown, setShown] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= ABOUT_MD.length) {
          clearInterval(id);
          return s;
        }
        return s + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "~/about.md — cat", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[40px_1fr] gap-0 p-0 font-mono text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-r border-border bg-surface-2/40 py-3 text-right text-xs text-muted-foreground", children: ABOUT_MD.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 leading-6", children: i + 1 }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3", children: ABOUT_MD.map((line, i) => {
      const visible = i < shown;
      const isHeading = line.startsWith("#");
      const isBold = line.includes("**");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `min-h-[1.5rem] px-3 leading-6 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"} ${isHeading ? "text-primary" : ""}`,
          dangerouslySetInnerHTML: {
            __html: renderMd(line, isBold)
          }
        },
        i
      );
    }) })
  ] }) });
}
function renderMd(line, bold) {
  let s = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  s = s.replace(/\*\*(.+?)\*\*/g, '<span class="text-accent font-semibold">$1</span>');
  s = s.replace(/_(.+?)_/g, '<span class="text-muted-foreground italic">$1</span>');
  return bold ? s : s;
}
function SkillsMap() {
  const [hover, setHover] = reactExports.useState(null);
  const projectBySlug = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    PROJECTS.forEach((p) => m.set(p.slug, p));
    return m;
  }, []);
  const activeSkill = reactExports.useMemo(() => {
    if (!hover) return null;
    for (const cat of SKILL_CATEGORIES) {
      const s = cat.skills.find((sk) => sk.name === hover);
      if (s) return { skill: s, category: cat };
    }
    return null;
  }, [hover]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ skills — tree ~/skills", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-0 md:grid-cols-[1fr_260px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-[oklch(0.14_0.008_240)] p-4 font-mono text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "$" }),
        " tree ~/skills"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-foreground/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-accent", children: "skills/" }),
        SKILL_CATEGORIES.map((cat, ci) => {
          const lastCat = ci === SKILL_CATEGORIES.length - 1;
          const catBranch = lastCat ? "└──" : "├──";
          const pipe = lastCat ? "   " : "│  ";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 leading-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: catBranch }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                cat.label,
                "/"
              ] })
            ] }),
            cat.skills.map((sk, si) => {
              const lastSk = si === cat.skills.length - 1;
              const skBranch = lastSk ? "└──" : "├──";
              const isActive = hover === sk.name;
              const hasProjects = sk.projects && sk.projects.length > 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onMouseEnter: () => setHover(sk.name),
                  onMouseLeave: () => setHover(null),
                  className: `flex items-center gap-2 leading-6 px-1 -mx-1 rounded transition-colors ${isActive ? "bg-surface-2/60" : "hover:bg-surface-2/30"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground whitespace-pre", children: [
                      pipe,
                      skBranch
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: isActive ? "text-accent" : "text-foreground/90", children: sk.name }),
                    hasProjects && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      "· ",
                      sk.projects.length,
                      " project",
                      sk.projects.length > 1 ? "s" : ""
                    ] })
                  ]
                },
                sk.name
              );
            })
          ] }, cat.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border p-4 text-sm md:border-l md:border-t-0", children: activeSkill ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: activeSkill.category.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg text-primary", children: activeSkill.skill.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xs uppercase tracking-widest text-muted-foreground", children: "used in" }),
      activeSkill.skill.projects && activeSkill.skill.projects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1 space-y-1.5", children: activeSkill.skill.projects.map((slug) => {
        const p = projectBySlug.get(slug);
        if (!p) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-md border border-border bg-surface-2/40 p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-accent", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: p.tagline })
        ] }, slug);
      }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground italic", children: "Foundational skill — applied across coursework & exploration." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest", children: "hint" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: "Hover a skill to see related projects." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs", children: [
        "Organized as a static ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "tree" }),
        " — like",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "tree ~/skills" }),
        " in your shell."
      ] })
    ] }) })
  ] }) });
}
function ProjectsList({ onOpen }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Window, { title: "$ ls projects", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 p-4 sm:grid-cols-2", children: PROJECTS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => onOpen(p.slug),
        className: "group flex items-start gap-3 rounded-lg border border-border bg-surface-2/40 p-3 text-left transition hover:border-primary/60 hover:bg-surface-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 text-accent", children: "📁" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary group-hover:underline", children: [
                p.slug,
                "/"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "main" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: p.tagline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-1", children: p.stack.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm border border-border px-1.5 text-[10px] text-muted-foreground", children: s }, s)) })
          ] })
        ]
      },
      p.slug
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-4 py-2 text-xs text-muted-foreground", children: [
      "tip: run ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "cd projects/GeoRescue" }),
      " to open a repo."
    ] })
  ] });
}
function ProjectDetail({ slug }) {
  const p = PROJECTS.find((x) => x.slug.toLowerCase() === slug.toLowerCase());
  const [tab, setTab] = reactExports.useState("README.md");
  if (!p) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: `cd projects/${slug}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-sm text-[oklch(0.68_0.22_25)]", children: [
      "bash: cd: projects/",
      slug,
      ": No such file or directory"
    ] }) });
  }
  const tabs = ["README.md", "Architecture.md", "Metrics.json", "Deployment.yaml"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Window, { title: `~/projects/${p.slug} — code`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-1 border-b border-border bg-surface-2/40 px-2 py-1.5 text-xs", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setTab(t),
        className: `rounded-md px-2.5 py-1 transition ${tab === t ? "bg-background text-primary" : "text-muted-foreground hover:text-foreground"}`,
        children: t
      },
      t
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 text-sm leading-relaxed", children: [
      tab === "README.md" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-primary", children: [
            "# ",
            p.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: p.tagline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Problem", children: p.problem }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Tech Stack", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-primary", children: s }, s)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Features", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: p.features }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Challenges", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: p.challenges }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Learnings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: p.learnings }) })
      ] }),
      tab === "Architecture.md" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-primary", children: "## Architecture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap text-foreground/90", children: p.architecture.map((l) => `  ${l}`).join("\n") })
      ] }),
      tab === "Metrics.json" && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap text-foreground/90", children: JSON.stringify(p.metrics, null, 2) }),
      tab === "Deployment.yaml" && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap text-accent", children: `# deployment
${p.deployment}` })
    ] })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-foreground/90", children })
  ] });
}
function BulletList({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "›" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i })
  ] }, i)) });
}
function Monitor() {
  const [series, setSeries] = reactExports.useState([
    { label: "api.requests", unit: "rps", value: 1240, max: 4e3, tone: "primary" },
    { label: "kafka.messages", unit: "msg/s", value: 8400, max: 3e4, tone: "accent" },
    { label: "redis.hit_rate", unit: "%", value: 92, max: 100, tone: "accent" },
    { label: "docker.containers", unit: "", value: 14, max: 24, tone: "primary" },
    { label: "response.p95", unit: "ms", value: 84, max: 400, tone: "primary" },
    { label: "cpu.usage", unit: "%", value: 38, max: 100, tone: "primary" },
    { label: "memory.usage", unit: "%", value: 56, max: 100, tone: "accent" }
  ]);
  const [spark, setSpark] = reactExports.useState(() => Array.from({ length: 48 }, () => 0.4 + Math.random() * 0.4));
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setSeries(
        (arr) => arr.map((s) => {
          const drift = (Math.random() - 0.5) * s.max * 0.08;
          const v = Math.max(0, Math.min(s.max, s.value + drift));
          return { ...s, value: v };
        })
      );
      setSpark((arr) => {
        const next = [...arr.slice(1), Math.max(0.05, Math.min(1, arr[arr.length - 1] + (Math.random() - 0.5) * 0.18))];
        return next;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ monitor — system.dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3", children: [
    series.map((s) => {
      const pct = s.value / s.max * 100;
      const color = s.tone === "accent" ? "bg-accent" : "bg-primary";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface-2/40 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
            s.unit === "%" ? Math.round(s.value) : Math.round(s.value).toLocaleString(),
            s.unit && ` ${s.unit}`
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: `h-full ${color}`, animate: { width: `${pct}%` }, transition: { duration: 0.6 } }) })
      ] }, s.label);
    }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface-2/40 p-3 sm:col-span-2 lg:col-span-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "throughput.live" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "● streaming" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: spark })
    ] })
  ] }) });
}
function Sparkline({ data }) {
  const W = 600, H = 70;
  const step = W / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${H - v * H}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "h-20 w-full", preserveAspectRatio: "none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "sg", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.72 0.18 240)", stopOpacity: "0.45" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.72 0.18 240)", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { fill: "none", stroke: "oklch(0.72 0.18 240)", strokeWidth: "1.5", points }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { fill: "url(#sg)", points: `0,${H} ${points} ${W},${H}` })
  ] });
}
function ArchitectureLab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ architecture — system.design.lab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 p-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchCard,
      {
        title: "Real-Time Stock Pipeline",
        nodes: ["API", "Kafka", "Consumers", "Redis", "Frontend"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchCard,
      {
        title: "GeoRescue (MongoDB 2dsphere)",
        nodes: ["Client", "Spring Boot API", "MongoDB · $near", "WebSocket Fan-out"]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ArchCard,
      {
        title: "Enterprise Operations Platform",
        nodes: ["React Client", "Spring Boot REST", "Spring JPA", "PostgreSQL"]
      }
    )
  ] }) });
}
function ArchCard({ title, nodes }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface-2/40 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-sm text-primary", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-stretch gap-2", children: nodes.map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground hover:border-primary/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "●" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n })
      ] }),
      i < nodes.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative my-1 ml-3 h-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 h-full w-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-3px] top-0 size-1.5 animate-pulse rounded-full bg-accent" })
      ] })
    ] }, n)) })
  ] });
}
function Timeline() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ timeline — git log --oneline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-4 text-sm", children: TIMELINE.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -6 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: i * 0.06 },
      className: "flex gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 w-16 shrink-0 font-mono text-accent", children: t.hash }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: t.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: t.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: t.body })
        ] })
      ]
    },
    t.hash
  )) }) });
}
function ResumePanel() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ resume — Resume.pdf", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 p-4 md:grid-cols-[1fr_220px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        src: "/Resume.pdf",
        className: "aspect-[1/1.4] w-full rounded-lg border border-border bg-white",
        title: "Resume PDF"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex flex-col items-center justify-center rounded-lg border border-border bg-surface-2/40 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex size-24 items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "absolute inset-0 size-full -rotate-90", viewBox: "0 0 100 100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "42",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "8",
                className: "text-muted-foreground/20"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.circle,
              {
                cx: "50",
                cy: "50",
                r: "42",
                fill: "none",
                stroke: "#22c55e",
                strokeWidth: "8",
                strokeLinecap: "round",
                strokeDasharray: "263.9",
                initial: { strokeDashoffset: 263.9 },
                animate: { strokeDashoffset: 26.39 },
                transition: { duration: 1.5, ease: "easeOut", delay: 0.2 }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-foreground", children: "90" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground", children: "/100" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[10px] uppercase tracking-widest text-muted-foreground", children: "ATS Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[9px] text-muted-foreground/50", children: "By ResumeWorded" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/Resume.pdf",
          download: "Suyog_Magar_Resume.pdf",
          className: "rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-center text-sm text-primary transition hover:bg-primary/20",
          children: "⬇ Download PDF"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/Resume.pdf",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "rounded-md border border-border px-3 py-2 text-center text-sm hover:border-primary/60",
          children: "⤢ View Fullscreen"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 rounded-md border border-border bg-surface-2/40 p-3 text-xs text-muted-foreground", children: "Last updated: 2026-05 · 1 page · ATS-friendly" })
    ] })
  ] }) });
}
function Contact() {
  const lines = [
    "Initializing communication channels...",
    "Open to backend engineering opportunities."
  ];
  const [step, setStep] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (step >= lines.length) return;
    const id = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(id);
  }, [step, lines.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ contact — channels.open", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { icon: "◆", label: "GitHub", v: "github.com/suyogmagar", href: "https://github.com/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { icon: "✦", label: "LinkedIn", v: "linkedin.com/in/suyogmagar", href: "https://linkedin.com/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { icon: "✉", label: "Email", v: "suyog@example.dev", href: "mailto:suyog@example.dev" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { icon: "</>", label: "Source", v: "github.com/suyogmagar/portfolio", href: "https://github.com/" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-surface-2/40 p-3", children: lines.slice(0, step + 1).map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: i === lines.length - 1 ? "text-accent" : "text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "›" }),
      " ",
      l
    ] }, i)) })
  ] }) });
}
function Link({ icon, label, v, href }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noreferrer",
      className: "group flex items-center gap-3 rounded-md border border-border bg-surface-2/30 px-3 py-2 transition hover:border-primary/60 hover:bg-surface-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-primary group-hover:underline", children: v })
        ] })
      ]
    }
  );
}
function HelpPanel() {
  const rows = [
    ["help", "show available commands"],
    ["about", "cat about.md"],
    ["skills", "interactive infrastructure map"],
    ["projects", "ls projects/  ·  cd projects/<name>"],
    ["architecture", "system design lab"],
    ["monitor / infra", "live infrastructure dashboard"],
    ["timeline", "engineering journey as git log"],
    ["neofetch", "developer profile panel"],
    ["resume", "open Resume.pdf"],
    ["contact", "communication channels"],
    ["history", "previous commands"],
    ["clear", "clear screen"]
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Window, { title: "$ help — commands", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5 p-4 text-sm sm:grid-cols-2", children: [
    rows.map(([c, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-32 shrink-0 text-primary", children: c }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: d })
    ] }, c)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground sm:col-span-2", children: [
      "easter eggs: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "sudo hire suyog" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "coffee" }),
      " · ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "vim" }),
      " ·",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "exit" })
    ] })
  ] }) });
}
function PlainOutput({ children, tone = "default" }) {
  const color = tone === "error" ? "text-[oklch(0.68_0.22_25)]" : tone === "accent" ? "text-accent" : "text-foreground/90";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: `whitespace-pre-wrap p-3 text-sm ${color}`, children });
}
function HeaderBar({ now }) {
  const time = reactExports.useMemo(
    () => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    [now]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-accent shadow-[0_0_8px_oklch(0.78_0.15_160)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "suyog@portfolio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ":~$" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "uptime 99.97%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "load 0.42 0.31 0.18" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums", children: time })
    ] })
  ] }) });
}
const NAV = [
  "neofetch",
  "about",
  "skills",
  "projects",
  "architecture",
  "monitor",
  "timeline",
  "resume",
  "contact",
  "help"
];
function Shell() {
  const [booted, setBooted] = reactExports.useState(false);
  const [blocks, setBlocks] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [history, setHistory] = reactExports.useState([]);
  const [histIdx, setHistIdx] = reactExports.useState(null);
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  const idRef = reactExports.useRef(0);
  const endRef = reactExports.useRef(null);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    const handler = (e) => {
      const tgt = e.target;
      if (tgt.closest("a,button,input,textarea,[data-no-focus]")) return;
      inputRef.current?.focus();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  reactExports.useEffect(() => {
    if (blocks.length === 0) return;
    const lastId = blocks[blocks.length - 1].id;
    const el = document.getElementById(`block-${lastId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [blocks]);
  const push = reactExports.useCallback((cmd, node) => {
    idRef.current += 1;
    setBlocks((b) => [...b, { id: idRef.current, cmd, node }]);
  }, []);
  const run = reactExports.useCallback(
    (raw) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setHistory((h) => [...h, cmd]);
      setHistIdx(null);
      if (cmd === "clear" || cmd === "cls") {
        setBlocks([]);
        return;
      }
      const [head, ...rest] = cmd.split(/\s+/);
      const arg = rest.join(" ");
      switch (head) {
        case "help":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(HelpPanel, {}));
        case "about":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(AboutFile, {}));
        case "neofetch":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(Neofetch, {}));
        case "skills":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsMap, {}));
        case "projects":
        case "ls":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsList, { onOpen: (slug) => run(`cd projects/${slug}`) }));
        case "cd": {
          const m = arg.match(/^projects\/(.+)$/i);
          if (m) return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectDetail, { slug: m[1] }));
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsxs(PlainOutput, { tone: "error", children: [
            "cd: ",
            arg || "(no path)",
            ": No such file or directory"
          ] }));
        }
        case "cat": {
          if (arg.toLowerCase() === "about.md") return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(AboutFile, {}));
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsxs(PlainOutput, { tone: "error", children: [
            "cat: ",
            arg,
            ": No such file"
          ] }));
        }
        case "architecture":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(ArchitectureLab, {}));
        case "monitor":
        case "infra":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, {}));
        case "timeline":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, {}));
        case "resume":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(ResumePanel, {}));
        case "contact":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}));
        case "history":
          return push(
            cmd,
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { children: history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${h}`).join("\n") || "(empty)" })
          );
        // easter eggs
        case "sudo": {
          if (rest.join(" ").toLowerCase() === "hire suyog") {
            return push(
              cmd,
              /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { tone: "accent", children: `[sudo] authenticating...
Access Granted.
Opening Resume...` })
            );
          }
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsxs(PlainOutput, { tone: "error", children: [
            "sudo: ",
            rest.join(" "),
            ": permission denied"
          ] }));
        }
        case "coffee":
          return push(
            cmd,
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { tone: "error", children: `ERROR: Coffee levels critically low.
hint: brew install espresso` })
          );
        case "vim":
          return push(
            cmd,
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { tone: "accent", children: `Entering Vim...
~
~
~
-- INSERT --   :wq to save and quit` })
          );
        case ":wq":
        case "exit":
        case "quit":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { tone: "accent", children: "You can never leave engineering." }));
        case "whoami":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { children: "Suyog Magar" }));
        case "echo":
          return push(cmd, /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { children: arg }));
        default:
          return push(
            cmd,
            /* @__PURE__ */ jsxRuntimeExports.jsx(PlainOutput, { tone: "error", children: `command not found: ${head}
type 'help' for available commands` })
          );
      }
    },
    [history, push]
  );
  reactExports.useEffect(() => {
    if (!booted) return;
    if (blocks.length === 0) run("neofetch");
  }, [booted]);
  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.trim()));
      if (match) setInput(match);
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setBlocks([]);
    }
  };
  const navItems = reactExports.useMemo(() => NAV, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: !booted && /* @__PURE__ */ jsxRuntimeExports.jsx(BootSequence, { onDone: () => setBooted(true) }) }),
    booted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderBar, { now }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-[34px] z-20 border-b border-border bg-background/60 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 text-xs", children: [
        navItems.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => run(n),
            className: "shrink-0 rounded-md border border-transparent px-2.5 py-1 text-muted-foreground transition hover:border-border hover:bg-surface-2/60 hover:text-primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "$" }),
              " ",
              n
            ]
          },
          n
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded border border-border bg-surface-2 px-1.5", children: "Tab" }),
          " autocomplete",
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "rounded border border-border bg-surface-2 px-1.5", children: "↑↓" }),
          " history"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto max-w-7xl px-4 pb-40 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        blocks.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            id: `block-${b.id}`,
            className: "scroll-mt-24",
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.25 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-2 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "suyog@portfolio" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ":~$" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: b.cmd })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: b.node })
            ]
          },
          b.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: endRef })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/80 backdrop-blur-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center gap-2 px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-prompt", children: "suyog@portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: ":~$" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            value: input,
            onChange: (e) => setInput(e.target.value),
            onKeyDown: onKey,
            spellCheck: false,
            autoCapitalize: "off",
            autoComplete: "off",
            "aria-label": "Terminal command",
            placeholder: "type a command — try `help`",
            className: "caret-primary flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-[10px] text-muted-foreground sm:inline", children: "↵ run" })
      ] }) })
    ] })
  ] });
}
function SrOnlyHeading() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "sr-only", children: "Suyog Magar — Backend Engineer. Java, Spring Boot, Kafka, Redis, Docker, Kubernetes." });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SrOnlyHeading, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Shell, {})
  ] });
}
export {
  Index as component
};
