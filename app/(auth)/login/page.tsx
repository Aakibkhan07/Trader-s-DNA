'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, Button, Input } from '@/components/ui'
import { Dna, Mail, Lock, Chrome } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-electric/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-electric to-accent-emerald flex items-center justify-center">
              <Dna className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-text-primary">Trader's DNA</span>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome back</h1>
          <p className="text-text-secondary">Sign in to continue your journey</p>
        </div>

        <Card variant="glass" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            <Input
              type="email"
              label="Email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={<Lock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-bg-elevated" />
                <span className="text-sm text-text-secondary">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-accent-electric hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Sign In
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-bg-card text-text-tertiary text-sm">or continue with</span>
            </div>
          </div>

          <Button variant="secondary" className="w-full" icon={<Chrome className="w-5 h-5" />}>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-accent-electric hover:underline">
              Sign up
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}