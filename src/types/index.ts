export interface Profile {
  name: string;
  logo: string;
  tagline: string;
  bio: string;
  shortBio: string;
  location: string;
  email: string;
  availability: string;
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
    awardsWon: number;
  };
  skills: {
    name: string;
    level: number;
  }[];
  tools: string[];
  timeline: {
    year: string;
    title: string;
    description: string;
  }[];
  philosophy: string;
  socialLinks: {
    instagram: string;
    behance: string;
    dribbble: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Work {
  id: string;
  title: string;
  slug: string;
  category: 'branding' | 'print' | 'digital' | 'illustration';
  client: string;
  year: string;
  thumbnail: string;
  images: string[];
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  featured: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  type: 'video' | 'resource';
  thumbnail: string;
  description: string;
  longDescription: string;
  duration?: string;
  lessons?: number;
  level?: string;
  fileSize?: string;
  fileCount?: number;
  format?: string;
  price: number;
  currency: string;
  whatYouLearn?: string[];
  includes?: string[];
  curriculum?: {
    section: string;
    lessons: string[];
  }[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  project: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}
