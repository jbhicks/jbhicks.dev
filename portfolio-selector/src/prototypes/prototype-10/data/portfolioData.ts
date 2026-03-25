export const personalInfo = {
  name: "Alex Morgan",
  title: "Full-Stack Developer & UI/UX Designer",
  tagline: "Crafting digital experiences that make a difference",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexmorgan",
  github: "github.com/alexmorgan",
  twitter: "twitter.com/alexmorgan",
  resumeUrl: "/resume.pdf",
  bio: "I'm a passionate full-stack developer with over 8 years of experience building scalable web applications and intuitive user interfaces. My expertise spans across modern JavaScript frameworks, cloud infrastructure, and design systems. I thrive in collaborative environments and enjoy solving complex problems with elegant solutions.",
  photo: "/profile-photo.jpg"
};

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with scalability in mind, handling 10k+ concurrent users.",
    image: "/project-ecommerce.jpg",
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe"],
    github: "https://github.com/alexmorgan/ecommerce",
    demo: "https://demo-ecommerce.example.com",
    featured: true
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "An intelligent analytics dashboard that leverages machine learning to provide predictive insights for business metrics. Features real-time data visualization.",
    image: "/project-ai-dashboard.jpg",
    tech: ["TypeScript", "Python", "TensorFlow", "D3.js", "AWS"],
    github: "https://github.com/alexmorgan/ai-dashboard",
    demo: "https://demo-ai.example.com",
    featured: true
  },
  {
    id: 3,
    title: "Social Media App",
    description: "A modern social platform focused on privacy and meaningful connections. Features end-to-end encryption, stories, and community groups.",
    image: "/project-social.jpg",
    tech: ["React Native", "GraphQL", "MongoDB", "WebRTC", "Firebase"],
    github: "https://github.com/alexmorgan/social-app",
    demo: "https://demo-social.example.com",
    featured: true
  },
  {
    id: 4,
    title: "Design System",
    description: "A comprehensive component library and design system used across multiple products. Includes 50+ components, accessibility guidelines, and documentation.",
    image: "/project-design-system.jpg",
    tech: ["TypeScript", "Storybook", "CSS-in-JS", "Jest", "Rollup"],
    github: "https://github.com/alexmorgan/design-system",
    demo: "https://design-system.example.com",
    featured: true
  }
];

export const experience = [
  {
    id: 1,
    company: "TechCorp Inc.",
    role: "Senior Full-Stack Developer",
    period: "2021 - Present",
    location: "San Francisco, CA",
    description: "Lead developer for the core platform team, architecting scalable solutions and mentoring junior developers. Reduced deployment time by 60% through CI/CD improvements.",
    achievements: [
      "Architected microservices infrastructure serving 1M+ daily users",
      "Mentored team of 5 junior developers",
      "Reduced infrastructure costs by 40% through optimization"
    ]
  },
  {
    id: 2,
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    period: "2019 - 2021",
    location: "New York, NY",
    description: "Full-stack development for a fast-growing SaaS startup. Built core product features from the ground up and helped scale the engineering team.",
    achievements: [
      "Built MVP that secured $5M Series A funding",
      "Implemented real-time collaboration features",
      "Achieved 99.9% uptime across all services"
    ]
  },
  {
    id: 3,
    company: "Digital Agency Pro",
    role: "Frontend Developer",
    period: "2017 - 2019",
    location: "Remote",
    description: "Developed responsive web applications for diverse clients including Fortune 500 companies. Specialized in React and modern frontend architecture.",
    achievements: [
      "Delivered 20+ projects on time and on budget",
      "Introduced component-based architecture to team",
      "Received Excellence in Client Service award"
    ]
  },
  {
    id: 4,
    company: "WebSolutions Co.",
    role: "Junior Web Developer",
    period: "2016 - 2017",
    location: "Austin, TX",
    description: "Started my professional career building websites and web applications for small to medium businesses. Learned the fundamentals of full-stack development.",
    achievements: [
      "Built 30+ client websites",
      "Mastered responsive design principles",
      "Promoted to mid-level within 8 months"
    ]
  }
];

export const skills = {
  frontend: [
    "React",
    "TypeScript",
    "Next.js",
    "Vue.js",
    "Tailwind CSS",
    "Framer Motion",
    "GraphQL"
  ],
  backend: [
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "GraphQL",
    "REST APIs"
  ],
  cloud: [
    "AWS",
    "Docker",
    "Kubernetes",
    "Terraform",
    "CI/CD",
    "GitHub Actions"
  ],
  tools: [
    "Git",
    "Figma",
    "Jest",
    "Cypress",
    "Storybook",
    "VS Code",
    "Notion"
  ]
};

export const education = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    school: "University of Texas at Austin",
    period: "2012 - 2016",
    description: "Graduated with Honors. Focus on Software Engineering and Human-Computer Interaction."
  }
];

export const certifications = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional Developer",
  "Scrum Master Certified"
];
