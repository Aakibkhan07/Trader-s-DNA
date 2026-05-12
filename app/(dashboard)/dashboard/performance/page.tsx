'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, ProgressRing, ProgressBar } from '@/components/ui'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  Target,
  Clock,
  Calendar,
  ArrowLeft,
  Brain,
  Zap,
} from 'lucide-react'

const performanceData = [
  { month: 'Jan', score: 65, trades: 24 },
  { month: 'Feb', score: 72, trades: 28 },
  { month: 'Mar', score: 68, trades: 22 },
  { month: 'Apr', score: 78, trades: 30 },
  { month: 'May', score: 82, trades: 26 },
]

const bestTimes = [
  { time: '9:30 - 10:30 AM', winRate: 78, trades: 45 },
  { time: '2:00 - 3:00 PM', winRate: 72, trades: 38 },
  { time: '10:00 - 11:00 AM', winRate: 68, trades: 32 },
]

const stats = [
  { label: 'Total Analyses', value: 127, change: '+12%', icon: BarChart3 },
  { label: 'Avg Score', value: '74%', change: '+5%', icon: TrendingUp },
  { label: 'Win Rate', value: '68%', change: '+3%', icon: Target },
  { label: 'Best Streak', value: '12 days', change: '+2', icon: Zap },
]

const traits = [
  { label: 'Emotional Control', score: 82, color: '#00ff88' },
  { label: 'Discipline', score: 75, color: '#00d4ff' },
  { label: 'Patience', score: 68, color: '#8b5cf6' },
  { label: 'Risk Management', score: 72, color: '#f59e0b' },
]

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState('month')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} className="mb-2">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Performance Analytics</h1>
          <p className="text-text-secondary">Track your progress and identify improvement areas</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-accent-electric text-black'
                  : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="glass" className="p-5">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-accent-electric" />
                <Badge variant="success" size="sm">{stat.change}</Badge>
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-sm text-text-tertiary">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Score Trend */}
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold mb-6">Score Trend</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {performanceData.map((month, i) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${month.score}%` }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-accent-electric to-accent-emerald"
                />
                <span className="text-xs text-text-tertiary mt-2">{month.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Best Trading Times */}
        <Card variant="glass" className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-accent-electric" />
            <h3 className="text-lg font-semibold">Best Trading Hours</h3>
          </div>
          <div className="space-y-4">
            {bestTimes.map((time, i) => (
              <div key={time.time} className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-text-secondary">#{i + 1}</span>
                  <span className="text-text-primary">{time.time}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-accent-emerald">{time.winRate}%</span>
                  <p className="text-xs text-text-tertiary">{time.trades} trades</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Psychology Traits */}
      <Card variant="glass" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Brain className="w-5 h-5 text-accent-purple" />
          <h3 className="text-lg font-semibold">Psychology Traits</h3>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {traits.map((trait) => (
            <div key={trait.label} className="text-center">
              <ProgressRing
                value={trait.score}
                size={100}
                strokeWidth={8}
                color={trait.color}
                showValue
              />
              <p className="mt-3 text-sm font-medium text-text-primary">{trait.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}