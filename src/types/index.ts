export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}

export interface PersonalData {
  name: string;
  title: string;
  statusText: string;
  isAvailableForHire: boolean;
  shortBio: string;
  careerObjective: string;
  fullBio?: string[];
  location: string;
  email: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export interface Skill {
  name: string;
  icon?: string;
  highlight?: boolean;
}

export interface SkillCategory {
  title: string;
  description?: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  detailedDescription?: string;
  tags?: string[];
  technologies?: string[];
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  achievements?: string[];
  technologies?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  currentSemester?: string;
  cgpa?: string;
  details?: string;
}

export interface TrainingItem {
  id: string;
  title: string;
  institution: string;
  description: string;
  period?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  deliverables?: string[];
  capabilities?: string[];
  icon?: string;
  highlighted?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

