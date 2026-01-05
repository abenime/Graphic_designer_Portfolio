import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Clock, BookOpen, Download, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: course } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => api.getCourseBySlug(slug!),
    enabled: !!slug,
  });

  if (!course) return null;

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <Link to="/courses" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <AnimatedText>
                  <Badge className="mb-4">{course.type === 'video' ? 'Video Course' : 'Resource Pack'}</Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                  <p className="text-muted-foreground mb-6">{course.longDescription}</p>
                </AnimatedText>

                <AnimatedCard delay={0.2}>
                  <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl img-bw mb-8" />
                </AnimatedCard>

                <AnimatedCard delay={0.3} className="glass-card p-6">
                  <h3 className="font-semibold mb-4">{course.type === 'video' ? 'What You\'ll Learn' : 'What\'s Included'}</h3>
                  <ul className="space-y-3">
                    {(course.whatYouLearn || course.includes)?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <Check className="w-5 h-5 text-foreground mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </AnimatedCard>
              </div>

              <div>
                <AnimatedCard delay={0.2} className="glass-card p-6 sticky top-24">
                  <div className="text-3xl font-bold mb-4">${course.price}</div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    {course.type === 'video' ? (
                      <>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{course.lessons} lessons</span>
                      </>
                    ) : (
                      <span>{course.fileCount} files • {course.fileSize}</span>
                    )}
                  </div>
                  <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                    {course.type === 'video' ? 'Enroll Now' : <><Download className="w-4 h-4 mr-2" />Download</>}
                  </Button>
                </AnimatedCard>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default CourseDetail;
