import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Play, Download, Clock, BookOpen } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const courseTypes = [
  { id: 'all', label: 'All Courses' },
  { id: 'video', label: 'Video Tutorials' },
  { id: 'resource', label: 'Resources' },
];

const Courses = () => {
  const [activeType, setActiveType] = useState('all');

  const { data: courses } = useQuery({
    queryKey: ['courses', activeType],
    queryFn: () => api.getCoursesByType(activeType),
  });

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <section className="max-w-4xl mx-auto mb-16">
              <AnimatedText>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Learn Design
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  Video tutorials and downloadable resources to level up your design skills
                </p>
              </AnimatedText>
            </section>

            {/* Type Filter */}
            <AnimatedText delay={0.2} className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {courseTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setActiveType(type.id)}
                    className={cn(
                      'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                      activeType === type.id
                        ? 'bg-foreground text-background'
                        : 'glass-card text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </AnimatedText>

            {/* Courses Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {courses?.map((course, index) => (
                  <motion.div
                    key={course.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AnimatedCard delay={0}>
                      <Link to={`/courses/${course.slug}`} className="group block">
                        <div className="glass-card-hover overflow-hidden">
                          <div className="aspect-video relative overflow-hidden">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-full h-full object-cover img-bw group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-background/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {course.type === 'video' ? (
                                <Play className="w-12 h-12" />
                              ) : (
                                <Download className="w-12 h-12" />
                              )}
                            </div>
                            <Badge
                              className={cn(
                                'absolute top-4 right-4',
                                course.type === 'video'
                                  ? 'bg-foreground/90 text-background'
                                  : 'bg-accent text-foreground border border-border'
                              )}
                            >
                              {course.type === 'video' ? 'Video' : 'Resource'}
                            </Badge>
                          </div>
                          <div className="p-6">
                            <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {course.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                {course.type === 'video' ? (
                                  <>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <BookOpen className="w-3 h-3" />
                                      {course.lessons} lessons
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span>{course.fileCount} files</span>
                                    <span>{course.fileSize}</span>
                                  </>
                                )}
                              </div>
                              <span className="font-display font-bold text-lg">
                                ${course.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Courses;
