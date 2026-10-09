"use client";

import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  Trophy,
  GitFork,
  Menu,
  X,
  Send,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const GITHUB_USERNAME = "Subham-KRLX";
const LINKEDIN_URL = "https://www.linkedin.com/in/subham-sangwan-592a0a316/";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "CP", href: "#cp" },
  { name: "Open Source", href: "#opensource" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const skills = [
  "HTML5", "CSS3", "JavaScript", "ReactJS", "Python", "Node.js",
  "Git", "SQL", "AI & ML", "Bootstrap", "Express.js", "REST API", "DSA", "Open Source"
];

const cpPlatforms = [
  { name: "Codeforces", url: "https://codeforces.com/profile/KRLX", rank: "Active" },
  { name: "CodeChef", url: "https://www.codechef.com/users/krlx", rank: "Active" },
  { name: "LeetCode", url: "https://leetcode.com/u/KRLX2005/", rank: "Active" },
  { name: "GitHub", url: "https://github.com/Subham-KRLX", rank: "Active" },
];

const heroButtons = [
  { name: "Codeforces", url: "https://codeforces.com/profile/KRLX" },
  { name: "CodeChef", url: "https://www.codechef.com/users/krlx" },
  { name: "LeetCode", url: "https://leetcode.com/u/KRLX2005/" },
];

const openSourceProjects = [
  { name: "sedona", repo: "Subham-KRLX/sedona", description: "Cluster computing framework for large-scale geospatial data", language: "Scala" },
  { name: "vscode-cpptools", repo: "Subham-KRLX/vscode-cpptools", description: "C/C++ IntelliSense and debugging extension for VS Code", language: "TypeScript" },
  { name: "site-build", repo: "openseadragon/site-build", description: "Build tooling and documentation for OpenSeadragon", language: "JavaScript" },
  { name: "MIEngine", repo: "Subham-KRLX/MIEngine", description: "Visual Studio MI Debug Engine", language: "C#" },
  { name: "airflow", repo: "Subham-KRLX/airflow", description: "Apache Airflow workflow orchestration platform", language: "Python" },
];

const projects = [
  {
    name: "Evolving-Pointer",
    description: "Advanced data structure and pointer visualization tool",
    tags: ["DSA", "Visualization"],
    url: `https://${GITHUB_USERNAME.toLowerCase()}.github.io/Evolving-Pointer/`,
    github: `https://github.com/${GITHUB_USERNAME}/Evolving-Pointer`,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/02253137-82ae-4624-a930-8d5ded9c6481/Screenshot-2026-01-15-at-7.03.46-PM-resized-1768484044102.webp?width=8000&height=8000&resize=contain"
  },
  {
    name: "Property Valuation Advisor",
    description: "ML valuation with retrieval-grounded investment guidance and PDF reports",
    tags: ["Python", "Random Forest", "RAG"],
    url: "https://property-valuation-agentic-advisor-xvfy6pzq5caq72fmxlzrak.streamlit.app/",
    github: `https://github.com/${GITHUB_USERNAME}/property-valuation-agentic-advisor`,
    image: "/projects/property-valuation-architecture.png",
    imageFit: "contain",
  },
  {
    name: "Porsche-premium-car-experience",
    description: "Premium Porsche car showcase experience",
    tags: ["HTML", "CSS", "JS"],
    url: `https://github.com/${GITHUB_USERNAME}/Porsche-premium-car-experience`,
    github: `https://github.com/${GITHUB_USERNAME}/Porsche-premium-car-experience`,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/02253137-82ae-4624-a930-8d5ded9c6481/Screenshot-2026-01-15-at-7.19.56-PM-resized-1768485064168.webp?width=8000&height=8000&resize=contain"
  },
  {
    name: "Wine-quality-predictor",
    description: "ML-based wine quality prediction app",
    tags: ["Python", "ML"],
    url: "https://wine-quality-predictor-pi.vercel.app/",
    github: `https://github.com/${GITHUB_USERNAME}/Wine-quality-predictor-`,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/02253137-82ae-4624-a930-8d5ded9c6481/Screenshot-2026-01-15-at-7.20.15-PM-resized-1768485064164.webp?width=8000&height=8000&resize=contain"
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Product Manager Intern", "Full-Stack Developer", "Open Source Contributor"];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      [`Hi Subham,`, "", message, "", `From: ${name}`, `Email: ${email}`].join("\n")
    );

    window.location.href = `mailto:subhamsangwan26@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#faf8f5] text-[#1a1a1a] overflow-x-hidden">
      <div className="fixed inset-0 noise pointer-events-none z-50" />

      <nav aria-label="Primary navigation" className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-white"
          >
            SS.
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-sm font-medium text-white hover:opacity-60 transition-opacity"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden text-white"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          id="mobile-navigation"
          className="fixed inset-0 bg-[#1a1a1a] z-30 flex flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold text-white hover:text-[#ff5c00] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}

      <section id="home" className="min-h-screen relative flex flex-col justify-between pt-32 pb-12">
        <div className="absolute top-20 right-12 w-[500px] h-[500px] bg-[#ff5c00] opacity-20 blur-[150px] rounded-full" />
        <div className="absolute bottom-20 left-12 w-[400px] h-[400px] bg-[#1a1a1a] opacity-10 blur-[120px] rounded-full" />

        <div className="flex-1 flex items-center px-6 md:px-12">
          <div className="max-w-[1800px] min-w-0 mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="min-w-0 max-w-full"
            >
              <p className="text-sm font-mono text-[#6b6b6b] mb-4 tracking-widest uppercase">
                Available for opportunities
              </p>
              <h1 className="text-[2.5rem] sm:text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-normal">
                SUBHAM
                <br />
                <span className="text-stroke">SANGWAN</span>
              </h1>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-px bg-[#1a1a1a] w-16" />
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-xl font-medium text-[#ff5c00]"
                >
                  {roles[currentRole]}
                </motion.span>
              </div>

              <div className="mt-12 grid grid-cols-2 sm:flex sm:flex-wrap gap-3 max-w-full">
                {heroButtons.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 sm:px-5 py-2.5 border-2 border-[#1a1a1a] text-center text-sm font-bold uppercase tracking-normal hover:bg-[#1a1a1a] hover:text-white transition-all last:col-span-2 sm:last:col-span-1"
                  >
                    {platform.name}
                  </a>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-[#6b6b6b]">
                <MapPin size={16} />
                <span className="text-sm">Pilani, Rajasthan | Pune, Maharashtra</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square max-w-[500px] ml-auto relative">
                <div className="absolute inset-0 bg-[#ff5c00] animate-blob" />
                <div className="absolute inset-4 bg-[#faf8f5] flex items-center justify-center animate-blob" style={{ animationDelay: "-4s" }}>
                  <span className="text-[180px] font-extrabold text-[#1a1a1a]">S</span>
                </div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center animate-float">
                  <ArrowUpRight className="text-white" size={32} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div style={{ y }} className="px-6 md:px-12">
          <a href="#about" className="inline-flex items-center gap-4 group">
            <span className="text-sm font-mono tracking-wider">SCROLL TO EXPLORE</span>
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      <section className="py-8 border-y border-[#e5e0d8] overflow-hidden">
        <div className="flex animate-marquee">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              {skills.map((skill) => (
                <span key={`${i}-${skill}`} className="px-8 text-4xl md:text-6xl font-bold text-[#1a1a1a]/10 whitespace-nowrap">
                  {skill} <span className="text-[#ff5c00]">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-32 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            <div>
              <span className="text-sm font-mono text-[#ff5c00] tracking-widest">01 — ABOUT</span>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 leading-tight">
                BUILDING
                <br />
                <span className="text-stroke">DIGITAL</span>
                <br />
                EXPERIENCES
              </h2>
            </div>

            <div className="space-y-8">
              <div className="inline-block px-4 py-2 bg-[#1a1a1a] text-white text-sm font-bold">
                B.Tech CSE (AI & ML) @ Newton School of Technology, Pune
              </div>

              <p className="text-xl leading-relaxed text-[#4a4a4a]">
                Passionate web developer, open-source contributor, and competitive programmer.
                From Pilani, Rajasthan. I love creating beautiful, performant web experiences
                and building solutions for real-world problems.
              </p>

              <div className="grid gap-4 pt-6 border-t border-[#e5e0d8]">
                <a href="mailto:subhamsangwan26@gmail.com" className="flex items-center justify-between group py-3 border-b border-[#e5e0d8]">
                  <span className="flex items-center gap-3">
                    <Mail size={18} />
                    subhamsangwan26@gmail.com
                  </span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="tel:+918233373001" className="flex items-center justify-between group py-3 border-b border-[#e5e0d8]">
                  <span className="flex items-center gap-3">
                    <Phone size={18} />
                    +91 82333 73001
                  </span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between group py-3 border-b border-[#e5e0d8] w-full text-left"
                >
                  <span className="flex items-center gap-3">
                    <Github size={18} />
                    View My GitHub
                  </span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="py-32 px-6 md:px-12 bg-[#1a1a1a] text-white">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono text-[#ff5c00] tracking-widest">02 — SKILLS</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 mb-16">
              TECH <span className="text-stroke" style={{ WebkitTextStroke: "2px white" }}>STACK</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, backgroundColor: "#ff5c00" }}
                  className="border border-white/20 p-6 text-center cursor-default transition-all group"
                >
                  <span className="text-3xl font-bold text-white/20 group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm font-medium">{skill}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="cp" className="py-32 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono text-[#ff5c00] tracking-widest">03 — COMPETITIVE PROGRAMMING</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 mb-8">
              1000+ <span className="text-stroke">PROBLEMS</span>
            </h2>
            <p className="text-xl text-[#6b6b6b] mb-16 max-w-2xl">
              Love challenging contests and problem-solving across multiple platforms.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cpPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-[#1a1a1a] p-8 group hover:bg-[#1a1a1a] transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-6">
                    <Trophy size={24} className="text-[#ff5c00]" />
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 text-white transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-white transition-colors">{platform.name}</h3>
                  <p className="text-sm text-[#6b6b6b] mt-2 group-hover:text-white/60 transition-colors">{platform.rank}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="opensource" className="py-32 px-6 md:px-12 bg-[#f0ebe3]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono text-[#ff5c00] tracking-widest">04 — OPEN SOURCE</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 mb-16">
              CONTRIBUTIONS
            </h2>

            <div className="space-y-4">
              {openSourceProjects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href={`https://github.com/${project.repo}`}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b-2 border-[#1a1a1a] py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer hover:pl-4 transition-all w-full text-left"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <GitFork size={18} className="text-[#ff5c00]" />
                      {project.name}
                    </h3>
                    <p className="text-[#6b6b6b] mt-1">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="px-3 py-1 bg-[#1a1a1a] text-white text-xs font-bold">
                      {project.language}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-[#1a1a1a] text-white font-bold uppercase tracking-wider"
            >
              See More on GitHub
              <ExternalLink size={18} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-32 px-6 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-mono text-[#ff5c00] tracking-widest">05 — PROJECTS</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 mb-16">
              SELECTED <span className="text-stroke">WORK</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className={`${project.imageFit === "contain" ? "object-contain p-5 sm:p-8 bg-[#f5f0e3]" : "object-cover"} group-hover:scale-105 transition-transform duration-500`}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[120px] font-extrabold text-white/5">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.name}`}
                      className="absolute top-6 right-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    >
                      <div className="w-12 h-12 bg-[#ff5c00] rounded-full flex items-center justify-center">
                        <ArrowUpRight className="text-white" size={24} />
                      </div>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.name} source code on GitHub`}
                      className="absolute top-6 left-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60"
                    >
                      <Github className="text-white" size={20} />
                    </a>
                  </div>
                  <div className="mt-4">
                    <p className="text-[#6b6b6b]">{project.description}</p>
                    <div className="flex gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 border border-[#e5e0d8] text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 bg-[#1a1a1a] text-white">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <span className="text-sm font-mono text-[#ff5c00] tracking-widest">06 — CONTACT</span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-4 leading-tight">
                  LET&apos;S WORK
                  <br />
                  <span className="text-stroke" style={{ WebkitTextStroke: "2px white" }}>TOGETHER</span>
                </h2>
                <p className="text-xl text-white/60 mt-8 max-w-md">
                  Have a project in mind? Let&apos;s create something amazing together.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="text-sm font-mono text-white/40 mb-2 block">YOUR NAME</label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="John Doe"
                      className="bg-transparent border-white/20 border-2 h-14 text-white placeholder:text-white/30 focus:border-[#ff5c00]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-sm font-mono text-white/40 mb-2 block">YOUR EMAIL</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="john@example.com"
                      className="bg-transparent border-white/20 border-2 h-14 text-white placeholder:text-white/30 focus:border-[#ff5c00]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-mono text-white/40 mb-2 block">YOUR MESSAGE</label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    rows={6}
                    className="bg-transparent border-white/20 border-2 text-white placeholder:text-white/30 focus:border-[#ff5c00] resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#ff5c00] hover:bg-[#e55200] text-white font-bold uppercase tracking-wider"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-12 border-t border-[#e5e0d8]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[#6b6b6b]">
            © {new Date().getFullYear()} Subham Sangwan — Open Source
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, url: `https://github.com/${GITHUB_USERNAME}`, label: "GitHub" },
              { icon: Linkedin, url: LINKEDIN_URL, label: "LinkedIn" },
              { icon: Mail, url: "mailto:subhamsangwan26@gmail.com", label: "Email" },
            ].map(({ icon: Icon, url, label }) => (
              <a
                key={url}
                href={url}
                aria-label={label}
                target={url.startsWith("http") ? "_blank" : undefined}
                rel={url.startsWith("http") ? "noreferrer" : undefined}
                className="w-12 h-12 border-2 border-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
