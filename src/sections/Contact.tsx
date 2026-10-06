"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(
      formData.subject || `Internship Inquiry from ${formData.name || "Portfolio Visitor"}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      <SectionHeader
        badgeText="Contact & Opportunities"
        title="Open For Web Development"
        titleHighlight="Internships & Projects"
        description="I am actively seeking an internship to contribute to real-world software development and grow within an engineering team."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left Column: Direct Communication Card */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div className="developer-panel rounded-2xl p-7 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                <Badge variant="status" className="text-[10px]">
                  Available For Hire
                </Badge>
                <span className="text-[10px] font-mono text-zinc-400">
                  Direct Channel
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Let&apos;s Connect
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                If you are looking for a motivated BSCS intern with skills in
                frontend web development and C++ problem solving, please feel free
                to reach out.
              </p>

              {/* Primary Email Card with 1-click Copy */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-orange-400 transition-colors break-all"
                  >
                    {personalData.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    type="button"
                    aria-label="Copy email address"
                    className="p-2 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 text-zinc-300 hover:text-white transition-all shrink-0 cursor-pointer"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] text-emerald-400 font-mono mt-1.5 block">
                    &bull; Copied to clipboard!
                  </span>
                )}
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Location
                </span>
                <div className="flex items-start gap-2.5 mt-1">
                  <MapPin className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {personalData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Social Links */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                Professional Network:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {githubLink && (
                  <a
                    href={githubLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all text-xs font-mono group"
                  >
                    <GithubIcon className="h-4 w-4 text-white" />
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3 ml-auto text-zinc-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {linkedinLink && (
                  <a
                    href={linkedinLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all text-xs font-mono group"
                  >
                    <LinkedInIcon className="h-4 w-4 text-[#0a66c2]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="h-3 w-3 ml-auto text-zinc-400 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Direct Email Composer Form */}
        <motion.div variants={fadeInUp} className="lg:col-span-7">
          <div className="developer-panel rounded-2xl p-7">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-orange-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Direct Mail Composer
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Opens mail client
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6">
              Enter your inquiry below to launch your default email client pre-addressed to{" "}
              <strong className="text-zinc-200 font-mono">{personalData.email}</strong>.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Hiring Manager"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="e.g. Web Development Internship Opportunity"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your team, role, or message..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none font-mono"
                />
              </div>

              <div className="pt-1">
                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="w-full gap-2 text-xs font-mono justify-center shadow-md shadow-orange-500/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message via Email Client</span>
                </Button>
              </div>

              {formSubmitted && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-mono">
                  Mail client launched! If it did not trigger, please send directly to{" "}
                  <a
                    href={`mailto:${personalData.email}`}
                    className="underline text-white font-medium"
                  >
                    {personalData.email}
                  </a>.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
