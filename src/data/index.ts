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
  location: "Safdarabad, District Sheikhupura, Punjab, Pakistan",
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
    period: "Currently Enrolled (5th Semester)",
    details:
      "Pursuing computer science degree with academic focus on programming fundamentals, object-oriented programming, and data structures & algorithms.",
  },
];

export const trainingData: TrainingItem[] = [
  {
    id: "saylani-web-dev",
    title: "Web Development Training",
    institution: "Saylani Welfare Trust",
    description:
      "Completed practical web development training focused on frontend development, coding fundamentals, and projects.",
    period: "Practical Training",
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
      "Developed a workspace management web project with a modern, responsive interface.",
    technologies: ["Web Technologies", "Responsive Design"],
    featured: true,
    githubUrl:
      "https://github.com/Usman-CyberCode/workspace-manager-hackathon-project",
    liveUrl: undefined,
  },
  {
    id: "redux-counter",
    title: "Redux Counter",
    tagline: "State Management Implementation",
    description:
      "Built a state-management application implementing Redux for predictable state handling and interactive counter mechanics.",
    technologies: ["Redux / Redux Toolkit", "JavaScript"],
    featured: true,
    githubUrl: "https://github.com/Usman-CyberCode/redux-counter",
    liveUrl: undefined,
  },
  {
    id: "atm-clone",
    title: "ATM Clone",
    tagline: "Application System",
    description:
      "Built an ATM clone with login, balance, deposit, withdrawal, and transaction history functionality.",
    technologies: ["C++", "Programming Fundamentals"],
    featured: false,
    githubUrl: undefined, // No link provided yet
    liveUrl: undefined,
  },
  {
    id: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    tagline: "Responsive Web Showcase",
    description:
      "Created a responsive portfolio website showcasing skills, education, and projects.",
    technologies: ["TypeScript", "HTML", "CSS"],
    featured: false,
    githubUrl: undefined, // No link provided yet
    liveUrl: undefined,
  },
  {
    id: "todo-list-app",
    title: "To-Do List Web Application",
    tagline: "Task Management Application",
    description:
      "Built a task-management application with add, delete, and mark-as-complete functionality.",
    technologies: ["JavaScript", "HTML", "CSS"],
    featured: false,
    githubUrl: undefined, // No link provided yet
    liveUrl: undefined,
  },
];

export const focusAreasData: ServiceItem[] = [
  {
    id: "frontend-development",
    title: "Frontend Web Development",
    description:
      "Constructing clean, structured web applications utilizing HTML, CSS, JavaScript, and TypeScript with attention to code maintainability.",
    capabilities: [
      "Semantic HTML & modern CSS layouts",
      "Interactive JavaScript & TypeScript scripting",
      "Component-based development mindset",
    ],
    icon: "code",
  },
  {
    id: "responsive-interfaces",
    title: "Responsive Web Interfaces",
    description:
      "Crafting user interfaces that adapt fluently across desktop monitors, laptops, tablets, and smartphones.",
    capabilities: [
      "Mobile-first responsive design",
      "Flexbox and CSS Grid layout structures",
      "Smooth visual transitions and accessibility",
    ],
    icon: "layout",
  },
  {
    id: "basic-react-nextjs",
    title: "Basic React / Next.js Development",
    description:
      "Building modular, modern UI components and single-page experiences using React and Next.js ecosystems.",
    capabilities: [
      "Component breakdown and props flow",
      "Modern routing and responsive styling",
      "Integration of interactive state",
    ],
    icon: "layers",
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    description:
      "Designing responsive personal and developer portfolios that clearly present academic background, skills, and projects.",
    capabilities: [
      "Tailored layout & modern typography",
      "Curated project presentation cards",
      "Fast, lightweight performance",
    ],
    icon: "globe",
  },
  {
    id: "learning-focused-projects",
    title: "Learning-Focused Web Projects",
    description:
      "Passionate about diving into team hackathons, collaborative codebases, and internship tasks to solve real-world problems.",
    capabilities: [
      "Rapidly adopting new technologies and tools",
      "C++ algorithmic thinking & problem solving",
      "Version control workflows using Git & GitHub",
    ],
    icon: "sparkles",
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
