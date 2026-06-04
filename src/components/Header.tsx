import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-6 pt-5 md:px-10 md:pt-6"
    >
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-ink/80">
        {/* Logo */}
        <a
          href="#top"
          data-hover
          data-label="HOME"
          className="group flex items-center gap-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 font-display text-sm text-accent transition group-hover:border-accent">
            TA
          </span>
          <span className="hidden md:inline font-heading text-[11px] tracking-[0.3em] text-ink">
            Tamim Ahmed
          </span>
        </a>

        {/* Status */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] tracking-[0.25em] text-ink/90">
            Available for Projects
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-1">
          <a
            data-hover
            data-label="IG"
            href="https://www.instagram.com/_tamb0?igsh=amZ5cHprbm13bXE3"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-4 py-2 text-[10px] tracking-[0.25em] text-ink/80 transition hover:border-accent hover:text-accent"
          >
            Instagram
          </a>
          <a
            data-hover
            data-label="GH"
            href="https://github.com/letsrockofficial22-eng"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-[10px] tracking-[0.25em] text-ink/80 transition hover:border-accent hover:text-accent sm:inline-block"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.header>
  );
}
