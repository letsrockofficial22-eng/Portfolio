import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const interactive = t.closest('a, button, [data-hover], input, textarea');
      const textHover = t.closest("[data-text]");
      const hoverLabel = t.closest("[data-label]") as HTMLElement | null;
      if (textHover) {
        setVariant("text");
        setLabel("");
      } else if (interactive) {
        setVariant("hover");
        setLabel(hoverLabel?.dataset.label || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-[200] hidden md:block">
        {/* Dot */}
        <motion.div
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          style={{ x: springX, y: springY }}
        />
        {/* Ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
          animate={{
            width: variant === "default" ? 36 : variant === "hover" ? 80 : 120,
            height: variant === "default" ? 36 : variant === "hover" ? 80 : 120,
            backgroundColor:
              variant === "hover" && label ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.02)",
            borderColor: variant === "hover" ? "rgba(200,255,0,0.8)" : "rgba(255,255,255,0.35)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 22, mass: 0.6 }}
          style={{ x: springX, y: springY }}
        >
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-accent"
            >
              {label}
            </motion.span>
          )}
          {variant === "text" && (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-white">
              Scroll
            </span>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
