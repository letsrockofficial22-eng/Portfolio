import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MarqueeStrip({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

  const items = Array.from({ length: 10 }, (_, i) => (
    <span key={i} className="mx-8 inline-flex items-center gap-6 font-display text-ink">
      {text}
      <span className="inline-block h-3 w-3 translate-y-[-6px] rotate-45 bg-accent" />
    </span>
  ));

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-line bg-bg py-8">
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap text-[14vw] leading-none md:text-[10vw] lg:text-[8vw]"
      >
        {items}
        {items}
      </motion.div>
    </div>
  );
}
