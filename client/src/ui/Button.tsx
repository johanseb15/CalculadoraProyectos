import React from 'react';
import clsx from 'clsx';
import { theme } from './theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, children, style, ...props }) => {
  const baseStyle: React.CSSProperties = {
    borderRadius: '0.5rem',
    fontWeight: 600,
    fontFamily: theme.font.base,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    transition: 'background 0.2s, color 0.2s',
    outline: 'none',
    ...style,
  };
  let variantStyle: React.CSSProperties = {};
  if (variant === 'primary') {
    variantStyle = {
      background: theme.colors.primary,
      color: theme.colors.surface,
    };
  } else if (variant === 'secondary') {
    variantStyle = {
      background: theme.colors.secondary,
      color: theme.colors.surface,
    };
  } else if (variant === 'ghost') {
    variantStyle = {
      background: 'transparent',
      color: theme.colors.primary,
    };
  }
  return (
    <button
      className={clsx(className)}
      style={{ ...baseStyle, ...variantStyle }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
