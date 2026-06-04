import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setProgress(Math.round(latest)),
    });
    return controls.stop;
  }, [count]);

  const letters = "LOADINGPORTFOLIO";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
    >
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-16 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-mute">
          <span className="h-px w-10 bg-line" />
          <span>Initializing experience</span>
          <span className="h-px w-10 bg-line" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[16vw] leading-none tracking-tight text-ink md:text-[12vw] lg:text-[10vw]"
        >
          <span className="inline-flex gap-[0.05em]">
            {letters.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block will-change-transform"
                style={{ color: ch === " " ? "transparent" : undefined }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 flex w-[80vw] max-w-3xl items-center justify-between text-[11px] uppercase tracking-[0.3em] text-mute"
        >
          <span>Tamim Ahmed</span>
          <span>2026 / Portfolio</span>
          <span>{String(progress).padStart(3, "0")}%</span>
        </motion.div>

        <div className="mt-3 h-px w-[80vw] max-w-3xl overflow-hidden bg-line">
          <motion.div
            className="h-full bg-accent"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
