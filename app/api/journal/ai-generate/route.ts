import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateJournalEntry } from '@/lib/ai/trading'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type, tradeId } = body

    // Get recent trade data for context
    const { data: recentTrades } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    // Generate AI journal entry using real AI
    const journalData = {
      recentTrades: recentTrades?.map(t => ({
        score: t.overall_score,
        type: t.trader_type,
        psychology: t.psychology_score,
        date: t.created_at
      })),
      type,
      tradeId
    }

    let journalEntry
    try {
      journalEntry = await generateJournalEntry(type, journalData)
    } catch (aiError) {
      console.error('AI Journal generation error:', aiError)
      // Fallback
      journalEntry = {
        title: `${type?.replace('_', ' ')} - ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
        content: 'Journal entry generation is temporarily unavailable. Please try again later.',
        mood: 'neutral'
      }
    }

    // Save the generated entry
    const { data: entry, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        title: journalEntry.title,
        content: journalEntry.content,
        mood: journalEntry.mood,
        tags: ['ai-generated', type],
        trade_id: tradeId,
        ai_generated: true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ entry })
  } catch (error) {
    console.error('AI journal error:', error)
    return NextResponse.json(
      { error: 'Failed to generate journal entry' },
      { status: 500 }
    )
  }
}