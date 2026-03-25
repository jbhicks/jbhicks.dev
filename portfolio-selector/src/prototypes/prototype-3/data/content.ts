export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Engineering' | 'Design' | 'Product' | 'Personal';
  date: string;
  readTime: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export interface Tool {
  name: string;
  description: string;
  icon: string;
  link?: string;
}

export interface ToolsCategory {
  [key: string]: Tool[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Invisible Code',
    excerpt: 'What makes truly great software? It\'s not just about features—it\'s about creating experiences so smooth they\'re barely noticed.',
    content: '...',
    category: 'Engineering',
    date: 'Mar 10, 2026',
    readTime: '5 min read',
    featured: true
  },
  {
    id: '2',
    title: 'Design Systems That Actually Stick',
    excerpt: 'Why most design systems fail and how to build one that your team will actually use.',
    content: '...',
    category: 'Design',
    date: 'Feb 28, 2026',
    readTime: '8 min read'
  },
  {
    id: '3',
    title: 'From Zero to Production in 30 Days',
    excerpt: 'A case study on rapid prototyping and how to ship fast without sacrificing quality.',
    content: '...',
    category: 'Product',
    date: 'Feb 15, 2026',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'The Documentation Nobody Reads',
    excerpt: 'How to write technical documentation that developers actually want to read.',
    content: '...',
    category: 'Engineering',
    date: 'Jan 30, 2026',
    readTime: '4 min read'
  },
  {
    id: '5',
    title: 'Why I Switched to Neovim',
    excerpt: 'My journey from VS Code to Neovim and what I learned about developer tooling along the way.',
    content: '...',
    category: 'Personal',
    date: 'Jan 18, 2026',
    readTime: '7 min read'
  },
  {
    id: '6',
    title: 'Building Accessible Interfaces',
    excerpt: 'Accessibility isn\'t a feature—it\'s a requirement. Here\'s how to build inclusively from day one.',
    content: '...',
    category: 'Design',
    date: 'Jan 5, 2026',
    readTime: '5 min read'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Streamline Analytics',
    description: 'A real-time analytics dashboard that helps SaaS companies track user engagement metrics. Built with React, TypeScript, and WebSocket connections for live data updates. Features customizable widgets and export capabilities.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: '2',
    title: 'Design System Kit',
    description: 'A comprehensive component library with 50+ accessible, customizable components. Includes theming support, dark mode, and extensive documentation. Used by 3 internal teams and counting.',
    tags: ['React', 'Storybook', 'TypeScript', 'Tailwind CSS', 'Figma'],
    link: '#',
    github: '#',
    featured: true
  },
  {
    id: '3',
    title: 'Local Commerce Platform',
    description: 'An e-commerce solution for small businesses with local pickup and delivery options. Built during the pandemic to help local shops stay afloat.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Vercel'],
    link: '#',
    featured: true
  }
];

export const tools: ToolsCategory = {
  development: [
    { name: 'Neovim', description: 'My editor of choice, configured with Lua', icon: '⌨️' },
    { name: 'tmux', description: 'Terminal multiplexer for session management', icon: '🖥️' },
    { name: 'GitHub', description: 'Where all my code lives', icon: '🐙' },
    { name: 'Warp', description: 'Modern terminal with great UX', icon: '⚡' },
    { name: 'TablePlus', description: 'Clean database management', icon: '🗄️' }
  ],
  design: [
    { name: 'Figma', description: 'Design, prototype, collaborate', icon: '🎨' },
    { name: 'Arc Browser', description: 'The browser that changed how I work', icon: '🌐' },
    { name: 'Sip', description: 'Color picker for designers', icon: '🎨' },
    { name: 'CleanShot', description: 'Best screenshot tool on Mac', icon: '📸' }
  ],
  productivity: [
    { name: 'Notion', description: 'Notes, docs, and databases', icon: '📝' },
    { name: 'Raycast', description: 'Command palette for everything', icon: '⚡' },
    { name: 'Obsidian', description: 'Personal knowledge base', icon: '🧠' },
    { name: 'Linear', description: 'Issue tracking that doesn\'t suck', icon: '📋' }
  ],
  hardware: [
    { name: 'MacBook Pro 16"', description: 'M3 Max, 64GB RAM', icon: '💻' },
    { name: 'Keychron K2', description: 'Mechanical keyboard', icon: '⌨️' },
    { name: 'LG 4K Display', description: 'External monitor', icon: '🖥️' },
    { name: 'Sony WH-1000XM5', description: 'Noise-canceling headphones', icon: '🎧' }
  ]
};
