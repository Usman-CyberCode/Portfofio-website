"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
          ? "bg-[#08080a]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Monogram */}
        <Link
          href="#"
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          aria-label="Muhammad Usman Tahir — Home"
        >
          <div className="h-8 w-8 rounded-lg bg-zinc-900 border border-white/10 group-hover:border-orange-500/50 flex items-center justify-center font-mono font-bold text-xs text-white transition-colors">
            <span className="text-orange-400 group-hover:text-orange-300">U</span>
            <span>T</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
              {personalData.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 -mt-0.5">
              BSCS &bull; Web Dev
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with sliding active highlight */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] p-1 rounded-full backdrop-blur-sm"
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
                className={`relative text-xs font-mono px-3.5 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  isActive
                    ? "text-white font-medium"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {/* Active or hovered pill background */}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-white/[0.08] border border-white/15 rounded-full z-0"
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

        {/* Desktop Actions & Social */}
        <div className="hidden sm:flex items-center gap-2">
          {githubLink && (
            <a
              href={githubLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {linkedinLink && (
            <a
              href={linkedinLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          )}
          <Link href="#contact" className="focus-visible:outline-none">
            <Button
              size="sm"
              variant="default"
              className="text-xs h-8.5 px-3.5 shadow-sm shadow-orange-500/20"
            >
              <Send className="h-3 w-3" />
              <span>Contact</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0c0c11] border-b border-white/10 px-5 py-6 shadow-2xl"
          >
            <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-mono py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-white/[0.08] text-white font-medium"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10"
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
                    className="p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] border border-white/10"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                )}
              </div>

              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" variant="default" className="text-xs">
                  <span>Contact Me</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
