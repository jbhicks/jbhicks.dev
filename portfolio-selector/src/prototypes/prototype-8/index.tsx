import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronRight, 
  Menu, 
  X, 
  Terminal, 
  Copy, 
  Check,
  Book,
  Cpu,
  FolderGit,
  Mail,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Hash,
  Command,
  Code2
} from 'lucide-react';

// Data
const sections = [
  { id: 'quick-start', label: 'Quick Start', icon: Book },
  { id: 'api-reference', label: 'API Reference', icon: Code2 },
  { id: 'projects', label: 'Projects', icon: FolderGit },
  { id: 'terminal', label: 'Terminal', icon: Terminal },
];

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95, description: 'Hooks, Context, Performance optimization' },
      { name: 'TypeScript', level: 92, description: 'Type safety, generics, advanced patterns' },
      { name: 'Next.js', level: 88, description: 'App Router, SSR, API routes' },
      { name: 'Tailwind CSS', level: 90, description: 'Custom utilities, responsive design' },
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 85, description: 'Express, Fastify, async patterns' },
      { name: 'Python', level: 80, description: 'FastAPI, data processing' },
      { name: 'PostgreSQL', level: 78, description: 'Query optimization, indexing' },
      { name: 'GraphQL', level: 82, description: 'Schema design, resolvers' },
    ]
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', level: 75, description: 'Containerization, multi-stage builds' },
      { name: 'AWS', level: 72, description: 'EC2, S3, Lambda, CloudFormation' },
      { name: 'CI/CD', level: 78, description: 'GitHub Actions, automated testing' },
    ]
  }
];

const projectsData = [
  {
    id: 'ecommerce-platform',
    name: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    features: [
      'Real-time inventory management',
      'Stripe payment integration',
      'Responsive admin dashboard',
      'SEO-optimized product pages'
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    status: 'Production'
  },
  {
    id: 'task-management',
    name: 'Task Management System',
    description: 'Collaborative task manager with real-time updates, kanban boards, and team analytics.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    features: [
      'Real-time collaborative editing',
      'Drag-and-drop kanban boards',
      'Team performance analytics',
      'Slack integration'
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    status: 'Beta'
  },
  {
    id: 'ai-content-generator',
    name: 'AI Content Generator',
    description: 'AI-powered content creation tool with templates, scheduling, and analytics.',
    tech: ['Python', 'FastAPI', 'OpenAI', 'React', 'Tailwind'],
    features: [
      'Multiple content templates',
      'Bulk generation API',
      'Content scheduling',
      'Performance analytics'
    ],
    github: 'https://github.com',
    demo: 'https://demo.com',
    status: 'Development'
  }
];

const commands = [
  { cmd: 'whoami', output: 'Joshua Benjamin Hicks\nSenior Full Stack Developer\n5+ years experience' },
  { cmd: 'cat contact.json', output: `{
  "email": "jbhicks.dev@gmail.com",
  "location": "Remote / GMT-5",
  "availability": "Open to opportunities",
  "response_time": "< 24 hours"
}` },
  { cmd: 'ls skills/', output: 'frontend/\nbackend/\ndevops/\nsoft-skills/' },
  { cmd: 'npm run contact', output: 'Opening contact form...\n✓ Email client ready' },
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/jbhicks', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/jbhicks', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com/jbhicks', icon: Twitter },
];

// Utility Components
const CodeBlock = ({ code, filename }: { code: string; filename?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-[#1e1e1e] border border-gray-700 my-4">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs font-mono">{filename}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-white transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono leading-relaxed">
          <code className="text-gray-300">{code}</code>
        </pre>
      </div>
    </div>
  );
};

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'error' }) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 border-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    error: 'bg-red-100 text-red-800 border-red-200',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Main Component
export default function Prototype8() {
  const [activeSection, setActiveSection] = useState('quick-start');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<{cmd: string; output: string}[]>([
    { cmd: 'welcome', output: 'Documentation-style Portfolio v1.0.0\nType "help" for available commands' }
  ]);

  // Filter content based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery) return sections;
    const query = searchQuery.toLowerCase();
    return sections.filter(s => 
      s.label.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  // Handle terminal commands
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.toLowerCase().trim();
    let output = '';

    switch (cmd) {
      case 'help':
        output = `Available commands:
  whoami          - Display profile information
  cat contact.json - Show contact details
  ls skills/      - List skill categories
  npm run contact - Open contact form
  clear           - Clear terminal`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default: {
        const foundCmd = commands.find(c => c.cmd === cmd);
        if (foundCmd) {
          output = foundCmd.output;
        } else {
          output = `Command not found: ${terminalInput}\nType "help" for available commands`;
        }
      }
    }

    setTerminalHistory(prev => [...prev, { cmd: terminalInput, output }]);
    setTerminalInput('');
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      const scrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, element } = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-blue-600" />
            <span className="font-mono font-bold text-gray-900">docs</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40
          w-64 h-screen bg-gray-50 border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center gap-3 px-6 py-5 border-b border-gray-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Command className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-mono font-bold text-gray-900 text-sm">Joshua Hicks</h1>
                <p className="text-xs text-gray-500">v2.0.0</p>
              </div>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-mono placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3">
              <div className="space-y-1">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Getting Started
                </p>
                {filteredSections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="font-mono">{section.label}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 space-y-1">
                <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  External Links
                </p>
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="font-mono">{link.name}</span>
                      <ExternalLink className="w-3 h-3 ml-auto text-gray-300" />
                    </a>
                  );
                })}
              </div>
            </nav>

            {/* Version Badge */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-mono">Last updated: March 2025</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 pt-14 lg:pt-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Quick Start Section */}
            <section id="quick-start" className="mb-20 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <Book className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-mono font-bold text-gray-900">Quick Start</h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Welcome to my documentation-style portfolio. This site provides a comprehensive 
                overview of my skills, projects, and experience in a format familiar to developers.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-mono font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Installation
                </h3>
                <p className="text-blue-800 mb-4">
                  Get started by exploring my work. Use the sidebar to navigate or try the 
                  terminal section for an interactive experience.
                </p>
                <CodeBlock 
                  filename="terminal"
                  code={`$ git clone https://github.com/jbhicks/portfolio.git
$ cd portfolio
$ npm install
$ npm run dev`}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Cpu className="w-5 h-5 text-purple-600" />
                    <h3 className="font-mono font-semibold text-gray-900">Tech Stack</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    Full-stack development with modern frameworks and best practices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Node.js</Badge>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <FolderGit className="w-5 h-5 text-green-600" />
                    <h3 className="font-mono font-semibold text-gray-900">Projects</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {projectsData.length}+ production-ready applications with real-world impact.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="success">Production</Badge>
                    <Badge variant="warning">Beta</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* API Reference / Skills Section */}
            <section id="api-reference" className="mb-20 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-mono font-bold text-gray-900">API Reference</h2>
              </div>
              
              <p className="text-lg text-gray-600 mb-8">
                Technical skills and competencies organized by category. Each skill includes 
                proficiency level and practical experience.
              </p>

              {skillsData.map((category) => (
                <div key={category.category} className="mb-10">
                  <h3 className="font-mono text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-blue-600">#</span>
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.1 }}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <code className="text-sm font-mono font-semibold text-blue-700">
                              {skill.name}
                            </code>
                            <Badge>{skill.level}%</Badge>
                          </div>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-blue-600 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <p className="text-gray-600 text-sm font-mono">{skill.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-8">
                <h3 className="font-mono text-lg font-semibold text-gray-900 mb-4">Example Usage</h3>
                <CodeBlock
                  filename="developer.ts"
                  code={`import { Developer } from '@jbhicks/core';

const josh = new Developer({
  name: 'Joshua Benjamin Hicks',
  role: 'Senior Full Stack Developer',
  experience: '5+ years',
  specialties: ['React', 'TypeScript', 'Node.js'],
  passions: ['Clean Code', 'Performance', 'Developer Experience']
});

// Initialize project
await josh.buildAmazingThings();

// Collaboration mode
josh.collaborate({
  communication: 'excellent',
  mentorship: true,
  code_reviews: 'thorough'
});`}
                />
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-20 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <FolderGit className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-mono font-bold text-gray-900">Projects</h2>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                Production-ready applications built with attention to detail, performance, and user experience.
              </p>

              <div className="space-y-8">
                {projectsData.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <code className="text-lg font-mono font-bold text-gray-900">{project.name}</code>
                        <Badge variant={
                          project.status === 'Production' ? 'success' :
                          project.status === 'Beta' ? 'warning' : 'default'
                        }>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source
                        </a>
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-mono text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-mono font-semibold text-gray-900 mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(tech => (
                            <code key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                              {tech}
                            </code>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-mono font-semibold text-gray-900 mb-2">Features</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <ChevronRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* Terminal Section */}
            <section id="terminal" className="mb-20 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-blue-600" />
                <h2 className="text-3xl font-mono font-bold text-gray-900">Terminal</h2>
              </div>

              <p className="text-lg text-gray-600 mb-8">
                Interactive command-line interface. Type commands to learn more about my work and experience.
              </p>

              <div className="rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-700 shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-gray-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-4 text-xs font-mono text-gray-400">jbhicks@portfolio:~</span>
                </div>

                {/* Terminal Body */}
                <div className="p-4 h-80 overflow-y-auto font-mono text-sm">
                  <AnimatePresence>
                    {terminalHistory.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-4"
                      >
                        {entry.cmd && (
                          <div className="flex items-center gap-2 text-gray-400 mb-1">
                            <span className="text-green-500">➜</span>
                            <span className="text-blue-400">~</span>
                            <span>{entry.cmd}</span>
                          </div>
                        )}
                        <div className="text-gray-300 whitespace-pre-wrap pl-6">
                          {entry.output}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Input Line */}
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                    <span className="text-green-500">➜</span>
                    <span className="text-blue-400">~</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent text-white outline-none font-mono"
                      placeholder="Type a command..."
                      autoFocus
                    />
                  </form>
                </div>
              </div>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <a
                  href="mailto:jbhicks.dev@gmail.com"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600 font-mono">jbhicks.dev@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/jbhicks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Github className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-gray-900">GitHub</h3>
                    <p className="text-sm text-gray-600 font-mono">github.com/jbhicks</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500 font-mono">
                  © 2025 Joshua Benjamin Hicks. Built with React & Tailwind CSS.
                </p>
                <div className="flex items-center gap-4">
                  {socialLinks.map(link => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        title={link.name}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </footer>
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block w-64 sticky top-0 h-screen overflow-y-auto py-12 px-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              On this page
            </h3>
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    block w-full text-left text-sm py-1 transition-colors
                    ${activeSection === section.id 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Version
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Badge variant="success">Latest</Badge>
                <span className="font-mono">v2.0.0</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
