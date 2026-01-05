import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Star, Quote } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';

const Testimonials = () => {
  const { data: testimonials } = useQuery({
    queryKey: ['testimonials'],
    queryFn: api.getTestimonials,
  });

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <section className="max-w-4xl mx-auto mb-16 text-center">
              <AnimatedText>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Client Testimonials
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  What my clients say about working together
                </p>
              </AnimatedText>
            </section>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonials?.map((testimonial, index) => (
                <AnimatedCard key={testimonial.id} delay={0.1 * index}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card p-8 h-full flex flex-col"
                  >
                    <Quote className="w-8 h-8 text-foreground/20 mb-4" />
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating
                              ? 'fill-foreground text-foreground'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover img-bw"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">
                        Project: {testimonial.project}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Testimonials;
