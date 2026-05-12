'use client'

import { motion } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    interval: 'forever',
    description: 'Perfect for trying out the basics',
    features: [
      { text: '3 AI analyses per month', included: true },
      { text: 'Basic DNA breakdown', included: true },
      { text: 'Psychology score', included: true },
      { text: 'AI Mentor access', included: false },
      { text: 'Telegram reports', included: false },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '499',
    interval: 'month',
    description: 'For serious traders ready to level up',
    features: [
      { text: 'Unlimited AI analyses', included: true },
      { text: 'Full DNA breakdown', included: true },
      { text: 'Psychology tracking', included: true },
      { text: 'AI Mentor access', included: true },
      { text: 'Telegram reports', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Go Pro',
    highlighted: true,
    popular: true,
  },
  {
    name: 'Premium',
    price: '1499',
    interval: 'month',
    description: 'For funded traders & institutions',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Advanced behavioral analytics', included: true },
      { text: '1-on-1 coaching calls', included: true },
      { text: 'Prop firm protection mode', included: true },
      { text: 'Custom strategy development', included: true },
      { text: 'Priority support', included: true },
      { text: 'API access', included: true },
    ],
    cta: 'Go Premium',
    highlighted: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-bg-primary" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent-electric text-sm font-medium uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Invest in Your Trading Future</h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                variant={plan.highlighted ? 'elevated' : 'glass'}
                className={`p-6 relative ${plan.highlighted ? 'border-accent-electric/50' : ''}`}
              >
                {plan.popular && (
                  <Badge variant="info" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold text-text-primary">
                    ₹{plan.price}
                    <span className="text-sm font-normal text-text-tertiary">/{plan.interval}</span>
                  </p>
                  <p className="text-sm text-text-tertiary mt-2">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-accent-emerald flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-text-tertiary flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-text-primary' : 'text-text-tertiary'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/auth/register">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'secondary'}
                    className="w-full"
                    glow={plan.highlighted}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-text-tertiary mt-8"
        >
          All plans include a 7-day money-back guarantee
        </motion.p>
      </div>
    </section>
  )
}