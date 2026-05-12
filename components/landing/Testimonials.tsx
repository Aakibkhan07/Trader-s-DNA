'use client'

import { motion } from 'framer-motion'
import { Card, Badge } from '@/components/ui'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Derivatives Trader',
    avatar: 'RS',
    rating: 5,
    text: "Trader's DNA revealed patterns I didn't know existed. My revenge trading dropped by 80% in just 2 weeks. The AI mentor is incredibly insightful.",
    result: '+45% win rate',
    color: '#00d4ff',
  },
  {
    name: 'Priya Patel',
    role: 'Options Trader',
    avatar: 'PP',
    rating: 5,
    text: 'The psychological analysis is next level. It\'s like having a trading psychologist available 24/7. My discipline score improved from 52 to 87.',
    result: '3x consistency',
    color: '#00ff88',
  },
  {
    name: 'Amit Kumar',
    role: 'Swing Trader',
    avatar: 'AK',
    rating: 5,
    text: 'Finally, a tool that focuses on psychology instead of just signals. The DNA breakdown helped me understand why I was making the same mistakes.',
    result: '₹2.5L saved',
    color: '#8b5cf6',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-amber text-sm font-medium uppercase tracking-wider">Success Stories</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">What Traders Say</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Join thousands of traders who transformed their performance with behavioral intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card variant="glass" hover className="p-6 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-amber text-accent-amber" />
                  ))}
                </div>
                
                <Quote className="w-8 h-8 text-text-tertiary mb-4" style={{ color: testimonial.color + '40' }} />
                
                <p className="text-text-secondary mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: testimonial.color + '20', color: testimonial.color }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{testimonial.name}</p>
                      <p className="text-xs text-text-tertiary">{testimonial.role}</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">{testimonial.result}</Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}