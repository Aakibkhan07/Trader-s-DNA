'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, Input } from '@/components/ui'
import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  Target,
  ArrowLeft,
} from 'lucide-react'

interface ValidationItem {
  label: string
  icon: any
  passed: boolean | null
  tip: string
}

const validationCategories = [
  {
    name: 'Risk Management',
    items: [
      { label: 'Position size ≤ 2% of capital', tip: 'Never risk more than 2% per trade' },
      { label: 'Stop loss defined', tip: 'Always set SL before entering' },
      { label: 'Risk:Reward ≥ 1:2', tip: 'Minimum 1:2 ratio required' },
    ]
  },
  {
    name: 'Setup Quality',
    items: [
      { label: 'Trade follows your system', tip: 'Only trade confirmed setups' },
      { label: 'Entry zone is clear', tip: 'No resistance/support near entry' },
      { label: 'Trend alignment', tip: 'Trade with the trend' },
    ]
  },
  {
    name: 'Psychology',
    items: [
      { label: 'Not revenge trading', tip: 'No trades to recover losses' },
      { label: 'Not trading on FOMO', tip: 'Wait for your setup, not news' },
      { label: 'Emotional state stable', tip: 'Trade when calm and focused' },
    ]
  },
]

export default function TradeValidatorPage() {
  const [validated, setValidated] = useState(false)
  const [items, setItems] = useState<ValidationItem[]>(
    validationCategories.flatMap(cat => 
      cat.items.map(item => ({ ...item, passed: null, icon: null }))
    )
  )

  const toggleItem = (index: number) => {
    const newItems = [...items]
    newItems[index].passed = newItems[index].passed === true ? null : true
    setItems(newItems)
    setValidated(false)
  }

  const checkReadiness = () => {
    const checkedItems = items.filter(i => i.passed !== null)
    const passedCount = items.filter(i => i.passed === true).length
    const totalItems = items.length
    const readiness = (passedCount / totalItems) * 100
    setValidated(true)
  }

  const passedCount = items.filter(i => i.passed === true).length
  const readiness = (passedCount / items.length) * 100

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />}>
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Trade Plan Validator</h1>
          <p className="text-text-secondary">Validate every trade before taking it</p>
        </div>
      </div>

      {/* Readiness Score */}
      <Card variant="glass" className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Trade Readiness</h2>
          <Badge 
            variant={readiness >= 80 ? 'success' : readiness >= 50 ? 'warning' : 'danger'}
            className="text-lg px-4"
          >
            {Math.round(readiness)}% Ready
          </Badge>
        </div>
        <ProgressBar value={readiness} color={
          readiness >= 80 ? '#00ff88' : readiness >= 50 ? '#f59e0b' : '#ff3366'
        } />
        <p className="text-sm text-text-tertiary mt-2">
          {readiness >= 80 
            ? '✓ Good to trade! Your plan looks solid.'
            : readiness >= 50
            ? '⚠️ Partial validation - review unchecked items'
            : '✗ Not ready - complete more validations before trading'}
        </p>
      </Card>

      {/* Validation Checklist */}
      <div className="space-y-6 mb-8">
        {validationCategories.map((category, catIndex) => (
          <Card key={catIndex} variant="glass" className="p-6">
            <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => {
                const globalIndex = catIndex * 3 + itemIndex
                const passed = items[globalIndex].passed
                
                return (
                  <motion.div
                    key={itemIndex}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => toggleItem(globalIndex)}
                    className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                      passed === true 
                        ? 'bg-accent-emerald/10 border border-accent-emerald/30' 
                        : passed === false
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-bg-elevated border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        passed === true 
                          ? 'bg-accent-emerald/20' 
                          : passed === false
                          ? 'bg-red-500/20'
                          : 'bg-bg-card'
                      }`}>
                        {passed === true && <CheckCircle className="w-5 h-5 text-accent-emerald" />}
                        {passed === false && <XCircle className="w-5 h-5 text-red-400" />}
                        {passed === null && <ClipboardCheck className="w-5 h-5 text-text-tertiary" />}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{item.label}</p>
                        <p className="text-sm text-text-tertiary">{item.tip}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Trade Details Input */}
      <Card variant="glass" className="p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Trade Details</h3>
        <div className="grid grid-cols-4 gap-4">
          <Input label="Entry Price" placeholder="22,450" />
          <Input label="Stop Loss" placeholder="22,250" />
          <Input label="Target" placeholder="22,850" />
          <Input label="Position Size (₹)" placeholder="50,000" />
        </div>
        
        <div className="mt-4 p-4 bg-bg-elevated rounded-xl grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-text-tertiary">Risk Amount</p>
            <p className="text-xl font-bold text-red-400">₹10,000</p>
          </div>
          <div>
            <p className="text-sm text-text-tertiary">Reward Amount</p>
            <p className="text-xl font-bold text-accent-emerald">₹20,000</p>
          </div>
          <div>
            <p className="text-sm text-text-tertiary">Risk:Reward</p>
            <p className="text-xl font-bold text-accent-electric">1:2</p>
          </div>
        </div>
      </Card>

      {/* Action Button */}
      <Button 
        onClick={checkReadiness} 
        className="w-full" 
        size="lg"
        disabled={passedCount < 6}
      >
        {passedCount < 6 
          ? `Complete ${6 - passedCount} more validations` 
          : validated 
            ? 'Trade Validated - Ready to Execute!' 
            : 'Validate & Save Trade Plan'}
      </Button>
    </div>
  )
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-3 bg-bg-elevated rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  )
}