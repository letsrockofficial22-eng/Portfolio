import type { Variants } from "framer-motion";

const easings: any = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { y: 120, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 1.1, ease: easings } },
};

export const fadeUpFast: Variants = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: easings } },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.15 },
  },
};

export const ease = easings as [number, number, number, number];
