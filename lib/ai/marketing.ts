import Anthropic from '@anthropic-ai/sdk'
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})
async function generateWithGroq(prompt: string, systemPrompt: string): Promise<string | null> {
  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) { console.error('No Groq API key'); return null }
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }], temperature: 0.7, max_tokens: 800 })
    })
    const data = await response.json()
    return data.choices?.[0]?.message?.content || null
  } catch (error) { console.error('Groq error:', error); return null }
}
export async function generateMarketingContent(type: 'blog' | 'instagram' | 'twitter' | 'youtube' | 'market_recap', topic: string): Promise<string> {
  const prompts: Record<string, string> = {
    blog: `Write a blog about "${topic}" for traders. Include introduction, 3-4 sections, practical tips, conclusion.`,
    instagram: `Create Instagram post about "${topic}". Hook, core message, CTA, 5 hashtags.`,
    twitter: `Tweet thread (3-5 tweets) about "${topic}". Each under 280 chars with value.`,
    youtube: `YouTube script for "${topic}". Hook, outline with timestamps, main content, CTA.`,
    market_recap: `Daily Indian market recap. Nifty/Bank Nifty levels, sectors, mood, outlook.`
  }
  try {
    const result = await generateWithGroq(prompts[type] || prompts.blog, 'Expert financial content writer.')
    if (result) return result
    return getFallbackContent(type, topic)
  } catch (error) { return getFallbackContent(type, topic) }
}
export async function generateTradeAdvice(userQuestion: string, context?: any): Promise<string> {
  const prompt = `User: ${userQuestion}\nContext: ${JSON.stringify(context || {})}\nProvide helpful trading advice.`
  try {
    const result = await generateWithGroq(prompt, 'Supportive trading mentor. Wise, practical.')
    if (result) return result
    return getFallbackAdvice(userQuestion)
  } catch (error) { return getFallbackAdvice(userQuestion) }
}
function getFallbackContent(type: string, topic: string): string {
  return type === 'blog' ? `## ${topic}\n\nStart with basics. Practice daily.` : type === 'instagram' ? `🎯 ${topic}\nFocus on psychology!\n#trading #psychology` : `Tip for ${topic}: Keep a journal!`
}
function getFallbackAdvice(question: string): string {
  if (question.toLowerCase().includes('win rate')) return 'Improve: 1) Entry timing 2) Risk/reward 3) Trading journal 4) Weekly review'
  if (question.toLowerCase().includes('psychology')) return 'Trading psychology: 1) Self-awareness 2) Pre-trade routine 3) Position sizing 4) Take breaks'
  return 'Focus on: process over outcomes, 2% risk per trade, journal everything, never trade emotionally.'
}
