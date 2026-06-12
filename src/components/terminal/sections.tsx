import { motion } from "framer-motion";
import { useEffect, useMemo, useState, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { AsciiShowcase } from "./AsciiShowcase";
import { ABOUT_MD, PROJECTS, SKILL_CATEGORIES, TIMELINE, type Project } from "./data";

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

import { Users, Zap, Timer, GitPullRequest } from "lucide-react";

export function Neofetch() {
  return (
    <Window title="suyog@portfolio: ~ — neofetch">
      <div className="grid gap-6 p-5 lg:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col space-y-6">
          <div className="space-y-3 text-base">
            <Row k="user" v="Suyog Magar" highlight />
            <Row k="role" v="Backend Engineer" />
            <Row k="location" v="India" />
            <Row k="os" v="Linux · Arch / Ubuntu" />
            <Row k="shell" v="zsh + tmux" />
            <Row k="editor" v="Neovim · IntelliJ" />
            <Row k="focus" v="Backend · Distributed Systems · Realtime Pipelines" />
            <div className="mt-4">
              <div className="text-sm text-muted-foreground">primary stack</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Java", "Spring Boot", "Kafka", "Redis", "Docker", "Kubernetes"].map((t) => (
                  <span key={t} className="rounded-md border border-border bg-surface-2 px-3 py-1 text-sm text-primary">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-1.5">
              {["bg-primary", "bg-accent", "bg-[oklch(0.82_0.16_85)]", "bg-[oklch(0.68_0.22_25)]", "bg-foreground/70"].map((c) => (
                <span key={c} className={`h-4 w-8 rounded-sm ${c}`} />
              ))}
            </div>
          </div>
          <div className="mt-auto pt-5 border-t border-border">
            <LeetcodeStats />
          </div>
        </div>
        <div className="flex min-w-0 flex-col space-y-6">
          <div className="relative h-60 w-full overflow-hidden rounded-lg border border-border bg-[oklch(0.14_0.008_240)]">
            <AsciiShowcase className="absolute inset-0 size-full" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
            <div className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-muted-foreground">
              ident · globe.live
            </div>
          </div>
          <div className="pt-5 border-t border-border">
            <GithubStats />
          </div>
          <div className="pt-2">
            <AchievementsSection />
          </div>
        </div>
      </div>
    </Window>
  );
}

function GithubStats() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [totalCommits, setTotalCommits] = useState<number>(320);

  useEffect(() => {
    // Using a live un-cached API to ensure real-time updates (bypasses Jason Barry CDN cache)
    fetch('https://github-contributions-api.deno.dev/suyogmagar.json')
      .then(r => r.json())
      .then(d => {
        if (d && typeof d.totalContributions === 'number') {
          setTotalCommits(d.totalContributions);
        }
      })
      .catch(console.error);

    if (!scrollRef.current) return;
    const el = scrollRef.current;


    const interval = setInterval(() => {
      if (el.scrollWidth > el.clientWidth) {
        el.scrollLeft = el.scrollWidth;
      }
    }, 100);

    setTimeout(() => clearInterval(interval), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-accent">★</span> GitHub Profile
          </div>
          <a
            href="https://github.com/SuyogMagar"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/20"
          >
            VIEW <span className="text-accent font-mono">↗</span>
          </a>
        </div>
        {totalCommits !== null && (
          <div className="text-xs text-primary font-bold">
            {totalCommits} Contributions <span className="text-muted-foreground font-normal">Last Year</span>
          </div>
        )}
      </div>
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden rounded-lg border border-border bg-[oklch(0.14_0.008_240)] p-5"
      >
        <div className="min-w-max" id="github-calendar-wrapper">
          <style dangerouslySetInnerHTML={{
            __html: `
            #github-calendar-wrapper article footer,
            #github-calendar-wrapper .react-activity-calendar__footer {
              display: none !important;
            }
          `}} />
          <GitHubCalendar
            username="suyogmagar"
            colorScheme="dark"
            fontSize={12}
            blockSize={11}
            blockMargin={4}
            hideTotalCount={true}
            hideColorLegend={true}
          />
        </div>
      </div>
    </div>
  );
}

function LeetcodeStats() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetcode = async () => {
      const fallbackData = {
        easy: 133,
        medium: 140,
        hard: 27,
        total: 300,
        rating: 1675,
        topPercentage: 15.5,
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
            topPercentage: contestRes.contestTopPercentage || fallbackData.topPercentage,
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

  const easyPct = data?.total ? (data.easy / data.total) * 100 : 0;
  const medPct = data?.total ? easyPct + (data.medium / data.total) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="text-accent">⚡</span> LeetCode Profile
        </div>
        <a
          href="https://leetcode.com/u/Suyog_Magar/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary transition-colors hover:border-primary/60 hover:bg-primary/20"
        >
          VIEW <span className="text-accent font-mono">↗</span>
        </a>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="space-y-4 rounded-lg border border-border bg-surface-2/40 p-5 sm:w-[160px] shrink-0 flex flex-col justify-center">
          <div>
            <div className="text-xs uppercase text-muted-foreground">Contest Rating</div>
            <div className="mt-1 text-3xl font-bold text-primary">
              {loading ? "..." : data?.rating?.toLocaleString()}
            </div>
            {!loading && data?.topPercentage !== "N/A" && (
              <div className="mt-1 text-xs text-accent">Top {data?.topPercentage}%</div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-lg border border-border bg-surface-2/40 p-5 flex-1 relative group cursor-pointer h-[160px]">
          <div className="absolute top-5 left-5 text-xs uppercase text-muted-foreground z-10 transition-opacity group-hover:opacity-0">
            Problems Solved
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-surface-2/95 z-20 rounded-lg p-5">
            <div className="w-full space-y-3">
              <ProblemBar label="Easy" count={data?.easy} total={800} color="bg-[oklch(0.78_0.15_160)]" loading={loading} />
              <ProblemBar label="Medium" count={data?.medium} total={1600} color="bg-[oklch(0.82_0.16_85)]" loading={loading} />
              <ProblemBar label="Hard" count={data?.hard} total={700} color="bg-[oklch(0.68_0.22_25)]" loading={loading} />
            </div>
          </div>

          <div className="flex items-center justify-center mt-4 group-hover:opacity-0 transition-opacity">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full"
              style={{
                background: loading ? 'transparent' : `conic-gradient(
                  oklch(0.78 0.15 160) 0% ${easyPct}%, 
                  oklch(0.82 0.16 85) ${easyPct}% ${medPct}%, 
                  oklch(0.68 0.22 25) ${medPct}% 100%
                )`
              }}
            >
              <div className="absolute inset-1.5 bg-[oklch(0.12_0.005_240)] rounded-full flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-bold text-primary">{loading ? "..." : data?.total}</span>
                <span className="text-[10px] uppercase text-muted-foreground">Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgesSlideshow({ badges }: { badges: { name: string, url: string }[] }) {
  if (!badges || badges.length === 0) return null;

  const repeatedBadges: { name: string, url: string }[] = [];
  const copies = Math.max(1, Math.ceil(8 / badges.length)); 
  for(let i=0; i<copies; i++) {
    repeatedBadges.push(...badges);
  }

  return (
    <div className="flex overflow-hidden flex-1 slider-container w-full min-w-0" style={{
      maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
    }}>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .slider-container:hover .animate-scroll {
          animation-play-state: paused;
        }
        .badge-item:hover .badge-tooltip {
          opacity: 1;
          visibility: visible;
        }
        .badge-item:hover img {
          transform: scale(1.15);
        }
        .badge-tooltip {
          visibility: hidden;
        }
      `}</style>
      
      <div className="flex gap-4 w-max animate-scroll pr-4 shrink-0 items-center">
        {repeatedBadges.map((badge, idx) => (
          <div key={`orig-${idx}`} className="relative badge-item flex shrink-0 items-center justify-center w-16 h-16 cursor-default">
            <img src={badge.url} alt={badge.name} className="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300" />
            <div className="badge-tooltip absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-3 py-1.5 text-xs text-foreground opacity-0 transition-opacity pointer-events-none z-[60] border border-border shadow-lg">
              {badge.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 w-max animate-scroll pr-4 shrink-0 items-center" aria-hidden="true">
        {repeatedBadges.map((badge, idx) => (
          <div key={`dup-${idx}`} className="relative badge-item flex shrink-0 items-center justify-center w-16 h-16 cursor-default">
            <img src={badge.url} alt={badge.name} className="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300" />
            <div className="badge-tooltip absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-background px-3 py-1.5 text-xs text-foreground opacity-0 transition-opacity pointer-events-none z-[60] border border-border shadow-lg">
              {badge.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsSection() {
  const [leetcodeBadges, setLeetcodeBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallbackLeetcodeBadges = [
      { displayName: "100 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/100_1080_1080.png" },
      { displayName: "50 Days Badge 2026", icon: "https://assets.leetcode.com/static_assets/others/50_1080_1080.png" },
      { displayName: "Mar LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2026-3.png" },
      { displayName: "Feb LeetCoding Challenge", icon: "https://leetcode.com/static/images/badges/dcc-2026-2.png" }
    ];

    fetch(`https://alfa-leetcode-api.onrender.com/Suyog_Magar/badges`)
      .then(r => r.json())
      .then(data => {
        setLeetcodeBadges(data.badges && data.badges.length > 0 ? data.badges.slice(0, 4) : fallbackLeetcodeBadges);
        setLoading(false);
      })
      .catch(() => {
        setLeetcodeBadges(fallbackLeetcodeBadges);
        setLoading(false);
      });
  }, []);

  const githubBadges = [
    { name: "Starstruck", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/starstruck-default.png" },
    { name: "Pair Extraordinaire", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/pair-extraordinaire-default.png" },
    { name: "YOLO", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/yolo-default.png" },
    { name: "Quickdraw", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/quickdraw-default.png" },
    { name: "Pull Shark", url: "https://cdn.jsdelivr.net/gh/Schweinepriester/github-profile-achievements@main/images/pull-shark-default.png" },
  ];

  const lcBadgesFormatted = leetcodeBadges.map((b: any) => ({
    name: b.displayName || b.name,
    url: b.icon.startsWith("http") ? b.icon : `https://leetcode.com${b.icon}`
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-muted-foreground">
        <span className="text-accent">🏆</span> Achievements & Badges
      </div>
      <div className="rounded-lg border border-border bg-surface-2/40 p-5 flex flex-col xl:flex-row gap-6 xl:items-center min-h-[100px] overflow-hidden">

        <div className="flex items-center gap-5 flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">GitHub</span>
          <BadgesSlideshow badges={githubBadges} />
        </div>

        <div className="w-px h-16 bg-border hidden xl:block shrink-0"></div>
        <div className="h-px w-full bg-border block xl:hidden shrink-0"></div>

        <div className="flex items-center gap-5 flex-1 min-w-0">
          <span className="text-xs font-bold uppercase tracking-wider text-foreground whitespace-nowrap">LeetCode</span>
          {loading ? (
            <span className="text-muted-foreground text-sm">Loading...</span>
          ) : (
            <BadgesSlideshow badges={lcBadgesFormatted} />
          )}
        </div>

      </div>
    </div>
  );
}

function ProblemBar({ label, count, total, color, loading }: { label: string; count: number | undefined; total: number; color: string; loading: boolean }) {
  const pct = loading || !count ? 0 : Math.min(100, Math.max(0, (count / total) * 100));
  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="w-16 text-muted-foreground">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-12 text-right text-primary">{loading ? "-" : count}</span>
    </div>
  );
}

function Row({ k, v, highlight, href }: { k: string; v: string; highlight?: boolean; href?: string }) {
  const inner = href ? (
    <a href={href} target="_blank" rel="noreferrer" className={`pl-2 hover:underline ${highlight ? "text-accent" : "text-foreground"}`}>{v}</a>
  ) : (
    <span className={`pl-2 ${highlight ? "text-accent" : "text-foreground"}`}>{v}</span>
  );
  return (
    <div className="flex">
      <span className="w-24 shrink-0 text-muted-foreground">{k}</span>
      <span className="text-muted-foreground">: </span>
      {inner}
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

/* ---------- skills (terminal tree) ---------- */

export function SkillsMap() {
  const [hover, setHover] = useState<string | null>(null);

  const projectBySlug = useMemo(() => {
    const m = new Map<string, Project>();
    PROJECTS.forEach((p) => m.set(p.slug, p));
    return m;
  }, []);

  const activeSkill = useMemo(() => {
    if (!hover) return null;
    for (const cat of SKILL_CATEGORIES) {
      const s = cat.skills.find((sk) => sk.name === hover);
      if (s) return { skill: s, category: cat };
    }
    return null;
  }, [hover]);

  return (
    <Window title="$ skills — tree ~/skills">
      <div className="grid gap-0 md:grid-cols-[1fr_260px]">
        <div className="relative overflow-hidden bg-[oklch(0.14_0.008_240)] p-4 font-mono text-sm">
          <div className="mb-2 text-xs text-muted-foreground">
            <span className="text-prompt">$</span> tree ~/skills
          </div>
          <div className="text-foreground/90">
            <div className="text-accent">skills/</div>
            {SKILL_CATEGORIES.map((cat, ci) => {
              const lastCat = ci === SKILL_CATEGORIES.length - 1;
              const catBranch = lastCat ? "└──" : "├──";
              const pipe = lastCat ? "   " : "│  ";
              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 leading-6">
                    <span className="text-muted-foreground">{catBranch}</span>
                    <span className="text-accent">{cat.icon}</span>
                    <span className="text-primary">{cat.label}/</span>
                  </div>
                  {cat.skills.map((sk, si) => {
                    const lastSk = si === cat.skills.length - 1;
                    const skBranch = lastSk ? "└──" : "├──";
                    const isActive = hover === sk.name;
                    const hasProjects = sk.projects && sk.projects.length > 0;
                    return (
                      <div
                        key={sk.name}
                        onMouseEnter={() => setHover(sk.name)}
                        onMouseLeave={() => setHover(null)}
                        className={`flex items-center gap-2 leading-6 px-1 -mx-1 rounded transition-colors ${isActive ? "bg-surface-2/60" : "hover:bg-surface-2/30"
                          }`}
                      >
                        <span className="text-muted-foreground whitespace-pre">{pipe}{skBranch}</span>
                        <span className={isActive ? "text-accent" : "text-foreground/90"}>
                          {sk.name}
                        </span>
                        {hasProjects && (
                          <span className="text-[10px] text-muted-foreground">
                            · {sk.projects!.length} project{sk.projects!.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border p-4 text-sm md:border-l md:border-t-0">
          {activeSkill ? (
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {activeSkill.category.label}
              </div>
              <div className="text-lg text-primary">{activeSkill.skill.name}</div>
              <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                used in
              </div>
              {activeSkill.skill.projects && activeSkill.skill.projects.length > 0 ? (
                <ul className="mt-1 space-y-1.5">
                  {activeSkill.skill.projects.map((slug) => {
                    const p = projectBySlug.get(slug);
                    if (!p) return null;
                    return (
                      <li key={slug} className="rounded-md border border-border bg-surface-2/40 p-2">
                        <div className="text-accent">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.tagline}</div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="mt-1 text-muted-foreground italic">
                  Foundational skill — applied across coursework & exploration.
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground">
              <div className="text-xs uppercase tracking-widest">hint</div>
              <div className="mt-1">Hover a skill to see related projects.</div>
              <div className="mt-3 text-xs">
                Organized as a static <span className="text-accent">tree</span> — like{" "}
                <span className="text-accent">tree ~/skills</span> in your shell.
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
        tip: run <span className="text-accent">cd projects/Drive-Luxe</span> to open a repo.
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
            className={`rounded-md px-2.5 py-1 transition ${tab === t ? "bg-background text-primary" : "text-muted-foreground hover:text-foreground"
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
          title="Drive Luxe (Supabase Auth)"
          nodes={["React Client", "Supabase API", "PostgreSQL", "RLS Policies"]}
        />
        <ArchCard
          title="Enterprise Operations Platform"
          nodes={["React Client", "Spring Boot REST", "Spring JPA", "PostgreSQL"]}
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
        <iframe
          src="/Resume.pdf"
          className="aspect-[1/1.4] w-full rounded-lg border border-border bg-white"
          title="Resume PDF"
        />
        <div className="flex flex-col gap-2">
          <div className="mb-2 flex flex-col items-center justify-center rounded-lg border border-border bg-surface-2/40 p-5">
            <div className="relative flex size-24 items-center justify-center">
              <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted-foreground/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="263.9"
                  initial={{ strokeDashoffset: 263.9 }}
                  animate={{ strokeDashoffset: 26.39 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                />
              </svg>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-foreground">90</span>
                <span className="text-[10px] font-medium text-muted-foreground">/100</span>
              </div>
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
              ATS Score
            </div>
            <div className="mt-1 text-[9px] text-muted-foreground/50">
              By ResumeWorded
            </div>
          </div>
          <a
            href="/Resume.pdf"
            download="Suyog_Magar_Resume.pdf"
            className="rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-center text-sm text-primary transition hover:bg-primary/20"
          >
            ⬇ Download PDF
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
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
          <Link icon="◆" label="GitHub" v="github.com/SuyogMagar" href="https://github.com/SuyogMagar" />
          <Link icon="⌖" label="LeetCode" v="leetcode.com/u/Suyog_Magar" href="https://leetcode.com/u/Suyog_Magar/" />
          <Link icon="✦" label="LinkedIn" v="linkedin.com/in/suyogmagar" href="https://linkedin.com/" />
          <Link icon="✉" label="Email" v="suyog@example.dev" href="mailto:suyog@example.dev" />
          <Link icon="</>" label="Source" v="github.com/SuyogMagar/portfolio" href="https://github.com/SuyogMagar" />
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
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
