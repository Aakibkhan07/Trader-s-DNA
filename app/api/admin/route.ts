import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Helper to check admin
async function isAdmin(supabase: ReturnType<typeof createClient>) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()
  
  return profile?.is_admin || false
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section') || 'overview'

    if (section === 'users') {
      const limit = parseInt(searchParams.get('limit') || '50')
      const offset = parseInt(searchParams.get('offset') || '0')
      const search = searchParams.get('search') || ''

      let query = supabase
        .from('profiles')
        .select('*, subscriptions(*)')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (search) {
        query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`)
      }

      const { data: users, error } = await query

      if (error) throw error

      return NextResponse.json({ users })
    }

    if (section === 'subscriptions') {
      const { data: subscriptions, error } = await supabase
        .from('subscriptions')
        .select('*, profiles(email, full_name)')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error

      return NextResponse.json({ subscriptions })
    }

    if (section === 'analytics') {
      // Get platform analytics
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const { count: activeSubscriptions } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      const { data: recentReports } = await supabase
        .from('ai_reports')
        .select('overall_score, created_at')
        .order('created_at', { ascending: false })
        .limit(30)

      const avgScore = recentReports?.length
        ? Math.round(recentReports.reduce((sum, r) => sum + r.overall_score, 0) / recentReports.length)
        : 0

      return NextResponse.json({
        analytics: {
          totalUsers: totalUsers || 0,
          activeSubscriptions: activeSubscriptions || 0,
          avgScore,
          reportsThisMonth: recentReports?.length || 0,
        }
      })
    }

    if (section === 'tickets') {
      const { data: tickets, error } = await supabase
        .from('support_tickets')
        .select('*, profiles(email, full_name)')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      return NextResponse.json({ tickets })
    }

    return NextResponse.json({ error: 'Invalid section' }, { status: 400 })
  } catch (error) {
    console.error('Admin error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    
    if (!(await isAdmin(supabase))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { action, userId, ticketId, ...data } = body

    if (action === 'update_user') {
      const { data: user, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ user })
    }

    if (action === 'update_ticket') {
      const { data: ticket, error } = await supabase
        .from('support_tickets')
        .update(data)
        .eq('id', ticketId)
        .select()
        .single()

      if (error) throw error
      return NextResponse.json({ ticket })
    }

    if (action === 'toggle_feature') {
      // Feature toggles would be stored in a separate table
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Admin patch error:', error)
    return NextResponse.json(
      { error: 'Failed to update' },
      { status: 500 }
    )
  }
}