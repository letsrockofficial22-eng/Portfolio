import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ease } from "./variants";

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
};

export default function Sandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const [inside, setInside] = useState(false);

  const labelX = useMotionValue(0);
  const labelY = useMotionValue(0);
  const sX = useSpring(labelX, { stiffness: 200, damping: 20, mass: 0.4 });
  const sY = useSpring(labelY, { stiffness: 200, damping: 20, mass: 0.4 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const spawn = (x: number, y: number) => {
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.8;
        particlesRef.current.push({
          id: Math.random(),
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
        });
      }
      if (particlesRef.current.length > 600) {
        particlesRef.current = particlesRef.current.slice(-500);
      }
    };

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, active: true };
      labelX.set(x);
      labelY.set(y);
      spawn(x, y);
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      setInside(false);
    };
    const onEnter = () => setInside(true);

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("mouseenter", onEnter);

    const tick = () => {
      const { width, height } = container.getBoundingClientRect();
      // Trail fade
      ctx.fillStyle = "rgba(10,10,10,0.18)";
      ctx.fillRect(0, 0, width, height);

      // grid dots
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      const step = 48;
      for (let x = step; x < width; x += step) {
        for (let y = step; y < height; y += step) {
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = Math.min(1, Math.max(0, 1 - dist / 180));
          const px = x + (dx / (dist || 1)) * push * 24;
          const py = y + (dy / (dist || 1)) * push * 24;
          ctx.beginPath();
          ctx.arc(px, py, 1.2 + push * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = push > 0.2 ? `rgba(200,255,0,${0.25 + push * 0.7})` : "rgba(255,255,255,0.08)";
          ctx.fill();
        }
      }

      // particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.02;
        p.life -= 0.012;
        if (p.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + (1 - p.life) * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,255,0,${p.life * 0.8})`;
        ctx.fill();
        return true;
      });

      // cursor core
      if (mouseRef.current.active) {
        const { x, y } = mouseRef.current;
        const grd = ctx.createRadialGradient(x, y, 0, x, y, 180);
        grd.addColorStop(0, "rgba(200,255,0,0.18)");
        grd.addColorStop(1, "rgba(200,255,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, [labelX, labelY]);

  return (
    <section id="sandbox" className="relative overflow-hidden bg-bg">
      <div
        ref={containerRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 md:px-10"
        data-hover
        data-label="MOVE"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Ambient overlays */}
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-20" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-ink/60">
            <span className="h-px w-10 bg-accent" /> Interactive Sandbox / 01
            <span className="h-px w-10 bg-accent" />
          </div>

          <h2 className="font-display text-[16vw] leading-[0.9] tracking-tight text-ink md:text-[9vw]">
            Bring your
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease }}
              className="italic text-accent"
            >
              Imagination
            </motion.span>
            <br /> into reality.
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.9, ease }}
            className="mt-10 max-w-xl text-sm leading-relaxed text-ink/60 md:text-[14px]"
          >
            Code, motion and design collide here. Move your mouse across this canvas to warp a
            reactive particle field — a tiny taste of what I build for clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: inside ? 1 : 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] uppercase tracking-[0.35em] text-ink/70 backdrop-blur"
          >
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            {inside ? "Canvas engaged" : "Move the mouse to begin"}
          </motion.div>
        </motion.div>

        {/* Floating label that follows cursor */}
        <motion.div
          style={{ x: sX, y: sY, translateX: "-50%", translateY: "-50%" }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        >
          <motion.span
            animate={{ opacity: inside ? 1 : 0, scale: inside ? 1 : 0.9 }}
            className="block rounded-full border border-accent/60 bg-bg/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-accent backdrop-blur"
          >
            ✶ Play
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
