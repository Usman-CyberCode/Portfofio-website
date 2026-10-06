"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData, navItems } from "@/data";

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
    <footer className="border-t border-white/[0.08] bg-[#07070a] relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-md bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-orange-400">
                UT
              </div>
              <span className="text-sm font-semibold text-white">
                {personalData.name}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-1">
              {personalData.title} &bull; University of Agriculture Faisalabad
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
            <a
              href={`mailto:${personalData.email}`}
              className="text-zinc-300 hover:text-white transition-colors"
            >
              {personalData.email}
            </a>

            <span className="text-zinc-600">&bull;</span>

            {githubLink && (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            )}

            <span className="text-zinc-600">&bull;</span>

            {linkedinLink && (
              <a
                href={linkedinLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <LinkedInIcon className="h-3.5 w-3.5 text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white p-2 rounded-lg border border-white/10 hover:border-orange-500/40 bg-white/[0.02] transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-orange-400" />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
          <p>
            &copy; {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <p>
            Pakistan &bull; BSCS 5th Semester
          </p>

        </div>
      </div>
    </footer>
  );
}
