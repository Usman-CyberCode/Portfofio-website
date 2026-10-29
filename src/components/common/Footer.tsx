"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/magnetic";
import { personalData } from "@/data";

const dedicatedLinks = [
  { label: "All Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About Dossier", href: "/about" },
  { label: "Skills Matrix", href: "/skills" },
  { label: "Full Education", href: "/education" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <footer className="border-t border-white/[0.08] bg-[#030509] relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-[#070c18] border border-purple-500/30 flex items-center justify-center font-mono font-bold text-xs text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                UT
              </div>
              <span className="text-sm font-semibold text-white">
                {personalData.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {personalData.title} &bull; University of Agriculture Faisalabad
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <a
              href={`mailto:${personalData.email}`}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {personalData.email}
            </a>

            <span className="text-slate-700">&bull;</span>

            {githubLink && (
              <Magnetic strength={0.3}>
                <a
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="hover:text-white transition-colors flex items-center gap-1.5 p-1"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </Magnetic>
            )}

            <span className="text-slate-700">&bull;</span>

            {linkedinLink && (
              <Magnetic strength={0.3}>
                <a
                  href={linkedinLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="hover:text-white transition-colors flex items-center gap-1.5 p-1"
                >
                  <LinkedInIcon className="h-3.5 w-3.5 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </a>
              </Magnetic>
            )}
          </div>

          {/* Back to top with Magnetic button */}
          <Magnetic strength={0.25}>
            <button
              onClick={scrollToTop}
              type="button"
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white py-2 px-3.5 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/[0.02] hover:bg-purple-500/10 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-purple-400" />
            </button>
          </Magnetic>
        </div>

        {/* Dedicated Pages Navigation Bar */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] text-xs font-mono">
          <span className="text-zinc-500 uppercase tracking-wider text-[10px]">
            Dedicated Portals:
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            {dedicatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-purple-300 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <p>
            BSCS Undergraduate &bull; Saylani Welfare Trust Trainee
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
