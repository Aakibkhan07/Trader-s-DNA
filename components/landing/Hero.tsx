'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Brain, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-accent-electric/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-accent-emerald/10 blur-3xl"
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-electric/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-electric/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent-electric animate-pulse" />
          <span className="text-sm text-accent-electric">From Trade Metrix Technologies</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-text-primary">Turn Trades Into</span>
          <br />
          <span className="text-gradient">Consistent Profits.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
        >
          Upload your trade screenshots and get AI analysis that identifies what's costing you money — with a clear path to become consistently profitable.
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl font-semibold text-accent-chrome mb-12"
        >
          Analyze. Optimize. Profit.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/register">
            <Button size="lg" glow icon={<ArrowRight size={18} />}>
              Start Your Analysis
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="secondary" size="lg">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { icon: Brain, value: '10K+', label: 'Traders Analyzed' },
            { icon: TrendingUp, value: '95%', label: 'Accuracy Rate' },
            { icon: Shield, value: '50K+', label: 'Trades Evaluated' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-accent-electric" />
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-tertiary">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}