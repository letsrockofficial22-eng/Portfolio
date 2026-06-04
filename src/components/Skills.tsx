import { motion } from "framer-motion";
import { fadeUp, fadeUpFast, stagger, ease } from "./variants";

const skills = [
  {
    n: "01",
    title: "Modern ERA AI Chatbot Intelligence",
    desc: "Engineered neural nodes for NLP, retrieval-augmented reasoning and conversational interfaces that feel alive.",
    tags: ["LLM", "RAG", "Agents", "Prompt"],
  },
  {
    n: "02",
    title: "Secure Architecture",
    desc: "Robust systems for global scale — zero-trust patterns, hardened APIs, and encrypted data flows across continents.",
    tags: ["Zero-Trust", "Auth", "Hardened"],
  },
  {
    n: "03",
    title: "Real-Time Performance",
    desc: "High-speed infrastructure, edge rendering and micro-optimized frontends delivering under 80ms interaction.",
    tags: ["Edge", "60FPS", "SSR", "CDN"],
  },
  {
    n: "04",
    title: "Premium Interactive 3D",
    desc: "Elevating brands with WebGL, Three.js and shader-driven scenes that respond to motion, gaze and gesture.",
    tags: ["WebGL", "Three.js", "Shaders"],
  },
];

export default function Skills() {
  return (
    <section className="relative bg-bg px-6 py-32 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={fadeUpFast} className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-ink/60">
            <span className="h-px w-10 bg-accent" /> Skills / (04)
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[12vw] leading-[0.9] tracking-tight text-ink md:text-[6vw]"
          >
            What <span className="italic text-accent">sets</span> me
            <br /> apart.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-line border-y border-line"
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.n}
              variants={fadeUpFast}
              whileHover={{ backgroundColor: "rgba(200,255,0,0.035)" }}
              transition={{ duration: 0.4, ease }}
              className="group grid grid-cols-12 items-start gap-6 px-2 py-10 md:px-4 md:py-14"
              data-hover
              data-label="VIEW"
            >
              <div className="col-span-2 font-display text-accent md:col-span-1 md:text-2xl">
                {s.n}
              </div>
              <div className="col-span-10 md:col-span-5">
                <h3 className="font-display text-3xl leading-tight text-ink transition group-hover:text-accent md:text-[2.4rem]">
                  {s.title}
                </h3>
              </div>
              <p className="col-span-10 text-sm leading-relaxed text-ink/60 md:col-span-4 md:text-[14px]">
                {s.desc}
              </p>
              <div className="col-span-12 flex flex-wrap gap-2 md:col-span-2 md:justify-end">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ink/70 transition group-hover:border-accent group-hover:text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {i < skills.length - 1 && (
                <span className="pointer-events-none absolute left-0 right-0 bottom-0 h-px" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
