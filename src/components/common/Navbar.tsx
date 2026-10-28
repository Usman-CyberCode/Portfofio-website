"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData, navItems } from "@/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      // Section intersection detection
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
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
          ? "bg-[#030509]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram with Magnetic attraction */}
        <Magnetic strength={0.2}>
          <Link
            href="#"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl p-1"
            aria-label="Muhammad Usman Tahir — Home"
          >
            <div className="h-8 w-8 rounded-xl bg-[#090e1d] border border-white/10 group-hover:border-blue-500/50 flex items-center justify-center font-mono font-bold text-xs text-white transition-colors shadow-[0_0_12px_rgba(37,99,235,0.15)]">
              <span className="text-blue-400 group-hover:text-blue-300">U</span>
              <span>T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                {personalData.name}
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5">
                BSCS &bull; Web Dev
              </span>
            </div>
          </Link>
        </Magnetic>

        {/* Desktop Navigation Links with sliding active highlight pill */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#070c18]/70 border border-white/[0.08] p-1.5 rounded-full backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            const isHovered = hoveredNav === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.href)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative text-xs font-mono px-3.5 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isActive
                    ? "text-white font-medium"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {/* Active or hovered pill background */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-blue-600/20 border border-blue-400/30 rounded-full z-0 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                  />
                )}
                {!isActive && isHovered && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-white/[0.05] rounded-full z-0"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions & Social */}
        <div className="hidden sm:flex items-center gap-2">
          {githubLink && (
            <Magnetic strength={0.3}>
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            </Magnetic>
          )}
          {linkedinLink && (
            <Magnetic strength={0.3}>
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </Magnetic>
          )}
          <Magnetic strength={0.25}>
            <Link href="#contact" className="focus-visible:outline-none">
              <Button
                size="sm"
                variant="default"
                className="text-xs h-8.5 px-4 shadow-sm"
              >
                <span>Hire Me</span>
                <Send className="h-3 w-3" />
              </Button>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="p-2 rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 hover:text-white hover:border-blue-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
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
            className="md:hidden overflow-hidden border-b border-white/[0.08] bg-[#030509]/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-6 space-y-4 max-w-md mx-auto">
              <div className="flex flex-col space-y-1">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.href;
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
                            ? "bg-blue-600/20 text-blue-300 font-medium border border-blue-500/30"
                            : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
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
                      className="p-2 rounded-xl border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white"
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
                      className="p-2 rounded-xl border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>

                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button size="sm" variant="default" className="text-xs">
                    <span>Contact Me</span>
                    <Send className="h-3 w-3" />
                  </Button>
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
