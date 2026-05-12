'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { Brain, Target, Zap, Eye } from 'lucide-react'

const metrics = [
  { label: 'Trade Score', value: 87, color: '#00ff88' },
  { label: 'Psychology', value: 72, color: '#00d4ff' },
  { label: 'Discipline', value: 91, color: '#8b5cf6' },
  { label: 'Risk IQ', value: 65, color: '#f59e0b' },
]

const insights = [
  { type: 'success', text: 'Excellent risk-to-reward ratio of 1:3.2' },
  { type: 'warning', text: 'Entry timing shows slight hesitation (-5 pts)' },
  { type: 'info', text: 'Patience score improved by 12% this week' },
]

export function AIAnalysisShowcase() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-electric text-sm font-medium uppercase tracking-wider">Live Demo</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">AI Analysis in Action</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Watch as our AI analyzes a trade in real-time, extracting behavioral patterns invisible to the naked eye.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Trade Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-accent-electric/20 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-accent-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">Nifty 50 - Long</h3>
                  <p className="text-sm text-text-tertiary">Uploaded 2 minutes ago</p>
                </div>
              </div>
              
              {/* Mock Chart */}
              <div className="relative h-48 bg-bg-elevated rounded-lg mb-6 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 192">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,160 Q50,140 100,120 T200,80 T300,100 T400,40"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,160 Q50,140 100,120 T200,80 T300,100 T400,40 L400,192 L0,192 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Entry Point */}
                  <circle cx="180" cy="85" r="6" fill="#00d4ff" />
                  <text x="180" y="70" fill="#00d4ff" fontSize="10" textAnchor="middle">ENTRY</text>
                  {/* Exit Point */}
                  <circle cx="350" cy="45" r="6" fill="#00ff88" />
                  <text x="350" y="30" fill="#00ff88" fontSize="10" textAnchor="middle">EXIT</text>
                </svg>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-text-tertiary">Entry: <span className="text-text-primary">22,450</span></span>
                <span className="text-text-tertiary">Exit: <span className="text-emerald-400">22,890</span></span>
                <span className="text-text-tertiary">P&L: <span className="text-emerald-400">+₹22,000</span></span>
              </div>
            </Card>
          </motion.div>

          {/* Right - AI Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <Card variant="glass" className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center">
                      {i === 0 && <Brain className="w-5 h-5 text-accent-emerald" />}
                      {i === 1 && <Target className="w-5 h-5 text-accent-electric" />}
                      {i === 2 && <Zap className="w-5 h-5 text-accent-purple" />}
                      {i === 3 && <Eye className="w-5 h-5 text-accent-amber" />}
                    </div>
                    <span className="text-text-secondary">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-bg-elevated rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${metric.value}%`, background: metric.color }}
                      />
                    </div>
                    <span className="text-lg font-bold" style={{ color: metric.color }}>{metric.value}</span>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Insights */}
            <Card variant="glass" className="p-4">
              <h4 className="text-sm font-medium text-text-secondary mb-3">AI Insights</h4>
              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full mt-1.5 ${
                      insight.type === 'success' ? 'bg-emerald-400' :
                      insight.type === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'
                    }`} />
                    <span className="text-text-tertiary">{insight.text}</span>
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