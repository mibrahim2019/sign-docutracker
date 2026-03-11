import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full text-xs font-medium ring-1 ring-inset w-fit',
  {
    variants: {
      variant: {
        neutral: 'bg-secondary text-secondary-foreground ring-border',
        destructive: 'bg-destructive/20 text-destructive ring-destructive/40',
        warning: 'bg-warning/20 text-warning ring-warning/40',
        default: 'bg-primary text-primary-foreground ring-primary/40',
        secondary: 'bg-accent/20 text-accent-foreground ring-accent/40',
      },
      size: {
        small: 'px-1.5 py-0.5 text-xs',
        default: 'px-2 py-1.5 text-xs',
        large: 'px-3 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div role="status" className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
