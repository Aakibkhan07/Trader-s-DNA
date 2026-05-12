'use client'

import { motion } from 'framer-motion'
import { Card, Badge, ProgressBar } from '@/components/ui'
import { Target, Clock, Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const disciplineMetrics = [
  { label: 'Plan Adherence', score: 92, icon: Target },
  { label: 'Time Management', score: 78, icon: Clock },
  { label: 'Risk Compliance', score: 85, icon: Shield },
]

const recentRules = [
  { rule: 'Stop Loss Placement', status: 'followed', time: '2h ago' },
  { rule: 'Position Sizing', status: 'violated', time: '5h ago' },
  { rule: 'Trading Hours', status: 'followed', time: '1d ago' },
  { rule: 'Journal Entry', status: 'skipped', time: '1d ago' },
]

export function DisciplineTracker() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/50 via-bg-primary to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-emerald text-sm font-medium uppercase tracking-wider">Behavior Tracking</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Discipline Tracker</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Monitor your rule adherence in real-time and build unshakeable trading discipline.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Main Score */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-6">Overall Discipline Score</h3>
              <div className="relative inline-block">
                <div className="text-7xl font-bold text-gradient">85</div>
                <span className="text-xl text-text-tertiary">/100</span>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-emerald/20 text-accent-emerald text-xs rounded-full">
                  +7 this week
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4">
                {disciplineMetrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <metric.icon className="w-5 h-5 mx-auto mb-2 text-accent-electric" />
                    <div className="text-lg font-bold text-text-primary">{metric.score}%</div>
                    <div className="text-xs text-text-tertiary">{metric.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Rule Adherence */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Rule Adherence</h3>
              <div className="space-y-3">
                {recentRules.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === 'followed' && (
                        <CheckCircle className="w-5 h-5 text-accent-emerald" />
                      )}
                      {item.status === 'violated' && (
                        <XCircle className="w-5 h-5 text-danger" />
                      )}
                      {item.status === 'skipped' && (
                        <AlertCircle className="w-5 h-5 text-accent-amber" />
                      )}
                      <span className="text-sm text-text-primary">{item.rule}</span>
                    </div>
                    <Badge
                      variant={item.status === 'followed' ? 'success' : item.status === 'violated' ? 'danger' : 'warning'}
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-accent-electric/10 rounded-lg border border-accent-electric/20">
                <p className="text-sm text-accent-electric">
                  <span className="font-semibold">Tip:</span> Position sizing violations decreased by 40% after implementing the 2% rule
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}