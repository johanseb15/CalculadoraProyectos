import React from 'react';
import clsx from 'clsx';
import { theme } from '../ui/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => (
  <div
    className={clsx(
      'rounded-lg shadow',
      className
    )}
    style={{
      background: theme.colors.surface,
      padding: theme.spacing.lg,
    }}
  >
    {children}
  </div>
);

export default Card;
