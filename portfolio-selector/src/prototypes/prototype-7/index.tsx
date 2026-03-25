import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Terminal, MousePointer2, Hash, AtSign, Asterisk } from 'lucide-react';

const ASCII_LOGO = `
██████╗ ██████╗ ██╗   ██╗████████╗ █████╗ ██╗     ██╗███████╗████████╗
██╔══██╗██╔══██╗██║   ██║╚══██╔══╝██╔══██╗██║     ██║██╔════╝╚══██╔══╝
██████╔╝██║  ██║██║   ██║   ██║   ███████║██║     ██║███████╗   ██║   
██╔══██╗██║  ██║██║   ██║   ██║   ██╔══██║██║     ██║╚════██║   ██║   
██████╔╝██████╔╝╚██████╔╝   ██║   ██║  ██║███████╗██║███████║   ██║   
╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝╚══════╝   ╚═╝   
`;

const ASCII_DIVIDER = `
══════════════════════════════════════════════════════════════════════════
`;

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-red-600 mix-blend-difference pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-yellow-400 pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: useTransform(cursorXSpring, v => v + 12),
          y: useTransform(cursorYSpring, v => v + 12),
        }}
      />
    </>
  );
};

const GlitchText = ({ text, className = '' }: { text: string; className?: string }) => {
  const [glitchText, setGlitchText] = useState(text);
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const handleMouseEnter = () => {
      let iteration = 0;
      interval = setInterval(() => {
        setGlitchText(
          text
            .split('')
            .map((_, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    };
    
    const element = document.getElementById(`glitch-${text}`);
    element?.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      clearInterval(interval);
      element?.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [text]);

  return (
    <span 
      id={`glitch-${text}`} 
      className={`inline-block cursor-pointer ${className}`}
      onMouseLeave={() => setGlitchText(text)}
    >
      {glitchText}
    </span>
  );
};

const ProjectCard = ({ title, category, year, index }: { title: string; category: string; year: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotations = [-3, 2, -1, 4, -2, 3];
  
  return (
    <motion.div
      className="relative border-4 border-black bg-white p-6 overflow-hidden"
      style={{ 
        rotate: rotations[index % rotations.length],
        marginLeft: index % 2 === 0 ? '0' : '10%',
        marginRight: index % 2 === 0 ? '10%' : '0',
      }}
      whileHover={{ 
        rotate: 0, 
        scale: 1.02,
        zIndex: 10,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-mono text-sm">
        [{String(index + 1).padStart(2, '0')}]
      </div>
      
      <div className="mt-6">
        <div className="font-mono text-xs text-red-600 mb-2 tracking-widest">
          // {category.toUpperCase()}
        </div>
        <h3 className="text-3xl md:text-5xl font-black uppercase leading-none mb-4 break-words" style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}>
          {title}
        </h3>
        <div className="flex justify-between items-center border-t-4 border-black pt-4">
          <span className="font-mono text-sm">YEAR: {year}</span>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            className="bg-black text-white p-2"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>
      </div>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-yellow-400 -z-10"
          style={{ 
            transform: 'translate(8px, 8px)',
          }}
        />
      )}
    </motion.div>
  );
};

const NavLink = ({ href, children, number }: { href: string; children: React.ReactNode; number: string }) => (
  <motion.a
    href={href}
    className="group flex items-center gap-4 py-4 border-b-2 border-black hover:bg-black hover:text-white px-4 -mx-4 transition-colors"
    whileHover={{ x: 20 }}
  >
    <span className="font-mono text-red-600 group-hover:text-yellow-400">{number}</span>
    <span className="text-2xl md:text-4xl font-black uppercase" style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}>
      {children}
    </span>
    <ArrowUpRight className="ml-auto opacity-0 group-hover:opacity-100" size={24} />
  </motion.a>
);

const SkillTag = ({ skill }: { skill: string }) => (
  <motion.span
    className="inline-block border-2 border-black px-4 py-2 font-mono text-sm bg-white hover:bg-black hover:text-white transition-colors cursor-pointer"
    whileHover={{ scale: 1.1, rotate: Math.random() * 6 - 3 }}
  >
    &lt;{skill}/&gt;
  </motion.span>
);

export default function Prototype7() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    { title: 'DISRUPT PLATFORM', category: 'full-stack', year: '2024' },
    { title: 'RAW DATA VIZ', category: 'data visualization', year: '2024' },
    { title: 'BROKEN INTERFACE', category: 'experimental', year: '2023' },
    { title: 'CHAOS ENGINE', category: 'backend', year: '2023' },
    { title: 'NO RULES CMS', category: 'content system', year: '2023' },
  ];

  const skills = ['TypeScript', 'React', 'Node.js', 'WebGL', 'Rust', 'GraphQL', 'WebAssembly', 'PostgreSQL', 'Docker', 'AWS'];

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black overflow-x-hidden" style={{ cursor: 'none' }}>
      <CustomCursor />
      
      {/* Grid overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Mouse position indicator */}
      <div className="fixed bottom-4 left-4 font-mono text-xs z-50 bg-black text-white px-3 py-2 hidden lg:block">
        X: {mousePosition.x.toString().padStart(4, '0')} Y: {mousePosition.y.toString().padStart(4, '0')}
      </div>

      {/* Header */}
      <header className="border-b-4 border-black relative">
        <div className="max-w-full overflow-hidden">
          <pre className="font-mono text-[8px] md:text-xs leading-none text-center py-4 text-black whitespace-pre">
            {ASCII_LOGO}
          </pre>
        </div>
        <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-2 font-mono text-sm font-bold transform rotate-3 border-2 border-black">
          V.2.0.25
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-2">
              <Terminal size={24} className="text-red-600" />
              <span className="font-mono font-bold">DEV://MODE</span>
            </div>
            <div className="flex gap-6 font-mono text-sm">
              <a href="#work" className="hover:text-red-600 hover:underline decoration-4 underline-offset-4">[WORK]</a>
              <a href="#about" className="hover:text-red-600 hover:underline decoration-4 underline-offset-4">[ABOUT]</a>
              <a href="#contact" className="hover:text-red-600 hover:underline decoration-4 underline-offset-4">[CONTACT]</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetric */}
      <section className="relative min-h-[90vh] border-b-4 border-black">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[90vh]">
          {/* Left column - larger */}
          <div className="lg:col-span-7 border-b-4 lg:border-b-0 lg:border-r-4 border-black p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
            >
              <div className="font-mono text-red-600 text-sm mb-4 tracking-widest">
                &gt;&gt;&gt; SYSTEM.INIT(DEVELOPER)
              </div>
              <h1 
                className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] mb-8"
                style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}
              >
                <GlitchText text="BRUTAL" />
                <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '3px black' }}>
                  DEVELOPER
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-mono max-w-lg">
                Breaking conventions. Building chaos. No design rules allowed.
              </p>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-8 right-8 w-32 h-32 border-4 border-black bg-yellow-400 -z-10" />
            <div className="absolute bottom-4 right-4 w-32 h-32 border-4 border-black -z-10" />
          </div>

          {/* Right column - smaller, with stats */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-b-4 border-black">
              <div className="space-y-8">
                <div>
                  <div className="font-mono text-6xl md:text-8xl font-black">07+</div>
                  <div className="font-mono text-red-600">YEARS_OF_CHAOS</div>
                </div>
                <div>
                  <div className="font-mono text-6xl md:text-8xl font-black">50+</div>
                  <div className="font-mono text-red-600">PROJECTS_BROKEN</div>
                </div>
                <div>
                  <div className="font-mono text-6xl md:text-8xl font-black">∞</div>
                  <div className="font-mono text-red-600">RULES_VIOLATED</div>
                </div>
              </div>
            </div>
            
            {/* Contact CTA */}
            <motion.a
              href="#contact"
              className="bg-black text-white p-8 md:p-12 flex items-center justify-between group"
              whileHover={{ backgroundColor: '#dc2626' }}
            >
              <span className="text-2xl md:text-4xl font-black uppercase" style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}>
                Start Project
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowUpRight size={48} />
              </motion.div>
            </motion.a>
          </div>
        </div>

        {/* Overlapping badge */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-1/3 bg-yellow-400 border-4 border-black px-6 py-3 font-mono font-bold text-lg rotate-[-5deg] z-20"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          ⚠️ WARNING: UNCONVENTIONAL CODE
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 md:py-32 border-b-4 border-black relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <div className="font-mono text-red-600 mb-2">// SELECTED_WORK</div>
              <h2 
                className="text-5xl md:text-7xl font-black uppercase"
                style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}
              >
                PROJECTS
              </h2>
            </div>
            <div className="font-mono text-sm max-w-xs">
              Asymmetric layouts. No padding consistency. Purposeful chaos.
            </div>
          </div>

          {/* Projects grid - staggered/asymmetric */}
          <div className="space-y-12 md:space-y-0">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`md:w-4/5 ${index % 2 === 1 ? 'md:ml-auto' : ''}`}
                style={{ marginTop: index > 0 ? '-3rem' : '0' }}
              >
                <ProjectCard {...project} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Side decoration */}
        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white py-4 px-2 font-mono text-xs writing-mode-vertical">
          <span className="writing-mode-vertical" style={{ writingMode: 'vertical-rl' }}>
            SCROLL_TO_EXPLORE
          </span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 border-b-4 border-black bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <pre className="font-mono text-xs leading-none">
            {Array(100).fill('01 ').join('')}
          </pre>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="font-mono text-red-500 mb-2">// ABOUT_ME</div>
              <h2 
                className="text-5xl md:text-7xl font-black uppercase mb-8"
                style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}
              >
                WHO_IS_<br />
                <span className="text-yellow-400">THIS_DEV?</span>
              </h2>
              <div className="space-y-6 font-mono text-lg leading-relaxed">
                <p>
                  I don't follow design systems. I break them intentionally. 
                  Every pixel is a rebellion against the clean, sterile interfaces 
                  that dominate the web.
                </p>
                <p>
                  With 7+ years of experience in creating digital chaos, I specialize 
                  in unconventional user experiences that challenge expectations 
                  and demand attention.
                </p>
                <p className="text-red-500">
                  No frameworks. No templates. Only raw code and aggressive creativity.
                </p>
              </div>
            </div>

            <div>
              <div className="font-mono text-red-500 mb-4">// TECH_STACK</div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>

              <div className="mt-12 border-4 border-white p-6">
                <div className="font-mono text-sm mb-4">// EXPERIENCE_LOG</div>
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>SENIOR CHAOS ENGINEER</span>
                    <span className="text-yellow-400">2022-PRESENT</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>FULL-STACK REBEL</span>
                    <span className="text-yellow-400">2019-2022</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span>CODE DESTROYER</span>
                    <span className="text-yellow-400">2017-2019</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <div className="font-mono text-red-600 mb-2">// INITIATE_CONTACT</div>
              <h2 
                className="text-5xl md:text-7xl font-black uppercase mb-8"
                style={{ fontFamily: 'Arial Black, system-ui, sans-serif' }}
              >
                LET'S_BREAK<br />SOMETHING
              </h2>

              <div className="space-y-6">
                <NavLink href="mailto:hello@brutalist.dev" number="01">
                  EMAIL
                </NavLink>
                <NavLink href="https://github.com" number="02">
                  GITHUB
                </NavLink>
                <NavLink href="https://linkedin.com" number="03">
                  LINKEDIN
                </NavLink>
              </div>
            </div>

            {/* Interactive element */}
            <div className="border-4 border-black p-8 flex flex-col justify-between bg-yellow-400">
              <div>
                <MousePointer2 size={48} className="mb-4" />
                <p className="font-mono text-sm leading-relaxed">
                  Hover over any element to see the chaos in action. 
                  This entire site is an experiment in breaking conventions.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex gap-4">
                  <Asterisk className="animate-spin" size={24} />
                  <AtSign size={24} />
                  <Hash size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="font-mono text-red-500 mb-4">// SYSTEM_STATUS</div>
              <div className="font-mono text-sm">
                ONLINE<br />
                CHAOS_LEVEL: MAXIMUM<br />
                RULES_BROKEN: COUNTLESS
              </div>
            </div>
            <div>
              <div className="font-mono text-red-500 mb-4">// LOCATION</div>
              <div className="font-mono text-sm">
                INTERNET<br />
                LATITUDE: UNKNOWN<br />
                LONGITUDE: CLASSIFIED
              </div>
            </div>
            <div>
              <div className="font-mono text-red-500 mb-4">// TIMEZONE</div>
              <div className="font-mono text-sm">
                ALWAYS CODING<br />
                NEVER SLEEPING<br />
                PERPETUAL CHAOS
              </div>
            </div>
          </div>
          
          <pre className="font-mono text-[6px] md:text-xs leading-none text-center text-white/30 whitespace-pre">
            {ASCII_DIVIDER}
            {'  © 2025 BRUTALIST DEVELOPER - NO RIGHTS RESERVED - STEAL THIS CODE    '}
            {ASCII_DIVIDER}
          </pre>
        </div>
      </footer>
    </div>
  );
}
