import { cn } from '@/lib/utils';

interface WordmarkProps {
  variant?: 'large' | 'medium' | 'small';
  className?: string;
}

function Word() {
  return (
    <>
      Open<span className="text-accent">Croft</span>
    </>
  );
}

export function Wordmark({ variant = 'small', className }: WordmarkProps) {
  if (variant === 'large') {
    return (
      <div className={cn('inline-flex items-center gap-2 text-left', className)}>
        <img src="/logo-on-dark.svg" alt="OpenCroft" className="h-24 w-24" />
        <div className="flex flex-col leading-[1.05]">
          <span className="text-[2.6rem] font-bold tracking-[-0.03em] text-text-primary">
            <Word />
          </span>
          <span className="mt-[6px] text-[0.9rem] font-medium uppercase tracking-[0.1em] text-text-secondary">
            Infrastructure, Meet Intelligence
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'medium') {
    return (
      <div className={cn('inline-flex items-center gap-1 text-left', className)}>
        <img src="/logo-on-dark.svg" alt="OpenCroft" className="h-16 w-16" />
        <div className="flex flex-col leading-[1.1]">
          <span className="text-[1.85rem] font-bold tracking-[-0.03em] text-text-primary">
            <Word />
          </span>
          <span className="mt-[5px] text-[0.72rem] font-medium uppercase tracking-[0.06em] text-text-secondary">
            Infrastructure, Meet Intelligence
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <img src="/logo-on-dark.svg" alt="OpenCroft" className="h-6 w-6" />
      <span className="font-bold text-text-primary">
        <Word />
      </span>
    </div>
  );
}
