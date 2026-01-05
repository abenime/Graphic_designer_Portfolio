import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const { data: posts } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: api.getBlogPosts,
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
                  Blog & Articles
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  Thoughts on design, creativity, and the craft of visual storytelling
                </p>
              </AnimatedText>
            </section>

            {/* Featured Post */}
            {posts && posts[0] && (
              <AnimatedCard delay={0.2} className="mb-16">
                <Link to={`/blog/${posts[0].slug}`} className="group block">
                  <div className="glass-card-hover overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
                      <img
                        src={posts[0].image}
                        alt={posts[0].title}
                        className="w-full h-full object-cover img-bw group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 bg-foreground/10 text-foreground border-0">
                        {posts[0].category}
                      </Badge>
                      <h2 className="font-display text-2xl lg:text-3xl font-bold mb-4 group-hover:text-foreground/80 transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {posts[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(posts[0].date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {posts[0].readTime}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-2 font-medium group-hover:gap-4 transition-all">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedCard>
            )}

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.slice(1).map((post, index) => (
                <AnimatedCard key={post.id} delay={0.1 * index}>
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="glass-card-hover overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover img-bw group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-6">
                        <Badge className="mb-3 bg-foreground/10 text-foreground border-0 text-xs">
                          {post.category}
                        </Badge>
                        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-foreground/80 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Blog;
