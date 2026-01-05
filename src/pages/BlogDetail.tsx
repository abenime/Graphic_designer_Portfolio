import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => api.getBlogPostBySlug(slug!),
    enabled: !!slug,
  });

  if (!post) return null;

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <article className="container mx-auto px-6 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <AnimatedText>
              <Badge className="mb-4 bg-foreground/10 text-foreground border-0">{post.category}</Badge>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
              </div>
            </AnimatedText>

            <AnimatedCard delay={0.2}>
              <img src={post.image} alt={post.title} className="w-full rounded-xl img-bw mb-12" />
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <div className="prose prose-invert prose-lg max-w-none">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-6">{paragraph}</p>
                ))}
              </div>
            </AnimatedCard>
          </article>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BlogDetail;
