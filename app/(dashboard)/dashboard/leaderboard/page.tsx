'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import {
  Trophy,
  Medal,
  Crown,
  ArrowLeft,
  TrendingUp,
  Brain,
  Flame,
} from 'lucide-react'

const leaderboard = [
  { rank: 1, name: 'TradingPro_99', score: 92, streak: 28, avatar: '🏆' },
  { rank: 2, name: 'MindfulTrader', score: 89, streak: 21, avatar: '🥈' },
  { rank: 3, name: 'DisciplinedAce', score: 87, streak: 18, avatar: '🥉' },
  { rank: 4, name: 'Rahul S.', score: 78, streak: 12, avatar: 'RS', isUser: true },
  { rank: 5, name: 'OptionsMaster', score: 76, streak: 15, avatar: 'OM' },
  { rank: 6, name: 'SwingKing', score: 74, streak: 9, avatar: 'SK' },
  { rank: 7, name: 'ChartNinja', score: 72, streak: 7, avatar: 'CN' },
  { rank: 8, name: 'PsychologyTrader', score: 70, streak: 11, avatar: 'PT' },
]

const periods = ['daily', 'weekly', 'monthly', 'all_time']

export default function LeaderboardPage() {
  const [period, setPeriod] = useState('weekly')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} className="mb-2">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Leaderboard</h1>
          <p className="text-text-secondary">Top traders by psychology score</p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-8">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              period === p
                ? 'bg-accent-electric text-black'
                : 'bg-bg-elevated text-text-secondary hover:text-text-primary'
            }`}
          >
            {p.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((trader, i) => (
          <motion.div
            key={trader.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card
              variant={i === 0 ? 'elevated' : 'glass'}
              className={`p-6 text-center ${i === 0 ? 'border-accent-amber/50' : ''}`}
            >
              <div className="text-4xl mb-4">{trader.avatar}</div>
              <p className="text-lg font-semibold text-text-primary">{trader.name}</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <div>
                  <p className="text-2xl font-bold text-accent-electric">{trader.score}</p>
                  <p className="text-xs text-text-tertiary">Score</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-2xl font-bold text-accent-amber">{trader.streak}</p>
                  <p className="text-xs text-text-tertiary">Streak</p>
                </div>
              </div>
              {i === 0 && (
                <div className="mt-4">
                  <Badge variant="warning" className="w-full justify-center flex">👑 Leader</Badge>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Rankings Table */}
      <Card variant="glass" className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-elevated">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Rank</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Trader</th>
              <th className="text-center p-4 text-sm font-medium text-text-secondary">Score</th>
              <th className="text-center p-4 text-sm font-medium text-text-secondary">Streak</th>
              <th className="text-center p-4 text-sm font-medium text-text-secondary">Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((trader, i) => (
              <motion.tr
                key={trader.rank}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`border-t border-white/5 ${trader.isUser ? 'bg-accent-electric/5' : ''}`}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {trader.rank <= 3 ? (
                      <Trophy className={`w-5 h-5 ${
                        trader.rank === 1 ? 'text-accent-amber' :
                        trader.rank === 2 ? 'text-gray-400' : 'text-amber-700'
                      }`} />
                    ) : (
                      <span className="text-text-tertiary">#{trader.rank}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      trader.isUser ? 'bg-accent-electric text-black' : 'bg-bg-elevated text-text-secondary'
                    }`}>
                      {trader.avatar}
                    </div>
                    <span className={`font-medium ${trader.isUser ? 'text-accent-electric' : 'text-text-primary'}`}>
                      {trader.name} {trader.isUser && '(You)'}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className="text-lg font-bold text-text-primary">{trader.score}</span>
                </td>
                <td className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-accent-amber" />
                    <span className="text-text-primary">{trader.streak}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {trader.score >= 85 && <Badge variant="purple" size="sm">Top Trader</Badge>}
                  {trader.score >= 70 && trader.score < 85 && <Badge variant="success" size="sm">Rising</Badge>}
                  {trader.score < 70 && <Badge variant="default" size="sm">Learning</Badge>}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}