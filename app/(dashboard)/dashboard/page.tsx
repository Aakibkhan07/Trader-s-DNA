'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, ProgressRing } from '@/components/ui'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import {
  Upload,
  TrendingUp,
  Flame,
  Target,
  Brain,
  Zap,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Clock,
  Trophy,
  Flame as FlameIcon,
} from 'lucide-react'

const stats = [
  { label: 'Psychology Score', value: 78, icon: Brain, color: '#00d4ff' },
  { label: 'Total Trades', value: 127, icon: TrendingUp, color: '#00ff88' },
  { label: 'Current Streak', value: 12, icon: FlameIcon, color: '#f59e0b' },
  { label: 'Win Rate', value: '74%', icon: Target, color: '#8b5cf6' },
]

const recentAnalyses = [
  { id: 1, type: 'Nifty 50 Long', score: 87, status: 'profit', time: '2h ago' },
  { id: 2, type: 'BankNifty Call', score: 65, status: 'loss', time: '5h ago' },
  { id: 3, type: 'Nifty 50 Short', score: 92, status: 'profit', time: '1d ago' },
  { id: 4, type: 'FINNIFTY Futures', score: 71, status: 'breakeven', time: '2d ago' },
]

const achievements = [
  { icon: Trophy, label: 'First Profit', color: '#f59e0b' },
  { icon: FlameIcon, label: '7 Day Streak', color: '#ff3366' },
  { icon: Brain, label: 'High Psychology', color: '#00d4ff' },
]

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    // Simulate upload
    setTimeout(() => setUploading(false), 2000)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Welcome back, Rahul</h1>
          <p className="text-text-secondary mt-1">Your trading psychology at a glance</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
          <Sparkles className="w-4 h-4 text-accent-emerald" />
          <span className="text-sm text-accent-emerald">12 day streak! 🔥</span>
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
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                <Badge variant="success" size="sm">+5%</Badge>
              </div>
              <div className="text-2xl font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-tertiary mt-1">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Analyze Your Trade</h2>
              <Badge variant="info">Pro</Badge>
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? 'border-accent-electric bg-accent-electric/10'
                  : 'border-white/10 hover:border-accent-electric/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 rounded-2xl bg-accent-electric/10 mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-accent-electric" />
              </div>
              {uploading ? (
                <div>
                  <div className="w-16 h-16 rounded-full border-2 border-accent-electric border-t-transparent animate-spin mx-auto mb-4" />
                  <p className="text-text-secondary">Analyzing your trade...</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium text-text-primary mb-2">
                    {isDragActive ? 'Drop your screenshot here' : 'Drag & drop your trade screenshot'}
                  </p>
                  <p className="text-sm text-text-tertiary">
                    Supports TradingView, Broker terminals, P&L screenshots
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-bg-elevated text-center">
                <Zap className="w-5 h-5 mx-auto mb-2 text-accent-electric" />
                <p className="text-xs text-text-tertiary">Instant Analysis</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-elevated text-center">
                <Brain className="w-5 h-5 mx-auto mb-2 text-accent-purple" />
                <p className="text-xs text-text-tertiary">AI Psychology</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-elevated text-center">
                <Target className="w-5 h-5 mx-auto mb-2 text-accent-emerald" />
                <p className="text-xs text-text-tertiary">Actionable Insights</p>
              </div>
            </div>
          </Card>

          {/* Recent Analyses */}
          <Card variant="glass" className="p-6 mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Analyses</h2>
              <Link href="/dashboard/performance" className="text-sm text-accent-electric hover:underline">
                View all
              </Link>
            </div>

            <div className="space-y-3">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      analysis.status === 'profit' ? 'bg-accent-emerald/20' :
                      analysis.status === 'loss' ? 'bg-red-500/20' : 'bg-accent-amber/20'
                    }`}>
                      <TrendingUp className={`w-5 h-5 ${
                        analysis.status === 'profit' ? 'text-accent-emerald' :
                        analysis.status === 'loss' ? 'text-red-400' : 'text-accent-amber'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">{analysis.type}</p>
                      <p className="text-xs text-text-tertiary">{analysis.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{
                        color: analysis.score >= 80 ? '#00ff88' :
                               analysis.score >= 60 ? '#00d4ff' : '#f59e0b'
                      }}>{analysis.score}</p>
                      <p className="text-xs text-text-tertiary">score</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-text-tertiary" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Psychology Score */}
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Psychology Score</h3>
            <div className="flex justify-center">
              <ProgressRing
                value={78}
                size={140}
                strokeWidth={10}
                color="#00d4ff"
                label="Current"
              />
            </div>
            <div className="mt-6 space-y-2">
              {[
                { label: 'Emotional Control', value: 82 },
                { label: 'Discipline', value: 75 },
                { label: 'Patience', value: 68 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{item.label}</span>
                  <span className="text-sm font-medium text-text-primary">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-bg-elevated rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${achievement.color}20` }}>
                    <achievement.icon className="w-5 h-5" style={{ color: achievement.color }} />
                  </div>
                  <span className="text-sm text-text-primary">{achievement.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Mentor CTA */}
          <Card variant="elevated" className="p-6 bg-gradient-to-br from-accent-purple/10 to-accent-electric/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">AI Mentor</h4>
                <p className="text-xs text-text-tertiary">Online now</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Get personalized guidance for your trading psychology
            </p>
            <Link href="/dashboard/mentor">
              <Button size="sm" className="w-full">Chat Now</Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}