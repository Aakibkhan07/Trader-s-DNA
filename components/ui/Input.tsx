'use client'

import { forwardRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'

export interface InputProps {
  label?: string
  error?: string
  icon?: ReactNode
  helper?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, helper, type = 'text', placeholder, value, onChange, onKeyDown, required, disabled }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={isPassword && showPassword ? 'text' : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            required={required}
            disabled={disabled}
            className={cn(
              'w-full bg-bg-elevated border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary transition-all duration-200',
              'focus:outline-none focus:border-accent-electric focus:ring-1 focus:ring-accent-electric/50',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              icon && 'pl-10',
              isPassword && 'pr-10',
              error && 'border-danger focus:border-danger focus:ring-danger/50',
              className
            )}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        {helper && !error && <p className="mt-2 text-sm text-text-tertiary">{helper}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export interface TextareaProps {
  label?: string
  error?: string
  helper?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helper, placeholder, value, onChange, required, disabled }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={cn(
            'w-full bg-bg-elevated border border-white/10 rounded-lg px-4 py-3 text-text-primary placeholder:text-text-tertiary transition-all duration-200 min-h-[120px]',
            'focus:outline-none focus:border-accent-electric focus:ring-1 focus:ring-accent-electric/50',
            'disabled:opacity-50 disabled:cursor-not-allowed resize-none',
            error && 'border-danger focus:border-danger focus:ring-danger/50',
            className
          )}
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        {helper && !error && <p className="mt-2 text-sm text-text-tertiary">{helper}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Input, Textarea }