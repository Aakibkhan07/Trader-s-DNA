'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import {
  Upload,
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap,
  MessageSquare,
  ArrowLeft,
} from 'lucide-react'

const mockAnalysis = {
  overallScore: 78,
  trade: { score: 82, label: 'Entry Quality' },
  psychology: { score: 75, label: 'Psychology' },
  discipline: { score: 85, label: 'Discipline' },
  risk: { score: 68, label: 'Risk Management' },
  confidence: { score: 72, label: 'Confidence' },
  traderType: 'Sniper Trader',
  mistakes: [
    { type: 'timing', text: 'Slight hesitation before entry (-3 pts)', severity: 'low' },
    { type: 'stop', text: 'Stop loss could be tighter', severity: 'medium' },
  ],
  advice: 'Good discipline overall. Focus on entry timing for better results.',
}

export default function AnalyzePage() {
  const [uploading, setUploading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [roastMode, setRoastMode] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true)
    setTimeout(() => {
      setUploading(false)
      setAnalyzed(true)
    }, 2500)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
  })

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>Back</Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Analyze Trade</h1>
          <p className="text-text-secondary">Upload a screenshot for AI analysis</p>
        </div>
      </div>

      {/* Roast Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-secondary">Analysis Mode:</span>
          <button
            onClick={() => setRoastMode(!roastMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              roastMode 
                ? 'bg-accent-amber/20 text-accent-amber border border-accent-amber/30'
                : 'bg-bg-elevated text-text-secondary border border-white/10'
            }`}
          >
            <AlertTriangle size={16} />
            <span>{roastMode ? '🔥 Savage Scan' : 'Professional Analysis'}</span>
          </button>
        </div>
      </div>

      {!analyzed ? (
        <div className="max-w-2xl mx-auto">
          <Card variant="glass" className="p-12 text-center">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-16 cursor-pointer transition-all ${
                isDragActive
                  ? 'border-accent-electric bg-accent-electric/10'
                  : 'border-white/10 hover:border-accent-electric/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-20 h-20 rounded-2xl bg-accent-electric/10 mx-auto mb-6 flex items-center justify-center">
                {uploading ? (
                  <div className="w-10 h-10 rounded-full border-2 border-accent-electric border-t-transparent animate-spin" />
                ) : (
                  <Upload className="w-10 h-10 text-accent-electric" />
                )}
              </div>
              <p className="text-xl font-medium text-text-primary mb-2">
                {uploading ? 'Analyzing your trade...' : isDragActive ? 'Drop your screenshot here' : 'Drag & drop your trade screenshot'}
              </p>
              <p className="text-text-tertiary">
                Supports TradingView, broker terminals, P&L screenshots
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Brain, label: 'Psychology', desc: 'Emotional patterns' },
                { icon: Target, label: 'Risk', desc: 'S/L placement' },
                { icon: TrendingUp, label: 'Entry', desc: 'Timing quality' },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-bg-elevated rounded-xl text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-accent-electric" />
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-tertiary">{item.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <Card variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Analysis Result</h3>
                <p className="text-sm text-text-tertiary">Nifty 50 - Long • Today</p>
              </div>
              <Badge variant={mockAnalysis.overallScore >= 70 ? 'success' : 'warning'} className="text-lg px-4 py-2">
                {mockAnalysis.overallScore}/100
              </Badge>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              {[
                { key: 'trade', ...mockAnalysis.trade },
                { key: 'psychology', ...mockAnalysis.psychology },
                { key: 'discipline', ...mockAnalysis.discipline },
                { key: 'risk', ...mockAnalysis.risk },
                { key: 'confidence', ...mockAnalysis.confidence },
              ].map((item) => (
                <div key={item.key} className="text-center p-4 bg-bg-elevated rounded-xl">
                  <div className="text-2xl font-bold mb-1" style={{
                    color: item.score >= 80 ? '#00ff88' : item.score >= 60 ? '#00d4ff' : '#f59e0b'
                  }}>{item.score}</div>
                  <div className="text-xs text-text-tertiary">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent-purple/10 rounded-xl border border-accent-purple/20">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent-purple" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Trader Type: {mockAnalysis.traderType}</p>
                <p className="text-xs text-text-tertiary">Your unique trading DNA profile</p>
              </div>
            </div>
          </Card>

          {/* Mistakes & Advice */}
          <div className="grid grid-cols-2 gap-6">
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Mistakes Identified</h3>
              <div className="space-y-3">
                {mockAnalysis.mistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-bg-elevated rounded-lg">
                    <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                      mistake.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <div>
                      <p className="text-sm text-text-primary">{mistake.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-semibold mb-4">AI Mentor Advice</h3>
              <p className="text-text-secondary leading-relaxed">{mockAnalysis.advice}</p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-4"
                icon={<MessageSquare size={16} />}
              >
                Ask Follow-up
              </Button>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button onClick={() => setAnalyzed(false)}>Analyze Another</Button>
            <Button variant="secondary">Save to Journal</Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}