'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface CardProps {
  variant?: 'default' | 'glass' | 'elevated'
  hover?: boolean
  glow?: boolean
  glowColor?: 'cyan' | 'green' | 'purple' | 'amber'
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ className, variant = 'default', hover = false, glow = false, glowColor = 'cyan', children, onClick }: CardProps) {
  const baseStyles = 'rounded-xl transition-all duration-300'
  
  const variants = {
    default: 'bg-bg-card border border-white/5',
    glass: 'glass-card',
    elevated: 'bg-bg-elevated border border-white/10 shadow-lg',
  }
  
  const glows = {
    cyan: 'hover:shadow-glow-cyan',
    green: 'hover:shadow-glow-green',
    purple: 'hover:shadow-glow-purple',
    amber: 'hover:shadow-glow-amber',
  }
  
  if (hover || glow) {
    return (
      <motion.div
        whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={cn(
          baseStyles,
          variants[variant],
          glow && glows[glowColor],
          className
        )}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }
  
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export interface CardHeaderProps {
  children?: ReactNode
  className?: string
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-0', className)}>
      {children}
    </div>
  )
}

export interface CardContentProps {
  children?: ReactNode
  className?: string
}

export function CardContent({ className, children }: CardContentProps) {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  )
}

export interface CardFooterProps {
  children?: ReactNode
  className?: string
}

export function CardFooter({ className, children }: CardFooterProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  )
}