import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, X, ArrowRight, BookOpen, Briefcase, Layers, 
  Coffee, Send, Github, Twitter, Linkedin, Mail,
  Sparkles, ArrowUpRight, Bookmark
} from 'lucide-react';
import { blogPosts, projects, tools } from './data/content';

export default function Prototype3() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'blog', 'projects', 'uses', 'newsletter', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-2xl font-serif font-bold text-stone-900 hover:text-stone-700 transition-colors"
            >
              Josh Hicks
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['About', 'Blog', 'Projects', 'Uses'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === item.toLowerCase() 
                      ? 'text-stone-900 font-medium' 
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 bg-stone-900 text-stone-50 text-sm rounded-full hover:bg-stone-800 transition-colors"
              >
                Get in touch
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-stone-200 bg-stone-50"
          >
            <div className="px-6 py-4 space-y-4">
              {['About', 'Blog', 'Projects', 'Uses', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-stone-700 hover:text-stone-900 py-2"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            {/* Featured Content - Main */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-7"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                  <Sparkles size={16} className="text-amber-600" />
                  <span>Featured Story</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-stone-900">
                  Building software that feels like magic
                </h1>
                <p className="text-lg md:text-xl text-stone-700 leading-relaxed max-w-2xl">
                  I'm a developer who believes great code should disappear into the background, 
                  leaving only pure, intuitive experiences. Join me as I explore the craft of 
                  thoughtful engineering.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => scrollToSection('blog')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-800 transition-colors"
                  >
                    Read the blog
                    <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 rounded-full hover:border-stone-500 transition-colors"
                  >
                    More about me
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Featured Blog Post Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-5"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200">
                <div className="aspect-[4/3] bg-stone-100 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      Engineering
                    </span>
                    <span className="text-stone-500">Mar 10, 2026</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">
                    The Art of Invisible Code
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    What makes truly great software? It's not just about features—it's about 
                    creating experiences so smooth they're barely noticed.
                  </p>
                  <button className="text-stone-900 font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                    Read article <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">About</h2>
              <div className="w-16 h-1 bg-amber-600 rounded-full" />
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                Hey there! I'm Josh, a software engineer with a background in design and a 
                passion for building things that matter. I've spent the last decade working 
                at startups, agencies, and everything in between, always chasing that perfect 
                balance between technical excellence and human-centered design.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new coffee shops, reading 
                sci-fi novels, or tinkering with side projects that probably won't make me 
                rich but teach me something new.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
                <div>
                  <div className="text-3xl font-serif font-bold text-stone-900">10+</div>
                  <div className="text-sm text-stone-600">Years coding</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-stone-900">50+</div>
                  <div className="text-sm text-stone-600">Projects shipped</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-stone-900">∞</div>
                  <div className="text-sm text-stone-600">Cups of coffee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-2">Latest from the Blog</h2>
              <p className="text-stone-600">Thoughts on engineering, design, and building great products</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all">
              View all posts <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-video bg-stone-100 rounded-xl mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="flex items-center gap-3 text-sm mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.category === 'Engineering' ? 'bg-blue-100 text-blue-800' :
                    post.category === 'Design' ? 'bg-purple-100 text-purple-800' :
                    post.category === 'Product' ? 'bg-green-100 text-green-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {post.category}
                  </span>
                  <span className="text-stone-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-2 group-hover:text-stone-700 transition-colors">
                  {post.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
                  Read more <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
          
          <button className="md:hidden w-full mt-8 flex items-center justify-center gap-2 text-stone-900 font-medium py-3 border border-stone-300 rounded-full hover:border-stone-500 transition-colors">
            View all posts <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Featured Projects</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              A selection of work I'm proud of—ranging from side projects to full-scale product launches
            </p>
          </div>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group grid md:grid-cols-2 gap-8 bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="aspect-[16/10] bg-stone-200 rounded-xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-stone-300 to-stone-400 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white text-stone-700 rounded-full text-xs font-medium border border-stone-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-stone-700 leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all">
                      View case study <ArrowRight size={16} />
                    </button>
                    {project.link && (
                      <button className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
                        Live site <ArrowUpRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Uses Section */}
      <section id="uses" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">What I Use</h2>
              <p className="text-stone-600 mb-6">
                The tools, apps, and gear that power my daily workflow
              </p>
              <div className="w-16 h-1 bg-amber-600 rounded-full" />
            </div>
            <div className="md:col-span-8 space-y-8">
              {Object.entries(tools).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                    {category === 'development' && <Briefcase size={18} className="text-stone-500" />}
                    {category === 'design' && <Layers size={18} className="text-stone-500" />}
                    {category === 'productivity' && <Coffee size={18} className="text-stone-500" />}
                    {category === 'hardware' && <Bookmark size={18} className="text-stone-500" />}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map((tool) => (
                      <div 
                        key={tool.name}
                        className="flex items-start gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors"
                      >
                        <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-lg">{tool.icon}</span>
                        </div>
                        <div>
                          <div className="font-medium text-stone-900">{tool.name}</div>
                          <div className="text-sm text-stone-600">{tool.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 px-6 bg-stone-900 text-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen size={48} className="mx-auto mb-6 text-amber-500" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join the newsletter
          </h2>
          <p className="text-stone-400 text-lg mb-8 max-w-2xl mx-auto">
            Get insights on software engineering, design, and building products that matter. 
            No spam, just thoughtful writing delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-3 bg-stone-800 border border-stone-700 rounded-full text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-amber-600 text-stone-900 font-medium rounded-full hover:bg-amber-500 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe
              <Send size={18} />
            </button>
          </form>
          <p className="text-stone-500 text-sm mt-4">
            Join 2,000+ developers and designers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">
                Let's work together
              </h2>
              <p className="text-stone-600 text-lg mb-8">
                Have a project in mind or just want to chat? I'd love to hear from you.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:hello@jbhicks.dev" 
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Mail size={20} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">Email</div>
                    <div className="text-stone-600">hello@jbhicks.dev</div>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto text-stone-400 group-hover:text-stone-700 transition-colors" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Twitter size={20} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">Twitter</div>
                    <div className="text-stone-600">@joshbhicks</div>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto text-stone-400 group-hover:text-stone-700 transition-colors" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Github size={20} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">GitHub</div>
                    <div className="text-stone-600">github.com/jbhicks</div>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto text-stone-400 group-hover:text-stone-700 transition-colors" />
                </a>
                
                <a 
                  href="#" 
                  className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Linkedin size={20} className="text-stone-700" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-900">LinkedIn</div>
                    <div className="text-stone-600">linkedin.com/in/jbhicks</div>
                  </div>
                  <ArrowUpRight size={20} className="ml-auto text-stone-400 group-hover:text-stone-700 transition-colors" />
                </a>
              </div>
            </div>
            
            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <h3 className="text-xl font-serif font-bold text-stone-900 mb-6">
                Send a message
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Name</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                    <input 
                      type="email"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Subject</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 transition-colors"
                    placeholder="Project inquiry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-stone-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-stone-900 text-stone-50 font-medium rounded-xl hover:bg-stone-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-serif font-bold text-stone-900">Josh Hicks</span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-600">2026</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors">Twitter</a>
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors">GitHub</a>
              <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
