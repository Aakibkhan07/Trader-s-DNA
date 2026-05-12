import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get profile with subscription
    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        subscription:subscriptions(*)
      `)
      .eq('id', user.id)
      .single()

    if (error) throw error

    // Get recent stats
    const { data: recentReports } = await supabase
      .from('ai_reports')
      .select('overall_score')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(30)

    const avgScore = recentReports?.length 
      ? Math.round(recentReports.reduce((sum, r) => sum + r.overall_score, 0) / recentReports.length)
      : 0

    return NextResponse.json({
      profile: {
        ...profile,
        avgScore,
        reportsCount: recentReports?.length || 0,
      }
    })
  } catch (error) {
    console.error('Profile error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { full_name, avatar_url, telegram_id } = body

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        full_name,
        avatar_url,
        telegram_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}