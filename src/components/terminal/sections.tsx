import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { NetworkGraph } from "./NetworkGraph";
import { ABOUT_MD, PROJECTS, SKILLS_GRAPH, SKILL_EDGES, TIMELINE, type Project } from "./data";

/* ---------- Shared bits ---------- */

export function Window({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <div className="glass overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.68_0.22_25)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.82_0.16_85)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.78_0.15_160)]" />
        <span className={`ml-2 truncate text-xs ${tone === "accent" ? "text-accent" : "text-muted-foreground"}`}>
          {title}
        </span>
      </div>
      <div className="scanline">{children}</div>
    </div>
  );
}

/* ---------- neofetch ---------- */

export function Neofetch() {
  return (
    <Window title="suyog@portfolio: ~ — neofetch">
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <div className="space-y-2 text-sm">
          <Row k="user" v="Suyog Magar" highlight />
          <Row k="role" v="Backend Engineer" />
          <Row k="location" v="India" />
          <Row k="os" v="Linux · Arch / Ubuntu" />
          <Row k="shell" v="zsh + tmux" />
          <Row k="editor" v="Neovim · IntelliJ" />
          <Row k="focus" v="Backend · Distributed Systems · Realtime Pipelines" />
          <div className="mt-3">
            <div className="text-xs text-muted-foreground">primary stack</div>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {["Java", "Spring Boot", "Kafka", "Redis", "Docker", "Kubernetes"].map((t) => (
                <span key={t} className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-primary">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {["bg-primary", "bg-accent", "bg-[oklch(0.82_0.16_85)]", "bg-[oklch(0.68_0.22_25)]", "bg-foreground/70"].map((c) => (
              <span key={c} className={`h-3 w-6 rounded-sm ${c}`} />
            ))}
          </div>
        </div>
        <div className="relative h-56 overflow-hidden rounded-lg border border-border bg-[oklch(0.14_0.008_240)] md:h-full md:min-h-[14rem]">
          <NetworkGraph className="absolute inset-0 size-full" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          <div className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-muted-foreground">
            net.topology · live
          </div>
        </div>
      </div>
    </Window>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex">
      <span className="w-24 shrink-0 text-muted-foreground">{k}</span>
      <span className="text-muted-foreground">: </span>
      <span className={`pl-2 ${highlight ? "text-accent" : "text-foreground"}`}>{v}</span>
    </div>
  );
}

/* ---------- about ---------- */

export function AboutFile() {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= ABOUT_MD.length) { clearInterval(id); return s; }
        return s + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, []);
  return (
    <Window title="~/about.md — cat">
      <div className="grid grid-cols-[40px_1fr] gap-0 p-0 font-mono text-sm">
        <div className="border-r border-border bg-surface-2/40 py-3 text-right text-xs text-muted-foreground">
          {ABOUT_MD.map((_, i) => (
            <div key={i} className="px-2 leading-6">{i + 1}</div>
          ))}
        </div>
        <div className="py-3">
          {ABOUT_MD.map((line, i) => {
            const visible = i < shown;
            const isHeading = line.startsWith("#");
            const isBold = line.includes("**");
            return (
              <div
                key={i}
                className={`min-h-[1.5rem] px-3 leading-6 transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"} ${isHeading ? "text-primary" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: renderMd(line, isBold),
                }}
              />
            );
          })}
        </div>
      </div>
    </Window>
  );
}

function renderMd(line: string, bold: boolean) {
  let s = line
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  s = s.replace(/\*\*(.+?)\*\*/g, '<span class="text-accent font-semibold">$1</span>');
  s = s.replace(/_(.+?)_/g, '<span class="text-muted-foreground italic">$1</span>');
  return bold ? s : s;
}

/* ---------- skills infra map ---------- */

export function SkillsMap() {
  const [hover, setHover] = useState<string | null>(null);
  const W = 460, H = 380;
  const nodeById = (id: string) => SKILLS_GRAPH.find((n) => n.id === id)!;
  return (
    <Window title="$ skills — infrastructure.map">
      <div className="grid gap-0 md:grid-cols-[1fr_240px]">
        <div className="relative overflow-hidden bg-[oklch(0.14_0.008_240)]">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <svg viewBox={`0 0 ${W} ${H}`} className="relative h-[380px] w-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.72 0.18 240 / 0.7)" />
              </marker>
            </defs>
            {SKILL_EDGES.map(([a, b], i) => {
              const na = nodeById(a), nb = nodeById(b);
              const active = hover === a || hover === b;
              return (
                <g key={i}>
                  <line
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={active ? "oklch(0.78 0.15 160)" : "oklch(0.55 0.015 240 / 0.5)"}
                    strokeWidth={active ? 1.6 : 1}
                    markerEnd="url(#arrow)"
                  />
                  <line
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="oklch(0.78 0.15 160 / 0.9)"
                    strokeWidth="1.4"
                    strokeDasharray="4 96"
                    style={{ animation: `packet-flow ${3 + (i % 3)}s linear infinite` }}
                  />
                </g>
              );
            })}
            {SKILLS_GRAPH.map((n) => {
              const active = hover === n.id;
              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={n.x} cy={n.y} r={active ? 26 : 22}
                    fill="oklch(0.20 0.010 240 / 0.9)"
                    stroke={active ? "oklch(0.78 0.15 160)" : "oklch(0.72 0.18 240 / 0.8)"}
                    strokeWidth={active ? 2 : 1.4}
                    style={{ animation: `pulse-node ${2 + (n.x % 1.5)}s ease-in-out infinite` }}
                  />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fill="oklch(0.95 0.005 240)">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <div className="border-t border-border p-4 text-sm md:border-l md:border-t-0">
          {hover ? (
            (() => {
              const n = nodeById(hover);
              return (
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">node</div>
                  <div className="text-lg text-primary">{n.label}</div>
                  <div className="mt-2 text-accent">{n.tech}</div>
                  <p className="mt-2 text-muted-foreground">{n.note}</p>
                </div>
              );
            })()
          ) : (
            <div className="text-muted-foreground">
              <div className="text-xs uppercase tracking-widest">hint</div>
              <div className="mt-1">Hover a node to inspect.</div>
              <div className="mt-3 text-xs">
                Edges animate live — emulating packets between services.
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
}

/* ---------- projects ---------- */

export function ProjectsList({ onOpen }: { onOpen: (slug: string) => void }) {
  return (
    <Window title="$ ls projects">
      <div className="grid gap-2 p-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <button
            key={p.slug}
            onClick={() => onOpen(p.slug)}
            className="group flex items-start gap-3 rounded-lg border border-border bg-surface-2/40 p-3 text-left transition hover:border-primary/60 hover:bg-surface-2"
          >
            <span className="mt-0.5 text-accent">📁</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-primary group-hover:underline">{p.slug}/</span>
                <span className="text-[10px] text-muted-foreground">main</span>
              </div>
              <div className="truncate text-xs text-muted-foreground">{p.tagline}</div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-sm border border-border px-1.5 text-[10px] text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
        tip: run <span className="text-accent">cd projects/Teckniv</span> to open a repo.
      </div>
    </Window>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const p = PROJECTS.find((x) => x.slug.toLowerCase() === slug.toLowerCase());
  const [tab, setTab] = useState<"README.md" | "Architecture.md" | "Metrics.json" | "Deployment.yaml">("README.md");
  if (!p) {
    return (
      <Window title={`cd projects/${slug}`}>
        <div className="p-4 text-sm text-[oklch(0.68_0.22_25)]">
          bash: cd: projects/{slug}: No such file or directory
        </div>
      </Window>
    );
  }
  const tabs: typeof tab[] = ["README.md", "Architecture.md", "Metrics.json", "Deployment.yaml"];
  return (
    <Window title={`~/projects/${p.slug} — code`}>
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface-2/40 px-2 py-1.5 text-xs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-md px-2.5 py-1 transition ${
              tab === t ? "bg-background text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="p-4 text-sm leading-relaxed">
        {tab === "README.md" && (
          <div className="space-y-3">
            <div>
              <div className="text-lg text-primary"># {p.name}</div>
              <div className="text-muted-foreground">{p.tagline}</div>
            </div>
            <Section title="Problem">{p.problem}</Section>
            <Section title="Tech Stack">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-xs text-primary">
                    {s}
                  </span>
                ))}
              </div>
            </Section>
            <Section title="Features"><BulletList items={p.features} /></Section>
            <Section title="Challenges"><BulletList items={p.challenges} /></Section>
            <Section title="Learnings"><BulletList items={p.learnings} /></Section>
          </div>
        )}
        {tab === "Architecture.md" && (
          <div>
            <div className="mb-2 text-primary">## Architecture</div>
            <pre className="whitespace-pre-wrap text-foreground/90">
{p.architecture.map((l) => `  ${l}`).join("\n")}
            </pre>
          </div>
        )}
        {tab === "Metrics.json" && (
          <pre className="whitespace-pre-wrap text-foreground/90">
{JSON.stringify(p.metrics, null, 2)}
          </pre>
        )}
        {tab === "Deployment.yaml" && (
          <pre className="whitespace-pre-wrap text-accent">
{`# deployment\n${p.deployment}`}
          </pre>
        )}
      </div>
    </Window>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-1 text-foreground/90">{children}</div>
    </div>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i} className="flex gap-2">
          <span className="text-accent">›</span><span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- monitor / dashboard ---------- */

type Series = { label: string; unit: string; value: number; max: number; tone: string };

export function Monitor() {
  const [series, setSeries] = useState<Series[]>([
    { label: "api.requests", unit: "rps", value: 1240, max: 4000, tone: "primary" },
    { label: "kafka.messages", unit: "msg/s", value: 8400, max: 30000, tone: "accent" },
    { label: "redis.hit_rate", unit: "%", value: 92, max: 100, tone: "accent" },
    { label: "docker.containers", unit: "", value: 14, max: 24, tone: "primary" },
    { label: "response.p95", unit: "ms", value: 84, max: 400, tone: "primary" },
    { label: "cpu.usage", unit: "%", value: 38, max: 100, tone: "primary" },
    { label: "memory.usage", unit: "%", value: 56, max: 100, tone: "accent" },
  ]);
  const [spark, setSpark] = useState<number[]>(() => Array.from({ length: 48 }, () => 0.4 + Math.random() * 0.4));

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((arr) =>
        arr.map((s) => {
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

  return (
    <Window title="$ monitor — system.dashboard">
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {series.map((s) => {
          const pct = (s.value / s.max) * 100;
          const color = s.tone === "accent" ? "bg-accent" : "bg-primary";
          return (
            <div key={s.label} className="rounded-lg border border-border bg-surface-2/40 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="text-foreground">
                  {s.unit === "%" ? Math.round(s.value) : Math.round(s.value).toLocaleString()}{s.unit && ` ${s.unit}`}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <motion.div className={`h-full ${color}`} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} />
              </div>
            </div>
          );
        })}
        <div className="rounded-lg border border-border bg-surface-2/40 p-3 sm:col-span-2 lg:col-span-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">throughput.live</span>
            <span className="text-accent">● streaming</span>
          </div>
          <Sparkline data={spark} />
        </div>
      </div>
    </Window>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const W = 600, H = 70;
  const step = W / (data.length - 1);
  const points = data.map((v, i) => `${i * step},${H - v * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-20 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 240)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="oklch(0.72 0.18 240)" strokeWidth="1.5" points={points} />
      <polygon fill="url(#sg)" points={`0,${H} ${points} ${W},${H}`} />
    </svg>
  );
}

/* ---------- architecture diagrams ---------- */

export function ArchitectureLab() {
  return (
    <Window title="$ architecture — system.design.lab">
      <div className="grid gap-4 p-4 lg:grid-cols-2">
        <ArchCard
          title="Real-Time Stock Pipeline"
          nodes={["API", "Kafka", "Consumers", "Redis", "Frontend"]}
        />
        <ArchCard
          title="Distributed File System"
          nodes={["Client", "Gateway", "Storage Nodes"]}
        />
      </div>
    </Window>
  );
}

function ArchCard({ title, nodes }: { title: string; nodes: string[] }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2/40 p-4">
      <div className="mb-3 text-sm text-primary">{title}</div>
      <div className="flex flex-col items-stretch gap-2">
        {nodes.map((n, i) => (
          <div key={n}>
            <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground hover:border-primary/60">
              <span className="text-accent">●</span> <span>{n}</span>
            </div>
            {i < nodes.length - 1 && (
              <div className="relative my-1 ml-3 h-5">
                <div className="absolute left-0 top-0 h-full w-px bg-border" />
                <div className="absolute left-[-3px] top-0 size-1.5 animate-pulse rounded-full bg-accent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- timeline ---------- */

export function Timeline() {
  return (
    <Window title="$ timeline — git log --oneline">
      <div className="space-y-3 p-4 text-sm">
        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.hash}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-3"
          >
            <span className="mt-0.5 w-16 shrink-0 font-mono text-accent">{t.hash}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-primary">{t.title}</span>
                <span className="text-[10px] text-muted-foreground">{t.date}</span>
              </div>
              <div className="text-muted-foreground">{t.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Window>
  );
}

/* ---------- resume ---------- */

export function ResumePanel() {
  return (
    <Window title="$ resume — Resume.pdf">
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px]">
        <div className="aspect-[1/1.3] w-full rounded-lg border border-border bg-[oklch(0.97_0.003_240)] p-6 text-[oklch(0.18_0.01_240)]">
          <div className="text-2xl font-semibold">Suyog Magar</div>
          <div className="text-sm">Backend Engineer · Java · Distributed Systems</div>
          <hr className="my-3 border-[oklch(0.85_0.005_240)]" />
          <div className="text-xs uppercase tracking-widest text-[oklch(0.45_0.01_240)]">Summary</div>
          <p className="mt-1 text-sm">
            Backend engineer focused on event-driven services, real-time pipelines, and reliable
            infrastructure on Kubernetes.
          </p>
          <div className="mt-3 text-xs uppercase tracking-widest text-[oklch(0.45_0.01_240)]">Selected work</div>
          <ul className="mt-1 list-disc pl-5 text-sm">
            <li>Teckniv — multi-tenant SaaS, Kafka + Redis + K8s</li>
            <li>Real-Time-Stock-Pipeline — 28k msg/s, p95 143ms</li>
            <li>DecentralX — distributed file store</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Resume PDF — wire to your hosted file."); }}
            className="rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-center text-sm text-primary transition hover:bg-primary/20"
          >
            ⬇ Download PDF
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); alert("Resume PDF — wire to your hosted file."); }}
            className="rounded-md border border-border px-3 py-2 text-center text-sm hover:border-primary/60"
          >
            ⤢ View Fullscreen
          </a>
          <div className="mt-3 rounded-md border border-border bg-surface-2/40 p-3 text-xs text-muted-foreground">
            Last updated: 2026-05 · 1 page · ATS-friendly
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  const lines = [
    "Initializing communication channels...",
    "Open to backend engineering opportunities.",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= lines.length) return;
    const id = setTimeout(() => setStep((s) => s + 1), 700);
    return () => clearTimeout(id);
  }, [step, lines.length]);

  return (
    <Window title="$ contact — channels.open">
      <div className="space-y-3 p-4 text-sm">
        <div className="grid gap-2 sm:grid-cols-2">
          <Link icon="◆" label="GitHub" v="github.com/suyogmagar" href="https://github.com/" />
          <Link icon="✦" label="LinkedIn" v="linkedin.com/in/suyogmagar" href="https://linkedin.com/" />
          <Link icon="✉" label="Email" v="suyog@example.dev" href="mailto:suyog@example.dev" />
          <Link icon="</>" label="Source" v="github.com/suyogmagar/portfolio" href="https://github.com/" />
        </div>
        <div className="rounded-md border border-border bg-surface-2/40 p-3">
          {lines.slice(0, step + 1).map((l, i) => (
            <div key={i} className={i === lines.length - 1 ? "text-accent" : "text-muted-foreground"}>
              <span className="text-prompt">›</span> {l}
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

function Link({ icon, label, v, href }: { icon: string; label: string; v: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-md border border-border bg-surface-2/30 px-3 py-2 transition hover:border-primary/60 hover:bg-surface-2"
    >
      <span className="text-accent">{icon}</span>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate text-primary group-hover:underline">{v}</div>
      </div>
    </a>
  );
}

/* ---------- help ---------- */

export function HelpPanel() {
  const rows: Array<[string, string]> = [
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
    ["clear", "clear screen"],
  ];
  return (
    <Window title="$ help — commands">
      <div className="grid gap-1.5 p-4 text-sm sm:grid-cols-2">
        {rows.map(([c, d]) => (
          <div key={c} className="flex gap-3">
            <span className="w-32 shrink-0 text-primary">{c}</span>
            <span className="text-muted-foreground">{d}</span>
          </div>
        ))}
        <div className="mt-2 text-xs text-muted-foreground sm:col-span-2">
          easter eggs: <span className="text-accent">sudo hire suyog</span> ·{" "}
          <span className="text-accent">coffee</span> · <span className="text-accent">vim</span> ·{" "}
          <span className="text-accent">exit</span>
        </div>
      </div>
    </Window>
  );
}

/* ---------- generic plain output ---------- */

export function PlainOutput({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "error" | "accent" }) {
  const color = tone === "error" ? "text-[oklch(0.68_0.22_25)]" : tone === "accent" ? "text-accent" : "text-foreground/90";
  return <pre className={`whitespace-pre-wrap p-3 text-sm ${color}`}>{children}</pre>;
}

/* ---------- index page hero (sticky header) ---------- */

export function HeaderBar({ now }: { now: Date }) {
  const time = useMemo(
    () => now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    [now]
  );
  return (
    <div className="sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent shadow-[0_0_8px_oklch(0.78_0.15_160)]" />
          <span className="text-foreground">suyog@portfolio</span>
          <span className="text-muted-foreground">:~$</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <span>uptime 99.97%</span>
          <span className="hidden sm:inline">load 0.42 0.31 0.18</span>
          <span className="tabular-nums">{time}</span>
        </div>
      </div>
    </div>
  );
}

/* re-export PROJECT for shell */
export { PROJECTS };
export type { Project };
