'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { Menu, X, Dna } from 'lucide-react'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="mx-auto max-w-7xl px-6 py-4"
      >
        <div className="flex items-center justify-between rounded-full glass px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-electric to-accent-emerald flex items-center justify-center">
              <Dna className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-bold text-text-primary">Trader's DNA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass rounded-2xl p-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-3 text-text-secondary hover:text-text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full">Log In</Button>
              </Link>
              <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </nav>
  )
}