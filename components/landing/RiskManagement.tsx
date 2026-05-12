'use client'

import { motion } from 'framer-motion'
import { Card, Badge, ProgressBar } from '@/components/ui'
import { Shield, AlertTriangle, TrendingDown, DollarSign, Activity } from 'lucide-react'

const riskMetrics = [
  { label: 'Risk Score', value: 72, status: 'good', icon: Shield },
  { label: 'Max Drawdown', value: '8.5%', status: 'warning', icon: TrendingDown },
  { label: 'Risk/Reward Avg', value: '1:2.4', status: 'good', icon: DollarSign },
  { label: 'Position Size', value: '2.1%', status: 'good', icon: Activity },
]

const riskAlerts = [
  { type: 'position', message: 'Position size exceeds 2% on Nifty trade', severity: 'high' },
  { type: 'correlation', message: 'High correlation across open positions', severity: 'medium' },
  { type: 'time', message: 'Trading during high volatility period', severity: 'low' },
]

export function RiskManagement() {
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
          <span className="text-accent-amber text-sm font-medium uppercase tracking-wider">Protection</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Risk Management AI</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Real-time risk monitoring that protects your capital and prevents catastrophic losses.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          {riskMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" className="p-5 text-center">
                <metric.icon className={`w-6 h-6 mx-auto mb-3 ${
                  metric.status === 'good' ? 'text-accent-emerald' : 'text-accent-amber'
                }`} />
                <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
                <div className="text-xs text-text-tertiary mt-1">{metric.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-semibold mb-6">Portfolio Risk Distribution</h3>
              <div className="space-y-4">
                {[
                  { label: 'Conservative', value: 35, color: '#00ff88' },
                  { label: 'Moderate', value: 45, color: '#00d4ff' },
                  { label: 'Aggressive', value: 20, color: '#f59e0b' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="text-text-primary font-medium">{item.value}%</span>
                    </div>
                    <ProgressBar value={item.value} color={item.color} />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Live Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-accent-amber" />
                <h3 className="text-lg font-semibold">Live Risk Alerts</h3>
              </div>
              <div className="space-y-3">
                {riskAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border ${
                      alert.severity === 'high' ? 'bg-red-500/10 border-red-500/20' :
                      alert.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/20' :
                      'bg-bg-elevated border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">{alert.message}</span>
                      <Badge
                        variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}