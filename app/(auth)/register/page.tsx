'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, Button, Input } from '@/components/ui'
import { Dna, Mail, Lock, User, Chrome } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
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
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-electric to-accent-emerald flex items-center justify-center">
              <Dna className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-text-primary">Trader's DNA</span>
          </Link>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create your account</h1>
          <p className="text-text-secondary">Start your trading psychology journey</p>
        </div>

        <Card variant="glass" className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your name"
              icon={<User className="w-5 h-5" />}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              placeholder="Create a password"
              icon={<Lock className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helper="Must be at least 8 characters"
              required
            />

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Create Account
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

          <p className="text-xs text-text-tertiary text-center mt-6">
            By signing up, you agree to our{' '}
            <Link href="#" className="text-accent-electric">Terms</Link>
            {' '}and{' '}
            <Link href="#" className="text-accent-electric">Privacy Policy</Link>
          </p>

          <p className="text-center text-sm text-text-secondary mt-4">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-accent-electric hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}