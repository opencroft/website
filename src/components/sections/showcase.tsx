import { FadeIn } from '@/components/ui/fade-in';

export function Showcase() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 dots-bg" />
      <div className="relative mx-auto max-w-6xl px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
              Built for Developers
            </p>
            <h2 className="text-3xl font-bold sm:text-4xl">
              One platform.{' '}
              <span className="gradient-text">Infinite possibilities.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Canvas demo */}
          <FadeIn delay={100}>
            <div className="rounded-xl border border-border/50 bg-bg-secondary/50 p-6 space-y-4 h-full">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Canvas — Infrastructure Graph
              </div>
              <div className="rounded-lg border border-border/30 bg-bg-card/50 p-4 space-y-4">
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { label: 'Docker', color: 'bg-blue-500/20 border-blue-500/30 text-blue-300' },
                    { label: 'Server', color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' },
                    { label: 'Volume', color: 'bg-amber-500/20 border-amber-500/30 text-amber-300' },
                    { label: 'App', color: 'bg-purple-500/20 border-purple-500/30 text-purple-300' },
                    { label: 'Secrets', color: 'bg-red-500/20 border-red-500/30 text-red-300' },
                  ].map((node) => (
                    <div
                      key={node.label}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${node.color} transition-transform hover:scale-105`}
                    >
                      {node.label}
                    </div>
                  ))}
                </div>
                <div className="text-center text-xs text-text-muted">
                  Connect · Deploy · Manage
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Agent chat demo */}
          <FadeIn delay={200}>
            <div className="rounded-xl border border-border/50 bg-bg-secondary/50 p-6 space-y-4 h-full">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
                Agent — Natural Language Interface
              </div>
              <div className="rounded-lg border border-border/30 bg-bg-card/50 p-4 space-y-3 font-mono text-xs">
                <div className="flex gap-2">
                  <span className="text-text-muted shrink-0">you:</span>
                  <span className="text-text-secondary">Deploy the API to staging</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent shrink-0">agent:</span>
                  <span className="text-text-primary">
                    Building image... Starting container on staging-server. Health check passing.
                    <span className="text-emerald-400"> ✓ Deployed</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-text-muted shrink-0">you:</span>
                  <span className="text-text-secondary">Run migrations and open a PR</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-accent shrink-0">agent:</span>
                  <span className="text-text-primary">
                    Migrations applied. PR #42 created with schema changes.
                    <span className="text-emerald-400"> ✓ Done</span>
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Extension API */}
          <FadeIn delay={100} className="lg:col-span-2">
            <div className="rounded-xl border border-border/50 bg-bg-secondary/50 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                Extension API — Build Your Own Nodes
              </div>
              <div className="rounded-lg border border-border/30 bg-bg-card/50 p-4 overflow-x-auto">
                <pre className="font-mono text-xs text-text-secondary leading-relaxed">
                  <code>{`import { defineExtension } from '@ext/host';

export default defineExtension({
  manifest: { id: 'local/my-node' },
  nodes: [{
    typeId: 'my-service',
    name: 'My Service',
    handles: { input: ['data-in'], output: ['data-out'] },
    async onStart(ctx) {
      ctx.log('Service started');
    },
  }],
});`}</code>
                </pre>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
