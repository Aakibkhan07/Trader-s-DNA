'use client'

import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { 
  Bot, 
  Zap, 
  Shield, 
  Cpu, 
  Activity, 
  Globe,
  ArrowRight,
  Terminal
} from 'lucide-react'

export function AlgoShowcase() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-electric/5 to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="info" className="mb-4">Trade Metrix Ecosystem</Badge>
          <h2 className="text-4xl font-bold mt-2 mb-4 text-text-primary">
            Complete Algo Trading Solution
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            From strategy development to automated execution — Trade Metrix powers your entire algorithmic trading journey.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Algo Software Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" className="p-8 border-accent-electric/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-electric to-accent-emerald flex items-center justify-center">
                  <Bot className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Algo Trading Software</h3>
                  <p className="text-sm text-text-tertiary">Automated Trading Engine</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { icon: Terminal, title: 'Strategy Builder', desc: 'No-code strategy creation' },
                  { icon: Cpu, title: 'Auto Execution', desc: 'Fully automated trade execution' },
                  { icon: Shield, title: 'Risk Controls', desc: 'Built-in drawdown protection' },
                  { icon: Activity, title: 'Multi-Asset', desc: 'Stocks, F&O, Crypto' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-electric/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-accent-electric" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{feature.title}</p>
                      <p className="text-xs text-text-tertiary">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="secondary" className="w-full" icon={<Globe size={16} />}>
                Visit app.trademetrix.tech
              </Button>
            </Card>
          </motion.div>

          {/* Trader's DNA Connection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-electric flex items-center justify-center">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Trader's DNA</h3>
                  <p className="text-sm text-text-tertiary">AI Psychology & Analytics</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { icon: Activity, title: 'Psychology Analysis', desc: 'Understand your trading behavior' },
                  { icon: Zap, title: 'Strategy Optimization', desc: 'Improve win rates & profitability' },
                  { icon: Shield, title: 'Discipline Tracking', desc: 'Eliminate emotional trading' },
                  { icon: Bot, title: 'AI Mentor', desc: '24/7 personalized guidance' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-accent-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{feature.title}</p>
                      <p className="text-xs text-text-tertiary">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/auth/register">
                <Button className="w-full" icon={<ArrowRight size={16} />}>
                  Start Free Analysis
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Integration Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card variant="glass" className="p-8 text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Use Trader's DNA to Optimize Your Algo Strategies
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto mb-6">
              Analyze your algorithmic trades with AI-powered psychology insights. 
              Identify where your bots are winning and where humans are overriding — 
              then optimize for consistent profitability.
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-emerald mb-1">2-3x</div>
                <div className="text-sm text-text-tertiary">Better Strategy Performance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-electric mb-1">80%</div>
                <div className="text-sm text-text-tertiary">Reduced Emotional Overrides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-purple mb-1">24/7</div>
                <div className="text-sm text-text-tertiary">AI-Powered Insights</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}