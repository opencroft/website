import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/fade-in';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-32">
      <FadeIn>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="relative rounded-2xl border border-border/50 bg-bg-card/50 px-8 py-16 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/10 blur-[80px] rounded-full" />

            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Ready to{' '}
              <span className="gradient-text">take control</span>?
            </h2>
            <p className="relative mt-4 text-text-secondary max-w-md mx-auto">
              Stop renting your infrastructure. Start owning it. OpenCroft
              gives you the tools and the intelligence to manage everything
              on your terms.
            </p>
            <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button size="lg">
                Get Started
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
