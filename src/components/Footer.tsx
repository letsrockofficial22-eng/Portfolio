import { motion } from "framer-motion";
import { fadeUp, stagger, ease } from "./variants";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-32 md:pt-40">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Meta bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.35em] text-ink/60"
        >
          <span className="inline-flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent pulse-dot" />
            Let&apos;s build something unforgettable
          </span>
          <span>Dhaka · Worldwide · 2026</span>
        </motion.div>

        {/* Huge headline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="border-t border-line pt-10"
        >
          <motion.h2
            variants={fadeUp}
            data-text
            className="font-display text-[20vw] leading-[0.85] tracking-tight text-ink md:text-[14vw]"
          >
            Let&apos;s <span className="italic text-accent">Talk</span>.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-sm leading-relaxed text-ink/60 md:text-[14px]"
          >
            Available for new projects — freelance, retainer, and full-time opportunities. Drop a
            line and I&apos;ll respond within 24 hours.
          </motion.p>
        </motion.div>

        {/* Contact */}
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-10 md:grid-cols-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/50">Email</div>
            <a
              data-hover
              data-label="MAIL"
              href="mailto:hello@tamimahmed.dev"
              className="mt-3 block break-all text-sm text-ink transition hover:text-accent md:text-base"
            >
              hello@tamimahmed.dev
            </a>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/50">Socials</div>
            <ul className="mt-3 space-y-2 text-sm text-ink md:text-base">
              <li>
                <a
                  data-hover
                  data-label="↗"
                  href="https://www.instagram.com/_tamb0/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-accent"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  data-hover
                  data-label="↗"
                  href="https://github.com/letsrockofficial22-eng"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-accent"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  data-hover
                  data-label="↗"
                  href="#"
                  className="transition hover:text-accent"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-ink/50">Location</div>
            <p className="mt-3 text-sm text-ink/80 md:text-base">
              Dhaka, Bangladesh
              <br /> 23.71°N / 90.41°E
            </p>
          </div>

          <div className="flex items-start justify-start md:justify-end">
            <button
              onClick={scrollTop}
              data-hover
              data-label="TOP"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-4 text-[10px] uppercase tracking-[0.35em] text-ink transition hover:border-accent hover:text-accent"
            >
              ↑ Back to Top
              <span className="inline-block transition group-hover:-translate-y-1">↑</span>
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-line pb-10 pt-8 text-[10px] uppercase tracking-[0.3em] text-ink/50 md:flex-row md:items-center">
          <span>© 2026 Tamim Ahmed. All rights reserved.</span>
          <span className="font-display text-sm tracking-[0.2em] text-ink/70">
            TAMIM · CRAFTED WITH MOTION
          </span>
          <span>V 1.0 · 2026</span>
        </div>
      </div>
    </footer>
  );
}
