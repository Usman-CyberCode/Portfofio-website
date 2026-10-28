"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Loader2,
} from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";
import { fadeInUp, staggerContainer } from "@/animations/motion";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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
    setIsSubmitting(true);

    setTimeout(() => {
      const mailtoUrl = `mailto:${personalData.email}?subject=${encodeURIComponent(
        formData.subject || `Internship Inquiry from ${formData.name || "Portfolio Visitor"}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 450);
  };

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <section id="contact" className="py-26 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background radial sapphire glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.09)_0%,transparent_70%)] blur-3xl rounded-full"
      />

      <SectionHeader
        badgeText="Contact & Opportunities"
        title="Open For Web Development"
        serifAccent="Opportunities"
        titleHighlight="& Internships"
        description="I am actively seeking an internship to contribute to real-world software development and grow within an engineering team."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10"
      >
        {/* Left Column: Direct Communication Card */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <GlowCard glowColor="navy" className="flex flex-col justify-between h-full p-7">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                <Badge variant="status" className="text-[10px]">
                  Available For Hire
                </Badge>
                <span className="text-[10px] font-mono text-slate-400">
                  Direct Channel
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                Let&apos;s Connect
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                If you are looking for a motivated BSCS intern with skills in
                frontend web development and C++ problem solving, please feel free
                to reach out.
              </p>

              {/* Primary Email Card with 1-click Copy & Animated Feedback */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-4 hover:border-blue-500/30 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-blue-300 transition-colors break-all"
                  >
                    {personalData.email}
                  </a>
                  <Magnetic strength={0.3}>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      aria-label="Copy email address"
                      className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-blue-500/15 hover:border-blue-400/40 text-slate-300 hover:text-white transition-all shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </Magnetic>
                </div>
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-[11px] text-emerald-400 font-mono mt-1.5 flex items-center gap-1"
                    >
                      <Check className="h-3 w-3" />
                      <span>Copied email to clipboard!</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6 hover:border-blue-500/30 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Location
                </span>
                <div className="flex items-start gap-2.5 mt-1">
                  <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {personalData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Social Links */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                Professional Network:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {githubLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-xs font-mono group"
                    >
                      <GithubIcon className="h-4 w-4 text-white" />
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                )}
                {linkedinLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={linkedinLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-slate-300 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-xs font-mono group"
                    >
                      <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-slate-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Right Column: Animated Email Composer Form */}
        <motion.div variants={fadeInUp} className="lg:col-span-7">
          <GlowCard glowColor="blue" className="p-7">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Direct Mail Composer
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Launches email client
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-6">
              Enter your message below to dispatch directly to{" "}
              <strong className="text-slate-200 font-mono">{personalData.email}</strong>.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input with active animation */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-mono uppercase tracking-wider text-slate-400"
                    >
                      Your Name
                    </label>
                    {focusedField === "name" && (
                      <span className="text-[10px] font-mono text-blue-400 animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Hiring Team"
                    value={formData.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all font-mono"
                  />
                </div>

                {/* Email Input with active animation */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-mono uppercase tracking-wider text-slate-400"
                    >
                      Your Email
                    </label>
                    {focusedField === "email" && (
                      <span className="text-[10px] font-mono text-blue-400 animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={formData.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] font-mono uppercase tracking-wider text-slate-400"
                  >
                    Subject
                  </label>
                  {focusedField === "subject" && (
                    <span className="text-[10px] font-mono text-blue-400 animate-pulse">
                      Active
                    </span>
                  )}
                </div>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="e.g. Web Development Internship Opportunity"
                  value={formData.subject}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all font-mono"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-mono uppercase tracking-wider text-slate-400"
                  >
                    Message
                  </label>
                  <span className="text-[10px] font-mono text-slate-500">
                    {formData.message.length} chars
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your project, team opportunity, or inquiry..."
                  value={formData.message}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 transition-all resize-none font-mono"
                />
              </div>

              {/* Animated Submit Button */}
              <div className="pt-2">
                <Magnetic strength={0.15} className="w-full">
                  <Button
                    type="submit"
                    size="lg"
                    variant="default"
                    disabled={isSubmitting}
                    className="w-full gap-2 text-xs font-mono justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Dispatching Mail Client...</span>
                      </>
                    ) : formSubmitted ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Message via Email Client</span>
                      </>
                    )}
                  </Button>
                </Magnetic>
              </div>

              {/* Animated Success Banner */}
              <AnimatePresence>
                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center font-mono"
                  >
                    Mail client dispatched! If your client did not launch, please email directly to{" "}
                    <a
                      href={`mailto:${personalData.email}`}
                      className="underline text-white font-medium hover:text-emerald-200"
                    >
                      {personalData.email}
                    </a>.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </GlowCard>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
