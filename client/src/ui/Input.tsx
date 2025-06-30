import React from 'react';
import { theme } from './theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, style, ...props }) => (
  <div style={{ marginBottom: theme.spacing.md }}>
    {label && <label style={{ display: 'block', marginBottom: theme.spacing.sm, fontWeight: 500, color: theme.colors.secondary }}>{label}</label>}
    <input
      style={{
        width: '100%',
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        border: `1px solid ${error ? theme.colors.error : '#d1d5db'}`,
        borderRadius: '0.375rem',
        outline: 'none',
        fontFamily: theme.font.base,
        fontSize: '1rem',
        transition: 'border 0.2s',
        ...style,
      }}
      className={className}
      {...props}
    />
    {error && <span style={{ color: theme.colors.error, fontSize: '0.85rem', marginTop: theme.spacing.sm, display: 'block' }}>{error}</span>}
  </div>
);

export default Input;
