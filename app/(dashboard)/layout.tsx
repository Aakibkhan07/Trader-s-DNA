'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui'
import {
  Dna,
  LayoutDashboard,
  Upload,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  MessageSquare,
  LogOut,
  ChevronLeft,
  Sparkles,
  Zap,
  Flame,
  Target,
  Calculator,
  TrendingUp,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/profit', label: 'Profit Hub', icon: TrendingUp },
  { href: '/dashboard/analyze', label: 'Analyze', icon: Upload },
  { href: '/dashboard/validator', label: 'Trade Validator', icon: CheckCircle },
  { href: '/dashboard/winrate', label: 'Win Optimizer', icon: Target },
  { href: '/dashboard/journal', label: 'Journal', icon: BookOpen },
  { href: '/dashboard/performance', label: 'Performance', icon: BarChart3 },
  { href: '/dashboard/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/dashboard/mentor', label: 'AI Mentor', icon: MessageSquare },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

function CheckCircle(props: any) {
  return <Zap {...props} />
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 280 }}
        className="fixed left-0 top-0 h-screen bg-bg-secondary border-r border-white/5 z-40 flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-electric to-accent-emerald flex items-center justify-center">
              <Dna className="w-5 h-5 text-black" />
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-text-primary">Trader's DNA</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-text-tertiary hover:text-text-secondary transition-colors"
          >
            <ChevronLeft className={cn('w-5 h-5 transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-accent-electric/10 text-accent-electric'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-electric"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Roast Mode Toggle */}
        {!collapsed && (
          <div className="p-4 border-t border-white/5">
            <div className="p-4 rounded-xl bg-gradient-to-r from-accent-amber/10 to-red-500/10 border border-accent-amber/20">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-accent-amber" />
                <span className="text-sm font-medium text-accent-amber">Savage Scan Mode</span>
              </div>
              <p className="text-xs text-text-tertiary">
                Brutal honest AI feedback that doesn't hold back
              </p>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="p-4 border-t border-white/5">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-purple to-accent-electric flex items-center justify-center text-sm font-bold text-white">
              RS
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">Rahul Sharma</p>
                <p className="text-xs text-text-tertiary">Pro Plan</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          collapsed ? 'ml-20' : 'ml-[280px]'
        )}
      >
        {children}
      </main>
    </div>
  )
}