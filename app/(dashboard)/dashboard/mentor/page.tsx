'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Input } from '@/components/ui'
import Link from 'next/link'
import {
  MessageSquare,
  Sparkles,
  ArrowLeft,
  Send,
  Bot,
  User,
} from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'mentor'
  content: string
  timestamp: Date
}

const quickQuestions = [
  'How do I stop revenge trading?',
  'Improve my discipline',
  'Handle trading anxiety',
  'Best trading hours?',
]

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'mentor',
      content: "Hello! I'm your AI Trading Mentor. I'm here to help you with trading psychology, discipline, and behavioral patterns. Ask me anything!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your concern about revenge trading. Here's a 3-step protocol:\n\n1. **Close your terminal** for 30 minutes after any loss\n2. **Write down** what triggered the trade\n3. **Resume** only with a fresh setup list\n\nThe key is to separate the emotional response from your next decision. Would you like me to create a custom protocol for you?",
        "Great question! Building discipline takes time. Here's what works:\n\n• **Start small**: Focus on one rule at a time\n• **Track everything**: Use your journal\n• **Weekly reviews**: Every Sunday, assess your discipline\n• **Celebrate wins**: Acknowledge when you follow rules\n\nYour current discipline score is 75% - that's above average! What specific area would you like to improve?",
        "Trading anxiety is common. The solution isn't to eliminate it but to manage it:\n\n1. **Pre-market routine**: 10 min meditation\n2. **Position sizing**: Reduce to 1% until calm\n3. **Take breaks**: 5 min after each trade\n4. **Breathe**: 4-7-8 technique before entries\n\nRemember: The market will always be there. No trade is worth your mental health.",
      ]

      const mentorMessage: Message = {
        id: Date.now() + 1,
        role: 'mentor',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, mentorMessage])
      setLoading(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="p-8 h-[calc(100vh-32px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} className="mb-2">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">AI Trading Mentor</h1>
          <p className="text-text-secondary">24/7 personalized guidance for your trading psychology</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
          <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
          <span className="text-sm text-accent-emerald">Online</span>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex gap-6">
        <div className="flex-1 flex flex-col">
          <Card variant="glass" className="flex-1 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-accent-electric text-black' 
                        : 'bg-accent-purple/20'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4 text-accent-purple" />
                      )}
                    </div>
                    <div className={`p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-accent-electric/20 text-text-primary rounded-br-md'
                        : 'bg-bg-elevated text-text-secondary rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent-purple" />
                  </div>
                  <div className="p-4 rounded-2xl bg-bg-elevated">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-text-tertiary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-3">
                <Input
                  placeholder="Ask your mentor..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={loading || !input.trim()} icon={<Send size={16} />}>
                  Send
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Questions */}
        <div className="w-72">
          <Card variant="glass" className="p-5 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent-electric" />
              <h3 className="font-semibold text-text-primary">Quick Questions</h3>
            </div>
            
            <div className="space-y-2">
              {quickQuestions.map((question, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full p-3 text-left bg-bg-elevated rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-sm font-medium text-text-secondary mb-3">Your Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Sessions</span>
                  <span className="text-text-primary">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Questions Asked</span>
                  <span className="text-text-primary">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-tertiary">Avg Response</span>
                  <span className="text-text-primary">4.5 ★</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}