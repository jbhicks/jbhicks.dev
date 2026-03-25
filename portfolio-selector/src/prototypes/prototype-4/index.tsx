import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Database, 
  Cloud,
  GitBranch, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  Command,
  Server,
  Layers,
  Zap,
  FileCode,
  Sparkles
} from 'lucide-react';

interface TypingTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

function TypingText({ text, delay = 0, speed = 50, className = '', onComplete }: TypingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-2 h-5 bg-current ml-1"
      />
    </span>
  );
}

interface MatrixRainProps {
  className?: string;
}

function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|[]{}';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    let animationId: number;
    
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0ff';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((drop, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#f0f' : Math.random() > 0.95 ? '#ff0' : '#0ff';
        ctx.fillText(char, i * fontSize, drop * fontSize);

        if (drop * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.1)] ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-cyan-500/20">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-sm text-cyan-400 font-mono">{title}</span>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

interface SkillBadgeProps {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

function SkillBadge({ name, level, icon, color }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}` }}
      className="relative group"
    >
      <div className="bg-gray-900/80 border border-gray-700 rounded-lg p-4 flex items-center gap-3 transition-all duration-300 group-hover:border-cyan-500/50">
        <div className="text-cyan-400">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300 font-mono text-sm">{name}</span>
            <span className="text-cyan-400 font-mono text-xs">{level}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectCardProps {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  index: number;
}

function ProjectCard({ name, description, tech, github, live, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-black/60 border-l-2 border-cyan-500 pl-6 py-4 hover:border-magenta-500 transition-colors duration-300">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-mono text-sm">${'>'}</span>
            <h3 className="text-white font-mono text-lg group-hover:text-cyan-400 transition-colors">
              {name}
            </h3>
          </div>
          <div className="flex gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-cyan-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-400 font-mono text-sm mb-3 pl-6">{description}</p>
        <div className="flex flex-wrap gap-2 pl-6">
          {tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  company: string;
  description: string;
  index: number;
}

function TimelineItem({ year, title, company, description, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative pl-8 pb-8 border-l-2 border-gray-800 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-black border-2 border-cyan-500 rounded-full"></div>
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-cyan-500/30 transition-colors">
        <span className="text-cyan-400 font-mono text-sm">[{year}]</span>
        <h3 className="text-white font-mono text-lg mt-1">{title}</h3>
        <p className="text-magenta-400 font-mono text-sm mb-2">@ {company}</p>
        <p className="text-gray-400 font-mono text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

function ContactTerminal() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    'Welcome to contact terminal v1.0.0',
    'Type "help" for available commands',
    ''
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newOutput = [...output, `<span class="text-cyan-400">visitor@portfolio:~$</span> ${command}`];
    
    switch (command.toLowerCase()) {
      case 'help':
        newOutput.push(
          'Available commands:',
          '  help     - Show this help message',
          '  email    - Get email address',
          '  github   - Get GitHub profile',
          '  linkedin - Get LinkedIn profile',
          '  clear    - Clear terminal',
          '  contact  - Open contact form'
        );
        break;
      case 'email':
        newOutput.push('dev@example.com');
        break;
      case 'github':
        newOutput.push('github.com/developer');
        break;
      case 'linkedin':
        newOutput.push('linkedin.com/in/developer');
        break;
      case 'clear':
        newOutput.length = 0;
        newOutput.push('Terminal cleared.');
        break;
      case 'contact':
        newOutput.push('Contact form coming soon...');
        break;
      default:
        newOutput.push(`Command not found: ${command}. Type "help" for available commands.`);
    }
    
    newOutput.push('');
    setOutput(newOutput);
    setCommand('');
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [output]);

  return (
    <TerminalWindow title="contact.exe" className="max-w-2xl mx-auto">
      <div ref={scrollRef} className="h-64 overflow-y-auto font-mono text-sm mb-4 space-y-1">
        {output.map((line, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-cyan-400 font-mono text-sm whitespace-nowrap">visitor@portfolio:~$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm focus:ring-0"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </TerminalWindow>
  );
}

export default function Prototype4() {
  const [introComplete, setIntroComplete] = useState(false);

  const skills = [
    { name: 'TypeScript', level: 95, icon: <Code2 className="w-5 h-5" />, color: '#3178c6' },
    { name: 'React', level: 92, icon: <Layers className="w-5 h-5" />, color: '#61dafb' },
    { name: 'Node.js', level: 88, icon: <Server className="w-5 h-5" />, color: '#339933' },
    { name: 'Python', level: 85, icon: <FileCode className="w-5 h-5" />, color: '#3776ab' },
    { name: 'PostgreSQL', level: 82, icon: <Database className="w-5 h-5" />, color: '#336791' },
    { name: 'Docker', level: 78, icon: <Cpu className="w-5 h-5" />, color: '#2496ed' },
    { name: 'AWS', level: 75, icon: <Cloud className="w-5 h-5" />, color: '#ff9900' },
    { name: 'GraphQL', level: 80, icon: <GitBranch className="w-5 h-5" />, color: '#e535ab' },
  ];

  const projects = [
    {
      name: 'nebula-dashboard',
      description: 'Real-time analytics dashboard with WebSocket connections and D3 visualizations',
      tech: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
      github: '#',
      live: '#'
    },
    {
      name: 'quantum-api',
      description: 'High-performance REST API with GraphQL layer, handling 10M+ requests/day',
      tech: ['Node.js', 'GraphQL', 'Redis', 'PostgreSQL'],
      github: '#',
      live: '#'
    },
    {
      name: 'cyber-chat',
      description: 'End-to-end encrypted messaging platform with WebRTC video calls',
      tech: ['React Native', 'WebRTC', 'Socket.io', 'MongoDB'],
      github: '#',
      live: '#'
    },
    {
      name: 'neural-search',
      description: 'AI-powered semantic search engine using vector embeddings',
      tech: ['Python', 'PyTorch', 'Elasticsearch', 'FastAPI'],
      github: '#',
      live: '#'
    }
  ];

  const experience = [
    {
      year: '2022 - Present',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Industries',
      description: 'Leading development of microservices architecture, mentoring junior developers, and implementing CI/CD pipelines.'
    },
    {
      year: '2020 - 2022',
      title: 'Full Stack Developer',
      company: 'Digital Solutions Inc',
      description: 'Built scalable web applications using React and Node.js, reduced API response times by 60%.'
    },
    {
      year: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'Creative Agency',
      description: 'Developed responsive web applications and interactive experiences for Fortune 500 clients.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <MatrixRain />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <Terminal className="w-6 h-6 text-cyan-400" />
                <span className="font-mono text-cyan-400">dev@portfolio</span>
                <span className="text-gray-500">:~$</span>
              </motion.div>
              
              <div className="hidden md:flex items-center gap-6">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-sm font-mono text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <span className="text-cyan-500">./</span>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-400 font-mono text-sm">Available for hire</span>
              </div>
            </motion.div>

            <div className="font-mono text-lg md:text-xl mb-4 text-cyan-400">
              <TypingText 
                text="Hello, World!" 
                delay={500}
                onComplete={() => setIntroComplete(true)}
              />
            </div>

            <AnimatePresence>
              {introComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 bg-clip-text text-transparent">
                      Alex Chen
                    </span>
                  </h1>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-400 font-mono text-lg mb-8">
                    <Code2 className="w-5 h-5" />
                    <span>Full Stack Developer</span>
                    <span className="text-cyan-500">|</span>
                    <span>System Architect</span>
                    <span className="text-cyan-500">|</span>
                    <span>Open Source Contributor</span>
                  </div>

                  <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    Building scalable systems and crafting elegant solutions. 
                    5+ years of experience in full-stack development, 
                    specializing in React, Node.js, and cloud architecture.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <motion.a
                      href="#projects"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-black font-mono font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      <Command className="w-4 h-4" />
                      View Projects
                    </motion.a>
                    
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500 text-cyan-400 font-mono font-semibold rounded-lg hover:bg-cyan-500/10 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Get in Touch
                    </motion.a>
                  </div>

                  <div className="flex justify-center gap-6 mt-12">
                    {[
                      { icon: <Github className="w-6 h-6" />, href: '#', label: 'GitHub' },
                      { icon: <Linkedin className="w-6 h-6" />, href: '#', label: 'LinkedIn' },
                      { icon: <Mail className="w-6 h-6" />, href: '#', label: 'Email' }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        whileHover={{ scale: 1.2, color: '#00ffff' }}
                        className="text-gray-500 hover:text-cyan-400 transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <TerminalWindow title="about.md">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                    <span className="text-cyan-400"># </span>About Me
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    I'm a passionate developer who loves building things that live on the internet. 
                    My journey started when I wrote my first line of code at age 15, and I've been 
                    hooked ever since.
                  </p>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    I specialize in building scalable web applications, from intuitive frontends 
                    to robust backend systems. I'm particularly interested in performance optimization, 
                    clean architecture, and developer experience.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    When I'm not coding, you'll find me contributing to open source, writing technical 
                    blog posts, or exploring new technologies.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-mono">Quick Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Experience: </span>
                        <span className="text-cyan-400">5+ years</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Projects: </span>
                        <span className="text-cyan-400">50+</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Open Source: </span>
                        <span className="text-cyan-400">20+ PRs</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Coffee: </span>
                        <span className="text-cyan-400">∞ cups</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-cyan-400">$ </span>
                  Skills
                </h2>
                <p className="text-gray-400 font-mono">Technologies I work with</p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <SkillBadge key={skill.name} {...skill} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                  <span className="text-magenta-400">$ </span>
                  ls -la projects/
                </h2>
                <p className="text-gray-400 font-mono">Some things I've built</p>
              </motion.div>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <ProjectCard key={project.name} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                  <span className="text-yellow-400">$ </span>
                  cat experience.log
                </h2>
                <p className="text-gray-400 font-mono">My professional journey</p>
              </motion.div>
            </div>

            <div className="relative">
              {experience.map((exp, index) => (
                <TimelineItem key={exp.title} {...exp} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                  <span className="text-cyan-400">$ </span>
                  connect
                </h2>
                <p className="text-gray-400 font-mono">Let's build something together</p>
              </motion.div>
            </div>

            <ContactTerminal />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <span className="font-mono text-gray-400">
                  Alex Chen <span className="text-gray-600">© 2024</span>
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              <a
                href="/"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to Selector
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
