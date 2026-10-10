import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/ui/fade-in';
import { Wordmark } from '@/components/ui/wordmark';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[120px] animate-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/12 blur-[100px] animate-glow delay-300" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <Wordmark variant="large" className="mb-6" />
        </FadeIn>

        <FadeIn>
          <Badge className="mb-6">
            Open Source · AI-Powered · Self-Hosted
          </Badge>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Your Infrastructure.{'\n'}
            <span className="gradient-text whitespace-nowrap">Your Agents.</span>{' '}
            Your Rules.
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
            OpenCroft is the open-source platform that lets you deploy, manage, and
            automate cloud infrastructure with AI agents — on your terms, on your
            servers. No lock-in. No compromises.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg">
              Get Started
              <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg">
              View on GitHub
            </Button>
          </div>
        </FadeIn>

        {/* Visual preview */}
        <FadeIn delay={500}>
          <div className="mt-16 relative">
            <div className="rounded-xl border border-border/50 bg-bg-secondary/80 p-1 shadow-2xl shadow-accent/5">
              <div className="rounded-lg bg-bg-card p-8 h-64 sm:h-80 flex items-center justify-center border border-border/30">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-4">
                    {[
                      { color: 'bg-accent/20 border-accent/30', dot: 'bg-accent animate-pulse', size: 'w-3 h-3 rounded-full' },
                      { color: 'bg-purple-500/20 border-purple-500/30', dot: 'bg-purple-400', size: 'w-2 h-2 rounded' },
                      { color: 'bg-emerald-500/20 border-emerald-500/30', dot: 'bg-emerald-400/60', size: 'w-4 h-4 rounded-sm' },
                    ].map((node, i) => (
                      <div
                        key={i}
                        className={`w-14 h-14 rounded-lg ${node.color} border flex items-center justify-center animate-float`}
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <div className={`${node.size} ${node.dot}`} />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted tracking-wider uppercase">Canvas Preview</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/10 blur-3xl rounded-full" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
