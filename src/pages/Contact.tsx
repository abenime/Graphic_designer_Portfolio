import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Send, Instagram, Linkedin } from 'lucide-react';
import Layout from '@/components/Layout';
import PageTransition from '@/components/PageTransition';
import { AnimatedText, AnimatedCard } from '@/components/AnimatedElements';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6">
            {/* Header */}
            <section className="max-w-4xl mx-auto mb-16 text-center">
              <AnimatedText>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Get In Touch
                </h1>
              </AnimatedText>
              <AnimatedText delay={0.1}>
                <p className="text-xl text-muted-foreground">
                  Have a project in mind? Let's create something amazing together.
                </p>
              </AnimatedText>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <AnimatedCard delay={0.2}>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <a
                          href={`mailto:${profile?.email}`}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {profile?.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.3}>
                  <div className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">{profile?.location}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.4}>
                  <div className="glass-card p-6">
                    <h3 className="font-semibold mb-4">Follow Me</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Instagram, href: profile?.socialLinks?.instagram },
                        { icon: Linkedin, href: profile?.socialLinks?.linkedin },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                        >
                          <social.icon className="w-5 h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>

                <AnimatedCard delay={0.5}>
                  <div className="glass-card p-6">
                    <h3 className="font-semibold mb-2">Availability</h3>
                    <p className="text-muted-foreground text-sm">
                      {profile?.availability}
                    </p>
                  </div>
                </AnimatedCard>
              </div>

              {/* Contact Form */}
              <AnimatedCard delay={0.3} className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="glass-card p-8">
                  <h2 className="font-display text-2xl font-bold mb-8">Send a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-background/50 border-border/50 focus:border-foreground/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-background/50 border-border/50 focus:border-foreground/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      required
                      className="bg-background/50 border-border/50 focus:border-foreground/50"
                    />
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      required
                      className="bg-background/50 border-border/50 focus:border-foreground/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-foreground text-background hover:bg-foreground/90"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Contact;
