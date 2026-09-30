import React from 'react';
import { cn } from './Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'brand' | 'soft';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Section({ 
  children, 
  className, 
  theme = 'light', 
  spacing = 'lg',
  ...props 
}: SectionProps) {
  
  const themes = {
    light: 'bg-white text-slate-900',
    dark: 'bg-slate-950 text-white',
    brand: 'bg-brand-900 text-white',
    soft: 'bg-slate-50 text-slate-900',
  };

  const spacings = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
    xl: 'py-32 md:py-48',
  };

  return (
    <section className={cn(themes[theme], spacings[spacing], 'relative overflow-hidden', className)} {...props}>
      {children}
    </section>
  );
}
