/** @jsxImportSource react */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowRight, Github, ExternalLink, Mail, 
  MapPin, Code, Layers, Sparkles, ChevronDown
} from 'lucide-react';

// Types
interface Project {
  id: string;
  title: string;
  category: 'web' | 'mobile' | 'opensource';
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  role: string;
  year: string;
  duration: string;
  client: string;
  challenge: string;
  solution: string;
  results: string[];
  githubUrl?: string;
  liveUrl?: string;
  gallery: string[];
}

// Project Data
const projects: Project[] = [
  {
    id: 'aurora-finance',
    title: 'Aurora Finance',
    category: 'web',
    description: 'Modern banking dashboard with real-time analytics',
    fullDescription: 'A comprehensive financial dashboard that reimagines how users interact with their banking data. Features real-time analytics, predictive insights, and a seamless mobile experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL'],
    role: 'Lead Frontend Developer',
    year: '2024',
    duration: '8 months',
    client: 'Aurora Financial',
    challenge: 'Financial dashboards are often cluttered and overwhelming. The challenge was to present complex data in an intuitive, digestible format while maintaining real-time performance.',
    solution: 'Developed a modular component architecture with virtualized lists and incremental data loading. Implemented custom D3.js visualizations with smooth transitions and responsive design patterns.',
    results: [
      '40% increase in user engagement',
      '25% reduction in support tickets',
      'Featured in Product Hunt daily top 10',
      'Processing $2M+ daily transactions'
    ],
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'velvet-design',
    title: 'Velvet Design System',
    category: 'opensource',
    description: 'Comprehensive React component library',
    fullDescription: 'An open-source design system powering products used by millions. Built with accessibility and customization at its core, Velvet provides a solid foundation for rapid product development.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS', 'Radix UI'],
    role: 'Creator & Maintainer',
    year: '2023',
    duration: 'Ongoing',
    client: 'Open Source Community',
    challenge: 'Design systems often become bloated and difficult to customize. We needed a solution that balanced comprehensive features with flexibility.',
    solution: 'Created a modular architecture with tree-shakeable exports and extensive customization hooks. Prioritized accessibility with full WCAG 2.1 AA compliance and keyboard navigation.',
    results: [
      '15,000+ GitHub stars',
      'Used by 200+ companies',
      '500+ weekly npm downloads',
      'Featured in React ecosystem guides'
    ],
    githubUrl: '#',
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'nomad-travel',
    title: 'Nomad Travel',
    category: 'mobile',
    description: 'AI-powered travel planning application',
    fullDescription: 'A mobile-first travel companion that uses AI to create personalized itineraries. From flight booking to restaurant recommendations, Nomad makes travel planning effortless.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
    technologies: ['React Native', 'Expo', 'OpenAI API', 'Firebase', 'Stripe'],
    role: 'Full Stack Developer',
    year: '2024',
    duration: '6 months',
    client: 'Nomad Labs',
    challenge: 'Travel planning involves juggling multiple apps and websites. Users needed a unified experience that could handle everything from inspiration to booking.',
    solution: 'Built a cross-platform mobile app with AI integration for personalized recommendations. Implemented offline-first architecture for travelers in areas with poor connectivity.',
    results: [
      '50,000+ app downloads',
      '4.8 star App Store rating',
      '$500K seed funding secured',
      'Featured in TechCrunch'
    ],
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'echo-music',
    title: 'Echo Music Platform',
    category: 'web',
    description: 'Immersive audio streaming experience',
    fullDescription: 'A music streaming platform focused on discovery and community. Features spatial audio, collaborative playlists, and artist-to-fan direct messaging.',
    image: 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=1200&h=800&fit=crop',
    technologies: ['Next.js', 'Web Audio API', 'WebSocket', 'Redis', 'AWS'],
    role: 'Senior Frontend Engineer',
    year: '2023',
    duration: '10 months',
    client: 'Echo Audio Inc.',
    challenge: 'Creating a music experience that stands out in a saturated market required innovative features while maintaining performance and accessibility.',
    solution: 'Implemented advanced Web Audio API features for spatial audio and real-time visualizations. Built a custom player with gapless playback and crossfade capabilities.',
    results: [
      '100K+ active monthly users',
      '2M+ tracks streamed',
      '30% higher engagement than competitors',
      'Partnership with 50+ indie labels'
    ],
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'canvas-studio',
    title: 'Canvas Studio',
    category: 'opensource',
    description: 'Browser-based creative coding environment',
    fullDescription: 'An open-source platform for creative coding and generative art. Combines a powerful code editor with real-time visual output, making creative programming accessible to everyone.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&h=800&fit=crop',
    technologies: ['TypeScript', 'WebGL', 'WebAssembly', 'Monaco Editor', 'P2P Networking'],
    role: 'Core Contributor',
    year: '2023',
    duration: 'Ongoing',
    client: 'Open Source',
    challenge: 'Creative coding tools are often desktop-only and have steep learning curves. We wanted to make generative art accessible in the browser.',
    solution: 'Created a lightweight WebGL-based rendering engine with hot-reload capabilities. Built a collaborative workspace using WebRTC for real-time pair programming.',
    results: [
      '8,000+ GitHub stars',
      'Featured on Hacker News',
      'Used in 50+ universities',
      'Monthly creative coding challenges'
    ],
    githubUrl: '#',
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'pulse-health',
    title: 'Pulse Health',
    category: 'mobile',
    description: 'Mental wellness and meditation app',
    fullDescription: 'A holistic wellness platform combining guided meditation, mood tracking, and AI-powered insights. Designed to make mental health care accessible and stigma-free.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&h=800&fit=crop',
    technologies: ['Flutter', 'TensorFlow Lite', 'HealthKit', 'Firebase', 'Stripe'],
    role: 'Tech Lead',
    year: '2024',
    duration: '7 months',
    client: 'Pulse Wellness',
    challenge: 'Mental health apps often feel clinical and impersonal. The goal was to create something warm, engaging, and scientifically backed.',
    solution: 'Developed a native-feeling cross-platform app with biometric integration. Implemented ML models for personalized content recommendations based on usage patterns.',
    results: [
      '75,000+ downloads in first month',
      '4.9 star rating on both platforms',
      '85% daily active user retention',
      'Partnership with 3 major health providers'
    ],
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'vertex-commerce',
    title: 'Vertex Commerce',
    category: 'web',
    description: 'Headless e-commerce platform',
    fullDescription: 'A modern, API-first e-commerce solution built for scale. Handles millions of products with sub-second response times and enterprise-grade security.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
    technologies: ['Next.js', 'GraphQL', 'Prisma', 'Redis', 'Kubernetes'],
    role: 'Principal Engineer',
    year: '2023',
    duration: '12 months',
    client: 'Vertex Retail',
    challenge: 'Legacy e-commerce platforms struggle with performance at scale. Needed a solution that could handle flash sales and complex inventory management.',
    solution: 'Architected a microservices-based platform with edge caching and real-time inventory sync. Built a flexible theming system for rapid brand customization.',
    results: [
      '10M+ products cataloged',
      '99.99% uptime achieved',
      '$50M+ GMV processed',
      '60% faster page loads than competitors'
    ],
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'flux-analytics',
    title: 'Flux Analytics',
    category: 'opensource',
    description: 'Real-time data visualization library',
    fullDescription: 'A lightweight, high-performance charting library designed for real-time data streams. Handles millions of data points with smooth 60fps animations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
    technologies: ['TypeScript', 'Canvas API', 'Web Workers', 'WebAssembly'],
    role: 'Creator',
    year: '2024',
    duration: '4 months',
    client: 'Open Source',
    challenge: 'Existing charting libraries struggle with real-time updates and large datasets. Needed something optimized for streaming data.',
    solution: 'Built a custom rendering engine using Canvas API with Web Worker offloading. Implemented efficient data structures for O(1) append operations.',
    results: [
      '3,000+ GitHub stars',
      'Used by Grafana and Superset',
      '10x faster than D3 for streaming',
      'Featured in Observable newsletter'
    ],
    githubUrl: '#',
    liveUrl: '#',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop'
    ]
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Layers },
  { id: 'web', label: 'Web', icon: Code },
  { id: 'mobile', label: 'Mobile', icon: Sparkles },
  { id: 'opensource', label: 'Open Source', icon: Github }
];

// Components
const ProjectCard = ({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg"
      style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '3/4' : '1/1' }}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <motion.div 
        className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span className="mb-2 text-xs font-medium uppercase tracking-widest text-white/70">
          {project.category}
        </span>
        <h3 className="mb-2 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mb-4 text-sm text-white/80 line-clamp-2">{project.description}</p>
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <span>View Case Study</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="relative h-80 w-full overflow-hidden md:h-[500px]">
          <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-sm">
              {project.category}
            </span>
            <h2 className="text-4xl font-bold md:text-5xl">{project.title}</h2>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="mb-4 text-xl font-bold">Overview</h3>
              <p className="text-gray-600 leading-relaxed">{project.fullDescription}</p>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-bold">The Challenge</h3>
              <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-bold">The Solution</h3>
              <p className="text-gray-600 leading-relaxed">{project.solution}</p>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-bold">Key Results</h3>
              <ul className="space-y-2">
                {project.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-600">
                    <Sparkles className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-4 text-xl font-bold">Project Gallery</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="group overflow-hidden rounded-lg">
                    <img 
                      src={img} 
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl bg-gray-50 p-6">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Project Info</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-400">Client</span>
                  <p className="font-medium">{project.client}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Role</span>
                  <p className="font-medium">{project.role}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Year</span>
                  <p className="font-medium">{project.year}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400">Duration</span>
                  <p className="font-medium">{project.duration}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-6">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
                >
                  <Github className="h-4 w-4" />
                  Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function Prototype5() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-40 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">Alex Chen</a>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#work" className="text-sm font-medium text-gray-600 hover:text-black">Work</a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-black">About</a>
            <a href="#skills" className="text-sm font-medium text-gray-600 hover:text-black">Skills</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-black">Contact</a>
          </div>
          <a 
            href="mailto:hello@alexchen.dev" 
            className="hidden items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-105 md:flex"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400"
          >
            Full Stack Developer & UI Designer
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
          >
            Crafting
            <br />
            <span className="text-gray-300">Digital</span> Experiences
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto max-w-xl text-lg text-gray-500"
          >
            I build products that people love to use. Specializing in React, TypeScript, and design systems.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-gray-300" />
          </motion.div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">Portfolio</p>
            <h2 className="text-4xl font-bold md:text-5xl">Selected Work</h2>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </motion.div>

          {/* Project Grid */}
          <motion.div 
            layout
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop" 
                    alt="Alex Chen" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-black p-6 text-white shadow-xl">
                  <p className="text-3xl font-bold">7+</p>
                  <p className="text-sm text-gray-400">Years Experience</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">About Me</p>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Building products that make a difference
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  I'm a full-stack developer with a passion for creating intuitive, performant web applications. 
                  With over 7 years of experience, I've worked with startups and Fortune 500 companies alike.
                </p>
                <p>
                  My approach combines technical excellence with design thinking. I believe great software 
                  should feel invisible—it should just work, delighting users without them noticing why.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring generative art, contributing to open source, 
                  or mentoring the next generation of developers.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm text-gray-500">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">30+</p>
                  <p className="text-sm text-gray-500">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">15K+</p>
                  <p className="text-sm text-gray-500">GitHub Stars</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-400">Expertise</p>
            <h2 className="text-4xl font-bold md:text-5xl">Skills & Tools</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Frontend',
                skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GraphQL']
              },
              {
                title: 'Backend',
                skills: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'AWS', 'Docker']
              },
              {
                title: 'Design',
                skills: ['Figma', 'Adobe Creative Suite', 'Design Systems', 'Prototyping', 'User Research', 'Accessibility']
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-gray-100 p-8 transition-shadow hover:shadow-lg"
              >
                <h3 className="mb-6 text-xl font-bold">{category.title}</h3>
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 text-gray-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-black" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-black px-6 py-24 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-500">Let's Connect</p>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">
              Have a project in mind?
            </h2>
            <p className="mb-10 text-lg text-gray-400">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, I'll do my best to get back to you!
            </p>

            <a 
              href="mailto:hello@alexchen.dev"
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-medium text-black transition-transform hover:scale-105"
            >
              <Mail className="h-5 w-5" />
              hello@alexchen.dev
            </a>

            <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-white">
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-white">
                <ExternalLink className="h-5 w-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <span className="text-gray-700">|</span>
              <a href="#" className="flex items-center gap-2 transition-colors hover:text-white">
                <MapPin className="h-5 w-5" />
                <span className="hidden sm:inline">San Francisco, CA</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black px-6 py-8 text-center text-sm text-gray-500">
        <p>© 2024 Alex Chen. Built with React, Tailwind & Framer Motion.</p>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
