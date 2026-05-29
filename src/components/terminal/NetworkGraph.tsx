import { useEffect, useMemo, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Lightweight animated network — pulsing nodes + flowing packets.
 * Pure canvas, ~60fps, no deps.
 */
export function NetworkGraph({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const nodes = useMemo<Node[]>(() => {
    const n: Node[] = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      n.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        r: 1.6 + Math.random() * 2.2,
      });
    }
    return n;
  }, []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, raf = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, w, h);

      // update
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
        if (n.y < 0.02 || n.y > 0.98) n.vy *= -1;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.35;
            ctx.strokeStyle = `oklch(0.72 0.18 240 / ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();

            // packet
            const phase = ((t * 0.01) + (i + j) * 0.13) % 1;
            const px = a.x * w + (b.x - a.x) * w * phase;
            const py = a.y * h + (b.y - a.y) * h * phase;
            ctx.fillStyle = `oklch(0.78 0.15 160 / ${(0.6 * alpha + 0.2).toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.04 + n.x * 10);
        ctx.fillStyle = `oklch(0.72 0.18 240 / ${(0.55 * pulse).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r + pulse * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `oklch(0.95 0.005 240 / 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [nodes]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
