import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Github,
  Mail,
  ExternalLink,
  Star,
  GitCommit,
  Terminal,
  Cpu,
  Code2,
  Sparkles,
  Zap,
  Globe,
  MapPin,
  Clock,
  MousePointer2
} from 'lucide-react';

// Joshua's real data
const joshuaData = {
  name: 'Joshua Hicks',
  username: 'jbhicks',
  location: 'Phoenix',
  tagline: 'Building the future, one commit at a time',
  bio: 'Developer, dreamer, and occasional OS tinkerer. I create things that live on the web and sometimes beneath it.',
  stats: {
    publicRepos: 40,
    followers: 0,
    following: 1,
    stars: 0
  },
  featuredRepo: {
    name: 'clai',
    description: 'An AI interface, built for local AI, by AI. AlrAIght?',
    stars: 0,
    language: 'Go'
  },
  projects: [
    {
      name: 'clai',
      description: 'An AI interface, built for local AI, by AI. AlrAIght?',
      stars: 0,
      language: 'Go',
      emoji: '🤖'
    },
    {
      name: 'sound-cistern',
      description: 'A simple app to provide robust filtering of Soundcloud feeds.',
      stars: 0,
      language: 'HTML',
      emoji: '🎵'
    },
    {
      name: 'avrnpo.org',
      description: 'Website project (description TBD)',
      stars: 0,
      language: 'Go',
      emoji: '🌐'
    },
    {
      name: 'media-manager',
      description: 'Media management system',
      stars: 0,
      language: 'Go',
      emoji: '📁'
    },
    {
      name: 'discord-bot',
      description: 'Just messing around with some APIs, seeing what it can do.',
      stars: 0,
      language: 'Go',
      emoji: '💬'
    }
  ],
  skills: [
    { name: 'Go', level: 85, color: 'from-cyan-400 to-blue-500' },
    { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', level: 88, color: 'from-blue-400 to-blue-600' },
    { name: 'React', level: 90, color: 'from-cyan-400 to-cyan-600' },
    { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
    { name: 'Rust', level: 70, color: 'from-orange-400 to-orange-600' },
    { name: 'Systems', level: 60, color: 'from-purple-400 to-purple-600' },
  ]
};

// Particle component for background
function Particle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
      initial={{ 
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        y: [null, Math.random() * -100],
        opacity: [0, 1, 0],
        scale: [0, 1, 0]
      }}
      transition={{ 
        duration: 3 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Animated gradient text
function GradientText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 ${className}`}>
      {children}
    </span>
  );
}

// Animated counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue.toLocaleString()}{suffix}
    </motion.span>
  );
}

// Skill bar with glow effect
function SkillBar({ skill, index }: { skill: typeof joshuaData.skills[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          {skill.name}
        </span>
        <span className="text-sm text-gray-400">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// Avatar with sunglasses toggle
function AvatarSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      
      {/* Avatar container */}
      <div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            background: 'conic-gradient(from 0deg, #22d3ee, #a855f7, #ec4899, #22d3ee)',
            padding: '3px'
          }}
        >
          <div className="w-full h-full rounded-full bg-gray-900" />
        </motion.div>
        
        {/* Face placeholder */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {isDarkMode ? (
              <motion.div
                key="dark"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="text-6xl md:text-7xl">😎</div>
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-cyan-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  DARK MODE
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="text-6xl md:text-7xl">🤓</div>
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-yellow-400 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LIGHT MODE
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${80 + i * 10}px 0px`
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function JoshuaEnhancedHub() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!mounted) return null;
  
  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}
      </div>
      
      {/* Grid background */}
      <div className={`fixed inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-20' : 'opacity-5'}`}
        style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? '#22d3ee' : '#000'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? '#22d3ee' : '#000'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Mouse follower glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
        animate={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Terminal className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
            <span className={`font-mono font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              @jbhicks
            </span>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-blue-600'
                  }`}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            
            {/* Dark mode toggle */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`absolute top-1 w-5 h-5 rounded-full transition-colors duration-300 ${
                  isDarkMode ? 'bg-cyan-400' : 'bg-yellow-400'
                }`}
                animate={{ left: isDarkMode ? '32px' : '4px' }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {isDarkMode ? (
                  <Sparkles className="w-3 h-3 text-gray-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                ) : (
                  <Zap className="w-3 h-3 text-yellow-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className={`text-sm font-mono ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Available for opportunities
                </span>
              </motion.div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Hey, I'm{' '}
                <GradientText>Joshua</GradientText>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-xl md:text-2xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {joshuaData.tagline}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`text-lg mb-8 max-w-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {joshuaData.bio}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Code2 className="w-5 h-5" />
                  View My Work
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.a>
                
                <motion.a
                  href="mailto:josh@jbhicks.dev"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all ${
                    isDarkMode 
                      ? 'border-gray-700 text-gray-300 hover:border-cyan-500 hover:text-cyan-400' 
                      : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </motion.a>
              </motion.div>
              
              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 flex items-center gap-8"
              >
                <div>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <AnimatedCounter value={joshuaData.stats.publicRepos} />
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Repositories</div>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                <div>
                  <div className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <AnimatedCounter value={joshuaData.stats.following} />
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Following</div>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{joshuaData.location}</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right: Avatar */}
            <motion.div
              style={{ y: springY }}
              className="relative"
            >
              <AvatarSection isDarkMode={isDarkMode} />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex flex-col items-center gap-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
          >
            <span className="text-xs font-mono">SCROLL</span>
            <div className={`w-px h-8 ${isDarkMode ? 'bg-gradient-to-b from-cyan-500 to-transparent' : 'bg-gradient-to-b from-blue-500 to-transparent'}`} />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Project Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Project
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              What I'm currently hacking on
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`relative group rounded-2xl overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-xl'
            }`}
          >
            {/* Animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
            
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className={`w-8 h-8 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                    <span className={`font-mono text-sm ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                      {joshuaData.featuredRepo.language}
                    </span>
                  </div>
                  
                  <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {joshuaData.featuredRepo.name}
                  </h3>
                  
                  <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {joshuaData.featuredRepo.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <Star className={`w-4 h-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{joshuaData.featuredRepo.stars}</span>
                    </div>
                  </div>
                  
                  <motion.a
                    href={`https://github.com/jbhicks/${joshuaData.featuredRepo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>
                
                {/* Project visual */}
                <div className="relative">
                  <div className={`aspect-square rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center`}>
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="text-8xl"
                    >
                      🤖
                    </motion.div>
                  </div>
                  
                  {/* Floating code snippet */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`absolute -bottom-4 -right-4 p-4 rounded-lg font-mono text-xs ${
                      isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <code className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>
                      {'>'} go run main.go<br/>
                      🤖 AlrAIght! Starting clai...
                    </code>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* More Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              More Projects
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Other things I've been building
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joshuaData.projects.slice(1).map((project, index) => (
              <motion.a
                key={project.name}
                href={`https://github.com/jbhicks/${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`group relative p-6 rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500/50 shadow-lg'
                }`}
              >
                {/* Animated border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl blur-sm" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{project.emoji}</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      isDarkMode ? 'bg-gray-800 text-cyan-400' : 'bg-gray-100 text-blue-600'
                    }`}>
                      {project.language}
                    </span>
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.name}
                  </h3>
                  
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Github className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>View on GitHub →</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Tech Stack
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Tools and technologies I use to bring ideas to life
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {joshuaData.skills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              GitHub Activity
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              My coding journey visualized
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-8 ${
              isDarkMode 
                ? 'bg-gray-900/50 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-xl'
            }`}
          >
            {/* Contribution graph visualization */}
            <div className="grid grid-cols-52 gap-1 mb-8">
              {[...Array(364)].map((_, i) => {
                const intensity = Math.random();
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.001 }}
                    className={`aspect-square rounded-sm ${
                      intensity > 0.8 ? 'bg-cyan-400' :
                      intensity > 0.6 ? 'bg-cyan-500/70' :
                      intensity > 0.4 ? 'bg-cyan-600/50' :
                      intensity > 0.2 ? 'bg-gray-700' :
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                  />
                );
              })}
            </div>
            
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <GitCommit className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Active</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Contributor</div>
              </div>
              <div className="text-center">
                <Globe className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Open</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Source</div>
              </div>
              <div className="text-center">
                <Clock className={`w-6 h-6 mx-auto mb-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Always</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Learning</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Let's build something{' '}
              <GradientText>amazing</GradientText>
            </h2>
            <p className={`text-xl mb-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind? Want to collaborate? Or just want to say hi?
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.a
                href="https://github.com/jbhicks"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900 border border-gray-800 hover:border-cyan-500/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500/50 shadow-lg'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className={`w-6 h-6 ${isDarkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700'}`}>
                  GitHub
                </span>
              </motion.a>
              
              <motion.a
                href="mailto:josh@jbhicks.dev"
                className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30' 
                    : 'bg-blue-50 border border-blue-200'
                }`}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className={`w-6 h-6 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  Email Me
                </span>
              </motion.a>
            </div>
            
            <motion.div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <MousePointer2 className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Currently in {joshuaData.location}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} Joshua Hicks. Built with React, Tailwind & ☕
          </div>
          
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Made with
            </span>
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ❤️
            </motion.span>
            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              in Phoenix
            </span>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
