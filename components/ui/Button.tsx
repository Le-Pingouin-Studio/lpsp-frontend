"use client";

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    let baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2';
    
    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-primary text-on-primary hover:bg-primary-dark shadow-sm hover:shadow-md';
        break;
      case 'secondary':
        variantStyles = 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-on-primary';
        break;
      case 'ghost':
        variantStyles = 'bg-transparent text-primary hover:bg-surface-dim';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'h-8 px-3 text-sm';
        break;
      case 'md':
        sizeStyles = 'h-10 px-4 py-2';
        break;
      case 'lg':
        sizeStyles = 'h-12 px-8 text-lg';
        break;
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
