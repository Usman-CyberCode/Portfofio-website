import { type Variants, type Transition } from "framer-motion";

/**
 * High-end cubic-bezier easing curves inspired by Framer motion design
 */
export const framerEase = [0.215, 0.61, 0.355, 1] as const;
export const expoOut = [0.16, 1, 0.3, 1] as const;
export const softSpring = { damping: 24, stiffness: 240, mass: 0.35 };

export const springTransition: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 24,
};

export const smoothTransition: Transition = {
  duration: 0.65,
  ease: [0.215, 0.61, 0.355, 1],
};

/**
 * Staggered container variants
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

/**
 * Staggered word/line reveal variant (mask clip)
 */
export const heroMaskReveal: Variants = {
  hidden: {
    y: "115%",
    opacity: 0,
    rotateX: 25,
  },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Fade up entrance variant
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

/**
 * Scroll reveal variant with subtle depth
 */
export const scrollReveal: Variants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

/**
 * Fade in entrance variant
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Scale in variant
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
};
