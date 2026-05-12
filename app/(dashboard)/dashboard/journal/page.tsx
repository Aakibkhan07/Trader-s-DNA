'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, Input, Textarea } from '@/components/ui'
import Link from 'next/link'
import {
  BookOpen,
  Plus,
  Search,
  Calendar,
  Smile,
  Frown,
  Brain,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'

const entries = [
  { id: 1, title: 'Daily Review - May 10', mood: 'confident', date: '2h ago', content: 'Good trading day. Stayed disciplined...', tags: ['daily', 'ai-generated'] },
  { id: 2, title: 'Trade Reflection - Nifty Long', mood: 'neutral', date: '1d ago', content: 'Entry timing could be better...', tags: ['trade', 'reflection'] },
  { id: 3, title: 'Weekly Review - Week 19', mood: 'frustrated', date: '3d ago', content: 'This week was challenging. Need to work on...', tags: ['weekly', 'ai-generated'] },
  { id: 4, title: 'Lessons from a losing trade', mood: 'anxious', date: '5d ago', content: 'What I learned from today\'s loss...', tags: ['reflection'] },
]

const moodIcons = {
  excited: '🤩',
  confident: '😊',
  neutral: '😐',
  anxious: '😰',
  frustrated: '😤',
  scared: '😨',
}

export default function JournalPage() {
  const [showNew, setShowNew] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('neutral')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} className="mb-2">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Trading Journal</h1>
          <p className="text-text-secondary">Document your journey, track your growth</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowAI(true)} icon={<Sparkles size={16} />}>
            AI Generate
          </Button>
          <Button onClick={() => setShowNew(true)} icon={<Plus size={16} />}>
            New Entry
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Daily Summary', desc: 'AI generates daily review', icon: Calendar, action: () => setShowAI(true) },
          { label: 'Trade Reflection', desc: 'Reflect on a specific trade', icon: Brain, action: () => setShowAI(true) },
          { label: 'Weekly Review', desc: 'Summarize your week', icon: BookOpen, action: () => setShowAI(true) },
        ].map((action) => (
          <Card key={action.label} variant="glass" hover className="p-5 cursor-pointer" onClick={action.action}>
            <action.icon className="w-6 h-6 text-accent-electric mb-3" />
            <p className="font-medium text-text-primary">{action.label}</p>
            <p className="text-sm text-text-tertiary">{action.desc}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6 max-w-md">
        <Input placeholder="Search journal entries..." icon={<Search className="w-5 h-5" />} />
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card variant="glass" hover className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{moodIcons[entry.mood as keyof typeof moodIcons]}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{entry.title}</h3>
                    <p className="text-text-secondary mt-2 line-clamp-2">{entry.content}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-sm text-text-tertiary">{entry.date}</span>
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* New Entry Modal */}
      {showNew && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg glass-card p-6"
          >
            <h2 className="text-xl font-semibold text-text-primary mb-6">New Journal Entry</h2>
            
            <Input
              label="Title"
              placeholder="Entry title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4"
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">Mood</label>
              <div className="flex gap-2">
                {Object.keys(moodIcons).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`p-3 rounded-lg transition-all ${
                      mood === m ? 'bg-accent-electric/20 border border-accent-electric' : 'bg-bg-elevated border border-white/10'
                    }`}
                  >
                    <span className="text-2xl">{moodIcons[m as keyof typeof moodIcons]}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <Textarea
              label="Content"
              placeholder="Write your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-6 min-h-[150px]"
            />
            
            <div className="flex gap-3">
              <Button onClick={() => setShowNew(false)} className="flex-1">Save Entry</Button>
              <Button variant="secondary" onClick={() => setShowNew(false)} className="flex-1">Cancel</Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Generate Modal */}
      {showAI && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md glass-card p-6"
          >
            <h2 className="text-xl font-semibold text-text-primary mb-6">AI Generate Journal</h2>
            
            <div className="space-y-3 mb-6">
              {[
                { id: 'daily', label: 'Daily Summary', desc: 'Generate today\'s trading summary' },
                { id: 'trade', label: 'Trade Reflection', desc: 'Reflect on a specific trade' },
                { id: 'weekly', label: 'Weekly Review', desc: 'Summarize this week\'s progress' },
              ].map((option) => (
                <button
                  key={option.id}
                  className="w-full p-4 bg-bg-elevated rounded-xl text-left hover:bg-white/5 transition-colors"
                >
                  <p className="font-medium text-text-primary">{option.label}</p>
                  <p className="text-sm text-text-tertiary">{option.desc}</p>
                </button>
              ))}
            </div>
            
            <Button variant="secondary" onClick={() => setShowAI(false)} className="w-full">Cancel</Button>
          </motion.div>
        </div>
      )}
    </div>
  )
}