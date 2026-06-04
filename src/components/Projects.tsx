import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { fadeUp, stagger, ease } from "./variants";

const projects = [
  {
    n: "01",
    name: "Shopamingo",
    tag: "E-commerce · Next.js · Motion",
    url: "https://shopamingo.com",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "02",
    name: "Pulsex",
    tag: "SaaS · Analytics · Realtime",
    url: "https://pulsex.io",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    n: "03",
    name: "JArvis",
    tag: "AI · Chatbot · Voice",
    url: "https://jarvis.ai",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.4 });
  const sY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <section className="relative bg-bg px-6 py-32 md:px-10 md:py-40" id="artworks">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/60">
            <span className="h-px w-10 bg-accent" /> The Artworks / (03)
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[14vw] leading-[0.9] tracking-tight text-ink md:text-[7vw]"
          >
            Selected <span className="italic text-accent">work</span>.
          </motion.h2>
        </motion.div>

        <div className="relative divide-y divide-line border-y border-line">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setActive(p.name)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ paddingLeft: 40 }}
              transition={{ duration: 0.6, ease }}
              data-hover
              data-label="VISIT"
              className="group relative flex items-center gap-6 overflow-hidden px-2 py-10 md:px-4 md:py-14"
            >
              {/* Background hover wash */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 bg-accent/[0.04]"
              />

              <span className="font-display text-accent md:text-2xl">{p.n}</span>

              <div className="flex-1 overflow-hidden">
                <h3 className="truncate font-display text-5xl leading-none tracking-tight text-ink transition group-hover:text-accent md:text-[7vw]">
                  {p.name}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ink/50">{p.tag}</p>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <span className="text-[10px] uppercase tracking-[0.35em] text-ink/50 transition group-hover:text-accent">
                  Visit Site
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              {i < projects.length - 1 && <span />}
            </motion.a>
          ))}
        </div>

        {/* Floating preview image */}
        <motion.div
          style={{
            x: sX,
            y: sY,
            translateX: "-50%",
            translateY: "-50%",
            opacity: active ? 1 : 0,
            scale: active ? 1 : 0.9,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-[320px] w-[440px] overflow-hidden rounded-[2px] border border-white/10 shadow-2xl md:block"
        >
          {projects.map((p) => (
            <img
              key={p.name}
              src={p.image}
              alt={p.name}
              style={{ opacity: active === p.name ? 1 : 0 }}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="font-display text-2xl text-ink">
              {active ?? ""}
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-ink/70">Live Preview</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
