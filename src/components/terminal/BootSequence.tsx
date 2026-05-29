import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  { cmd: "whoami", out: ["Suyog Magar"] },
  { cmd: "role", out: ["Backend Engineer", "Java Developer", "Distributed Systems Enthusiast"] },
  { cmd: "stack", out: ["Java · Spring Boot · Kafka · Redis", "Docker · Kubernetes · React · GitHub Actions"] },
  {
    cmd: "initialize portfolio",
    out: ["Loading modules...", "Loading infrastructure...", "Loading projects...", "Loading system architecture..."],
  },
];

export function BootSequence({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Advance steps
  useEffect(() => {
    if (step >= STEPS.length) return;
    const isLast = step === STEPS.length - 1;
    const delay = isLast ? 1400 : 700;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);

  // Progress bar runs during last step
  useEffect(() => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className="glass w-full max-w-2xl overflow-hidden rounded-xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="size-3 rounded-full bg-[oklch(0.68_0.22_25)]" />
          <span className="size-3 rounded-full bg-[oklch(0.82_0.16_85)]" />
          <span className="size-3 rounded-full bg-[oklch(0.78_0.15_160)]" />
          <span className="ml-3 text-xs text-muted-foreground">suyog@portfolio: ~ — boot</span>
        </div>
        <div className="scanline px-5 py-6 text-sm leading-relaxed">
          {visible.map((s, i) => {
            const isCurrent = i === step;
            return (
              <div key={i} className="mb-3">
                <div className="flex">
                  <span className="text-prompt">$&nbsp;</span>
                  <TypedLine text={s.cmd} done={!isCurrent} />
                </div>
                {(!isCurrent || step >= STEPS.length - 1) && (
                  <div className="mt-1 pl-4 text-foreground/90">
                    {s.out.map((o, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * j + 0.25 }}
                      >
                        {o}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {step >= STEPS.length - 1 && (
            <div className="mt-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.07 }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>booting kernel · mounting filesystems</span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function TypedLine({ text, done }: { text: string; done: boolean }) {
  const [n, setN] = useState(done ? text.length : 0);
  useEffect(() => {
    if (done) { setN(text.length); return; }
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text, done]);
  return (
    <span className={n < text.length ? "caret" : ""}>{text.slice(0, n)}</span>
  );
}
