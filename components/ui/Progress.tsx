'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  showValue?: boolean
  label?: string
  className?: string
}

export function ProgressRing({ value, max = 100, size = 120, strokeWidth = 8, color = '#00d4ff', bgColor = '#1a1a24', showValue = true, label, className }: ProgressRingProps) {
  const [mounted, setMounted] = useState(false)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  const progress = useSpring(0, { stiffness: 100, damping: 30 })
  const offset = useTransform(progress, [0, 1], [circumference, 0])
  
  useEffect(() => {
    setMounted(true)
    const normalizedValue = Math.min(Math.max(value / max, 0), 1)
    progress.set(normalizedValue)
  }, [value, max, progress])
  
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={mounted ? { strokeDashoffset: offset } : {}}
          className="transition-all duration-500"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-text-primary">
            {mounted ? Math.round(value) : value}
          </span>
          {label && (
            <span className="text-xs text-text-tertiary mt-1">{label}</span>
          )}
        </div>
      )}
    </div>
  )
}

export interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  bgColor?: string
  showValue?: boolean
  animated?: boolean
  className?: string
}

export function ProgressBar({ value, max = 100, color = '#00d4ff', bgColor = '#1a1a24', showValue = false, animated = true, className }: ProgressBarProps) {
  const [mounted, setMounted] = useState(false)
  const percentage = (value / max) * 100
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className={cn('w-full', className)}>
      <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
        <motion.div
          initial={animated && mounted ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      {showValue && (
        <div className="mt-1 flex justify-between text-xs text-text-tertiary">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}