"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Terminal,
  MapPin,
  GraduationCap,
  Award,
  Code2,
  Cpu,
  Brain,
  Rocket,
  Mail,
  Send,
  ArrowRight,
} from "lucide-react";
import { SubpageHeader } from "@/components/subpage/SubpageHeader";
import { Footer } from "@/components/common/Footer";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/magnetic";
import { GithubIcon, LinkedInIcon } from "@/components/ui/Icons";
import { personalData, projectsData } from "@/data";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      title: "Algorithmic Precision in C++",
      description:
        "Building problem-solving stamina through core data structures (arrays, linked lists, trees, graphs) and memory efficiency.",
      icon: Cpu,
    },
    {
      title: "Clean, Semantic Web Standards",
      description:
        "Structuring markup with strict semantic HTML5, accessible ARIA roles, modern CSS layout primitives, and type safety with TypeScript.",
      icon: Code2,
    },
    {
      title: "Predictable State Architecture",
      description:
        "Applying unidirectional data flow principles with Redux Toolkit to prevent state drift in reactive frontend interfaces.",
      icon: Brain,
    },
    {
      title: "Learning by Building Real Projects",
      description:
        "Actively seeking hands-on hackathon codebases, team repositories, and internship tasks to turn theory into production-ready software.",
      icon: Rocket,
    },
  ];

  const githubLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "github"
  );
  const linkedinLink = personalData.socialLinks.find(
    (s) => s.platform.toLowerCase() === "linkedin"
  );

  return (
    <div className="min-h-screen bg-[#050508] text-[#ebe8e5] relative overflow-hidden">
      {/* Background starfield & ambient glow */}
      <CosmicParallaxBg className="opacity-20" />

      <div className="absolute top-1/4 -right-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,transparent_70%)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 w-[600px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none" />

      <SubpageHeader
        badge="Biographical Dossier"
        title="About Muhammad"
        serifAccent="Usman Tahir"
        description="Undergraduate Computer Science student at University of Agriculture Faisalabad, frontend developer, and passionate problem solver in C++ seeking a Web Development Internship."
        currentPath="/about"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 relative z-10">
        {/* Profile Hero Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Portrait & Identity Card */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <GlowCard glowColor="navy" className="p-7 sm:p-8 flex flex-col justify-between h-full bg-[#070c18]/90 border border-white/[0.08]">
              <div>
                {/* Photo frame */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-950/60 bg-[#090812] mb-6">
                  <Image
                    src="/images/profile.webp"
                    alt={`${personalData.name} portrait`}
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover object-top filter grayscale contrast-125 brightness-95"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {personalData.name}
                  </h2>
                  <p className="text-xs font-mono text-purple-300 mb-2">
                    {personalData.title}
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {personalData.statusText}
                  </span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Degree:</span>
                    <span className="text-white font-medium">BS Computer Science</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Semester:</span>
                    <span className="text-purple-300 font-medium">5th Semester (Enrolled)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Academic Standing:</span>
                    <span className="text-emerald-400 font-medium">CGPA 3.4 / 4.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Location:</span>
                    <span className="text-zinc-300 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-purple-400" />
                      {personalData.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social profile links */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-center gap-3">
                {githubLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={githubLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white transition-all"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="h-4 w-4" />
                    </a>
                  </Magnetic>
                )}
                {linkedinLink && (
                  <Magnetic strength={0.25}>
                    <a
                      href={linkedinLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-blue-500/50 hover:bg-blue-500/10 text-zinc-300 hover:text-white transition-all"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedInIcon className="h-4 w-4 text-[#38bdf8]" />
                    </a>
                  </Magnetic>
                )}
                <Magnetic strength={0.25}>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white transition-all"
                    aria-label="Send Email"
                  >
                    <Mail className="h-4 w-4 text-purple-400" />
                  </a>
                </Magnetic>
              </div>
            </GlowCard>
          </motion.div>

          {/* Narrative & Career Objectives */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <GlowCard glowColor="navy" className="p-7 sm:p-8 h-full bg-[#070c18]/90 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-6 pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono uppercase tracking-wider text-purple-400 flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Academic &amp; Professional Background</span>
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">
                    REF: MUT-DOSSIER
                  </span>
                </div>

                {/* Career Objective blockquote */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                    Career Objective:
                  </span>
                  <blockquote className="text-base sm:text-lg text-[#ebe8e5] leading-relaxed font-normal border-l-2 border-purple-500/60 pl-4 py-1.5 italic font-serif bg-purple-500/[0.03] rounded-r-lg">
                    &ldquo;{personalData.careerObjective}&rdquo;
                  </blockquote>
                </div>

                <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
                  <p>
                    I am an undergraduate student in my 5th semester of the Bachelor of Science in Computer Science (BSCS) program at the{" "}
                    <strong className="text-white font-medium">University of Agriculture Faisalabad</strong>. With a cumulative GPA of{" "}
                    <strong className="text-white font-medium">3.4 / 4.0</strong>, I have grounded my understanding in theoretical computer science fundamentals, including Object-Oriented Programming (OOP), Data Structures &amp; Algorithms (DSA), and systematic problem solving in C++.
                  </p>
                  <p>
                    To bridge academic computer science theory with industry frontend engineering, I completed intensive hands-on Web Development Training at{" "}
                    <strong className="text-white font-medium">Saylani Welfare Trust</strong>. This curriculum focused on frontend markup standards, responsive layout systems with CSS Flexbox &amp; Grid, JavaScript (ES6+), component-driven UI architecture, and version control using Git &amp; GitHub.
                  </p>
                  <p>
                    My goal is to secure a Web Development Internship where I can contribute maintainable code, learn best practices from senior engineers, and build software that delivers measurable value to real users.
                  </p>
                </div>
              </div>

              {/* Verified Training & University Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/[0.08]">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5 mb-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    University of Agriculture Faisalabad
                  </span>
                  <p className="text-xs text-zinc-400">
                    BSCS Degree &bull; 5th Semester &bull; CGPA 3.4/4.0
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Award className="h-3.5 w-3.5" />
                    Saylani Welfare Trust
                  </span>
                  <p className="text-xs text-zinc-400">
                    Practical Frontend Web Development Training
                  </p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Engineering Philosophy & Principles */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08]">
            <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How I Approach Problem Solving &amp; Code
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#070c18]/80 border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {p.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed pl-1">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Project Highlights */}
        <div className="mb-20">
          <div className="mb-10 pb-4 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Portfolio Evidence
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Selected Project Highlights
              </h2>
            </div>
            <Link
              href="/work"
              className="text-xs font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>View All 5 Projects</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl bg-[#070c18]/80 border border-white/[0.08] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block mb-1">
                    {proj.tagline || "Project"}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{proj.technologies?.[0]}</span>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#0b1022] to-[#04060d] border border-purple-500/30">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Let&apos;s Build Something Great Together
          </h3>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto mb-6">
            Open for frontend web development internships and collaborative projects. Feel free to connect via email or LinkedIn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.25}>
              <Link href="/#contact">
                <Button
                  variant="default"
                  size="lg"
                  className="gap-2 text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-semibold px-7 py-3 rounded-full cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Get In Touch</span>
                </Button>
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link href="/work">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-xs font-mono border-white/15 hover:border-purple-500/50 hover:bg-purple-500/10 text-zinc-300 hover:text-white px-7 py-3 rounded-full cursor-pointer"
                >
                  <span>Explore All Work</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </Magnetic>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}