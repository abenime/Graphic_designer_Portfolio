import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Mail, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Progress } from '@/components/ui/progress';

const About = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  });

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <section className="max-w-4xl mx-auto mb-20">
              <AnimatedText>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  About Me
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  {profile?.tagline}
                </p>
              </AnimatedText>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Profile Image & Quick Info */}
              <div className="lg:col-span-1">
                <AnimatedCard delay={0.2}>
                  <div className="glass-card p-6 sticky top-24">
                    <div className="aspect-square rounded-xl overflow-hidden mb-6">
                      <img
                        src="zion.jpg"
                        alt={profile?.name}
                        className="w-full h-full object-cover img-bw"
                      />
                    </div>
                    <h2 className="font-display text-2xl font-bold mb-2">{profile?.name}</h2>
                    <p className="text-muted-foreground mb-6">{profile?.tagline}</p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{profile?.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span>{profile?.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{profile?.availability}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>

              {/* Bio & Details */}
              <div className="lg:col-span-2 space-y-12">
                {/* Bio */}
                <AnimatedText delay={0.3}>
                  <div className="glass-card p-8">
                    <h3 className="font-display text-xl font-semibold mb-4">My Story</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {profile?.bio}
                    </p>
                  </div>
                </AnimatedText>

                {/* Philosophy */}
                <AnimatedText delay={0.4}>
                  <div className="glass-card p-8">
                    <h3 className="font-display text-xl font-semibold mb-4">Design Philosophy</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg italic">
                      "{profile?.philosophy}"
                    </p>
                  </div>
                </AnimatedText>

                {/* Skills */}
                <AnimatedCard delay={0.5}>
                  <div className="glass-card p-8">
                    <h3 className="font-display text-xl font-semibold mb-6">Skills</h3>
                    <div className="space-y-6">
                      {profile?.skills?.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2 bg-muted" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>

                {/* Tools */}
                <AnimatedCard delay={0.6}>
                  <div className="glass-card p-8">
                    <h3 className="font-display text-xl font-semibold mb-6">Tools I Use</h3>
                    <div className="flex flex-wrap gap-3">
                      {profile?.tools?.map((tool, index) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.05 }}
                          className="px-4 py-2 glass-card text-sm font-medium"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>

                {/* Timeline */}
                <AnimatedCard delay={0.7}>
                  <div className="glass-card p-8">
                    <h3 className="font-display text-xl font-semibold mb-6">Journey</h3>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50" />
                      <div className="space-y-8">
                        {profile?.timeline?.map((item, index) => (
                          <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="relative pl-10"
                          >
                            <div className="absolute left-2 w-4 h-4 bg-foreground rounded-full border-4 border-background" />
                            <span className="text-sm text-muted-foreground block mb-1">{item.year}</span>
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default About;
