'use client'

import { motion } from 'framer-motion'
import { Card, Badge } from '@/components/ui'
import { BarChart3, Clock, TrendingUp, Calendar } from 'lucide-react'

const performanceData = [
  { label: 'Jan', winRate: 68, trades: 24 },
  { label: 'Feb', winRate: 72, trades: 28 },
  { label: 'Mar', winRate: 65, trades: 22 },
  { label: 'Apr', winRate: 78, trades: 30 },
  { label: 'May', winRate: 82, trades: 26 },
  { label: 'Jun', winRate: 75, trades: 28 },
]

const bestHours = [
  { time: '9:30 AM - 10:30 AM', winRate: 78, trades: 45 },
  { time: '2:00 PM - 3:00 PM', winRate: 72, trades: 38 },
  { time: '10:00 AM - 11:00 AM', winRate: 68, trades: 32 },
]

export function PerformanceGenome() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-secondary/30" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-electric text-sm font-medium uppercase tracking-wider">Analytics</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Performance Genome</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Visual analytics that reveal your peak performance windows and behavioral patterns.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Win Rate Trend</h3>
                <Badge variant="success">+8% this month</Badge>
              </div>
              
              <div className="flex items-end justify-between h-48 gap-2">
                {performanceData.map((month, i) => (
                  <div key={month.label} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${month.winRate}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-accent-electric to-accent-emerald"
                    />
                    <span className="text-xs text-text-tertiary mt-2">{month.label}</span>
                    <span className="text-xs text-text-muted">{month.winRate}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Best Trading Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-5 h-5 text-accent-electric" />
                <h3 className="text-lg font-semibold">Best Trading Hours</h3>
              </div>
              
              <div className="space-y-4">
                {bestHours.map((hour, i) => (
                  <div key={hour.time} className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        i === 0 ? 'bg-accent-emerald/20' : i === 1 ? 'bg-accent-electric/20' : 'bg-bg-card'
                      }`}>
                        <span className="text-sm font-bold text-text-primary">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm text-text-primary">{hour.time}</p>
                        <p className="text-xs text-text-tertiary">{hour.trades} trades analyzed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-accent-emerald">{hour.winRate}%</span>
                      <p className="text-xs text-text-tertiary">win rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: TrendingUp, label: 'Total P&L', value: '+₹2.4L', color: 'text-accent-emerald' },
            { icon: BarChart3, label: 'Win Rate', value: '74%', color: 'text-accent-electric' },
            { icon: Calendar, label: 'Trading Days', value: '186', color: 'text-accent-purple' },
            { icon: Clock, label: 'Avg Hold Time', value: '23m', color: 'text-accent-amber' },
          ].map((stat, i) => (
            <Card key={stat.label} variant="glass" className="p-4 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-text-tertiary">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  )
}