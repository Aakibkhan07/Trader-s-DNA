export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  plan: 'free' | 'pro' | 'premium'
  psychology_score: number
  total_trades: number
  win_rate: number
  current_streak: number
  best_streak: number
  telegram_id?: string
  is_admin: boolean
  email_verified: boolean
  created_at: string
  updated_at: string
}

export interface TradeUpload {
  id: string
  user_id: string
  image_url: string
  upload_type: 'trade' | 'tradingview' | 'pnl'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  created_at: string
}

export interface AIReport {
  id: string
  upload_id: string
  user_id: string
  overall_score: number
  trade_score: number
  psychology_score: number
  discipline_score: number
  risk_score: number
  confidence_score: number
  trader_type: string
  mistakes: Mistake[]
  psychology: PsychologyAnalysis
  risk: RiskAnalysis
  suggestions: Suggestion[]
  mentor_advice: string
  roast_mode: boolean
  created_at: string
}

export interface Mistake {
  type: string
  description: string
  severity: 'low' | 'medium' | 'high'
  suggestion: string
}

export interface PsychologyAnalysis {
  emotional_state: string
  confidence_level: number
  patience_score: number
  impulsive_behavior: boolean
  revenge_trading_indicators: boolean
  fomo_indicators: boolean
  fear_level: number
  greed_level: number
}

export interface RiskAnalysis {
  risk_score: number
  position_sizing: string
  risk_reward_ratio: number
  stop_loss_quality: string
  exposure_level: string
}

export interface Suggestion {
  category: string
  text: string
  priority: 'low' | 'medium' | 'high'
}

export interface PsychologyReport {
  id: string
  user_id: string
  emotional_score: number
  revenge_trading: boolean
  fomo_score: number
  overtrading: boolean
  fear_level: number
  greed_level: number
  patience_score: number
  discipline_score: number
  behavioral_patterns: Record<string, unknown>
  emotional_triggers: string[]
  improvement_areas: string[]
  created_at: string
}

export interface JournalEntry {
  id: string
  user_id: string
  title: string
  content: string
  mood: 'excited' | 'confident' | 'neutral' | 'anxious' | 'frustrated' | 'scared'
  tags: string[]
  trade_id?: string
  ai_generated: boolean
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: string
  razorpay_subscription_id?: string
  razorpay_customer_id?: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  current_period_start?: string
  current_period_end?: string
  created_at: string
}

export interface Achievement {
  id: string
  user_id: string
  achievement_type: string
  title: string
  description?: string
  icon?: string
  earned_at: string
}

export interface LeaderboardEntry {
  id: string
  user_id: string
  period: 'daily' | 'weekly' | 'monthly' | 'all_time'
  psychology_score: number
  total_analyses: number
  streak_days: number
  rank: number
}

export interface Plan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  highlighted?: boolean
}

export interface NavItem {
  label: string
  href: string
  icon?: string
  badge?: string
}

export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface TimeSeriesData {
  timestamp: string
  value: number
}

export interface AnalysisFilters {
  dateRange?: string
  traderType?: string
  minScore?: number
  maxScore?: number
}