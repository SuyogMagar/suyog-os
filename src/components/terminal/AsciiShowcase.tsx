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
    const t = setTimeout(onDone, 2000);
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

/* ASCII spinning globe with blinking region dots */
const REGIONS = [
  { name: "us-east-1", lat: 0.66, lon: -1.35 },
  { name: "us-west-2", lat: 0.83, lon: -2.10 },
  { name: "eu-west-1", lat: 0.93, lon: -0.18 },
  { name: "eu-central-1", lat: 0.89, lon: 0.15 },
  { name: "ap-south-1", lat: 0.33, lon: 1.28 },
  { name: "ap-northeast-1", lat: 0.62, lon: 2.44 },
  { name: "sa-east-1", lat: -0.41, lon: -0.82 },
];

function AsciiGlobe() {
  const [frame, setFrame] = useState("");
  const [labelIdx, setLabelIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setLabelIdx((i) => (i + 1) % REGIONS.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let raf = 0;
    let t0 = performance.now();
    const W = 58;
    const H = 22;
    const shade = " .·:-=+*#%@";

    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const rot = t * 0.6;
      const cx = W / 2;
      const cy = H / 2;
      const R = H / 2 - 0.5;
      const rows: string[][] = [];

      for (let y = 0; y < H; y++) {
        const row: string[] = [];
        for (let x = 0; x < W; x++) {
          const nx = (x - cx) / (R * 2);
          const ny = (y - cy) / R;
          const d2 = nx * nx + ny * ny;
          if (d2 > 1) { row.push(" "); continue; }
          const z = Math.sqrt(1 - d2);
          const lat = Math.asin(ny);
          const lon = Math.atan2(nx, z) + rot;
          const land =
            Math.sin(lat * 4 + 1.1) * Math.cos(lon * 3) +
              Math.sin(lon * 2 + lat * 2) * 0.5 >
            0.35;
          const li = Math.min(shade.length - 1, Math.floor(z * (shade.length - 1)));
          row.push(land ? shade[Math.min(shade.length - 1, li + 2)] : z > 0.75 ? "·" : " ");
        }
        rows.push(row);
      }

      // region dots
      const blinkOn = Math.floor(t * 3) % 2 === 0;
      for (let i = 0; i < REGIONS.length; i++) {
        const r = REGIONS[i];
        const xx = Math.cos(r.lat) * Math.sin(r.lon + rot);
        const zz = Math.cos(r.lat) * Math.cos(r.lon + rot);
        const yy = Math.sin(r.lat);
        if (zz < 0.05) continue;
        const sx = Math.round(cx + xx * R * 2);
        const sy = Math.round(cy + yy * R);
        if (sx < 0 || sx >= W || sy < 0 || sy >= H) continue;
        const isActive = i === labelIdx;
        rows[sy][sx] = isActive ? (blinkOn ? "◉" : "◎") : blinkOn ? "●" : "○";
      }

      setFrame(rows.map((r) => r.join("")).join("\n"));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [labelIdx]);

  const active = REGIONS[labelIdx];

  return (
    <div className="relative flex h-full flex-col items-center justify-center px-2 py-2">
      <pre className="m-0 whitespace-pre font-mono text-[10px] leading-[1.0] text-accent sm:text-[11px]"
        style={{ textShadow: "0 0 6px oklch(0.78 0.15 160 / 0.5)" }}>
{frame}
      </pre>
      <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
        <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent" />
        <span className="text-accent">{active.name}</span>
        <span>· deployed · healthy</span>
      </div>
    </div>
  );
}

export function AsciiShowcase({ className = "" }: { className?: string }) {
  const [phase, setPhase] = useState<"banner" | "globe">("banner");
  return (
    <div className={className}>
      {phase === "banner" ? <AsciiBanner onDone={() => setPhase("globe")} /> : <AsciiGlobe />}
    </div>
  );
}
