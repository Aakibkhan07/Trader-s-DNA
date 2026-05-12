'use client'

import { Fragment, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
}

export function Modal({ isOpen, onClose, title, description, children, size = 'md', showClose = true }: ModalProps) {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'w-full glass-card p-6 relative',
                sizes[size]
              )}
            >
              {showClose && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              {title && (
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-text-secondary mb-4">
                  {description}
                </p>
              )}
              {children}
            </motion.div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  )
}