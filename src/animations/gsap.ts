import gsap from "gsap";

/**
 * GSAP initialization helper
 * Prepares GSAP for client-side scroll-driven animations
 */
export const initGsap = () => {
  if (typeof window === "undefined") return;

  // Additional plugins can be registered here safely on client
  return gsap;
};

export { gsap };
