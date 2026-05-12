import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const PLANS = {
  pro: {
    name: 'Pro',
    planId: 'plan_pro_monthly',
    interval: 'monthly' as const,
  },
  premium: {
    name: 'Premium',
    planId: 'plan_premium_monthly',
    interval: 'monthly' as const,
  },
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { plan } = body

    if (!PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planConfig = PLANS[plan as keyof typeof PLANS]

    // In production, integrate with actual Razorpay API
    // For demo, we create a subscription record directly
    const mockSubscriptionId = `sub_${Date.now()}`
    const mockCustomerId = `cust_${Date.now()}`

    // Save to database
    const { data: sub, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan: plan,
        razorpay_subscription_id: mockSubscriptionId,
        razorpay_customer_id: mockCustomerId,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    // Update user plan
    await supabase
      .from('profiles')
      .update({ plan })
      .eq('id', user.id)

    return NextResponse.json({
      subscription: sub,
      checkoutUrl: '/dashboard',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Get subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Update in database
    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('user_id', user.id)
      .eq('status', 'active')

    // Update user plan to free
    await supabase
      .from('profiles')
      .update({ plan: 'free' })
      .eq('id', user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cancel subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}