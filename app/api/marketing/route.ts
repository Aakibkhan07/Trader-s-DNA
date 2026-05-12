import { NextRequest, NextResponse } from 'next/server'
import { generateMarketingContent, generateTradeAdvice } from '@/lib/ai/marketing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, topic, question, context } = body

    // Handle AI mentor chat
    if (type === 'mentor_chat') {
      const advice = await generateTradeAdvice(question || body.message, context)
      return NextResponse.json({ content: advice })
    }

    // Handle marketing content generation
    const content = await generateMarketingContent(
      type || 'blog',
      topic || 'trading psychology'
    )

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Content generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}