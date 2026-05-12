-- TraderDNA Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
  psychology_score INTEGER DEFAULT 50,
  total_trades INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  telegram_id TEXT,
  is_admin BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trade Uploads
CREATE TABLE public.trade_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  upload_type TEXT CHECK (upload_type IN ('trade', 'tradingview', 'pnl')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Analysis Reports
CREATE TABLE public.ai_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES public.trade_uploads(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  overall_score INTEGER,
  trade_score INTEGER,
  psychology_score INTEGER,
  discipline_score INTEGER,
  risk_score INTEGER,
  confidence_score INTEGER,
  trader_type TEXT,
  mistakes JSONB DEFAULT '[]'::jsonb,
  psychology JSONB DEFAULT '{}'::jsonb,
  risk JSONB DEFAULT '{}'::jsonb,
  suggestions JSONB DEFAULT '[]'::jsonb,
  mentor_advice TEXT,
  roast_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Psychology Reports
CREATE TABLE public.psychology_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  emotional_score INTEGER,
  revenge_trading BOOLEAN DEFAULT false,
  fomo_score INTEGER,
  overtrading BOOLEAN DEFAULT false,
  fear_level INTEGER,
  greed_level INTEGER,
  patience_score INTEGER,
  discipline_score INTEGER,
  behavioral_patterns JSONB DEFAULT '{}'::jsonb,
  emotional_triggers JSONB DEFAULT '[]'::jsonb,
  improvement_areas JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journal Entries
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT,
  mood TEXT CHECK (mood IN ('excited', 'confident', 'neutral', 'anxious', 'frustrated', 'scared')),
  tags TEXT[] DEFAULT '{}',
  trade_id UUID REFERENCES public.trade_uploads(id),
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL,
  razorpay_subscription_id TEXT UNIQUE,
  razorpay_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due', 'trialing')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id),
  razorpay_payment_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- Leaderboard
CREATE TABLE public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  period TEXT CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
  psychology_score INTEGER,
  total_analyses INTEGER,
  streak_days INTEGER,
  rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Telegram Connections
CREATE TABLE public.telegram_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  telegram_chat_id TEXT UNIQUE,
  notifications_enabled BOOLEAN DEFAULT true,
  connected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  referee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Support Tickets
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psychology_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telegram_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Profile policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- Trade uploads policies
CREATE POLICY "Users can view own uploads" ON public.trade_uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create uploads" ON public.trade_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- AI Reports policies
CREATE POLICY "Users can view own reports" ON public.ai_reports FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reports" ON public.ai_reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Journal policies
CREATE POLICY "Users can view own journal" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own journal" ON public.journal_entries FOR ALL USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements" ON public.achievements FOR SELECT USING (auth.uid() = user_id);

-- Leaderboard policy (public read)
CREATE POLICY "Anyone can view leaderboard" ON public.leaderboard FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_trade_uploads_user_id ON public.trade_uploads(user_id);
CREATE INDEX idx_ai_reports_user_id ON public.ai_reports(user_id);
CREATE INDEX idx_ai_reports_created_at ON public.ai_reports(created_at DESC);
CREATE INDEX idx_psychology_reports_user_id ON public.psychology_reports(user_id);
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Trigger to create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();