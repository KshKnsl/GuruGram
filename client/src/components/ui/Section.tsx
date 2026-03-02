import { ReactNode } from 'react';

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-block w-6 h-px bg-amber-500 shrink-0" />
      <span className="text-xs font-medium tracking-widest uppercase text-amber-500">
        {children}
      </span>
    </div>
  );
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif-display text-4xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900 dark:text-stone-100 ${className || ''}`}>
      {children}
    </h2>
  );
}
