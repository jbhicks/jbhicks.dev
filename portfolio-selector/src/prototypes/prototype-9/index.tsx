import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Twitter,
  Linkedin,
  Music,
  MessageSquare,
  Star,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Activity,
  Users,
  TrendingUp,
  Terminal,
  Cpu,
  Globe
} from 'lucide-react';

// Mock data for GitHub stats
const mockGitHubStats = {
  commits: 2847,
  pullRequests: 156,
  issues: 43,
  repositories: 89,
  followers: 2341,
  stars: 5842,
  contributions: Array.from({ length: 365 }, () => Math.floor(Math.random() * 20))
};

// Mock activity feed
const mockActivities = [
  { id: 1, type: 'commit', repo: 'awesome-react-hooks', message: 'feat: add useDebounce hook', time: '2 min ago', icon: GitCommit, color: 'text-emerald-400' },
  { id: 2, type: 'pr', repo: 'nextjs-dashboard', message: 'Merge pull request #42: Performance optimization', time: '15 min ago', icon: GitPullRequest, color: 'text-purple-400' },
  { id: 3, type: 'issue', repo: 'typescript-utils', message: 'Fixed: Type inference bug in generic helpers', time: '1 hour ago', icon: AlertCircle, color: 'text-rose-400' },
  { id: 4, type: 'commit', repo: 'portfolio-v2', message: 'chore: update dependencies', time: '2 hours ago', icon: GitCommit, color: 'text-emerald-400' },
  { id: 5, type: 'pr', repo: 'design-system', message: 'feat: add new Button variants', time: '3 hours ago', icon: GitPullRequest, color: 'text-purple-400' },
  { id: 6, type: 'commit', repo: 'api-gateway', message: 'refactor: improve error handling', time: '5 hours ago', icon: GitCommit, color: 'text-emerald-400' },
];

// Mock projects
const mockProjects = [
  { id: 1, name: 'NexusUI', description: 'Modern React component library', stars: 1247, language: 'TypeScript', color: 'bg-blue-500', forks: 234 },
  { id: 2, name: 'DevFlow', description: 'Developer productivity dashboard', stars: 892, language: 'Rust', color: 'bg-orange-500', forks: 156 },
  { id: 3, name: 'QuerySync', description: 'Real-time database sync engine', stars: 2341, language: 'Go', color: 'bg-cyan-500', forks: 412 },
  { id: 4, name: 'TypeGuard', description: 'Runtime type validation', stars: 567, language: 'TypeScript', color: 'bg-blue-500', forks: 89 },
];

// Mock skills with proficiency
const mockSkills = [
  { name: 'TypeScript', level: 95, color: 'from-blue-500 to-blue-600' },
  { name: 'React', level: 92, color: 'from-cyan-500 to-cyan-600' },
  { name: 'Node.js', level: 88, color: 'from-green-500 to-green-600' },
  { name: 'Rust', level: 75, color: 'from-orange-500 to-orange-600' },
  { name: 'Go', level: 82, color: 'from-cyan-400 to-cyan-500' },
  { name: 'PostgreSQL', level: 85, color: 'from-indigo-500 to-indigo-600' },
];

// Mock now playing
const mockNowPlaying = {
  track: 'Midnight City',
  artist: 'M83',
  album: 'Hurry Up, We\'re Dreaming',
  progress: 45,
  duration: 243,
  cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop'
};

// Mock social stats
const mockSocialStats = [
  { platform: 'GitHub', icon: Github, followers: 2341, color: 'hover:text-gray-100' },
  { platform: 'Twitter', icon: Twitter, followers: 5634, color: 'hover:text-sky-400' },
  { platform: 'LinkedIn', icon: Linkedin, followers: 8920, color: 'hover:text-blue-400' },
];

// Mock guestbook
const mockGuestbook = [
  { id: 1, name: 'Sarah Chen', message: 'Love your work on NexusUI! 🚀', time: '2 hours ago', avatar: 'SC' },
  { id: 2, name: 'Alex Rivera', message: 'Thanks for the TypeScript tips', time: '5 hours ago', avatar: 'AR' },
  { id: 3, name: 'Jordan Kim', message: 'Your blog posts are amazing', time: '1 day ago', avatar: 'JK' },
];

export default function SocialDeveloperHub() {
  const [mounted, setMounted] = useState(false);
  const [liveStats, setLiveStats] = useState(mockGitHubStats);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newComment, setNewComment] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState(mockGuestbook);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Simulate live stats updates
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
      setLiveStats(prev => ({
        ...prev,
        commits: prev.commits + Math.floor(Math.random() * 3),
        stars: prev.stars + Math.floor(Math.random() * 2),
        followers: prev.followers + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 5000);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, []);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const entry = {
      id: guestbookEntries.length + 1,
      name: 'Guest User',
      message: newComment,
      time: 'Just now',
      avatar: 'GU'
    };
    
    setGuestbookEntries([entry, ...guestbookEntries]);
    setNewComment('');
  };

  // Generate contribution graph data
  const contributionGrid = useMemo(() => {
    const weeks = 52;
    const days = 7;
    const grid = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        const index = w * days + d;
        const value = mockGitHubStats.contributions[index] || 0;
        week.push(value);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  const getContributionColor = (value: number) => {
    if (value === 0) return 'bg-slate-800';
    if (value < 5) return 'bg-emerald-900/60';
    if (value < 10) return 'bg-emerald-700/80';
    if (value < 15) return 'bg-emerald-500';
    return 'bg-emerald-400';
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono selection:bg-cyan-500/30">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">dev.hub</h1>
                <p className="text-xs text-slate-500">always online</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6 text-sm"
            >
              <div className="hidden sm:flex items-center gap-2 text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live</span>
              </div>
              <div className="text-slate-500">
                {currentTime.toLocaleTimeString()}
              </div>
              <a href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-0.5 mb-4">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-3xl font-bold">
                      JD
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                  <p className="text-slate-400 text-sm mb-4">Full-stack developer & open source enthusiast</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      TypeScript
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      React
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Node.js
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {mockSocialStats.map((social) => (
                      <motion.a
                        key={social.platform}
                        href="#"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-2 rounded-lg bg-slate-800/50 text-slate-400 transition-colors ${social.color}`}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Commits', value: liveStats.commits, icon: GitCommit, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Pull Requests', value: liveStats.pullRequests, icon: GitPullRequest, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { label: 'Repositories', value: liveStats.repositories, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                { label: 'Followers', value: liveStats.followers, icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-4"
                >
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} w-fit mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold tabular-nums">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={pulseKey}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full ${stat.color.replace('text-', 'bg-')}`}
                    />
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* GitHub Contribution Graph */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-slate-400" />
                <h3 className="font-semibold">Contribution Graph</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{liveStats.commits.toLocaleString()} contributions in the last year</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">Less</span>
                  <div className="w-3 h-3 rounded-sm bg-slate-800" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-900/60" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-700/80" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <div className="w-3 h-3 rounded-sm bg-emerald-400" />
                  <span className="text-xs">More</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {contributionGrid.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(day)} hover:ring-2 hover:ring-slate-600 transition-all cursor-pointer`}
                        title={`${day} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-sm">Recent Activity</h3>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
              {mockActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-3 p-3 rounded-xl hover:bg-slate-800/50 transition-colors group cursor-pointer"
                >
                  <div className={`mt-0.5 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
                      {activity.repo}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{activity.message}</p>
                    <p className="text-xs text-slate-600 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <h3 className="font-semibold text-sm">Top Projects</h3>
              </div>
              <span className="text-xs text-slate-500">{liveStats.repositories} repos</span>
            </div>
            <div className="p-4 space-y-3">
              {mockProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-3 rounded-xl border border-slate-800/50 hover:border-slate-700 hover:bg-slate-800/30 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.color}`} />
                      <h4 className="font-medium text-sm group-hover:text-cyan-400 transition-colors">
                        {project.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Star className="w-3 h-3" />
                      {project.stars.toLocaleString()}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{project.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">{project.language}</span>
                    <span className="text-slate-600">{project.forks} forks</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400" />
                <h3 className="font-semibold text-sm">Skills</h3>
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="p-4 space-y-4">
              {mockSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Now Playing & Guestbook */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Now Playing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-pink-400" />
                <h3 className="font-semibold text-sm">Now Playing</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400">Spotify</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-800"
                  >
                    <img 
                      src={mockNowPlaying.cover} 
                      alt={mockNowPlaying.album}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-slate-800 border-2 border-slate-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg truncate">{mockNowPlaying.track}</h4>
                  <p className="text-slate-400 text-sm truncate">{mockNowPlaying.artist}</p>
                  <p className="text-slate-600 text-xs truncate">{mockNowPlaying.album}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="h-1 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(mockNowPlaying.progress / mockNowPlaying.duration) * 100}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>1:45</span>
                  <span>4:03</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guestbook */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h3 className="font-semibold text-sm">Guestbook</h3>
              </div>
              <span className="text-xs text-slate-500">{guestbookEntries.length} messages</span>
            </div>
            
            <div className="p-4 max-h-[300px] overflow-y-auto space-y-3 mb-4">
              <AnimatePresence>
                {guestbookEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-3 p-3 rounded-xl bg-slate-800/30"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {entry.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{entry.name}</span>
                        <span className="text-xs text-slate-600">{entry.time}</span>
                      </div>
                      <p className="text-sm text-slate-400">{entry.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <form onSubmit={handleSubmitComment} className="p-4 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Leave a message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-slate-600 pt-8 border-t border-slate-800/50"
        >
          <p>Built with React + TypeScript + Vite + Tailwind</p>
          <p className="mt-2">© 2024 John Doe. Always coding.</p>
        </motion.footer>
      </main>
    </div>
  );
}
