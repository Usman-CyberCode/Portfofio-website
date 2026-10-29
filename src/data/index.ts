import {
  PersonalData,
  EducationItem,
  TrainingItem,
  SkillCategory,
  Project,
  ServiceItem,
  NavItem,
} from "@/types";

export const personalData: PersonalData = {
  name: "Muhammad Usman Tahir",
  title: "Web Developer | Problem Solver in C++",
  statusText: "Seeking Web Development Internship",
  isAvailableForHire: true,
  shortBio:
    "Motivated and detail-oriented BSCS student with a strong interest in Web Development and Problem Solving using C++. Experienced in front-end web technologies and programming fundamentals, actively seeking a Web Development Internship to contribute to real-world projects.",
  careerObjective:
    "I am a motivated and detail-oriented BSCS student with a strong interest in Web Development and Problem Solving using C++. I have experience with front-end web technologies and programming fundamentals. I am seeking a Web Development Internship where I can enhance my practical skills and contribute to real-world projects in a professional environment.",
  location: "Pakistan",
  email: "theycallmerut@gmail.com",
  socialLinks: [
    {
      platform: "GitHub",
      url: "https://github.com/Usman-CyberCode",
      label: "GitHub Profile",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-usman-tahir-a49710230",
      label: "LinkedIn Profile",
      icon: "linkedin",
    },
  ],
  resumeUrl: "#contact",
};

export const educationData: EducationItem[] = [
  {
    id: "bscs-uaf",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "University of Agriculture Faisalabad",
    currentSemester: "5th Semester",
    cgpa: "3.4 / 4.0",
    location: "Faisalabad, Punjab, Pakistan",
    period: "2022 - Present (5th Semester)",
    details:
      "Pursuing a formal Bachelor of Science in Computer Science with a strong academic record (CGPA 3.4/4.0). Coursework emphasizes theoretical and applied computer science: Programming Fundamentals, Object-Oriented Programming (OOP) in C++, Data Structures & Algorithms (DSA), Discrete Mathematics, and Software Design.",
  },
];

export const trainingData: TrainingItem[] = [
  {
    id: "saylani-web-dev",
    title: "Web Development Training",
    institution: "Saylani Welfare Trust",
    description:
      "Completed rigorous hands-on frontend web development training. Built real-world practical projects emphasizing semantic markup, modern responsive CSS layouts, interactive JavaScript ES6+, React component architecture, and Git team workflows.",
    period: "Professional Web Training",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    description: "Languages for core logic, problem solving, and software engineering",
    skills: [
      { name: "C++", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "TypeScript", highlight: true },
    ],
  },
  {
    title: "State Management",
    description: "Predictable state architecture for reactive frontend applications",
    skills: [
      { name: "Redux / Redux Toolkit", highlight: true },
    ],
  },
  {
    title: "Web Technologies",
    description: "Foundational markup and styling standards for web development",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    title: "Tools",
    description: "Development environments, version control, and productivity tools",
    skills: [
      { name: "VS Code" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Microsoft Word" },
      { name: "Microsoft PowerPoint" },
    ],
  },
  {
    title: "Core Skills / Interests",
    description: "Theoretical fundamentals and problem-solving methodologies",
    skills: [
      { name: "Problem Solving", highlight: true },
      { name: "Basic Web Development" },
      { name: "Programming Fundamentals" },
      { name: "Data Structures & Algorithms", highlight: true },
      { name: "Object-Oriented Programming" },
      { name: "Learning New Technologies" },
    ],
  },
];

export const projectsData: Project[] = [
  {
    id: "workspace-manager-hackathon",
    title: "Workspace Manager Hackathon",
    tagline: "Hackathon Web Project",
    description:
      "A collaborative workspace management web interface developed during a hackathon. Features responsive dashboard views, project boards, and task categorization.",
    detailedDescription:
      "Built for a competitive hackathon setting, Workspace Manager focuses on ergonomic workspace orchestration. Developed with modern responsive web standards, it provides users with clean project tracking cards, structured activity boards, and seamless mobile-to-desktop flexibility.",
    technologies: ["React / Next.js", "TypeScript", "Responsive Design", "Tailwind CSS"],
    featured: true,
    githubUrl:
      "https://github.com/Usman-CyberCode/workspace-manager-hackathon-project",
    liveUrl: "https://workspace-manager-hackathon-project.vercel.app/",
    image: "/images/projects/workspace-manager.webp",
    metrics: [
      { label: "Role", value: "Frontend Developer" },
      { label: "Context", value: "Hackathon Build" },
      { label: "Architecture", value: "Component-Driven" },
    ],
  },
  {
    id: "atm-clone",
    title: "ATM Clone",
    tagline: "C++ Application System",
    description:
      "A complete ATM banking simulation engineered in C++. Implements secure PIN authentication, real-time balance queries, cash deposits, withdrawals, and ledger audit logging.",
    detailedDescription:
      "Constructed using solid Object-Oriented Programming (OOP) and procedural logic in C++. Simulates real-world ATM transaction workflows with input validation, guard conditions against overdrafts, and structured state persistence across account transactions.",
    technologies: ["C++", "OOP Principles", "Data Structures", "CLI Architecture"],
    featured: true,
    githubUrl: undefined,
    liveUrl: undefined,
    image: "/images/projects/atm-clone.webp",
    metrics: [
      { label: "Language", value: "C++17" },
      { label: "Discipline", value: "Algorithms & OOP" },
      { label: "Core Feature", value: "Ledger Audit Trail" },
    ],
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    tagline: "Responsive Web Showcase",
    description:
      "A high-performance personal developer portfolio built with Next.js, Framer Motion, and Tailwind CSS. Features dark-mode elegance, fluid animations, and responsive grids.",
    detailedDescription:
      "Designed and coded to present university computer science coursework, Saylani web development training, and frontend projects in an editorial dark aesthetic. Incorporates 3D card tilt physics, subtle particle backgrounds, and accessible responsive layouts.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    featured: true,
    githubUrl: undefined,
    liveUrl: undefined,
    image: "/images/projects/portfolio.svg",
    metrics: [
      { label: "Design", value: "Dark Editorial" },
      { label: "Performance", value: "Static Pre-rendering" },
      { label: "Accessibility", value: "Reduced Motion" },
    ],
  },
  {
    id: "todo-list-app",
    title: "To-Do List Web Application",
    tagline: "Task Management Application",
    description:
      "A responsive task-management web app with task creation, real-time status filtering (All, Active, Completed), and persistent local state.",
    detailedDescription:
      "Created during foundational frontend training to exercise DOM manipulation, array operations, event delegation, and interactive interface states. Provides instant feedback with task completion strikes and counter badges.",
    technologies: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    featured: false,
    githubUrl: undefined,
    liveUrl: undefined,
    image: "/images/projects/todo-list.svg",
    metrics: [
      { label: "Interface", value: "Dynamic Filtering" },
      { label: "State", value: "Interactive DOM" },
      { label: "Focus", value: "Core JavaScript" },
    ],
  },
];

export const focusAreasData: ServiceItem[] = [
  {
    id: "responsive-website-development",
    title: "Responsive Website Development",
    shortDescription: "Mobile-first websites that adapt smoothly across all screen sizes.",
    description:
      "Developing websites with fluid responsive layouts that look sharp and function cleanly from 320px mobile screens to large desktop monitors.",
    capabilities: [
      "Mobile-first responsive layout architecture",
      "Modern CSS Flexbox and CSS Grid implementations",
      "Touch-friendly navigation and cross-device testing",
      "Fast-loading, lightweight page structure",
    ],
    deliverables: [
      "Fully responsive multi-breakpoint layouts",
      "Cross-browser tested HTML/CSS code",
      "Clean mobile drawer and navigation menus",
    ],
    icon: "layout",
    highlighted: true,
  },
  {
    id: "frontend-ui-implementation",
    title: "Frontend UI Implementation",
    shortDescription: "Translating mockups and designs into clean, semantic web interfaces.",
    description:
      "Turning visual concepts into pixel-accurate, accessible, and structured code using semantic HTML5, modern CSS, JavaScript, and TypeScript.",
    capabilities: [
      "Semantic HTML5 tags and accessible document flow",
      "Tailwind CSS utility styling with consistent design tokens",
      "Component-driven architecture for clean reusability",
      "Structured typing with TypeScript for fewer bugs",
    ],
    deliverables: [
      "Modular, maintainable frontend components",
      "Accessible markup with keyboard navigation",
      "Type-safe component interfaces",
    ],
    icon: "code",
    highlighted: true,
  },
  {
    id: "interactive-interfaces",
    title: "Interactive Interfaces",
    shortDescription: "Polished micro-animations, form feedback, and reactive state.",
    description:
      "Adding purposeful interactivity such as smooth hover states, scroll-triggered reveals, interactive tabs, and feedback notifications that enhance usability.",
    capabilities: [
      "Micro-animations with CSS and Framer Motion",
      "Interactive state handling with JavaScript and Redux",
      "Accessible modal, dropdown, and tab interactions",
      "Full support for prefers-reduced-motion preferences",
    ],
    deliverables: [
      "Subtle, purposeful motion design",
      "Interactive forms with real-time feedback",
      "Spring-physics button and card states",
    ],
    icon: "sparkles",
    highlighted: true,
  },
  {
    id: "website-improvements",
    title: "Website Improvements & Fixes",
    shortDescription: "Code cleanup, layout bug fixing, and asset optimization.",
    description:
      "Improving existing web pages by fixing broken responsive layouts, eliminating horizontal scroll overflows, compressing heavy assets, and refining typography.",
    capabilities: [
      "Diagnosing and fixing responsive layout overflow bugs",
      "Image optimization with WebP formats and proper sizing",
      "Cleaning up cluttered CSS and consolidating classes",
      "Typography hierarchy and spacing system alignment",
    ],
    deliverables: [
      "Responsive bug fixes across 320px-1440px",
      "Optimized WebP/SVG asset delivery",
      "Streamlined, maintainable code structure",
    ],
    icon: "layers",
    highlighted: false,
  },
  {
    id: "basic-react-nextjs",
    title: "Basic React & Next.js Development",
    shortDescription: "Single-page apps and static site development with modern tools.",
    description:
      "Building clean component trees, setting up client/server boundaries, configuring routes, and managing predictable state using React and Next.js.",
    capabilities: [
      "Component breakdown, prop typing, and state lifting",
      "Next.js App Router static page generation",
      "Redux / Redux Toolkit predictable state architecture",
      "Version-controlled workflows with Git and GitHub",
    ],
    deliverables: [
      "Fast static Next.js production builds",
      "State-connected UI components",
      "Well-documented Git commit history",
    ],
    icon: "globe",
    highlighted: false,
  },
];

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Focus Areas", href: "#focus-areas" },
  { label: "Contact", href: "#contact" },
];
