import { type Variants, type Transition } from "framer-motion";

/**
 * Common transitions
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
};

/**
 * Fade up entrance variant
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
};

/**
 * Fade in entrance variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/**
 * Stagger container variant for lists/grids
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Scale in variant
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};
