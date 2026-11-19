import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  ArrowUpRight, 
  Copy, 
  Check 
} from 'lucide-react';
import projects from './data/projects.json';
import credentials from './data/credentials.json';

// High-fidelity custom SVG Brand Icons (Zero-dependency & Clean)
const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

const InstagramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const socialLinks = [
  { name: 'GitHub', handle: '@HuuNguyenTa', url: 'https://github.com/HuuNguyenTa', icon: GithubIcon },
  { name: 'LinkedIn', handle: 'Huu Nguyen', url: 'https://www.linkedin.com/in/huu-nguyen-71747338b/', icon: LinkedinIcon },
  { name: 'Instagram', handle: '@noc_thng', url: 'https://www.instagram.com/noc_thng/', icon: InstagramIcon },
];

export default function App() {
  const [copied, setCopied] = useState(false);
  const [hcmTime, setHcmTime] = useState('');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Top Neon Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Section Scroll Stretch Animation
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Spring physics for silky-smooth stretching
  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0001
  });

  // At scroll = 0, both FRONT and END start at 0px offset (cohesive, not pre-stretched).
  // As user scrolls down, FRONT glides smoothly left, END glides right, dash expands!
  const frontX = useTransform(smoothHeroProgress, [0, 0.65], [0, -110]);
  const endX = useTransform(smoothHeroProgress, [0, 0.65], [0, 110]);
  const dashScaleX = useTransform(smoothHeroProgress, [0, 0.65], [1, 2.8]);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.85], [1, 0.3]);
  const heroScale = useTransform(smoothHeroProgress, [0, 0.85], [1, 0.96]);

  useEffect(() => {
    const updateClock = () => {
      const time = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setHcmTime(time);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tahuunguyen60@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Pure Minimalist Awards & Credentials List (No AI badges or colored boxes!)
  const awardsList = [
    {
      institution: 'ACM Digital Library',
      title: 'ICIIT 2027 International Conference Research Proceedings',
      detail: 'Validity-Constrained Adaptive Beam Search for Robustness Testing of LLM Classifiers (Ei Compendex & Scopus indexed)',
      year: '2027 • Accepted',
      link: credentials.publications?.[0]?.codeUrl,
      linkLabel: 'Code ↗'
    },
    {
      institution: 'FPT University',
      title: 'Honorable Student of Trimester (x3)',
      detail: 'Consistent academic excellence across Summer 2025, Fall 2025, and Summer 2026 trimesters (GPA: 3.2/4.0)',
      year: '2025 — 2026',
      link: null,
      linkLabel: null
    },
    {
      institution: 'HELP University, Malaysia',
      title: 'English for Leaders Programme',
      detail: 'Intensive international leadership, engineering communication & cross-cultural teamwork',
      year: 'Feb 2025',
      link: null,
      linkLabel: null
    },
    {
      institution: 'GoGo & MeoMeo',
      title: 'Community Animal Rescue Campaign',
      detail: '14,833+ views & shelter fundraising support for Team 16 Sài Gòn & Nhà Xanh',
      year: '2026',
      link: 'https://gogomeme.vercel.app/',
      linkLabel: 'Visit ↗'
    },
    {
      institution: 'University of Michigan',
      title: 'UX Research and Design Specialization (6 Courses)',
      detail: 'Visual Design, User Testing, Wireframing, High-Fidelity Prototyping & UX Heuristics',
      year: 'Sep 2026',
      link: 'https://coursera.org/verify/specialization/9I1H5FTGTP82',
      linkLabel: 'Verify ↗'
    },
    {
      institution: 'IBM',
      title: 'Generative AI Fundamentals Specialization (5 Courses)',
      detail: 'Prompt Engineering, LLM Foundations, Model Evaluation & Generative Architecture',
      year: 'Jun 2026',
      link: 'https://coursera.org/verify/specialization/S6P50XUHU68Q',
      linkLabel: 'Verify ↗'
    },
    {
      institution: 'HKUST',
      title: 'Software Engineering Specialization (3 Courses)',
      detail: 'Software design patterns, agile engineering & robust enterprise software architecture',
      year: 'Feb 2026',
      link: 'https://coursera.org/verify/specialization/W8FAYDBMNQUE',
      linkLabel: 'Verify ↗'
    },
    {
      institution: 'Duke University & UCSD',
      title: 'Object-Oriented Programming in Java Specialization (4 Courses)',
      detail: 'Object-Oriented Design, data structures & algorithmic problem solving',
      year: 'Jan 2026',
      link: 'https://coursera.org/verify/specialization/VP29X8UD6NC8',
      linkLabel: 'Verify ↗'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2ee] font-sans selection:bg-[#ff5500] selection:text-black">
      {/* 0. TOP SCROLL PROGRESS LASER BEAM */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#ff5500] z-[100] origin-left shadow-[0_0_12px_#ff5500]"
        style={{ scaleX }}
      />

      {/* 1. TOP NAVIGATION BAR (CLEAN, NO AI DOTS/PILLS) */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
        <div>
          <p className="font-syne font-bold text-sm tracking-wider uppercase">TẠ HỮU NGUYÊN</p>
          <p className="text-neutral-400 font-mono text-[10px] tracking-widest">FRONTEND DEVELOPER</p>
        </div>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs tracking-widest text-neutral-400">
          <span>FOLIO / 2026</span>
          <span>SAIGON, VN • {hcmTime || '14:26:08'}</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#projects"
            className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 py-1"
          >
            Works
          </a>
          <a
            href="#credentials"
            className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors px-2 py-1"
          >
            Awards
          </a>
          <a
            href="#contact"
            className="glass-pill px-5 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-neutral-100 flex items-center gap-1.5"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      {/* 2. HERO SECTION (SCROLL-STRETCH ONLY ON SCROLL) */}
      <section 
        ref={heroRef} 
        className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 md:pb-28 border-b border-white/10 overflow-hidden"
      >
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative select-none"
        >
          {/* Main Kinetic Headline: "FRONT —— END" 
              At scroll = 0, FRONT and END sit together naturally with a normal gap and clean dash.
              When scrolling down, they smoothly pull apart to both sides! */}
          <div className="overflow-hidden flex items-center justify-start gap-4 sm:gap-6 md:gap-8 whitespace-nowrap">
            <motion.div 
              style={{ x: frontX }}
              className="font-display text-[15vw] md:text-[14vw] leading-[0.82] font-black tracking-tight uppercase text-neutral-100"
            >
              FRONT
            </motion.div>

            {/* Middle dash that scales horizontally on scroll */}
            <motion.div 
              style={{ scaleX: dashScaleX }}
              className="origin-left h-[4px] sm:h-[6px] md:h-[8px] w-12 sm:w-20 md:w-32 bg-neutral-600 rounded-full shrink-0"
            />

            <motion.div 
              style={{ x: endX }}
              className="font-display text-[15vw] md:text-[14vw] leading-[0.82] font-black tracking-tight uppercase text-neutral-100"
            >
              END
            </motion.div>
          </div>

          {/* Sub headline: "DEVELOPER" */}
          <div className="overflow-hidden mt-1 md:mt-2 text-right">
            <motion.h1 
              style={{ x: endX }}
              className="font-display text-[15vw] md:text-[14vw] leading-[0.82] font-black tracking-tight uppercase text-[#9e9e9e] hover:text-[#ff5500] transition-colors duration-500 cursor-default"
            >
              DEVELOPER
            </motion.h1>
          </div>
        </motion.div>

        {/* Hero Bio & Status Strip */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-400 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#ff5500] font-bold">(00)</span>
              <span>ABOUT ME — HO CHI MINH CITY</span>
            </div>
            <p className="text-neutral-500 text-[11px] normal-case">
              FPT University Software Engineering • Expected Grad 2027
            </p>
          </div>

          <div className="md:col-span-8 space-y-7">
            <p className="text-xl md:text-3xl font-light leading-snug text-neutral-200">
              I am a developer based in{' '}
              <span className="text-white font-medium underline decoration-white/30 underline-offset-4">Ho Chi Minh City</span>{' '}
              focused on building high-performance, responsive web applications and tactile digital experiences with{' '}
              <span className="text-white font-semibold">React, Node.js, and Modern UI Architecture</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-pill px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-neutral-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#ff5500] transition-colors" />
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-[#ff5500] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}

              <a
                href="#projects"
                className="glass-pill px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest text-[#ff5500] border-[#ff5500]/40 flex items-center gap-2"
              >
                <span>Explore Works ({projects.length})</span>
                <span className="text-xs">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS (ALTERNATING CONTINUOUS MARQUEE + HOVER PAUSE & ORANGE GLOW) */}
      <section 
        id="projects" 
        className="py-20 md:py-28 border-b border-white/10 overflow-hidden"
      >
        <div className="px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-14">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="text-[#ff5500] font-bold">(01)</span>
              <h2>FEATURED PROJECTS ({projects.length})</h2>
            </div>
            <p className="text-neutral-500 text-xs font-mono">
              Hover to pause & inspect • Alternating continuous kinetic ticker
            </p>
          </div>

          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
            Selected Works 2025 — 2026
          </span>
        </div>

        {/* Alternating Continuous Kinetic Project Rows */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredProject === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="project-row group relative py-10 md:py-14 transition-colors duration-500 hover:bg-[#ff5500]/[0.02] overflow-hidden"
              >
                {/* Meta details header line */}
                <div className="px-6 md:px-12 flex flex-wrap items-center justify-between gap-3 text-xs font-mono tracking-widest text-neutral-400 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#ff5500] font-semibold">{project.id}</span>
                    <span>/</span>
                    <span className="uppercase text-neutral-300">{project.category}</span>
                  </div>

                  <div className="flex items-center gap-4 text-neutral-400 uppercase text-[11px]">
                    <span className={project.status === 'LIVE' ? 'text-emerald-400' : 'text-neutral-400'}>
                      {project.status === 'LIVE' ? '● LIVE' : 'IN PROGRESS'}
                    </span>
                    <span className="hidden sm:inline text-neutral-500">
                      {project.tech.slice(0, 3).join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Alternating Continuous Marquee:
                    Even items flow to the LEFT, Odd items flow to the RIGHT!
                    When hovered: Animation pauses, turns vibrant orange, glows neon!
                    When mouse leaves: Resumes moving to both sides! */}
                <div className="w-full overflow-hidden select-none py-2 cursor-pointer">
                  <div className={isEven ? "project-marquee-left" : "project-marquee-right"}>
                    {/* Block 1 */}
                    <div className="flex items-center gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
                      <h3 className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88] transition-all duration-300 ${
                        isHovered 
                          ? 'text-[#ff5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.4)]' 
                          : 'text-neutral-300 group-hover:text-[#ff5500]'
                      }`}>
                        {project.title}
                      </h3>
                      <span className="text-neutral-600 font-display text-4xl sm:text-6xl md:text-7xl select-none">—</span>
                      <span className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase">
                        {project.category}
                      </span>
                      <span className="text-neutral-600 font-display text-4xl sm:text-6xl md:text-7xl select-none">—</span>
                    </div>

                    {/* Block 2 (Seamless loop duplicate) */}
                    <div className="flex items-center gap-8 sm:gap-14 whitespace-nowrap shrink-0 pr-8 sm:pr-14">
                      <h3 className={`font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88] transition-all duration-300 ${
                        isHovered 
                          ? 'text-[#ff5500] drop-shadow-[0_0_40px_rgba(255,85,0,0.4)]' 
                          : 'text-neutral-300 group-hover:text-[#ff5500]'
                      }`}>
                        {project.title}
                      </h3>
                      <span className="text-neutral-600 font-display text-4xl sm:text-6xl md:text-7xl select-none">—</span>
                      <span className="font-mono text-xs sm:text-sm tracking-widest text-neutral-400 uppercase">
                        {project.category}
                      </span>
                      <span className="text-neutral-600 font-display text-4xl sm:text-6xl md:text-7xl select-none">—</span>
                    </div>
                  </div>
                </div>

                {/* Animated Accent Line that expands on hover */}
                <div className="px-6 md:px-12 my-2">
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#ff5500] via-orange-400 to-transparent transition-all duration-700 ease-out"></div>
                </div>

                {/* Project Description, Tech Tags & Glass Action Buttons */}
                <div className="px-6 md:px-12 mt-4 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="max-w-2xl space-y-4">
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-neutral-400">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Glassmorphic Action Buttons */}
                  <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-pill px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest font-semibold text-white flex items-center gap-2 group/btn cursor-pointer"
                      >
                        <span>Visit Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500] transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </a>
                    )}
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-pill px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest text-neutral-300 flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <GithubIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:text-[#ff5500] transition-colors" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. AWARDS X RECOGNITION (STICKY LEFT COLUMN + SCROLL-ANIMATED LIST) */}
      <section id="credentials" className="px-6 md:px-12 py-20 md:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: FIXED / STICKY AS USER SCROLLS (Matches user request) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-10">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff5500] font-semibold block">
                (02) / CREDENTIALS & HONORS
              </span>
              <h2 className="font-syne text-4xl sm:text-5xl font-black uppercase tracking-tight text-neutral-100 leading-[0.95]">
                AWARDS X<br />RECOGNITION
              </h2>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-md">
                Peer-reviewed research published in ACM Digital Library, academic excellence at FPT University, and verified engineering specializations.
              </p>
            </div>

            {/* Editorial Interests & Icebreakers (Directly matches Reference Screenshot 4) */}
            <div className="space-y-8 pt-4 border-t border-white/10 max-w-md">
              {/* Interests */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  INTERESTS
                </span>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Art Direction, Frontend Architecture, Creative Development, Reactive UI Systems, Tailwind CSS v4, AI Robustness Testing, Micro-Interactions, E-Commerce Development.
                </p>
                <a
                  href="https://github.com/HuuNguyenTa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-200 hover:text-[#ff5500] underline underline-offset-8 transition-colors pt-1 cursor-pointer"
                >
                  <span>SEE MY GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
                </a>
              </div>

              {/* Icebreakers */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  ICEBREAKERS
                </span>
                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                  Software Engineering student at FPT University. I listen to Alt & Electronic music while coding tactile interfaces. I also love animal rescue initiatives (helped fundraise for Saigon shelter via GoGoMeme) and exploring modern typography.
                </p>
                <p className="text-xs text-neutral-400 font-mono pt-1">
                  Looking for Frontend / Full-Stack Developer OJT opportunities.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-200 hover:text-[#ff5500] underline underline-offset-8 transition-colors pt-1 cursor-pointer"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#ff5500]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLS FREELY WITH SCROLL-DRIVEN ENTRANCE ANIMATIONS */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {awardsList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 transition-colors duration-300 hover:bg-white/[0.02] px-2"
              >
                <div className="space-y-1.5 max-w-xl">
                  {/* Clean pure text: Institution — Title */}
                  <h3 className="text-base sm:text-lg font-medium text-neutral-200 group-hover:text-[#ff5500] transition-colors duration-300 leading-snug">
                    <span className="font-semibold text-white">{item.institution}</span>
                    <span className="mx-2 text-neutral-500">—</span>
                    <span>{item.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto pt-1 sm:pt-0 font-mono text-xs text-neutral-400">
                  <span>{item.year}</span>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-pill px-3 py-1 rounded-full text-[11px] text-neutral-300 hover:text-[#ff5500] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{item.linkLabel}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. CONTACT FOOTER (MATCHES SCREENSHOT 5) */}
      <footer id="contact" className="relative pt-20 md:pt-28 pb-12 overflow-hidden">
        {/* Top Centered Prompt */}
        <div className="px-6 md:px-12 text-center max-w-2xl mx-auto space-y-2 mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[#ff5500]">
            (03) COLLABORATION & INQUIRIES
          </p>
          <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed">
            Got a question, proposal or project or want to work together on something? Feel free to reach out.
          </p>
        </div>

        {/* Giant Horizontal Marquee Banner */}
        <div className="border-y border-white/10 py-6 md:py-8 my-8 overflow-hidden select-none bg-white/[0.01]">
          <div className="marquee-track flex items-center whitespace-nowrap">
            {[1, 2, 3].map((key) => (
              <div key={key} className="flex items-center text-4xl sm:text-6xl md:text-8xl font-black font-display uppercase tracking-tight text-neutral-400 hover:text-white transition-colors duration-300">
                <span className="mx-6 text-neutral-600">—</span>
                <span className="hover:text-[#ff5500] transition-colors">SAY HELLO</span>
                <span className="mx-6 text-neutral-600">—</span>
                <span>WANNA BE STARTING SOMETHING?</span>
                <span className="mx-6 text-neutral-600">—</span>
                <span className="text-[#ff5500]">OPEN FOR OJT 2026</span>
                <span className="mx-6 text-neutral-600">—</span>
                <span>TẠ HỮU NGUYÊN</span>
              </div>
            ))}
          </div>
        </div>

        {/* Big Interactive Email Link with Click-to-Copy */}
        <div className="px-6 md:px-12 my-12 text-center">
          <button
            onClick={handleCopyEmail}
            className="group inline-flex flex-col items-center justify-center focus:outline-none cursor-pointer"
            title="Click to copy email"
          >
            <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-neutral-100 group-hover:text-[#ff5500] transition-colors duration-300 group-hover:scale-[1.02] transform">
              tahuunguyen60@gmail.com
            </span>
            <div className="mt-4 flex items-center gap-2 glass-pill px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest text-neutral-300 group-hover:border-[#ff5500]/60 group-hover:text-[#ff5500] transition-all">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">✓ Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Click email to copy</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 px-6 md:px-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
          {/* Left: Location & Time */}
          <div className="flex items-center gap-2 text-neutral-300">
            <span>HO CHI MINH CITY, VN</span>
            <span className="text-neutral-600">•</span>
            <span className="text-[#ff5500] font-medium">{hcmTime || '14:26:08'}</span>
          </div>

          {/* Center: Frosted Glass Pill Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="glass-pill px-4 py-1.5 rounded-full text-[11px] text-neutral-300 hover:text-[#ff5500] transition-colors cursor-pointer"
              >
                {social.name}
              </a>
            ))}
            <a
              href="mailto:tahuunguyen60@gmail.com"
              className="glass-pill px-4 py-1.5 rounded-full text-[11px] text-neutral-300 hover:text-[#ff5500] transition-colors cursor-pointer"
            >
              EMAIL
            </a>
          </div>

          {/* Right: Credits */}
          <div className="text-neutral-400 text-center md:text-right text-[11px]">
            Design inspired by Isaac Fayemi • Built by <span className="text-neutral-200">Tạ Hữu Nguyên</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
