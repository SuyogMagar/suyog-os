import { useEffect, useRef, useState } from "react";

/* ANSI Shadow — "SUYOG MAGAR" */
const BANNER = [
  "███████╗██╗   ██╗██╗   ██╗ ██████╗  ██████╗   ███╗   ███╗ █████╗  ██████╗  █████╗ ██████╗ ",
  "██╔════╝██║   ██║╚██╗ ██╔╝██╔═══██╗██╔════╝   ████╗ ████║██╔══██╗██╔════╝ ██╔══██╗██╔══██╗",
  "███████╗██║   ██║ ╚████╔╝ ██║   ██║██║  ███╗  ██╔████╔██║███████║██║  ███╗███████║██████╔╝",
  "╚════██║██║   ██║  ╚██╔╝  ██║   ██║██║   ██║  ██║╚██╔╝██║██╔══██║██║   ██║██╔══██║██╔══██╗",
  "███████║╚██████╔╝   ██║   ╚██████╔╝╚██████╔╝  ██║ ╚═╝ ██║██║  ██║╚██████╔╝██║  ██║██║  ██║",
  "╚══════╝ ╚═════╝    ╚═╝    ╚═════╝  ╚═════╝   ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝",
];

const SUBLINES = [
  "> backend.engineer  //  java · spring · kafka · redis · k8s",
  "> compiling distributed systems...",
];

function AsciiBanner({ onDone }: { onDone: () => void }) {
  const total = BANNER[0].length;
  const [n, setN] = useState(0);
  const [sub, setSub] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
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

  useEffect(() => {
    if (sub < 2 || doneRef.current) return;
    doneRef.current = true;
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [sub, onDone]);

  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-2">
      <div className="relative w-full">
        <pre className="m-0 w-full overflow-hidden whitespace-pre text-center font-mono text-[6px] leading-[1.05] text-primary sm:text-[7px] md:text-[8px]"
          style={{ textShadow: "0 0 8px oklch(0.72 0.18 240 / 0.55)" }}>
{BANNER.map((l) => l.slice(0, n)).join("\n")}
        </pre>
        <div className="pointer-events-none absolute inset-0 ascii-scan" />
      </div>
      <div className="mt-3 h-8 text-center text-[10px] leading-tight text-accent">
        {sub >= 1 && <div className="opacity-90">{SUBLINES[0]}</div>}
        {sub >= 2 && <div className="caret opacity-90">{SUBLINES[1]}</div>}
      </div>
    </div>
  );
}

/* ASCII coffee cup with animated steam */
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
  "   `'''''''''''`    ",
];

const STEAM_FRAMES = [
  ["  ~   ~    ~  ", "   ~   ~   ~  ", "  ~   ~    ~  "],
  ["   ~   ~   ~ ", "  ~    ~  ~  ", "   ~   ~   ~ "],
  ["  ~  ~    ~  ", "   ~   ~   ~ ", "  ~   ~   ~  "],
  ["    ~   ~  ~ ", "   ~   ~    ~", "    ~   ~   ~"],
];

function AsciiCoffee() {
  const [f, setF] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setF((x) => (x + 1) % STEAM_FRAMES.length), 220);
    const id2 = setInterval(() => setTick((x) => x + 1), 1000);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);

  const steam = STEAM_FRAMES[f];
  const cup = [
    "      " + steam[0],
    "      " + steam[1],
    "      " + steam[2],
    ...CUP.slice(3),
  ];

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-2 py-2">
      <pre className="m-0 whitespace-pre font-mono text-[11px] leading-[1.05] text-accent sm:text-[12px]"
        style={{ textShadow: "0 0 6px oklch(0.78 0.15 160 / 0.45)" }}>
{cup.join("\n")}
      </pre>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-accent">uptime: ∞</span>
        <span>·</span>
        <span>fueled by espresso</span>
        <span className="ml-2 opacity-50">[{tick}s]</span>
      </div>
    </div>
  );
}

export function AsciiShowcase({ className = "" }: { className?: string }) {
  const [phase, setPhase] = useState<"banner" | "coffee">("banner");
  return (
    <div className={className}>
      {phase === "banner" ? <AsciiBanner onDone={() => setPhase("coffee")} /> : <AsciiCoffee />}
    </div>
  );
}
