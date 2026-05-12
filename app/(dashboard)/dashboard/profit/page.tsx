'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, Input, ProgressBar } from '@/components/ui'
import {
  DollarSign,
  TrendingUp,
  Target,
  Calculator,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  PieChart,
} from 'lucide-react'

const profitMetrics = [
  { label: 'Total P&L', value: '₹2,45,000', change: '+18%', positive: true, icon: DollarSign },
  { label: 'Monthly Avg', value: '₹48,500', change: '+12%', positive: true, icon: TrendingUp },
  { label: 'Win Rate', value: '68%', change: '+5%', positive: true, icon: Target },
  { label: 'Risk:Reward', value: '1:2.4', change: '+0.3', positive: true, icon: PieChart },
]

const weeklyPnl = [
  { day: 'Mon', pnl: 8500 },
  { day: 'Tue', pnl: -3200 },
  { day: 'Wed', pnl: 12700 },
  { day: 'Thu', pnl: 4800 },
  { day: 'Fri', pnl: 9200 },
]

const topStrategies = [
  { name: 'Nifty Intraday', wins: 12, losses: 4, winRate: 75, avgWin: 4200, avgLoss: 1800 },
  { name: 'BankNifty Options', wins: 8, losses: 6, winRate: 57, avgWin: 8500, avgLoss: 3200 },
  { name: 'Stock Futures', wins: 6, losses: 3, winRate: 67, avgWin: 6500, avgLoss: 2800 },
]

const milestones = [
  { label: 'First ₹1 Lakh', achieved: true, date: 'Jan 15' },
  { label: '10 Trade Streak', achieved: true, date: 'Feb 8' },
  { label: '₹5 Lakhs Milestone', achieved: false, target: '₹5,00,000', current: '₹2,45,000' },
  { label: '70% Win Rate', achieved: false, target: '70%', current: '68%' },
]

export default function ProfitDashboard() {
  const [rrInput, setRrInput] = useState({ risk: '', reward: '' })

  const calculatePosition = () => {
    const risk = parseFloat(rrInput.risk)
    const reward = parseFloat(rrInput.reward)
    if (!risk || !reward) return null
    const rr = reward / risk
    const winRate = 0.5 // Default assumption
    const expectancy = (rr * winRate) - ((1 - winRate) * 1)
    return { rr, expectancy: (expectancy * 100).toFixed(1) }
  }

  const positionCalc = calculatePosition()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Profit Dashboard</h1>
        <p className="text-text-secondary">Track your path to consistent profitability</p>
      </div>

      {/* Profit Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {profitMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <metric.icon className="w-5 h-5 text-accent-emerald" />
                <Badge variant={metric.positive ? 'success' : 'danger'} size="sm">
                  {metric.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-text-primary">{metric.value}</div>
              <div className="text-sm text-text-tertiary">{metric.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Weekly P&L Chart */}
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold mb-6">Weekly P&L</h3>
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyPnl.map((day, i) => (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min((day.pnl / 15000) * 100, 100)}%` }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-full rounded-t-lg ${day.pnl >= 0 ? 'bg-accent-emerald' : 'bg-red-500'}`}
                />
                <span className="text-xs text-text-tertiary mt-2">{day.day}</span>
                <span className={`text-xs ${day.pnl >= 0 ? 'text-accent-emerald' : 'text-red-400'}`}>
                  ₹{Math.abs(day.pnl).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-text-tertiary">Total: <span className="text-accent-emerald font-medium">₹32,000</span></span>
            <span className="text-text-tertiary">Avg: <span className="text-accent-emerald font-medium">₹6,400/day</span></span>
          </div>
        </Card>

        {/* Risk-Reward Calculator */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-accent-electric" />
            <h3 className="text-lg font-semibold">Risk-Reward Calculator</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Risk (₹)</label>
              <Input
                type="number"
                placeholder="1000"
                value={rrInput.risk}
                onChange={(e) => setRrInput({ ...rrInput, risk: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-2 block">Reward (₹)</label>
              <Input
                type="number"
                placeholder="2500"
                value={rrInput.reward}
                onChange={(e) => setRrInput({ ...rrInput, reward: e.target.value })}
              />
            </div>
          </div>
          {positionCalc && (
            <div className="p-4 bg-bg-elevated rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Ratio:</span>
                <span className="text-xl font-bold text-accent-electric">1:{positionCalc.rr.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Expectancy:</span>
                <span className={`text-xl font-bold ${parseFloat(positionCalc.expectancy) > 0 ? 'text-accent-emerald' : 'text-red-400'}`}>
                  {positionCalc.expectancy}%
                </span>
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                {parseFloat(positionCalc.expectancy) > 0 
                  ? '✓ Profitable system - Keep using this ratio!'
                  : '⚠️ Losing system - Adjust your R:R ratio'}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Top Performing Strategies */}
      <Card variant="glass" className="p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-accent-amber" />
          <h3 className="text-lg font-semibold">Top Performing Strategies</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {topStrategies.map((strat, i) => (
            <div key={strat.name} className="p-4 bg-bg-elevated rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-text-primary">{strat.name}</span>
                <Badge variant={strat.winRate >= 60 ? 'success' : 'warning'} size="sm">
                  {strat.winRate}% WR
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-text-tertiary">Wins: </span>
                  <span className="text-accent-emerald">{strat.wins}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">Losses: </span>
                  <span className="text-red-400">{strat.losses}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">Avg Win: </span>
                  <span className="text-accent-emerald">₹{strat.avgWin}</span>
                </div>
                <div>
                  <span className="text-text-tertiary">Avg Loss: </span>
                  <span className="text-red-400">₹{strat.avgLoss}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Profit Milestones */}
      <Card variant="glass" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-semibold">Profit Milestones</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {milestones.map((milestone, i) => (
            <div key={i} className={`p-4 rounded-xl border ${milestone.achieved ? 'bg-accent-emerald/10 border-accent-emerald/30' : 'bg-bg-elevated border-white/10'}`}>
              <div className="flex items-center gap-2 mb-2">
                {milestone.achieved ? (
                  <ArrowUpRight className="w-4 h-4 text-accent-emerald" />
                ) : (
                  <Target className="w-4 h-4 text-text-tertiary" />
                )}
                <span className={`font-medium ${milestone.achieved ? 'text-accent-emerald' : 'text-text-primary'}`}>
                  {milestone.label}
                </span>
              </div>
              {milestone.achieved ? (
                <span className="text-sm text-text-tertiary">Achieved on {milestone.date}</span>
              ) : milestone.current && milestone.target ? (
                <div>
                  <div className="text-sm text-text-tertiary mb-2">
                    {milestone.current} / {milestone.target}
                  </div>
                  <ProgressBar 
                    value={parseInt(milestone.current.replace(/[^0-9]/g, ''))} 
                    max={parseInt(milestone.target.replace(/[^0-9]/g, ''))}
                    color="#8b5cf6"
                  />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}