// ============================================
// Portfolio Data Types — intellect.json schema
// ============================================

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  university: string;
  cgpa: string;
  gradYear: string;
  contact: Contact;
  philosophy: string[];
}

export interface Stat {
  label: string;
  value: string;
  context: string;
}

export interface SkillDomain {
  vision: string[];
  nlp: string[];
  mlCore: string[];
  infra: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  focus: string;
  stack: string[];
  impact: string;
  details?: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ArchitectureStep {
  step: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem_statement: string;
  my_specific_contribution: string;
  description: string;
  signal: string;
  flagship: boolean;
  impact_metric: string;
  metrics: ProjectMetric[];
  tech_used: string[];
  architectureFlow?: ArchitectureStep[];
  github?: string;
  demo?: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  verifiable: boolean;
}

export interface IntellectData {
  profile: Profile;
  stats: Stat[];
  skills: SkillDomain;
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
}
