import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import ParticleBackground from '@/components/ParticleBackground';
import { AnimatedText, AnimatedCard, FloatingElement } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  });

  const { data: featuredWorks } = useQuery({
    queryKey: ['featuredWorks'],
    queryFn: api.getFeaturedWorks,
  });

  return (
    <Layout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground className="z-0" />
          
          <div className="relative z-10 container mx-auto px-6 py-20 text-center">
            <FloatingElement duration={8}>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">{profile?.availability || 'Available for projects'}</span>
              </motion.div>
            </FloatingElement>

            <AnimatedText delay={0.3}>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text">
                {profile?.logo || 'Abenime'}
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                {profile?.tagline || 'Graphics Designer & Visual Storyteller'}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.5}>
              <p className="text-base text-muted-foreground/70 mb-12 max-w-xl mx-auto">
                {profile?.shortBio || 'Creating visual stories that captivate and inspire.'}
              </p>
            </AnimatedText>

            <AnimatedText delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/works">
                  <Button size="lg" className="group glass-card hover:bg-foreground hover:text-background transition-all duration-300">
                    View My Work
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-foreground/30 hover:border-foreground/60">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </AnimatedText>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-foreground rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: profile?.stats?.yearsExperience || 8, label: 'Years Experience' },
                { value: profile?.stats?.projectsCompleted || 150, label: 'Projects Completed' },
                { value: profile?.stats?.happyClients || 80, label: 'Happy Clients' },
                { value: profile?.stats?.awardsWon || 12, label: 'Awards Won' },
              ].map((stat, index) => (
                <AnimatedCard key={stat.label} delay={0.1 * index} className="text-center glass-card p-6">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="block text-4xl md:text-5xl font-display font-bold mb-2"
                  >
                    {stat.value}+
                  </motion.span>
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Works Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6">
            <AnimatedText className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Featured Works</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A selection of projects that showcase my approach to design
              </p>
            </AnimatedText>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredWorks?.slice(0, 4).map((work, index) => (
                <AnimatedCard key={work.id} delay={0.1 * index}>
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
                        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
                          {work.category}
                        </span>
                        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-foreground/80 transition-colors">
                          {work.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>

            <AnimatedText delay={0.5} className="text-center mt-12">
              <Link to="/works">
                <Button variant="outline" size="lg" className="group border-foreground/30 hover:border-foreground/60">
                  View All Works
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </AnimatedText>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-6 text-center">
            <AnimatedText>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Let's Create Something
                <br />
                <span className="text-gradient">Amazing Together</span>
              </h2>
            </AnimatedText>
            <AnimatedText delay={0.2}>
              <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <Link to="/contact">
                <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                  Start a Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </AnimatedText>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/30">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="font-display font-bold text-lg">Abenime</span>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Abenezer Tilahun. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </PageTransition>
    </Layout>
  );
};

export default Index;
