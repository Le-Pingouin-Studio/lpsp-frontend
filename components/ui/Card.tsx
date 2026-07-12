import { HTMLAttributes, forwardRef } from 'react';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-surface rounded-2xl border border-outline-variant shadow-[0_4px_12px_rgba(45,71,62,0.08)] overflow-hidden transition-all hover:shadow-[0_8px_24px_rgba(45,71,62,0.12)] hover:-translate-y-1 ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
