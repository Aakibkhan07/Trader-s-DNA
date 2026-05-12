'use client'

import { motion } from 'framer-motion'
import { Card, Badge, ProgressBar } from '@/components/ui'
import { Brain, Smile, Frown, AlertTriangle, TrendingUp, Calendar } from 'lucide-react'

const emotions = [
  { icon: Smile, label: 'Confidence', score: 82, trend: '+5%' },
  { icon: Brain, label: 'Emotional Balance', score: 68, trend: '-2%' },
  { icon: AlertTriangle, label: 'Fear Level', score: 35, trend: '-8%' },
  { icon: TrendingUp, label: 'Greed Index', score: 45, trend: '+3%' },
]

const emotionalTimeline = [
  { day: 'Mon', mood: 'confident', score: 75 },
  { day: 'Tue', mood: 'anxious', score: 45 },
  { day: 'Wed', mood: 'frustrated', score: 35 },
  { day: 'Thu', mood: 'neutral', score: 60 },
  { day: 'Fri', mood: 'excited', score: 85 },
]

const triggers = [
  { trigger: 'Large Red Day', frequency: '3x this week', impact: 'high' },
  { trigger: 'Missed Trade', frequency: '5x this week', impact: 'medium' },
  { trigger: 'Profit Target Hit', frequency: '2x this week', impact: 'low' },
]

export function EmotionalIntelligence() {
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
          <span className="text-accent-purple text-sm font-medium uppercase tracking-wider">Psychology Engine</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Emotional Intelligence</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Track your emotional state in real-time and identify the triggers that lead to destructive trading behavior.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emotion Scores */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {emotions.map((emotion, i) => (
              <motion.div
                key={emotion.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <emotion.icon className={`w-5 h-5 ${
                        emotion.score >= 70 ? 'text-accent-emerald' : 'text-accent-amber'
                      }`} />
                      <span className="text-sm text-text-secondary">{emotion.label}</span>
                    </div>
                    <Badge variant={emotion.trend.startsWith('+') ? 'success' : 'danger'} size="sm">
                      {emotion.trend}
                    </Badge>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-text-primary">{emotion.score}</span>
                    <span className="text-sm text-text-tertiary mb-1">/100</span>
                  </div>
                  <ProgressBar value={emotion.score} color={
                    emotion.score >= 70 ? '#00ff88' : '#f59e0b'
                  } className="mt-3" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Triggers */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6 h-full">
              <h3 className="text-lg font-semibold mb-4">Emotional Triggers</h3>
              <div className="space-y-3">
                {triggers.map((trigger, i) => (
                  <div key={i} className="p-3 bg-bg-elevated rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-primary">{trigger.trigger}</span>
                      <Badge
                        variant={trigger.impact === 'high' ? 'danger' : trigger.impact === 'medium' ? 'warning' : 'default'}
                        size="sm"
                      >
                        {trigger.impact}
                      </Badge>
                    </div>
                    <p className="text-xs text-text-tertiary">{trigger.frequency}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Weekly Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Weekly Emotional Journey</h3>
              <Calendar className="w-5 h-5 text-text-tertiary" />
            </div>
            <div className="flex justify-between items-end h-32">
              {emotionalTimeline.map((day, i) => (
                <div key={day.day} className="flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${day.score}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`w-12 rounded-t-lg ${
                      day.score >= 70 ? 'bg-accent-emerald' :
                      day.score >= 50 ? 'bg-accent-electric' : 'bg-accent-amber'
                    }`}
                  />
                  <span className="text-xs text-text-tertiary mt-2">{day.day}</span>
                  <span className="text-xs text-text-muted">{day.score}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}