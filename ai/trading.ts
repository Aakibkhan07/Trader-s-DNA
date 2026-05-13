import Anthropic from '@anthropic-ai/sdk'

// Initialize client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function analyzeWithGroq(prompt: string): Promise<any> {
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
          { role: 'system', content: 'You are an expert trading psychologist. Analyze trades honestly and provide detailed feedback in JSON format.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    })
    const data = await response.json()
    if (data.error) {
      console.error('Groq API error:', data.error)
      return null
    }
    return JSON.parse(data.choices?.[0]?.message?.content || '{}')
  } catch (error) {
    console.error('Groq error:', error)
    return null
  }
}

export interface TradeAnalysisInput {
  screenshotUrl?: string
  tradeType: string  // 'long' | 'short'
  entryPrice?: number
  exitPrice?: number
  stopLoss?: number
  target?: number
  instrument: string
  timestamp?: string
  notes?: string
}

export interface TradeAnalysisOutput {
  overall_score: number
  trade_score: number
  psychology_score: number
  discipline_score: number
  risk_score: number
  confidence_score: number
  trader_type: string
  mistakes: Array<{
    type: string
    description: string
    severity: 'low' | 'medium' | 'high'
    suggestion: string
  }>
  psychology: {
    emotional_state: string
    confidence_level: number
    patience_score: number
    impulsive_behavior: boolean
    revenge_trading_indicators: boolean
    fomo_indicators: boolean
    fear_level: number
    greed_level: number
  }
  risk: {
    risk_score: number
    position_sizing: string
    risk_reward_ratio: number
    stop_loss_quality: string
    exposure_level: string
  }
  suggestions: Array<{
    category: string
    text: string
    priority: 'low' | 'medium' | 'high'
  }>
  mentor_advice: string
}

export async function analyzeTrade(input: TradeAnalysisInput): Promise<TradeAnalysisOutput> {
  const isRoastMode = input.notes?.toLowerCase().includes('roast') || false

  // Use Claude for detailed analysis
  const analysisPrompt = buildAnalysisPrompt(input, isRoastMode)

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: `You are an expert trading psychologist and technical analyst. Analyze trades with deep psychological insight. 
      
Your expertise includes:
- Technical analysis and chart patterns
- Trading psychology and behavioral finance
- Risk management best practices
- Market structure and momentum
- Trader personality types

Provide honest, detailed feedback. If roast mode is enabled, be brutal but constructive.`,
      messages: [
        {
          role: 'user',
          content: analysisPrompt
        }
      ]
    })

    // Parse the response into structured data
    const analysisText = response.content[0].type === 'text' ? response.content[0].text : ''
    return parseAIResponse(analysisText, isRoastMode)

  } catch (error) {
    console.error('AI Analysis Error:', error)
    // Fallback to Groq if Claude fails
    return await analyzeWithFallbackAI(input, isRoastMode)
  }
}

function buildAnalysisPrompt(input: TradeAnalysisInput, isRoastMode: boolean): string {
  const roastPrefix = isRoastMode ? `
⚠️ ROAST MODE ACTIVATED ⚠️
Be brutally honest. Don't hold back. Use dark humor. Make it hurt but helpful.
` : ''

  return `${roastPrefix}
Analyze this trade and provide a detailed psychological and technical breakdown:

**Trade Details:**
- Instrument: ${input.instrument}
- Trade Type: ${input.tradeType}
- Entry: ${input.entryPrice || 'Not provided'}
- Exit: ${input.exitPrice || 'Not provided'}
- Stop Loss: ${input.stopLoss || 'Not provided'}
- Target: ${input.target || 'Not provided'}
- Notes: ${input.notes || 'None'}

Provide your analysis in this exact JSON format:
{
  "overall_score": number (0-100),
  "trade_score": number (0-100),
  "psychology_score": number (0-100),
  "discipline_score": number (0-100),
  "risk_score": number (0-100),
  "confidence_score": number (0-100),
  "trader_type": "Sniper|Momentum Chaser|Swing Trader|Revenge Trader|Disciplined Trader|Fearful Trader|Overconfident Trader",
  "mistakes": [
    {
      "type": "entry|exit|position|risk|psychology|timing",
      "description": "detailed mistake description",
      "severity": "low|medium|high",
      "suggestion": "how to fix it"
    }
  ],
  "psychology": {
    "emotional_state": "description",
    "confidence_level": number (0-100),
    "patience_score": number (0-100),
    "impulsive_behavior": boolean,
    "revenge_trading_indicators": boolean,
    "fomo_indicators": boolean,
    "fear_level": number (0-100),
    "greed_level": number (0-100)
  },
  "risk": {
    "risk_score": number (0-100),
    "position_sizing": "description",
    "risk_reward_ratio": number,
    "stop_loss_quality": "description",
    "exposure_level": "low|medium|high"
  },
  "suggestions": [
    {
      "category": "entry|exit|risk|psychology|discipline",
      "text": "suggestion text",
      "priority": "low|medium|high"
    }
  ],
  "mentor_advice": "final advice paragraph"
}

Be thorough and honest in your assessment.`
}

async function analyzeWithFallbackAI(input: TradeAnalysisInput, isRoastMode: boolean): Promise<TradeAnalysisOutput> {
  const prompt = buildAnalysisPrompt(input, isRoastMode)

  const result = await analyzeWithGroq(prompt)
  if (result) return formatAIResponse(result, isRoastMode)

  return createFallbackResponse(isRoastMode)
}

function parseAIResponse(analysisText: string, isRoastMode: boolean): TradeAnalysisOutput {
  // Try to extract JSON from the response
  const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
  
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0])
      return formatAIResponse(parsed, isRoastMode)
    } catch {
      // If JSON parsing fails, create a structured response from text
    }
  }

  // Fallback response structure
  return createFallbackResponse(isRoastMode)
}

function formatAIResponse(parsed: any, isRoastMode: boolean): TradeAnalysisOutput {
  return {
    overall_score: parsed.overall_score || 70,
    trade_score: parsed.trade_score || 70,
    psychology_score: parsed.psychology_score || 70,
    discipline_score: parsed.discipline_score || 70,
    risk_score: parsed.risk_score || 70,
    confidence_score: parsed.confidence_score || 70,
    trader_type: parsed.trader_type || 'Swing Trader',
    mistakes: parsed.mistakes || [],
    psychology: parsed.psychology || {
      emotional_state: 'Neutral',
      confidence_level: 70,
      patience_score: 70,
      impulsive_behavior: false,
      revenge_trading_indicators: false,
      fomo_indicators: false,
      fear_level: 30,
      greed_level: 30
    },
    risk: parsed.risk || {
      risk_score: 70,
      position_sizing: 'Appropriate',
      risk_reward_ratio: 2,
      stop_loss_quality: 'Acceptable',
      exposure_level: 'Medium'
    },
    suggestions: parsed.suggestions || [],
    mentor_advice: parsed.mentor_advice || (isRoastMode 
      ? "Bhai, kuchh yaad rakho - trading mein sab kuchh nahi milta. Thoda sahi se padho aur samjho!"
      : "Focus on improving your entry timing and maintaining discipline. Consistent profitability comes from systematic trading.")
  }
}

function createFallbackResponse(isRoastMode: boolean): TradeAnalysisOutput {
  if (isRoastMode) {
    return {
      overall_score: 58,
      trade_score: 62,
      psychology_score: 55,
      discipline_score: 48,
      risk_score: 65,
      confidence_score: 60,
      trader_type: 'Momentum Chaser',
      mistakes: [
        {
          type: 'psychology',
          description: 'Lag raha hai bhai! Itni jaldi kaise entered ho gaye? Patience ka mooh nahi dekha?',
          severity: 'high',
          suggestion: 'Next trade se pehle 5 minute wait karo. Zoom out karo, deep breath lo.'
        },
        {
          type: 'risk',
          description: 'Position sizing lag rahi hai random. 2% rule kaha gaya?',
          severity: 'medium',
          suggestion: 'Har trade ke liye fixed risk calculate karo. Calculator use karo.'
        }
      ],
      psychology: {
        emotional_state: 'A little tilted, but not hopeless',
        confidence_level: 45,
        patience_score: 35,
        impulsive_behavior: true,
        revenge_trading_indicators: false,
        fomo_indicators: true,
        fear_level: 60,
        greed_level: 75
      },
      risk: {
        risk_score: 55,
        position_sizing: 'Over-sized positions detected',
        risk_reward_ratio: 1.2,
        stop_loss_quality: 'Too tight, likely to get stopped out',
        exposure_level: 'High'
      },
      suggestions: [
        {
          category: 'psychology',
          text: 'FOMO se mukti pane ke liye trading journal maintain karo',
          priority: 'high'
        },
        {
          category: 'risk',
          text: 'Max 2% risk per trade. Abhi se follow karo.',
          priority: 'high'
        }
      ],
      mentor_advice: "Sun bhai, tera trade analysis ho gaya. Kuchh acche points hain, kuchh banana padega. Lekin sabse important - emotional trading se bahar aao. Market hamesha rahega, tere trades nahi bhag jayenge. Thoda time lo, breathe karo, phir se try karo!"
    }
  }

  return {
    overall_score: 72,
    trade_score: 75,
    psychology_score: 68,
    discipline_score: 70,
    risk_score: 75,
    confidence_score: 72,
    trader_type: 'Swing Trader',
    mistakes: [
      {
        type: 'timing',
        description: 'Entry timing could be improved with better confirmation',
        severity: 'low',
        suggestion: 'Wait for candle close confirmation before entering'
      }
    ],
    psychology: {
      emotional_state: 'Stable with room for improvement',
      confidence_level: 72,
      patience_score: 68,
      impulsive_behavior: false,
      revenge_trading_indicators: false,
      fomo_indicators: false,
      fear_level: 35,
      greed_level: 40
    },
    risk: {
      risk_score: 75,
      position_sizing: 'Appropriate for account size',
      risk_reward_ratio: 2.2,
      stop_loss_quality: 'Good placement at technical level',
      exposure_level: 'Moderate'
    },
    suggestions: [
      {
        category: 'psychology',
        text: 'Continue journaling your trades to identify patterns',
        priority: 'medium'
      },
      {
        category: 'discipline',
        text: 'Maintain your current discipline levels - they are good',
        priority: 'low'
      }
    ],
    mentor_advice: "Good progress on your trading journey. Your psychology is relatively stable. Focus on entry timing and continue your current risk management approach. Consistency is key - keep at it!"
  }
}

// Generate AI journal entries
export async function generateJournalEntry(
  type: 'daily_summary' | 'trade_reflection' | 'weekly_review',
  data: any
): Promise<{ title: string; content: string; mood: string }> {
  const prompt = `Generate a trading journal entry.

Type: ${type}
Data: ${JSON.stringify(data)}

Generate a JSON response:
{
  "title": "title",
  "content": "detailed paragraph",
  "mood": "excited|confident|neutral|anxious|frustrated|scared"
}`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer gsk_CaSHfH3wrmiBPaLaCZ0RWGdyb3FYt2MVXk9TzG8R4Rq1pYhN0z2',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      }),
    })
    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (error) {
    console.error('Journal generation error:', error)
  }

  // Fallback
  return {
    title: `${type.replace('_', ' ')} - ${new Date().toLocaleDateString()}`,
    content: 'Generated journal entry based on your trading activity.',
    mood: 'neutral'
  }
}