"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlowCard } from "@/components/ui/GlowCard";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData } from "@/data";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();
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
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
      {/* Background radial violet glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-[radial-gradient(ellipse,rgba(88,28,135,0.18)_0%,transparent_70%)] blur-3xl rounded-full"
      />

      {/* Editorial Header matching reference screenshot 3 */}
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 40, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14 pb-6 border-b border-white/[0.08]"
      >
        <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Get In Touch
        </span>

        <h2 className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#ebe8e5] tracking-wide mb-4">
          Let&apos;s build something great
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
          Feel free to reach out anytime, I&apos;m always up for new projects, internship opportunities, and a good chat about code.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Column: Direct Communication Card with Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 45, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <GlowCard glowColor="navy" className="flex flex-col justify-between h-full p-7">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available For Work
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Direct Channel
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Connect Directly
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                Looking for a dedicated BSCS intern with expertise in frontend web technologies and C++ problem solving? Send me an inquiry directly.
              </p>

              {/* Primary Email Card with 1-click Copy & Animated Feedback */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-4 hover:border-purple-500/30 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                  Primary Email
                </span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-purple-300 transition-colors break-all"
                  >
                    {personalData.email}
                  </a>
                  <Magnetic strength={0.3}>
                    <button
                      onClick={handleCopyEmail}
                      type="button"
                      aria-label="Copy email address"
                      className="p-2.5 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-purple-500/15 hover:border-purple-400/40 text-zinc-300 hover:text-white transition-all shrink-0 cursor-pointer"
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
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-6 hover:border-purple-500/30 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">
                  Location
                </span>
                <div className="flex items-start gap-2.5 mt-1">
                  <MapPin className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {personalData.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/[0.08]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-3">
                Professional Network:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {githubLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all text-xs font-mono group"
                    >
                      <GithubIcon className="h-4 w-4 text-white" />
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                )}
                {linkedinLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={linkedinLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all text-xs font-mono group"
                    >
                      <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
                      <span>LinkedIn</span>
                      <ArrowUpRight className="h-3.5 w-3.5 ml-auto text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </Magnetic>
                )}
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* Right Column: Animated Email Composer Form with Scroll Reveal */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 45, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <GlowCard glowColor="navy" className="p-7">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Direct Mail Composer
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                Dispatches default client
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6">
              Enter your message below to dispatch directly to{" "}
              <strong className="text-white font-mono">{personalData.email}</strong>.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input with active animation */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400"
                    >
                      Your Name
                    </label>
                    {focusedField === "name" && (
                      <span className="text-[10px] font-mono text-purple-400 animate-pulse">
                        Active
                      </span>
                    )}
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Hiring Manager"
                    value={formData.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all font-mono"
                  />
                </div>

                {/* Email Input with active animation */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400"
                    >
                      Your Email
                    </label>
                    {focusedField === "email" && (
                      <span className="text-[10px] font-mono text-purple-400 animate-pulse">
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400"
                  >
                    Subject
                  </label>
                  {focusedField === "subject" && (
                    <span className="text-[10px] font-mono text-purple-400 animate-pulse">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all font-mono"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400"
                  >
                    Message
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all resize-none font-mono"
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
                    className="w-full gap-2 text-xs font-mono justify-center bg-[#ebe8e5] hover:bg-white text-black font-semibold border-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-black" />
                        <span>Dispatching Mail Client...</span>
                      </>
                    ) : formSubmitted ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5 text-black" />
                        <span>Send Message via Email Client</span>
                      </>
                    )}
                  </Button>
                </Magnetic>
              </div>

              {/* Animated Success Feedback */}
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
      </div>
    </section>
  );
}

export default Contact;
