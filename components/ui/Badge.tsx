import { HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'neutral';
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'neutral', ...props }, ref) => {
    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-primary/10 text-primary-dark';
        break;
      case 'secondary':
        variantStyles = 'bg-secondary/10 text-secondary-dark';
        break;
      case 'neutral':
        variantStyles = 'bg-surface-dim text-on-surface-variant';
        break;
    }

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles} ${className}`}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
