import { Work, Course, Testimonial, BlogPost, Profile } from '@/types';
import profileData from '@/data/profile.json';
import worksData from '@/data/works.json';
import coursesData from '@/data/courses.json';
import testimonialsData from '@/data/testimonials.json';
import blogData from '@/data/blog.json';

// Simulate API delay for realistic loading states
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Profile
  async getProfile(): Promise<Profile> {
    await delay(100);
    return profileData as Profile;
  },

  // Works
  async getWorks(): Promise<Work[]> {
    await delay(150);
    return worksData as Work[];
  },

  async getFeaturedWorks(): Promise<Work[]> {
    await delay(100);
    return (worksData as Work[]).filter(work => work.featured);
  },

  async getWorkBySlug(slug: string): Promise<Work | undefined> {
    await delay(100);
    return (worksData as Work[]).find(work => work.slug === slug);
  },

  async getWorksByCategory(category: string): Promise<Work[]> {
    await delay(100);
    if (category === 'all') return worksData as Work[];
    return (worksData as Work[]).filter(work => work.category === category);
  },

  // Courses
  async getCourses(): Promise<Course[]> {
    await delay(150);
    return coursesData as Course[];
  },

  async getFeaturedCourses(): Promise<Course[]> {
    await delay(100);
    return (coursesData as Course[]).filter(course => course.featured);
  },

  async getCourseBySlug(slug: string): Promise<Course | undefined> {
    await delay(100);
    return (coursesData as Course[]).find(course => course.slug === slug);
  },

  async getCoursesByType(type: string): Promise<Course[]> {
    await delay(100);
    if (type === 'all') return coursesData as Course[];
    return (coursesData as Course[]).filter(course => course.type === type);
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    await delay(150);
    return testimonialsData as Testimonial[];
  },

  // Blog
  async getBlogPosts(): Promise<BlogPost[]> {
    await delay(150);
    return blogData as BlogPost[];
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    await delay(100);
    return (blogData as BlogPost[]).find(post => post.slug === slug);
  },

  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    await delay(100);
    if (category === 'all') return blogData as BlogPost[];
    return (blogData as BlogPost[]).filter(post => post.category === category);
  },
};
