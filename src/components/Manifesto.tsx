import { motion } from "framer-motion";
import { fadeUp, fadeUpFast, stagger, ease } from "./variants";

const items = [
  {
    n: "01",
    label: "Strategy",
    value: "Motion that matters",
    text: "Design rooted in intent. Every micro-interaction serves a purpose — guiding attention, building trust, and driving outcomes.",
  },
  {
    n: "02",
    label: "Tech",
    value: "Scalable architecture",
    text: "Production-grade systems built with edge-first reasoning, typed APIs, and modular layers that grow with the product.",
  },
  {
    n: "03",
    label: "UX & UI",
    value: "Emotional interfaces",
    text: "Interfaces that feel alive — kinetic typography, weight, rhythm, and restraint mixed to make software feel human.",
  },
  {
    n: "04",
    label: "Future",
    value: "AI-Driven logic",
    text: "Intelligent components, automated design systems and data-informed decisions — the next generation of the web.",
  },
];

export default function Manifesto() {
  return (
    <section className="relative bg-bg px-6 py-32 md:px-10 md:py-40" id="manifesto">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20"
        >
          <motion.div variants={fadeUpFast} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/60">
            <span className="h-px w-10 bg-accent" /> The Manifesto / (04)
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-[14vw] leading-[0.9] tracking-tight text-ink md:text-[7vw]"
          >
            Core <span className="italic text-accent">philosophies</span>.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-px bg-line md:grid-cols-2"
        >
          {items.map((it) => (
            <motion.article
              key={it.n}
              variants={fadeUp}
              whileHover={{ backgroundColor: "rgba(10,10,10,0.95)" }}
              transition={{ duration: 0.4, ease }}
              className="group relative overflow-hidden bg-bg p-10 md:p-14"
              data-hover
              data-label="READ"
            >
              {/* massive background number */}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease }}
                className="pointer-events-none absolute -right-6 -top-10 font-display text-[18vw] leading-none text-ink/[0.06] transition group-hover:text-accent/20"
              >
                {it.n}
              </motion.span>

              <div className="relative flex flex-col gap-4">
                <div className="flex items-baseline gap-4 text-[11px] uppercase tracking-[0.35em] text-ink/50">
                  <span className="font-display text-accent">{it.n}</span>
                  <span className="h-px flex-1 bg-line" />
                  <span>{it.label}</span>
                </div>

                <h3 className="font-display text-5xl leading-[0.95] tracking-tight text-ink transition group-hover:text-accent md:text-[3.4rem]">
                  {it.value}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/60 md:text-[14px]">
                  {it.text}
                </p>

                <div className="mt-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ink/50 transition group-hover:text-accent">
                  <span className="inline-block h-2 w-2 rotate-45 border-t border-r border-current" />
                  Principle
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
