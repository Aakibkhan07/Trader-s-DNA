'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "How does Traders DNA analyze my trading?",
    answer: 'Upload any trade screenshot and our AI analyzes visual patterns, entry/exit quality, risk management, and emotional indicators. We compare your behavior against thousands of successful traders to identify patterns.',
  },
  {
    question: 'What kind of screenshots can I upload?',
    answer: 'You can upload TradingView charts, broker terminal screenshots, P&L statements, or any image showing your trades. Our AI extracts behavioral data regardless of the platform.',
  },
  {
    question: 'Is my trading data secure?',
    answer: 'Absolutely. We use bank-level encryption and never share your data. Your trading information is stored securely and you can delete it anytime.',
  },
  {
    question: 'How accurate is the AI analysis?',
    answer: 'Our AI model has been trained on 50,000+ trade analyses with 95% accuracy in identifying behavioral patterns. Psychological insights have 89% correlation with human expert analysis.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel anytime with no questions asked. We offer a 7-day money-back guarantee on paid plans.',
  },
  {
    question: "What makes Trader's DNA different from other trading tools?",
    answer: 'While others focus on signals and indicators, we focus on the trader. We analyze psychology, behavior, and discipline - the factors that actually determine long-term success.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/30 to-bg-primary" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-purple text-sm font-medium uppercase tracking-wider">Support</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                variant="glass"
                className="overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-text-primary pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}