import { Server, Bot, Workflow, Zap } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';

const steps = [
  {
    icon: Server,
    number: '01',
    title: 'Connect Your Infrastructure',
    description:
      'Add servers, Docker hosts, cloud services as nodes on your visual canvas. Connect them with edges to define relationships.',
  },
  {
    icon: Bot,
    number: '02',
    title: 'Deploy AI Agents',
    description:
      'Spin up agents that understand your codebase and infrastructure. They read docs, manage repos, and execute complex tasks.',
  },
  {
    icon: Workflow,
    number: '03',
    title: 'Build Workflows',
    description:
      'Use the canvas to orchestrate multi-step operations. Agents handle the execution — you just describe what you need.',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Automate Everything',
    description:
      'Set up cron jobs, event triggers, and scheduled tasks. Your agents work 24/7 while you focus on what matters.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent" />
      <div className="absolute inset-0 diag-bg" />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              From zero to{' '}
              <span className="gradient-text">automated</span>{' '}
              in minutes
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div className="relative group">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-bg-card text-accent transition-all group-hover:border-accent/30 group-hover:bg-accent/5">
                  <step.icon size={24} />
                </div>
                <span className="text-xs font-mono text-text-muted">{step.number}</span>
                <h3 className="mt-1 font-semibold text-text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
