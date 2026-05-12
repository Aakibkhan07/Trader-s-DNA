'use client'

import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: ReactNode
  glow?: boolean
  children?: ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  className?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, icon, glow, children, disabled, type = 'button', onClick }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-accent-electric to-cyan-500 text-black hover:shadow-glow-cyan focus:ring-accent-electric',
      secondary: 'bg-bg-elevated border border-white/10 text-text-primary hover:bg-white/5 focus:ring-white/20',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5 focus:ring-white/20',
      danger: 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 focus:ring-red-500',
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 focus:ring-emerald-500',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2',
    }
    
    return (
      <motion.button
        ref={ref}
        type={type}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glow && 'shadow-glow-cyan',
          className
        )}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }