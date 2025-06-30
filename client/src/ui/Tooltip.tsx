import React from 'react';
import { theme } from './theme';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => (
  <span style={{ position: 'relative', display: 'inline-block' }}>
    {children}
    <span
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '100%',
        marginBottom: theme.spacing.sm,
        background: theme.colors.secondary,
        color: theme.colors.surface,
        fontSize: '0.75rem',
        borderRadius: '0.25rem',
        padding: `${theme.spacing.sm} ${theme.spacing.md}`,
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}
      className="tooltip-content"
    >
      {text}
    </span>
    <style>{`
      span:hover > .tooltip-content {
        opacity: 1 !important;
        pointer-events: auto;
      }
    `}</style>
  </span>
);

export default Tooltip;
