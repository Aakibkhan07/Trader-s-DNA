'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, Button, Badge, Input } from '@/components/ui'
import {
  Users,
  CreditCard,
  BarChart3,
  Ticket,
  Settings,
  Search,
  TrendingUp,
  DollarSign,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '12,847', icon: Users, change: '+12%', color: '#00d4ff' },
  { label: 'Active Subs', value: '3,241', icon: CreditCard, change: '+8%', color: '#00ff88' },
  { label: 'Revenue (Mo)', value: '₹18.2L', icon: DollarSign, change: '+24%', color: '#8b5cf6' },
  { label: 'Avg Score', value: '72', icon: TrendingUp, change: '+5%', color: '#f59e0b' },
]

const recentUsers = [
  { email: 'rahul.trader@gmail.com', plan: 'pro', joined: '2h ago', score: 78 },
  { email: 'priya.stock@yahoo.com', plan: 'premium', joined: '5h ago', score: 85 },
  { email: 'amit.finance@outlook.com', plan: 'free', joined: '1d ago', score: 52 },
  { email: 'vijay.trading@gmail.com', plan: 'pro', joined: '1d ago', score: 71 },
]

const recentTickets = [
  { subject: 'Cannot upload screenshots', status: 'open', priority: 'high', user: 'rahul.trader@gmail.com' },
  { subject: 'Payment failed', status: 'in_progress', priority: 'high', user: 'priya.stock@yahoo.com' },
  { subject: 'Telegram not connecting', status: 'open', priority: 'medium', user: 'amit.finance@outlook.com' },
  { subject: 'Question about plans', status: 'resolved', priority: 'low', user: 'vijay.trading@gmail.com' },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'tickets', label: 'Support Tickets', icon: Ticket },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-white/5 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Admin Panel</h1>
            <p className="text-text-tertiary">Manage your platform</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="success">System Healthy</Badge>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-bg-secondary/50 border-b border-white/5 px-8">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-accent-electric text-accent-electric'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card variant="glass" className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      <Badge variant="success" size="sm">{stat.change}</Badge>
                    </div>
                    <div className="text-3xl font-bold text-text-primary">{stat.value}</div>
                    <div className="text-sm text-text-tertiary mt-1">{stat.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Recent Users */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Users</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{user.email}</p>
                        <p className="text-xs text-text-tertiary">{user.joined}</p>
                      </div>
                      <Badge
                        variant={user.plan === 'premium' ? 'purple' : user.plan === 'pro' ? 'info' : 'default'}
                        size="sm"
                      >
                        {user.plan}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Tickets */}
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Recent Tickets</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-4">
                  {recentTickets.map((ticket, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`w-4 h-4 ${
                          ticket.priority === 'high' ? 'text-red-400' :
                          ticket.priority === 'medium' ? 'text-amber-400' : 'text-text-tertiary'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-text-primary">{ticket.subject}</p>
                          <p className="text-xs text-text-tertiary">{ticket.user}</p>
                        </div>
                      </div>
                      <Badge
                        variant={ticket.status === 'open' ? 'danger' : ticket.status === 'in_progress' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search users..."
                  icon={<Search className="w-5 h-5" />}
                />
              </div>
              <Button>Export</Button>
            </div>

            <Card variant="glass" className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-bg-elevated">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-text-secondary">User</th>
                    <th className="text-left p-4 text-sm font-medium text-text-secondary">Plan</th>
                    <th className="text-left p-4 text-sm font-medium text-text-secondary">Score</th>
                    <th className="text-left p-4 text-sm font-medium text-text-secondary">Joined</th>
                    <th className="text-left p-4 text-sm font-medium text-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="p-4 text-sm text-text-primary">{user.email}</td>
                      <td className="p-4">
                        <Badge variant={user.plan === 'premium' ? 'purple' : user.plan === 'pro' ? 'info' : 'default'} size="sm">
                          {user.plan}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-text-primary">{user.score}</td>
                      <td className="p-4 text-sm text-text-tertiary">{user.joined}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}

        {activeTab === 'tickets' && (
          <Card variant="glass" className="p-6">
            <div className="space-y-4">
              {recentTickets.map((ticket, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-bg-elevated rounded-lg">
                  <div className="flex items-center gap-4">
                    {ticket.status === 'open' && <Ticket className="w-5 h-5 text-red-400" />}
                    {ticket.status === 'in_progress' && <Clock className="w-5 h-5 text-amber-400" />}
                    {ticket.status === 'resolved' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    <div>
                      <p className="font-medium text-text-primary">{ticket.subject}</p>
                      <p className="text-sm text-text-tertiary">{ticket.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'default'} size="sm">
                      {ticket.priority}
                    </Badge>
                    <Button variant="ghost" size="sm">Reply</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card variant="glass" className="p-8 max-w-2xl">
            <h3 className="text-lg font-semibold mb-6">Platform Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">User Registrations</p>
                  <p className="text-sm text-text-tertiary">Allow new user signups</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-accent-electric/20 p-1">
                  <div className="w-4 h-4 rounded-full bg-accent-electric ml-6" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">AI Analysis</p>
                  <p className="text-sm text-text-tertiary">Enable AI trade analysis</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-accent-electric p-1">
                  <div className="w-4 h-4 rounded-full bg-white ml-6" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-text-primary">Savage Mode</p>
                  <p className="text-sm text-text-tertiary">Enable brutal feedback mode</p>
                </div>
                <button className="w-12 h-6 rounded-full bg-accent-electric/20 p-1">
                  <div className="w-4 h-4 rounded-full bg-accent-electric ml-6" />
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}