'use client'

import { motion } from 'framer-motion'
import { Card, Button } from '@/components/ui'
import { MessageSquare, Sparkles, BookOpen, Video, Mail } from 'lucide-react'

const mentorFeatures = [
  { icon: MessageSquare, title: '24/7 Chat', desc: 'AI mentor available anytime' },
  { icon: Sparkles, title: 'Personalized', desc: 'Tailored to your trading style' },
  { icon: BookOpen, title: 'Strategy', desc: 'Custom trading strategies' },
]

const sampleConversation = [
  { role: 'user', text: 'I keep revenge trading after losses. How do I stop?' },
  { role: 'mentor', text: 'The urge to "make back" losses is your biggest enemy. Here\'s a 3-step protocol: 1) After any loss, close your terminal for 30 mins. 2) Write down what triggered the trade. 3) Only resume with a fresh setup list. Want me to create a custom protocol for you?' },
]

export function AIMentor() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-accent-purple/5 to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-purple text-sm font-medium uppercase tracking-wider">Your AI Coach</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">AI Trading Mentor</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Get personalized guidance from an AI that understands your unique psychological profile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Trading Mentor AI</h3>
                    <p className="text-xs text-text-tertiary">Online • Ready to help</p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-accent-emerald animate-pulse" />
              </div>
              
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {sampleConversation.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent-purple/20 text-text-primary rounded-br-md'
                        : 'bg-bg-elevated text-text-secondary rounded-bl-md'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your mentor..."
                  className="flex-1 bg-bg-elevated border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-accent-purple"
                />
                <Button size="sm">Send</Button>
              </div>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {mentorFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="glass" className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary">{feature.title}</h4>
                    <p className="text-sm text-text-tertiary">{feature.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}

            <Card variant="elevated" className="p-5 mt-6">
              <h4 className="font-semibold text-text-primary mb-2">Pro Feature: Video Calls</h4>
              <p className="text-sm text-text-tertiary mb-4">
                Get monthly 1-on-1 video sessions with human trading coaches
              </p>
              <div className="flex items-center gap-2 text-accent-electric text-sm">
                <Video className="w-4 h-4" />
                <span>Available in Premium</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}