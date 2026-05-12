'use client'

import { motion } from 'framer-motion'
import { Card, ProgressRing } from '@/components/ui'
import { Dna, Activity, Heart, Target, Zap, Clock } from 'lucide-react'

const dnaComponents = [
  { icon: Heart, label: 'Emotional DNA', score: 78, desc: 'Your emotional triggers & patterns' },
  { icon: Activity, label: 'Discipline DNA', score: 85, desc: 'Rule adherence & consistency' },
  { icon: Target, label: 'Risk DNA', score: 62, desc: 'Risk management quality' },
  { icon: Zap, label: 'Execution DNA', score: 91, desc: 'Entry & exit precision' },
  { icon: Clock, label: 'Patience DNA', score: 45, desc: 'Wait time & setup quality' },
]

const behavioralFlags = [
  { label: 'Revenge Trading', status: 'detected', severity: 'high' },
  { label: 'FOMO Behavior', status: 'moderate', severity: 'medium' },
  { label: 'Over-trading', status: 'clear', severity: 'low' },
  { label: 'Fear-based Exit', status: 'detected', severity: 'medium' },
]

export function DNABreakdown() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-electric text-sm font-medium uppercase tracking-wider">Core Feature</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">DNA Breakdown</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Every trade uploads creates a detailed DNA profile that maps your behavioral patterns over time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* DNA Scores */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-electric/20 flex items-center justify-center">
                  <Dna className="w-5 h-5 text-accent-electric" />
                </div>
                <h3 className="text-lg font-semibold">Your Trading DNA</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {dnaComponents.map((component, i) => (
                  <div key={component.label} className="text-center">
                    <ProgressRing
                      value={component.score}
                      size={80}
                      strokeWidth={6}
                      color={component.score >= 80 ? '#00ff88' : component.score >= 60 ? '#00d4ff' : '#f59e0b'}
                      label=""
                    />
                    <p className="mt-2 text-sm font-medium text-text-primary">{component.label}</p>
                    <p className="text-xs text-text-tertiary">{component.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Behavioral Flags */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Behavioral Flags</h3>
            {behavioralFlags.map((flag, i) => (
              <motion.div
                key={flag.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="p-4 flex items-center justify-between">
                  <div>
                    <span className="text-text-primary font-medium">{flag.label}</span>
                    <p className="text-xs text-text-tertiary mt-1">
                      {flag.status === 'detected' && 'Behavioral pattern identified'}
                      {flag.status === 'moderate' && 'Some indicators present'}
                      {flag.status === 'clear' && 'No significant issues'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    flag.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    flag.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {flag.status}
                  </span>
                </Card>
              </motion.div>
            ))}

            <Card variant="elevated" className="p-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4 text-accent-purple" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Improvement Focus</h4>
                  <p className="text-xs text-text-tertiary mt-1">
                    Focus on patience and risk DNA for biggest improvement potential
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}