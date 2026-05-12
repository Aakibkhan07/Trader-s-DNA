import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Telegram Bot API
const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action } = body

    if (action === 'connect') {
      // Generate connect link
      const connectUrl = `https://t.me/${process.env.TELEGRAM_BOT_NAME?.replace('@', '')}?start=${user.id}`
      
      return NextResponse.json({
        connectUrl,
        message: 'Click the link to connect your Telegram account',
      })
    }

    if (action === 'disconnect') {
      await supabase
        .from('telegram_connections')
        .delete()
        .eq('user_id', user.id)

      return NextResponse.json({ success: true })
    }

    if (action === 'send_report') {
      const { report, score } = body

      // Get user's Telegram chat ID
      const { data: connection } = await supabase
        .from('telegram_connections')
        .select('telegram_chat_id')
        .eq('user_id', user.id)
        .single()

      if (!connection?.telegram_chat_id) {
        return NextResponse.json({ error: 'Telegram not connected' }, { status: 400 })
      }

      // Send message via Telegram
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: connection.telegram_chat_id,
          text: `📊 *Trade Analysis Report*\n\nScore: ${score}/100\nType: ${report.trader_type}\n\nPsychology: ${report.psychology_score}%\nDiscipline: ${report.discipline_score}%\nRisk: ${report.risk_score}%`,
          parse_mode: 'Markdown',
        }),
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Telegram error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Telegram Webhook for bot
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    // Handle /start command with user ID
    if (body.message?.text?.startsWith('/start')) {
      const userId = body.message.text.split(' ')[1]
      
      if (userId) {
        // Store the connection
        await supabase
          .from('telegram_connections')
          .upsert({
            user_id: userId,
            telegram_chat_id: body.message.chat.id,
            connected_at: new Date().toISOString(),
          }, { onConflict: 'user_id' })

        // Send welcome message
        await fetch(`${TELEGRAM_API}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: body.message.chat.id,
            text: "🎉 *Trader's DNA Connected!*\n\nYou will receive:\n• Daily trading summaries\n• Psychology alerts\n• Performance updates\n\nUse /disconnect to disconnect.",
            parse_mode: 'Markdown',
          }),
        })
      }
    }

    // Handle /disconnect
    if (body.message?.text === '/disconnect') {
      await supabase
        .from('telegram_connections')
        .delete()
        .eq('telegram_chat_id', body.message.chat.id)

      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: body.message.chat.id,
          text: "Trader's DNA disconnected. You will no longer receive updates.",
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}