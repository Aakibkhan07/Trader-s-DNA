'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, ProgressRing } from '@/components/ui'
import {
  Target,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Zap,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

const winFactors = [
  { factor: 'Entry Timing', current: 68, target: 80, tips: ['Wait for candle close', 'Check volume confirmation'] },
  { factor: 'Stop Loss Placement', current: 72, target: 85, tips: ['Place at technical level', 'Never guess SL'] },
  { factor: 'Position Sizing', current: 85, target: 90, tips: ['Use fixed percentage', 'Never exceed 2%'] },
  { factor: 'Trade Selection', current: 58, target: 75, tips: ['Only trade A+ setups', 'Skip uncertain setups'] },
  { factor: 'Exit Strategy', current: 65, target: 80, tips: ['Let winners run', 'Take partial profits'] },
]

const quickWins = [
  { title: 'Add confirmation candle', impact: '+8%', difficulty: 'Easy' },
  { title: 'Move SL to breakeven early', impact: '+5%', difficulty: 'Medium' },
  { title: 'Skip trades after loss', impact: '+12%', difficulty: 'Easy' },
  { title: 'Use trailing stop', impact: '+6%', difficulty: 'Hard' },
]

const simulatedTrades = [
  { type: 'WIN', pnl: 2500, reason: 'Good entry timing' },
  { type: 'LOSS', pnl: -1200, reason: 'Early exit' },
  { type: 'WIN', pnl: 3200, reason: 'Patience paid off' },
  { type: 'WIN', pnl: 1800, reason: 'Good SL placement' },
  { type: 'LOSS', pnl: -800, reason: 'FOMO entry' },
]

export default function WinRateOptimizer() {
  const [selectedFactor, setSelectedFactor] = useState(0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Win Rate Optimizer</h1>
        <p className="text-text-secondary">Identify what\'s costing you wins and fix it</p>
      </div>

      {/* Overall Win Rate */}
      <Card variant="elevated" className="p-8 mb-8 text-center">
        <div className="flex items-center justify-center gap-12">
          <div>
            <ProgressRing value={68} size={140} strokeWidth={12} color="#00ff88" label="Current" />
            <p className="text-text-tertiary mt-2">Your Win Rate</p>
          </div>
          <div className="text-6xl font-bold text-text-tertiary">→</div>
          <div>
            <ProgressRing value={80} size={140} strokeWidth={12} color="#00d4ff" label="Target" />
            <p className="text-text-tertiary mt-2">Target Win Rate</p>
          </div>
        </div>
        <p className="text-lg text-text-secondary mt-6">
          Improve by <span className="text-accent-emerald font-bold">+12%</span> to reach your target
        </p>
      </Card>

      {/* Win Factors Analysis */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="w-5 h-5 text-accent-electric" />
            <h3 className="text-lg font-semibold">Win Rate Factors</h3>
          </div>
          <div className="space-y-4">
            {winFactors.map((factor, i) => (
              <button
                key={factor.factor}
                onClick={() => setSelectedFactor(i)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedFactor === i 
                    ? 'bg-accent-electric/10 border border-accent-electric' 
                    : 'bg-bg-elevated hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-primary">{factor.factor}</span>
                  <span className="text-sm text-text-tertiary">{factor.current}% → {factor.target}%</span>
                </div>
                <div className="h-2 bg-bg-card rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full"
                    style={{ 
                      width: `${(factor.current / factor.target) * 100}%`,
                      background: factor.current >= factor.target ? '#00ff88' : '#00d4ff'
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Factor Details */}
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold mb-4">{winFactors[selectedFactor].factor}</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-bg-elevated rounded-xl text-center">
              <p className="text-2xl font-bold text-text-primary">{winFactors[selectedFactor].current}%</p>
              <p className="text-sm text-text-tertiary">Current</p>
            </div>
            <div className="p-4 bg-bg-elevated rounded-xl text-center">
              <p className="text-2xl font-bold text-accent-emerald">{winFactors[selectedFactor].target}%</p>
              <p className="text-sm text-text-tertiary">Target</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-text-secondary font-medium mb-3">How to improve:</p>
            {winFactors[selectedFactor].tips.map((tip, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg">
                <CheckCircle className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                <span className="text-sm text-text-primary">{tip}</span>
              </div>
            ))}
          </div>

          <Button className="w-full mt-6" icon={<Zap size={16} />}>
            Generate Improvement Plan
          </Button>
        </Card>
      </div>

      {/* Quick Wins */}
      <Card variant="glass" className="p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-accent-amber" />
          <h3 className="text-lg font-semibold">Quick Wins - Highest Impact</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {quickWins.map((win, i) => (
            <div key={i} className="p-4 bg-bg-elevated rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text-primary text-sm">{win.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-accent-emerald">{win.impact}</span>
                <Badge variant={win.difficulty === 'Easy' ? 'success' : win.difficulty === 'Medium' ? 'warning' : 'danger'} size="sm">
                  {win.difficulty}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Simulated Improvement */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold mb-6">If You Apply These Fixes...</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-text-primary">68%</p>
            <p className="text-sm text-text-tertiary">Current (10 trades)</p>
            <p className="text-xl text-red-400 mt-2">-₹8,000 net</p>
          </div>
          <div className="text-6xl font-bold text-text-tertiary">→</div>
          <div className="text-center">
            <p className="text-4xl font-bold text-accent-emerald">80%</p>
            <p className="text-sm text-text-tertiary">After fixes (10 trades)</p>
            <p className="text-xl text-accent-emerald mt-2">+₹24,000 net</p>
          </div>
        </div>
        <p className="text-center text-text-secondary mt-4">
          That's a difference of <span className="text-accent-emerald font-bold">₹32,000</span> in just 10 trades!
        </p>
      </Card>
    </div>
  )
}