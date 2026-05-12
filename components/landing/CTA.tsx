'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowRight, Sparkles, Globe } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-electric/10 to-bg-primary" />
      
      {/* Animated Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-electric/20 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-electric/20 mb-8">
            <Sparkles className="w-4 h-4 text-accent-electric" />
            <span className="text-sm text-accent-electric">Part of Trade Metrix Ecosystem</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-text-primary">Unlock Your</span>
            <br />
            <span className="text-gradient">Trading Potential</span>
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10">
            Join 10,000+ traders who have discovered their behavioral patterns and improved their performance with AI-powered psychology analysis.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/auth/register">
              <Button size="lg" glow icon={<ArrowRight size={18} />}>
                Start Free Analysis
              </Button>
            </Link>
            <a href="https://app.trademetrix.tech" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" icon={<Globe size={18} />}>
                Visit Algo Platform
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-text-tertiary">
            No credit card required • 3 free analyses • 7-day money-back guarantee
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  const links = {
    Product: ['Features', 'Pricing', 'Testimonials', 'Blog'],
    Company: ['About', 'Careers', 'Contact', 'Press'],
    Support: ['Help Center', 'Documentation', 'API', 'Status'],
    Legal: ['Privacy', 'Terms', 'Security', 'Refund'],
  }

  return (
    <footer className="py-16 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-secondary/30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-electric to-accent-emerald" />
              <span className="text-xl font-bold text-text-primary">Trader's DNA</span>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Where Psychology Meets Precision. The world's most advanced AI behavioral intelligence platform for traders.
            </p>
            <a 
              href="https://app.trademetrix.tech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent-electric hover:underline mb-2"
            >
              <Globe size={14} />
              Try our Algo Trading Software
            </a>
            <p className="text-xs text-text-tertiary">
              © 2026 Trade Metrix Technologies. All rights reserved.
            </p>
          </div>
          
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-text-primary mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            Built with ❤️ for traders everywhere
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}