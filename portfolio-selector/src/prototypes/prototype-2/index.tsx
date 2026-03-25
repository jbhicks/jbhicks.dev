import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowDown, 
  Sparkles, 
  Terminal, 
  Palette, 
  Code2, 
  Cpu,
  Zap,
  Heart,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ExternalLink,
  Play,
  Gamepad2,
  Eye,
  Ghost,
  Coffee,
  Rocket,
  Music,
  Lightbulb,
  Binary,
  Hash
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  color: string;
}

const colors = ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#3BFFE2', '#FF006E', '#8338EC'];

const kudosList = [
  "Pixel perfectionist", "Bug whisperer", "Code poet", "CSS wizard", 
  "Animation ninja", "TypeScript guru", "UX visionary", "Creative technologist",
  "Full-stack wizard", "Frontend artist", "Interaction designer", "Performance junkie"
];

const projects = [
  {
    id: 1,
    title: "Neon Dreams",
    category: "WebGL Experience",
    description: "Interactive 3D audio-reactive visualization",
    color: "#FF6B35",
    tags: ["Three.js", "WebGL", "GLSL"],
    live: true
  },
  {
    id: 2,
    title: "Quantum Editor",
    category: "Developer Tool",
    description: "Real-time collaborative code editor with AI assistance",
    color: "#8338EC",
    tags: ["React", "WebSockets", "AI"],
    live: true
  },
  {
    id: 3,
    title: "Kinetic Type",
    category: "Typography Experiment",
    description: "Variable font playground with physics simulation",
    color: "#06FFA5",
    tags: ["Typography", "Canvas", "Physics"],
    live: true
  },
  {
    id: 4,
    title: "Data Flows",
    category: "Visualization",
    description: "Animated data storytelling platform",
    color: "#FFD23F",
    tags: ["D3.js", "SVG", "Animation"],
    live: true
  },
  {
    id: 5,
    title: "Synth City",
    category: "Audio Experiment",
    description: "Browser-based synthesizer and sequencer",
    color: "#FF006E",
    tags: ["Web Audio API", "Canvas", "Music"],
    live: false
  },
  {
    id: 6,
    title: "Generative Garden",
    category: "Generative Art",
    description: "Procedurally generated botanical illustrations",
    color: "#3BFFE2",
    tags: ["Canvas", "Algorithms", "Art"],
    live: true
  }
];

const skills = [
  { name: "React/Next.js", level: 95, icon: Code2 },
  { name: "TypeScript", level: 92, icon: Terminal },
  { name: "Animation & Motion", level: 88, icon: Sparkles },
  { name: "Creative Development", level: 85, icon: Palette },
  { name: "Performance", level: 82, icon: Zap },
  { name: "WebGL/Three.js", level: 78, icon: Cpu }
];

const experiments = [
  { name: "ASCII Camera", desc: "Real-time video to ASCII art", icon: Binary },
  { name: "Emoji Physics", desc: "Physics sandbox with emoji particles", icon: Heart },
  { name: "Synth Wave", desc: "Procedural audio generator", icon: Music },
  { name: "Code Rain", desc: "Matrix-style animation", icon: Terminal },
  { name: "Hash Visualizer", desc: "Beautiful hash representations", icon: Hash },
  { name: "Light Grid", desc: "Interactive lighting simulation", icon: Lightbulb }
];

export default function CreativeDeveloperShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const [, setKonami] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggType, setEasterEggType] = useState<'konami' | 'secret-click' | 'matrix' | null>(null);
  const [kudoIndex, setKudoIndex] = useState(0);
  const [, setClickCount] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    
    const animate = () => {
      ctx.fillStyle = 'rgba(11, 11, 11, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.size *= 0.98;
        
        if (p.life <= 0) return false;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        return true;
      });
      
      // Create particles from mouse
      if (Math.random() < 0.4) {
        particlesRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * 30,
          y: mouseRef.current.y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 1,
          size: Math.random() * 4 + 2,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Konami code easter egg
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newKonami = [...prev, e.key].slice(-10);
        if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
          setEasterEggType('konami');
          setShowEasterEgg(true);
          setTimeout(() => setShowEasterEgg(false), 5000);
        }
        return newKonami;
      });
      
      // Secret key combo for matrix mode
      if (e.key === 'm' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        setShowMatrix(true);
        setTimeout(() => setShowMatrix(false), 8000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Secret click counter
  const handleSecretClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setEasterEggType('secret-click');
        setShowEasterEgg(true);
        setTimeout(() => {
          setShowEasterEgg(false);
          return 0;
        }, 4000);
        return 0;
      }
      return newCount;
    });
  };

  // Rotate kudos
  useEffect(() => {
    const interval = setInterval(() => {
      setKudoIndex(prev => (prev + 1) % kudosList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.gsap-reveal').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#0b0b0b] text-white overflow-x-hidden font-sans selection:bg-[#FF6B35] selection:text-white"
      onMouseMove={handleMouseMove}
    >
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* Matrix Rain Overlay */}
      <AnimatePresence>
        {showMatrix && <MatrixRain onComplete={() => setShowMatrix(false)} />}
      </AnimatePresence>

      {/* Easter Egg Overlay */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#8338EC] p-8 rounded-3xl shadow-2xl text-center max-w-md mx-4">
              {easterEggType === 'konami' && (
                <>
                  <div className="text-6xl mb-4">🎮</div>
                  <h2 className="text-3xl font-bold mb-2">Konami Code!</h2>
                  <p className="text-white/80">You found the secret code! +30 lives... metaphorically speaking.</p>
                </>
              )}
              {easterEggType === 'secret-click' && (
                <>
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-3xl font-bold mb-2">Curious Explorer!</h2>
                  <p className="text-white/80">Clicking the logo 5 times? Now you're just showing off!</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 mix-blend-difference"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button 
            onClick={handleSecretClick}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl font-bold tracking-tighter cursor-pointer"
          >
            <span className="text-[#FF6B35]">&lt;</span>
            <span className="text-white">creative</span>
            <span className="text-[#06FFA5]">/</span>
            <span className="text-white">dev</span>
            <span className="text-[#8338EC]">&gt;</span>
          </motion.button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#about" className="hover:text-[#FF6B35] transition-colors">ABOUT</a>
            <a href="#projects" className="hover:text-[#06FFA5] transition-colors">PROJECTS</a>
            <a href="#playground" className="hover:text-[#FFD23F] transition-colors">PLAYGROUND</a>
            <a href="#contact" className="hover:text-[#8338EC] transition-colors">CONTACT</a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b0b]/50 to-[#0b0b0b]" />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full border border-white/20 text-sm font-medium text-white/60 tracking-wider">
              CREATIVE DEVELOPER PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6"
          >
            <span className="block">CODE</span>
            <span className="block bg-gradient-to-r from-[#FF6B35] via-[#FFD23F] to-[#06FFA5] bg-clip-text text-transparent">
              MEETS
            </span>
            <span className="block">CREATIVITY</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-white/60 mb-8 h-8"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={kudoIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {kudosList[kudoIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FFD23F] opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="#playground"
              className="px-8 py-4 border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              Enter Playground
            </a>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 text-[#FF6B35]/30"
        >
          <Code2 className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-10 text-[#06FFA5]/30"
        >
          <Palette className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 text-[#8338EC]/20"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div 
              animate={{ opacity: [1, 0, 1], y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="gsap-reveal">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                Crafting digital
                <span className="text-[#FF6B35]"> experiences </span>
                that matter
              </h2>
              <p className="text-xl text-white/60 mb-6 leading-relaxed">
                I'm a creative developer who bridges the gap between design and engineering. 
                I build immersive web experiences that push the boundaries of what's possible in the browser.
              </p>
              <p className="text-lg text-white/40 mb-8">
                From real-time 3D graphics to buttery-smooth animations, I obsess over every pixel 
                and every millisecond of performance. When I'm not coding, you'll find me 
                experimenting with generative art or contributing to open-source.
              </p>
              <div className="flex gap-4">
                <a href="#contact" className="text-[#06FFA5] hover:underline flex items-center gap-2">
                  Let's collaborate <Rocket className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="gsap-reveal relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Animated background shapes */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-dashed border-[#FF6B35]/30 rounded-3xl"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 border-2 border-dashed border-[#06FFA5]/30 rounded-2xl"
                />
                
                {/* Center content */}
                <div className="absolute inset-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👨‍💻</div>
                    <div className="text-2xl font-bold">Developer</div>
                    <div className="text-white/50">×</div>
                    <div className="text-2xl font-bold text-[#FFD23F]">Artist</div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-[#FF6B35] text-black px-4 py-2 rounded-full font-bold text-sm"
                >
                  10+ Years
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-[#06FFA5] text-black px-4 py-2 rounded-full font-bold text-sm"
                >
                  100+ Projects
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-32 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Skills & Expertise</h2>
            <p className="text-xl text-white/60">Technologies I wield to bring ideas to life</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF6B35]/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35]/20 to-[#8338EC]/20 flex items-center justify-center group-hover:from-[#FF6B35]/40 group-hover:to-[#8338EC]/40 transition-colors">
                    <skill.icon className="w-6 h-6 text-[#FFD23F]" />
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FF6B35] to-[#FFD23F] rounded-full"
                  />
                </div>
                <div className="mt-2 text-right text-sm text-white/50">{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gsap-reveal">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Featured Projects</h2>
              <p className="text-xl text-white/60">Selected works that showcase creativity & craft</p>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              View all on GitHub
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative gsap-reveal"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-colors">
                  {/* Project preview placeholder with animated gradient */}
                  <div 
                    className="absolute inset-0 opacity-50"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${project.color}40, transparent 60%)`
                    }}
                  />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        `radial-gradient(circle at 20% 20%, ${project.color}30, transparent 50%)`,
                        `radial-gradient(circle at 80% 80%, ${project.color}30, transparent 50%)`,
                        `radial-gradient(circle at 20% 20%, ${project.color}30, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <span className="text-xs font-bold tracking-wider text-white/60 mb-2">
                      {project.category.toUpperCase()}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs rounded-full bg-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.live && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-[#FF6B35] transition-colors">
                          <Eye className="w-4 h-4" />
                          Live Demo
                        </button>
                      )}
                      <button className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full text-sm hover:bg-white/10 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>

                  {/* Hover effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}20 0%, transparent 50%)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Playground Section */}
      <section id="playground" className="py-32 px-6 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 gsap-reveal">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-[#FFD23F]">Playground</span>
            </h2>
            <p className="text-xl text-white/60">Experimental projects and creative coding</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD23F]/50 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <exp.icon className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD23F]/20 flex items-center justify-center mb-4 group-hover:bg-[#FFD23F]/30 transition-colors">
                    <exp.icon className="w-6 h-6 text-[#FFD23F]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exp.name}</h3>
                  <p className="text-white/50 text-sm">{exp.desc}</p>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ x: 3 }}
                >
                  <Play className="w-5 h-5 text-[#FFD23F]" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Secret hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/30 text-sm">
              <span className="inline-flex items-center gap-2">
                <Ghost className="w-4 h-4" />
                Hint: Try the Konami code (↑↑↓↓←→←→BA) or Ctrl+Shift+M
                <Ghost className="w-4 h-4" />
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center gsap-reveal">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-8xl">👋</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Let's create
            <span className="block bg-gradient-to-r from-[#FF6B35] via-[#FFD23F] to-[#06FFA5] bg-clip-text text-transparent">
              something amazing
            </span>
          </h2>
          
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Or just want to say hi? 
            I'm always excited to talk about creative ideas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a 
              href="mailto:hello@creative.dev"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-[#FF6B35] transition-colors"
            >
              <Mail className="w-5 h-5" />
              hello@creative.dev
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
              { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              { icon: Coffee, href: '#', label: 'Buy me a coffee' }
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-[#FF6B35] transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B35]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#06FFA5]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#8338EC]/5 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Creative Developer. Built with React, Framer Motion & lots of ☕
          </p>
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-[#FF6B35] fill-current" />
            </motion.span>
            <span>and curiosity</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Matrix Rain Component
function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const drops: number[] = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }
    
    let animationId: number;
    let frameCount = 0;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      frameCount++;
      if (frameCount < 480) {
        animationId = requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);
  
  return (
    <motion.canvas
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={canvasRef}
      className="fixed inset-0 z-50"
    />
  );
}
