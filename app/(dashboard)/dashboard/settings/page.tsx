'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Input, Badge } from '@/components/ui'
import Link from 'next/link'
import {
  Settings,
  User,
  Bell,
  CreditCard,
  Shield,
  MessageSquare,
  ArrowLeft,
  Check,
  ExternalLink,
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'telegram', label: 'Telegram', icon: MessageSquare },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" icon={<ArrowLeft size={16} />} className="mb-2">Back</Button>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">Manage your account preferences</p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === tab.id
                  ? 'bg-accent-electric/10 text-accent-electric'
                  : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-electric flex items-center justify-center text-2xl font-bold text-white">
                      RS
                    </div>
                    <Button variant="secondary" size="sm">Change Avatar</Button>
                  </div>

                  <Input label="Full Name" value="Rahul Sharma" />
                  <Input label="Email" value="rahul.trader@gmail.com" disabled helper="Contact support to change email" />
                  <Input label="Telegram ID" value="@rahul_trader" />

                  <div className="pt-4">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Daily trading summary', desc: 'Get a daily recap of your trades' },
                    { label: 'Psychology alerts', desc: 'Alert when emotional patterns detected' },
                    { label: 'Streak reminders', desc: 'Daily reminder to maintain streak' },
                    { label: 'New features', desc: 'Learn about new platform features' },
                    { label: 'Marketing emails', desc: 'Tips and educational content' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                      <div>
                        <p className="font-medium text-text-primary">{item.label}</p>
                        <p className="text-sm text-text-tertiary">{item.desc}</p>
                      </div>
                      <button className="w-12 h-6 rounded-full bg-accent-electric p-1">
                        <div className="w-4 h-4 rounded-full bg-white ml-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Subscription</h2>
                
                <div className="p-4 bg-accent-electric/10 rounded-xl border border-accent-electric/20 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-text-primary">Pro Plan</p>
                      <p className="text-sm text-text-tertiary">₹499/month • Renews on June 15, 2026</p>
                    </div>
                    <Badge variant="success">Active</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="secondary" className="w-full">Upgrade Plan</Button>
                  <Button variant="ghost" className="w-full text-danger">Cancel Subscription</Button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="font-medium text-text-primary mb-4">Billing History</h3>
                  {[
                    { date: 'May 15, 2026', amount: '₹499', status: 'Paid' },
                    { date: 'April 15, 2026', amount: '₹499', status: 'Paid' },
                    { date: 'March 15, 2026', amount: '₹499', status: 'Paid' },
                  ].map((bill, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-text-secondary">{bill.date}</span>
                      <span className="text-text-primary">{bill.amount}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'telegram' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Telegram Integration</h2>
                
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent-purple/20 mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-accent-purple" />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">Connect Telegram</h3>
                  <p className="text-text-secondary mb-6 max-w-sm mx-auto">
                    Get real-time trading insights, daily summaries, and psychology alerts directly on Telegram.
                  </p>
                  <Button icon={<ExternalLink size={16} />}>Connect Telegram</Button>
                </div>

                <div className="mt-8 p-4 bg-bg-elevated rounded-xl">
                  <h4 className="font-medium text-text-primary mb-3">What's included:</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-emerald" /> Daily trading summary</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-emerald" /> Psychology alerts</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-emerald" /> Streak reminders</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-emerald" /> Performance insights</li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-bg-elevated rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">Password</span>
                      <Button variant="ghost" size="sm">Change</Button>
                    </div>
                    <p className="text-sm text-text-tertiary">Last changed 30 days ago</p>
                  </div>

                  <div className="p-4 bg-bg-elevated rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">Two-Factor Authentication</span>
                      <Badge variant="warning">Not Enabled</Badge>
                    </div>
                    <p className="text-sm text-text-tertiary mb-3">Add extra security to your account</p>
                    <Button variant="secondary" size="sm">Enable 2FA</Button>
                  </div>

                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <p className="font-medium text-red-400 mb-2">Danger Zone</p>
                    <p className="text-sm text-text-tertiary mb-3">Permanently delete your account and all data</p>
                    <Button variant="danger" size="sm">Delete Account</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}