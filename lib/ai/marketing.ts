import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Use fetch directly for Groq (free, no API key needed for basic usage)
async function generateWithGroq(prompt: string, systemPrompt: string): Promise<string | null> {
  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) {
    console.error('No Groq API key configured')
    return null
  }
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })
    const data = await response.json()
    if (data.error) {
      console.error('Groq API error:', data.error)
      return null
    }
    return data.choices?.[0]?.message?.content || null
  } catch (error: any) {
    console.error('Groq error:', error?.message || error)
    return null
  }
}

export async function generateMarketingContent(
  type: 'blog' | 'instagram' | 'twitter' | 'youtube' | 'market_recap',
  topic: string
): Promise<string> {
  const prompts: Record<string, string> = {
    blog: `Write a comprehensive blog post about "${topic}" for traders. 
    Include:
    - Catchy title
    - Introduction
    - 3-4 main sections with subheadings
    - Practical tips traders can use
    - Conclusion with CTA
    Target: 1000-1500 words, conversational but authoritative.`,
    
    instagram: `Create an Instagram post about "${topic}".
    Include:
    - Hook (attention grabbing)
    - Core message (3-5 sentences)
    - Call to action
    - 5 relevant hashtags
    Keep it engaging and visual-friendly.`,

    twitter: `Create a tweet thread (3-5 tweets) about "${topic}".
    Each tweet should:
    - Be under 280 characters
    - Have a hook
    - Include value/insight
    - End with engagement question`,

    youtube: `Create a YouTube video script for "${topic}".
    Include:
    - Hook (first 30 seconds)
    - Outline (timestamps)
    - Main content points
    - CTA/end screen
    Duration: 8-12 minutes`,

    market_recap: `Create a daily market recap for Indian markets.
    Include:
    - Nifty/Bank Nifty levels
    - Key sectors performance
    - Market mood
    - Technical outlook
    - Trading tips for tomorrow`
  }

  try {
    const userPrompt = prompts[type] || prompts.blog
    const systemPrompt = 'You are an expert financial content writer specializing in trading and investing. Create engaging, informative content.'

    const result = await generateWithGroq(userPrompt, systemPrompt)
    if (result) return result

    return getFallbackContent(type, topic || 'trading')
  } catch (error) {
    console.error('Marketing content error:', error)
    return getFallbackContent(type, topic || 'trading')
  }
}

function getFallbackContent(type: string, topic: string): string {
  const fallbacks: Record<string, string> = {
    blog: `## ${topic.charAt(0).toUpperCase() + topic.slice(1)} Guide for Traders\n\n### Introduction\nUnderstanding ${topic} is crucial for consistent profitability in trading. This comprehensive guide will walk you through the essential concepts and practical strategies.\n\n### Key Concepts\n1. **Foundation**: Start with the basics and build your knowledge progressively\n2. **Risk Management**: Never risk more than 2% on any single trade\n3. **Psychology**: Your mental state directly impacts trading decisions\n\n### Actionable Tips\n- Keep a trading journal to track your decisions\n- Review your trades weekly to identify patterns\n- Focus on process over outcomes\n\n### Conclusion\nSuccess in trading comes from continuous learning and disciplined execution. Start implementing these strategies today and track your progress over time.`,
    
    instagram: `🎯 ${topic.charAt(0).toUpperCase() + topic.slice(1)} for Traders\n\nThe secret to consistent profits? It's not what you think.\n\nIt's NOT about:\n❌ Finding the perfect indicator\n❌ Having the best strategy\n❌ Predicting the market\n\nIt IS about:\n✅ Trading psychology\n✅ Risk management\n✅ Discipline\n\nSave this for later! 📌\n\n#trading #tradingpsychology #trader #stockmarket #forex`,
    
    twitter: `1/5 🎯 ${topic} in Trading\n\nThe biggest mistake traders make? Focusing on signals instead of psychology.\n\nHere's what actually works 👇\n\n2/5: Track your emotions - Are you trading based on FOMO or analysis?\n\n3/5: Risk 2% max per trade - Protect your capital!\n\n4/5: Keep a journal - Every trade, every thought, every emotion.\n\n5/5: Review weekly - Patterns emerge when you look back.\n\nWhat's your biggest trading challenge? 👇`,
    
    youtube: `${topic.charAt(0).toUpperCase() + topic.slice(1)} for Traders\n\n[HOOK]\nMost traders fail because they focus on the wrong things. Today I'll show you what actually matters.\n\n[TIMESTAMPS]\n0:00 - Introduction\n1:30 - Common Mistakes\n3:00 - Key Strategies\n6:00 - Live Examples\n9:00 - Action Steps\n\n[MAIN CONTENT]\n- Understanding the fundamentals\n- Practical application\n- Real trading scenarios\n\n[CTA]\nSubscribe for more trading tips!`,
    
    market_recap: `📊 Daily Market Recap\n\n**Nifty**: Closed at 22,350, down 0.5%\n**Bank Nifty**: Closed at 48,200, down 0.8%\n\n**Key Observations**:\n- IT and Pharma led the decline\n- Banking sector showed resilience\n- FIIs continued selling\n\n**Tomorrow's Strategy**:\n- Look for buying opportunities in strong sectors\n- Use stops at key support levels\n- Maintain 2% risk per trade\n\n**Mood**: Cautious 🟡`
  }
  return fallbacks[type] || fallbacks.blog
}

export async function generateTradeAdvice(userQuestion: string, context?: any): Promise<string> {
  const prompt = `You are Trader's DNA's AI Trading Mentor - a wise, experienced trader who helps others improve.
  
User's question: ${userQuestion}
Context: ${JSON.stringify(context || {})}

Provide a helpful, encouraging response that:
- Answers their question directly
- Shares relevant experience/insights
- Gives actionable advice
- Keeps tone supportive but honest

If they're asking about psychology, focus on the mental game.
If they're asking about strategy, keep it simple and practical.
If they're upset/frustrated, be extra empathetic.

End with a brief summary or action step.`

  try {
    const result = await generateWithGroq(
      prompt, 
      'You are a supportive trading mentor with years of experience. Be wise, patient, and practical. Help traders improve their psychology and performance.'
    )
    if (result) return result

    return getFallbackAdvice(userQuestion)
  } catch (error) {
    console.error('Mentor advice error:', error)
    return getFallbackAdvice(userQuestion)
  }
}

function getFallbackAdvice(question: string): string {
  const lowerQ = question.toLowerCase()
  
  if (lowerQ.includes('win rate')) {
    return `To improve your win rate, focus on these key areas:\n\n**1. Better Entry Timing**\nWait for confirmed setups. Don't chase price.\n\n**2. Risk/Reward Ratio**\nUse at least 1:2 RR. This means you only need 40% win rate to be profitable.\n\n**3. Trade Journal**\nRecord every trade with: Entry reason, emotion before/during/after, outcome.\n\n**4. Review Weekly**\nLook for patterns in your winning vs losing trades.\n\nStart with these and track your progress. Small improvements compound!`
  }
  
  if (lowerQ.includes('psychology') || lowerQ.includes('emotion')) {
    return `Trading psychology is where most traders struggle. Here's how to improve:\n\n**1. Self-Awareness**\nKnow your emotional triggers. What makes you revenge trade?\n\n**2. Pre-Trade Routine**\nBefore any trade, ask: "Am I trading my plan or my emotion?"\n\n**3. Position Sizing**\nSmaller positions = less emotional attachment = better decisions.\n\n**4. Take Breaks**\nAfter 2 losing trades, step away. Never trade while tilted.\n\n**5. Journal Everything**\nYour journal reveals patterns. Review it weekly.\n\nRemember: The market will always be there. Protect your capital first!`
  }
  
  if (lowerQ.includes('loss') || lowerQ.includes('losing')) {
    return `Handling losses is crucial for long-term success:\n\n**1. Accept Losses**\nThey're part of trading. Even the best traders lose 40% of trades.\n\n**2. Never Revenge Trade**\nTaking bigger risks to "make back" losses destroys accounts.\n\n**3. Review, Don't Blame**\nAsk: "Was this a valid setup?" not "Why did I lose?"\n\n**4. The Math Works**\nWith 1:2 RR and 40% win rate, you're profitable. Trust the process.\n\n**5. Take a Break**\nAfter 3 losses, step away. Clear your mind.\n\nLosses are tuition. Learn the lessons!`
  }
  
  return `Great question! Here's my advice:\n\n**Key Principles:**\n• Focus on process, not outcomes\n• Risk only 2% per trade\n• Keep a trading journal\n• Review trades weekly\n• Never trade emotionally\n\n**Start Here:**\n1. Define your trading plan\n2. Pick 2-3 setups and master them\n3. Track every trade with emotions\n4. Review and improve weekly\n\nRemember: Consistency beats intensity. Small, steady improvements lead to big results over time!\n\nIs there a specific area you'd like to dive deeper into?`
}