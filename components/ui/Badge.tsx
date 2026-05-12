'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'
  size?: 'sm' | 'md'
  glow?: boolean
  children?: ReactNode
  className?: string
}

export function Badge({ className, variant = 'default', size = 'md', glow = false, children }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-text-secondary',
    success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    purple: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
  }
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  }
  
  const glows = {
    default: '',
    success: 'shadow-[0_0_12px_rgba(16,185,129,0.3)]',
    warning: 'shadow-[0_0_12px_rgba(251,191,36,0.3)]',
    danger: 'shadow-[0_0_12px_rgba(239,68,68,0.3)]',
    info: 'shadow-[0_0_12px_rgba(6,182,212,0.3)]',
    purple: 'shadow-[0_0_12px_rgba(139,92,246,0.3)]',
  }
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        glow && glows[variant],
        className
      )}
    >
      {children}
    </span>
  )
}