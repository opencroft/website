import { Heart, Star, Users, Code2 } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { Button } from '@/components/ui/button';

const stats = [
  { icon: Star, label: 'GitHub Stars', value: 'Coming Soon' },
  { icon: Users, label: 'Contributors', value: 'Growing' },
  { icon: Code2, label: 'License', value: 'MIT' },
  { icon: Heart, label: 'Built With', value: 'Open Source' },
];

export function OpenSource() {
  return (
    <section id="open-source" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent" />
      <div className="absolute inset-0 diag-bg" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Open Source
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Built in the open.{' '}
            <span className="gradient-text">Trusted by many.</span>
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            OpenCroft is and always will be open source. Fork it, extend it,
            contribute back. Built by developers, for developers.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/50 bg-bg-card/50 px-4 py-5 transition-colors hover:border-border-bright"
              >
                <stat.icon size={20} className="mx-auto mb-2 text-accent" />
                <div className="text-lg font-bold text-text-primary">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://github.com/opencroft/opencroft-dev"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-card px-5 py-2.5 text-sm font-medium text-text-primary transition-all hover:border-border-bright hover:bg-bg-card-hover"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <a
              href="https://github.com/sponsors/opencroft"
              target="_blank"
              rel="noopener"
            >
              <Button variant="secondary" size="sm">
                <Heart size={16} className="text-pink-400" />
                Sponsor
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
