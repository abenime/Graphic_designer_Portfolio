import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageTransition from "@/components/PageTransition";
import { AnimatedText, AnimatedCard } from "@/components/AnimatedElements";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const WorkDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: work } = useQuery({
    queryKey: ["work", slug],
    queryFn: () => api.getWorkBySlug(slug!),
    enabled: !!slug,
  });

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const imagesLength = work?.images?.length ?? 0;

  const nextImage = useCallback(() => {
    if (imagesLength <= 0) return;
    setActiveIndex((i) => (i + 1) % imagesLength);
  }, [imagesLength]);

  const prevImage = useCallback(() => {
    if (imagesLength <= 0) return;
    setActiveIndex((i) => (i - 1 + imagesLength) % imagesLength);
  }, [imagesLength]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, nextImage, prevImage]);

  if (!work) return null;

  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen py-20">
          <div className="container mx-auto px-6 max-w-5xl">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Works
            </Link>

            <AnimatedText>
              <Badge className="mb-4 bg-foreground/10 text-foreground border-0">
                {work.category}
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {work.title}
              </h1>
              <p className="text-muted-foreground mb-8">
                {work.client} • {work.year}
              </p>
            </AnimatedText>

            <AnimatedCard delay={0.2} className="mb-12">
              <img
                src={work.images[0]}
                alt={work.title}
                className="w-full rounded-xl img-bw cursor-zoom-in"
                onClick={() => openLightbox(0)}
              />
            </AnimatedCard>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <AnimatedCard delay={0.3} className="glass-card p-6">
                <h3 className="font-semibold mb-2">Challenge</h3>
                <p className="text-muted-foreground text-sm">
                  {work.challenge}
                </p>
              </AnimatedCard>
              <AnimatedCard delay={0.4} className="glass-card p-6">
                <h3 className="font-semibold mb-2">Solution</h3>
                <p className="text-muted-foreground text-sm">{work.solution}</p>
              </AnimatedCard>
              <AnimatedCard delay={0.5} className="glass-card p-6">
                <h3 className="font-semibold mb-2">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {work.services.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </AnimatedCard>
            </div>

            <div className="grid gap-6">
              {work.images.slice(1).map((img, i) => (
                <AnimatedCard key={i} delay={0.3 + i * 0.1}>
                  <img
                    src={img}
                    alt={`${work.title} ${i + 2}`}
                    className="w-full rounded-xl img-bw cursor-zoom-in"
                    onClick={() => openLightbox(i + 1)}
                  />
                </AnimatedCard>
              ))}
            </div>

            {/* Lightbox Modal */}
            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
              <DialogContent className="max-w-5xl w-[92vw] bg-transparent border-0 p-0">
                <div className="relative">
                  <img
                    src={work.images[activeIndex]}
                    alt={`${work.title} ${activeIndex + 1}`}
                    className="w-full h-auto rounded-xl"
                  />
                  <button
                    aria-label="Previous image"
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 nav-button p-3"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 nav-button p-3"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default WorkDetail;
