import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BootSequence } from "./BootSequence";
import {
  AboutFile,
  ArchitectureLab,
  Contact,
  HeaderBar,
  HelpPanel,
  Monitor,
  Neofetch,
  PlainOutput,
  ProjectDetail,
  ProjectsList,
  ResumePanel,
  SkillsMap,
  Timeline,
} from "./sections";
import { COMMANDS } from "./data";

type Block = {
  id: number;
  cmd: string;
  node: React.ReactNode;
};

const NAV = [
  "neofetch", "about", "skills", "projects",
  "architecture", "monitor", "timeline", "resume", "contact", "help",
];

export function Shell() {
  const [booted, setBooted] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());
  const idRef = useRef(0);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // focus input on click anywhere
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const tgt = e.target as HTMLElement;
      if (tgt.closest("a,button,input,textarea,[data-no-focus]")) return;
      inputRef.current?.focus();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // autoscroll
  useEffect(() => {
    if (blocks.length === 0) return;
    const lastId = blocks[blocks.length - 1].id;
    const el = document.getElementById(`block-${lastId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [blocks]);

  const push = useCallback((cmd: string, node: React.ReactNode) => {
    idRef.current += 1;
    setBlocks((b) => [...b, { id: idRef.current, cmd, node }]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (!cmd) return;
      setHistory((h) => [...h, cmd]);
      setHistIdx(null);

      // clear is special
      if (cmd === "clear" || cmd === "cls") {
        setBlocks([]);
        return;
      }

      const [head, ...rest] = cmd.split(/\s+/);
      const arg = rest.join(" ");

      // routing
      switch (head) {
        case "help":
          return push(cmd, <HelpPanel />);
        case "about":
          return push(cmd, <AboutFile />);
        case "neofetch":
          return push(cmd, <Neofetch />);
        case "skills":
          return push(cmd, <SkillsMap />);
        case "projects":
        case "ls":
          return push(cmd, <ProjectsList onOpen={(slug) => run(`cd projects/${slug}`)} />);
        case "cd": {
          const m = arg.match(/^projects\/(.+)$/i);
          if (m) return push(cmd, <ProjectDetail slug={m[1]} />);
          return push(cmd, <PlainOutput tone="error">cd: {arg || "(no path)"}: No such file or directory</PlainOutput>);
        }
        case "cat": {
          if (arg.toLowerCase() === "about.md") return push(cmd, <AboutFile />);
          return push(cmd, <PlainOutput tone="error">cat: {arg}: No such file</PlainOutput>);
        }
        case "architecture":
          return push(cmd, <ArchitectureLab />);
        case "monitor":
        case "infra":
          return push(cmd, <Monitor />);
        case "timeline":
          return push(cmd, <Timeline />);
        case "resume":
          return push(cmd, <ResumePanel />);
        case "contact":
          return push(cmd, <Contact />);
        case "history":
          return push(
            cmd,
            <PlainOutput>
              {history.map((h, i) => `${String(i + 1).padStart(3, " ")}  ${h}`).join("\n") || "(empty)"}
            </PlainOutput>
          );
        // easter eggs
        case "sudo": {
          if (rest.join(" ").toLowerCase() === "hire suyog") {
            return push(
              cmd,
              <PlainOutput tone="accent">
{`[sudo] authenticating...
Access Granted.
Opening Resume...`}
              </PlainOutput>
            );
          }
          return push(cmd, <PlainOutput tone="error">sudo: {rest.join(" ")}: permission denied</PlainOutput>);
        }
        case "coffee":
          return push(
            cmd,
            <PlainOutput tone="error">
{`ERROR: Coffee levels critically low.
hint: brew install espresso`}
            </PlainOutput>
          );
        case "vim":
          return push(
            cmd,
            <PlainOutput tone="accent">
{`Entering Vim...
~
~
~
-- INSERT --   :wq to save and quit`}
            </PlainOutput>
          );
        case ":wq":
        case "exit":
        case "quit":
          return push(cmd, <PlainOutput tone="accent">You can never leave engineering.</PlainOutput>);
        case "whoami":
          return push(cmd, <PlainOutput>Suyog Magar</PlainOutput>);
        case "echo":
          return push(cmd, <PlainOutput>{arg}</PlainOutput>);
        default:
          return push(
            cmd,
            <PlainOutput tone="error">
{`command not found: ${head}
type 'help' for available commands`}
            </PlainOutput>
          );
      }
    },
    [history, push]
  );

  // first welcome
  useEffect(() => {
    if (!booted) return;
    if (blocks.length === 0) run("neofetch");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const navItems = useMemo(() => NAV, []);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>{!booted && <BootSequence onDone={() => setBooted(true)} />}</AnimatePresence>

      {booted && (
        <>
          <HeaderBar now={now} />

          {/* Command nav rail */}
          <div className="sticky top-[34px] z-20 border-b border-border bg-background/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 text-xs">
              {navItems.map((n) => (
                <button
                  key={n}
                  onClick={() => run(n)}
                  className="shrink-0 rounded-md border border-transparent px-2.5 py-1 text-muted-foreground transition hover:border-border hover:bg-surface-2/60 hover:text-primary"
                >
                  <span className="text-prompt">$</span> {n}
                </button>
              ))}
              <div className="ml-auto hidden items-center gap-2 text-[10px] text-muted-foreground sm:flex">
                <kbd className="rounded border border-border bg-surface-2 px-1.5">Tab</kbd> autocomplete
                <kbd className="rounded border border-border bg-surface-2 px-1.5">↑↓</kbd> history
              </div>
            </div>
          </div>

          {/* Output stream */}
          <main className="mx-auto max-w-7xl px-4 pb-40 pt-4">
            <div className="space-y-4">
              {blocks.map((b) => (
                <motion.section
                  key={b.id}
                  id={`block-${b.id}`}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-1.5 flex items-center gap-2 text-xs">
                    <span className="text-prompt">suyog@portfolio</span>
                    <span className="text-muted-foreground">:~$</span>
                    <span className="text-foreground">{b.cmd}</span>
                  </div>
                  <div>{b.node}</div>
                </motion.section>
              ))}
              <div ref={endRef} />
            </div>
          </main>

          {/* Persistent command line */}
          <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/80 backdrop-blur-lg">
            <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
              <span className="text-prompt">suyog@portfolio</span>
              <span className="text-muted-foreground">:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                aria-label="Terminal command"
                placeholder="type a command — try `help`"
                className="caret-primary flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <span className="hidden text-[10px] text-muted-foreground sm:inline">↵ run</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Tiny inline H1 used by the route — kept here so the homepage has a single H1 for SEO.
export function SrOnlyHeading() {
  return (
    <h1 className="sr-only">
      Suyog Magar — Backend Engineer. Java, Spring Boot, Kafka, Redis, Docker, Kubernetes.
    </h1>
  );
}
