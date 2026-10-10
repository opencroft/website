import {
  Network,
  Bot,
  Puzzle,
  Cloud,
  GitBranch,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FadeIn } from '@/components/ui/fade-in';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Network,
    title: 'Infrastructure as a Graph',
    description:
      'Visualize your entire infrastructure as connected nodes on a canvas. Servers, containers, volumes, services — all linked, all visible, all under your control.',
  },
  {
    icon: Bot,
    title: 'AI Agents That Actually Work',
    description:
      'Deploy autonomous AI agents that understand your codebase, manage your infrastructure, and execute tasks through natural conversation.',
  },
  {
    icon: Puzzle,
    title: 'Extend Everything',
    description:
      'Built on a powerful extension system. Create custom node types, agent tools, and integrations. Share with the community or keep them private.',
  },
  {
    icon: Cloud,
    title: 'Self-Hosted. Always.',
    description:
      'Your infrastructure, your data, your rules. OpenCroft runs on your servers — no cloud lock-in, no data sharing, no surprises.',
  },
  {
    icon: GitBranch,
    title: 'GitOps Native',
    description:
      'Built-in Git integration with Forgejo. Manage issues, review pull requests, and merge code — all from your agent\'s workspace.',
  },
  {
    icon: Shield,
    title: 'Secrets & Security',
    description:
      'Centralized secrets management with encrypted storage. Your credentials stay on your infrastructure, never leave your perimeter.',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 dots-bg" />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
              Features
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to{' '}
              <span className="gradient-text">own your cloud</span>
            </h2>
            <p className="mt-4 text-text-secondary max-w-xl mx-auto">
              A complete platform for infrastructure management, powered by AI
              agents that understand your intent and execute with precision.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 80}>
              <Card className="group h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <feature.icon size={20} />
                </div>
                <h3 className="mb-2 font-semibold text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
