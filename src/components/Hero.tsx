import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpFast, stagger, ease } from "./variants";

const portrait = "/Tamim.jpg";
export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden px-6 pt-32 md:px-10 md:pt-36">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-8rem)] max-w-7xl grid-cols-1 items-end gap-10 pb-10 md:grid-cols-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="md:col-span-8">
          {/* Greeting */}
          <motion.div
            variants={fadeUpFast}
            className="mb-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/60"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2">
              <span>👋</span> Hi, my name is Tamim Ahmed
            </span>
            <span className="hidden h-px w-16 bg-line md:block" />
            <span className="text-accent">Portfolio · 2026</span>
          </motion.div>

          {/* Massive staggered typography */}
          <h1 data-text className="font-display leading-[0.88] tracking-tight text-ink">
            <motion.div
              variants={fadeUp}
              className="flex items-baseline gap-6 text-[18vw] md:text-[12vw] lg:text-[11vw]"
            >
              <span className="text-accent">01</span>
              <span className="italic">web</span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease }}
                className="text-[2vw] font-heading uppercase tracking-[0.3em] text-ink/50 md:text-[0.9vw]"
              >
                / Developer
              </motion.span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-baseline gap-6 text-[18vw] md:text-[12vw] lg:text-[11vw]"
            >
              <span className="text-ink/40">02</span>
              <span>&</span>
              <span className="italic text-accent/90">UI/UX</span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease }}
                className="text-[2vw] font-heading uppercase tracking-[0.3em] text-ink/50 md:text-[0.9vw]"
              >
                / Designer
              </motion.span>
            </motion.div>
          </h1>

          {/* Bottom row */}
          <motion.div
            variants={fadeUpFast}
            className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-sm leading-relaxed text-ink/60 md:text-[13px]">
              Crafting premium digital experiences with motion, AI-driven logic and obsessive
              attention to detail. Based in Dhaka — working globally.
            </p>

            <a
              href="#contact"
              data-hover
              data-label="CLICK"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-accent bg-accent px-8 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-bg transition hover:bg-transparent hover:text-accent"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <svg
                className="relative z-10 h-4 w-4 transition group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait with parallax */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1.2, ease }}
          className="relative hidden h-[420px] md:col-span-4 md:block"
        >
          <motion.div
            style={{
              x: mouse.x * 20,
              y: mouse.y * 20,
              rotateX: mouse.y * -4,
              rotateY: mouse.x * 4,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="relative h-full w-full overflow-hidden rounded-[2px] border border-white/10 bg-white/[0.02]"
          >
            <img
              src={portrait}
              alt="Tamim Ahmed portrait"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              PORTRAIT / 2026
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
                  Creative Developer
                </div>
                <div className="font-display text-3xl text-ink">TAMIM</div>
              </div>
              <div className="text-right text-[10px] uppercase tracking-[0.3em] text-ink/50">
                23.71°N
                <br />
                90.41°E
              </div>
            </div>
          </motion.div>
          <div className="pointer-events-none absolute -right-3 -top-3 h-16 w-16 border-t border-r border-accent/60" />
          <div className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 border-b border-l border-accent/60" />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-ink/40">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-accent/70"
        />
      </motion.div>
    </section>
  );
}
