import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'branding', label: 'Branding' },
  { id: 'print', label: 'Print' },
  { id: 'digital', label: 'Digital' },
  { id: 'illustration', label: 'Illustration' },
];

const Works = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: works } = useQuery({
    queryKey: ['works', activeCategory],
    queryFn: () => api.getWorksByCategory(activeCategory),
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
                  My Works
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  Explore my portfolio across branding, print, digital design, and illustration
                </p>
              </AnimatedText>
            </section>

            {/* Category Filter */}
            <AnimatedText delay={0.2} className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300',
                      activeCategory === category.id
                        ? 'bg-foreground text-background'
                        : 'glass-card text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </AnimatedText>

            {/* Works Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {works?.map((work, index) => (
                  <motion.div
                    key={work.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <AnimatedCard delay={0}>
                      <Link to={`/works/${work.slug}`} className="group block">
                        <div className="glass-card-hover overflow-hidden">
                          <div className="aspect-[4/3] overflow-hidden">
                            <img
                              src={work.thumbnail}
                              alt={work.title}
                              className="w-full h-full object-cover img-bw group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                {work.category}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {work.year}
                              </span>
                            </div>
                            <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
                              {work.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {work.description}
                            </p>
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

export default Works;
