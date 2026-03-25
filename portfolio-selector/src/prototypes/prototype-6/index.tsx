import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  MapPin,
  Calendar,
  Code2,
  Briefcase,
  GraduationCap,
  Rocket,
  Sparkles,
  Heart,
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Star,
  Zap,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ScrollStoryPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to('.hero-bg', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Timeline items reveal
      gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((item) => {
        gsap.fromTo(item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Skill bars animation
      gsap.utils.toArray<HTMLElement>('.skill-bar-fill').forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0%';
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: width,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Story sections parallax
      gsap.utils.toArray<HTMLElement>('.story-section').forEach((section) => {
        gsap.fromTo(section.querySelector('.story-content'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const milestones = [
    {
      year: '2018',
      title: 'The Spark',
      role: 'First Line of Code',
      company: 'University Dorm Room',
      description: 'It all started with a simple HTML page. I stayed up all night learning CSS, completely hooked by the magic of creating something from nothing.',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-500',
      story: 'I remember the exact moment — 3 AM, energy drink in hand, watching my first "Hello World" appear on screen. That rush of creation changed everything.'
    },
    {
      year: '2019',
      title: 'The Apprenticeship',
      role: 'Junior Developer',
      company: 'TechStart Inc.',
      description: 'Land my first job at a startup. Learned the difference between "working code" and "production-ready code" the hard way.',
      icon: GraduationCap,
      color: 'from-emerald-400 to-teal-500',
      story: 'My first code review had 47 comments. I was devastated. But my mentor said, "Every senior dev has been here. The difference is what you do next."'
    },
    {
      year: '2020',
      title: 'The Pandemic Pivot',
      role: 'Full-Stack Developer',
      company: 'RemoteLife Co.',
      description: 'When the world went remote, I went all-in. Built my first full application solo while navigating the chaos of 2020.',
      icon: Globe,
      color: 'from-blue-400 to-indigo-500',
      story: 'Working in isolation taught me self-discipline. I built a habit tracker app to stay sane, and it ended up helping thousands of others too.'
    },
    {
      year: '2021',
      title: 'The Breakthrough',
      role: 'Senior Developer',
      company: 'Innovation Labs',
      description: 'Lead my first team project. Learned that great code is nothing without great communication and empathy.',
      icon: Rocket,
      color: 'from-purple-400 to-pink-500',
      story: 'I thought being senior meant knowing all the answers. I was wrong. It means knowing how to find them together.'
    },
    {
      year: '2022',
      title: 'The Open Source Year',
      role: 'Core Contributor',
      company: 'Various Projects',
      description: 'Contributed to major open source projects. The community taught me more than any tutorial ever could.',
      icon: Heart,
      color: 'from-rose-400 to-red-500',
      story: 'Helping others debug their issues at 2 AM connected me to developers worldwide. We\'re all just trying to make things better.'
    },
    {
      year: '2024',
      title: 'The Present',
      role: 'Tech Lead & Mentor',
      company: 'Future Forward',
      description: 'Now I architect systems and help others grow. My code builds platforms; my mentorship builds people.',
      icon: Star,
      color: 'from-cyan-400 to-blue-500',
      story: 'The best part of my job isn\'t the features we ship. It\'s watching junior developers have their own "3 AM moments" and knowing I helped.'
    }
  ];

  const skills = [
    { name: 'React & Ecosystem', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Languages' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'System Design', level: 85, category: 'Architecture' },
    { name: 'Team Leadership', level: 82, category: 'Soft Skills' },
    { name: 'UI/UX Design', level: 78, category: 'Design' }
  ];

  const projects = [
    {
      title: 'HabitFlow',
      year: '2020',
      description: 'A mindful habit tracker built during the pandemic that grew to 10k+ users.',
      tags: ['React', 'Firebase', 'PWA'],
      impact: 'Helped users build 50k+ habits'
    },
    {
      title: 'DevConnect',
      year: '2021',
      description: 'Platform connecting developers for remote pair programming sessions.',
      tags: ['Next.js', 'WebRTC', 'PostgreSQL'],
      impact: 'Facilitated 5k+ pairing sessions'
    },
    {
      title: 'OpenSource Dashboard',
      year: '2022',
      description: 'Analytics dashboard for open source maintainers to track project health.',
      tags: ['TypeScript', 'GraphQL', 'D3.js'],
      impact: 'Used by 200+ OSS projects'
    }
  ];

  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
          <div className="absolute inset-0 opacity-30">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest text-indigo-400 uppercase border border-indigo-400/30 rounded-full">
              A Developer&apos;s Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent"
          >
            The Story
            <br />
            So Far
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            From my first line of code to leading teams.
            <br />
            <span className="text-indigo-400">A journey in six chapters.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            {['React', 'TypeScript', 'Leadership', 'Mentorship'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm bg-slate-800/50 border border-slate-700 rounded-full text-slate-300"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-sm tracking-wider uppercase">Start Reading</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              My Journey
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"
            />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500 md:-translate-x-px" />

            {milestones.map((milestone, index) => (
              <div key={milestone.year}>
                {/* Timeline Item */}
                <div
                  className={`timeline-item relative mb-16 md:mb-24 ${
                    index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
                  }`}
                >
                  {/* Timeline Node */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${milestone.color} md:-translate-x-1/2 z-10 ring-4 ring-slate-950`}
                  />

                  {/* Content Card */}
                  <div
                    className={`ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-12 md:text-right' : 'md:ml-12'
                    }`}
                  >
                    <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-all duration-300">
                      {/* Year Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${milestone.color} text-white mb-4`}
                      >
                        <Calendar className="w-4 h-4" />
                        {milestone.year}
                      </div>

                      {/* Icon */}
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${milestone.color} mb-4`}
                      >
                        <milestone.icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-indigo-400 font-medium mb-2">{milestone.role}</p>
                      <p className="text-slate-500 text-sm mb-4 flex items-center gap-2 justify-start">
                        <MapPin className="w-4 h-4" />
                        {milestone.company}
                      </p>
                      <p className="text-slate-400 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </div>

                {/* Story Section */}
                <div className="story-section mb-24">
                  <div className="story-content max-w-3xl mx-auto text-center px-6">
                    <div className="relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-slate-800 font-serif">
                        &ldquo;
                      </div>
                      <p className="text-xl md:text-2xl text-slate-300 italic leading-relaxed pt-8">
                        {milestone.story}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Integration */}
                {index === 2 && (
                  <div className="mb-24 px-6">
                    <div className="max-w-4xl mx-auto">
                      <h3 className="text-2xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                        <Briefcase className="w-6 h-6 text-indigo-400" />
                        Projects Along the Way
                      </h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((project) => (
                          <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors group"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">
                                {project.title}
                              </h4>
                              <span className="text-xs text-slate-500">{project.year}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {project.impact}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-32 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Skills Earned
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-400"
            >
              Years of practice, countless mistakes, continuous growth
            </motion.p>
          </div>

          <div className="space-y-8">
            {skills.map((skill) => (
              <div key={skill.name} className="timeline-item">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-slate-500 text-sm">{skill.category}</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    data-width={`${skill.level}%`}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-sm text-indigo-400">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Next Chapter */}
      <section ref={contactRef} className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 to-slate-950" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest text-indigo-400 uppercase border border-indigo-400/30 rounded-full"
            >
              Chapter 7: The Future
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Let&apos;s Write the Next Chapter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-slate-400"
            >
              Every great story needs collaboration. What will we build together?
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 md:p-12"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  What&apos;s Your Story?
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors resize-none"
                  placeholder="Tell me about your project, your ideas, or just say hello..."
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
                <span className="text-slate-500 text-sm">
                  Or reach out directly:
                </span>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: Github, label: 'GitHub', href: '#' },
                  { icon: Linkedin, label: 'LinkedIn', href: '#' },
                  { icon: Twitter, label: 'Twitter', href: '#' },
                  { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' }
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors group"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500">
            © 2024 The Journey Continues. Built with{' '}
            <Heart className="w-4 h-4 inline text-rose-500" /> and lots of{' '}
            <Code2 className="w-4 h-4 inline text-indigo-400" />
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-2"
          >
            Back to Top
            <ChevronDown className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ScrollStoryPortfolio;
