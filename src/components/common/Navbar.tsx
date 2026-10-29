"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";

const referenceNavItems = [
  { label: "Works", href: "/#projects", sectionId: "projects" },
  { label: "Services", href: "/#focus-areas", sectionId: "focus-areas" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      const sections = referenceNavItems.map((item) => item.sectionId);
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050508]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Name matching reference screenshot 1 (e.g. Hanzi -> Usman) */}
        <Magnetic strength={0.2}>
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-xl p-1"
            aria-label="Muhammad Usman Tahir — Home"
          >
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#ebe8e5] group-hover:text-white transition-colors">
              Usman
            </span>
          </Link>
        </Magnetic>

        {/* Center Desktop Navigation Links matching reference */}
        <nav
          className="hidden md:flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          aria-label="Main Navigation"
        >
          {referenceNavItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            const isHovered = hoveredNav === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative text-xs font-mono px-4 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  isActive
                    ? "text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-full z-0 shadow-sm"
                  />
                )}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-white/[0.04] rounded-full z-0"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button: Let's talk → matching reference screenshot 1 */}
        <div className="hidden sm:flex items-center gap-3">
          <Magnetic strength={0.25}>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/15 bg-white/[0.04] text-xs font-mono text-[#ebe8e5] hover:bg-white/[0.08] hover:border-white/25 transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              <span>Let&apos;s talk</span>
              <ArrowRight className="h-3 w-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-purple-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-b border-white/[0.08] bg-[#050508]/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
              <div className="flex flex-col space-y-1">
                {referenceNavItems.map((item, idx) => {
                  const isActive = activeSection === item.sectionId;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-mono transition-colors ${
                          isActive
                            ? "bg-purple-600/20 text-purple-300 font-medium border border-purple-500/30"
                            : "text-zinc-300 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {githubLink && (
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  )}
                  {linkedinLink && (
                    <a
                      href={linkedinLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
                    </a>
                  )}
                </div>

                <Link
                  href="/#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/[0.08] text-xs font-mono text-white"
                >
                  <span>Let&apos;s talk</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
