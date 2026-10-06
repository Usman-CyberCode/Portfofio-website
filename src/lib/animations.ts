import { Variants } from "framer-motion";

/**
 * Standard spring transitions
 */
export const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export const smoothTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] // Apple/Linear smooth cubic-bezier
};

/**
 * Fade up animation variant for section elements
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

/**
 * Fade in animation variant
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

/**
 * Stagger container for lists, grids, and cards
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

/**
 * Scale in for badges and interactive tags
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

/**
 * Hover scale variant for interactive cards
 */
export const cardHoverVariants = {
  rest: { y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  hover: { y: -4, transition: { duration: 0.25, ease: "easeOut" } }
};
