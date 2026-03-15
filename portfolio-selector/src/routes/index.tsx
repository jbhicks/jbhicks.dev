import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Github,
  Mail,
  ExternalLink,
  GitCommit,
  Terminal,
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
  tagline: 'Lead Software Engineer & Army Veteran',
  bio: 'Lead Software Engineer with a passion for building robust systems. Army veteran who served from 2004-2009, including a combat deployment to Ramadi, Iraq. Currently focused on full-stack development, AI interfaces, and helping veterans transition into tech careers through nonprofit work.',
  stats: {
    publicRepos: 40,
    followers: 0,
    following: 1,
    stars: 0
  },
  experience: [
    {
      title: 'Lead Software Engineer',
      company: 'Current Role',
      period: 'Present',
      description: 'Leading software engineering initiatives, architecting scalable solutions, and mentoring development teams.'
    },
    {
      title: 'Software Engineer',
      company: 'Previous Experience',
      period: 'Past',
      description: 'Full-stack development, building web applications, APIs, and working with modern JavaScript/Go ecosystems.'
    },
    {
      title: 'U.S. Army Veteran',
      company: 'United States Army',
      period: '2004-2009',
      description: 'Served with honor including combat deployment to Ramadi, Iraq. Developed leadership, discipline, and mission-critical problem-solving skills.'
    }
  ],
  deployedSites: [
    {
      name: 'jbhicks.dev',
      url: 'https://jbhicks.dev',
      description: 'Development Dashboard - Personal portfolio and project showcase',
      status: 'live',
      emoji: '🚀'
    },
    {
      name: 'avrnpo.org',
      url: 'https://avrnpo.org',
      description: 'American Veterans Rebuilding - Nonprofit helping veterans transition to tech and construction careers',
      status: 'live',
      emoji: '🎖️'
    },
    {
      name: 'sound-cistern',
      url: 'https://soundcistern.com',
      description: 'Soundcloud filtering app with robust feed management and visualizations',
      status: 'live',
      emoji: '🎵'
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

// Rain drop component
function RainDrop({ delay }: { delay: number }) {
  const startX = Math.random() * 100;
  
  return (
    <motion.div
      className="absolute w-0.5 h-4 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent rounded-full"
      style={{ left: `${startX}%` }}
      initial={{ 
        y: -20,
        opacity: 0
      }}
      animate={{ 
        y: ['0vh', '100vh'],
        opacity: [0, 0.6, 0]
      }}
      transition={{ 
        duration: 2 + Math.random() * 2,
        delay,
        repeat: Infinity,
        ease: "linear"
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
    <div ref={containerRef} className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-gray-950' : 'bg-slate-50'}`}
      style={{
        background: isDarkMode 
          ? 'linear-gradient(to bottom right, #111827, #1f2937, #374151)'
          : 'linear-gradient(to bottom right, #f1f5f9, #e2e8f0, #cbd5e1)'
      }}
    >
      {/* Abstract artistic background with overlapping elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Large gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] animate-pulse transition-colors duration-1000 ${isDarkMode ? 'bg-gradient-to-br from-purple-600/40 via-blue-600/30 to-cyan-600/40' : 'bg-gradient-to-br from-orange-400/30 via-pink-400/20 to-purple-400/30'}`} style={{ animationDuration: '8s' }} />
          <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse transition-colors duration-1000 ${isDarkMode ? 'bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-600/30' : 'bg-gradient-to-tr from-cyan-400/25 via-blue-400/20 to-indigo-400/25'}`} style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[90px] animate-pulse transition-colors duration-1000 ${isDarkMode ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20' : 'bg-gradient-to-r from-amber-300/20 via-orange-300/15 to-rose-300/20'}`} style={{ animationDuration: '12s', animationDelay: '4s' }} />
        </div>
        
        {/* Floating geometric shapes */}
        <motion.div 
          className={`absolute top-[10%] left-[5%] w-32 h-32 border-2 rounded-2xl transition-colors duration-700 ${isDarkMode ? 'border-purple-500/20' : 'border-orange-400/20'}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        <motion.div 
          className={`absolute top-[20%] right-[8%] w-24 h-24 border transition-colors duration-700 ${isDarkMode ? 'border-cyan-500/15' : 'border-blue-400/15'}`}
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transform: 'rotate(45deg)' }}
        />
        
        <motion.div 
          className={`absolute bottom-[30%] left-[12%] w-40 h-40 rounded-full border-2 transition-colors duration-700 ${isDarkMode ? 'border-indigo-500/10' : 'border-purple-400/10'}`}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Glassmorphism floating cards */}
        <div className={`absolute top-[15%] right-[15%] w-48 h-64 rounded-2xl backdrop-blur-md border transition-all duration-700 ${isDarkMode ? 'bg-gray-900/20 border-gray-700/30' : 'bg-white/30 border-gray-200/50'}`}
          style={{ transform: 'rotate(-6deg) translateZ(-10px)' }}
        >
          <div className={`absolute top-4 left-4 w-20 h-2 rounded transition-colors duration-700 ${isDarkMode ? 'bg-purple-500/30' : 'bg-orange-400/30'}`} />
          <div className={`absolute top-8 left-4 w-32 h-2 rounded transition-colors duration-700 ${isDarkMode ? 'bg-purple-500/20' : 'bg-orange-400/20'}`} />
          <div className={`absolute top-12 left-4 w-24 h-2 rounded transition-colors duration-700 ${isDarkMode ? 'bg-purple-500/10' : 'bg-orange-400/10'}`} />
        </div>
        
        <div className={`absolute bottom-[20%] right-[25%] w-56 h-40 rounded-2xl backdrop-blur-md border transition-all duration-700 ${isDarkMode ? 'bg-gray-900/15 border-gray-700/20' : 'bg-white/25 border-gray-200/40'}`}
          style={{ transform: 'rotate(8deg)' }}
        >
          <div className="absolute inset-4 rounded-xl overflow-hidden">
            <div className={`absolute inset-0 transition-opacity duration-700 ${isDarkMode ? 'opacity-20 bg-gradient-to-br from-cyan-500 to-blue-500' : 'opacity-30 bg-gradient-to-br from-pink-400 to-orange-400'}`} />
          </div>
        </div>
        
        {/* Floating code brackets */}
        <motion.div 
          className={`absolute top-[40%] left-[8%] text-6xl font-mono font-bold transition-colors duration-700 ${isDarkMode ? 'text-cyan-500/10' : 'text-blue-400/15'}`}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {'{'}
        </motion.div>
        
        <motion.div 
          className={`absolute top-[45%] right-[10%] text-6xl font-mono font-bold transition-colors duration-700 ${isDarkMode ? 'text-purple-500/10' : 'text-pink-400/15'}`}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          {'}'}
        </motion.div>
        
        {/* Abstract dots pattern */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, currentColor 1px, transparent 1px),
                             radial-gradient(circle at 80% 20%, currentColor 1px, transparent 1px),
                             radial-gradient(circle at 40% 40%, currentColor 1px, transparent 1px)`,
            backgroundSize: '100px 100px, 150px 150px, 80px 80px'
          }}
        />
        
        {/* Decorative line elements */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDarkMode ? "#a855f7" : "#f97316"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isDarkMode ? "#3b82f6" : "#ec4899"} stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0,200 Q 400,100 800,300 T 1600,200"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M 0,600 Q 500,500 1000,700 T 2000,600"
            fill="none"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>
      
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

      {/* Experience Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Experience
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              My professional journey
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {joshuaData.experience.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className={`relative group p-6 md:p-8 rounded-2xl transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30' 
                    : 'bg-white border border-gray-200 hover:border-blue-500/30 shadow-lg'
                }`}
              >
                {/* Timeline connector */}
                {index !== joshuaData.experience.length - 1 && (
                  <div className={`absolute left-8 top-full w-px h-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
                )}
                
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${
                    index === 0 ? 'bg-cyan-400' : index === 1 ? 'bg-purple-400' : 'bg-orange-400'
                  }`} />
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className={`text-xl md:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {job.title}
                      </h3>
                      <span className={`text-sm font-mono px-3 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-800 text-cyan-400' : 'bg-gray-100 text-blue-600'
                      }`}>
                        {job.period}
                      </span>
                    </div>
                    
                    <p className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {job.company}
                    </p>
                    
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {job.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Sites Dashboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-medium">Live Dashboard</span>
              </div>
            </div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Deployed Sites
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Currently running in production
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {joshuaData.deployedSites.map((site, index) => (
              <motion.a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group relative overflow-hidden rounded-2xl transition-all ${
                  isDarkMode 
                    ? 'bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50' 
                    : 'bg-white border border-gray-200 hover:border-blue-500/50 shadow-lg'
                }`}
              >
                {/* Status indicator line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  site.status === 'live' ? 'bg-green-500' : 
                  site.status === 'development' ? 'bg-yellow-500' : 
                  'bg-gray-500'
                }`} />
                
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500" />
                
                <div className="relative p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{site.emoji}</span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                      site.status === 'live' 
                        ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600')
                        : site.status === 'development'
                        ? (isDarkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600')
                        : (isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600')
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        site.status === 'live' ? 'bg-green-500' : 
                        site.status === 'development' ? 'bg-yellow-500' : 
                        'bg-gray-400'
                      }`} />
                      {site.status === 'live' ? 'Live' : site.status === 'development' ? 'In Dev' : 'Internal'}
                    </div>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {site.name}
                  </h3>
                  
                  <p className={`mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {site.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <ExternalLink className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                    <span className={isDarkMode ? 'text-cyan-400' : 'text-blue-600'}>
                      {site.status === 'live' ? 'Visit Site →' : 'View Project →'}
                    </span>
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-tl-3xl" />
              </motion.a>
            ))}
          </div>
          
          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`mt-12 p-6 rounded-2xl ${isDarkMode ? 'bg-gray-900/30 border border-gray-800' : 'bg-gray-50 border border-gray-200'}`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {joshuaData.deployedSites.filter(s => s.status === 'live').length}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Live Sites</div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {joshuaData.deployedSites.filter(s => s.status === 'development').length}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>In Development</div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  {joshuaData.stats.publicRepos}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Repos</div>
              </div>
              <div>
                <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  99.9%
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Uptime</div>
              </div>
            </div>
          </motion.div>
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
            className={`relative rounded-2xl p-8 overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900/50 border border-gray-800' 
                : 'bg-white border border-gray-200 shadow-xl'
            }`}
          >
            {/* Rain effect inside the card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <RainDrop key={i} delay={i * 0.3} />
              ))}
            </div>
            
            <div className="relative flex justify-center gap-8">
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

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: JoshuaEnhancedHub,
});
