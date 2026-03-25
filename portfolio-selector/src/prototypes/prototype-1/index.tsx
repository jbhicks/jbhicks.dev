import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ArrowRight,
  Sun,
  Moon,
  ChevronRight,
  Calendar,
  MapPin,
  Code2,
  FileText
} from 'lucide-react';

// Types
interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
}

interface Writing {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
}

// Data
const experiences: Experience[] = [
  {
    id: '1',
    role: 'Senior Frontend Engineer',
    company: 'Vercel',
    period: '2022 — Present',
    location: 'San Francisco, CA',
    description: 'Building the future of web deployment and development workflows.',
    highlights: [
      'Led development of Next.js 13 App Router features',
      'Improved build performance by 40% through optimization',
      'Mentored 4 junior engineers and established code review practices'
    ]
  },
  {
    id: '2',
    role: 'Full Stack Developer',
    company: 'Stripe',
    period: '2019 — 2022',
    location: 'Remote',
    description: 'Developed payment infrastructure and developer tooling.',
    highlights: [
      'Built dashboard analytics used by 100k+ merchants',
      'Reduced API latency by 60% with GraphQL optimizations',
      'Contributed to open-source Stripe CLI tool'
    ]
  },
  {
    id: '3',
    role: 'Software Engineer',
    company: 'Linear',
    period: '2017 — 2019',
    location: 'New York, NY',
    description: 'Early engineer building issue tracking for modern teams.',
    highlights: [
      'Implemented real-time collaboration features',
      'Designed keyboard-first interaction patterns',
      'Shipped 50+ features in first year'
    ]
  },
  {
    id: '4',
    role: 'Frontend Developer',
    company: 'Notion',
    period: '2015 — 2017',
    location: 'San Francisco, CA',
    description: 'Helped build the all-in-one workspace platform.',
    highlights: [
      'Developed core editor components',
      'Implemented drag-and-drop functionality',
      'Optimized bundle size by 30%'
    ]
  }
];

const projects: Project[] = [
  {
    id: '1',
    title: 'Syntax Highlighting Engine',
    description: 'A fast, lightweight syntax highlighter supporting 200+ languages with zero dependencies. Built for performance and tree-shakeability.',
    tags: ['TypeScript', 'Rust', 'WASM'],
    github: '#',
    link: '#'
  },
  {
    id: '2',
    title: 'CLI Documentation Generator',
    description: 'Automatically generates beautiful documentation from code comments. Supports multiple output formats and custom themes.',
    tags: ['Node.js', 'Markdown', 'AST'],
    github: '#',
    link: '#'
  },
  {
    id: '3',
    title: 'State Management Library',
    description: 'Minimal state management for React with first-class TypeScript support. Just 2KB gzipped with a familiar API.',
    tags: ['React', 'TypeScript', 'Performance'],
    github: '#',
    link: '#'
  },
  {
    id: '4',
    title: 'Design System',
    description: 'A comprehensive component library used across 12 products. Focus on accessibility, customization, and developer experience.',
    tags: ['Storybook', 'React', 'CSS'],
    github: '#',
    link: '#'
  }
];

const writings: Writing[] = [
  {
    id: '1',
    title: 'The Art of Minimal APIs',
    excerpt: 'Why constraints breed creativity, and how limiting your API surface can lead to better developer experiences and more maintainable code.',
    date: 'Dec 2023',
    readTime: '8 min read',
    link: '#'
  },
  {
    id: '2',
    title: 'TypeScript Tips for Library Authors',
    excerpt: 'Advanced patterns for building type-safe libraries. From conditional types to template literal types, learn how to leverage the type system.',
    date: 'Oct 2023',
    readTime: '12 min read',
    link: '#'
  },
  {
    id: '3',
    title: 'Building for the Web in 2024',
    excerpt: 'A practical guide to modern web development. Server components, streaming, edge functions, and the new primitives shaping how we build.',
    date: 'Aug 2023',
    readTime: '15 min read',
    link: '#'
  }
];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Components
const Section: React.FC<{ 
  children: React.ReactNode; 
  id: string;
  className?: string;
}> = ({ children, id, className = '' }) => (
  <motion.section
    id={id}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className={`py-24 md:py-32 ${className}`}
  >
    {children}
  </motion.section>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2 
    variants={fadeInUp}
    className="text-xs font-bold tracking-[0.2em] uppercase mb-12 text-[var(--muted)] flex items-center gap-3"
  >
    <span className="w-8 h-px bg-[var(--muted)]" />
    {children}
  </motion.h2>
);

const SocialLink: React.FC<{ 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}> = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all duration-200"
  >
    {icon}
  </a>
);

const NavLink: React.FC<{ 
  href: string; 
  children: React.ReactNode;
  active?: boolean;
}> = ({ href, children, active }) => (
  <a
    href={href}
    className={`block py-1 text-sm transition-colors duration-200 ${
      active 
        ? 'text-[var(--accent)] font-medium' 
        : 'text-[var(--muted)] hover:text-[var(--text)]'
    }`}
  >
    {children}
  </a>
);

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-[var(--accent-bg)] text-[var(--accent)] border border-[var(--accent-border)]">
    {children}
  </span>
);

// Main Component
const SyntaxMinimalistPortfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'writing', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 w-full md:w-[280px] h-auto md:h-screen bg-[var(--bg)] md:border-r border-[var(--border)] z-50">
        <div className="p-6 md:p-8 md:h-full flex flex-row md:flex-col justify-between">
          {/* Logo / Name */}
          <div className="flex-1 md:flex-none">
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="block"
            >
              <h1 className="text-lg font-bold tracking-tight text-[var(--text-h)]">
                Alex Chen
              </h1>
              <p className="text-sm text-[var(--muted)] mt-1">
                Frontend Engineer
              </p>
            </motion.a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:block flex-1 mt-16">
            <ul className="space-y-3">
              {['about', 'experience', 'projects', 'writing', 'contact'].map((section) => (
                <li key={section}>
                  <NavLink 
                    href={`#${section}`} 
                    active={activeSection === section}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="flex items-center gap-2 md:mt-auto">
            <SocialLink href="#" icon={<Github size={18} />} label="GitHub" />
            <SocialLink href="#" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="#" icon={<Linkedin size={18} />} label="LinkedIn" />
            <div className="w-px h-4 bg-[var(--border)] mx-2" />
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-bg)] transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-[280px]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Hero */}
          <Section id="about" className="min-h-[70vh] flex flex-col justify-center pt-32 md:pt-0">
            <motion.div variants={fadeInUp}>
              <p className="text-[var(--accent)] font-medium mb-4">Hello, I'm Alex</p>
            </motion.div>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-h)] leading-[1.1] tracking-tight"
            >
              I build accessible, performant, and delightful web experiences.
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-2xl"
            >
              Currently leading frontend engineering at Vercel, where I focus on making the web 
              faster and more accessible. Previously at Stripe, Linear, and Notion. I believe in 
              the power of simplicity and the importance of developer experience.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-md font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200"
              >
                Get in touch
                <ArrowRight size={16} />
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[var(--border)] rounded-md font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
              >
                View projects
              </a>
            </motion.div>
          </Section>

          {/* Experience */}
          <Section id="experience">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-12">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="md:w-32 flex-shrink-0">
                      <span className="text-sm text-[var(--muted)] font-mono">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--muted)] mt-1 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-[var(--border)]">·</span>
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin size={12} />
                          {exp.location}
                        </span>
                      </p>
                      <p className="mt-3 text-[var(--text)]">
                        {exp.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                            <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-[var(--accent)]" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section id="projects">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                  className="group p-6 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                        <Code2 size={18} className="text-[var(--muted)]" />
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[var(--muted)]">
                        {project.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a 
                          href={project.github}
                          className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.link && (
                        <a 
                          href={project.link}
                          className="p-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                          aria-label="View project"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Writing */}
          <Section id="writing">
            <SectionTitle>Writing</SectionTitle>
            <div className="space-y-6">
              {writings.map((article) => (
                <motion.a
                  key={article.id}
                  href={article.link}
                  variants={fadeInUp}
                  className="group block p-6 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[var(--text-h)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                        <FileText size={18} className="text-[var(--muted)]" />
                        {article.title}
                      </h3>
                      <p className="mt-2 text-[var(--muted)]">
                        {article.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted)]">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {article.date}
                        </span>
                        <span className="text-[var(--border)]">·</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ExternalLink 
                      size={18} 
                      className="text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0" 
                    />
                  </div>
                </motion.a>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" className="pb-32">
            <SectionTitle>Contact</SectionTitle>
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-h)]">
                Let's work together
              </h2>
              <p className="mt-4 text-lg text-[var(--muted)] max-w-xl">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, I'll do my best to get back to you.
              </p>
              <div className="mt-8">
                <a 
                  href="mailto:alex@example.com"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent)] text-white rounded-md font-medium hover:bg-[var(--accent-hover)] transition-colors duration-200"
                >
                  <Mail size={18} />
                  Send me an email
                </a>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-6 text-[var(--muted)]">
                <a href="#" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                  <Twitter size={16} />
                  <span>Twitter</span>
                </a>
                <a href="#" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </Section>

          {/* Footer */}
          <footer className="py-8 border-t border-[var(--border)] text-center md:text-left">
            <p className="text-sm text-[var(--muted)]">
              © {new Date().getFullYear()} Alex Chen. Built with React, TypeScript, and Tailwind CSS.
            </p>
          </footer>
        </div>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg)] border-t border-[var(--border)] z-50">
        <div className="flex justify-around py-3">
          {['about', 'experience', 'projects', 'writing'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`text-xs capitalize ${
                activeSection === section 
                  ? 'text-[var(--accent)] font-medium' 
                  : 'text-[var(--muted)]'
              }`}
            >
              {section}
            </a>
          ))}
        </div>
      </nav>

      {/* CSS Variables */}
      <style>{`
        :root {
          --bg: #fafaf9;
          --text: #44403c;
          --text-h: #1c1917;
          --muted: #78716c;
          --border: #e7e5e4;
          --accent: #ea580c;
          --accent-hover: #c2410c;
          --accent-bg: rgba(234, 88, 12, 0.1);
          --accent-border: rgba(234, 88, 12, 0.3);
          --card-bg: transparent;
          --card-hover: rgba(234, 88, 12, 0.03);
        }

        .dark {
          --bg: #0c0a09;
          --text: #a8a29e;
          --text-h: #f5f5f4;
          --muted: #78716c;
          --border: #292524;
          --accent: #fb923c;
          --accent-hover: #fdba74;
          --accent-bg: rgba(251, 146, 60, 0.1);
          --accent-border: rgba(251, 146, 60, 0.3);
          --card-bg: rgba(255, 255, 255, 0.02);
          --card-hover: rgba(251, 146, 60, 0.05);
        }
      `}</style>
    </div>
  );
};

export default SyntaxMinimalistPortfolio;
