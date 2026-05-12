import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ entries })
  } catch (error) {
    console.error('Get journal error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch journal' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, mood, tags, trade_id } = body

    const { data: entry, error } = await supabase
      .from('journal_entries')
      .insert({
        user_id: user.id,
        title,
        content,
        mood,
        tags: tags || [],
        trade_id,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ entry })
  } catch (error) {
    console.error('Create journal error:', error)
    return NextResponse.json(
      { error: 'Failed to create journal entry' },
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
    const { id, ...updates } = body

    const { data: entry, error } = await supabase
      .from('journal_entries')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ entry })
  } catch (error) {
    console.error('Update journal error:', error)
    return NextResponse.json(
      { error: 'Failed to update journal entry' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete journal error:', error)
    return NextResponse.json(
      { error: 'Failed to delete journal entry' },
      { status: 500 }
    )
  }
}