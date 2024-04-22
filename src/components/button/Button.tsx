import React from 'react';
import styles from './button.module.css';
import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'outlined';

export interface ButtonProps extends React.ComponentProps<'button'> {
  variant: ButtonVariant;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...props }, ref) => (
    <button
      className={clsx(styles.button, styles[variant], className)}
      type="button"
      {...props}
      ref={ref}>
      <span>{children}</span>
    </button>
  ),
);
