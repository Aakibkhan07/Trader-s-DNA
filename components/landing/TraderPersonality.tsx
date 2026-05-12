'use client'

import { motion } from 'framer-motion'
import { Card, Badge } from '@/components/ui'
import { Sparkles, Crosshair, Ghost, Flame, Crown, Clock, Rabbit, Shield } from 'lucide-react'

const personalities = [
  {
    type: 'Sniper Trader',
    icon: Crosshair,
    color: '#00ff88',
    description: 'Precision-focused, waits for perfect setups',
    traits: ['Patience', 'High conviction', 'Low frequency'],
    percentage: 15,
  },
  {
    type: 'Momentum Chaser',
    icon: Rabbit,
    color: '#00d4ff',
    description: 'Fasts entries, fears missing out',
    traits: ['Quick decisions', 'High energy', 'Risk tolerant'],
    percentage: 28,
  },
  {
    type: 'Revenge Trader',
    icon: Flame,
    color: '#ff3366',
    description: 'Trades to recover losses emotionally',
    traits: ['Impulsive', 'Emotional', 'High risk'],
    percentage: 12,
  },
  {
    type: 'Disciplined Trader',
    icon: Shield,
    color: '#8b5cf6',
    description: 'Follows rules, manages risk perfectly',
    traits: ['Patient', 'Systematic', 'Consistent'],
    percentage: 18,
  },
]

export function TraderPersonality() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-electric text-sm font-medium uppercase tracking-wider">AI Discovery</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Your Trading Personality</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Our AI identifies your unique trading DNA and reveals the psychological patterns driving your decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalities.map((persona, i) => (
            <motion.div
              key={persona.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                variant="glass"
                hover
                glow
                glowColor={persona.color === '#ff3366' ? 'amber' : 'cyan'}
                className="p-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${persona.color}20` }}
                >
                  <persona.icon className="w-8 h-8" style={{ color: persona.color }} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{persona.type}</h3>
                <p className="text-sm text-text-tertiary mb-4">{persona.description}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {persona.traits.map((trait) => (
                    <Badge key={trait} variant="default" size="sm">{trait}</Badge>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className="text-sm text-text-tertiary">Found in </span>
                  <span className="text-lg font-bold" style={{ color: persona.color }}>
                    {persona.percentage}%
                  </span>
                  <span className="text-sm text-text-tertiary"> of traders</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card variant="glass" className="inline-flex items-center gap-4 px-6 py-4">
            <Sparkles className="w-6 h-6 text-accent-electric" />
            <span className="text-text-secondary">Discover your personality type with just 3 trade uploads</span>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}